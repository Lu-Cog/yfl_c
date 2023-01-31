<template>
	<!-- 表单-充值-在线充值 -->
	<view class="page recharge_body">
		<form @submit="formSubmit" class="form_body">
			<view class="uni-form-item title_block flex-bt hr_shadow">
				<view class="title">自定义充值<text>（充值金额不得少于1万）</text></view>
				<text class="blue">充值记录</text>
			</view>
			<view class="uni-form-item hr_shadow">
				<input type="number" placeholder="请输入充值金额，仅支持整数" v-model="price" />
			</view>
			<view class="uni-form-item title_block hr_shadow">
				<view class="title">选择面值</view>
			</view>
			<view class="block radio_block flex-bt">
				<!-- 高亮类名：active -->
				<view class="radio_item flex-center active">
					<view class="radio-price">
						<text>1</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>3</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>5</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>10</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>20</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>50</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
			</view>
			<view class="block arrival">实际到账：<text class="blue">1100元</text></view>
			<view class="uni-form-item title_block">
				<view class="title">支付方式</view>
			</view>
			<view class="uni-list_body">
				<uni-list>
					<uni-list-item title="今日订单" thumb="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/z-wx.png" thumb-size="sm">
						<template slot="footer">
							<image class="footer-img" :src="active===1?'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/z-yes.png':'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/z-no.png'" mode="widthFix"
							 @click="way(1)"></image>
						</template>
					</uni-list-item>
				</uni-list>
				<uni-list>
					<uni-list-item title="今日订单" thumb="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/xx.png" thumb-size="sm">
						<template slot="footer">
							<image class="footer-img" :src="active===2?'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/z-yes.png':'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/z-no.png'" mode="widthFix"
							 @click="way(2)"></image>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
			<view class="way_2" v-if="active===2">
				<view class="way_title">收款信息</view>
				<view class="way_row">账户：168888898*******0232</view>
				<view class="way_row">户名：深圳翌芙莱科技有限公司</view>
				<view class="way_row">开户行：深圳招商银行浦东支行</view>
				<view class="way_row">注：线下支付需等待1-3个工作日进行审核</view>
			</view>
			<view class="uni-form-item title_block">
				<view class="title">温馨提示</view>
			</view>
			<view class="text_list">
				1. 额度可由自主充值、平台有赠送奖励；<br>2. 充值金额只能用来消费，不支持提现；<br> 3. 选择线下充值时，转账后请联系客服；
			</view>
			<button type="default" class="flex-center btn" hover-class="none" >去充值</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price: '', //自定义充值
				active: 1,
			}
		},
		methods: {
			way(e) {
				this.active = Number(e)
			}
		}
	}
</script>

<style lang="less" scoped>
	.recharge_body {
		margin-top: 10px;
		background: #fff;
		padding-bottom: 55px;

		.title_block {
			width: 100%;

			.title {
				position: relative;

				&::after {
					content: ' ';
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					margin: auto;
					width: 3px;
					height: 16px;
					background: #1698AE;
				}

				white-space:nowrap;
				font-size:15px;
				font-weight: 500;
				color: #333333;
				padding-left:12px;

				text {
					font-size: 12px;
					font-weight: 500;
					color: #999999;
				}
			}
		}

		.footer-img {
			width: 16px;
			height: 16px;
			margin-top: 2px;
		}

		.uni-form-item {
			input {
				width: 100%;
				height: 105px/2;
			}
		}

		.block {
			padding: 0 35px/2;
		}

		.radio_block {
			flex-wrap: wrap;

			.radio_item {
				width: 100px;
				height: 130px/2;
				background: #FFFFFF;
				border: 1px solid #E6E6E6;
				flex-direction: column;
				margin-bottom: 37px/2;

				.radio-price {
					font-size: 12px;
					color: #666666;
					margin-bottom: 5px;

					text {
						font-weight: bold;
						font-size: 18px;
					}
				}

				.song {
					font-size: 10px;
					color: #666666;
				}

				&.active {
					border: 1px solid #1698AE;

					.radio-price {
						color: #1698AE;
					}

					.song {
						color: #1698AE;
					}
				}
			}
		}

		.arrival {
			text-align: right;
		}

		.uni-list_body {
			padding: 0 20px;
		}

		.text_list {
			padding: 0 25px;
			font-size: 12px;
			color: #666666;
			line-height: 20px;
			padding-bottom: 30px;
		}

		.way_2 {
			background: #F5F5F5;
			margin: 0 20px;
			padding: 35px/2 20px;

			.way_title {
				font-size: 12px;
				font-weight: bold;
				color: #000000;
				line-height:normal;
				margin-bottom: 15px;
			}

			.way_row {
				font-size: 12px;
				font-weight: 500;
				color: #333333;
				line-height: normal;
				margin-bottom: 10px;

				&:last-child {
					color: #999999;
				}
			}
		}

		.btn {
			width: 690px/2;
			height: 102px/2;
			background: #1698AE;
			border-radius: 3px;
			font-size: 16px;
			font-weight: 500;
			color: #FFFFFF;
			margin: 56px/2 auto 55px;
		}
	}
</style>
