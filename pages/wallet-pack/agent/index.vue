<template>
	<!-- 我的-申请代理商-代理商说明 -->
	<view class="page points-mall_rule">
		<view class="title">招商政策</view>
		<view class="content">招商说明文案显示在此处</view>
		<view class="title">入驻流程</view>
		<view class="content">招商说明文案显示在此处</view>
		<view class="title">合作伙伴</view>
		<view class="content">招商说明文案显示在此处</view>
		<view class="title">如何获取邀请代理商的佣金？</view>
		<view class="content">1. 邀请者必须先是代理商身份 </view>
		<view class="content">2. 代理商邀请新用户成为代理商后，则可获取相应的奖励 </view>
		<view class="title">如何获取推广佣金？ </view>
		<view class="content">1. 邀请者必须先是代理商身份</view>
		<view class="content">2. 代理商分享产品后，对方通过分享链接完成购买后，则代理商可获取对</view>
		<view class="title">代理商奖励机制</view>
		<view class="content">这里是XX代理商奖励机制</view>
		<button type="default" class="btn flex-center" @click="goto('/pages/form/agent')">申请成为代理商</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goto(url) {
				return;
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.points-mall_rule {
		padding: 15px 12px;
		padding-bottom: 80px;
		background: #fff;
		margin-top: 10px;

		.title {
			font-size: 16px;
			font-weight: bold;
			color: #333333;
			margin-bottom: 10px;
			position: relative;
			padding-left: 15px;

			&::after {
				position: absolute;
				content: ' ';
				top: 0;
				bottom: 0;
				left: 0;
				margin: auto;
				width: 5px;
				height: 16px;
				background: #1698AE;
			}
		}

		.content {
			font-size: 14px;
			color: #000000;
			line-height: 30px;
		}

		.btn {
			margin-top: 130px/2;
			width: 100%;
			height: 102px/2;
			background: #1698AE;
			border-radius: 5px;
			font-size: 16px;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
