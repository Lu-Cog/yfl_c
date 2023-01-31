<template>
	<!-- 圈子 首页-->
	<view class="page circle_index">
		<view class="circle_list flex-bt">
			<view v-if="circleList.length==0" style="text-align: center;width: 100%; margin-top: 100rpx; color: rgb(153, 153, 153);">
				<text>暂无内容</text>
			</view>
			<view v-else class="list_item" v-for="(item,index) in circleList" :key="index" @click="toItem(item.article_id)">
				<view class="image_block">
					<image class="img-main" :src="item.image_input"
						mode="aspectFill"></image>
					<!-- <image class="img-sm" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user2.jpg"
						mode="aspectFill"></image> -->
				</view>
				<view class="content_body">
					<view class="title_block flex-bt">
						<view class="left_block flex-center">
							<image class="user-img" :src="item.image_author"
								mode="aspectFill"></image><text class="name">{{item.author}}</text>
						</view>
						<text class="right_blcok">{{item.create_time}}</text>
					</view>
					<view class="text_blcok clamp2">{{item.content}}</view>
					
					<view class="zan_blcok flex-center" @click="checksta(item.article_id,1)">
						<!-- item.state===1 点赞状态。 ===0 没点赞状态 -->
						<image
							:src="item.status===1?'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/zan_s.png':'https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/zan.png'"
							mode="widthFix"></image><text>{{item.visit}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- <image class="i-ps" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/ps.png" mode="widthFix"  @click="toRelease()"></image> -->
	</view>
</template>

<script>
	import {
		getArticleLst,
		getArticleZan
	} from '@/api/api.js'
	import {
		mapGetters
	} from "vuex";
	export default {
		computed: mapGetters(['isLogin', 'store_id']),
		onLoad() {
			this.getArticleLst()
		},
		onShow() {
			this.getArticleLst()
		},
		data() {
			return {
				circleList: []
			}
		},
		mounted() {

		},
		methods: {
			checksta(id,type){
				getArticleZan(id,type).then(res=>{
					this.getArticleLst()
				})
			},
			getArticleLst() {
				let data = {
					store_id : this.store_id,
					page: 1,
					limit: 10
				}
				getArticleLst(data).then(res => {
					this.circleList = res.data.list
				})
			},
			toItem(id) {
				uni.navigateTo({
					url: "/pages/circle/item?id=" + id
				})
			},
			toRelease(id) {
				uni.navigateTo({
					// url: "/pages/circle/release"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.circle_index {
		.i-ps {
			width: 45px;
			height: 45px;
			position: fixed;
			right: 15px;
			bottom: 15px;
		}

		.circle_list {
			flex-wrap: wrap;
			padding: 10px;

			.list_item {
				width: 49%;
				background: #fff;
				margin-bottom: 10px;
				border-radius: 4px;

				.image_block {
					width: 100%;
					height: 200px;
					position: relative;

					.img-main {
						width: 100%;
						height: 200px;
						border-radius: 4px 4px 0px 0px;
					}

					.img-sm {
						position: absolute;
						right: 0;
						bottom: 0;
						width: 40%;
						height: 40%;
					}
				}

				.content_body {
					padding: 12px;

					.title_block {
						.left_block {
							height: 43.7px/2;

							.user-img {
								width: 43.7px/2;
								height: 43.7px/2;
								border-radius: 50%;
							}

							.name {
								flex: 1;
								height: 43.7px/2;
								line-height: 43.7px/2;
								font-size: 12px;
								font-weight: bold;
								color: #232323;
								margin-left: 5px;
								overflow: hidden;
								display: inline-block;
							}
						}

						.right_blcok {
							height: 43.7px/2;
							line-height: 43.7px/2;
							flex-grow: 0;
							flex-shrink: 0;
							font-size: 12px;
							margin-left: 5px;
							color: #848484;
						}
					}

					.text_blcok {
						margin-top: 21px/2;
						font-size: 14px;
						font-weight: 500;
						color: #232323;
						line-height: 43px/2;
						height: 43px;
					}

					.zan_blcok {
						justify-content: flex-end;

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
				}
			}
		}
	}
</style>
