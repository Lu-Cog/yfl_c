<template>
	<!-- 钱包-首页 -->
	<view class="page page_wallet">
		<view class="headder_body">
			<view class="header_bg">钱包
				<view class="flex-row flex-bt">
					<view class="user_box flex-center">
						<image class="user-img" :src="avatarUrl?avatarUrl:image" mode="widthFix">
						</image>
						<text class="name clamp">{{nickName?nickName:"昵称"}}</text>
					</view>
					<image class="setup" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/shezhi.png"
						mode="widthFix" @click="toForm()"></image>
				</view>
			</view>
		</view>
		<view class="assets_body">
			<view class="assets_bg">
				<view class="bg_ bg_1"></view>
				<view class="bg_ bg_2"></view>
				<view class="bg_ bg_3"></view>
				<view class="bg_ text_box">
					<view class="text_row flex-center">
						<text class="number">{{$util.moneyAct(item.allMoney)?$util.moneyAct(item.allMoney):0}}</text>
						<text class="title">余额（元）</text>
					</view>
					<view class="top_hr hr"></view>
					<view class="text_list flex-bt">
						<view class="text_row flex-center">
							<text
								class="number">{{$util.moneyAct(item.brokerage_price.value)?$util.moneyAct(item.brokerage_price.value):0}}</text>
							<text class="title">佣金（元）</text>
						</view>
						<view class="left_hr hr"></view>
						<navigator url="/pages/points-mall/details" hover-class="none" class="text_row flex-center">
							<text class="number">{{$util.moneyAct(score)?$util.moneyAct(score):0}}</text>
							<text class="title">积分（分）</text>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="content_list">
				<button v-if="stype==2" open-type="getPhoneNumber" @getphonenumber='getphonenumber'
					class="list_item flex-center" type="default">
					<view class="img_box flex-center">
						<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_3.png" mode="aspectFit">
						</image>
					</view>
					<text>抢多多订单</text>
				</button>
				<navigator url="" v-else class="list_item flex-center" hover-class="none"
					@click="goto('/pages/assist/order_list/index')">
					<view class="img_box flex-center">
						<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_3.png" mode="aspectFit">
						</image>
					</view>
					<text>抢多多订单</text>
				</navigator>

				<button v-if="stype==2" open-type="getPhoneNumber" @getphonenumber='getphonenumber'
					class="list_item flex-center" type="default">
					<view class="img_box flex-center">
						<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_1.png" mode="aspectFit">
						</image>
					</view>
					<text>商城订单</text>
				</button>
				<navigator url="" v-else class="list_item flex-center" hover-class="none"
					@click="goto('/pages/users/order_list/index')">
					<!-- <view class="badge flex-center">2</view> -->
					<view class="img_box flex-center">
						<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_1.png" mode="aspectFit">
						</image>
					</view>
					<text>商城订单</text>
				</navigator>

				<button v-if="stype==2" open-type="getPhoneNumber" @getphonenumber='getphonenumber'
					class="list_item flex-center" type="default">
					<view class="img_box flex-center">
						<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_3.png" mode="aspectFit">
						</image>
					</view>
					<text>我的预约</text>
				</button>
				<navigator url="" v-else class="list_item flex-center" hover-class="none"
					@click="goto('/pages/appoint/order')">
					<view class="img_box flex-center">
						<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_2.png" mode="aspectFit">
						</image>
					</view>
					<text>我的预约</text>
				</navigator>

				<button v-if="stype==2" open-type="getPhoneNumber" @getphonenumber='getphonenumber'
					class="list_item flex-center" type="default">
					<view class="img_box flex-center">
						<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_3.png" mode="aspectFit">
						</image>
					</view>
					<text>我的收藏</text>
				</button>
				<navigator url="" v-else class="list_item flex-center" hover-class="none"
					@click="goto('/pages/users/extend/collect')">
					<view class="img_box flex-center">
						<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_3.png" mode="aspectFit">
						</image>
					</view>
					<text>我的收藏</text>
				</navigator>
			</view>
		</view>

		<view class="navigator_list container" v-if="stype==2">
			<button type="default" open-type="getPhoneNumber" @getphonenumber='getphonenumber'
				class="list_item flex-bt hr_shadow" v-for="(item,index) in navigatorList" :key="index" v-if="item.is_sh!=1">
				<view class="left_block flex-center">
					<image :src="item.img" mode="widthFix"></image>{{item.name}}
				</view>
				<image class="right_btn" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_r.png"
					mode="widthFix"></image>
			</button>
		</view>
		<view class="navigator_list container" v-else>
			<navigator url="" class="list_item flex-bt hr_shadow" hover-class="none"
				v-for="(item,index) in navigatorList" :key="index" @click="goto(item.url)" v-if="item.is_sh!=1">
				<view class="left_block flex-center">
					<image :src="item.img" mode="widthFix"></image>{{item.name}}
				</view>
				<image class="right_btn" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_r.png"
					mode="widthFix"></image>
			</navigator>
		</view>


		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
	</view>
</template>

<script>
	let app = getApp();
	import {
		getUserInfo
	} from '@/api/user.js';
	import store from '@/store';
	import {
		STATE_R_KEY,
		USER_INFO,
		EXPIRES_TIME,
		LOGIN_STATUS
	} from '@/config/cache';
	import {
		getStoreInfo
	} from '@/api/user.js';
	import {
		getPhone
	} from '@/api/public';
	import Cache from '@/utils/cache';
	import Routine from '@/libs/routine';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	export default {
		components: {
			// #ifdef MP
			authorize
			// #endif
		},
		computed: mapGetters(['isLogin', 'stype', 'store_id', 'userInfo']),

		data() {
			return {
				code:'',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				item: {
					allMoney: "",
					margin: "",
					first_batch: "",
					now_money: "",
					activity_principal: "",
					activity_bonus: "",
					reward_account: "",
					especially: "",
					ybk: "",
					brokerage_price: ""
				},
				avatarUrl: '',
				nickName: '',
				score: 0,
				image: "http://imgxcx.yifulai.com/25daf202103051426232787.png",
				brokerage_price: {},
				navigatorList: [{
						url: "/pages/store/share/team?brokerage_price=",
						img: "https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_5.png",
						name: "抢多多团队",
					},{
						url: "/pages/store/share/team2?brokerage_price=",
						img: "https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_5.png",
						name: "直播团队",
					}, {
						url: "/pages/school/index",
						img: "/static/img/ms_13.png",
						name: "护肤课程",
					},
					{
						url: "/pages/points-mall/qiandao",
						img: "https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_6.png",
						name: "每日签到",
					},
					// {
					// 	url: "/pages/points-mall/luck",
					// 	img: "https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_7.png",
					// 	name: "每日抽奖",
					// }, {
					// 	url: "/pages/points-mall/index",
					// 	img: "/static/img/q_9.png",
					// 	name: "积分商城",
					// },
					{
						url: "/pages/wallet-pack/coupon/index",
						img: "https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_9.png",
						name: "优惠券",
					}, 
					{
						url: "/pages/users/bank/index",
						img: "/static/img/q_13.png",
						name: "设置银行卡",
						is_sh:''
					},
					{
						url: "/pages/store/share/share-goods",
						img: "/static/img/index_icon6.png",
						name: "分享推广",
					},
					// {
					// 	url: "",
					// 	img: "https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_10.png",
					// 	name: "新手帮助",
					// },
					// {
					// 	url: "/pages/wallet-pack/agent/index",
					// 	img: "https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_11.png",
					// 	name: "了解代理商",
					// },
					
					// {
					// 	url: "/pages/wallet-pack/set-up/index",
					// 	img: "https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/q_14.png",
					// 	name: "设置",
					// },
				]
			}
		},
		//上拉刷新
		onPullDownRefresh() {
			let that = this
			if (that.isLogin) {
				that.getUserInfo();
			} else {
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif
				if (that.stype != 3) {
					that.isShowAuth = true;
				} else {
					that.isShowAuth = false;
				}
			}
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 400);
		},
		onLoad() {
			this.getCode()
		},
		onShow() {
			console.log(getApp().globalData.spid, "onshow");
			if (typeof(this.userInfo) == 'string') {
				this.avatarUrl = JSON.parse(this.userInfo).avatarUrl
				this.nickName = JSON.parse(this.userInfo).nickName
			} else {
				this.nickName = this.userInfo.nickName
				this.avatarUrl = this.userInfo.avatarUrl
			}

			let that = this;
			if (that.isLogin) {
				that.getUserInfo();
			} else {
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif
				if (that.stype != 3) {
					that.isShowAuth = true;
				} else {
					that.isShowAuth = false;
				}

			}
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
			getStoreInfo() {
				let that = this
				getStoreInfo(this.store_id,{spid:getApp().globalData.spid}).then(res => {
					app.globalData.mer_id = res.data.store.mer_id
					store.commit('STOREID', {
						store_id: res.data.store.mer_id
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
						"spid": getApp().globalData.spid
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
			goto(url) {
				if (this.stype == 3) {
					if (url == '' || url == undefined) {
						uni.showToast({
							title: "功能暂未开放",
							icon: 'none',
							duration: 2000
						});
					} else if (url == "/pages/store/share/team?brokerage_price=") {
						uni.navigateTo({
							url: url + this.brokerage_price
						})
					} else {
						uni.navigateTo({
							url: url
						})
					}
				} else {
					this.isShowAuth = true;
				}

			},
			toForm() {
				uni.navigateTo({
					url: '/pages/wallet-pack/set-up/index?phone=' + this.phone
				})
			},
			// 授权回调
			onLoadFun() {
				this.avatarUrl = this.userInfo.avatarUrl
				this.nickName = this.userInfo.nickName
				// if(this.isShowAuth){
					// this.getUserInfo();
				// }
				this.isShowAuth = false;
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
				let that = this
				if(this.stype!=3){
					setTimeout(function(){
						that.isShowAuth = true
					},500)
				}else{
					this.getUserInfo();
				}
			},
			/**
			 * 获取商家信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					console.log(res.data, 'getUserInfo');
					that.navigatorList[5].is_sh = res.data.is_sh
					that.item = res.data.acconut_info;
					that.nickName = res.data.nickname
					that.avatarUrl = res.data.avatar
					that.score = res.data.score
					that.phone = res.data.phone
					that.brokerage_price = that.item.brokerage_price.value
					if (res.data.card_status != 1) {
						uni.showModal({
							content: res.data.bind_tip,
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url:'/pages/users/bank/index'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})

					}
					//计算总金额
					let allMoney = 0;
					for (let val in that.item) {
						allMoney += parseFloat(that.item[val].value);
					}
					that.$set(that.item, 'allMoney', allMoney);
				}).catch(res => {
					console.log(res);
					if (res.status == 40000) {
						this.avatarUrl = '';
						this.nickName = '';
						this.isShowAuth = true;
					}
				});
			},


		}
	}
</script>

<style lang="less">
	button {
		background-color: #fff !important;

		&::after {
			box-shadow: none !important;
		}
	}

	.page_wallet {
		.headder_body {
			width: 100%;

			.header_bg {
				width: 100%;
				height: 410px/2;
				background: linear-gradient(4deg, #5ED8ED, #1698AE);

				padding-top: 66px/2;
				text-align: center;
				font-size: 36px/2;
				// font-weight: bold;
				color: #FFFFFF;

				.flex-row {
					padding: 0 30px/2;
					margin-top: 58px/2;

					.user_box {
						.user-img {
							width: 56px/2;
							height: 56px/2;
							border-radius: 50%;
						}

						.name {
							width: 270px;
							margin-left: 21px/2;
							font-size: 28px/2;
							font-weight: 500;
							color: #FFFFFF;
							text-align: left;
						}
					}

					.setup {
						width: 34px/2;
						height: 34px/2;
					}
				}
			}


		}

		.assets_body {
			width: 690px/2;
			height: 360px/2;
			background: #FFFFFF;
			box-shadow: 0px 7px/2 10px/2 0px rgba(33, 162, 184, 0.07);
			border-radius: 10px/2;
			margin: auto;
			margin-top: -58px;
			position: relative;

			.i-hanbao {
				position: absolute;
				right: 41px/2;
				top: 41px/2;
				width: 31px/2;
			}

			.bg_ {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				height: 100%;
				background: #FFFFFF;
				box-shadow: 0px 7px/2 10px/2 0px rgba(33, 162, 184, 0.07);
				border-radius: 10px/2;
			}

			.bg_1 {
				bottom: 0;
				width: 690px/2;
				z-index: 20;
			}

			.bg_2 {
				bottom: 17px/2;
				width: 650px/2;
				opacity: 0.65;
				z-index: 18;
			}

			.bg_3 {
				bottom: 34px/2;
				width: 595px/2;
				opacity: 0.4;
				z-index: 16;
			}

			.text_box {
				z-index: 30;
				padding: 0 28px/2;
				padding-top: 40px/2;

				.text_row {
					flex-direction: column;

					.number {
						font-size: 65px/2;
						font-weight: bold;
						color: #333333;
						margin-bottom: 5px;
					}

					.title {
						font-size: 28px/2;
						color: #999999;
					}
				}

				.top_hr {
					width: 100%;
					height: 1px;
					margin: 15px/2 0 28px/2;
				}

				.left_hr {
					width: 1px;
					height: 112px/2;
				}

				.text_list {
					flex-wrap: wrap;

					.text_row {
						width: 48%;

						.number {
							font-size: 46px/2;
						}

						image {
							width: 25px;
							height: 25px !important;
							margin-bottom: 5px;
						}
					}
				}
			}
		}

		.container {
			background: #fff;
			border-radius: 10px/2;
			padding: 26px/2;
			margin: 28px/2;
			padding-bottom: 0;

			.content_list {
				flex-wrap: wrap;
				display: flex;
				align-items: flex-start;

				.list_item {
					position: relative;
					flex-direction: column;
					width: 25%;
					padding: 83px/4 0;

					.badge {
						position: absolute;
						top: 0;
						right: 0;
						left: 20px;
						bottom: 40px;
						margin: auto;
						width: 34px/2;
						height: 30px/2;
						background: #FF0000;
						border-radius: 10px;
						font-size: 20px/2;
						font-weight: 500;
						color: #FFFFFF;
						z-index: 30;
					}

					.img_box {
						width: 50px/2;
						height: 50px/2;

						image {
							width: 50px/2;
							height: 50px/2;
						}
					}

					text {
						font-size: 24px/2;
						font-weight: 500;
						color: #333333;
						margin-top: 5px;
					}
				}
			}

		}

		.navigator_list {
			background-color: #fff;
			padding: 0 15px;

			.list_item {
				padding: 10px 0;

				.left_block {
					justify-content: flex-start;
					font-size: 14px;
					font-weight: 500;
					color: #333333;

					image {
						margin-right: 11px;
						width: 20px;
						height: 20px;
					}
				}

				.right_btn {
					width: 15px/2;
					height: 29px/2;
				}
			}
		}
	}
</style>
