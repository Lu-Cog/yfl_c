<template>
	<!-- 圈子 详情-->
	<view class="page circle_item">
		<view style="font-size: 0;">
			<image class="user-bg" :src="item" mode="widthFix" v-for="(item,index) in imgList" :key='index'>
			</image>
		</view>
		<view class="content_block">
			<view class="content">
				<!-- <view class="content_item">
					{{detailInfo.title}}
				</view> -->
				<view class="content_item">
					{{detailInfo.content}}
				</view>
			</view>
			<view class="content_row flex-bt">
				<text class="time">{{detailInfo.used_time}}</text>
				<view class="zan_blcok flex-center" @click="clickPraiseComment(detailInfo.article_id,1)">
					<image
						:src="detailInfo.status===1?'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/zan_s.png':'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/zan.png'"
						mode="widthFix"></image>
					<text>{{detailInfo.visit}}</text>
				</view>
			</view>
		</view>
		<view class="comment_block">
			<view class="top_blcok flex-bt">
				<view class="title">网友评论</view>
				<view class="right_blcok flex-center">
					<image src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/duanxin.png" mode="widthFix">
					</image>{{commentList.length}}
				</view>
			</view>
			<view class="hr" style="margin: 18px 0 15px;"></view>
			<view class="comment_row">
				<image class="i-pan" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/pan.png" mode="widthFix">
				</image>
				<input @click="clickComment()" type="text" v-model="contentNow" placeholder="我要评论"
					placeholder-class="placeholder" />
			</view>
		</view>
		<view class="comment_list">
			<five-mul-commentlist :commentList="commentList" @clickPraise="clickPraiseComment"
				@clickDelete="clickDeleteComment" @clickDeleteChild="clickDeleteCommentChild"
				@clickRecomment="clickRecomment" @clickRecommentChild="clickRecommentChild"></five-mul-commentlist>
			<five-comment ref="detailComment" @sendComment="sendComment" :placeholder="placeholder"></five-comment>
			<!-- <view class="list_item" v-for="(item,index) in commentList" :key="index">
				<image class="user-img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg" mode="aspectFill"></image>
				<view class="right_blcok">
					<view class="name clamp">我是谁我是谁我是谁我是谁我是谁我是谁我是谁我是谁我是谁我是谁我是谁我是谁我是谁</view>
					<view class="content">哇，恢复的很好哦！</view>
					<view class="time">
						9分钟前&nbsp;·<text>12回复</text>
					</view>
					<view class="bubble_block" v-if="item.bubble===1">
						<view class="bubble">
							<text class="name">我是谁（作者）：</text><text class="content">继续坚持使用一周效果会更好！ </text>
						</view>
					</view>
				</view>
				<view class="zan_blcok flex-center">
					<image :src="item.state===1?'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/zan_s.png':'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/zan.png'" mode="widthFix"></image><text>3.4万</text>
				</view>
			</view> -->
		</view>

	</view>
</template>

<script>
	import dateUtils from '@/common/utils/dateUtils.js';
	import {
		mapGetters
	} from "vuex";
	import {
		getPList,
		getPAdd,
		getArticleDetail,
		getArticleZan
	} from '@/api/api.js'
	export default {
		computed: mapGetters(['isLogin', 'store_id']),
		data() {
			return {
				isVisible: true,
				article_id: '', //路径传递id
				id: 0,
				contentNow: '',
				detailInfo: {},
				commentList: [],
				//评论组件相关
				placeholder: '请输入评论内容...',
				imgList: []
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			this.article_id = option.id;
			this.getPList()
			this.getArticleDetail()
		},
		mounted() {

		},
		methods: {
			getArticleDetail() {
				getArticleDetail(this.article_id).then(res => {
					this.detailInfo = res.data
					this.imgList = res.data.image_input.split(',')
				})
			},
			getPList() {
				let data = {
					article_id: this.article_id,
					page: 1,
					limit: 10
				}
				getPList(data).then(res => {
					this.commentList = res.data.list
				})
			},
			/**
			 * 格式化发布日期
			 * @param {Object} dateString
			 */
			formateDate(dateString) {
				dateString = parseInt(dateString);
				let date = new Date(dateString);
				let formatStr = dateUtils.dateFormat('YYYY年mm月dd日 HH:MM:SS', date);
				return formatStr;
			},

			/**
			 * 回复问题
			 */
			clickComment() {
				this.placeholder = "请输入评论内容..."
				this.$refs.detailComment.open();
			},

			/**
			 *  查看图片大图
			 * @param {Object} images
			 * @param {Object} index
			 */
			cliclImage(images, index) {
				uni.previewImage({
					urls: images,
					current: index,
					longPressActions: {
						itemColor: '#12B368',
						success: function(data) {},
						fail: function(err) {}
					}
				});
			},

			/**
			 * 点赞多级评论
			 * @param {Object} item
			 */
			clickPraiseComment(id, type) {
				if (this.isLogin) {
					getArticleZan(id, type).then(res => {
						this.getPList()
						this.getArticleDetail()
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '你还未登录，是否跳转到授权页？',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/wallet/index'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}

				//只能点赞不能取消
				// let praiseParam = 1;
				// let praiseNum = parseInt(this.commentList[index].PRAISE_NUM);
				// switch (this.commentList[index].IS_PRAISE) {
				// 	case 0:
				// 		praiseParam = 1;
				// 		praiseNum++;
				// 		break;
				// 	case 1:
				// 		praiseParam = 0;
				// 		praiseNum--;
				// 		break;
				// }
				// this.commentList[index].IS_PRAISE = praiseParam;
				// this.commentList[index].PRAISE_NUM = praiseNum--;

				// console.log(item, index);
				// if (item.IS_PRAISE == 1) {
				// 	return;
				// }
				// this.commentList[index].IS_PRAISE = 1;
				// this.commentList[index].PRAISE_NUM++;
			},
			/**
			 * 删除多级评论
			 */
			clickDeleteComment(item) {
				uni.showModal({
					title: '提示',
					content: '确定要删除评论吗？',
					confirmColor: '#12B368',
					success: function(res) {
						/* 调用接口删除 */
					}
				});
			},
			/**
			 * 删除多级子评论
			 */
			clickDeleteCommentChild(item) {
				uni.showModal({
					title: '提示',
					content: '确定要删除评论吗？',
					confirmColor: '#12B368',
					success: function(res) {
						/* 调用接口删除 */
					}
				});
			},

			/**
			 * 回复 评论
			 * @param {Object} item
			 */
			clickRecomment(item) {
				this.id = item
				this.$refs.detailComment.open();
				// this.placeholder = '回复' + item.FIRSTNICKNAME + ':';
			},
			/**
			 * 回复评论的评论
			 * @param {Object} item
			 */
			clickRecommentChild(item) {
				this.id = item
				this.$refs.detailComment.open();
				// this.placeholder = '回复' + item.FIRSTNICKNAME + ':';
			},

			/**
			 * 发送评论
			 * @param {Object} result
			 */
			sendComment(result) {
				if (this.isLogin) {
					let data = {
						id: this.id,
						note: result
					}
					getPAdd(this.article_id, data).then(res => {
						this.getPList()
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '你还未登录，是否跳转到授权页？',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/wallet/index'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}


				// let date = new Date()
				// let item = {
				// 	COMMENT_TIME: '2020-07-07 14:30:01',
				// 	FIRSTNICKNAME: '网友45',
				// 	CHILD_ANWSER_LIST: [],
				// 	IS_PRAISE: 0,
				// 	PRAISE_NUM: 0,
				// 	CANDELETE: 1,
				// 	HEADIMGURL: 'http://img4.imgtn.bdimg.com/it/u=2858424520,3197172862&fm=11&gp=0.jpg',
				// 	SECONDNICKNAME: null
				// }
				// item.COMMENT_TIME = this.formateDate(date.getTime())
				// item.COMMENT = result;
				// this.commentList[0].CHILD_ANWSER_LIST.push(item);
			}
		}
	}
</script>

<style lang="less" scoped>
	.circle_item {
		.user-bg {
			width: 100%;
			// height: 752px/2;
			// margin-bottom: 10px;
		}

		// 气泡对话框样式
		.bubble {
			position: relative;
			margin-top: 18px;
			width: 100%;
			background: #F0F0F0;
			padding: 34px/2 10px;
			box-sizing: border-box;

			text {
				font-size: 12px;
				color: #363636;
			}

			.name {
				color: #AAAAAA;
			}

			&:after {
				content: '';
				position: absolute;
				top: -26px;
				left: 18px;
				width: 1px;
				height: 5px;
				border-width: 8px;
				border-style: solid;
				border-color: transparent;
				margin-bottom: -6px;
				border-bottom-width: 15px;
				border-bottom-color: currentColor;
				color: #f0f0f0;
			}
		}

		.zan_blcok {
			image {
				width: 15px;
				height: 15px;
				margin-left: 5px;
			}

			text {
				font-size: 23px/2;
				line-height: 23px/2;
				font-family: SourceHanSansCN;
				font-weight: 300;
				color: #848484;
				margin-left: 13px/2;
			}
		}

		.content_block {
			padding: 15px;
			background: #fff;

			.content {
				.content_item {
					font-size: 13px;
					font-weight: 500;
					color: #333333;
					margin-bottom: 10px;
				}
			}

			.content_row {
				.time {
					font-size: 14px;
					color: #999999;
				}

				.zan_blcok {
					justify-content: flex-end;
				}

			}

		}

		.comment_block {
			background-color: #fff;
			margin-top: 10px;
			padding: 43px/2 10px;

			.top_blcok {
				.title {
					font-size: 14px;
					font-weight: 500;
					color: #333333;
				}

				.right_blcok {
					font-size: 23px/2;
					font-weight: 500;
					color: #848484;

					image {
						width: 15px;
						height: 15px;
						margin-right: 6px;
					}
				}
			}

			.comment_row {
				display: flex;
				align-items: center;

				.i-pan {
					flex-basis: 56px/2;
					flex-grow: 0;
					flex-shrink: 0;
					height: 25px;
					margin-left: 15px/2;
				}

				input {
					flex: 1;
					border-radius: 2px;
					height: 70px/2;
					font-size: 14px;
					font-weight: 500;
					color: #AEAEAE;
					margin-left: 15px/2;
					background: rgba(225, 225, 225, 0.42);
					padding: 0 38px/2;
				}

				.placeholder {
					font-size: 14px;
					font-weight: 500;
					color: #AEAEAE;
				}
			}

		}

		.comment_list {
			margin-top: 2px;
			background: #fff;
			padding: 0 10px;
			// padding-top: 63px/2;

			.list_item {
				position: relative;
				display: flex;
				padding-bottom: 30px;
				padding-right: 60px;

				.user-img {
					flex-basis: 36px;
					flex-grow: 0;
					flex-shrink: 0;
					height: 36px;
					border-radius: 50%;
					margin-right: 12px;
				}

				.right_blcok {
					.name {
						font-size: 15px;
						line-height: 15px;
						height: 15px;
						font-weight: 500;
						color: #000000;
					}

					.content {
						margin: 8px 0;
						font-size: 13px;
						line-height: 13px;
						color: #363636;
					}

					.time {
						font-size: 11px;
						color: #9D9D9D;

						text {
							display: inline-block;
							text-align: center;
							width: 103px/2;
							height: 15px;
							line-height: 15px;
							background: rgba(191, 191, 191, 0.28);
							border-radius: 15px/2;
							margin-left: 10px;
						}
					}
				}

				.zan_blcok {
					position: absolute;
					right: 0;
					top: 0;
				}
			}
		}

	}
</style>
