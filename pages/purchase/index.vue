<template>
	<!-- 预约-首页 -->
	<view class="page page_purchase">
		<view class="top_body">
			<view class="header_body">
				<image class="header-bg" :src="store.mer_banner?store.mer_banner:'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/item-img.png'" mode="aspectFill" />
				<text>预约</text>
			</view>
			<view class="top-bg">
				<view class="name_blcok flex-center">
					<image :src="store.mer_avatar"></image>
					<view class="right_blcok">
						<view class="name clamp">{{store.mer_name}}</view>
						<view class="state">{{state[store.shop_state-1]}}</view>
					</view>
				</view>
				<view class="score_block flex-center">
					<view class="score">店铺评分：<text>{{store.shop_rate}}</text>分</view>
					<view class="evaluate">评价：<text>{{store.pl_num}}</text>条</view>
				</view>
				<view class="hr" style="margin: 11px auto 11px;"></view>
				<view class="time_block flex-bt">
					<view class="left_block flex-center">
						<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/dn.png" mode="widthFix"></image>
						营业时间：{{store.mer_info}}
					</view>
					<!-- <navigator hover-class="none" :url="'/pages/mall/shop-item?mer_desc='+store.mer_desc+'&mer_banner='+store.mer_banner" class="right_blcok">商家介绍&nbsp;&gt;
					</navigator> -->
				</view>
			</view>
		</view>
		<view class="tabs_body">
			<view class="tab_body flex-bt" style="top: 0;">
				<view class="tab_item flex-center" @click="changetabs(1)"  :class="{active:active==1}">预约服务</view>
				<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">客户评价</view>
				<view class="tab_item flex-center" @click="changetabs(3)" :class="{active:active==3}" >联系商家</view>
			</view>
			<view class="content_body">
				<category :defaultActive='defaultActive' v-if="active==1" :categoryList="categoryList" :subCategoryList="subCategoryList"
					@categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick"></category>
				<view class="item" v-if="active==2">
					<view class="center">
						暂无评价
					</view>
				</view>
				<view class="item" v-if="active==3">
					<view class="center">
						暂无介绍
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import category from "../../components/qiyue-category/qiyue-category.vue"
	import numSelect from '../../components/poiuy-numSelect/numSelect.vue'
	import {
		getYuList
	} from '@/api/api.js'
	import {
		getStoreInfo
	} from '@/api/user';
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			category,
			numSelect,
		},
		computed: mapGetters(['isLogin', 'store_id']),
		onLoad() {
			this.mer_id = getApp().globalData.mer_id
			this.getYuList()
		},
		// 上拉刷新
		onPullDownRefresh() {
			this.getYuList()
			this.defaultActive=0
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 400);
		},
		onShow() {
			this.getStoreInfo()
		},
		data() {
			return {
				state:['营业中','暂停营业','打烊'],
				title: '',
				imgSrc: '',
				categoryList: [],
				subCategoryList: [],
				active: 1,
				isShow: false, // 公告展示状态 true展示 false不展示
				isOpen: false, //结算弹框状态 true展示 false不展示
				totals: 0, // 总数
				totalPrices: 0 ,//总价
				mer_id:0,
				store:{},
				defaultActive:0
			}
		},
		created() {
			this.total
			this.totalPrice
		},
		// mounted() {
		// 	for (var i = 0; i < 20; i++) {
		// 		var subList = [];
		// 		for (var j = 0; j < 30; j++) {
		// 			subList.push({
		// 				"name": "粉红丝带美容院胸部护理疏通乳腺散结美韵丰韵按摩精油套盒",
		// 				"logo": "https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg"
		// 			})
		// 		}
		// 		this.categoryList.push({
		// 			"name": "美容护理",
		// 			"subCategoryList": subList
		// 		})
		// 	}
		// 	this.subCategoryList = this.categoryList[0].subCategoryList;
		// 	// this.categoryList = []
		// },

		methods: {
			getStoreInfo() {
				let that = this
				getStoreInfo(that.mer_id).then(res => {
					that.store = res.data.store
				})
			},
			getYuList() {
				getYuList(this.mer_id).then(res => {
					this.categoryList = res.data
					this.subCategoryList = res.data[0].list
				})
			},
			categoryMainClick(category,index) {
				this.subCategoryList = category.list;
				this.defaultActive = index
			},
			categorySubClick(category) {
				if (this.isLogin) {
					uni.navigateTo({
						url: "/pages/form/on-order?category=" + JSON.stringify(category)
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

			// tabs栏选中
			changetabs(active) {
				if(active==2){
					uni.navigateTo({
						url: '/pages/mall/shop-evaluate'
					})
					
				}else if(active==3){
					uni.navigateTo({
						url: '/pages/mall/shop-item?mer_desc='+this.store.mer_desc+'&mer_banner='+this.store.mer_banner+'&lat='+this.store.lat+'&lng='+this.store.lng+'&detail='+this.store.detail+'&mer_name='+this.store.mer_name+'&phone='+this.store.contact_phone
					})
					
				}
				
			},

		},
	}
</script>

<style lang="less" scoped>
	.header_body {
		width: 100%;
		position: relative;
		.back {
			position: absolute;
			top: 46px;
			left: 25px;
			z-index: 10;
			width: 18px;
		}
	
		.header-bg {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			// height: auto;
			// z-index: 1;
		}
	
		text {
			position: absolute;
			top: 43px;
			left: 0;
			right: 0;
			margin: auto;
			z-index: 10;
			font-size: 36px/2;
			color: #FFFFFF;
			text-align: center;
			width: 70%;
		}
	}
	.page_purchase {
		// padding-bottom: 112px/2;

		.content_body {
			.item {

				.center {
					text-align: center;
					margin-top: 200rpx;
					color: #999999;
				}
			}

		}

		.tab_body {
			position: relative;
		}

		.top_body {
			height: 210px;
			position: relative;

			/deep/ .header-bg {
				height: 210px;
			}

			.top-bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 420px/2;
				background: rgba(000, 000, 000, .45);
				z-index: 1;
				padding: 33px/2;
				padding-top: 140rpx;

				.name_blcok {
					justify-content: flex-start;

					image {
						flex-basis: 60px;
						flex-grow: 0;
						flex-shrink: 0;
						height: 60px;
						border-radius: 50%;
					}

					.right_blcok {
						margin-left: 8px;

						.name {
							font-size: 15px;
							line-height: 15px;
							height: 15px;
							font-weight: bold;
							color: #FFFFFF;
							margin-bottom: 11px;
						}

						.state {
							font-size: 12px;
							line-height: 12px;
							font-weight: 500;
							color: #FFFFFF;
						}
					}
				}

				.score_block {
					margin-bottom: 10px;

					view {
						font-size: 14px;
						font-weight: 500;
						color: #FFFFFF;

						&:last-child {
							margin-left: 89px/2;
						}

						text {
							font-size: 18px;
						}
					}
				}

				.time_block {
					.left_block {
						font-size: 12px;
						font-weight: 500;
						color: #FFFFFF;

						image {
							width: 20px;
							height: 20px;
							margin-right: 10px;
						}
					}

					.right_blcok {
						font-size: 12px;
						font-weight: 500;
						color: #FFFFFF;
					}
				}
			}
		}


		.notice_body {
			margin-top: 10px;
			background: #fff;
			padding-top: 27px/2;
			padding-left: 29px/2;
			padding-right: 55px/2;
			padding-bottom: 5px;

			.notice_title {
				margin-bottom: 28px/2;

				.title_left {
					image {
						margin-right: 15px/2;
						width: 39px/2;
						height: 29px/2;
					}

					font-size: 34px/2;
					font-weight: bold;
					color: #333333;
				}

				.title_right {
					font-size: 28px/2;
					font-weight: 500;
					color: #999999;

					image {
						width: 19px/2;
						height: 12px/2;
						margin-left: 15px/2;
					}

					.is_show {
						// transform: (180deg);
					}
				}
			}

			.notice_list {
				.list_item {
					margin-bottom: 24px/2;
					font-size: 24px/2;
					color: #666666;

					.badge {
						min-width: 126px/2;
						height: 36px/2;
						line-height: 36px/2;
						padding: 0 5px;
						background-color: #ee502f;
						border-radius: 10px 0 10px 0;
						font-size: 24px/2;
						font-weight: 500;
						font-style: italic;
						color: #FFFFFF;
						margin-right: 24px/2;
					}
				}
			}
		}

		.title {
			display: flex;
			align-items: center;
			font-size: 30px/2;
			font-weight: bold;
			color: #333333;
			height: 51px/2;
			line-height: 51px/2;
			padding-left: 24px/2;
			position: relative;
			margin: 32px/2 0 17px/2;

			&::before {
				content: " ";
				position: absolute;
				top: 0;
				left: 0;
				width: 6px/2;
				height: 51px/2;
				background: #1698AE;
			}

			.red-i {
				width: 18px/2;
				height: 21px/2;
				margin-left: 24px;
			}

			.red_title {
				margin-left: 4px;
				font-size: 30px/2;
				font-weight: bold;
				color: #333333;
			}

			.red_content {
				font-size: 24px/2;
				font-weight: 500;
				color: #999999;
				margin-left: 10px;
			}
		}

		.goods_nav {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 112px/2;
			background: #FFFFFF;

			.left_block {
				margin-left: 34px/2;

				.cart_block {
					position: relative;

					image {
						width: 50px;
						height: 50px;
					}

					.badge {
						position: absolute;
						right: 0;
						top: 0;
					}
				}

				.price {
					margin-left: 10px;
					font-size: 22px;
					font-weight: bold;
					color: #FF002B;
				}

				.old_price {
					margin-left: 7px;
					font-size: 14px;
					font-weight: 500;
					text-decoration: line-through;
					color: #999999;
				}
			}

			.right_btn {
				width: 120px;
				height: 100%;
				background: #1698AE;
				font-size: 15px;
				font-weight: 500;
				color: #FFFFFF;
				border-radius: 0;
			}
		}

		.popup_blcok {
			width: 100%;
			background: #FFFFFF;
			z-index: 5;
			position: fixed;
			bottom: 112px/2;
			left: 0;


			.top {
				width: 100%;
				height: 30px;
				background: #FEF8D8;
				font-size: 12px;
				font-weight: bold;
				color: #BF743B;
			}

			.mid {
				padding: 34px/2 35px/2;

				.left_block {
					font-size: 12px;
					font-weight: 500;
					color: #999999;
				}

				.right_block {
					image {
						width: 14px;
						height: 14px;
						margin-right: 5px;
					}

					font-size: 12px;
					font-weight: 500;
					color: #999999;
				}
			}

			.popup_list {
				padding: 0 15px;
				height: 200px;
				overflow-y: scroll;

				.flex-row {
					justify-content: flex-start;
					margin-bottom: 20px;

					.name {
						position: relative;
						font-size: 14px;
						font-weight: bold;
						color: #333333;

						padding-left: 10px;

						&::before {
							position: absolute;
							top: 5px;
							bottom: 0;
							left: 0;
							margin: auto;
							content: ' ';
							width: 5px;
							height: 5px;
							border-radius: 50%;
							background: #1698AE;
						}
					}

					.price {
						flex-basis: 70px;
						flex-grow: 0;
						flex-shrink: 0;
						margin-left: 25px/2;
						margin-right: 10px;
						font-size: 14px;
						font-weight: bold;
						color: #F7302A;
					}

					.select_blcok {
						flex-basis: 80px;
						flex-grow: 0;
						flex-shrink: 0;
					}
				}
			}
		}
	}
</style>
