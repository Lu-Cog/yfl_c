<template>
	<!-- 表单-充值-在线充值 -->
	<view class="page recharge_body">
		<form @submit="formSubmit" class="form_body">
			<view class="uni-form-item title_block flex-bt hr_shadow">
				<view class="title">代理商充值
				<!-- <text>（充值金额不得少于1000元）</text> -->
				</view>
				<navigator  url="./logs" hover-class="none">
					<text class="blue">充值记录</text>
				</navigator>
			</view>
			<view class="uni-form-item hr_shadow money">
				￥&nbsp;<input type="number" maxlength="6" placeholder="请输入充值金额" v-model="money" />
			</view>
			
			<view class="uni-form-item title_block hr_shadow">
				<view class="title">选择充值日期时间</view>
			</view>
			
			<view class="block radio_block flex-bt">
			<view class="uni-list_body">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						请选择日期
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			
			<view class="uni-list_body" style="display: block;">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						请选择时分
					</view>
					<view class="uni-list-cell-db">
						<picker mode="time" :value="time" start="00:00" end="23:59" @change="bindTimeChange">
							<view class="uni-input">{{time}}</view>
						</picker>
					</view>
				</view>
			</view>
			</view>
			
			<!-- <view class="uni-form-item title_block hr_shadow">
				<view class="title">选择面值</view>
			</view>
			<view class="block radio_block flex-bt">
				<view class="radio_item flex-center active">
					<view class="radio-price">
						<text>1</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>3</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>5</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>10</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>20</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
				<view class="radio_item flex-center">
					<view class="radio-price">
						<text>50</text>万元
					</view>
					<view class="song">赠送&nbsp;1000.00</view>
				</view>
			</view>
			<view class="block arrival">实际到账：<text class="blue">1100元</text></view> -->
			<!-- <view class="uni-form-item title_block">
				<view class="title">支付方式</view>
			</view>
			<view class="uni-list_body">
				<uni-list>
					<uni-list-item title="今日订单" thumb="/static/img/z-wx.png" thumb-size="sm">
						<template slot="footer">
							<image class="footer-img" :src="active===1?'/static/img/z-yes.png':'/static/img/z-no.png'" mode="widthFix"
							 @click="way(1)"></image>
						</template>
					</uni-list-item>
				</uni-list>
				<uni-list>
					<uni-list-item title="今日订单" thumb="/static/img/xx.png" thumb-size="sm">
						<template slot="footer">
							<image class="footer-img" :src="active===2?'/static/img/z-yes.png':'/static/img/z-no.png'" mode="widthFix"
							 @click="way(2)"></image>
						</template>
					</uni-list-item>
				</uni-list>
			</view> -->
			<view class="uni-form-item title_block">
				<view class="title">上传凭证（1张）</view>
			</view>
			<view class="upload-box">
				<!-- <view class="title">
					<view class="txt">上传凭证</view>
					<view class="des">( 最多可上传9张 )</view>
				</view> -->
				<view class="upload-img">
					<view class="img-item" v-for="(item,index) in uploadImg" :key="index">
						<image :src="item" mode=""></image>
						<view class="iconfont icon-guanbi1" @click="deleteImg(index)"></view>
					</view>
					<view class="add-img" @click="uploadpic">
						<text class="iconfont icon-icon25201"></text>
						<text class="txt">上传凭证</text>
					</view>
				</view>
			</view>
			
			<view class="uni-form-item title_block">
				<view class="title">收款信息</view>
			</view>
			<view class="way_2" >
				<view class="way_row">账户：168888898*******0232</view>
				<view class="way_row">户名：深圳翌芙莱科技有限公司</view>
				<view class="way_row">开户行：深圳招商银行浦东支行</view>
				<view class="way_row">注：线下支付需等待1-3个工作日进行审核</view>
			</view>
			<button type="default" @click="charge" class="flex-center btn" hover-class="none" >充 值</button>
			
			<view class="uni-form-item title_block">
				<view class="title">温馨提示</view>
			</view>
			<view class="text_list">
				1. 额度可由自主充值、平台有赠送奖励；<br>2. 充值金额只能用来消费，不支持提现；<br> 3. 线下转账后请联系客服；
			</view>
		</form>
	</view>
</template>

<script>
	let app = getApp();
	import {
		agent_recharge
	} from '@/api/user.js';
	
	export default {
		
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				money: '', //自定义充值
				date: currentDate,
				time: '00:00',
				uploadImg:[],
				numArray:[],
				numIndex:0,
				active: 1,
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
 
			// 删除图片
			deleteImg(index){
				this.uploadImg.splice(index,1)
			},
			/**
			 * 上传文件
			*/
			uploadpic: function () {
				if(this.uploadImg.length <1){
					let that = this;
					that.$util.uploadImageOne('upload/image', function (res) {
					  that.uploadImg.push(res.data.path);
						that.$set(that,'uploadImg',that.uploadImg);
					});
				}else{
					uni.showToast({
						title:'最多可上传1张',
						icon:'none'
					})
				}
			},
			bindDateChange: function(e) {
				this.date = e.target.value
				console.log(this.date,"date")
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
				console.log(this.time,"time")
			},
			getDate: function(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			charge:function(){
				
				let that = this;
				let money = parseInt(this.money);
				let dates = this.date+" "+this.time;
				
				console.log(dates,"dates");
				console.log(this.uploadImg,"uploadImg");
				
				if( isNaN(money) || money == 0 || money <0 ){
					this.$util.Tips({
						title:'请正确填写充值金额'
					});
					return false;
				}
				if(this.date == "" || this.time == "00:00" || this.time == ""){
					this.$util.Tips({
						title:'请选择充值的日期与时间'
					});
					return false;
				}
				if(this.uploadImg.length==0){
					this.$util.Tips({
						title:'请上传充值拍照凭证'
					});
					return false;
				}
				
				let data = {
					"price":money,
					"image":this.uploadImg.join(","),
					"pay_date":this.date,
					"pay_time":this.time+":00",
				};
				agent_recharge(data).then(res => {
		
					uni.showToast({
						title: res.message,
						icon:'success',
						duration: 2000
					});
					setTimeout(function() {
						uni.redirectTo({
							url: "./logs"
						})
					}, 2000);
					
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				});
				
				
				
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.recharge_body {
		margin-top: 20rpx;
		background: #fff;
		padding-bottom: 110rpx;

		.title_block {
			width: 100%;

			.title {
				position: relative;

				&::after {
					content: ' ';
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					margin: auto;
					width: 6rpx;
					height: 32rpx;
					background: #1698AE;
				}

				white-space:nowrap;
				font-size:30rpx;
				font-weight: 500;
				color: #333333;
				padding-left:24rpx;

				text {
					font-size: 24rpx;
					font-weight: 500;
					color: #999999;
				}
			}
		}

		.footer-img {
			width: 32rpx;
			height: 32rpx;
			margin-top: 4rpx;
		}

		.uni-form-item {
			input {
				width: 100%;
				height: 105rpx;
			}
		}

		.block {
			padding: 0 35rpx;
		}

		.radio_block {
			flex-wrap: wrap;

			.radio_item {
				width: 200rpx;
				height: 130rpx;
				background: #FFFFFF;
				border: 2rpx solid #E6E6E6;
				flex-direction: column;
				margin-bottom: 37rpx;

				.radio-price {
					font-size: 24rpx;
					color: #666666;
					margin-bottom: 10rpx;

					text {
						font-weight: bold;
						font-size: 32rpx;
					}
				}

				.song {
					font-size: 20rpx;
					color: #666666;
				}

				&.active {
					border: 2rpx solid #1698AE;

					.radio-price {
						color: #1698AE;
					}

					.song {
						color: #1698AE;
					}
				}
			}
		}

		.arrival {
			text-align: right;
		}

		.uni-list_body {
			padding: 0 40rpx;
		}

		.text_list {
			padding: 0 50rpx;
			font-size: 24rpx;
			color: #666666;
			line-height: 40rpx;
			padding-bottom: 60rpx;
		}

		.way_2 {
			background: #F5F5F5;
			margin: 0 40rpx;
			padding: 35rpx 40rpx;

			.way_title {
				font-size: 24rpx;
				font-weight: bold;
				color: #000000;
				line-height:normal;
				margin-bottom: 30rpx;
			}

			.way_row {
				font-size: 24rpx;
				font-weight: 500;
				color: #333333;
				line-height: normal;
				margin-bottom: 20rpx;

				&:last-child {
					color: #999999;
				}
			}
		}

		.btn {
			width: 690rpx;
			height: 102rpx;
			background: #1698AE;
			border-radius: 3px;
			font-size: 16px;
			font-weight: 500;
			color: #FFFFFF;
			margin: 48rpx auto 30rpx;
		}
	}
	.money{font-size: 50rpx; color: #F7302A;}
	.upload-box{
			padding: 30rpx;
			background-color: #fff;
			.title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 30rpx;
				.des{
					color: #BBBBBB;
				}
			}
			.upload-img{
				display: flex;
				flex-wrap: wrap;
				// margin-top: 20rpx;
				.img-item{
					position: relative;
					width: 156rpx;
					height: 156rpx;
					margin-right: 24rpx;
					margin-top: 20rpx;
					image{
						width: 156rpx;
						height: 156rpx;
						border-radius: 8rpx;
					}
					.iconfont{
						position: absolute;
						right: -15rpx;
						top: -20rpx;
						font-size: 40rpx;
						color: #DDDDDD;
					}
				}
				.add-img{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 156rpx;
					height: 156rpx;
					margin-top: 20rpx;
					border: 1px solid #DDDDDD;
					border-radius: 3rpx;
					color: #BBBBBB;
					font-size: 24rpx;
					.iconfont{
						margin-bottom: 10rpx;
						font-size: 50rpx;
					}
				}
			}
		}
		.btn-box{
			width:690rpx;
			height:86rpx;
			margin: 70rpx auto;
			line-height: 86rpx;
			text-align: center;
			color: #fff;
			background:#DDDDDD;
			border-radius:43rpx;
			font-size: 32rpx;
		}
	
</style>
