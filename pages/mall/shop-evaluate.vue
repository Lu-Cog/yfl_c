<template>
	<!-- 商城 店铺评价 -->
	<view class="page mall_shop-evaluate">
		<view class="top_body flex-bt">
			<image class="shop-img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg" mode="aspectFill"></image>
			<view class="right_blcok">
				<view class="flex-row  flex-bt">
					<text class="number">评分&nbsp;4.5分</text>
					<uni-rate size="18" :margin="margin" :color="color" :activeColor="activeColor" :readonly="true" :value="4" />
				</view>
				<view class="flex-row flex-bt">
					<view class="evaluate flex-center">好评&nbsp;0</view>
					<view class="evaluate flex-center">中评&nbsp;0</view>
					<view class="evaluate flex-center">差评&nbsp;0</view>
				</view>
			</view>
			<view class="all_evaluate" v-if="false">
				共0个评价
			</view>
		</view>
		<view class="no" v-if="plList.length<=0">
			暂无评论
		</view>
		<view class="evaluate_list" v-else>
			<view class="list_item">
				<view class="top_body flex-bt">
					<image class="shop-img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg" mode="aspectFill"></image>
					<view class="right_blcok">
						<view class="name clamp">
							用户名字用户名字用户名字用户名字用户名字用户名字用户名字用户名字
						</view>
						<view class="flex-row  flex-bt">
							<text class="number">4.5分</text>
							<uni-rate size="16" :margin="margin" :color="color" :activeColor="activeColor" :readonly="true" :value="4" />
						</view>
					</view>
					<view class="all_evaluate">
						2019-07-03
					</view>
				</view>
				<view class="text_blcok">
					<view>
						面部年轻化的治疗方式是呈阶梯状的，比如用超声刀，热拉提，都是初级的改善松垂的方法。
					</view>
					<view>
						线雕的提升效果与维持时间都强于超声刀，对超声刀效果不满意的小伙伴通常会选择线雕，为了维持效果定期补线就可以了。</view>
				</view>
			</view>
			<view class="list_item">
				<view class="top_body flex-bt">
					<image class="shop-img" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/user.jpg" mode="aspectFill"></image>
					<view class="right_blcok">
						<view class="name clamp">
							用户名字用户名字用户名字用户名字用户名字用户名字用户名字用户名字
						</view>
						<view class="flex-row  flex-bt">
							<text class="number">4.5分</text>
							<uni-rate size="16" :margin="margin" :color="color" :activeColor="activeColor" :readonly="true" :value="4" />
						</view>
					</view>
					<view class="all_evaluate">
						2019-07-03
					</view>
				</view>
				<view class="text_blcok">
					<view>
						面部年轻化的治疗方式是呈阶梯状的，比如用超声刀，热拉提，都是初级的改善松垂的方法。
					</view>
					<view>
						线雕的提升效果与维持时间都强于超声刀，对超声刀效果不满意的小伙伴通常会选择线雕，为了维持效果定期补线就可以了。</view>
				</view>
			</view>

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
				color: '#d5d5d5', //未选中状态的星星颜色
				activeColor: "#FF9800", //选中状态的星星颜色
				margin: "5" ,//星星间隔
				plList:[]
			}
		},
		watch: {

		},

		methods: {

		}
	}
</script>

<style lang="less">
	.no{
		margin-top: 300rpx;
		color: #999;
		text-align: center;
	}
	.mall_shop-evaluate {
		.top_body {
			justify-content: flex-start;
			position: relative;
			padding: 34px/2 26px/2;
			padding-bottom: 52px/2;
			background: #fff;

			.shop-img {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				margin-right: 8px;
			}

			.flex-row {
				&:first-child {
					margin-bottom: 22px/2;
					justify-content: flex-start;
				}

				.number {
					font-size: 16px;
					font-weight: bold;
					color: #000000;
					margin-right: 13px/2;
				}

				.evaluate {
					width: 126px/2;
					height: 24px;
					border: 1px solid #BFBFBF;
					border-radius: 12px;
					font-size: 12px;
					color: #333333;
					margin-right: 32px;

					&:last-child {
						margin-right: 0;
					}
				}

			}

			.all_evaluate {
				position: absolute;
				top: 20px;
				right: 13px;
				font-size: 12px;
				color: #999999;
			}
		}

		.evaluate_list {
			margin-top: 10px;

			.top_body {
				padding-bottom: 0;
			}

			.list_item {
				background-color: #fff;
				margin-bottom: 1px;

				.top_body {
					.shop-img {
						flex-basis: 36px;
						flex-grow: 0;
						flex-shrink: 0;
						height: 36px;
					}

					.right_blcok {
						.name {
							width: 200px;
							flex-grow: 0;
							flex-shrink: 0;
							font-size: 14px;
							font-weight: bold;
							color: #333333;
						}

						.number {
							font-size: 14px;
						}

						.flex-row {
							justify-content: flex-start;
						}
					}
				}

				.text_blcok {
					padding: 15px;

					view {
						font-size: 14px;
						color: #333333;
						line-height: 20px;
						margin-bottom: 10px;

						&:last-child {
							margin-bottom: 0;
						}
					}
				}
			}
		}
	}
</style>
