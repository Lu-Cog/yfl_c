<template>
	<!-- 提交结果-佣金提现 -->
	<view class="page">
		<myresult :imgSrc="'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/r1.png'" :result="'提交成功'" :text="'您已成功提交佣金提取申请 预估需要1~3个工作日可到账，请耐心等待'" :btntext="'我知道了'"></myresult>
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
		methods: {}
	}
</script>

<style lang="less">

</style>
