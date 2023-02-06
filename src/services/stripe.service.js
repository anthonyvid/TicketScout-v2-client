import { postRequest } from "config/axiosConfig.js";
import { paymentIds, planTypes } from "constants/register.constants.js";

export const createCheckoutSession = async (subscriptionType) => {
	if (subscriptionType === planTypes.BASIC) return;

	try {
		const response = await postRequest("auth/create-checkout-session", {
			subscriptionType,
		});
		return response;
	} catch (error) {
		return error.response;
	}
};
