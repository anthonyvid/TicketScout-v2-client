import { postRequest } from '~/config/axiosConfig.js';
import { planTypes } from '~/constants/client.constants.js';

export const createCheckoutSession = async (planType, email) => {
    if (planType === planTypes.BASIC) return;

    try {
        const response = await postRequest('auth/create-checkout-session', {
            planType,
            email
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const checkoutSuccess = async (session_id) => {
    try {
        const response = await postRequest(
            `auth/checkout/success?session_id=${session_id}`
        );
        return response;
    } catch (error) {
        return error.response;
    }
};
