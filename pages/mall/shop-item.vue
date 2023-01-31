<template>
	<!-- 商城 店铺详情 -->
	<view class="page mall_shop-item">
		<!-- pages/purchase/confirm-order 确认下单 -->
		<!-- pages/form/cashier 收银台 -->
		<!-- pages/purchase/goods-item 商品详情 -->
		<image class="banner" :src="mer_banner" mode="widthFix"></image>
		<view class="info">
			{{mer_desc}}
		</view>
		<view class="fiexd flex-center" @click="goAddress()" v-if="lat && lng">
			<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/index.png" mode="widthFix"></image>
			导航到店
		</view>
		<view class="fiexd fiexd2 flex-center" @click="callPhone()">
			<image src="/static/img/cus_call.png" mode="widthFix"></image>
			联系商家
		</view>
	</view>
</template>

<script>
	// import mstabs from "../../components/ms-tabs/ms-tabs.vue" //文档 https://ext.dcloud.net.cn/plugin?id=1107
	export default {
		components: {
			// mstabs
		},
		data() {
			return {
				mer_desc: '',
				mer_banner: '',
				lng: '',
				lat: '',
				mer_name:'',
				detail:'',
				phone:''
			}
		},
		onLoad(option) {
			this.mer_desc = option.mer_desc
			this.mer_banner = option.mer_banner
			this.lng = Number(option.lng)?option.lng:''
			this.lat = Number(option.lat)?option.lat:''
			this.detail = option.detail
			this.mer_name = option.mer_name
			this.phone = option.phone
		},
		watch: {

		},

		methods: {
			callPhone(){
				uni.makePhoneCall({
					phoneNumber:this.phone
				})
			},
			goAddress() {
				console.log(this.lat, this.lng);
				// uni.chooseLocation({
				// 	latitude:this.lat,
				// 	longitude:this.lng,
				// 	keyword:'恒荣立方商厦',
				//     success: function (res) {
				//         console.log('位置名称：' + res.name);
				//         console.log('详细地址：' + res.address);
				//         console.log('纬度：' + res.latitude);
				//         console.log('经度：' + res.longitude);
				uni.openLocation({
					latitude: Number(this.lat),
					longitude: Number(this.lng),
					name: this.mer_name,
					address: this.detail,
					success: function() {
						console.log('success');
					}
				});
				//     }
				// });
				// uni.getLocation({
				//     type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				//     success: function (res) {
				//         const latitude = res.latitude;
				//         const longitude = res.longitude;

				//     }
				// });
			}
		}
	}
</script>

<style lang="less" scoped>
	.mall_shop-item {
		background-color: #fff;
		height: 100vh;

		.info {
			padding: 50rpx;
		}

		.banner {
			width: 100%;
		}

		.fiexd {
			position: fixed;
			bottom: 200rpx;
			right: 0;
			width: 192px/2;
			height: 72px/2;
			background: rgba(22, 152, 174, 0.44);
			border-radius: 18px 0 0 18px;
			z-index: 10;

			image {
				width: 18px;
				height: 18px;
				margin-right: 9px/2;
			}

			font-size:14px;
			font-weight: 500;
			color: #FFFFFF;
		}
		.fiexd2{
			background: rgba(174, 26, 26, 0.3);
			bottom: 100rpx;
		}
	}
</style>
