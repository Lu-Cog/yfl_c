<template>
	<view class="page form_body">
		<form @submit="formSubmit" report-submit='true'>
			<view class="block">
				<view class="uni-form-item hr_shadow">
					<view class="title">项目标题</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='title' type="text" :value="store_name" placeholder="请填写项目标题"/>
					</view>
					
				</view>
				
				<view class="uni-form-item hr_shadow">
					<view class="title">选择项目类型</view>
					<picker @change="stateChange" :value="cate_id" :range="stateArr" range-key="title">
						<view class="uni-input">{{stateArr[cate_id].title}}</view>
					</picker>
				</view>
				
				<view class="uni-form-item hr_shadow">
					<view class="title">售价（元）</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='price' type="text" :value="price" placeholder="请填写售价（元）"/>
					</view>
				</view>
					
				<view class="uni-form-item hr_shadow">
					<view class="title">市场价（元）</view>
					<view class="right_block flex-center">
						<input style="text-align: right;" name='ot_price' type="text" :value="ot_price" placeholder="请填写市场价（元）"/>
					</view>
				</view>
				
				<view class="uni-form-item hr_shadow">
					<view class="title">添加封面图</view>
					<view class="right_block flex-center" @click="addimg">
						<image class="i-add" :src="image ? image:'/static/img/i-add.png'" mode="widthFix"></image>
					</view>
				</view>
				
				
				<view class="uni-form-item" style="height: 300rpx;">
					<textarea :value="content" placeholder="填写文字介绍信息" name="content" />
				</view>
				
				<view class="uni-form-item hr_shadow" >
					<view class="title">
						<input style="border: 2rpx solid #e4e4e4; width: 100rpx; padding-left: 10rpx;" type="text" name='sort' :value="sort" placeholder="排序"/>
					</view>
					<view class="right_block flex-center" style="justify-content: space-around; width: 400rpx;">
						<text>热门</text>
						<evan-switch size="16" @change='onChagne' v-model="is_hot"></evan-switch>
						<text>促销</text>
						<evan-switch size="16" @change='onChagne1' v-model="is_benefit"></evan-switch>
					</view>
				</view>	
			</view>
			<button hover-class="none"  class="submit_btn flex-center" form-type="submit">保存</button>
		</form>
		
	</view>
</template>

<script>
	import {
		postEditProject,
		getProjectInfo,
		getProjectCategory
	} from '@/api/store.js';
	export default {
		onLoad(options) {
			this.mer_id = options.mer_id
			this.project_id = options.project_id
			uni.setNavigationBarTitle({
				title: this.project_id==0 ? '添加项目' : '编辑项目'
			})
			if(this.project_id>0){
				this.getProjectInfo()
			}
			this.getProjectCategory()
		},
		data() {
			return {
				is_hot:true,
				is_benefit:true,
				store_name:'',
				cate_id:0,
				stateArr:[],
				price:'',
				ot_price:'',
				content:'',
				image:'',
				sort:255,
				mer_id:0,
				project_id:0,
				status:0
			};
		},
		methods:{
			onChagne(e) {
				console.log(e)
				this.is_hot = e
			},
			onChagne1(e){
				console.log(e)
				this.is_benefit = e
			},
			addimg(){
				var that = this
				// var arr = [that.image]
				// uni.previewImage({
				// 	urls:arr
				// })
				that.$util.uploadImageOne('upload/image', function (res) {
				  that.image=res.data.path;
				});
			},
			stateChange(e){
				console.log(Number(e.detail.value))
				this.cate_id = Number(e.detail.value)
			},
			getProjectCategory(){
				let that = this
				getProjectCategory().then(res=>{
					that.stateArr = res.data
				})
			},
			getProjectInfo(){
				let that = this
				getProjectInfo(that.mer_id,that.project_id).then(res=>{
					that.store_name=res.data.store_name
					that.price = Number(res.data.price)
					that.cate_id = res.data.cate_id
					that.ot_price =Number(res.data.ot_price)
					that.image = res.data.image
					that.content = res.data.content
					that.sort = res.data.sort
					that.is_hot = res.data.is_hot
					that.is_benefit = res.data.is_benefit
				})
			},
			formSubmit: function(e) {
				let that = this,
					value = e.detail.value;
					
				if (!value.title) return that.$util.Tips({
					title: '请填写项目标题'
				});
				if (!value.price) return that.$util.Tips({
					title: '请填写售价'
				});
				if (!value.ot_price) return that.$util.Tips({
					title: '请填写市场价'
				});
				
				value.image = that.image
				if (!value.image) return that.$util.Tips({
					title: '请填上传封面图'
				});
				if (!value.sort) return that.$util.Tips({
					title: '请填写排序'
				});
				value.is_hot = that.is_hot
				value.is_benefit = that.is_benefit
				value.cate_id = that.cate_id
				value.status = that.status
				uni.showLoading({
					title: '保存中',
					mask: true
				})
				postEditProject(that.mer_id,that.project_id,value).then(res =>{
					if(that.project_id==0){
						that.$util.Tips({
							title: '添加成功',
							icon: 'success'
						});
					}else{
						that.$util.Tips({
							title: '修改成功',
							icon: 'success'
						});
					} 
					setTimeout(function() {
						uni.navigateBack()
						// uni.navigateTo({
						// 	url: '/pages/store/admin/project?mer_id=' + that.mer_id
						// });
					}, 1000);
				}).catch(err => {
					return that.$util.Tips({
						title: err
					});
				})
				
			},
		}
	}
</script>

<style  lang="less" scoped>
		.block {
			background-color: #eee;
			// margin-bottom: 0;
			// padding-bottom: 107rpx;
			
			.uni-form-item{
				border-top: 1rpx solid #eee;
				background-color: #fff;
				margin-top: 0;
				.i-add{
					max-height: 100rpx;
				}
				textarea{
					width: 800rpx;
					margin: 40rpx 0;
					border: 1rpx solid #eee;
				}
			}
			.flexD{
				flex-direction: column; 
				height: 200rpx; 
				align-items: flex-start;
				justify-content: space-around;
				>view{
					display: flex;
					justify-content: space-between;
					width: 100%;
				}
			}
		}
		.submit_btn {
			margin-bottom: 166rpx;
			width: 60%;
		}
</style>
