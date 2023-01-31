<template>
	<!-- 预约管理-首页 -->
	<view class="page write-off_index">
		<view class="card_block">
			<view class="banner-img">
				<image :src="img" mode="aspectFill"></image>
			</view>
			<view class="card_content flex-bt">
				<view class="card_left">
					<!-- 没有标签的时候 加 no-badge -->
					<view class="title clamp2">{{name}}</view>
					<text class="price">¥{{price}}</text>
					<view class="time">购买日期：2020-01-01</view>
				</view>
				<button hover-class="none" class="edit flex-center" type="default" @click="open">修改价格</button>
			</view>
		</view>
		<button hover-class="none" class="write-off_btn flex-center" type="default">确认核销</button>
		<uni-popup ref="popup" type="center">
			<view class="popup_content">
				<view class="title">修改价格</view>
				<input type="text" value="" placeholder="输入新价格（元）" />
				<textarea value="" placeholder="输入备注信息" />
				<button hover-class="none" type="default" class="flex-center"  @click="close()">确认</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				id: 1,
				img: "http://imgxcx.yifulai.com/index_banner.jpg",
				state: 0,
				name: "补水护理(一般就是只清洁、补水、上面膜、头、 肩、颈按摩)",
				number: 100,
				rate: "40%",
				price: "160.00",
				dow: "28"
			}
		},
		mounted() {

		},
		methods: {
			 open(){
			         this.$refs.popup.open()
			      },
				  close(){
					  this.$refs.popup.close()
				  }
		}
	}
</script>

<style lang="less" scoped>
	.write-off_index {
		padding: 10px 15px;

		.write-off_btn {
			margin: auto;
			margin-top: 126rpx;
			width: 664rpx;
			height: 88rpx;
			background: #1698AE;
			border-radius: 15rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #FFFFFF;
		}

		.card_block {
			box-shadow: 0px 5rpx 6rpx 0px rgba(193, 227, 255, 0.24);

			.flex-row {
				padding: 14px 0;
			}

			.banner-img {
				image {
					border-radius: 5px 5px 0px 0px;
					// width: 690rpx;
					height: 290rpx;
				}
			}

			.card_content {
				padding: 10px;
				position: relative;


				.price {
					font-size: 40rpx;
					font-weight: bold;
					color: #FF002B;
				}

				.time {
					font-size: 24rpx;
					color: #999999;
					margin-top: 42rpx;
				}

				.edit {
					position: absolute;
					bottom: 60px;
					right: 28rpx;
					width: 164rpx;
					height: 55rpx;
					border: 1px solid #1698AE;
					border-radius: 28rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #1698AE;
					background: #fff;
				}
			}

		}
		.popup_content{
			padding:63rpx 76rpx;
			.title{
				text-align: center;
				font-size: 36rpx;
				font-weight: 500;
				color: #1698AE;
				margin-bottom: 55rpx;
			}
			input{
				width: 357rpx;
				height: 75rpx;
				border: 1px solid #BFBFBF;
				font-size: 28rpx;
				font-weight: 500;
				color: #B2B2B2;
				padding: 0 16rpx;
				margin-bottom: 25px;
			}
			textarea{
				width: 528rpx;
				height: 148rpx;
				border: 1px solid #BFBFBF;
				font-size: 28rpx;
				font-weight: 500;
				color: #B2B2B2;
				padding: 0 16rpx;
			}
			button{
				width: 269rpx;
				height: 74rpx;
				margin: auto;
				margin-top: 30px;
				background: #1698AE;
				border-radius: 10rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
</style>
