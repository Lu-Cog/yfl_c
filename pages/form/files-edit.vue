<template>
	<!-- 表单-档案管理-编辑 -->
	<view class="page files-edit_body form_body">
		<view class="block">
			<view class="uni-form-item hr_shadow">
				<view class="title">某某某用户</view>
				<!-- <input class="uni-input" type="text" :value="title" placeholder="请输入标题" v-model="title" /> -->
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">选择服务项目</view>
				<picker @change="bankChange" :value="bank" :range="bankArray" range-key="name">
					<view class="uni-input">{{bankArray[bank].name}}</view>
				</picker>
				<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">费用（元）</view>
				<input class="uni-input" type="text" placeholder="" v-model="price" />
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">添加图片（多图）</view>
				<image class="i-add" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/i-add.png" mode="widthFix"></image>
			</view>
			<view class="uni-form-item hr_shadow">
				<textarea value="" placeholder="填写文字介绍信息"  />
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
				bankArray: [{
					name: '请选择您的服务项目'
				}, {
					name: '1'
				}, {
					name: '2'
				}, {
					name: '3'
				}, {
					name: '4'
				}],
				price: '',
				title: '某某某用户',
				number: '',
				bank: 0,
			}
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			
			// 开户银行选择
			bankChange: function(e) {
				console.log('开户银行选择：' + e.detail.value)
				this.bank = e.detail.value
			},
			
			submitForm(form) {
				// 手动提交表单
				this.$refs.form.submit().then((res) => {
					console.log('表单返回得值：', res)
				})
			},

		


			formSubmit: function(e) {},
		}
	}
</script>

<style lang="less" scoped>
	.files-edit_body {
		.block {
			margin-bottom: 0;
			padding-bottom: 120px;
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
