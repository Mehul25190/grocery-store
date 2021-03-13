import { getLanguage } from '../utils/common';
export const initialState = {
	common: {
		isLoading: false,
		showModal: false,
		categoryData: {},
		categoryOffer: {},

	},
	auth: {
		user: null,
		showIntro: true,
		language: getLanguage(0),
		languageId: 0,
		languageSet: 0,
		mobileno: null,
		deviveryAddress: {}
	},
	subscription: {
		deviveryAddress: {},
		mySubscription: {},
	},
	product: {
		productDetail: {},
		ethnicities: [],
		ethnicitieslisting: [],
		brand: [],
		brandlisting: [],
		fetchwishlist: [],
		similarproduct: [],
		applyfilter: [],
		brandlistingbrand: [],
		ethnicitieslistingbrand: []
	},
	cart: {
		viewCartDetail: {},
		cartDetail: [],
		totalItem: 0,
		totalAmount: 0,
		deliveryCharges: 0,
		actualTotal: 0,
		walletAmount: 0,
	},
};