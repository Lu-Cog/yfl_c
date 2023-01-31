<template>
	<!-- 钱包 设置-首页-->
	<view class="page on_order">
		<view class="header">
			<view class="top_body">
				<image :src="category.image" mode="aspectFill"></image>
				<view class="right_blcok">
					<view class="name clamp">{{category.store_name}}</view>
					<view class="price_block flex-center">
						<view class="price">
							<text>￥</text>{{category.price}}-{{category.ot_price}}
						</view>
						<!-- <text class="old_price">￥</text> -->
					</view>
					<!-- <view class="more">
						节约了{{price_js}}元
					</view> -->
				</view>
			</view>
			<view class="tbr">
				<view class="content" v-show="tbrChanges">
					<textarea maxlength="-1" disabled="disabled" style="width: 100%;color: #000000;height: 100px;"
						:value="category.content" />
					<!-- <view v-html=""></view> -->
					<image class="cont_img" :src="category.content_img" mode="widthFix"></image>
				</view>
				<image :src="tbrChanges?'../../static/img/jiantou1.png':'../../static/img/jiantou2.png'" mode="widthFix"
					@click="tbrChange()"></image>
			</view>
		</view>


		<view class="navigator_list container">
			<view class="list_item flex-bt hr_shadow" @click="open">
				<view class="left_block">选择服务时间</view>
				<view class="right_block flex-center">
					<view class="right_text">
						{{timeIndex==-1?'请选择':dateList[dateIndex].week+' '+timeList[timeIndex].time_area}}
					</view>
					<image class="right_btn" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_r.png"
						mode="widthFix"></image>
				</view>
			</view>
			<!-- <view class="list_item flex-bt hr_shadow">
				<input class="left_block" type="text" value="" placeholder-class="placeholder" placeholder="选择服务时间" />
			</view> -->
			<view class="list_item flex-bt hr_shadow">
				<input class="left_block" type="text" v-model="username" placeholder-class="placeholder"
					placeholder="预约人" />
			</view>
			<view class="list_item flex-bt hr_shadow">
				<input class="left_block" type="text" v-model="phone" placeholder-class="placeholder"
					placeholder="联系手机号" />
			</view>
			<view class="list_item flex-bt hr_shadow">
				<input class="left_block" type="text" v-model="information" placeholder-class="placeholder"
					placeholder="填写备注信息" />
			</view>
			<view class="list_item flex-bt hr_shadow" @click="open2" style="margin-top: 10px;">
				<view class="left_block">优惠券</view>
				<view class="right_block flex-center">
					<view class="right_text" style="color: #FF3636;">选择优惠券</view>
					<image class="right_btn" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/me_r.png"
						mode="widthFix"></image>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_body">
				<view class="headder_block flex-bt">
					<view class="title">选择护理时间</view>
					<image class="i-close" @click="close"
						src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/del3.png" mode="widthFix"></image>
				</view>
				<view class="text">
					晚上<text>{{yytime}}</text>是门店护理高峰期，为了不耽误您的 护理，需<text>{{yydate}}</text>预约~
				</view>
				<view class="day_block flex-bt">
					<view :class="dateIndex==index?'this_item':''" class="day_item flex-center"
						v-for="(item,index) in dateList" :key='index' @click="checkDate(item.date,index)">
						<text class="day">{{item.week}}</text><text class="time">{{item.date_str}}</text>
					</view>
				</view>
				<view class="time_block flex-bt">
					<!-- 状态： no 不可选  active选中-->
					<view :class="item.left>0?(timeIndex==index?'active':''):'no'" class="time_item flex-center"
						v-for="(item,index) in timeList" :key='index' @click="checkTime(item.time_id,index)">
						<text class="time">{{item.time_area}}</text>
						<text class="surplus">{{item.isfull==0?'（剩余'+item.left+'）':'已约满'}}</text>
					</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="popup2" type="bottom">
			<view class="popup_body2">
				<view class="title">使用优惠券</view>
				<image class="i-close" @click="close" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/del3.png"
					mode="widthFix"></image>
				<view class="coupons_list">
					<view class="list_item">
						<view class="zanwu">
							暂无优惠券
						</view>
					</view>
					<!-- <view class="list_item">
						<image class="bg-img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/yhj-bg.png" mode="widthFix"></image>
						<view class="content_block flex-bt">
							<view class="left_block">
								<view class="cont_title"><text>￥</text><text class="price">10</text>店铺优惠券</view>
								<view class="subtitle">新用户可用</view>
								<view class="time">有效期2018.09.06-2018.10.06</view>
							</view>
							<view class="right_blcok">
								<text>立即领取</text>
								<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/lingqu.png" mode="widthFix"></image>
							</view>
						</view>
					</view> -->
				</view>
				<button type="default" class="btn flex-center">确定</button>
			</view>
		</uni-popup>
		<view class="footer">
			<view class="price">
				预付金
				<text class="red">
					￥{{category.yy_price}}
				</text>
			</view>


			<view class="go" @click="subscribeMessage()">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getYuOrder,
		getYuSeltime,
		getYuSubOrder
	} from '@/api/store.js'
	export default {
		data() {
			return {
				category: {},
				username: '',
				information: '',
				mer_id: '',
				phone: '', //string	默认预约手机号
				price: '', //float	付款价
				price_js: '', //float	节省多少钱
				yytime: '', //string	预约弹窗蓝色字 高峰时间
				yydate: '', //string	预约弹窗蓝色字 提前一天
				tbrChanges: false,
				dateList: [],
				timeList: [],
				dateIndex: 0,
				timeIndex: -1,
				time_id: '',
				date: ''
			}
		},
		mounted() {},
		onLoad(option) {
			this.mer_id = getApp().globalData.mer_id
			this.category = JSON.parse(option.category)
			console.log(this.category.content_img);
			this.getYuOrder()
			this.getYuSeltime()
		},
		methods: {
			checkTime(id, index) {
				if (this.timeList[index].left == 0) return
				this.time_id = id
				this.timeIndex = index
				this.close()
			},
			checkDate(date, index) {
				this.date = date
				this.dateIndex = index
				this.timeIndex = -1
				this.getYuSeltime(date)
			},
			getYuSeltime(date) {
				let data = {
					date: date ? date : ''
				}
				getYuSeltime(this.mer_id, data).then(res => {
					this.dateList = res.data.list1
					this.timeList = res.data.list2
				})
			},
			tbrChange() {
				this.tbrChanges = !this.tbrChanges
			},
			getYuOrder() {
				let data = {
					project_id: this.category.project_id,

				}
				getYuOrder(this.mer_id, data).then(res => {
					this.phone = res.data.phone
					this.price = res.data.price
					this.price_js = res.data.price_js
					this.yytime = res.data.yytime
					this.yydate = res.data.yydate
				})
			},
			subscribeMessage(){
				let that = this
				if (this.timeIndex == -1) {
					return uni.showToast({
						title: '请选择预约时间',
						icon: 'none'
					})
				}
				if (this.username == "") {
					return uni.showToast({
						title: '请填写预约人称呼',
						icon: 'none'
					})
				}
				if (this.phone == "") {
					return uni.showToast({
						title: '请填写预约人手机号',
						icon: 'none'
					})
				}
				
				let tmplId1 = 'PSu7Y9mbIL1uqT1lHOu-QysoaFY5Lk4JQSk9SwT2v3E'
				let tmplId2 = 'U6GRRffm0mBMD8ie0kGSs8GWvGUB0CON5sdo-_JgxQA'
				uni.requestSubscribeMessage({
					tmplIds: [tmplId1,tmplId2],
					success(res) {
						console.log(res);
						if(res[tmplId1] == 'accept'){
							that.submit()
						}else{
							that.submit()
						}
					},
					fail(res){
						that.submit()
					}
				})
			},
			submit() {
				let that = this
				uni.showLoading({
					title: '订单支付中',
					mask: true
				});
				let data = {
					project_id: this.category.project_id,
					coupon_id: '',
					time_id: this.time_id,
					name: this.username,
					phone: this.phone,
					mark: this.information
				}
				getYuSubOrder(this.mer_id, data).then(res => {
					let pay_info = res.data.result.pay_info
					if (pay_info) {
						uni.requestPayment({
							provider: 'wxpay',
							...pay_info,
							success: function(res) {
								uni.hideLoading();
								return that.$util.Tips({
									title: '支付成功',
									icon: 'success'
								}, {
									tab: 5,
									url: '/pages/result/examine'
								});
							},
							fail: function(e) {
								uni.hideLoading();
								return that.$util.Tips({
									title: '您取消了支付'
								}, {
									tab: 5,
									url: '/pages/appoint/order'
								});
							},
						})
					} else {
						return that.$util.Tips({
							title: '支付参数异常，请重试'
						})
					}

				})

			},
			// 预约下单弹框-打开
			open() {
				// 通过组件定义的ref调用uni-popup方法
				this.$refs.popup.open()
			},
			// 优惠券弹框-打开
			open2() {
				// 通过组件定义的ref调用uni-popup方法
				this.$refs.popup2.open()
			},
			// 预约下单弹框-关闭
			close() {
				// 通过组件定义的ref调用uni-popup方法
				this.$refs.popup.close();
				this.$refs.popup2.close();
			}
		}
	}
</script>

<style lang="less" scoped>
	.tbr {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #fff;
		margin-bottom: 10px;
		padding: 0 15px 10px;

		.cont_img {
			width: 100%;
			height: auto;
		}

		.content {
			width: 100%;
			color: #999;
			font-size: 24rpx;
		}

		>image {
			width: 30rpx;
			height: 30rpx;
			padding: 20rpx;
		}
	}

	.zanwu {
		text-align: center;
		width: 100%;
		color: #999;
		padding-top: 40rpx;
	}

	.more {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;

		.price {
			margin-left: 20rpx;

			.red {
				font-family: PingFang SC;
				font-weight: bold;
				font-size: 50rpx;
				color: #FF002B;
			}
		}



		.go {
			text-align: center;
			line-height: 100rpx;
			width: 270rpx;
			height: 100rpx;
			background: #1698AE;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}

	.on_order {
		.top_body {
			padding: 18px 15px;
			background: #FFFFFF;
			margin: 10px 0 0;
			display: flex;
			justify-content: flex-start;

			image {
				flex-basis: 128px/2;
				flex-shrink: 0;
				flex-grow: 0;
				height: 128px/2;
				border-radius: 4px;
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
					margin: 10px 0;

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

		.navigator_list {
			padding: 0;

			.list_item {
				padding: 0 15px;
				height: 105px/2;
				background-color: #fff;

				.left_block {
					font-size: 14px;
					font-weight: 500;
					color: #999999;
					position: relative;
					padding-left: 25px/2;

					&::after {
						content: ' ';
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						margin: auto;
						width: 2px;
						height: 12px;
						background: #1698AE;
					}
				}

				.placeholder {
					font-size: 14px;
					font-weight: 500;
					color: #999999;
				}

				.right_block {
					.right_text {
						font-size: 14px;
						font-weight: 500;
						color: #333333;
					}

					.right_btn {
						width: 15px/2;
						height: 29px/2;
						margin-left: 17px/2;
					}
				}

			}
		}

		.popup_body {
			background: #fff;
			// height: 706px/2;

			.headder_block {
				padding: 15px;

				.title {
					font-size: 15px;
					line-height: 15px;
					font-weight: 500;
					color: #333333;
				}
			}

			.text {
				font-size: 13px;
				color: #666666;
				padding: 15px;
				padding-top: 0;

				text {
					color: #1698AE;
				}
			}

			.day_block {
				border-top: 1px solid #E5E5E5;
				padding: 10px 0;

				.day_item {
					flex: 1.42;
					flex-direction: column;

					text {
						font-size: 13px;
						color: #666666;

						&:last-child {
							margin-top: 5px;
						}
					}

					&.this_item {
						text {
							color: #1698AE;
						}
					}
				}
			}

			.time_block {
				flex-wrap: wrap;
				max-height: 210px;
				overflow-y: scroll;

				.time_item {
					height: 70px;
					width: 25%;
					flex-direction: column;
					border: 1px solid #E5E5E5;

					.time {
						font-size: 13px;
						line-height: 13px;
						color: #333333;
						margin-bottom: 12px;
					}

					.surplus {
						font-size: 14px;
						line-height: 14px;
						color: #333333;
					}

					&:nth-child(4n) {
						border-right: none;
					}

					&.no {
						background: #EEEEEE;

						.time {
							color: #999999;
						}

						.surplus {
							color: #999999;
						}
					}

					&.active {
						background: #1698ae;

						.time {
							color: #fff;
						}

						.surplus {
							color: #fff;
						}
					}
				}
			}
		}

		.i-close {
			position: absolute;
			top: 34px/2;
			right: 27px/2;
			width: 45px/2;
			height: 45px/2;
		}

		.popup_body2 {
			background: #fff;
			position: relative;

			.title {
				font-size: 34px/2;
				font-weight: 500;
				color: #FF3535;
				text-align: center;
				padding-top: 38px/2;
				padding-bottom: 56px/2;
			}


			.coupons_list {
				padding: 0 15px;

				.list_item {
					position: relative;
					width: 689px/2;
					height: 173px/2;
					margin: auto;
					display: flex;
					margin-bottom: 10px;

					&:last-child {
						margin-bottom: 0;
					}

					.bg-img {
						flex-basis: 689px/2;
						flex-shrink: 0;
						flex-grow: 0;
						height: 173px/2;
						margin: auto;
					}

					.content_block {
						position: absolute;
						width: 100%;
						padding: 12px 37px/2;
						height: 100%;

						.left_block {
							.cont_title {
								font-size: 14px;
								font-weight: 500;
								color: #FF3535;

								text {
									font-size: 43px/2;
								}

								.price {
									font-size: 25px;
									margin-right: 5px;
								}
							}

							.time,
							.subtitle {
								font-size: 12px;
								font-weight: 500;
								color: #FF3535;
								line-height: 23px/2;
								margin-top: 5px;
							}

							.time {
								margin-top: 6px;
							}
						}

						.right_blcok {
							padding-right: 15px;

							text {
								font-size: 16px;
								font-weight: 500;
								color: #FF3535;
							}

							image {
								position: absolute;
								bottom: 0;
								right: 0;
								width: 93px/2;
								height: 40px;
							}
						}
					}
				}
			}

			.btn {
				margin-top: 35px/2;
				width: 100%;
				height: 98px/2;
				background: #1698AE;
				font-size: 16px;
				font-weight: 500;
				color: #FFFFFF;
				border-radius: 0;
			}
		}
	}
</style>
