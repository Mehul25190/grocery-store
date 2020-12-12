export default {
  // apiBaseUrl: 'http://pushpanathan.com/services/',
  //apiBaseUrl:'http://dev.tieskills.com/foodapp/services/',
  //imageURL: 'http://dev.tieskills.com/foodapp',
  apiBaseUrl: 'https://dev.myallaadin.com/services/',
  imageURL: 'https://dev.myallaadin.com',
  signin: 'user/login',
  signup: 'user/register',
  signupVerifyMobile: 'user/verifyMobile',
  loginVerifyMobile: 'user/verifyOTP',
  signinMobile:'user/login',
  categoryList:'item/fetchCategory',
  productList:'item/fetchItemList',
  saveUserProfile:'user/saveUserProfileDetails',
  cityList:'user/fetchCityList',
  areaList:'user/fetchAreaList',
  saveUserAddress:'user/saveUserAddress',
  //showUserDeliveryAddress:'user/fetchUserAddress',
  showUserProfile:'user/fetchUserProfileDetails',
  fetchEthnicityList:'adminSettings/fetchEthnicityList',
  mySubscriptionList: 'order/fetchMySubscriptions',
  getItemDetail: 'item/getItemById',
  getDeviveryAddress: 'user/fetchUserAddress',
  saveSubscribeOrderDetails: 'order/saveSubscribeOrderDetails',
  pauseResumeSubscription: 'order/pauseResumeSubscription',
  deleteSubscription: 'order/deleteSubscription',
  fetchSubCategory: 'item/fetchSubCategory',
  searchItem: 'item/searchItem',
  fetchOffersOnLandingPage: 'offer/fetchOffersOnLandingPage',
  //getUserOrderList:'order/fetchOrderList',
  getUserOrderList:'order/fetchMyOrders',
  cancelOrder:'order/cancelOrder',
  returnOrder:'order/returnOrderItem',
  getOrderDetailById:'order/fetchOrderDetailsById',
  fetchSubscriptionDtlsById: 'order/fetchSubscriptionDtlsById',
  viewCart: 'userCart/viewCart',
  updateCartItem: 'userCart/updateCartItemQty',
  deleteCartItem: 'userCart/deleteCartItem',
  addToCartItem: 'userCart/addToCart',
  getAvailableTimeSlots: 'adminSettings/getAvailableTimeSlots',
  fetchDeliveryCharges: 'adminSettings/fetchDeliveryCharges',
  placeOrder: 'userCart/placeOrder',
  fetchSubscriptionCharges: 'adminSettings/fetchSubscriptionFees',
  fetchCardDetails: 'userCardDetails/fetchCardDetails',
  deleteCard: 'userCardDetails/deleteCard',
  orderReturn: 'order/returnOrderItem',
  fetchUserWallet: 'userWallet/fetchWalletActivity',
  rechargeWallet: 'userWallet/rechargeWallet',
  checkActiveSubscription: 'order/checkActiveSubscription',
  saveItemRatings:'item/saveItemRatings',
  applyUserOffer : 'offer/applyUserOffer',
  updateDeliverySlot: 'order/updateDeliverySlot',
  fetchOrderItemsCount:'order/fetchOrderItemsCount',
  fetchItemsByOffer: 'offer/fetchItemsByOffer',
  fetchUserOffer:'offer/fetchOffersOnLandingPage',
}
