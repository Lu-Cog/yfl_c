<template>
	<!-- 表单-管理功能-商品管理 -->
	<view class="page set-up_info form_body">
		<view class="block">
			<view class="uni-form-item hr_shadow">
				<view class="title">企业logo</view>
				<view class="right_block flex-center">
					<image class="i-add" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/i-add.png" mode="widthFix"></image>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">机构名称</view>
				<view class="right_block flex-center">
					<text class="ccc">xxx</text>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">行业类型</view>
				<view class="right_block flex-center">
					<text class="ccc">xxx</text>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">联系电话</view>
				<view class="right_block flex-center">
					<text class="ccc">xxx</text>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">所属地区</view>
				<view class="right_block flex-center">
					<text class="ccc">xxx</text>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="uni-form-item hr_shadow">
				<view class="title">公司地址</view>
				<view class="right_block flex-center">
					<text class="ccc">xxx</text>
					<image class="i-right" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jiantou_left.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="uni-form-item">
				<view class="title">营业范围</view>
			</view>
			<textarea value="" placeholder="请编辑经营范围" />
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
			}
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.set-up_info {

		.block {
			margin: 15px;
			// margin-bottom: 0;
			padding-bottom: 107px/2;
		}

		.submit_btn {
			margin-bottom: 166px/2;
		}
		
		
	}
</style>
