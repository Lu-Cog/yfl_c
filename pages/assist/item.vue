<template>
	<!-- 助力活动-拼团详情 -->
	<view class="page help_order-item">
		<myhead :title="'详情'"></myhead>
		<!-- <view class="time-end flex-center">
			距离结束还剩 <text class="flex-center">00</text>:<text class="flex-center">00</text>:<text
				class="flex-center">00</text>
		</view> -->
		<view class="item_body">
			<view class="card_block">
				<view class="banner-img">
					<image :src="goods.slider_image" mode="widthFix"></image>
				</view>
				<view class="card_content">
					<view class="title clamp2">{{goods.title}}</view>
					<view style="display: flex;align-items: center;">
						<view class="progress_body">
							<view class="now" :style="{width:goods.sold_bfb+'%'}">目前进度</view>
							<text class="number">已拼{{goods.sold_num}}件</text>
							<text class="rate">{{goods.sold_bfb+'%'}}</text>
						</view>
						<view><text style="color: #ff4644;margin-left: 20rpx;">{{goods.tuan_num}}</text></view>
					</view>
					<view class="flex-row flex-bt">
						<view class="price_block flex-center">
							<text class="price">{{goods.assist_price==0?'免费抢':goods.assist_price}}</text>
							<text class="badge flex-center">原价¥{{goods.ot_price}}</text>
						</view>
					</view>
					<!-- <button v-if="stype==2" class="share-block flex-center"  open-type="getPhoneNumber" @getphonenumber="getphonenumber">
					<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/share.png" mode="widthFix">
					</image><text>分享</text>
					</button>
					<button v-else class="share-block flex-center" @click="listenerActionSheet">
						<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/share.png" mode="widthFix">
						</image><text>分享</text>
					</button> -->
				</view>
			</view>
			<view class="shadow_block" v-if="group.length>0">
				<view class="block_title">{{group_title}}</view>
				<!-- <view class="hr" style="width: 100%;"></view> -->
				<view class="block_list">
					<view class="list_item flex-bt" v-for="(item,index) in group" :key="index">
						<view class="flex-center">
							<image :src="item.img"></image>
							<text class="time">截止&nbsp;{{ timestampToTime(item.left_time) }}</text>
						</view>
						
						<view class="number">还差<text>{{item.left_num}}</text>人</view>
						<!-- <button v-if="stype==2" :class="type==3?'grey':''" :disabled="type==3" hover-class="none" type="default" class="main_btn flex-center"
							open-type="getPhoneNumber" @getphonenumber="getphonenumber">{{type==3?text:'去参团'}}</button>
						<button v-else hover-class="none" :class="type==3?'grey':''" :disabled="type==3" type="default" class="main_btn flex-center"
							@click="goto(item.product_assist_set_id)">{{type==3?text:'去参团'}}</button> -->
					</view>

				</view>
			</view>
			<!-- <view class="shadow_block">
				<text class="users_title flex-center">超过53人参与了该团购</text>
				<view class="users_list">
					<image class="users_img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg"
						mode="aspectFill"></image>
					<image class="users_img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg"
						mode="aspectFill"></image>
					<image class="users_img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg"
						mode="aspectFill"></image>
					<image class="users_img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg"
						mode="aspectFill"></image>
					<image class="users_img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg"
						mode="aspectFill"></image>
					<image class="users_img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg"
						mode="aspectFill"></image>
					<image class="users_img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg"
						mode="aspectFill"></image>
					<image class="users_img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg"
						mode="aspectFill"></image>
					<image class="users_img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg"
						mode="aspectFill"></image>
				</view>
			</view> -->
			<view class="rich_body">
				<!-- <rich-text :nodes="goods.content"></rich-text> -->
				<view class="title">
					活动详情
				</view>
				<view class='conter' v-if="goods.content">
					<jyf-parser :domain='domain' :html="goods.content.replace(/<br\/>/ig, '')" ref="article"
						:tag-style="tagStyle"></jyf-parser>
				</view>
				<!-- <image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/rich.png" mode="widthFix"></image> -->
			</view>
			<view class="bottom-bg"></view>
		</view>
		<uni-goods-nav :tip='no_join_tip' :type='type' :status="status" :order_assist_id="order_assist_id" :fill="false" :options="options" :buttonGroup="buttonGroup" @click="onClick"
			@buttonClick="buttonClick" @getphonenumber="getphonenumber" />
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
		<!-- 分享按钮 -->
		<view class="generate-posters acea-row row-middle" :class="posters ? 'on' : ''">
			<!-- #ifndef MP -->
			<button class="item" hover-class='none' v-if="weixinStatus === true" @click="H5ShareBox = true">
				<view class="iconfont icon-weixin3"></view>
				<view class="">发送给朋友</view>
			</button>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<button class="item" open-type="share" hover-class='none' @click="goFriend">
				<view class="iconfont icon-weixin3"></view>
				<view class="">发送给朋友</view>
			</button>
			<!-- #endif -->
			<button class="item" hover-class='none' @click="goPoster">
				<view class="iconfont icon-haibao"></view>
				<view class="">生成海报</view>
			</button>
		</view>
		<view class="mask" v-if="posters" @click="listenerActionClose"></view>
		<!-- 海报展示 -->
		<view class='poster-pop' v-if="posterImageStatus">
			<image src='/static/images/poster-close.png' class='close' @click="posterImageClose"></image>
			<image :src='posterImage'></image>
			<!-- #ifndef H5  -->
			<view class='save-poster' @click="savePosterPath">保存到手机</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="keep">长按图片可以保存到手机</view>
			<!-- #endif -->
		</view>
		<view class='mask' v-if="posterImageStatus"></view>
		<canvas class="canvas" canvas-id='myCanvas' v-if="canvasStatus"></canvas>
		<!-- 发送给朋友图片 -->
		<view class="share-box" v-if="H5ShareBox">
			<image src="/static/images/share-info.png" @click="H5ShareBox = false"></image>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	import store from '@/store';
	import {
		STATE_R_KEY,
		USER_INFO,
		EXPIRES_TIME,
		LOGIN_STATUS
	} from '@/config/cache';
	import Cache from '@/utils/cache';
	import {
		getUserInfo,
		getStoreInfo
	} from '@/api/user.js';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	import Routine from '@/libs/routine';
	import {
		getPhone,
		getSessionKey
	} from '@/api/public';
	import {
		getDetailInfo
	} from '@/api/store';
	import myhead from "@/components/my-components/myhead.vue"
	export default {
		components: {
			myhead,
			// #ifdef MP
			authorize
			// #endif
		},
		filters: {

		},
		computed: mapGetters(['isLogin', 'stype', 'store_id', "uid"]),
		// onShareAppMessage(res) {
		// 	if (res.from === 'button') { // 来自页面内分享按钮
		// 		console.log(res.target, "tar")
		// 	}
		// 	return {
		// 		title: this.goods.title,
		// 		path: '/pages/assist/item?store_id=' + this.store_id + "&assist_id=" + this.assist_id + "&spid=" + this.uid
		// 	}
		// },
		onLoad: function(option) {
			// console.log(option.order_assist_id,'000');
			if(Number(option.order_assist_id)>0){
				this.order_assist_id = Number(option.order_assist_id)
			}
			
			//option为object类型，会序列化上个页面传递的参数
			console.log(option.store_id,"option");			
			
			let store_id = Number(option.store_id)
			if (store_id > 0) {
				store.commit('STOREID', {
					store_id: store_id
				});
			}
			this.assist_id = Number(option.assist_id)
			if(Number(option.spid)>0){
				getApp().globalData.spid = Number(option.spid)
				// store.commit('SETUID', Number(option.spid));
			}
			this.getCode()
			console.log(getApp().globalData.spid,option,'option');
			
		},

		onShow() {
			console.log("---isLogin=" + this.isLogin);
			let that = this;
			this.getDetailInfo()
			if (!that.isLogin) {
				console.log("onshow", this.isLogin);
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif
				if (that.stype != 3) {
					that.isShowAuth = true;
				}
			} 
			console.log(this.stype, "detail");
		},

		data() {
			return {
				code:'',
				order_assist_id:0,
				group_title: '',
				goods: {},
				group: [],
				assist_id: 0,
				isDown: true,
				posters: false,
				weixinStatus: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				actionSheetHidden: true,
				posterImageStatus: false,
				storeImage: '', //海报产品图
				PromotionCode: '', //二维码图片
				canvasStatus: false, //海报绘图标签
				posterImage: '', //海报路径
				H5ShareBox: false, //公众号分享图片
				title: '',
				active: 2,
				id: 1,
				img: "https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/index_banner.jpg",
				state: 0,
				name: "补水护理(一般就是只清洁、补水、上面膜、头、 肩、颈按摩)",
				number: 100,
				rate: "40%",
				price: "160.00",
				dow: "28",
				// 底部导航
				options: [{
					icon: 'shop',
					text: '首页',
					url: '/pages/index/index'
				}, {
					icon: 'headphones',
					text: '客服',
					url: ''
				}],
				buttonGroup: [{
					text2:'已参团',
					text1:'去参团',
					text: '发起拼团',
					backgroundColor: '#1698AE',
					color: '#fff'
				}],
				// status:0,
				// text:'已参团',
				type:-1,
				no_join_tip:''
			}
		},
		methods: {
			getStoreInfo() {
				let that = this
				getStoreInfo(this.store_id).then(res => {
					app.globalData.mer_id = res.data.store.mer_id
					store.commit('STOREID', {
						store_id: res.data.store.mer_id
					});
				})
			},
			// 授权回调
			timestampToTime(timestamp) {
				var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
				return M + D + h + m ;
			},
			getDetailInfo() {
				console.log("getDetailInfo");
				let that = this
				let data = {
					product_assist_set_id:this.order_assist_id
				}
				getDetailInfo(that.store_id, that.assist_id,data).then(res => {
					that.group_title = res.data.group_title
					that.goods = res.data.goods
					that.group = res.data.group
					that.status = res.data.status
					that.type = res.data.type
					that.no_join_tip = res.data.no_join_tip
					console.log(res.data.type, "getDetailInfo");
				})
			},
			listenerActionSheet: function() {
				if (this.isLogin === false) {
					// #ifdef H5 || APP-PLUS
					toLogin();
					// #endif
					// #ifdef MP
					
					this.$set(this, 'isAuto', true);
					this.$set(this, 'isShowAuth', true);
					// #endif
				} else {
					// #ifdef H5
					if (this.$wechat.isWeixin() === true) {
						this.weixinStatus = true;
					}
					this.downloadFilePromotionCode();
					// #endif
					this.posters = true;

				}
			},
			// 分享关闭
			listenerActionClose: function() {
				this.posters = false;
			},
			//隐藏海报
			posterImageClose: function() {
				this.posterImageStatus = false
			},
			// 小程序关闭分享弹窗；
			goFriend: function() {
				this.posters = false;
			},
			/**
			 * 生成海报
			 */
			goPoster: function() {
				let that = this;
				that.posters = false;
				that.$set(that, 'canvasStatus', true);
				let arr2 = [that.posterbackgd, that.storeImage, that.PromotionCode];
				// // #ifndef H5
				if (that.isDown) {
					that.$set(that, 'canvasStatus', false);
					return that.$util.Tips({
						title: '正在下载海报,请稍后再试！'
					});
				}
				// // #endif
				uni.getImageInfo({
					src: that.PromotionCode,
					fail: function(res) {
						// #ifdef H5
						return that.$util.Tips({
							title: res
						});
						// #endif
						// #ifdef MP
						console.log(res, 'res')
						return that.$util.Tips({
							title: '小程序二维码需要发布正式版后才能获取到'
						});
						// #endif
					},
					success() {
						if (arr2[2] == '') {
							//海报二维码不存在则从新下载
							// // #ifndef H5
							that.downloadFilePromotionCode(function(msgPromotionCode) {
								arr2[2] = msgPromotionCode;
								if (arr2[2] == '')
									return that.$util.Tips({
										title: '海报二维码生成失败！'
									});
								that.$util.PosterCanvas(arr2, that.storeInfo.store_name, that.storeInfo
									.price,
									function(tempFilePath) {
										that.$set(that, 'posterImage', tempFilePath);
										that.$set(that, 'posterImageStatus', true);
										that.$set(that, 'canvasStatus', false);
										that.$set(that, 'actionSheetHidden', !that
											.actionSheetHidden);
									});
							});
							// // #endif
							// // #ifdef H5
							// that.$util.PosterCanvas(arr2, that.storeInfo.store_name, that.storeInfo.price, function(tempFilePath) {
							// 	that.$set(that, 'posterImage', tempFilePath);
							// 	that.$set(that, 'posterImageStatus', true);
							// 	that.$set(that, 'canvasStatus', false);
							// 	that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
							// });
							// // #endif
						} else {
							//生成推广海报
							that.$util.PosterCanvas(arr2, that.storeInfo.store_name, that.storeInfo.price,
								function(tempFilePath) {
									that.$set(that, 'posterImage', tempFilePath);
									that.$set(that, 'posterImageStatus', true);
									that.$set(that, 'canvasStatus', false);
									that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
								});
						}
					},
				});
			},

			/*
			 * 保存到手机相册
			 */
			// #ifdef MP
			savePosterPath: function() {
				let that = this;
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success() {
									uni.saveImageToPhotosAlbum({
										filePath: that.posterImage,
										success: function(res) {
											that.posterImageClose();
											that.$util.Tips({
												title: '保存成功',
												icon: 'success'
											});
										},
										fail: function(res) {
											that.$util.Tips({
												title: '保存失败'
											});
										}
									})
								}
							})
						} else {
							uni.saveImageToPhotosAlbum({
								filePath: that.posterImage,
								success: function(res) {
									that.posterImageClose();
									that.$util.Tips({
										title: '保存成功',
										icon: 'success'
									});
								},
								fail: function(res) {
									that.$util.Tips({
										title: '保存失败'
									});
								},
							})
						}
					}
				})
			},
			// #endif
			//#ifdef H5
			ShareInfo() {
				let data = this.storeInfo;
				let href = location.href;
				if (this.$wechat.isWeixin()) {

					getUserInfo().then(res => {
						href =
							href.indexOf("?") === -1 ?
							href + "?spread=" + res.data.uid :
							href + "&spread=" + res.data.uid;

						let configAppMessage = {
							desc: data.store_info,
							title: data.store_name,
							link: href,
							imgUrl: data.image
						};

						this.$wechat.wechatEvevt([
							"updateAppMessageShareData",
							"updateTimelineShareData",
							"onMenuShareAppMessage",
							"onMenuShareTimeline"
						], configAppMessage).then(res => {
							console.log(res, '=============================>>WXAPI');
						}).catch(err => {
							console.log(err);
						})
					});
				}
			},
			//#endif
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
			onLoadFun() {

				if (this.isShowAuth) {
					// this.getUserInfo();
				}
				this.isShowAuth = false;
				//this.gotoIndex();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
				let that = this
				if(this.stype!=3){
					setTimeout(function(){
						that.isShowAuth = true
					},500)
				}
			},
			onClick(e) {
				// 单独购买
				console.log(e)
				uni.switchTab({
					url: e.content.url
				})
			},
			buttonClick(e) {
				if (this.stype != 3) {
					this.isShowAuth = true;
				} else {
					// 发起拼团
					console.log(e, "button")
					uni.navigateTo({
						url: '/pages/assist/order_confirm/index?product_assist_set_id='+this.order_assist_id+'&assist_id='+this.assist_id
					})
				}

			},
			changetabs(active) {
				this.active = active;
			},
			goto(id) {
				// console.log(app.globalData.stype,this.stype,"goto");
				if (this.stype != 3) {
					this.isShowAuth = true;
				} else {
					uni.navigateTo({
						url: '/pages/assist/order_confirm/index?product_assist_set_id=' + id + '&assist_id=' + this
							.assist_id
					})
				}

			}
		}
	}
</script>

<style lang="less" scoped>
	.bottom-bg {
		background: #f7f7f7;
		width: 100%;
		height: 44px+122px/2;
	}

	.help_order-item {
		position: relative;

		.time-end {
			position: absolute;
			top: 184px/2;
			left: 0;
			right: 0;
			margin: auto;
			z-index: 999;
			margin: 0 23px/2;
			font-size: 28px/2;
			font-weight: 500;
			color: #FFFFFF;

			text {
				width: 80px/2;
				height: 45px/2;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 10px/2;
				margin: 0 13px/2;
				color: #000;
				font-size: 32px/2;
			}
		}

		.item_body {
			box-shadow: 0px 5px/2 6p/2x 0px rgba(193, 227, 255, 0.24);
			border-radius: 8px/2;
			position: absolute;
			top: 90px;
			z-index: 99;
			width: 95%;
			margin: 0 2.5%;
			// background: #fff;

			.card_block {
				.card_content {
					position: relative;

					.badge {
						margin-left: 3px;
						text-decoration: line-through;
					}

					.share-block {
						position: absolute;
						bottom: 30px;
						right: 57px/2;
						flex-direction: column;
						font-size: 20px/2;
						font-weight: 500;
						color: #333333;

						image {
							margin-top: 5px;
							width: 34px/2;
							height: 36px/2;
						}
					}
				}
			}

			.shadow_block {
				// margin: 0 10px;
				padding: 15px 11px;
				margin-bottom: 21px;

				.block_title {
					font-size: 24px/2;
					color: #333333;
					padding-bottom: 10px;
				}

				.block_list {
					.list_item {
						position: relative;
						padding: 10px 0;

						&::after {
							position: absolute;
							content: ' ';
							left: 0;
							right: 0;
							top: 0;
							margin: auto;
							height: 1px;
							width: 100%;
							box-shadow: inset 1px -1px 1px -1px #E4E4E4;
						}

						image {
							width: 54px/2;
							height: 54px/2;
							border-radius: 50%;
						}

						.time {
							margin-left: 13px/2;
							margin-right: 45px/2;
							font-size: 28px/2;
							font-weight: 500;
							color: #333333;
						}

						.number {
							font-size: 24px/2;
							font-weight: 500;
							color: #666666;

							text {
								color: #FF002B;
								margin: 0 5px;
							}
						}

						button {
							margin-left: 51px/2;
						}
					}
				}

				.users_title {
					font-size: 12px;
					color: #333333;
					padding-bottom: 10px;

				}

				.users_img {
					margin: 27px/4 3.7px;
					width: 54px/2;
					height: 54px/2;
					border-radius: 50%;
				}
			}
		}

		uni-goods-nav {
			position: fixed;
			bottom: 0;
			z-index: 99;
			width: 100%;
		}

		.generate-posters {
			width: 100%;
			height: 170rpx;
			background-color: #fff;
			position: fixed;
			left: 0;
			bottom: 0px;
			z-index: 388;
			transform: translate3d(0, 100%, 0);
			transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
			border-top: 1rpx solid #eee;
		}

		.generate-posters.on {
			transform: translate3d(0, 0, 0);
		}

		.generate-posters .item {
			flex: 50%;
			text-align: center;
			font-size: 30rpx;
		}

		.generate-posters .item .iconfont {
			font-size: 80rpx;
			color: #5eae72;
		}

		.generate-posters .item .iconfont.icon-haibao {
			color: #5391f1;
		}

		.poster-pop {
			width: 450rpx;
			height: 714rpx;
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			z-index: 399;
			top: 50%;
			margin-top: -357rpx;
		}

		.poster-pop image {
			width: 100%;
			height: 100%;
			display: block;
		}

		.poster-pop .close {
			width: 46rpx;
			height: 75rpx;
			position: fixed;
			right: 0;
			top: -73rpx;
			display: block;
		}

		.poster-pop .save-poster {
			background-color: #df2d0a;
			font-size: ：22rpx;
			color: #fff;
			text-align: center;
			height: 76rpx;
			line-height: 76rpx;
			width: 100%;
		}

		.poster-pop .keep {
			color: #fff;
			text-align: center;
			font-size: 25rpx;
			margin-top: 10rpx;
		}

		.mask {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.6);
			z-index: 300 !important;
		}

		.canvas {
			z-index: 300;
			width: 750px;
			height: 1190px;
		}

		.share-box {
			z-index: 1000;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.rich_body {
			padding: 0;
			.title{
				    text-align: center;
				    font-size: 36rpx;
				    margin-bottom: 30rpx;
			}
		}
	}
</style>
