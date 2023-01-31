<template>
	<!-- 客户-客户详情 -->
	<view class="page page-login" v-show="showBtn">
		<view class="page-section">
				<swiper class="swiper" :style="{height:windowHeight+'px'}" circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay"
				 :interval="interval" :duration="duration">
					<swiper-item>
						<image class="swiper-item banner" src="http://imgxcx.yifulai.com/d24d1202103081100537439.jpg" mode="aspectFill"></image>
					</swiper-item>
					<swiper-item>
						<image class="swiper-item banner" src="http://imgxcx.yifulai.com/6bdd5202103081100538881.jpg" mode="aspectFill"></image>
					</swiper-item>
					<swiper-item>
						<image class="swiper-item banner" src="http://imgxcx.yifulai.com/d24d1202103081100537439.jpg" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
		</view>
		<!-- <image class="page-bg" src="http://imgxcx.yifulai.com/6bdd5202103081100538881.jpg" mode="aspectFill"></image> -->
		<button type="default" class="login-btn flex-center" v-if="!userInfo.uid" @tap="openAuto" hover-class="none"   withCredentials="true">登录商户管理平台
		</button>
		
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
		
	</view>
	
</template>

<script>
	import {
		getUserInfo,
		setVisit
	} from '@/api/user.js';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
		import authorize from '@/components/Authorize';
	// #endif
	const app = getApp();
	export default {
		components: {
			// #ifdef MP
			authorize
			// #endif
		},
		computed: mapGetters(['isLogin']),
 
		data() {
			return {
				
				showBtn: false,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				userInfo: {},
				
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				windowHeight: ''
			}
		},
		onLoad() {
		},
		onShow: function() {
			let that = this;
			if (that.isLogin) {
				//that.gotoIndex();
				that.getUserInfo();
				// that.setVisit();
			} else {
				// #ifdef H5 || APP-PLUS
				toLogin();
				// #endif
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight;
				}
			});
			
			console.log("---isLogin="+this.isLogin);
			if(this.isLogin){
				this.gotoIndex();
			}else{
				this.showBtn = true;
			}
		},
		methods: {
			
			// 去聊天列表
			goChat() {
				let type = this.userInfo.service ? 1 : 0
				uni.navigateTo({
					url: `/pages/chat/customer_list/index?type=${type}`
				})
			
			},
			// 记录会员访问
			setVisit() {
				setVisit({
					url: '/pages/user/index'
				}).then(res => {})
			},
			// 打开授权
			openAuto() {
				this.isAuto = true;
				this.isShowAuth = true
			},
			// 授权回调
			onLoadFun() {
				
				if(this.isShowAuth){
					this.getUserInfo();
				}
				this.isShowAuth = false;
				//this.gotoIndex();
			},
			Setting: function() {
				uni.openSetting({
					success: function(res) {
						console.log(res.authSetting)
					}
				});
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
						that.userInfo = res.data,
						that.is_promoter = res.data.is_promoter
						that.extension_status = res.data.extension_status
						console.log(that.userInfo);
						if(that.userInfo.merchant == false || that.userInfo.merchant_admin == ""){
							//跳转绑定商家
							console.log("跳转绑定商家");
							that.bindPhone();
						}else{
							//跳转首页
							that.gotoIndex();
						}
						
				});
			},
			// 签到
			goSignIn() {
				uni.navigateTo({
					url: '/pages/users/user_sgin/index'
				})
			},
			gotoIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			// 绑定商家
			bindPhone() {
				uni.navigateTo({
					url: '/pages/users/user_phone/index'
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	page {
		// background-color: #6b6aec;
	}
	.swiper{min-height:600px}

	.page-login {
		.page-section {

			.swiper-item {
				z-index: 1;
				height: 100%;
				margin: auto;
				width: 100%;
				display: block;
			}
		}

		.page-bg {
			width: 100%;
			// height: 100%;
			z-index: 1;
		}

		.login-btn {
			font-size: 30rpx;
			font-weight: 500;
			color: #FFFFFF;
			width: 350rpx;
			height: 102rpx;
			background: #1698AE;
			border-radius: 51rpx;
			z-index: 10;
			position: absolute;
			left: 0;
			right: 0;
			top: 60%;
			margin: auto;
		}
	}
</style>
