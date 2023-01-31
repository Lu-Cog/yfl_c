<template>
	<!-- 助力活动-邀请拼单 -->
	<view class="page help_order">
		<myhead :title="'邀请拼单'" :type="1"></myhead>
		<view class="top_body">
			<view class="users_list flex-center">
				<view class="users_item yes" v-for="(item,index) in users.imgs" :key="index">
					<image :src="item" mode="aspectFill"></image>
					<!-- <text class="badge flex-center"></text> -->
				</view>
				<view class="users_item yes" v-if="status!=2 && status!=-1">
					<image src="/static/img/order_add.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="title" v-if="status===1">
				还差<text>{{users.left_num}}</text>人，赶快去邀请好友拼单吧～
			</view>
			<view class="title red" v-if="status===2">
				拼团成功
			</view>
			<view class="title" v-if="status===-1">
				很遗憾还差<text>{{users.left_num}}</text>人拼团成功
			</view>
			<view class="title2" v-if="status===1">
				距离结束还剩下<text class="time">{{countdown_time?countdown_time:'00小时00分钟00秒'}}</text>
			</view>
			<view class="title2" v-else-if="status==-1">
				已结束
			</view>
			<button hover-class="none" class="flex-center" type="default" v-if="share==1" @click="goto()">去参团</button>
			<view v-else>
				<button hover-class="none" class="flex-center" type="default" v-if="status===1 && share2==1" open-type="share">
					<image src="/static/img/wx.png" mode="widthFix"></image> 去邀请
				</button>
				<button hover-class="none" class="flex-center" type="default" v-else-if="status===1 && share2==2" @click="open2()">
					<image src="/static/img/wx.png" mode="widthFix"></image> 去邀请
				</button>
				<button hover-class="none" class="flex-center" type="default" v-if="status===2" @click="gotoIndex()">继续逛</button>
				<button hover-class="none" class="flex-center" type="default" v-if="status===-1" @click="gotoIndex()">重新邀请</button>
			</view>

		</view>
		<view class="product-item">
			<view class="img-box">
				<image :src="goods.image"></image>
			</view>
			<view class="content">
				<view class="name line1">{{goods.title}}</view>
				<!-- <view class="label">{{goods.productAttr.sku}}</view> -->

				<view class="price">
					<view class="priceitem">
						<text>{{goods.assist_price==0?'免费抢':goods.assist_price}} </text>
						<text class="badge flex-center">原价¥{{goods.ot_price}}</text>
					</view>
					<text>X{{goods.num}}</text>

				</view>
			</view>
		</view>
		<view v-if="share==0">
			<view class="order_block">
				<text class="order_title">订单信息</text>
				<view class="order_list">
					<view class="list_item flex-bt">
						<text class="left">订单编号</text>
						<view class="right">{{order_assist_sn}}<text>复制</text></view>
					</view>
					<view class="list_item flex-bt">
						<text class="left">拼团时间</text>
						<view class="right">{{add_time}}</view>
					</view>
					<view class="list_item flex-bt" v-if="hx_status==1">
						<text class="left">核销时间</text>
						<view class="right">{{hx_time}}</view>
					</view>
					<view class="list_item flex-bt">
						<text class="left">店铺名称</text>
						<view class="right">{{store_name}}</view>
					</view>
					<view class="list_item flex-bt">
						<text class="left">店铺联系人</text>
						<view class="right">{{store_contact}}</view>
					</view>
					<view class="list_item flex-bt">
						<text class="left">联系电话</text>
						<view class="right">{{store_phone}}</view>
					</view>
					<view class="list_item flex-bt">
						<text class="left">店铺地址</text>
						<view class="right">{{store_address}}</view>
					</view>
				</view>

			</view>
			<view class="button" v-if="status==2">
				<button :class="hx_status==0?'':'grey'" type="default" hover-class="none" @click="open">核销二维码</button>
			</view>
			<uni-popup ref="popup" type="center">
				<view class="popup_content">
					<image :src="image" mode="widthFix"></image>
					<image class="del-i" src="http://imgxcx.yifulai.com/del2.png" mode="widthFix" @click="close()">
					</image>
				</view>
			</uni-popup>
		</view>
		<view class="fiexd flex-center" @click="goAddress()" v-if="lat && lng">
			<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/index.png" mode="widthFix"></image>
			导航到店
		</view>
	</view>
</template>

<script>
	import myhead from "@/components/my-components/myhead.vue"
	import {
		mapGetters
	} from "vuex";
	import store from '@/store';
	import {
		getAssistHx,
		getOrderDetail
	} from '@/api/store'
	import {
		getStoreInfo
	} from '@/api/user';
	export default {
		components: {
			myhead
		},
		data() {
			return {
				title: '',
				countdown_time: '',
				fornum: 5,
				share: 0,
				spid: 0, //分享链接传过来的
				order_assist_id: '', //	int	订单id
				order_assist_sn: '', //	int	订单号
				add_time: '', //	string	下单时间
				hx_time:'',
				store_name: '', //	string	店铺名称
				store_contact: '', //	string	店铺联系人
				store_phone: '', //	string	联系电话
				store_address: '', //	string	店铺地址
				qrcode: '', //	string	核销二维码
				hx_status: '', //	int	核销状态，默认 0未使用，1已使用
				status: 1, //	int	订单状态 1拼团中，2拼成成功，-1拼团失败
				goods: [], //	object	商品信息
				users: [],
				assist_id: 0,
				image:'',
				lat:'',
				lng:'',
				mer_name:'',
				detail:'',
				share2:''
			}
		},
		computed: mapGetters(['store_id', "uid"]),
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target, "tar")
			}
			let data = {
				title: this.goods.title,
				path: '/pages/assist/detail?share=1&store_id=' + this.store_id + "&assist_id=" + this.assist_id +
					"&spid=" + this.uid + "&order_assist_id=" + this.order_assist_id
			}
			console.log(data);
			return data
		},
		onLoad(options) {
			if (Number(options.order_assist_id) > 0) {
				this.order_assist_id = Number(options.order_assist_id)
			}
			if (options.share != "" && options.share != undefined) {
				this.share = Number(options.share)
			}
			if (options.spid != "" && options.spid != undefined) {
				this.spid = Number(options.spid)
				getApp().globalData.spid = this.spid
				// store.commit('SETUID', Number(options.spid));
			}
			let store_id = Number(options.store_id)
			if (store_id > 0) {
				store.commit('STOREID', {
					store_id: store_id
				});
			}
			console.log(options.order_assist_id);
			this.getOrderDetail()
			this.getStoreInfo()
			console.log(this.share);
		},
		updated() {
			// console.log(this.users.left_time,this.countdown_time,"mounted");
			//开始倒计时
			//this.countTime()
		},
		methods: {
			getStoreInfo() {
				let that = this
				getStoreInfo(that.store_id).then(res => {
					that.lat = res.data.store.lat
					that.lng = res.data.store.lng
					that.detail = res.data.store.detail
					that.mer_name = res.data.store.mer_name
				})
			},
			goAddress() {
				console.log(this.lat, this.lng);
				
				uni.openLocation({
					latitude: Number(this.lat),
					longitude: Number(this.lng),
					name: this.mer_name,
					address: this.detail,
					success: function() {
						console.log('success');
					}
				});
				
			},
			open2(){
				let that = this
				getOrderDetail(this.order_assist_id).then(res => {
					that.image = res.data.share_img
				})
				this.$refs.popup.open()
			},
			open() {
				if(this.hx_status==0){
					getAssistHx(this.order_assist_id).then(res=>{
						console.log(res.data.url);
						this.image = res.data.url
						this.$refs.popup.open()
					})
				}else{
					uni.showToast({
						title:'已核销',
						icon: 'none',
						duration: 1000
					})
				}
			},
			// 签到弹框 关闭
			close() {
				this.$refs.popup.close()
			},
			gotoIndex() {
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			goto() {
				uni.navigateTo({
					url: '/pages/assist/item?store_id=' + this.store_id + "&assist_id=" + this.assist_id +
						"&spid=" + this.spid + "&order_assist_id=" + this.order_assist_id
				})
			},
			getOrderDetail() {
				let that = this
				getOrderDetail(this.order_assist_id).then(res => {
					that.order_assist_id = res.data.product_assist_set_id2 //订单id
					that.assist_id = res.data.product_assist_id //活动id
					that.order_assist_sn = res.data.order_assist_sn
					that.add_time = res.data.add_time
					that.store_name = res.data.store_name
					that.store_contact = res.data.store_contact
					that.store_phone = res.data.store_phone
					that.store_address = res.data.store_address
					that.qrcode = res.data.qrcode
					that.hx_status = res.data.hx_status
					that.status = res.data.status
					that.share2 = res.data.share
					if(that.share2==2){
						uni.hideShareMenu()
					}
					that.hx_time = res.data.hx_time
					that.goods = res.data.goods
					that.users = res.data.users
					that.lat = res.data.lat
					that.lng = res.data.lng
					if(that.status==2){
						that.image = res.data.pd_share_img
						that.$refs.popup.open()
					}
					if(that.status==1){
						that.countTime();
					}
				})
			},
			countTime() {
				
				var that = this;
				//获取当前时间  
				var now = new Date().getTime();
				//设置截止时间
				var curDate = this.users.left_time * 1000;

				//判断是否结束
				var endDate = new Date(curDate);
				var end = endDate.getTime();
				var leftTime = end - now;
				if (leftTime <= 0 && this.fornum>0 ) {
					this.fornum--;
					this.countdown_time = "已结束";
					this.getOrderDetail();
					return;
				}

				//倒计时显示
				setInterval(function() {
					leftTime -= 1000;
					if (leftTime <= 1000) {
						that.countdown_time = "已结束";
						that.getOrderDetail();
						return;
					}
					that.countdown_time = that.showDayHourMinSec(leftTime / 1000);
				}, 1000)

			},

			showDayHourMinSec(second_time) {
				var theTime = parseInt(second_time); // 需要转换的时间秒 
				var theTime1 = 0; // 分 
				var theTime2 = 0; // 小时 
				var theTime3 = 0; // 天
				if (theTime > 60) {
					theTime1 = parseInt(theTime / 60);
					theTime = parseInt(theTime % 60);
					if (theTime1 > 60) {
						theTime2 = parseInt(theTime1 / 60);
						theTime1 = parseInt(theTime1 % 60);
						if (theTime2 > 24) {
							//大于24小时
							theTime3 = parseInt(theTime2 / 24);
							theTime2 = parseInt(theTime2 % 24);
						}
					}
				}
				var result = '';
				if (theTime >= 0) {
					if (theTime < 10) theTime = "0"+theTime
					result = "" + theTime + "秒";
				}
				if (theTime1 >= 0) {
					if (theTime1 < 10) theTime1 = "0"+theTime1
					result = "" + theTime1 + "分" + result;
				}
				if (theTime2 >= 0) {
					if (theTime2 < 10) theTime2 = "0"+theTime2
					result = "" + theTime2 + "小时" + result;
				}
				if (theTime3 > 0) {
					result = "" + theTime3 + "天" + result;
				}
				return result;

			}
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style lang="less" scoped>
	.fiexd {
		position: fixed;
		bottom: 200rpx;
		right: 0;
		width: 192px/2;
		height: 72px/2;
		background: rgba(22, 152, 174, 0.64);
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
	.popup_content {
		width: 490rpx;
		// height: 531rpx;
		padding: 0;
		border-radius: 0;
		background: none;
		position: relative;

		image {
			width: 100%;
		}

		.del-i {
			position: absolute;
			bottom: -90rpx;
			left: 0;
			right: 0;
			margin: auto;
			width: 48rpx;
			height: 48rpx !important;
		}
	}

	page {
		background-color: #fff;
	}

	.headder_body {
		// margin-bottom: 185px;
	}

	.help_order {
		position: relative;

		.product-item {
			margin-top: -90px;
			display: flex;
			padding: 25rpx 40rpx;
			border-top: 1px solid #F0F0F0;
			border-bottom: 1px solid #F0F0F0;

			.img-box {
				width: 130rpx;
				height: 130rpx;

				image {
					width: 130rpx;
					height: 130rpx;
					border-radius: 16rpx;
				}
			}

			.content {
				position: relative;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				width: 550rpx;
				margin-left: 30rpx;
				font-size: 28rpx;
				color: #282828;

				&.event_content {
					.line1 {
						width: 360rpx;
					}

					.price {
						position: absolute;
						top: 0;
						right: 0;
						margin-top: 0;



						text {
							display: block;
							text-align: right;
						}
					}
				}

				.event_name {
					display: inline-block;
					margin-right: 9rpx;
					color: #fff;
					font-size: 20rpx;
					padding: 0 8rpx;
					line-height: 30rpx;
					text-align: center;
					border-radius: 6rpx;
				}

				.event_ship {
					font-size: 20rpx;
					margin-top: 10rpx;
				}

				.label {
					margin-top: 10rpx;
					color: #868686;
					font-size: 20rpx;
				}

				.price {
					margin-top: 20rpx;
					// color: $theme-color;
					display: flex;
					justify-content: space-between;

					.priceitem {
						display: flex;
						align-items: center;
						color: #FF002B;

						.badge {
							margin-left: 3px;
							display: inline-block;
							height: 16px;
							padding: 0 10px;
							background: #fee4ce;
							border-radius: 9px;
							font-size: 8px;
							font-weight: bold;
							color: #FF002B;
							line-height: 16px;
							text-decoration: line-through;
						}
					}

					>text {
						margin-left: 10rpx;
						color: #999;
					}
				}

				.err-txt {
					display: flex;
					align-items: center;
					margin-top: 18rpx;
					// color: $theme-color;

					.iconfont {
						margin-right: 10rpx;
					}
				}

				.step {
					position: absolute;
					right: 0;
					top: 100rpx;
					display: flex;
					align-items: center;

					.min {
						width: 50rpx;
						height: 40rpx;
						background-image: url('~@/static/images/min.png');
						background-size: 17rpx 17rpx;
						background-position: center;
						background-repeat: no-repeat;
					}

					.num-box {
						width: 68rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: #F2F2F2;
						font-size: 23rpx;
					}

					.add {
						width: 50rpx;
						height: 40rpx;
						background-image: url('~@/static/images/add.png');
						background-size: 17rpx 17rpx;
						background-position: center;
						background-repeat: no-repeat;
					}
				}
			}
		}

		.top_body {
			position: relative;
			top: -110px;
			left: 0;
			right: 0;
			margin: auto;
			width: 690px/2;
			// height: 510px/2;
			padding-bottom: 20px;
			background: #FFFFFF;
			box-shadow: 0px 3px/2 32px/2 0px rgba(22, 152, 174, 0.34);
			border-radius: 10px/2;
			z-index: 10;

			.users_list {
				padding-top: 22px;
				padding-bottom: 74px/2;
				flex-wrap: wrap;

				.users_item {
					width: 83px/2;
					height: 83px/2;
					border-radius: 50%;
					margin: 15px/2;
					position: relative;

					&.yes {
						image {
							width: 83px/2;
							height: 83px/2;
							border-radius: 50%;
						}

						.badge {
							width: 51px/2;
							height: 26px/2;
							background: #1698AE;
							border-radius: 13px/2;
							font-size: 20px/2;
							color: #FFFFFF;
							position: absolute;
							left: 11px/2;
							bottom: -11px/2;
						}
					}

					&.no {
						width: 83px/2;
						height: 83px/2;
						line-height: 83px/2;
						text-align: center;
						background: #F3F3F3;
						border: 2px/2 solid #EAD2A2;
						border-radius: 50%;
						z-index: 1;

						text {
							font-size: 28px/2;
							line-height: normal;
							color: #927979;
						}
					}
				}
			}

			.title {
				text-align: center;
				font-size: 32px/2;
				font-weight: 500;
				color: #000000;
				margin-bottom: 30px/2;

				text {
					color: red;
				}
			}
			.red{
				font-size: 20px;
				color: red;
			}

			.title2 {
				text-align: center;
				font-size: 28px/2;
				font-weight: 500;
				color: #A5A5A5;

				.time {
					color: #1698AE;
					margin-left: 10px;
				}
			}

			button {
				width: 382px/2;
				height: 85px/2;
				margin: auto;
				margin-top: 60px/2;
				background: #1698AE;
				border-radius: 43px/2;

				image {
					width: 43px/2;
					height: 43px/2;
					margin-right: 13px/2;
				}

				font-size: 32px/2;
				font-weight: 500;
				color: #FFFFFF;
			}
		}

		.order_block {
			padding: 0 40px/2;
			margin-top: 20px;

			.order_title {
				font-size: 34px/2;
				font-weight: bold;
				color: #333333;
				position: relative;
				padding-left: 12px;

				&::before {
					content: " ";
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					margin: auto;
					width: 8px/2;
					height: 42px/2;
					background: #1698AE;
				}
			}

			.order_list {
				margin-top: 60px/2;
				padding-left: 12px;

				.list_item {
					margin-bottom: 24px;

					.left {
						font-size: 30px/2;
						font-weight: 500;
						color: #333333;
					}

					.right {
						font-size: 28px/2;
						font-weight: 500;
						color: #999999;

						text {
							font-size: 28px/2;
							font-weight: 500;
							color: #EC632C;
							margin-left: 4px;
						}
					}

				}
			}
		}

		.button {
			padding: 50rpx;
			display: flex;
			justify-content: center;

			button {
				background: #1698AE;
				color: #fff;
				font-size: 34rpx;
				padding: 14rpx 40rpx;
				border-radius: 80rpx;
			}
			.grey{
				background-color: #aeaeae;
			}
		}
	}
</style>
