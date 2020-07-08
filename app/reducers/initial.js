import { getLanguage } from '../utils/common';
export const initialState = {
	common:{
		isLoading: false,
		showModal: false,
		categoryData:{},
		categoryOffer:{},
		
	},
	auth:{
		user: null,
		showIntro: true,
		language:getLanguage(0),
		languageId:0,
		languageSet:0,
		mobileno:null,
		deviveryAddress: {}
	},
	subscription: {
		deviveryAddress: {},
		mySubscription: {},
	},
	product: {
		productDetail: {},
	},
	cart: {
		viewCartDetail: {},
		cartDetail: {},
		totalItem: 0,
		totalAmount: 0,
		deliveryCharges: 0,
		actualTotal: 0,
	},
};