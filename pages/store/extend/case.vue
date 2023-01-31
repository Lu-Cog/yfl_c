<template>
	<!-- 推广文案-成功案例 -->
	<view class="page extend_case">
		<view class="card_block" v-for="(item,index) in cardList">
			<view class="banner-img">
				<image :src="item.img" mode="aspectFill"></image>
			</view>
			<view class="card_content flex-bt">
				<view class="card_left">
					<!-- 没有标签的时候 加 no-badge -->
					<view class="title clamp2">{{item.name}}</view>
					<view class="time">时间：2021-01-01</view>
				</view>
				<view class="card_right flex-center">
					<button hover-class="none" class="del flex-center" type="default">删除</button>
					<button hover-class="none" class="edit flex-center" type="default" @click="goto('/pages/form/case-edit')">编辑</button>
				</view>
			</view>
		</view>
		<image class="add-btn" src="/static/img/jiahao.png" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				cardList: [{
					id: 1,
					img: "/static/img/index_banner.jpg",
					state: 0,
					name: "补水护理(一般就是只清洁、补水、上面膜、头、 肩、颈按摩)",
					number: 100,
					rate: "40%",
					price: "160.00",
					dow: "28"
				}, {
					id: 2,
					img: "/static/img/index_banner.jpg",
					state: 1,
					name: "补水护理222",
					number: 100,
					rate: "50%",
					price: "160.00",
					dow: "28"
				}]
			}
		},
		mounted() {

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
	.extend_case {
		padding: 10px 15px;

		.add-btn {
			width: 119px/2;
			height: 119px/2;
			position: fixed;
			right: 5px;
			bottom: 70px;
		}

		.card_block {
box-shadow: 0px 5px/2 6px/2 0px rgba(193, 227, 255, 0.24);
			.flex-row {
				padding: 14px 0;
			}

			.banner-img {
				image {
					border-radius: 5px 5px 0px 0px;
					width: 690px/2;
					height: 290px/2;
				}
			}

			.card_content {
				padding: 10px;

				.title {
					position: relative;
				}

				.time {
					font-size: 24px/2;
					color: #999999;
					margin-top: 37px/2;
				}

				.price_block {
					font-size: 24px/2;
					color: #666666;
				}

				.card_right {
					flex-direction: column;
margin-left: 10px;
					button {
						width: 145px/2;
						height: 58px/2;
						border-radius: 24px/2;
						font-weight: 500;
						font-size: 28px/2;
						border: 1px solid #1698AE;

						&.del {
							color: #1698AE;
							margin-bottom: 42px/2;
						}

						&.edit {
							background: #1698AE;
							color: #fff;
						}
					}
				}
			}

		}
	}
</style>
