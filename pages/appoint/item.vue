<template>
	<!-- 我的-预约详情 -->
	<view class="page help_order">
		<myhead :title="'预约详情'"></myhead>
		<view class="top_body flex-bt">
			<view class="left_block">
				<view class="name">{{orderDetail.status_tip}}</view>
				<view class="time">{{orderDetail.pay_tip}}</view>
			</view>
			<image class="right_block" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/appoint.png"
				mode="widthFix"></image>
		</view>

		<view class="mid_block">
			<view class="order_content flex-center">
				<image class="order_img" :src="orderDetail.image" mode="aspectFill"></image>
				<view class="right_blcok">
					<view class="name clamp">{{orderDetail.store_name}}</view>
					<view class="price_block flex-center">
						<view class="price">
							<text>￥</text>{{orderDetail.pay_price?orderDetail.pay_price:orderDetail.price+"-"+orderDetail.ot_price}}
						</view>
						<!-- <text class="old_price">￥</text> -->
					</view>
				</view>
			</view>
			<view class="hr"></view>
			<view class="info flex-bt">
				<text class="title">预付定金</text>
				<text class="content price">￥{{orderDetail.yy_price}}</text>
			</view>
			<view class="info flex-bt">
				<text class="title">预约日期</text>
				<text class="content">{{orderDetail.yydate}}</text>
			</view>
			<view class="info flex-bt">
				<text class="title">预约人</text>
				<text class="content">{{orderDetail.name}}</text>
			</view>
			<view class="info flex-bt">
				<text class="title">联系电话</text>
				<text class="content">{{orderDetail.phone}}</text>
			</view>
			<view class="info flex-bt">
				<text class="title">备注</text>
				<text class="content clamp">{{orderDetail.mark}}</text>
			</view>
			<view class="ewm_block flex-center" v-if="orderDetail.qrcode_show==1">
				<button class="ewm_button" v-if="showS" @click="getQrcode">出示核销码</button>
				<view class="" v-else>
					<image class="ewm" :src="qrcode" mode="widthFix"></image>
					<view class="text">
						{{qrcode_tip}}
					</view>
				</view>
			</view>
		</view>

		<view class="order_block order_block2">
			<view class="order_title flex-bt"><text class="left">订单信息</text>
				<view class="right flex-center" @click="call(orderDetail.kefu)">
					<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/info.png" mode="widthFix"></image>客服
				</view>
			</view>
			<view class="order_list">
				<view class="list_item flex-bt">
					<text class="left">订单编号</text>
					<view class="right">{{orderDetail.order_sn}}<text @click="fuzhi(orderDetail.order_sn)">复制</text>
					</view>
				</view>
				<view class="list_item flex-bt">
					<text class="left">下单时间</text>
					<view class="right">{{orderDetail.create_time}}</view>
				</view>
				<view class="list_item flex-bt" v-if="orderDetail.paid==1">
					<text class="left">付款时间</text>
					<view class="right">{{orderDetail.pay_time}}</view>
				</view>
				<view class="list_item flex-bt" v-if="orderDetail.status==4">
					<text class="left">核销时间</text>
					<view class="right">{{orderDetail.hx_time}}</view>
				</view>
			</view>
			<view class="button_block flex-bt">
				<!-- <button hover-class="none" type="default" class="flex-center"
					@click="getYuOrderCancel(orderDetail.order_id,1)">取消</button>
				<button hover-class="none" type="default" class="flex-center"
					@click="getYuOrderCancel(orderDetail.order_id,2)">删除</button> -->
				<button hover-class="none" class="flex-center"
					@click="goto('/pages/appoint/evaluate?order_id='+orderDetail.order_id)">评价</button>
				<button v-if="orderDetail.show_pay==1" hover-class="none" class="flex-center"
					@click="wxPay()">去支付</button>
				<!-- <button hover-class="none" type="default" class="flex-center">申请售后</button> -->
			</view>
		</view>
	</view>
</template>

<script>
	import myhead from "../../components/my-components/myhead.vue"
	import {
		getYuOrderDetail,
		getYuOrderCancel,
		getQrcode,
		getRepay
	} from '@/api/store.js'
	export default {
		components: {
			myhead
		},
		data() {
			return {
				title: '',
				state: 0, //拼单状态 未邀请：0，成功：1，失败2
				order_id: '',
				orderDetail: {
					pay_price: '',
					price: '',
					ot_price: ''
				},
				showS:true,
				qrcode:'',
				qrcode_tip:''
			}
		},
		onLoad(option) {
			this.order_id = option.order_id
			this.getYuOrderDetail()
		},
		mounted() {

		},
		methods: {
			getQrcode(){
				let data = {
					order_id : this.order_id,
					type: 1
				}
				getQrcode(data).then(res=>{
					this.showS = !this.showS
					this.qrcode = res.data.qrcode
					this.qrcode_tip = res.data.qrcode_tip
				}).catch(res=>{
					uni.showToast({
						title:res
					})
				})
			},
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			fuzhi(content) {
				uni.setClipboardData({
					data: content,
					success: function() {
						console.log(content);
					}
				});
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			getYuOrderDetail() {
				let data = {
					order_id: this.order_id
				}
				getYuOrderDetail(data).then(res => {
					this.orderDetail = res.data
				})
			},
			getYuOrderCancel(id, type) {
				let data = {
					type: type,
					order_id: id
				}
				getYuOrderCancel(data).then(res => {
					uni.navigateBack({
						delta: 1
					})
				})
			},
			wxPay(){
				let that = this
				uni.showLoading({
					title: '订单支付中',
					mask: true
				});
				let data ={
					order_id :this.order_id,
					type : 1
				}
				let payInfo={}
				getRepay(data).then(res=>{
					payInfo = res.data
					if(payInfo==-1){
					 	return uni.showToast({
							title:'暂未开放此功能',
							icon:'none'
						})
					}else if(payInfo==''||payInfo==null){
						return uni.showToast({
							title:'提示支付参数错误，请重试',
							icon:'none'
						})
					}else{
						uni.requestPayment({
							provider: 'wxpay',
							...payInfo,
							success: function(res) {
								uni.hideLoading();
								that.getYuOrderDetail()
								return that.$util.Tips({
									title: '支付成功',
									icon: 'success'
								});
							},
							fail: function(e) {
								uni.hideLoading();
								that.getYuOrderDetail()
								return that.$util.Tips({
									title: '取消支付'
								});
							},
						})
					}
				})
				
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.ewm_button{
		background-color: #1698AE;
		color: #fff;
		font-size: 28rpx;
		padding: 8rpx 10rpx;
		width: 50%;
	}
	page {
		// background-color: #fff;
	}

	/deep/ .headder_body {
		.header_bg {
			height: 342px/2 !important;
		}
	}

	.help_order {
		position: relative;

		.top_body {
			position: absolute;
			top: 195px/2;
			left: 0;
			right: 0;
			margin: auto;
			padding-left: 48px/2;
			padding-right: 56px/2;
			z-index: 10;

			.left_block {
				.name {
					font-size: 34px/2;
					font-weight: bold;
					color: #FFFFFF;
				}

				.time {
					font-size: 24px/2;
					color: #FFFFFF;
					margin-top: 10px;
				}
			}

			.right_block {
				width: 136px/2;
				height: 102px/2;
			}
		}



		.mid_block {
			padding: 18px 15px;
			background: #fff;
			margin: 10px 0;

			.hr {
				margin: 37px/2 0 56px/2;
			}

			.order_content {
				justify-content: flex-start;

				.order_img {
					flex-basis: 128px/2;
					flex-grow: 0;
					flex-shrink: 0;
					height: 128px/2;
					border-radius: 8px;
				}

				.right_blcok {
					margin-left: 10px;

					.name {
						font-size: 14px;
						font-weight: bold;
						color: #333333;
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

			.info {
				margin-bottom: 37px/2;

				.title {
					font-size: 14px;
					font-weight: 500;
					color: #333333;
					width: 30%;
				}

				.price {
					color: #FF3535 !important;
					font-size: 16px !important;
				}

				.content {
					width: 70%;
					text-align: right;
					font-size: 12px;
					font-weight: 500;
					color: #333333;
				}
			}

			.ewm_block {
				margin-top: 47px/2;

				.ewm {
					width: 295px/2;
					height: 295px/2;
					display: block;
					margin: auto;
				}

				.text {
					margin-top: 23px;
					font-size: 14px;
					font-weight: 500;
					color: #333333;
					text-align: center;
				}
			}
		}

		.order_block2 {
			padding-top: 24px;
			padding-bottom: 23px/2;

			.order_title {
				position: relative;
				padding-left: 12px;

				&::before {
					content: " ";
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					margin: auto;
					width: 8px/2;
					height: 42px/2;
					background: #1698AE;
				}

				.left {
					font-size: 34px/2;
					font-weight: bold;
					color: #333333;
				}

				.right {
					font-size: 24px/2;
					height: 21px;
					line-height: 21px;
					font-weight: 500;
					color: #666666;

					image {
						width: 18px;
						height: 18px;
						margin-right: 3px;
					}
				}
			}

			.order_list {
				margin-top: 60px/2;
				padding-left: 12px;

				.list_item {
					margin-bottom: 24px;

					.left {
						font-size: 30px/2;
						font-weight: 500;
						color: #333333;
					}

					.right {
						font-size: 28px/2;
						font-weight: 500;
						color: #999999;

						text {
							font-size: 28px/2;
							font-weight: 500;
							color: #EC632C;
							margin-left: 4px;
						}
					}

				}
			}

		}
	}
</style>
