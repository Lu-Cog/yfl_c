<template>
	<!-- 首页 -->
	<view class="page page_index">
		<view class="headder_body">
			<view class="header_bg clamp">{{store.mer_name}}</view>
		</view>
		<view class="search-bg flex-bt">
			<view class="search_body flex-center">
				<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/search.png" mode="widthFix"></image>
				<input type="text" value="" placeholder="输入关键字搜索" />
			</view>
			<view class="sign-in flex-center" @click="goto('/pages/points-mall/qiandao')">
				<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/qiandao.png" mode="widthFix"></image>
				<text>签到</text>
			</view>
		</view>
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in banner" :key="index" @click="gotos(item.url)">
						<image class="swiper-item banner" :src="item.pic" mode="widthFix">
						</image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="notice_body flex-bt">
			<view class="left_block flex-center">
				<swiper vertical="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(item,index) in news_list" :key="index">
						<image class="i-gb" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/index_icon7.png"
							mode="widthFix"></image>
						<text class="clamp">{{item.title}}</text>
					</swiper-item>
				</swiper>

			</view>
			<view class="right_block flex-center">
				<navigator open-type="switchTab" url="/pages/purchase/index" class="left_hr hr">更多</navigator>
			</view>
		</view>
		<!-- #ifdef MP -->
		<!--直播-->
		<view class="main" v-if="liveList.length > 0">
			<view class="live-count">
				<view>
					<!-- 直播 -->
					<block>
						<view class="spike-bd">
							<view class="title line1">直播专场</view>
							<navigator url="/pages/activity/liveBroadcast/index" class="more-btn" hover-class="none">
								更多<text class="iconfont icon-jiantou" hover-class='none'></text></navigator>
						</view>
						<view class="live-wrapper mores">
							<scroll-view scroll-x="true" style="white-space: nowrap; display: flex">
								<view class="item" v-for="(item, index) in liveList" :key="index">
									<!-- <subscribe
									    :room-id="roomId"
									    :width="width"
									    :height="height"
									    :font-size="fontSize"
									    :color="color"
									    :background-color="backgroundColor"
									    :custom-params="customParams"
									    @click="onSubscribe">
									</subscribe> -->
									<!-- '/pages/activity/liveBroadcast/liveSubscribe?room_id='+item.room_id -->
									<navigator hover-class="none" :url="item.link">
										<view class="live-top"
											:style="'background:' + (item.live_status == 101 ? playBg : (item.live_status != 101 && item.live_status != 102) ? endBg : notBg) + ';'"
											:class="item.live_status == 102 ? 'playRadius' : 'notPlayRadius'">
											<block v-if="item.live_status == 101">
												<image src="/static/images/live-01.png" mode=""></image>
												<text>直播中</text>
											</block>
											<block v-if="item.live_status == 103 && item.replay_status === 1">
												<image src="/static/images/live-02.png" mode=""></image>
												<text>回放</text>
											</block>
											<block
												v-if="(item.live_status != 101 && item.live_status != 102 && item.live_status != 103) ||  (item.live_status == 103 && item.replay_status == 0)">
												<image src="/static/images/live-02.png" mode=""></image>
												<text>已结束</text>
											</block>
											<block v-if="item.live_status == 102">
												<image src="/static/images/live-03.png" mode=""></image>
												<text>预告</text>
											</block>
										</view>
										<view v-if="item.live_status == 101 || item.live_status == 102"
											class="broadcast-time">{{ item.show_time }}</view>
										<image :src="item.share_img"></image>
										<!-- <view class="live-title">{{ item.live_status }}</view> -->
									</navigator>
								</view>
							</scroll-view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<!-- <navigator url="../activity/liveBroadcast/liveSubscribe">进入订阅</navigator> -->
		<!-- #endif -->
		<view class="tabs_body" v-if="goods_list.length!=0">
			<view class="title flex-center">
				抢多多<text>翌芙莱福利大放送，好物抢不停</text>
			</view>
			<view class="content_body">

				<view class="content_list">
					<view class="card_block" v-for="(item,index) in goods_list" :key="index"
						@click="toItem(item.product_assist_id)">
						<view class="banner-img">
							<image :src="item.img" mode="widthFix"></image>
							<view class="mask_box flex-center" v-if="item.status === 2">
								<text>抢光了</text>
							</view>
						</view>
						<view class="card_content">
							<view class="title clamp2">{{item.title}}</view>
							<view class="flex-row flex-bt">
								<view class="progress_body">
									<view class="now" :style="{width:item.sold_bfb+'%'}">目前进度</view>
									<text class="number">已拼{{item.sold_num}}件</text>
									<text class="rate">{{item.sold_bfb+"%"}}</text>
								</view>
								<!-- <view class="price_block flex-center">
									<text class="price">¥{{item.price}}</text>
									<text class="badge flex-center">已降{{item.dow}}元</text>
								</view> -->
								<!-- 按钮状态 抢光了：no  去拼团:'' -->

								<button hover-class="none" class="flex-center" @click="goto('')">免费抢</button>
							</view>

						</view>
					</view>
				</view>

			</view>

		</view>
		<view class="tabs_body_s">
			<view class="title flex-center">
				热销产品
			</view>
			<view class="tabs_list flex-bt">
				<view class="nogoods" v-if="tabsList.length==0">
					暂无商品
				</view>
				<view v-else class="list_item" v-for="(item,index) in tabsList" :key="index"
					@click="getdatails(item.product_id)">
					<image :src="item.image" mode="widthFix"></image>
					<view class="item_text">
						<view class="name clamp">
							{{item.store_name}}
						</view>
						<view class="price_block flex-center">
							<view class="price">
								<text>￥</text>{{item.price}}
							</view>
							<text class="old_price">￥{{item.ot_price}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup2" type="center">
			<view class="popup_content">
				<view @click="goNew()">
					<image class="imgNew" :src="img111" mode="widthFix"></image>
				</view>
				<image class="del-i" src="http://imgxcx.yifulai.com/del2.png" mode="widthFix" @click="close()"></image>
			</view>
		</uni-popup>
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
	
	import Routine from '@/libs/routine';
	import mstabs from "../../components/ms-tabs/ms-tabs.vue"
	import {
		getSessionKey
	} from '@/api/public';
	import {
		getStoreInfo
	} from '@/api/user';
	import {
		getProductList,
		getIndexTjList,
		getLiveList
	} from '@/api/store'
	import {
		mapGetters
	} from "vuex";
	import Cache from '@/utils/cache';
	export default {
		components: {
			mstabs
		},
		computed: mapGetters(['isLogin', 'store_id', 'uid']),
		data() {
			return {
				params:'',
				roomId: 1,
				width: 120,
				height: 41,
				fontSize: 17,
				color: '#FFFFFF',
				backgroundColor: '#6467F0',
				customParams: encodeURIComponent(JSON.stringify({
					path: 'pages/index/index',
					pid: 1
				})),
				banner: [],
				goods_list: [],
				liveList: [], //直播
				news_list: [],
				tabsList: [],
				store: {},
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				posterbackgd: '/static/images/posterbackgd.png',
				title: '',
				imgSrc: '',
				active: 0,
				tabs: '',
				itemColor: "#1698AE", //tabs选中颜色
				lineColor: "#1698AE", //下划线颜色
				index: 0,
				spid: '',
				mer_id: 0,
				act_type:0
			}
		},
		watch: {
			active() {
				// console.log(this.active) // 0
				// this.list3 = this.list2
				this.tabs = this.active;
				// console.log("2222", this.tabs)
			}
		},
		onShareAppMessage(res) {
			return {
				title: 'YFL抢多多',
				path: '/pages/index/index'
			}
		},
		// 上拉刷新
		onPullDownRefresh() {
			let that = this
			if (that.isLogin) {
				that.getProductList();
				that.getLiveList()
			} else {
				console.log("onshow", this.isLogin);
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif
				// that.isShowAuth=true;
			}
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 400);
		},
		onLoad(option) {
			this.params = app.globalData.params
			this.mer_id = option.mer_id ? option.mer_id : this.store_id
			store.commit('STOREID', {
				store_id: this.mer_id
			});
			getApp().globalData.mer_id = this.mer_id
			console.log(this.store_id, "indexonload");
			if (option.spid != "" && option.spid != undefined) {
				this.spid = Number(option.spid)
				getApp().globalData.spid = this.spid
				// store.commit('SETUID', Number(options.spid));
			}
			// this.getStoreInfo()
		},
		onShow() {
			console.log(this.isLogin, this.mer_id, this.store_id, "onshow");
			if (!this.isLogin) {
				// this.getSess()
			}
			// #ifdef MP
			this.getLiveList()
			// #endif
			this.getIndexTjList()
			this.getProductList()
			this.getStoreInfo()
		},
		methods: {
			goNew() {
				//活动单页
				uni.navigateTo({
					url: '/pages/index/new'
				})
				
				this.close()
			},
			close() {
				this.$refs.popup2.close()
			},
			open() {
				this.$refs.popup2.open()
			},
			
			// #ifdef MP
			// 直播
			getLiveList() {
				let that = this;
				let data = {
					spid: this.uid,
					mer_id: getApp().globalData.mer_id
				}
				let datas = encodeURIComponent(JSON.stringify(data))
				getLiveList().then(res => {
					that.liveList = res.data.list;
					that.liveList.forEach((val) => {
						val.link = ((val.live_status == 103 && val.replay_status) || val.live_status ===
								101 || val.live_status ===
								102) ?
							'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + val
							.room_id + '&custom_params=' + datas : ''
					});
				}).catch((e) => {});;
			},
			// #endif
			gotos(id) {
				if (id != "#" && Number(id) > 0) {
					uni.navigateTo({
						url: '/pages/goods_details/index?id=' + id
					})
				}

			},
			getIndexTjList() {
				getIndexTjList(this.store_id).then(res => {
					this.tabsList = res.data
				})
			},
			getdatails(id) {
				if (this.isLogin) {
					uni.navigateTo({
						url: '../goods_details/index?id=' + id
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '你还未登录，是否跳转到授权页？',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/wallet/index'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}

			},
			onSubscribe(e) {
				console.log('房间号：', e.detail.room_id)
				console.log('订阅用户openid', e.detail.openid)
				console.log('是否订阅', e.detail.is_subscribe)
			},
			getProductList() {
				let that = this
				let param = {
					"store_id": this.store_id,
					'page': 1,
					'limit': 1000
				}
				getProductList(param).then(res => {
					that.goods_list = res.data.list
					// console.log(res,'getProductList');
				})
			},
			getStoreInfo() {
				let that = this
				getStoreInfo(this.store_id,{spid:getApp().globalData.spid}).then(res => {
					that.banner = res.data.banner
					that.news_list = res.data.news_list
					that.store = res.data.store
					that.act_type = res.data.store.act_open
					uni.setStorageSync('act_open',that.act_type)
					 //关闭弹窗
					if (that.act_type == 0) {
						this.close()
					}else if(app.globalData.act_open != 100){
						//只弹一次
						app.globalData.act_open = that.act_type
						this.open()
					}
					
					this.img111 = res.data.store.act_pop.ad1
					//商城横幅页广告
					if(that.act_type == 1){
						uni.setStorageSync('img111', res.data.store.act_pop.ad2)
					}
					app.globalData.mer_id = res.data.store.mer_id
					store.commit('STOREID', {
						store_id: res.data.store.mer_id
					});
				})
			},
			getSess() {
				Routine.getCode().then(res2 => {
					getSessionKey({
						"code": res2.code
					}).then(res => {
						console.log(res, "index");
						app.globalData.stype = res.data.stype
						let time = res.data.expires_time - Cache.time();
						store.commit('STYPE', {
							stype: res.data.stype,
							time: time
						});
						if (app.globalData.stype == 3) {
							store.commit('UPDATE_USERINFO', res.data.userInfo);
							store.commit('LOGIN', {
								token: res.data.token,
								time: time
							});
							store.commit('STOREID', {
								store_id: res.data.userInfo.mer_id
							});

							store.commit('SETUID', res.data.userInfo.uid);
							Cache.set(EXPIRES_TIME, res.data.expires_time, time);
							Cache.set(USER_INFO, res.data.userInfo, time);
							this.getIndexTjList()
							this.getProductList()
							this.getStoreInfo()
						}
					})
				});
			},
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
					url: '/pages/assist/item?store_id=' + this.store_id + '&assist_id=' + id
				});
			}

		}
	}
</script>

<style lang="less">
	.main {
		padding: 0 20rpx;

		/*直播*/
		.spike-bd {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx 20rpx 20rpx;
		}

		.live-count {
			background-color: #fff;
			margin: 20rpx 0;
			border-radius: 16rpx;
			padding: 20rpx;
			box-shadow: 4rpx 2rpx 12rpx 2rpx rgba(0, 0, 0, 0.03);
		}

		.live-wrapper {
			position: relative;
			width: 100%;
			overflow: hidden;
			border-radius: 16rpx;

			image {
				width: 100%;
				height: 400rpx;
			}

			.live-top {
				z-index: 20;
				position: absolute;
				left: 0;
				top: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				width: 120rpx;
				height: 32rpx;

				&.playRadius {
					border-radius: 0;
				}

				&.notPlayRadius {
					border-radius: 0rpx 0px 18rpx 0px;
				}

				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 6rpx;
					/* #ifdef H5 */
					display: block;
					/* #endif */
				}
			}

			.broadcast-time {
				z-index: 20;
				position: absolute;
				left: 110rpx;
				top: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				width: 160rpx;
				height: 36rpx;
				background: rgba(0, 0, 0, .4);
				font-size: 22rpx;
				border-radius: 0 0 18rpx 0;
			}

			.live-title {
				position: absolute;
				left: 0;
				bottom: 6rpx;
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 30rpx;
				color: #fff;
				background: rgba(0, 0, 0, 0.35);
			}

			&.mores {
				width: 100%;

				.item {
					position: relative;
					width: 280rpx;
					height: 224rpx;
					display: inline-block;
					border-radius: 16rpx;
					overflow: hidden;
					margin-right: 20rpx;

					image {
						// width: 320rpx;
						height: 180rpx;
						border-radius: 16rpx;
					}

					.live-title {
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						font-size: 22rpx;
					}

					.live-top {
						width: 110rpx;
						height: 32rpx;
						font-size: 22rpx;

						image {
							width: 20rpx;
							height: 20rpx;
						}
					}
				}
			}
		}
	}

	.page_index {
		.headder_body {
			display: flex;
			background: #fff;
			padding: 45px 0 10px;
			font-size: 30rpx;
		}

		.header_bg {
			width: 300px;
			padding-left: 15px;
		}

		.search-bg {
			padding: 20px/2 30px/2;

			.search_body {
				// width: 615px/2;
				flex: 1;
				height: 70px/2;
				background: #fff;
				border-radius: 10px/2;
				justify-content: flex-start;
				padding: 9px;

				image {
					width: 16px;
					height: 12px;
					margin-right: 16px/2;
				}

				input {
					font-size: 28px/2;
					flex: 1;
					color: #BDBDBD;
				}

			}

			.sign-in {
				flex-direction: column;
				margin-left: 40rpx;

				text {
					font-size: 10px;
					color: #000000;
				}

				image {
					width: 18px;
				}
			}
		}

		.swiper {
			height: 362px/2;
			width: 100%;

			.banner {
				width: 100%;
				margin: auto;
				display: block;
			}
		}

		.notice_body {
			height: 45px;
			background: #FFFFFF;
			padding: 8px 14px;

			.left_block {
				// height: 45px;
				width: 100%;

				swiper {
					height: 20px;
					width: 100%;

					swiper-item {
						display: flex;
						align-items: center;
					}
				}

				.i-gb {
					width: 18px;
					height: 35px/2;
				}

				text {
					margin-left: 10px;
					font-size: 12px;
					font-weight: 500;
					color: #3F3F3F;
				}
			}

			.right_block {
				flex-basis: 50px;
				flex-grow: 0;
				flex-shrink: 0;

				.left_hr {
					// width: 1px;
					height: 15px;
					margin-right: 10px;
				}
			}
		}

		.banner_block {
			margin-top: 10px;
			background: #FFFFFF;
			padding: 0 17px/2;



			.banner {
				.banner_item {
					width: 49%;
					background: #E7F5FE;
					justify-content: flex-start;

					&:last-child {
						background: #FCEDF4;
					}

					.item-img {
						width: 117.8px/2;
						height: 203px/2;
					}

					.right_blcok {
						flex-direction: column;
						align-items: flex-start;

						.flex-row {
							.name {
								margin: 0;
								font-size: 14px;
								font-weight: bold;
								color: #333333;
								margin-right: 4px;
							}

							.kill_block {
								/deep/ .uni-countdown__number {
									width: 14px;
									height: 14px;
									line-height: 14px;
									font-size: 11px;
									margin: 0;
									border-radius: 1.5px;
								}

								/deep/ .uni-countdown__splitor {
									line-height: 14px !important;
									font-size: 11px !important;
									padding: 0;
									color: #FA475D !important;
									margin-left: 0 !important;
								}
							}
						}

						.subtitle {
							margin: 4px 0;
							font-size: 12px;
							font-weight: 500;
							color: #1698AE;
						}

						.goto {
							width: 67px/2;
							height: 27px/2;
							background: #FF2A2A;
							border-radius: 3px;
							font-size: 21px/2;
							font-family: 59;
							color: #FFFFFF;
						}
					}
				}
			}
		}

		.banner-img {
			// margin: 19px/2 8px;

			image {
				width: 100%;
			}
		}

		.tabs_body_s {

			// background: #fff;
			// padding-top: 10px;
			>.title {
				align-items: flex-end;
				justify-content: flex-start;
				font-size: 34px/2;
				font-weight: bold;
				color: #333333;
				background-color: #fff;
				padding: 20px 10.5px;

				text {
					font-size: 12px;
					font-weight: 400;
					color: #999999;
					margin-left: 10px;
				}
			}

			.tabs_list {
				padding: 15px/2;
				height: 30vh;
				flex-wrap: wrap;

				.nogoods {
					width: 100%;
					color: #999;
					text-align: center;
				}

				.list_item {
					width: 48%;
					margin-bottom: 45px/2;
					padding-bottom: 35px/2;
					box-shadow: 0px 0px 9px 0px rgba(141, 141, 141, 0.24);

					image {
						width: 100%;
						height: 400px/2;
					}

					.item_text {
						padding: 0 4px;

						.name {
							font-size: 14px;
							color: #000000;
							margin-top: 5px;
						}

						.price_block {
							justify-content: flex-start;
							align-items: flex-end;
							margin-top: 5px;

							.price {
								font-size: 18px;
								line-height: 18px;
								font-weight: 500;
								color: #FF4242;

								text {
									font-size: 12px;
								}
							}

							.old_price {
								margin-left: 23px/2;
								font-size: 12px;
								font-weight: 500;
								text-decoration: line-through;
								color: #999999;
							}
						}
					}
				}
			}
		}

		.order_content {
			.price {
				display: flex;
				align-items: center;
			}

			.badge {
				margin-left: 3px;
				display: inline-block;
				height: 16px;
				padding: 0 10px;
				background: #fee4ce;
				border-radius: 9px;
				font-size: 8px;
				font-weight: bold;
				color: #FF002B;
				line-height: 16px;
				text-decoration: line-through;
			}
		}

		// 后期删除
		.grid_body {
			display: flex;
			flex-wrap: wrap;

			.grid_item {
				height: 306px/3;
				width: 32.6%;
				flex-direction: column;
				background: #ffffff;
				margin-right: 5px/2;
				margin-bottom: 5px/2;

				&:nth-child(3n) {
					margin-right: 0;
				}

				position: relative;

				.badge {
					position: absolute;
					top: 0;
					right: 0;
					left: 20px;
					bottom: 40px;
					margin: auto;
					width: 30px/2;
					height: 30px/2;
					border: 1px solid #FF0000;
					background: #fff;
					border-radius: 10px;
					font-size: 20px/2;
					font-weight: 500;
					color: #FF0000;
					z-index: 30;
				}

				.img_box {
					width: 24px;
					height: 48px/2;

					.img {
						width: 24px;
						height: 48px/2;
					}
				}

				.text {
					font-size: 14px;
					font-weight: 500;
					color: #333333;
					margin-top: 10px;
				}
			}
		}

		.tabs_body {
			>.title {
				align-items: flex-end;
				justify-content: flex-start;
				font-size: 34px/2;
				font-weight: bold;
				color: #333333;
				background-color: #fff;
				padding: 20px 10.5px;

				text {
					font-size: 12px;
					font-weight: 400;
					color: #999999;
					margin-left: 10px;
				}
			}


			.content_body {
				padding: 21px/2;

				button {
					background: #1698AE;
					box-shadow: none;
				}

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

					&:first-child {
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


	}
</style>
