<template>
	<view>
		<view class='Popup' v-if='isShowAuth'>
			<view class="logo-auth">
				<image :src='logoUrl' mode="aspectFit"></image>
			</view>
			<view class='title'>授权提醒</view>
			<view class='tip'>{{stype==1?'请授权头像等信息':'请授权手机号'}}，以便为您提供更好的服务</view>
			<view class='bottom flex'>
				<view class='item' @click='close'>暂不授权</view>
				<button v-if="stype==1" class='item grant' @click="setUserInfo">去授权</button>
				<button v-if="stype==2" class='item grant' open-type="getPhoneNumber" @getphonenumber="getphonenumber">去授权</button>
			</view>
		</view>
		<view class='mask' v-if='isShowAuth' @click='close'></view>
	</view>
</template>

<script>
	const app = getApp();
	import store from '../store';
	import Cache from '../utils/cache';
	import {
		getLogo,
		getPhone,
		getWxLoginOpenId
	} from '../api/public';
	import {
		USER_INFO,
		EXPIRES_TIME,
		LOGO_URL
	} from '../config/cache';
	import {
		getStoreInfo
	} from '@/api/user.js';
	import {
		mapGetters
	} from 'vuex';
	import Routine from '../libs/routine';

	export default {
		name: 'Authorize',
		props: {
			isAuto: {
				type: Boolean,
				default: true
			},
			isGoIndex: {
				type: Boolean,
				default: true
			},
			isShowAuth: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				logoUrl: app.globalData.routine_logo,
				code:""
			}
		},
		computed: mapGetters(['isLogin', 'userInfo', 'uid', 'stype','store_id']),
		watch: {
			// isLogin(n) {
			// 	n === true && this.$emit('onLoadFun', this.userInfo);
			// }
		},
		created() {
			this.getCode()
			this.getLogoUrl();
			this.setAuthStatus();
			uni.$on('update', (data) => {
				this.logoUrl = data.site_logo
			});
			let that =this;
			setTimeout(function(){
				if(app.globalData.openid==''){
					console.log('openid重新获取1');
					return that.setUserInfoAutoUpdateOpenId(false);
				}
			},500);
		},
		mounted: function() {
			this.$nextTick(() => {
				this.logoUrl = app.globalData.site_logo
			});
		},
		methods: {
			getCode() {
				let that = this
				Routine.getCode().then(res => {
					that.code = res.code
				}).catch(res => {
					uni.showToast({
						title: '网络故障，请切换网络尝试',
						icon: 'none',
						duration: 1000
					});
				})
			},
			getphonenumber(res) {
				let that = this
				let openid = app.globalData.openid
				let unionid = app.globalData.unionid
				let iv = res.detail.iv
				let encryptedData = res.detail.encryptedData
				function getphone(){
					getPhone({
						"code": that.code,
						"iv": iv,
						"encryptedData": encryptedData,
						"unionid": unionid,
						"openid": openid,
						"store_id": that.store_id,
						"spid": getApp().globalData.spid,
						"room_id": getApp().globalData.roomId
					}).then(res => {
						let time = res.data.expires_time - Cache.time();
						store.commit('UPDATE_USERINFO', res.data.userInfo);
						store.commit('STYPE', {
							stype: res.data.stype,
							time: time
						});
						store.commit('LOGIN', {
							token: res.data.token,
							time: time
						});
						that.getStoreInfo()
						store.commit('SETUID', res.data.userInfo.uid);
						Cache.set(EXPIRES_TIME, res.data.expires_time, time);
						Cache.set(USER_INFO, res.data.userInfo, time);
						uni.showToast({
							title: '手机号同步成功',
							icon: 'none',
							duration: 1000
						});
						that.$emit('authColse', false);
					}).catch(res => {
						uni.showToast({
							title: res,
							icon: 'none',
							duration: 1000
						});
						that.getCode()
					})
				}
				uni.checkSession({
					success(res) {
						getphone()
					},
					fail(err) {
						that.getCode()
						getphone()
					}
				})
			
			
			},
			getStoreInfo() {
				let that = this
				getStoreInfo(this.store_id,{spid:getApp().globalData.spid}).then(res => {
					app.globalData.mer_id = res.data.store.mer_id
					store.commit('STOREID', {
						store_id: res.data.store.mer_id
					});
				})
			},
			setAuthStatus() {
				if (!this.isLogin) {
					this.setUserInfoAuto();
				}
			},

			// setAuthStatus() {
			// 	Routine.authorize().then(res => {
			// 		console.log(res, "authorize");
			// 		if (!res.isLogin)
			// 			this.setUserInfoAuto();
			// 		else
			// 			this.$emit('onLoadFun', this.userInfo);
			// 	}).catch(res => {
			// 		if (this.isAuto)
			// 			this.$emit('authColse', true);
			// 	})
			// },
			// 此处开始请求解密 -TOM todo
			getUserInfo() {
				Routine.getUserProfile().then(res => {
					console.log(111);
					let userInfo = res.userInfo.userInfo
					console.log(app.globalData.openid);
					if(!app.globalData.openid){
						console.log('openid重新获取');
						this.setUserInfoAutoUpdateOpenId(true)
					}
					userInfo.store_id =  this.store_id
					userInfo.spid = getApp().globalData.spid
					userInfo.openid = app.globalData.openid
					userInfo.unionid = app.globalData.unionid
					// userInfo.spread_spid = app.globalData.spid;//获取推广人ID
					// userInfo.spread_code = app.globalData.code;//获取推广人分享二维码ID

					// 绑定用户资料
					Routine.authUserInfo(userInfo).then(res => {
						uni.hideLoading();
						uni.showToast({
							title: '资料同步成功',
							icon: 'none',
							duration: 1000
						});
						this.$emit('authColse', false);
						store.commit('UPDATE_USERINFO', userInfo);
						Cache.set(USER_INFO, userInfo);
						this.$emit('onLoadFun');

					}).catch(res => {
						console.log(res);
						uni.hideLoading();
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					})

				}).catch(res => {
					console.log(res);
					uni.hideLoading();
				})
			},
			setUserInfoAuto() {
				console.log("进入setUserInfoAuto方法");
				console.log(this.stype);
				if (this.stype == 1) {
					uni.showLoading({
						title: '正在登录中'
					});
				}

				//1调用wx.login 获取code
				Routine.getCode().then(res => {
					getWxLoginOpenId({
						"code": res.code,
						"spid": this.uid || getApp().globalData.spid
					}).then(res => {
						app.globalData.stype = res.data.stype
						app.globalData.openid = res.data.openid
						app.globalData.unionid = res.data.unionid
						
						//从后台获取openid,判断用户是否需要获取身份信息type 1未绑定昵称，2未绑定手机，3OK
						uni.hideLoading();
						// app.globalData.isLogin = true;
						if (res.data.stype == 1) {
							this.$emit('authColse', true);
							store.commit('STYPE', {
								stype: res.data.stype
							});
							// this.isShowAuth=true;
							// this.getUserInfo(res.data.openid,res.data.unionid);
						} else if (res.data.stype == 3) {
							//自动登录
							console.log("自动登录成功")
							// app.globalData.isLogin=true
							let time = res.data.expires_time - Cache.time();
							store.commit('UPDATE_USERINFO', res.data.userInfo);
							store.commit('STYPE', {
								stype: res.data.stype,
								time: time
							});
							store.commit('LOGIN', {
								token: res.data.token,
								time: time
							});
							this.getStoreInfo()
							store.commit('SETUID', res.data.userInfo.uid);
							Cache.set(EXPIRES_TIME, res.data.expires_time, time);
							Cache.set(USER_INFO, res.data.userInfo, time);
							uni.hideLoading();
							this.$emit('authColse', false);
							this.$emit('onLoadFun', res.data.userInfo);
						}
					}).catch(res => {
						console.log(res, 456);
						uni.hideLoading();
					})
				}).catch(res => {
					uni.hideLoading();
				})
			},
			setUserInfoAutoUpdateOpenId(flag = true) {
				console.log("进入setUserInfoAutoUpdateOpenId方法");
				let that = this;
				//1调用wx.login 获取code
				Routine.getCode().then(res => {
					getWxLoginOpenId({
						"code": res.code,
						"spid": this.uid || getApp().globalData.spid,
						"room_id" : getApp().globalData.roomId
					}).then(res => {
						console.log(res);
						app.globalData.stype = res.data.stype
						app.globalData.openid = res.data.openid
						app.globalData.unionid = res.data.unionid

						// flag && that.getUserInfo();
						 
					}).catch(res => {
						uni.hideLoading();
					})
				}).catch(res => {
					uni.hideLoading();
				})
			},
			setUserInfo() {
				console.log("进入setUserInfo方法");
				uni.showLoading({
					title: '正在授权中'
				});
				//1调用wx.login 获取code
				this.getUserInfo();

			},
			getLogoUrl() {
				this.logoUrl = app.globalData.routine_logo

			},
			close() {
				let pages = getCurrentPages(),
					currPage = pages[pages.length - 1];
				this.$emit('authColse', false);
			},
		}
	}
</script>

<style scoped lang='scss'>
	.Popup {
		width: 500rpx;
		background-color: #fff;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -250rpx;
		transform: translateY(-50%);
		z-index: 1000;
	}

	.Popup {
		.logo-auth {
			z-index: -1;
			position: absolute;
			left: 50%;
			top: 0%;
			transform: translate(-50%, -50%);
			width: 150rpx;
			height: 150rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 8rpx solid #fff;
			border-radius: 50%;
			background: #fff;
		}

		image {
			height: 42rpx;
			margin-top: -54rpx;
		}
	}

	.Popup .title {
		font-size: 28rpx;
		color: #000;
		text-align: center;
		margin-top: 30rpx
	}

	.Popup .tip {
		font-size: 22rpx;
		color: #555;
		padding: 0 24rpx;
		margin-top: 25rpx;
	}

	.Popup .bottom .item {
		width: 50%;
		height: 80rpx;
		background-color: #eeeeee;
		text-align: center;
		line-height: 80rpx;
		font-size: 24rpx;
		color: #666;
		margin-top: 54rpx;
	}

	.Popup .bottom .item.on {
		width: 100%
	}

	.flex {
		display: flex;
	}

	.Popup .bottom .item.grant {
		font-size: 28rpx;
		color: #fff;
		font-weight: bold;
		background-color: #e93323 !important;
		border-radius: 0;
		padding: 0;
	}

	.mask {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.65);
		z-index: 999;
	}
</style>
