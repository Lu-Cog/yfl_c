<template>
	<!-- 提交结果-开店申请结果 -->
	<view class="page">
		<myresult :imgSrc="'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/z-s.png'" :result="'申请开店成功'" :text="'恭喜你！已经成功开通店铺！'" :btntext="'我知道了'"></myresult>
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

<style lang="less" scoped>
	/deep/ .result_body uni-image{
		width: 100px;
		height: 151px/2;
	}
</style>
