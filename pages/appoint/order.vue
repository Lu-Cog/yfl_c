<template>
	<!-- 我的-预约订单 -->
	<view class="page admin_purchase-order tabs_body">
		<view class="tab_body flex-bt">
			<view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">全部</view>
			<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">待付定金</view>
			<view class="tab_item flex-center" @click="changetabs(3)" :class="{active:active==3}">预约成功</view>
			<view class="tab_item flex-center" @click="changetabs(5)" :class="{active:active==5}">待付余款</view>
			<view class="tab_item flex-center" @click="changetabs(4)" :class="{active:active==4}">预约失败</view>
		</view>
		<view class="content_body">
			<view class="content_list">
				<mynull class="mynull" :imgSrc="'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/null4.png'"
					:text="'暂无订单，快去逛逛吧~'" v-if="list.length==0"></mynull>
				<view v-else class="order_block" v-for="(item,index) in list" :key='index'>
					<view class="order-header flex-bt">
						<text class="order">
							<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/hanbao.png" mode="widthFix">
							</image>订单号&nbsp;{{item.order_sn}}
						</text>
						<text class="state">{{item.create_time}}</text>
					</view>
					<view class="order_mid">
						<image class="order-img" :src="item.image" mode="aspectFill"></image>
						<view class="order_content">
							<view class="name clamp">{{item.store_name}}</view>
							<view class="attribute">预约日期：<text>{{item.yydate}}</text></view>
							<view class="price_block flex-center">
								<view class="price">
									<text>￥</text>{{item.pay_price?item.pay_price:item.price+"-"+item.ot_price}}
								</view>
								<!-- <text class="old_price">￥</text> -->
							</view>
						</view>
					</view>

					<view class="hr"></view>
					<view class="flex-bt">
						<text class="git yes">{{item.status_tip}}</text>
					</view>
					<view class="button_block flex-center">
						<!-- '' -->
						<button v-if="item.show_pay==1" hover-class="none" class="flex-center"
							@click="goto('/pages/appoint/item?order_id='+item.order_id)">去支付</button>
						<button hover-class="none" class="flex-center"
							@click="goto('/pages/appoint/item?order_id='+item.order_id)">查看详情</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mynull from "../../components/my-components/mynull.vue"
	import {
		getYuOrderList
	} from '@/api/store.js'
	export default {
		components: {
			mynull
		},
		data() {
			return {
				imgSrc: "",
				text: '',
				active: 1,
				list: [],
				page:1
			}
		},
		onLoad() {
			this.getYuOrderList()
		},
		mounted() {

		},
		onReachBottom() {
			this.getYuOrderList(true)
		},
		onPullDownRefresh() {
			this.getYuOrderList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 400);
		},
		methods: {
			getYuOrderList(isClear) {
				let that = this
				if(!isClear){
					this.page = 1
					this.list = []
				}
				let data = {
					status: this.active - 1,
					page: this.page,
					limit: 10,
				}
				getYuOrderList(data).then(res => {
					let count = res.data.list.length
					if(count!=0){
						that.list = that.list.concat(res.data.list)
						that.page++
					}else{
						uni.showToast({
							title:'没有内容了',
							icon:'none'
						})
					}
				})
			},
			changetabs(active) {
				this.active = active;
				this.getYuOrderList()
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			
		}
	}
</script>

<style lang="less" scoped>
	.tabs_body .tab_body .tab_item {
		font-size: 26rpx;
	}
	.admin_purchase-order {
		.tab_body {
			top: 0
		}

		.mynull {
			/deep/ image {
				width: 171px/2;
				height: 199px/2;
			}
		}

		.content_body {
			padding: 15px;

			.order_block {
				.order-header {
					margin-bottom: 30px;

					.order {
						font-size: 24rpx;
						color: #7B7A7A;

						image {
							width: 34px/2;
							height: 21px/2;
							margin-right: 10px;
						}
					}

					.state {
						font-size: 24px/2;
						color: #7B7A7A;
					}
				}
			}

			.order_mid {
				margin-top: 0;
				margin-bottom: 10px;

				.order-img {
					width: 172px/2;
					height: 152px/2;
					border-radius: 10px/2;
				}

				.order_content {
					.name {
						font-size: 26px/2;
						line-height: 17px;
						height: 17px;
						font-weight: 500;
						color: #333333;
					}

					.attribute {
						font-size: 24px/2;
						color: #7B7A7A;
						margin-top: 23px/2;
					}

					.price_block {
						justify-content: flex-start;
						margin-top: 15px;

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

			.git {
				font-size: 28px/2;
				font-weight: 500;
				color: #FF3131;

				&.yes {
					color: #333333;
				}
			}
		}
	}
</style>
