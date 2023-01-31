<template>
	<view>
		<view class='order-submission'>
			<view class="store-title">
				<text class="iconfont icon-shangjiadingdan"></text>
				<view class="txt">拼团成功，到店领取商品</view>
			</view>
			<view class="store">
				<view>
					店铺名称：{{store_name}}
				</view>
				<view>
					联系人：{{store_contact}}
				</view>
				<view>
					电话：{{store_phone}}
				</view>
				<view>
					地址：{{store_address?store_address:''}}
				</view>
			</view>
			<!-- 商品信息 -->
			<view class="storeinfo-wrapper">
				<view class="store-item">
					<view class="store-title">
						<text class="iconfont icon-shangjiadingdan"></text>
						<!-- <view class="txt" @click="goStore(item.mer_id)">{{item.mer_name}}</view> -->
						<view class="txt">{{store_name}}</view>
						<!-- <text class="iconfont icon-xiangyou"></text> -->
					</view>
					<view>

						<view class="product-item">
							<view class="img-box">
								<image :src="goods.image"></image>
							</view>
							<view class="content">
								<view class="name">{{goods.title}}</view>
								<!-- <view class="label">{{goods.productAttr.sku}}</view> -->

								<view class="price">
									<view class="priceitem">
										<text>{{goods.assist_price==0?'免费抢':goods.assist_price}} </text>
										<text class="badge flex-center">原价¥{{goods.ot_price}}</text>
									</view>
									<text>X{{goods.num}}</text>

								</view>
							</view>
						</view>
					</view>


					<view class="wrapper">
						<view class='item acea-row row-between-wrapper' v-if="textareaStatus">
							<view>买家留言</view>
							<input v-if="coupon.status===false" placeholder-class='placeholder'
								@input='bindHideKeyboard' placeholder="可填写备注信息" name="mark"
								v-model="msgObj[item.mer_id]"></input>
						</view>




						<view class="total">
							共{{goods.num}}件 商品小计：
							<view class="price show_num1"><text>￥</text>{{ $util.moneyAct(goods.all_price) }}
							</view>
							<!-- <view class="price show_num1" v-if="item.isTake == 0"><text>+ ￥</text>{{ $util.moneyAct(item.order.pay_price) }}</view>
							<view class="price show_num1" v-if="item.isTake == 1"><text>+ ￥</text>{{ $util.moneyAct(item.order.org_price)}}</view> -->
						</view>
					</view>
				</view>
			</view>


			<view style='height:120rpx;'></view>
			<view class='footer acea-row row-between-wrapper'>
				<view>合计:
					<text class='font-color show_num'>￥{{$util.moneyAct(goods.all_price) || 0}}</text>
				</view>
				<view class='settlement' style='z-index:100' @tap="SubOrder">立即拼团</view>
			</view>
		</view>

		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
	</view>
</template>
<script>
	let app = getApp();
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	import {
		getAddOrder,
		getProductCreate
	} from '@/api/store'
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	export default {
		components: {

			// #ifdef MP
			authorize
			// #endif
		},

		data() {
			return {
				cartInfo: {},
				totalPrice: 0,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否
				assist_id: '',
				product_assist_set_id: '',
				store_name: '',
				store_contact: '',
				store_phone: '',
				store_address: '',
				goods: [],
			};
		},
		computed: mapGetters(['isLogin', 'store_id']),
		onReady() {

		},
		mounted: function() {


		},
		onLoad: function(options) {
			console.log(options.assist_id,"onload");
			this.assist_id = options.assist_id
			this.product_assist_set_id = Number(options.product_assist_set_id)
			// // #ifdef H5
			// this.from = this.$wechat.isWeixin() ? 'weixin' : 'h5'
			// // #endif
			this.getAddOrder()


			// if (this.isLogin) {
			// 	// this.getaddressInfo();
			// 	// //调用子页面方法授权后执行获取地址列表
			// 	// this.$nextTick(function() {
			// 	// 	this.$refs.addressWindow.getAddressList();
			// 	// })
			// } else {
			// 	// #ifdef H5 || APP-PLUS
			// 	toLogin();
			// 	// #endif 
			// 	// #ifdef MP
			// 	this.isAuto = true;
			// 	this.$set(this, 'isShowAuth', true);
			// 	// #endif
			// }
			// if (this.payType == 'weixin') {
			// 	this.payType = this.from
			// }
			// let _this = this


		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {


		},

		methods: {
			getAddOrder() {
				console.log("onload2");
				let that = this
				let data = {
					product_assist_set_id:this.product_assist_set_id
				}
				getAddOrder(that.store_id, that.assist_id,data).then(res => {
					that.store_name = res.data.store_name
					that.store_contact = res.data.store_contact
					that.store_phone = res.data.store_phone
					that.store_address = res.data.store_address
					that.goods = res.data.goods
				})
			},

			/**
			 * 授权回调事件
			 * 
			 */
			onLoadFun: function() {
				this.isShowAuth = false;

			},



			SubOrder() {
				uni.showLoading({
					mask:true,
					title:'加载中...'
				})
				let param = {
					"product_assist_set_id": this.product_assist_set_id
				}
				getProductCreate(this.store_id,this.assist_id, param).then(res => {
					uni.hideLoading()
					uni.navigateTo({
						url: "/pages/assist/detail?order_assist_id="+res.data.product_assist_set_id
					})
				}).catch(res=>{
					uni.hideLoading()
					uni.showToast({
						title:res,
						icon:'none'
					})
				})

			},

			/*
			 * 提取砍价和拼团id
			 */
			getBargainId: function() {
				let that = this;
				let cartINfo = that.cartInfo;
				let BargainId = 0;
				let combinationId = 0;
				cartINfo.forEach(function(value, index, cartINfo) {
					BargainId = cartINfo[index].bargain_id,
						combinationId = cartINfo[index].combination_id
				})
				that.$set(that, 'BargainId', parseInt(BargainId));
				that.$set(that, 'combinationId', parseInt(combinationId));
				if (that.cartArr.length == 3 && (BargainId || combinationId || that.seckillId)) {
					that.cartArr[2].payStatus = 0;
					that.$set(that, 'cartArr', that.cartArr);
				}
			},

			boxClose() {
				that.isShowBox = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.store-title {
		background: #fff;
		display: flex;
		align-items: center;
		padding: 28rpx 30rpx;

		.icon-shangjiadingdan {
			font-size: 32rpx;
		}

		.icon-xiangyou {
			font-size: 26rpx;
			color: #999;
		}

		.txt {
			margin: 0 8rpx;
		}
	}

	.store {
		margin-top: 1rpx;
		padding: 28rpx 30rpx;
		background-color: #fff;
		font-size: 26rpx;
		color: #282828;

		>view {
			margin-bottom: 30rpx;
		}
	}

	.order-submission .line {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 3rpx;
	}

	.order-submission .line image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-submission .address {
		padding: 28rpx 30rpx;
		background-color: #fff;
		box-sizing: border-box;
	}

	.order-submission .address .addressCon {
		width: 610rpx;
		font-size: 26rpx;
		color: #666;
	}

	.order-submission .address .addressCon .name {
		font-size: 30rpx;
		color: #282828;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.order-submission .address .addressCon .name .phone {
		margin-left: 50rpx;
	}

	.order-submission .address .addressCon .default {
		margin-right: 12rpx;
	}

	.order-submission .address .addressCon .setaddress {
		color: #333;
		font-size: 28rpx;
	}

	.order-submission .address .iconfont {
		font-size: 35rpx;
		color: #707070;
	}

	.order-submission .allAddress {
		width: 100%;
	}

	.order-submission .allAddress .nav {
		width: 710rpx;
		margin: 0 auto;
	}

	.order-submission .allAddress .nav .item {
		width: 355rpx;
	}

	.order-submission .allAddress .nav .item.on {
		position: relative;
		width: 250rpx;
	}

	.order-submission .allAddress .nav .item.on::before {
		position: absolute;
		bottom: 0;
		content: "快递配送";
		font-size: 28rpx;
		display: block;
		height: 0;
		width: 336rpx;
		border-width: 0 20rpx 80rpx 0;
		border-style: none solid solid;
		border-color: transparent transparent #fff;
		z-index: 2;
		border-radius: 7rpx 30rpx 0 0;
		text-align: center;
		line-height: 80rpx;
	}

	.order-submission .allAddress .nav .item:nth-of-type(2).on::before {
		content: "到店自提";
		border-width: 0 0 80rpx 20rpx;
		border-radius: 30rpx 7rpx 0 0;
	}

	.order-submission .allAddress .nav .item.on2 {
		position: relative;
	}

	.order-submission .allAddress .nav .item.on2::before {
		position: absolute;
		bottom: 0;
		content: "到店自提";
		font-size: 28rpx;
		display: block;
		height: 0;
		width: 400rpx;
		border-width: 0 0 60rpx 60rpx;
		border-style: none solid solid;
		border-color: transparent transparent #f7c1bd;
		border-radius: 40rpx 6rpx 0 0;
		text-align: center;
		line-height: 60rpx;
	}

	.order-submission .allAddress .nav .item:nth-of-type(1).on2::before {
		content: "快递配送";
		border-width: 0 60rpx 60rpx 0;
		border-radius: 6rpx 40rpx 0 0;
	}

	.order-submission .allAddress .address {
		height: 150rpx;
		margin: 0 auto;
	}

	.order-submission .allAddress .line {
		margin: 0 auto;
	}

	.order-submission .wrapper .item .discount .placeholder {
		color: #ccc;
	}

	.order-submission .wrapper {
		margin-bottom: 12rpx;
		background-color: #fff;
	}

	.order-submission .wrapper .item {
		padding: 27rpx 30rpx;
		font-size: 30rpx;
		color: #282828;
	}

	.order-submission .wrapper .item .discount {
		font-size: 30rpx;
		color: #999;

		&.discount_voice {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 500rpx;
			text-align: right;
		}
	}

	.order-submission .wrapper .item .discount .iconfont {
		color: #515151;
		font-size: 30rpx;
		margin-left: 15rpx;
	}

	.order-submission .wrapper .item .discount .num {
		font-size: 32rpx;
		margin-right: 20rpx;
	}

	.order-submission .wrapper .item .shipping {
		font-size: 30rpx;
		color: #999;
		position: relative;
		padding-right: 58rpx;
	}

	.order-submission .wrapper .item .shipping .iconfont {
		font-size: 35rpx;
		color: #707070;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		margin-left: 30rpx;
	}

	.order-submission .wrapper .item input {
		display: flex;
		flex: 1;
		height: 100%;
		margin-left: 20rpx;
	}

	.order-submission .wrapper .item .placeholder {
		color: #ccc;
	}

	.order-submission .wrapper .item .list {
		margin-top: 35rpx;
	}

	.order-submission .wrapper .item .list .payItem {
		border: 1px solid #eee;
		border-radius: 6rpx;
		height: 86rpx;
		width: 100%;
		box-sizing: border-box;
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #282828;
	}

	.order-submission .wrapper .item .list .payItem.on {
		border-color: #fc5445;
		color: #e93323;
	}

	.order-submission .wrapper .item .list .payItem .name {
		width: 80%;
		text-align: left;
		border-right: 1px solid #eee;
		justify-content: left;
		padding-left: 30rpx;
	}

	.order-submission .wrapper .item .list .payItem .name .iconfont {
		width: 44rpx;
		height: 44rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 44rpx;
		background-color: #fe960f;
		color: #fff;
		font-size: 30rpx;
		margin-right: 15rpx;
	}

	.order-submission .wrapper .item .list .payItem .name .iconfont.icon-weixin2 {
		background-color: #41b035;
	}

	.order-submission .wrapper .item .list .payItem .name .iconfont.icon-zhifubao {
		background-color: #4295D5;
	}

	.order-submission .wrapper .item .list .payItem .tip {
		width: 20%;
		text-align: right;
		font-size: 26rpx;
		color: #aaa;
	}

	.order-submission .moneyList {
		margin-top: 12rpx;
		background-color: #fff;
		padding: 30rpx;
	}

	.order-submission .moneyList .item {
		font-size: 28rpx;
		color: #282828;
	}

	.order-submission .moneyList .item~.item {
		margin-top: 20rpx;
	}

	.order-submission .moneyList .item .money {
		color: #868686;
	}

	.order-submission .footer {
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		padding: 0 30rpx;
		font-size: 28rpx;
		color: #333;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.order-submission .footer .settlement {
		font-size: 30rpx;
		color: #fff;
		width: 240rpx;
		height: 70rpx;
		background-color: #e93323;
		border-radius: 50rpx;
		text-align: center;
		line-height: 70rpx;

		&.disabled {
			background-color: #cccccc;
		}
	}

	.footer .transparent {
		opacity: 0
	}

	.event_bg {
		background: #FF7F00;
	}

	.event_color {
		color: #FF7F00;
	}

	.color_red {
		color: #E93323;
	}

	.storeinfo-wrapper {

		.store-item {
			margin-top: 12rpx;
			background-color: #fff;

			.product-item {
				display: flex;
				padding: 25rpx 30rpx;
				border-top: 1px solid #F0F0F0;

				.img-box {
					width: 130rpx;
					height: 130rpx;

					image {
						width: 130rpx;
						height: 130rpx;
						border-radius: 16rpx;
					}
				}

				.content {
					position: relative;
					display: flex;
					justify-content: space-between;
					flex-direction: column;
					width: 550rpx;
					margin-left: 30rpx;
					font-size: 28rpx;
					color: #282828;

					&.event_content {
						.line1 {
							width: 360rpx;
						}

						.price {
							position: absolute;
							top: 0;
							right: 0;
							margin-top: 0;



							text {
								display: block;
								text-align: right;
							}
						}
					}

					.event_name {
						display: inline-block;
						margin-right: 9rpx;
						color: #fff;
						font-size: 20rpx;
						padding: 0 8rpx;
						line-height: 30rpx;
						text-align: center;
						border-radius: 6rpx;
					}

					.event_ship {
						font-size: 20rpx;
						margin-top: 10rpx;
					}

					.label {
						margin-top: 10rpx;
						color: #868686;
						font-size: 20rpx;
					}

					.price {
						margin-top: 20rpx;
						color: $theme-color;
						display: flex;
						justify-content: space-between;

						.priceitem {
							display: flex;
							align-items: center;
							color: #FF002B;

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

						>text {
							margin-left: 10rpx;
							color: #999;
						}
					}

					.err-txt {
						display: flex;
						align-items: center;
						margin-top: 18rpx;
						color: $theme-color;

						.iconfont {
							margin-right: 10rpx;
						}
					}

					.step {
						position: absolute;
						right: 0;
						top: 100rpx;
						display: flex;
						align-items: center;

						.min {
							width: 50rpx;
							height: 40rpx;
							background-image: url('~@/static/images/min.png');
							background-size: 17rpx 17rpx;
							background-position: center;
							background-repeat: no-repeat;
						}

						.num-box {
							width: 68rpx;
							height: 40rpx;
							line-height: 40rpx;
							text-align: center;
							background: #F2F2F2;
							font-size: 23rpx;
						}

						.add {
							width: 50rpx;
							height: 40rpx;
							background-image: url('~@/static/images/add.png');
							background-size: 17rpx 17rpx;
							background-position: center;
							background-repeat: no-repeat;
						}
					}
				}
			}
		}

		.event_payTime {
			padding: 0 30rpx 24rpx;

			.event_progress {
				margin-top: 50rpx;
				position: relative;
			}

			.progress_step {
				height: 80rpx;
				position: relative;
				padding-left: 60rpx;

				&::before {
					content: '';
					display: block;
					width: 2rpx;
					height: 40rpx;
					background: #E93323;
					position: absolute;
					left: 35rpx;
					top: 18rpx;
				}

				&:nth-child(2) {
					&::before {
						bottom: 64rpx;
						top: auto;
						background: #EFEFEF;
					}

					&::after {

						background: #EFEFEF;
					}
				}

				&::after {
					content: '';
					display: block;
					width: 14rpx;
					height: 14rpx;
					background: #E93323;
					border-radius: 50%;
					position: absolute;
					top: 10rpx;
					left: 29rpx;
				}

				.name {
					float: left;
					color: #282828;

					&.color_red {
						color: #E93323;
					}
				}

				.price {
					float: right;
					color: #282828;

					&.color_red {
						color: #E93323;
					}
				}
			}

			.progress_pay {
				padding-left: 60rpx;
				font-size: 24rpx;
				color: #868686;
				margin-top: -34rpx;
			}

		}
	}

	uni-checkbox-group,
	.checkgroup {
		width: 100%;

		.checkbox {
			float: right;
		}
	}

	.icon-wenhao1 {
		color: #868686;
		margin-right: 6rpx;

	}

	.total {
		display: flex;
		justify-content: flex-end;
		padding-right: 30rpx;
		padding-bottom: 30rpx;
		font-size: 26rpx;
		color: #282828;

		.price {
			margin-left: 10rpx;
			color: $theme-color;
			font-size: 28rpx;
			font-weight: bold;

			text {
				font-size: 20rpx;
			}
		}

		.price_grey {
			margin-left: 10rpx;
			color: $theme-color;
			font-size: 28rpx;
			color: #888282;

			text {
				font-size: 20rpx;
			}
		}

		.price_th {
			text-decoration: line-through;
		}
	}

	.store-address {
		display: flex;
		padding: 30rpx 23rpx;
		margin: 0 30rpx;
		background: #F6F6F6;
		border-radius: 8rpx;
		font-size: 24rpx;

		.name {
			width: 148rpx;
			margin-right: 20rpx;
		}

		.info {
			flex: 1;
		}
	}

	.settlementAgreement {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 10;
	}

	.settlementAgreement .setAgCount {
		background: #fff;
		width: 656rpx;
		height: 458px;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 12rpx;
		-webkit-border-radius: 12rpx;
		padding: 52rpx;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		overflow: hidden;

		.content {
			height: 900rpx;
			overflow-y: scroll;

			/deep/ p {
				font-size: 13px;
				line-height: 22px;
			}

			/deep/ img {
				max-width: 100%;
			}
		}
	}

	.settlementAgreement .setAgCount .icon {
		font-size: 42rpx;
		color: #b4b1b4;
		position: absolute;
		top: 15rpx;
		right: 15rpx;

	}

	.settlementAgreement .setAgCount .title {
		color: #333;
		font-size: 32rpx;
		text-align: center;
		font-weight: bold;
	}

	.settlementAgreement .setAgCount .content {
		margin-top: 32rpx;
		color: #333;
		font-size: 26rpx;
		line-height: 22px;
		text-align: justify;
		text-justify: distribute-all-lines;
		height: 756rpx;
		overflow-y: scroll;
	}

	.show_num {
		font-size: 35rpx;
		margin-left: 10rpx;
		font-weight: bold;

	}

	.show_num1 {
		font-size: 30rpx;
		// font-weight: bold;
	}

	.goods_tag {
		padding: 3rpx 5rpx;
		border: 1px solid #FF5061;
		font-size: 24rpx;
		color: #FF5061 !important;
		margin-right: 10rpx;
	}

	.old_price1 {
		display: inline-block;
		font-size: 24rpx;
		color: #969494 !important;
		margin-left: 15rpx;
	}

	.old_price {
		text-decoration: line-through;
	}

	.infor {
		font-size: 24rpx;
		color: #868686;
		margin-top: 16rpx;
	}
</style>
