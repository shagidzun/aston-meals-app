import { REMOTE_STORE } from "../remote-config";

let userSignIn;
let userSignUp;
let getFavorites;
let updateFavorites;
let getHistory;
let updateHistory;

if (REMOTE_STORE === "firebase") {
	import("./user/userSlice").then(module => {
		userSignIn = module.userSignIn;
		userSignUp = module.userSignUp;
	});
	import("./favorites/favoritesSlice").then(module => {
		getFavorites = module.getFavorites;
		updateFavorites = module.updateFavorites;
	});
	import("./history/historySlice").then(module => {
		getHistory = module.getHistory;
		updateHistory = module.updateHistory;
	});
} else {
	import("./user/userSlice").then(module => {
		userSignIn = module.userSignInLS;
		userSignUp = module.userSignUpLS;
	});
	import("./favorites/favoritesSlice").then(module => {
		getFavorites = module.getFavoritesLS;
		updateFavorites = module.updateFavoritesLS;
	});
	import("./history/historySlice").then(module => {
		getHistory = module.getHistoryLS;
		updateHistory = module.updateHistoryLS;
	});
}

export {
	userSignIn,
	userSignUp,
	getFavorites,
	updateFavorites,
	getHistory,
	updateHistory
};
