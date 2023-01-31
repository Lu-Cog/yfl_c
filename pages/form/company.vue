<template>
	<!-- 表单-企业认证 -->
	<view class="page company_body">
		<form @submit="formSubmit" class="form_body">
			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title"><text class="red">*</text>主体类型</view>
					<picker @change="bankChange" :value="bank" :range="bankArray" range-key="name">
						<view class="uni-input">{{bankArray[bank].name}}</view>
					</picker>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title"><text class="red">*</text>机构全称</view>
					<input class="uni-input" type="number" placeholder="请输入真实的企业全称" v-model="name" />
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
			</view>

			<view class="upload_block">
				<view class="title">上传证照</view>
				<view class="upload_img flex-bt">
					<view class="item_block">
						<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.png" mode="aspectFill"></image>
						<view class="name">法人身份证正面</view>
					</view>
					<view class="item_block">
						<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user2.png" mode="aspectFill"></image>
						<view class="name">法人身份证反面</view>
					</view>
					<view class="item_block">
						<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user3.png" mode="aspectFill"></image>
						<view class="name">工商营业执照</view>
					</view>
				</view>
				<view class="ps">注意：支持PNG、JPG、JEPG，每张大小不可超过1M</view>
			</view>

			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title"><text class="red">*</text>联系人</view>
					<input class="uni-input" type="number" placeholder="请输入企业联系人姓名" v-model="user" />
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title"><text class="red">*</text>手机号</view>
					<input class="uni-input" type="number" placeholder="请输入企业联系人手机号码" v-model="phone" />
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
			</view>
				<label class="label">
					<checkbox class="" value="cb" checked="true" style="transform:scale(0.7);" />选中我已阅读服务协议<text class="blue">《服务协议》</text>
				</label>
			<button class="submit_btn flex-center" hover-class="none"  form-type="submit" @click="goto('/pages/result/examine')">提交审核</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bankArray: [{
					name: '请选择'
				}, {
					name: '1'
				}, {
					name: '2'
				}, {
					name: '3'
				}, {
					name: '4'
				}],

				bank: 0,
				name: '',
				phone: '',
				user: '',

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
	.company_body {
		.red {
			color: #FF2A2A;
		}

		.upload_block {
			background: #fff;
			padding: 38px/2 32px/2;
			margin-top: 10px;

			.ps {
				font-size: 11px;
				color: #FF2C2C;
				margin-top: 63px/2;
			}

			.title {
				font-size: 14px;
				font-weight: 500;
				color: #333333;
			}

			.upload_img {
				flex-wrap: wrap;

				.item_block {
					margin-top: 56px/2;
					width: 50%;

					image {
						width: 234px/2;
						height: 147px/2;
						margin: auto;
						display: block;
					}

					.name {
						font-size: 12px;
						color: #999999;
						text-align: center;
						margin-top: 12px;
					}

				}
			}

		}
			.label {
				padding: 20px 15px;
				display: block;
			}
			.submit_btn{
				margin-bottom: 166px/2;
			}
			
	}
</style>
