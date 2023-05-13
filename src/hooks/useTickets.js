import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getTickets } from "services/ticket.service.js";
import { socket } from "socket.js";

const useTickets = (key) => {
	const queryClient = useQueryClient();
	const QUERY_KEY = ["tickets", key];

	const cachedData = useQuery(
		QUERY_KEY,
		() =>
			getTickets({
				page: key.page + 1,
				limit: key.pageSize,
			}),
		{
			keepPreviousData: true,
		}
	);
	cachedData.tickets = cachedData?.data?.data?.results || [];
	cachedData.total = cachedData?.data?.data?.total || 0;

	useEffect(() => {
		socket.on("new-ticket", (data) => {
			let { ticket } = data;

			ticket.incomingWS = true; // This is what allows the new ticket to have a UI effect when its added
			queryClient.setQueryData(QUERY_KEY, (existingData) => {
				const tickets = existingData?.data?.results;
				const total = existingData?.data?.total;

				if (total > 24) tickets.pop(); // Remove the oldest ticket so we can keep the 25 ticket size when adding the new one
				const newTickets = [ticket, ...tickets];
				const newTotal = total + 1;

				const newData = existingData;
				existingData.data.results = newTickets;
				existingData.data.total = newTotal;
				return newData;
			});
		});
		return () => {
			socket.off("new-ticket");
		};
	}, []);

	useEffect(() => {
		socket.on("update-ticket", (newData) => {
			let { id, data } = newData;

			// Update the ticket in cache
			queryClient.setQueryData(QUERY_KEY, (existingData) => {
				const newData = existingData;
				const tickets = [...newData?.data?.results];
				const index = tickets.findIndex((obj) => obj.ticketId == id);
				tickets[index] = {
					...tickets[index],
					...data,
					updatedAt: new Date().toISOString(),
				};
				newData.data.results = tickets;
				return newData;
			});
		});
		return () => {
			socket.off("update-ticket");
		};
	}, []);

	useEffect(() => {
		socket.on("delete-ticket", (data) => {
			let { ids } = data;

			// Update the ticket in cache
			queryClient.setQueryData(QUERY_KEY, (existingData) => {
				const newData = existingData;
				const tickets = [...newData?.data?.results];

				const newTickets = tickets.filter(
					(obj) => !ids.includes(obj.ticketId)
				);

				newData.data.results = newTickets;
				newData.data.total -= ids.length;
				return newData;
			});
		});
		return () => {
			socket.off("delete-ticket");
		};
	}, []);

	return cachedData;
};

export default useTickets;
