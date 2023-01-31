<template>
	<view>
		<view class="tabs_body_s">
			<ms-tabs @input="input" :list="list2" v-model="active" :lineColor="lineColor" :itemColor="itemColor">
			</ms-tabs>
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
		<!-- <category :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick"
			@categorySubClick="categorySubClick"></category> -->
	</view>
</template>

<script>
	import category from "../../components/qiyue-category/qiyue-category.vue"
	import {
		getIndexList
	} from '@/api/store'
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			category,
		},
		computed: mapGetters(['isLogin', 'store_id']),
		onLoad() {
			this.getIndexList()
		},
		// 上拉刷新
		onPullDownRefresh() {
			this.getIndexList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 400);
		},
		data() {
			return {
				categoryList: [],
				subCategoryList: [],
				list2: [],
				tabsList: [],
				index: 0,
				active: 0,
				itemColor: "#1698AE", //tabs选中颜色
				lineColor: "#1698AE", //下划线颜色
			};
		},
		methods: {
			input(index) {
				this.index = index
				this.tabsList = this.list2[index].list
			},
			getIndexList() {
				getIndexList(this.store_id).then(res => {
					this.list2 = res.data
					this.tabsList = res.data[this.index].list
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
			// getIndexList() {
			// 	getIndexList().then(res => {
			// 		this.categoryList = res.data
			// 		this.subCategoryList = res.data[0].list
			// 	})
			// },
			// categoryMainClick(category) {
			// 	this.subCategoryList = category.list;
			// },
			// categorySubClick(category) {
			// 	if (this.isLogin) {
			// 		uni.navigateTo({
			// 			url: '/pages/goods_details/index?id=' + category.product_id
			// 		})
			// 	} else {
			// 		uni.showModal({
			// 			title: '提示',
			// 			content: '你还未登录，是否跳转到授权页？',
			// 			success: function(res) {
			// 				if (res.confirm) {
			// 					uni.switchTab({
			// 						url: '/pages/wallet/index'
			// 					})
			// 				} else if (res.cancel) {
			// 					console.log('用户点击取消');
			// 				}
			// 			}
			// 		})
			// 	}

			// },
		}
	}
</script>

<style lang="less">
	.tabs_body_s {

		// background: #fff;
		// padding-top: 10px;
		>.title {
			align-items: flex-end;
			justify-content: flex-start;
			font-size: 17px;
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
</style>
