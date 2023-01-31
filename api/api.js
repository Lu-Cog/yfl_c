import request from "@/utils/request.js";
/**
 * 公共接口 ，优惠券接口 , 行业此讯 , 手机号码注册
 * 
*/

/**
 * 获取主页数据 无需授权
*/
export function getIndexData()
{

  let uTypeId = getApp().globalData.userTypeId;
  return request.get("common/home/"+uTypeId,{},{ noAuth : true});
}

/**
 * 获取登录授权login
 * 
*/
export function getLogo()
{
  return request.get('wechat/get_logo', {}, { noAuth : true});
}


/**
 * 保存form_id
 * @param string formId 
 */
export function setFormId(formId) {
  return request.post("wechat/set_form_id", { formId: formId});
}

/**
 * 分享二维码
 */
export function getMerQrcode(id,data) {
  return request.get('store/merchant/qrcode/'+id, data, { noAuth: true });
}

/**
 * 领取优惠卷
 * @param int couponId
 * 
*/
export function setCouponReceive(couponId){
  return request.post('coupon/receive/'+couponId);
}
/**
 * 商品优惠券列表
 * @param object data
*/
export function getCoupons(data){
	
  let uTypeId = getApp().globalData.userTypeId;
  return request.get('coupon/product/'+uTypeId,data,{ noAuth : true})
}

/**
 * 商铺优惠券列表
 * @param object data
*/
export function getShopCoupons(id){
  let uTypeId = getApp().globalData.userTypeId;
  return request.get('coupon/store/'+id+'/'+uTypeId, {}, { noAuth : true})
}

/**
 * 我的优惠券
 * @param int types 0全部  1未使用 2已使用
*/
export function getUserCoupons(data){
  return request.get('coupon/list',data)
}

/**
 * 文章分类列表
 * 
*/
export function getArticleCategoryList(){
  return request.get('article/category/lst',{},{noAuth:true})
}

/**
 * 文章列表
 * @param int cid
 * 
*/
export function getArticleList(cid,data){
  return request.get('article/lst/' + cid, data,{noAuth:true})
}

/**
 * 文章 热门列表
 * 
*/
export function getArticleHotList(){
  return request.get('article/hot/list',{},{noAuth:true});
}

/**
 * 文章 轮播列表
 * 
*/
export function getArticleBannerList(){
  return request.get('article/banner/list',{},{noAuth:true})
}

/**
 * 文章详情
 * @param int id 
 * 
*/
export function getArticleDetails(id){
  return request.get('article/detail/'+id,{},{noAuth:true});
}

/**
 * 手机号+验证码登录接口
 * @param object data
*/
export function loginMobile(data){
  return request.post('login/mobile',data,{noAuth:true})
}

/**
 * 获取短信KEY
 * @param object phone
*/
export function verifyCode(){
  return request.get('verify_code', {},{noAuth:true})
}

/**
 * 验证码发送
 * @param object phone
*/
export function registerVerify(phone, reset, key, code){
  return request.post('register/verify', { phone: phone, type: reset === undefined ? 'reset' : reset, key: key, code: code },{noAuth:true})
}

/**
 * 手机号注册
 * @param object data
 * 
*/
export function phoneRegister(data){
  return request.post('register',data,{noAuth:true});
}

/**
 * 手机号修改密码
 * @param object data
 * 
*/
export function phoneRegisterReset(data){
  return request.post('register/reset',data,{noAuth:true})
}

/**
 * 手机号+密码登录
 * @param object data
 * 
*/
export function phoneLogin(data){
  return request.post('login',data,{noAuth:true})
}

/**
 * 切换H5登录
 * @param object data
*/


/*
 * h5切换公众号登陆
 * */

export function switchH5Login(data) {
  return request.post("user/switch", data);
}


/**
 * 绑定手机号
 * 
*/
export function bindingPhone(data){
  return request.post('user/binding',data);
}

/**
 * 退出登錄
 * 
*/
export function logout(){
  return request.get('logout');
}

/**
 * 获取订阅消息id
 */
export function getTemlIds()
{
  return request.get('wechat/teml_ids', {}, { noAuth:true});
}

/**
 * 首页拼团数据
 */
export function pink()
{
  return request.get('pink', {}, { noAuth:true});
}

/**
 * 获取城市信息
 */
export function getCity() {
  return request.get('system/city/lst', { }, { noAuth: true });
}

/**
 * 获取小程序直播列表
 */
export function getLiveList(page,limit) {
  return request.get('wechat/live', { page, limit}, { noAuth: true });
}

/**
 * 获取评论列表
 */
export function getPList(data) {
  return request.get('article/cases/pllst', data, { noAuth: true });
}

/**
 * 添加评论
 */
export function getPAdd(id,data) {
  return request.post('article/cases/pladd/'+id,data);
}

/**
 * 文章列表
 */
export function getArticleLst(data) {
  return request.get('article/cases/lst',data,{noAuth:true});
}
/**
 * 文章详情
 */
export function getArticleDetail(id) {
  return request.get('article/cases/detail/'+id,{},{noAuth:true});
}

/**
 * 文章评论点赞
 */
export function getArticleZan(id,type) {
  return request.get('article/cases/zan/'+id+'/'+type,{},{noAuth:true});
}

/**
 * 预约列表
 */
export function getYuList(id) {
  return request.get('store/product/yylist/'+id,{},{noAuth:true});
}

/**
 * 
 */
export function getSubscribeInfo(data) {
  return request.get('broadcast/subscribe_info',data,{noAuth:true});
}


export function getHelpList(data) {
  return request.get('broadcast/help_list',data,{noAuth:true});
}


/**
 * 
 */
export function getSubscribe(data) {
  return request.get('broadcast/subscribe',data,{noAuth:true});
}



