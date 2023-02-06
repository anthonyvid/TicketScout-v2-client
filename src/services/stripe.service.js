import { postRequest } from "config/axiosConfig.js";
import { paymentIds, planType } from "constants/register.constants.js";

export const createCheckoutSession = async (subscriptionType) => {
	if (subscriptionType === planType.BASIC) return;

	try {
		const response = await postRequest("auth/create-checkout-session", {
			subscriptionType,
		});
		return response;
	} catch (error) {
		return error.response;
	}
};
