<template>
	<!-- 表单-充值-添加银行卡 -->
	<view class="page recharge_add-bank">
		<form @submit="formSubmit" class="form_body">
			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title">开户银行</view>
					<picker @change="bankChange" :value="bank" :range="bankArray" range-key="name">
						<view class="uni-input">{{bankArray[bank].name}}</view>
					</picker>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">开户支行</view>
					<picker @change="bankChange2" :value="bank2" :range="bankArray2" range-key="name">
						<view class="uni-input">{{bankArray2[bank2].name}}</view>
					</picker>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title">银行卡号</view>
					<input class="uni-input" type="number"  placeholder="请输入银行卡的卡号" v-model="number" />
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">持卡人姓名</view>
					<input class="uni-input" type="text"  placeholder="请输入持卡人的姓名" v-model="name" />
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title">身份证号</view>
					<input class="uni-input" type="idcard" placeholder="请输入您的身份证号" v-model="idNumber" />
				</view>
			</view>
			<button class="submit_btn flex-center" hover-class="none"  form-type="submit">确定</button>
		</form>

	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				bankArray: [{
					name: '请选择您的开户银行'
				}, {
					name: '中信银行'
				}, {
					name: '工商银行'
				}, {
					name: '建设银行'
				}, {
					name: '农业银行'
				}],
				bankArray2: [{
					name: '请选择您的开户地点'
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
				bank2: 0,
				number: '',
				name: '',
				idNumber: ''

			}
		},
		mounted() {},
		methods: {
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
				console.log('开户支行选择：' ,this.bank,this.bank2,this.number,this.name,this.idNumber)
			},
		}
	}
</script>

<style lang="less" scoped>
	.recharge_add-bank {}
</style>
