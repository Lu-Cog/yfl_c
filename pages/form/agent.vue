<template>
	<!-- 表单-代理商申请 -->
	<view class="page agent_body">
		<form @submit="formSubmit" class="form_body">
			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title"><text class="red">*</text>姓名</view>
					<input class="uni-input" type="number" placeholder="请输入申请人真实姓名" v-model="name" />
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title"><text class="red">*</text>手机号</view>
					<input class="uni-input" type="number" placeholder="请输入申请人真实手机号码" v-model="phone" />
				</view>
				<view class="uni-form-item hr_shadow" @click="addressShow = true">
					<view class="title"><text class="red">*</text>开店地址</view>
					<view class="uni-input">
						<view class="uni-input" v-if="address ==''">请选择省市区</view>{{address}}
						<pickerAddress v-model="addressShow" @confirm="addresspick" />
					</view>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title"><text class="red">*</text>门店类型</view>
					<picker @change="bankChange" :value="bank" :range="bankArray" range-key="name">
						<view class="uni-input">{{bankArray[bank].name}}</view>
					</picker>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title"><text class="red">*</text>有无经验</view>
					<picker @change="experienceChange" :value="experience" :range="experienceArray" range-key="name">
						<view class="uni-input">{{experienceArray[experience].name}}</view>
					</picker>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title"><text class="red">*</text>投资预算</view>
					<picker @change="budgetChange" :value="budget" :range="budgetArray" range-key="name">
						<view class="uni-input">{{budgetArray[budget].name}}</view>
					</picker>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
				<view class="uni-form-item hr_shadow">
					<view class="title"><text class="red">*</text>预计开店时间</view>
					<picker @change="timeChange" :value="time" :range="timeArray" range-key="name">
						<view class="uni-input">{{timeArray[time].name}}</view>
					</picker>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
				<textarea value="" placeholder="可输入备注说明" placeholder-class="placeholder" />
				</view>

			<view class="label">
				提示：请认真填写申请需求，客服会尽快审核回复。
			</view>
			
			<button class="submit_btn flex-center" hover-class="none" form-type="submit" @click="goto('/pages/result/agent')">提交审核</button>
		</form>
	</view>
</template>

<script>
	import pickerAddress from '../../components/liudx-pickerAddress/index.vue'
	export default {
		components: {
			pickerAddress
		},
		data() {
			return {
				bankArray: [{
					name: '请选择门店类型'
				}, {
					name: '1'
				}, {
					name: '2'
				}],
				experienceArray: [{
					name: '请选择经验'
				}, {
					name: '一年'
				}, {
					name: '无经验'
				}],
				budgetArray: [{
					name: '请选择预算'
				}, {
					name: '1'
				}, {
					name: '2'
				}],
				timeArray: [{
					name: '请选择预计开店时间'
				}, {
					name: '1'
				}, {
					name: '2'
				}],
				bank: 0,
				experience:0,
				budget:0,
				time:0,
				name: '',
				phone: '',
				user: '',
				// 地址选择参数
				addressShow: false,
				form: {
					province: '',
					city: '',
					area: '',
				},
				address: ''
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
			// 开店地址选择
			addresspick(obj) {
				let arr = ['province', 'city', 'area'];
				let place = '';
				arr.map(key => {
					this.form[key] = obj[key].AreaId
					place += obj[key].AreaName
				})
				this.address = place;
				console.log("选择地址", this.address)
			},
			
			submitForm(form) {
				// 手动提交表单
				this.$refs.form.submit().then((res) => {
					console.log('表单返回得值：', res)
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.agent_body {
		.red {
			color: #FF2A2A;
		}

		.form_body {
			.block{
				padding-bottom: 38px;
			}
			.title {
				width: 100px;
			}

			.uni-input {
				text-align: left;
			}
			
				textarea{
				width: 333px;
				height: 223px/2;
				background: #F5F5F5;
				margin-top:38px/2;
				box-sizing: border-box;
				font-size: 14px;
				color: #999999;
			}
		}

		.label {
			padding: 20px 15px;
			font-size: 12px;
			color: #999999;
		}

		.submit_btn {
			margin-bottom: 166px/2;
		}

	}
</style>
