<template>
	<!-- 提交结果-提交审核 -->
	<view class="page">
		<myresult :imgSrc="'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/r1.png'" :result="'支付成功，预约已提交'" :text="'感谢您提交预约申请，商家正在安排您的预约时间，请等待商家与您联系。'" :btntext="'我知道了'" @goToList="goToList"></myresult>
	</view>
</template>

<script>
	import myresult from "../../components/my-components/myresult.vue"
	export default {
		components: {
			myresult
		},
		data() {
			return {
				result: '',
				text:'',
				imgSrc: '',
				btntext:''
			}
		},
		methods: {
			goToList(){
				uni.reLaunch({
					url:'/pages/appoint/order'
				})
			}
		}
	}
</script>

<style lang="less">

</style>
