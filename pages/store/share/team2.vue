<template>
	<!-- 分享推广-我的团队 -->
	<view class="page admin_team">
		<view class="top_body">
			<myhead :title="'我的团队'"></myhead>
			<view class="top_content flex-center">
				<view class="title">{{spreadListTj.promoter_count}}</view>
				<view class="subtitle">{{spreadListTj.tip_promoter_count}}（元）</view>
			</view>
			<view class="tab_body flex-around" style="top: 0;">
				<view class="left tab_item flex-center">
					<text>{{spreadListTj.order_count}}</text>
					<text>{{spreadListTj.tip_order_count}}(元)</text>
				</view>
				<view style="border-left: 1px solid #eee; height: 60px;">
					
				</view>
				<!-- <view class="tab_item flex-center">
					<image src="/static/img/kehu_s.png" mode="aspectFill"></image>
					推荐的用户
				</view> -->
				<view class="right tab_item flex-center">
					<text>{{spreadListTj.in_money}}</text>
					<text>{{spreadListTj.tip_in_money}}(元)</text>
				</view>
			</view>
			<view class="tab-box">
				<view :class="{activeBox:activeBox==1}" @click="changeTab(1)">
					一级
				</view>
				<view :class="{activeBox:activeBox==2}" @click="changeTab(2)">
					二级
				</view>
				<view :class="{activeBox:activeBox==3}" @click="changeTab(3)">
					三级
				</view>
			</view>
		</view>
		<view class="tabs_body2">
			<view class="content_body">
				<view class="customer_list">
					<view v-if="cardList.length!=0">
						<view class="list_item flex-bt" v-for="(item,index) in cardList" :key="index">
							<image class="item_user" :src="item.avatar?item.avatar:image" mode="aspectFill"></image>
							<view class="item_mid flex-center">
								<view class="name clamp">{{item.nickname!=null?item.nickname:'暂未设置'}}
								</view>
								<text class="phone">{{item.phone_star}}</text>
								<text class="grade">注册：{{item.spread_time}}</text>
							</view>
							<image class="item_call" src="/static/img/cus_call.png" @click.stop="phoneCall(item.phone)">
							</image>
						</view>
					</view>
					<view v-else style="text-align: center; margin-top: 100rpx; color: rgb(153, 153, 153);">
						<text>暂无用户</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import myhead from "../../../components/my-components/myhead.vue"
	// import mynull from "../../../components/my-components/mynull.vue"
	import {
		spreadPeople,
		getSpreadListTj
	} from '@/api/user.js';
	export default {
		components: {
			myhead
		},
		data() {
			return {
				spreadListTj:"",
				title: '',
				active: 1,
				cardList: [],
				page: 1,
				limit: 10,
				retCount: 0,
				brokerage_price: '',
				image: '',
				last_look_id: 0,
				cur_look_id: 0,
				page_look_id: 0,
				length: 0,
				activeBox:1
			}
		},
		mounted() {},
		onLoad(options) {
			console.log(options.brokerage_price);
			this.brokerage_price = options.brokerage_price
			this.spreadPeople()
			this.getSpreadListTj()
			this.image = this.$image
			console.log(this.$image);
		},
		onReachBottom: function() {
			console.log("-----到底了-----");
			this.spreadPeople(this.cur_look_id);
		},
		methods: {
			changeTab(type){
				this.activeBox = type
			},
			getSpreadListTj(){
				let data={
					pintai:1,
					type:2
				}
				getSpreadListTj(data).then(res=>{
					this.spreadListTj = res.data
				})
			},
			phoneCall(tel) {
				if (!tel) {
					uni.showToast({
						title: '用户暂未绑定手机',
						icon: 'none',
						duration: 1000
					});
					return;
				}
				uni.makePhoneCall({
					phoneNumber: tel //仅为示例
				});
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			spreadPeople(id) {
				console.log(id);
				let that = this
				let ids = id ? id : 0
				if(ids == that.cur_look_id){
					if(that.length!=0){
						that.page += 1
					}else{
						that.page = that.page
					}
				}else{
					that.page = 1
				}
				let parm = {
					"pintai":1,
					"page": that.page,
					"limit": 10,
					"look_id": ids
				}
				spreadPeople(parm).then(res => {
					let listNew = [];
					let retCount = res.data.count; //获取总数
					that.last_look_id = res.data.last_look_id;
					that.length = res.data.list.length
					if (that.length > 0) {
						if (parm.look_id == that.cur_look_id) {
							listNew = that.cardList.concat(res.data.list);
							that.$set(that, 'cardList', listNew);
							// that.page++
						} else {
							listNew = res.data.list;
							that.$set(that, 'cardList', listNew);
							that.cur_look_id = ids;
							// that.page++
						}
						// that.page++
					} else {
						// that.page=1
						uni.showToast({
							title: '没有内容了',
							icon: 'none',
							duration: 1000
						});
					}

				})

			},
			// 跳转拼团详情页
			toItem(id) {
				uni.navigateTo({
					url: '/pages/users/help/order-item?id=' + id
				});
			}
		}
	}
</script>


<style lang="less" scoped>
	.name {
		display: flex;

	}
	.activeBox{
		background-color: #eee;
	}
	.name_team {
		background-color: #1698AE;
		color: #fff;
		border-radius: 30rpx;
		font-size: 24rpx;
		padding: 4rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.admin_team {
		.top_body {
			position: relative;
			height: 290px;

			.top_content {
				flex-direction: column;

				.title {
					margin-top: -150px;
					font-size: 65px/2;
					font-weight: bold;
					color: #fff;
					z-index: 10;
				}

				.subtitle {
					margin-top: 16px/2;
					font-size: 28px/2;
					color: #fff;
					z-index: 10;

				}

				.users_list {
					z-index: 10;

					image {
						width: 54px/2;
						height: 54px/2;
						margin: 0 15px/2;
						border-radius: 50%;
					}
				}

				.number {
					z-index: 10;
					margin-top: 13px;
					font-size: 24px/2;
					color: #FFFFFF;
				}
			}

			.tab_body {
				background: #FFFFFF;
				box-shadow: 0px 5px/2 6px/2 0px rgba(193, 227, 255, 0.24);
				border-radius: 10px/2;
				width: 690px/2;
				height: 120rpx;
				position: absolute;
				left: 0;
				right: 0;
				margin: 0 auto;
				margin-top: 177px;
				justify-content: space-around;

				.tab_item {
					// width: 100%;
					flex-direction: column;
					font-size: 30px/2;
					font-weight: 500;
					color: #333333;

					image {
						width: 50px/2;
						height: 46px/2;
						margin-bottom: 17px/2;
					}
					text{
						&:last-child{
							font-size: 15px;
							line-height: 30px;
						}
					}
					&.active {
						color: #1698AE;
					}
				}

				.left,
				.right {
					font-size: 24rpx;

					image {
						width: 40rpx;
					}
				}
			}
			.tab-box{
				width: 90%;
				margin: 80rpx auto 0;
				background-color: #fff;
				display: flex;
				overflow: hidden;
				justify-content: center;
				align-items: center;
				border-radius: 15rpx;
				box-shadow: 0px 2.5px 3px 0px rgba(193, 227, 255, 0.24);
				view{
					flex: 1;
					text-align: center;
					padding: 20rpx 0;
					border-right: 1rpx solid #eee;
					&:last-child{
						border: none;
					}
				}
			}

		}

		.tabs_body2 {
			.content_body {
				padding: 0 15px;

				.grade {
					margin-bottom: 5px;
					.red {
						color: #FF2D2D;
					}
				}
			}
		}

	}
</style>
