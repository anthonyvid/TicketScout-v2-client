import { useQuery } from "react-query";
import { getTickets } from "services/ticket.service.js";
import { handleError } from "utils/helper.js";

const useTickets = (key) => {
	const data = useQuery(
		["tickets", key.page],
		() =>
			getTickets({
				page: key.page + 1,
				limit: key.pageSize,
			}),
		{
			keepPreviousData: true,
			staleTime: 60000, // milliseconds
			onError: (err) => handleError(err),
		}
	);
	data.tickets = data?.data?.data?.results || [];
	data.total = data?.data?.data?.total || 0;

	return data;
};
export default useTickets;
