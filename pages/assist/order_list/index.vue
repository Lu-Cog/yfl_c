<template>
	<!-- 我的-预约订单 -->
	<view class="page admin_purchase-order tabs_body">
		<view class="tab_body flex-bt">
			<view class="tab_item flex-center" @click="changetabs(0)" :class="{active:active==0}">全部</view>
			<view class="tab_item flex-center" @click="changetabs(1)" :class="{active:active==1}">拼团中</view>
			<view class="tab_item flex-center" @click="changetabs(2)" :class="{active:active==2}">拼团成功</view>
			<view class="tab_item flex-center" @click="changetabs(3)" :class="{active:active==3}">拼团失败</view>
		</view>
		<view class="content_body">
			
			<view class="content_list" v-if="active==0">	
				<mynull class="mynull" :imgSrc="'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/null4.png'"
					:text="'暂无订单，快去逛逛吧~'" v-if="list.length==0"></mynull>
				<view v-else class="order_block" v-for="(item,index) in list" :key="index">
					<view class="order-header flex-bt">
						<text class="order">
							<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/hanbao.png" mode="widthFix">
							</image>订单号&nbsp;{{item.order_assist_sn}}
						</text>
						<text class="state">{{item.add_time}}</text>
					</view>
					<view class="order_mid">
						<image class="order-img" :src="item.image"	mode="aspectFill"></image>
						<view class="order_content">
							<view class="name">{{item.title}}</view>

							<view class="price">
								<text>{{item.assist_price==0?'免费抢':item.assist_price}} </text>
								<text class="badge flex-center">原价¥{{item.ot_price}}</text>
							</view>
						</view>
						<text class="number">x{{item.num}}</text>
					</view>

					<view class="hr"></view>

					<view class="button_block flex-center">
						<view class="flex-bt">
							<text class="git yes" v-if="item.status==1">拼团中</text>
							<text class="git yes" v-else-if="item.status==2">拼团成功</text>
							<text class="git" v-else>拼团失败</text>
						</view>
						<button hover-class="none" class="flex-center"
							@click="goto('/pages/assist/detail?order_assist_id='+item.product_assist_set_id)">查看详情</button>
					</view>
				</view>
			</view>
			<view class="content_list" v-if="active==1">
				<mynull class="mynull" :imgSrc="'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/null4.png'"
					:text="'暂无订单，快去逛逛吧~'" v-if="list.length==0"></mynull>
				<view v-else class="order_block" v-for="(item,index) in list" :key="index">
					<view class="order-header flex-bt">
						<text class="order">
							<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/hanbao.png" mode="widthFix">
							</image>订单号&nbsp;{{item.order_assist_sn}}
						</text>
						<text class="state">{{item.add_time}}</text>
					</view>
					<view class="order_mid">
						<image class="order-img" :src="item.image"	mode="aspectFill"></image>
						<view class="order_content">
							<view class="name">{{item.title}}</view>
				
							<view class="price">
								<text>{{item.assist_price==0?'免费抢':item.assist_price}} </text>
								<text class="badge flex-center">原价¥{{item.ot_price}}</text>
							</view>
						</view>
						<text class="number">x{{item.num}}</text>
					</view>
				
					<view class="hr"></view>
				
					<view class="button_block flex-center">
						<view class="flex-bt">
							<text class="git yes" v-if="item.status==1">拼团中</text>
							<text class="git yes" v-else-if="item.status==2">拼团成功</text>
							<text class="git" v-else>拼团失败</text>
						</view>
						<button hover-class="none" class="flex-center"
							@click="goto('/pages/assist/detail?order_assist_id='+item.product_assist_set_id)">查看详情</button>
					</view>
				</view>
			</view>
			<view class="content_list" v-if="active==2">
				<mynull class="mynull" :imgSrc="'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/null4.png'"
					:text="'暂无订单，快去逛逛吧~'" v-if="list.length==0"></mynull>
				<view v-else class="order_block" v-for="(item,index) in list" :key="index">
					<view class="order-header flex-bt">
						<text class="order">
							<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/hanbao.png" mode="widthFix">
							</image>订单号&nbsp;{{item.order_assist_sn}}
						</text>
						<text class="state">{{item.add_time}}</text>
					</view>
					<view class="order_mid">
						<image class="order-img" :src="item.image"	mode="aspectFill"></image>
						<view class="order_content">
							<view class="name">{{item.title}}</view>
				
							<view class="price">
								<text>{{item.assist_price==0?'免费抢':item.assist_price}} </text>
								<text class="badge flex-center">原价¥{{item.ot_price}}</text>
							</view>
						</view>
						<text class="number">x{{item.num}}</text>
					</view>
				
					<view class="hr"></view>
				
					<view class="button_block flex-center">
						<view class="flex-bt">
							<text class="git yes" v-if="item.status==1">拼团中</text>
							<text class="git yes" v-else-if="item.status==2">拼团成功</text>
							<text class="git" v-else>拼团失败</text>
						</view>
						<button hover-class="none" class="flex-center"
							@click="goto('/pages/assist/detail?order_assist_id='+item.product_assist_set_id)">查看详情</button>
					</view>
				</view>
			</view>
			<view class="content_list" v-if="active==3">
				<mynull class="mynull" :imgSrc="'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/null4.png'"
					:text="'暂无订单，快去逛逛吧~'" v-if="list.length==0"></mynull>
				<view v-else class="order_block" v-for="(item,index) in list" :key="index">
					<view class="order-header flex-bt">
						<text class="order">
							<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/hanbao.png" mode="widthFix">
							</image>订单号&nbsp;{{item.order_assist_sn}}
						</text>
						<text class="state">{{item.add_time}}</text>
					</view>
					<view class="order_mid">
						<image class="order-img" :src="item.image"	mode="aspectFill"></image>
						<view class="order_content">
							<view class="name">{{item.title}}</view>
				
							<view class="price">
								<text>{{item.assist_price==0?'免费抢':item.assist_price}} </text>
								<text class="badge flex-center">原价¥{{item.ot_price}}</text>
							</view>
						</view>
						<text class="number">x{{item.num}}</text>
					</view>
				
					<view class="hr"></view>
				
					<view class="button_block flex-center">
						<view class="flex-bt">
							<text class="git yes" v-if="item.status==1">拼团中</text>
							<text class="git yes" v-else-if="item.status==2">拼团成功</text>
							<text class="git" v-else>拼团失败</text>
						</view>
						<button hover-class="none" class="flex-center"
							@click="goto('/pages/assist/detail?order_assist_id='+item.product_assist_set_id)">查看详情</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mynull from "@/components/my-components/mynull.vue"
	import {
		getOrderList
	} from '@/api/store'
	export default {
		components: {
			mynull
		},
		data() {
			return {
				imgSrc: "",
				text: '',
				active: 0,
				list: [],
				count: 0
			}
		},
		onLoad() {
			this.getOrderList(this.active)
		},

		methods: {
			getOrderList(active) {
				let that = this
				getOrderList(active).then(res => {
					that.count = res.data.count
					that.list = res.data.list
				})
			},
			changetabs(active) {
				this.active = active;
				this.getOrderList(active)
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
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
					margin-bottom: 15px;

					.order {
						font-size: 28px/2;
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
			}

			.button_block {
				justify-content: space-between;
				margin-top: 20rpx;
				button {
					border: none;
					outline: none;
					background: #1698AE;
					color: #fff;
				}
			}

			.git {
				font-size: 28px/2;
				font-weight: 500;
				color: #FF3131;

				&.yes {
					color: #1698AE;
				}
			}
		}
	}
</style>
