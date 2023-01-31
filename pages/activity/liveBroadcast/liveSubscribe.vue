<template>
	<view style="background-color: #FFD0F2;">
		<!-- <view class="tab">
			<view class="move" :class="{'move1':active==2,'move2':active==3}"></view>
			<view class="left" :class="{'active':active==1}" @click="changetab(1)">直播详情</view>
			<view :class="{'active':active==2}" @click="changetab(2)">助力榜</view>
			<view class="right" :class="{'active':active==3}" @click="changetab(3)">总榜</view>
		</view> -->
		<view class="" v-if="active==1">
			<image src="http://imgxcx.yifulai.com/a30fd202203151100362723.jpg" mode="widthFix"></image>
			<image src="http://imgxcx.yifulai.com/64fd8202203151100369803.jpg" mode="widthFix"></image>
			<!-- <image src="http://imgxcx.yifulai.com/49199202112091807561993.jpg" mode="widthFix"></image> -->
			<image class="bomImg" src="http://imgxcx.yifulai.com/44ba8202203151100362812.jpg" mode="widthFix"></image>
			<!-- <view class="page-section" :style="{'background':'url('+room_img+')','backgroundSize': '100% 100%'}">
				
			</view> -->
		</view>
		<view class="phb" v-else>
			<view class="phb_top">
				<view class="phtab">
					<view :class="{'active':activePh==1}" @click="changePhtab(1)">规则</view>
					<view :class="{'active':activePh==2}" @click="changePhtab(2)">奖品</view>
				</view>
				<view class="qian3">
					<view v-for="(item,index) in phbList" :key='index' v-if="item.top<=3" :class="{'mtop1':item.top==1,'mtop2':item.top==2,'mtop3':item.top==3}"> 
						<text class="top">{{item.top}}</text>
						<image :src="item.img" mode="aspectFill"></image>
						<text class="name">{{item.name}}</text>
						<text class="num">{{item.num}}</text>
					</view>
				</view>
			</view>
			<view class="phb_bot">
				<view class="list">
					<view v-for="(item,index) in phbList" :key="index" v-if="item.top>3">
						<text class="top">{{item.top}}</text>
						<image :src="item.img" mode="aspectFill"></image>
						<text class="name">{{item.name}}</text>
						<text class="num">{{item.num}}</text>
					</view>
				</view>
			</view>
			<!-- <view class="bot_me">
				<text class="top">未上榜</text>
				<image src="../../../static/images/f.png" mode="aspectFill"></image>
				<text class="name">我</text>
				<text class="num">0</text>
			</view> -->
		</view>
		<!-- <view class="prize" v-else>
			<view class="prizeItem" v-for="(item,index) in prizeList" :key='index'>
				<view class="top" :class="{'top1':index==0,'top2':index==1,'top3':index==2}">
					{{item.top}}
				</view>
				<view class="prizeinfo" :class="{'top1':index==0,'top2':index==1,'top3':index==2}">
					<image :src="item.img" mode="aspectFill"></image>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view> -->
		<view class="box flex-center" :class="{'showBox':showbtn}">
			<!-- <view class="name">
				直播间：{{room_name}}
			</view>
			<view class="time">
				开播时间：{{room_time}}
			</view> -->
			<!-- <view class="subscribe"> -->
			<!-- <button type="default" class="shareBtn" open-type="share">分享直播间</button> -->
			<button v-if="buttonType!=102" class="goinBtn" @click="goInLive()">进入直播间</button>
			<subscribe :room-id="roomId" v-if='roomId' :width="width" :height="height" :font-size="fontSize"
				:color="color" :background-color="backgroundColor" :custom-params="customParams"
				@subscribe="onSubscribe">
			</subscribe>
			<!-- </view> -->
		</view>
		<uni-popup ref="popup" background-color="#fff">
			<view class="popupView">
				<view class="title">
					{{active==2?'直播助力榜奖品':'直播总榜奖品'}}
				</view>
				<view class="prizeItem" v-for="(item,index) in prizeList" :key='index'>
					<view class="top" :class="{'top1':index==0,'top2':index==1,'top3':index==2}">
						{{item.top}}
					</view>
					<view class="prizeinfo" :class="{'top1':index==0,'top2':index==1,'top3':index==2}">
						<image :src="item.img" mode="aspectFill"></image>
						<text>{{item.title}}</text>
					</view>
				</view>
			</view>
			<image class="del-i" src="http://imgxcx.yifulai.com/del2.png" mode="widthFix" @click="close()"></image>
		</uni-popup>
		<uni-popup ref="popup1" background-color="#fff" mask-background-color='rgba(0,0,0,.6)'>
			<view class="popupView1" v-pre>
				<view class="title">
					{{active==2?'直播助力榜规则':'直播总榜规则'}}
				</view>
				1、资源奖励：淘宝搜索热榜、会场浮标;<br/>
				
				2、赛道查询时间：12月21日-12月22日;<br/>
				
				3、设置瓜分红包必读事宜：<br/>
				
				(1)活动任务及红包创建必须使用店铺主账号;<br/>
				
				(2)商家只能在活动开始10分钟以前设置红包;<br/>
				
				(3)粉丝榜活动中未瓜分的红包和瓜分过的红包都不可绑定新的任务;<br/>
				
				(4)活动进行中不可随意编辑任务和红包状态;<br/>
				
			</view>
			<image class="del-i" src="http://imgxcx.yifulai.com/del2.png" mode="widthFix" @click="close()"></image>
		</uni-popup>
		<!-- #ifdef MP -->
		<authorize @onLoadFun="onLoadFun" :isAuto="isAuto" :isShowAuth="isShowAuth" @authColse="authColse"></authorize>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		getSubscribeInfo,
		getSubscribe,
		getHelpList
	} from '@/api/api.js'
	import store from '@/store';
	import {
		mapGetters
	} from "vuex";
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	export default {
		components: {
			// #ifdef MP
			authorize
			// #endif
		},
		computed: mapGetters(['isLogin', 'stype','store_id', "uid"]),
		data() {
			return {
				roomId: 0,
				width: 250,
				height: 41,
				fontSize: 17,
				color: '#FFFFFF',
				backgroundColor: 'red',
				customParams: encodeURIComponent(JSON.stringify({})),
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				buttonType: 0,
				room_name: '',
				room_time: '',
				room_img: '',
				showbtn: false,
				scrollTop: 0,
				active: 1,
				activePh:0,
				phbList:[
					{top:1,name:'用户昵称',img:'../../../static/images/f.png',num:100},
					{top:2,name:'用户昵称',img:'../../../static/images/f.png',num:100},
					{top:3,name:'用户昵称',img:'../../../static/images/f.png',num:100},
					{top:4,name:'用户昵称',img:'../../../static/images/f.png',num:100},
					{top:5,name:'用户昵称',img:'../../../static/images/f.png',num:100},
					{top:6,name:'用户昵称',img:'../../../static/images/f.png',num:100},
					{top:7,name:'用户昵称',img:'../../../static/images/f.png',num:100},
					{top:8,name:'用户昵称',img:'../../../static/images/f.png',num:100},
					{top:9,name:'用户昵称',img:'../../../static/images/f.png',num:100},
					{top:10,name:'用户昵称',img:'../../../static/images/f.png',num:100}
				],
				prizeList:[
					{top:'第一名',title:'荟萃玉屏修护套盒荟萃玉屏修护套盒',img:'http://imgxcx.yifulai.com/95129202202241141098857.jpg'},
					{top:'第二名',title:'荟萃玉屏修护套盒',img:'http://imgxcx.yifulai.com/95129202202241141098857.jpg'},
					{top:'第三名',title:'荟萃玉屏修护套盒',img:'http://imgxcx.yifulai.com/95129202202241141098857.jpg'},
					{top:'第四名',title:'荟萃玉屏修护套盒',img:'http://imgxcx.yifulai.com/95129202202241141098857.jpg'},
					{top:'第五名',title:'荟萃玉屏修护套盒',img:'http://imgxcx.yifulai.com/95129202202241141098857.jpg'},
					{top:'第六名',title:'荟萃玉屏修护套盒',img:'http://imgxcx.yifulai.com/95129202202241141098857.jpg'},
					{top:'第七名',title:'荟萃玉屏修护套盒',img:'http://imgxcx.yifulai.com/95129202202241141098857.jpg'},
					{top:'第八名',title:'荟萃玉屏修护套盒',img:'http://imgxcx.yifulai.com/95129202202241141098857.jpg'},
					{top:'第九名',title:'荟萃玉屏修护套盒',img:'http://imgxcx.yifulai.com/95129202202241141098857.jpg'},
					{top:'第十名',title:'荟萃玉屏修护套盒',img:'http://imgxcx.yifulai.com/95129202202241141098857.jpg'},
				]
			};
		},
		onPageScroll(e) {
			if (this.scrollTop < e.scrollTop) {
				this.showbtn = true
			} else {
				this.showbtn = false
			}
			this.scrollTop = e.scrollTop || 0
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			let data = {
				title: '分享直播间',
				path: '/pages/activity/liveBroadcast/liveSubscribe?store_id=' + this.store_id +
					"&spid=" + this.uid + "&roomId="+this.roomId
			}
			return data
		},
		onLoad(options) {
			this.roomId = options.room_id
			this.getSubscribeInfo()
			getApp().globalData.spid = options.spid
			store.commit('STOREID', {
				store_id: options.mer_id
			});
			getApp().globalData.roomId = this.roomId
			if (this.isLogin) {
				let livePlayer = requirePlugin('live-player-plugin')
				// 首次获取立马返回直播状态
				const roomId = this.roomId // 房间 id
				livePlayer.getLiveStatus({
						room_id: roomId
					})
					.then(res => {
						// 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期 
						const liveStatus = res.liveStatus
						this.buttonType = liveStatus
					})
					.catch(err => {
						console.log('get live status', err)
					})
				// 往后间隔1分钟或更慢的频率去轮询获取直播状态
				setInterval(() => {
					livePlayer.getLiveStatus({
							room_id: roomId
						})
						.then(res => {
							// 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期 
							const liveStatus = res.liveStatus
							this.buttonType = liveStatus
						})
						.catch(err => {
							console.log('get live status', err)
						})
				}, 60000)
			} else {
				if (this.stype != 3) {
					this.isShowAuth = true;
				} else {
					this.isShowAuth = false;
				}
			}

		},
		onShow() {
			// this.getHelpList()
		},
		methods: {
			changetab(type) {
				this.active = type
				if(this.active==1) return
				this.getHelpList()
			},
			changePhtab(type){
				this.activePh = type
				if(type==1){
					this.$refs.popup1.open('center')
				}else{
					this.$refs.popup.open('center')
				}
			},
			close() {
				this.activePh=0
				this.$refs.popup.close()
				this.$refs.popup1.close()
			},
			getHelpList(){
				let data = {
					room_id: this.roomId,
					type : this.active-1
				}
				getHelpList(data).then(res=>{
					this.phbList = res.data
				})
			},
			getSubscribeInfo() {
				getSubscribeInfo({
					room_id: this.roomId
				}).then(res => {
					this.room_name = res.data.room_name
					this.room_time = res.data.room_time
					this.room_img = res.data.room_img
					this.prizeList = res.data.prizes
				}).catch(res => {
					uni.showToast({
						title: res,
						icon: 'none'
					})
				})
			},
			goInLive() {
				let data = {
					mer_id:this.store_id,
					spid:this.uid
				}
				let param = encodeURIComponent(JSON.stringify(data))
				getSubscribe({
					room_id: this.roomId
				}).then(res => {
					uni.navigateTo({
						url: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + this
							.roomId + '&custom_params=' + param
					})
				}).catch(res => {
					uni.showToast({
						title: res,
						icon: 'none'
					})
				})

			},
			onSubscribe(e) {
				getSubscribe({
					room_id: this.roomId
				}).then(res => {})
				console.log('房间号：', e.detail.room_id)
				console.log('订阅用户openid', e.detail.openid)
				console.log('是否订阅', e.detail.is_subscribe)
			},
			// 授权回调
			onLoadFun(res) {
				this.isShowAuth = false;
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
				let that = this
				if (this.stype != 3) {
					setTimeout(function() {
						that.isShowAuth = true
					}, 500)
				} else {
					this.getSubscribeInfo()
				}
			},

		}
	}
</script>

<style lang="scss">
	.uni-popup__wrapper-box {
		width: 90%;
		// height: 90vh;
		padding: 0;
	}
	.popupView{
		width: 100%;
		height: 60vh;
		padding: 0 20rpx;
		border-radius: 20rpx;
		background-color: #D2EDFF;
		overflow: auto;
		.title{
			text-align: center;
			margin: 30rpx 0;
			font-size: 30rpx;
			font-weight: 700;
		}
		// display: flex;
		// flex-direction: column;
		// justify-content: space-around;
	}
	.popupView1{
		width: 100%;
		// height: 86vh;
		padding: 0rpx 20rpx 30rpx;
		border-radius: 20rpx;
		background-color: #D2EDFF;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.title{
			text-align: center;
			margin: 20rpx 0;
			font-size: 30rpx;
			font-weight: 700;
		}
	}
	.del-i {
		margin: 20rpx auto;
		width: 24rpx*2;
		height: 24rpx*2 !important;
	}
	.phb{
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		.phb_top{
			padding: 130rpx 0 0;
			background-image: linear-gradient(#2B1855,#6034C1);
			.phtab{
				width: 60%;
				height: 60rpx;
				margin:0 auto 20rpx;
				border: 1rpx solid #eee;
				border-radius: 50rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				overflow: hidden;
				view{
					width: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					height: 100%;
					&:first-child{
						border-right: 1rpx solid #eee;
					}
				}
				.active{
					background-color: rgba(255,255,255,.6);
				}
			}
			.qian3{
				display: flex;
				justify-content: space-around;
				width: 90%;
				margin: 0 auto;
				view{
					border-radius: 100rpx 100rpx 0 0;
					width: 30%;
					display: flex;
					flex-direction: column;
					align-items: center;
					color: #fff;
					margin-top: 60rpx;
					background-image: linear-gradient(#673CBC,#4A288E,#6034C1);
					image{
						width: 80rpx;
						height: 80rpx;
						border: 4rpx solid #fff;
						border-radius: 50%;
						margin: 20rpx 0;
					}
					.name{
						margin-bottom: 20rpx;
						width: 80%;
						text-align: center;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.top,
					.num{
						font-size: 40rpx;
						font-weight: 700;
						font-style:italic;
					}
				}
				.mtop2{
					order: 1;
				}
				.mtop3{
					order: 3;
				}
				.mtop1{
					margin-top: 0;
					order: 2;
					background-image: linear-gradient(#D749BD,#6034C1);
				}
			}
		}
		.phb_bot{
			padding-top: 20rpx;
			background-color: #6034C1;
			padding-bottom: 200rpx;
			flex: 1;
			.list{
				width: 90%;
				margin: 0 auto;
				border-radius: 20rpx;
				background-color: #44218A;
				view{
					padding: 16rpx 20rpx;
					color: #fff;
					display: flex;
					justify-content: space-between;
					align-items: center;
					image{
						width: 80rpx;
						height: 80rpx;
						border: 4rpx solid #fff;
						border-radius: 50%;
						margin: 0 20rpx;
					}
					.name{
						flex: 1;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.top{
						text-align: center;
						width: 60rpx;
						font-size: 40rpx;
						font-weight: 700;
						font-style:italic;
					}
					.num{
						text-align: center;
						width: 150rpx;
						font-size: 40rpx;
						font-weight: 700;
						font-style:italic;
					}
				}
			}
		}
		.bot_me{
			background-color: #180937;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #fff;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			height: 130rpx;
			padding: 0 20rpx;
			image{
				width: 80rpx;
				height: 80rpx;
				border: 4rpx solid #fff;
				border-radius: 50%;
				margin: 0 20rpx;
			}
			.name{
				flex: 1;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.top{
				text-align: center;
				// width: 60rpx;
				font-size: 40rpx;
				font-weight: 700;
				font-style:italic;
			}
			.num{
				text-align: center;
				width: 150rpx;
				font-size: 40rpx;
				font-weight: 700;
				font-style:italic;
			}
		}
		
	}
	.prize{
		padding: 130rpx 0 100rpx;
		min-height: 100vh;
		background-image: linear-gradient(#2B1855,#6034C1,#6034C1);
		
		
	}
	.prizeItem{
		display: flex;
		width: 100%;
		height: 100rpx;
		margin: 0rpx auto 20rpx;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 10rpx 8rpx rgba(0,0,0,.2);
		
		.top{
			display: flex;
			width: 30%;
			align-items: center;
			justify-content: center;
			height: 100%;
			border-radius: 10rpx;
			background-color: rgba(255,255,255,.7);
			border-right: 2rpx dashed #666;
		}
		.prizeinfo{
			height: 100%;
			background-color: rgba(255,255,255,.7);
			flex:1;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx ;
			image{
				width: 90rpx;
				height: 90rpx;
				// margin-right: 30rpx;
			}
			text{
				text-align: center;
				width: 70%;
				// white-space: nowrap;
				// text-overflow: ellipsis;
				// overflow: hidden;
			}
		}
		// .top1{
		// 	background-image: linear-gradient(#f6d365,#fda085);
		// }
		// .top2{
		// 	background-image: linear-gradient(#bdc2e8,#e6dee9);
		// }
		// .top3{
		// 	background-image: linear-gradient(#c79081,#dfa579);
		// }
	}
	.tab {
		position: absolute;
		top: 20rpx;
		width: 90%;
		left: 50%;
		height: 90rpx;
		border-radius: 50rpx;
		overflow: hidden;
		transform: translateX(-50%);
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #D2EDFF;
		border: 8rpx solid #FFC1F0;
		box-shadow: 0 0 8rpx 4rpx rgba(0, 0, 0, .2);

		view {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 33.3%;
			height: 100%;
			overflow: hidden;
			white-space: nowrap;
			border-radius: 50rpx;
			position: absolute;
			z-index: 100;
			top: 0;
			left: 33.3%;

			
		}
		.left{
			left: 0;
		}
		.right{
			left: 66.6%;
		}
		.move {
			position: absolute;
			top: 0;
			left: 0;
			border: 4rpx solid #fff;
			box-shadow: 0 0 8rpx 4rpx rgba(0, 0, 0, .1);
			background-color: #FA679B;
			transition: all .5s;
		}
		.move1{
			left: 33.3%;
		}
		.move2{
			left: 66.6%;
		}
		.active {
			color: #fff;
			font-size: 28rpx;
			font-weight: 700;
		}
	}

	image {
		width: 100%;
		font-size: 0;
		line-height: 0;
		display: block;
	}

	.bomImg {
		padding-bottom: 50rpx;
	}

	.page-section {
		position: relative;
		z-index: 1;
		width: 100%;
		height: 100vh;
		overflow: hidden;

		&:before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: inherit;
			filter: blur(50rpx);
			z-index: -1;
			margin: -20rpx;
		}


		.name {
			margin-bottom: 40rpx;
			max-width: 80%;
			word-break: break-all
		}

		.time {
			margin-bottom: 80rpx;
			max-width: 80%;
			word-break: break-all;

		}


	}

	.box {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 130rpx;
		font-size: 38rpx;
		color: #fff;
		flex-direction: column;
		background-color: rgba(0, 0, 0, .3);
		overflow: hidden;
		transition: all .4s;

		// .subscribe {
		// margin-bottom: 40rpx;
		// text-align: center;
		// position: relative;
		.shareBtn {
			width: 500rpx;
			height: 82rpx;
			line-height: 82rpx;
			border-radius: 10rpx;
			fontSize: 34rpx;
			color: #FFFFFF;
			background-color: #1698ae;
			position: absolute;
			left: 50%;
			bottom: 130rpx;
			transform: translateX(-50%);
		}

		.goinBtn {
			width: 500rpx;
			height: 82rpx;
			line-height: 82rpx;
			border-radius: 10rpx;
			fontSize: 34rpx;
			color: #FFFFFF;
			background-color: red;
			position: absolute;
			left: 50%;
			bottom: 30rpx;
			transform: translateX(-50%);
		}

		// }
	}

	.showBox {
		bottom: -240rpx;
	}
</style>
