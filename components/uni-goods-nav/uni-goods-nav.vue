<template>
	<view class="uni-goods-nav">
		<!-- 底部占位 -->
		<view class="uni-tab__seat" />
		<view class="uni-tab__cart-box flex">
			<view class="flex uni-tab__cart-sub-left">
				<view v-if="index==0" v-for="(item,index) in options" :key="index"
					class="flex uni-tab__cart-button-left uni-tab__shop-cart" @click="onClick(index,item)">
					<view class="uni-tab__icon">
						<uni-icons :type="item.icon" size="20" color="#646566"></uni-icons>
						<!-- <image class="image" :src="item.icon" mode="widthFix" /> -->
					</view>
					<text class="uni-tab__text">{{ item.text }}</text>
					<view class="flex uni-tab__dot-box">
						<text v-if="item.info" :class="{ 'uni-tab__dots': item.info > 9 }" class="uni-tab__dot " :style="{'backgroundColor':item.infoBackgroundColor?item.infoBackgroundColor:'#ff0000',
						color:item.infoColor?item.infoColor:'#fff'
						}">{{ item.info }}</text>
					</view>
				</view>
				<button open-type="contact" v-if="index==1" v-for="(item,index) in options" :key="index"
					class="flex uni-tab__cart-button-left uni-tab__shop-cart">
					<view class="uni-tab__icon">
						<uni-icons :type="item.icon" size="20" color="#646566"></uni-icons>
						<!-- <image class="image" :src="item.icon" mode="widthFix" /> -->
					</view>
					<text class="uni-tab__text">{{ item.text }}</text>
					<view class="flex uni-tab__dot-box">
						<text v-if="item.info" :class="{ 'uni-tab__dots': item.info > 9 }" class="uni-tab__dot " :style="{'backgroundColor':item.infoBackgroundColor?item.infoBackgroundColor:'#ff0000',
						color:item.infoColor?item.infoColor:'#fff'
						}">{{ item.info }}</text>
					</view>
				</button>
			</view>
			<view :class="{'uni-tab__right':fill}" class="flex uni-tab__cart-sub-right ">

				<button :class="type==2||type==3?'grey':''" v-if="stype==2" type="default" open-type="getPhoneNumber"
					hover-class="none" @getphonenumber="getphonenumber" v-for="(item,index) in buttonGroup" :key="index"
					:style="{backgroundColor:item.backgroundColor,color:item.color}"
					class="flex uni-tab__cart-button-right">
					<text :style="{color:item.color}"
						class="uni-tab__cart-button-right-text">{{text}}</text>
				</button>
				<view :class="type==2||type==3?'grey':''" v-else v-for="(item,index) in buttonGroup" :key="index"
					:style="{backgroundColor:item.backgroundColor,color:item.color}"
					class="flex uni-tab__cart-button-right" @click="buttonClick(index,item)">
					<text :style="{color:item.color}"
						class="uni-tab__cart-button-right-text">{{text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	import {
		mapGetters
	} from "vuex";
	/**
	 * GoodsNav 商品导航
	 * @description 商品加入购物车、立即购买等
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=865
	 * @property {Array} options 组件参数
	 * @property {Array} buttonGroup 组件按钮组参数
	 * @property {Boolean} fill = [true | false] 组件按钮组参数
	 * @event {Function} click 左侧点击事件
	 * @event {Function} buttonClick 右侧按钮组点击事件
	 * @example <uni-goods-nav :fill="true"  options="" buttonGroup="buttonGroup"  @click="" @buttonClick="" />
	 */
	export default {
		name: 'UniGoodsNav',
		components: {
			uniIcons
		},
		computed: mapGetters(['isLogin', 'stype']),
		data(){
			return {
				text:''
			};
		},
		props: {
			type: {
				type: Number,
				default: -1
			},
			order_assist_id: {
				type: Number,
				default: 0
			},
			status: {
				type: Number,
				default: 0
			},
			tip: {
				type: String,
				default: ''
			},
			options: {
				type: Array,
				default () {
					return [{
						icon: 'shop',
						text: '店铺',
					}, {
						icon: 'cart',
						text: '购物车'
					}]
				}
			},
			buttonGroup: {
				type: Array,
				default () {
					return [{
							text: '加入购物车',
							backgroundColor: '#ffa200',
							color: '#fff'
						},
						{
							text: '立即购买',
							backgroundColor: '#ff0000',
							color: '#fff'
						}
					]
				}
			},
			fill: {
				type: Boolean,
				default: false
			}
		},
		updated() {
			this.actBtn()
			console.log(123);
		},
		watch:{
			type(newV,oldV) {
			    this.actBtn()
			    console.log(newV,oldV)
			} 
		},
		mounted() {
			// this.actBtn()
		},
		methods: {
			actBtn(){
				console.log(this.type,'1212');
				switch (this.type) {
					case 0:
						this.text = '发起拼团'
						break;
					case 1:
						this.text = '去参团'
						break;
					case 2:
						this.text = '发起拼团'
						break;
					case 3:
						this.text = '已参团'
						break;
					default:
						this.text = '发起拼团'
				}
			},
			onClick(index, item) {
				this.$emit('click', {
					index,
					content: item,

				})
			},
			getphonenumber(res) {
				this.$emit('getphonenumber', res)
			},
			buttonClick(index, item) {
				// if (uni.report) {
				// 	uni.report(item.text, item.text)
				// }
				let that = this
				if (this.type != 2 && this.type != 3) {
					this.$emit('buttonClick', {
						index,
						content: item
					})
				}else{
					uni.showToast({
						title:that.tip,
						icon:'none'
					})
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-goods-nav {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
	}

	.uni-tab__cart-box {
		flex: 1;
		height: 50px;
		background-color: #fff;
		z-index: 900;
	}

	.uni-tab__cart-sub-left {
		padding: 0 5px;
		flex: 1;
		justify-content: space-around;
	}

	.uni-tab__cart-sub-right {
		flex: 1;
	}

	.uni-tab__right {
		margin: 5px 0;
		margin-right: 10px;
		border-radius: 100px;
		overflow: hidden;

	}

	.uni-tab__cart-button-left {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		// flex: 1;
		position: relative;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 0 10px;
	}

	.uni-tab__icon {
		width: 18px;
		height: 18px;
	}

	.image {
		width: 18px;
		height: 18px;
	}

	.uni-tab__text {
		margin-top: 3px;
		font-size: $uni-font-size-sm;
		color: #646566;
	}

	.uni-tab__cart-button-right {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1;
		justify-content: center;
		align-items: center;
		border-radius: 0;
	}

	.uni-tab__cart-button-right-text {
		font-size: $uni-font-size-base;
		color: #fff;
	}

	.uni-tab__cart-button-right:active {
		opacity: 0.7;
	}

	.uni-tab__dot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		position: absolute;
		right: -2px;
		top: 2px;
		justify-content: center;
		align-items: center;
		// width: 0;
		// height: 0;
	}

	.uni-tab__dot {
		// width: 30rpx;
		// height: 30rpx;
		padding: 0 4px;
		line-height: 15px;
		color: #ffffff;
		text-align: center;
		font-size: 12px;
		background-color: #ff0000;
		border-radius: 15px;
	}

	.uni-tab__dots {
		padding: 0 4px;
		// width: auto;
		border-radius: 15px;
	}

	.uni-tab__color-y {
		background-color: #ffa200;
	}

	.uni-tab__color-r {
		background-color: #ff0000;
	}
</style>
