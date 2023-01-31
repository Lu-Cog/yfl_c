<template>
	<!-- 更多功能-成功案例-编辑 -->
	<view class="page case-edit_body form_body">
		<view class="block">
			<view class="uni-form-item hr_shadow">
				<view class="title">商品营销标题</view>
				<input class="uni-input" type="text" placeholder="请输入标题" v-model="title" />
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">售价（元）</view>
				<picker @change="priceChange" :value="price" :range="priceArray" range-key="name">
					<view class="uni-input">{{priceArray[price].name}}</view>
				</picker>
				<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">库存</view>
				<input class="uni-input" type="number" placeholder="" v-model="number" />
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">排序</view>
				<view class="right_block flex-center">
					<text class="ccc">热门</text>
					<switch :color="color" :style="style" checked @change="hotSwitch" />
				</view>
				<view class="right_block flex-center">
					<text class="ccc">促销</text>
					<switch :color="color" :style="style" @change="salesSwitch" />
				</view>
			</view>
		</view>
		<button class="submit_btn flex-center" hover-class="none"  form-type="submit">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				color: '#1698ae',
				style: 'transform:scale(0.7)',
				priceArray: [{
					name: '1'
				}, {
					name: '2'
				}, {
					name: '3'
				}, {
					name: '4'
				}],
				price: 0,
				title: '',
				number: '',
				hot: '',
				sales: ''
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

			// 售价切换
			priceChange: function(e) {
				console.log('售价：' + e.detail.value)
				this.price = e.detail.value
			},

			// 热门开关切换
			hotSwitch: function(e) {
				console.log('热门开关切换：' + e.detail.value)
				this.hot = e.detail.value
			},

			// 促销开关切换
			salesSwitch: function(e) {
				console.log('热门开关切换：' + e.detail.value)
				this.sales = e.detail.value
			},

			formSubmit: function(e) {},
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
