import { getRequest } from '~/config/axiosConfig.js';

export const search = async (options) => {
    const { tickets, customers, payments, value } = options;

    let url = `search/${value}?getTickets=${tickets || false}&getCustomers=${
        customers || false
    }&getPayments=${payments || false}`;

    try {
        const response = await getRequest(url);
        return response;
    } catch (error) {
        return error.response;
    }
};
