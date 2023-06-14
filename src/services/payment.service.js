import { getRequest, postRequest } from '~/config/axiosConfig.js';
import { addSortAndFilters } from '~/utils/helper.js';

export const getPayments = async (options) => {
    const { page, limit, sort, filter } = options;

    let url = `payments?page=${page}&limit=${limit}`;
    url += addSortAndFilters(sort, filter);

    try {
        const response = await getRequest(url);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getPaymentById = async (id) => {
    try {
        const response = await getRequest(`payments/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const createPayment = async (options) => {
    try {
        const response = await postRequest(`payments`, options);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getWeeklyPaymentCount = async (options) => {
    const { page, limit, sort, filter } = options;
    let url = `payments/week-count?page=${page}&limit=${limit}`;
    url += addSortAndFilters(sort, filter);

    try {
        const response = await getRequest(url);
        return response;
    } catch (error) {
        return error.response;
    }
};
