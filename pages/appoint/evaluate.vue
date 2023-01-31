<template>
	<!-- 我的-预约订单-评价 -->
	<view class="page me_evaluate">
		<view class="title">本次订单已完成</view>
		<view class="subtitle">请对本产品进行评价</view>
		<view class="rate_block">
			<view class="rate_row flex-bt">
				<text class="name">效果</text>
				<uni-rate :value="value" :margin="margin" :is-fill="false" @change="onChange" />
			</view>
			<view class="rate_row flex-bt">
				<text class="name">专业</text>
				<uni-rate :value="value2" :margin="margin" :is-fill="false" @change="onChange2" />
			</view>
			<view class="rate_row flex-bt">
				<text class="name">服务</text>
				<uni-rate :value="value3" :margin="margin" :is-fill="false" @change="onChange3" />
			</view>
		</view>
		<view class="else">
			<view class="else_title">其他建议</view>
			<textarea v-model="mark" placeholder="请客观的评价本次服务情况" placeholder-class="placeholder" />
		</view>
		<view class="upload_block">
			<view class="upload_title">上传照片（{{imgs.length}}/6）</view>
			<view class="upload_row">
				<view class="img_block" v-for="(item,index) in imgs" :key='index'>
					<image class="upload-img" :src="item" mode="aspectFill"></image>
					<image @click="deleteImg(index)" class="i-j" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/jian.png"
						mode="widthFix"></image>
				</view>
				<view v-if="imgs.length<6" class="img_block flex-center" @click="chooseImg()">
					<image class="i-add" src="https://yfl-public.oss-cn-shenzhen.aliyuncs.com/img/bank-add2.png"
						mode="widthFix"></image>
					<view class="text">上传图片</view>
				</view>
			</view>

		</view>
		<button type="default" class="btn flex-center" @click="submit()">确 认</button>
	</view>
</template>

<script>
	import {
		getYuOrderPl
	} from '@/api/store.js'
	export default {
		components: {},
		data() {
			return {
				value: 4,
				value2: 4,
				value3: 4,
				margin: 10,
				order_id: '',
				mark: '',
				imgs: []
			}
		},
		mounted() {

		},
		onLoad(option) {
			this.order_id = option.order_id
		},
		methods: {
			submit() {
				let data = {
					order_id: this.order_id,
					rate_1: this.value,
					rate_2: this.value2,
					rate_3: this.value3,
					mark: this.mark,
					imgs: this.imgs
				}
				getYuOrderPl(data).then(res => {
					uni.navigateBack({
						delta: 1
					})
				})
			},
			deleteImg(index){
				this.imgs.splice(index, 1); 
			},
			chooseImg() {
				let that = this
				uni.chooseImage({
					success(res) {
						that.imgs = that.imgs.concat(res.tempFilePaths)
					}
				})
			},
			// 效果评分
			onChange(e) {
				console.log('效果:', e)
			},
			// 专业评分
			onChange2(e) {
				console.log('专业:', e)
			},
			// 服务评分
			onChange3(e) {
				console.log('服务:', e)
			}
		}
	}
</script>

<style lang="less" scoped>
	.me_evaluate {
		background: #fff;
		margin-top: 10px;
		padding: 0 68px/2;
		padding-bottom: 80px;

		.title {
			padding-top: 130px/2;
			font-size: 24px;
			text-align: center;
			font-weight: bold;
			color: #333333;
			line-height: 40px;
		}

		.subtitle {
			text-align: center;
			font-size: 16px;
			font-weight: 500;
			color: #333333;
			line-height: 40px;
			opacity: 0.5;
			padding-bottom: 81px/2;
		}

		.rate_block {
			.rate_row {
				padding-bottom: 50px/2;

				.name {
					font-size: 15px;
					font-family: PingFang SC;
					color: #333333;
				}
			}

		}

		.else {
			.else_title {
				font-size: 18px;
				font-weight: bold;
				color: #333333;
				line-height: 40px;
			}

			textarea {
				width: 100%;
				box-sizing: border-box;
				height: 100px;
				background: #F5F6F7;
				border-radius: 5px;
				font-size: 13px;
				font-weight: 500;
				color: #B6C2CE;
				padding: 23px/2 25px/2;
			}

			.placeholder {
				font-size: 13px;
				font-weight: 500;
				color: #B6C2CE;
			}
		}

		.upload_block {
			padding-bottom: 83px/2;

			.upload_title {
				margin: 31px 0 35px/2;
				font-size: 16px;
				color: #000000;
				line-height: 33px/2;
			}

			.upload_row {
				display: flex;
				flex-wrap: wrap;

				.img_block {
					position: relative;
					margin-right: 11px;
					border-radius: 5px;

					.upload-img {
						width: 148px/2;
						height: 148px/2;
					}

					.i-j {
						position: absolute;
						top: -6.5px;
						right: -6.5px;
						width: 15px;
						height: 15px;
					}

					&:last-child {
						width: 148px/2;
						height: 148px/2;
						flex-direction: column;
						display: flex;
						background: #F1F1F1;

						.i-add {
							width: 45px/2;
							height: 45px/2;
						}

						.text {
							font-size: 11px;
							color: #999999;
							margin-top: 13px/2;
						}
					}
				}
			}
		}

		.btn {
			width: 100%;
			height: 102px/2;
			background: #1698AE;
			border-radius: 5px;
			font-size: 16px;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
