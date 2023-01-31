<template>
	<!-- 助力活动-助力拼团 -->
	<view class="page help_group">
		<view class="top_body">
			<myhead :title="'抢多多'" :imgSrc="'http://imgxcx.yifulai.com/help-bg.jpg'"></myhead>
			<view class="top_content flex-center">
				<view class="title">万人团</view>
				<view class="subtitle">千万好物只等你，万人拼团价更低</view>
				<view class="fixed_bolck flex-center" @click="goto('/pages/points-mall/rule')">规则</view>
				<view class="users_list flex-center">
					<image src="/static/img/user.jpg" mode="aspectFill"></image>
					<image src="/static/img/user.jpg" mode="aspectFill"></image>
					<image src="/static/img/user.jpg" mode="aspectFill"></image>
					<image src="/static/img/user.jpg" mode="aspectFill"></image>
					<image src="/static/img/user.jpg" mode="aspectFill"></image>
					<image src="/static/img/user.jpg" mode="aspectFill"></image>
				</view>
				<view class="number">超过5680人参与了万人团抢购</view>
			</view>
		</view>
		<view class="tabs_body">
			<view class="tab_body flex-bt" style="top: 0;">
				<view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">分享给客户</view>
				<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">我的抢多多</view>
				<view class="tab_item flex-center" @click="changetabs(3)" :class="{active:active==3}">抢多多订单</view>
			</view>
			<view class="content_body">
				<view class="content_list" v-if="active==1">
					<!-- <mynull :imgSrc="'/static/img/null.png'" :text="'暂无消息'" v-if="contentList==''"></mynull> -->
					<view class="card_block" v-for="(item,index) in cardList" @click="toItem(item.id)">
						<view class="banner-img">
							<image :src="item.img" mode="aspectFill"></image>
							<view class="mask_box flex-center" v-if="item.state === 0">
								<text>抢光了</text>
							</view>
						</view>
						<view class="card_content">
							<view class="title clamp2">{{item.name}}</view>
							<view class="flex-row flex-bt">
								<view class="price_block">
									<text class="price">当前分配 <text>10</text> 个团</text>
									<text class="badge">已抢完 <text>3</text> 个团，还可分享 <text>7</text> 个</text>
								</view>
								<!-- 按钮状态 抢光了：no  去拼团:'' -->
								<view class="right">
									<button hover-class="none" class="flex-center"
										@click.stop="listenerActionSheet">去分享</button>
									<button hover-class="none" class="flex-center" :class="item.state === 0?'no':''"
										@click="goto('')">{{item.state === 0?'抢光了':'去开团'}}</button>

								</view>

							</view>

						</view>
					</view>
				</view>
				<view class="content_list" v-if="active==2">
					<view class="card_block" v-for="(item,index) in cardList" @click="toItem(item.id)">
						<view class="banner-img">
							<image :src="item.img" mode="aspectFill"></image>
							<view class="mask_box flex-center" v-if="item.state === 0">
								<text>抢光了</text>
							</view>
						</view>
						<view class="card_content">
							<view class="title clamp2">{{item.name}}</view>

							<view class="flex-row flex-bt">
								<view class="progress_body">
									<view class="now" :style="{width:item.rate}">目前进度</view>
									<text class="number">已拼{{item.number}}件</text>
									<text class="rate">{{item.rate}}</text>
								</view>
								<!-- <view class="price_block flex-center">
									<text class="price">¥{{item.price}}</text>
									<text class="badge flex-center">已降{{item.dow}}元</text>
								</view> -->
								<!-- 按钮状态 抢光了：no  去拼团:'' -->

								<button hover-class="none" class="flex-center"
									@click="goto('')">查看</button>
							</view>

						</view>
					</view>
				</view>
				<view class="content_list" v-if="active==3">
					<view class="order_block">
						<view class="order-header flex-bt">
							<text class="order">订单号&nbsp;201908202858</text>
							<text class="state">开团中</text>
						</view>
						<view class="order_mid">
							<image class="order-img" src="/static/img/user.jpg" mode="aspectFill"></image>
							<view class="order_content">
								<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
								<view class="price">¥0.00</view>
							</view>
							<text class="number">x3</text>
						</view>
						<view class="hr"></view>
						<view class="order_dow">
							共计商品: <text>2</text>件 ; 共计：<text>0</text> 元
						</view>
						<view class="button_block flex-center">
							<button hover-class="none" class="flex-center">取消订单</button>
							<button hover-class="none" class="flex-center yes"
								@click="goto('/pages/store/help/order')">邀请参团</button>
						</view>
					</view>
				</view>
			</view>

		</view>
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
	import myhead from "../../../components/my-components/myhead2.vue"
	// import mynull from "../../../components/my-components/mynull.vue"
	export default {
		components: {
			myhead
		},
		data() {
			return {
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
				posterbackgd: '/static/images/posterbackgd.png',
				title: '',
				imgSrc: '',
				active: 1,
				cardList: [{
					id: 2,
					img: "http://imgxcx.yifulai.com/index_banner.jpg",
					state: 1,
					name: "补水护理(一般就是只清洁、补水、上面膜、头、 肩、颈按摩)",
					number: 100,
					rate: "50%",
					price: "160.00",
					dow: "28"
				}, {
					id: 1,
					img: "http://imgxcx.yifulai.com/index_banner.jpg",
					state: 0,
					name: "补水护理(一般就是只清洁、补水、上面膜、头、 肩、颈按摩)",
					number: 100,
					rate: "40%",
					price: "160.00",
					dow: "28"
				}]
			}
		},
		mounted() {},
		methods: {
			changetabs(active) {
				this.active = active;
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},

			// 跳转拼团详情页
			toItem(id) {
				uni.navigateTo({
					url: '/pages/store/help/order-item?id=' + id
				});
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
				if (that.isDown) return that.$util.Tips({
					title: '正在下载海报,请稍后再试！'
				});
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
		}
	}
</script>

<style lang="less" scoped>
	.help_group {
		.top_body {
			height: 270px;

			/deep/ .header-bg {
				height: 540px/2;
			}

			.top_content {
				flex-direction: column;

				.title {
					margin-top: 200px/2;
					font-size: 68px/2;
					font-family: AliHYAiHei-Beta;
					color: #FFFFFF;
					text-shadow: 0px 6px 6px rgba(99, 216, 235, 0.46);
					z-index: 10;
				}

				.subtitle {
					margin: 20px/2 auto 30px/2;
					font-size: 36px/2;
					font-weight: bold;
					color: #FFFFFF;
					text-shadow: 0px 6px 6px rgba(99, 216, 235, 0.46);
					z-index: 10;
				}

				.users_list {
					z-index: 10;

					image {
						width: 54px/2;
						height: 54px/2;
						margin: 0 15px/2;
						border-radius: 50%;
					}
				}

				.number {
					z-index: 10;
					margin-top: 13px;
					font-size: 24px/2;
					color: #FFFFFF;
				}

				.fixed_bolck {
					position: absolute;
					top: 138rpx;
					right: 0;
					width: 135rpx;
					height: 57rpx;
					background: linear-gradient(76deg, rgba(123, 220, 235, 0.22) 0%, rgba(255, 255, 255, 0.22) 100%);
					// opacity: 0.22/2;
					border-radius: 100rpx*2 0rpx*2 0rpx*2 100rpx*2;
					font-size: 12rpx*2;
					font-weight: bold;
					color: #FFFFFF;
					z-index: 10;
				}
			}
		}

		.tabs_body {
			.content_body {
				padding: 21px/2;

				.flex-row {
					padding: 10px 0 25px;
				}

				.title {
					height: auto;
				}
			}

			.right {
				button {
					height: 25px;
					margin-bottom: 20rpx;
					&:first-child{
						background: linear-gradient(180deg, #59a0dd 0%, #60a7dd 100%) !important;
					}
				}
			}

			.price_block {
				display: flex;
				flex-direction: column;



				.price {
					font-size: 26rpx;
					color: #333;

					text {
						color: #FF002B;
					}
				}

				.badge {
					margin-top: 10rpx;
					display: inline-block;
					height: 18px;
					padding: 0;
					background: #FFF;
					border-radius: 9px;
					font-size: 26rpx;
					font-weight: bold;
					color: #333;
					line-height: 18px;

					text {
						color: #FF002B;
					}
				}
			}
		}

		.generate-posters {
			width: 100%;
			height: 170rpx;
			background-color: #fff;
			position: fixed;
			left: 0;
			bottom: 0;
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
	}
</style>
