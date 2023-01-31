<template>
	<view>
		<view class="item" v-if="false">
			<view class="center">
				暂无商品
			</view>
		</view>
		<view class="nav" v-else>
			<view class="nav-left">
				<scroll-view scroll-y :style="'height:'+height+'px'">
					<view class="nav-left-item" v-for="(item,index) in categoryList" @click="categoryClickMain(item,index)" :key="index"
					 :style="index==defaultActive?'color:'+activeTextColor+';background-color:'+activeBackgroundColor:''">
						{{item.cate_name}}
					</view>
				</scroll-view>
			</view>
			<view class="nav-right">
				<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
					<view class="nav-right-item" v-for="(item,index2) in subCategoryList" :key="index2" @click="categoryClickSub(item)">
						<view class="img_box flex-center">
							<image :src="item.image" mode="aspectFill" />
						</view>
						<view class="goods_box">
							<view class="goods_name clamp2">{{item.store_name}}</view>
							<!-- <text class="goods_tag" v-if="item.zhekou">{{item.zhekou}}</text> -->
							<view class="goods_price">
								¥{{item.price}}-{{item.ot_price}}
							</view>
						</view>
						<!-- <image class="goods_add" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/add.png" mode="widthFix"></image> -->
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "category",
		data() {
			return {
				height: 0,
				scrollTop: 0,
				scrollHeight: 0,
				activeStyle: {
					color: this.activeTextColor,
					backgroundColor: this.activeBackgroundColor
				}
			}
		},
		props: {
			//主分类激活索引
			defaultActive: {
				type: Number,
				default: 0
			},
			//主分类List
			categoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			//侧边分类List
			subCategoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			activeTextColor: {
				type: String,
				default: '#1698ae'
			},
			activeBackgroundColor: {
				type: String,
				// default: '#e5e5e5'
			},
			label: {
				type: String,
				default: 'name'
			},
			imgSrc: {
				type: String,
				default: 'logo'
			},
			//主分类点击事件
			categoryMainClick: {},
			//子分类点击事件
			categorySubClick: {}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(category, index) {
				this.$emit('categoryMainClick', category,index)
				this.scrollTop = -this.scrollHeight * index;
			},
			categoryClickSub(category) {
				this.$emit('categorySubClick', category)
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: res => {
					this.height = res.screenHeight;
				}
			})
		},
		watch: {
			subCategoryList(newValue, oldValue) {

			}
		},
	}
</script>

<style lang="less" scoped>
	.item {
	
		.center {
			text-align: center;
			margin-top: 200rpx;
			color: #999999;
		}
	}
	.nav {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	.nav-left {
		width: 29%;
		background: #fff;
	}

	.nav-left-item {
		height: 50px;
		// border-right: solid 1px #E0E0E0;
		// border-bottom: solid 1px #E0E0E0;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 70%;
		padding-top: 11px;

		.nav-right-item {
			background: #fff;
			display: flex;
			margin-bottom: 3px;
			padding: 32px/2 17px/2;
			padding-right: 15px;
			position: relative;

			.img_box {
				width: 198px/2;
				height: 194px/2;

				image {
					width: 198px/2;
					height: 194px/2;
				}
			}

			.goods_box {
				padding-top: 9px/2;
				padding-left: 16px/2;

				.goods_name {
					font-size: 26px/2;
					font-weight: bold;
					color: #333333;
					height: 56px/2;
					line-height:14px;
					margin-bottom: 17px/2;
				}

				.goods_tag {
					padding: 5px/2 5px;
					border: 1px solid #FF5061;
					font-size: 24px/2;
					color: #FF5061;
				}

				.goods_price {
					font-size: 26px/2;
					font-weight: bold;
					color: #F7302A;
					margin-top: 40px/2;

					.old_price {
						font-size: 24px/2;
						text-decoration: line-through;
						color: #BFBDBD;
						margin-left: 27px/2;
					}
				}
			}

			.goods_add {
				position: absolute;
				bottom: 20px;
				right: 29px/2;
				width: 24px;
				height: 24px;
			}
		}
	}

	/* 	.nav-right-item {
		width: 100%;
		height: 100px;
		float: left;
		text-align: center;
		padding: 5px;
		font-size: 13px;
	}

	.nav-right-item image {
		width: 50px;
		height: 50px;
	}

	.active {
		color: #F24544;
	}

	.padding {
		height: var(--status-bar-height);
		width: 100%;
		top: 0;
		position: fixed;
		background-color: #F24544;
	}
 */
</style>
