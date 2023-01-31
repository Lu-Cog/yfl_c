<template>
	<!-- 表单-收银台 -->
	<view class="page cashier_body">
		<view class="block top_body flex-center">
			<text class="ccc">待支付</text>
			<view class="price"><text>￥</text>48.6</view>
			<view class="content">订单号：20200109332492323</view>
		</view>
		<form @submit="formSubmit" class="form_body">
			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title">余额抵扣</view>
					<view class="right_block flex-center">
						<text class="ccc">可支付 358.23元</text>
						<switch :color="color" :style="style" @change="switch2Change" />
					</view>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">微信支付</view>
					<view class="right_block flex-center">
						<text class="ccc">发起微信支付</text>
						<switch :color="color" :style="style" @change="switch2Change" />
					</view>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">线下支付</view>
					<view class="right_block flex-center">
						<text class="ccc">联系客服线下付款</text>
						<switch :color="color" :style="style" @change="switch2Change" />
					</view>
				</view>
			</view>
			<button class="submit_btn flex-center" hover-class="none"  form-type="submit" @click="goto('/pages/result/examine')">确认支付</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				color: '#1698ae',
				style: 'transform:scale(0.7)'

			}
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			submitForm(form) {
				// 手动提交表单
				this.$refs.form.submit().then((res) => {
					console.log('表单返回得值：', res)
				})
			},

			// 开户银行选择
			bankChange: function(e) {
				console.log('开户银行选择：' + e.detail.value)
				this.bank = e.detail.value
			},
			// 开户支行选择
			bankChange2: function(e) {
				console.log('开户支行选择：' + e.detail.value)
				this.bank2 = e.detail.value
			},
			formSubmit: function(e) {
				console.log('开户支行选择：', this.bank, this.bank2, this.number, this.name, this.idNumber)
			},
		}
	}
</script>

<style lang="less" scoped>
	.cashier_body {
		.red {
			color: #FF2A2A;
		}

		.block {
			margin: 15px;
			margin-bottom: 0;
		}

		.submit_btn {
			margin-bottom: 166px/2;
		}

		.top_body {
			flex-direction: column;
			height: 300px/2;
			background: #FFFFFF;
			border-radius: 5px;
			.ccc {
				font-size: 12px;
				color: #333333;
			}

			.price {
				font-size: 70px/2;
				font-weight: 500;
				color: #000000;
				margin: 25px/2 0 36px/2;

				text {
					font-size: 15px;
				}
			}
		}
	}
</style>
