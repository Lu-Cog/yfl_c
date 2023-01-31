<template>
	<!-- 推广文案-首页 -->
	<view class="page extend-index tabs_body">
		<view class="tab_body flex-bt">
			<view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">收藏的商品</view>
			<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">收藏的项目</view>
		</view>
		<view class="content_body">
			<view class="content_list" v-if="active==1">
				<view v-if="true" style="text-align: center;width: 100%; margin-top: 100rpx; color: rgb(153, 153, 153);">
					<text>暂无内容</text>
				</view>
				<!-- <view class="order_block flex-bt" @click="toItem()">
					<view class="order_mid">
						<image class="order-img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg" mode="aspectFill"></image>
						<view class="order_content flex-bt">
							<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
							<view class="price_block flex-center">
								<view class="price">
									<text>￥</text>33.9
								</view>
								<text class="old_price">￥39.9</text>
							</view>
						</view>
					</view>
					<view class="order_right">取消收藏</view>
				</view> -->
			</view>
			<view class="content_list" v-if="active==2">
				<view v-if="true" style="text-align: center;width: 100%; margin-top: 100rpx; color: rgb(153, 153, 153);">
					<text>暂无内容</text>
				</view>
				<!-- <view class="order_block flex-bt">
					<view class="order_mid">
						<image class="order-img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg" mode="aspectFill"></image>
						<view class="order_content flex-bt">
							<view class="name clamp2">翌芙莱一品莲保湿润肤水翌芙莱一品莲保湿润肤水翌芙莱一</view>
							<view class="price_block flex-center">
								<view class="price">
									<text>￥</text>33.9
								</view>
								<text class="old_price">￥39.9</text>
							</view>
						</view>
					</view>
					<view class="order_right">取消收藏</view>
				</view> -->
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				active: 1,
			}
		},
		mounted() {

		},
		methods: {
			changetabs(active) {
				this.active = active;
			},
			toItem() {
				uni.navigateTo({
					url: "./extend-item"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.extend-index {
		.content_body {
			// padding: 15px;
			padding-top: 10px;

			.order_mid {
				margin-top: 0;

				.order-img {
					width: 80px;
					height: 80px;
					border-radius: 10px/2;
				}

				.order_content {
					flex-direction: column;
					align-items: flex-start;

					.name {
						font-size: 30px/2;
						color: #333333;
						line-height: 48px/2;
						height: 48px;
					}

					.price_block {
						justify-content: flex-start;

						.price {
							font-size: 20px;
							line-height: 20px;
							font-weight: bold;
							color: #FF3535;
							margin-top: 0;
							margin-right: 15px;

							text {
								font-size: 14px;
							}
						}

						.old_price {
							font-size: 14px;
							font-weight: 500;
							text-decoration: line-through;
							color: #999999;
						}
					}
				}
			}

			.order_right {
				width: 110px;
				text-align: right;
				height: 86px;
				font-size: 12px;
				color: #999999;
			}

		}
	}
</style>
