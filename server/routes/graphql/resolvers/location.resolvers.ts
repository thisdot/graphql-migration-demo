import { get, getAll } from "@models/location";
import { getByLocation } from "@models/dotter";
import { Resolvers } from "types/graphql";

export const LocationResolvers: Resolvers = {
	Location: {
		dotters: async ({ id }) => {
			const dotters = await getByLocation(Number(id));
			return dotters;
		},
	},
	Query: {
		locations: async (_, { pagination }) => {
			const page = pagination?.page ?? 1;
			const perPage = pagination?.page ?? 8;
			const { locations, count } = await getAll({
				perPage,
				page,
			});

			return {
				nodes: locations,
				pagination: {
					page,
					perPage,
					total: count,
					totalPages: Math.ceil(count / perPage),
				},
			};
		},
		location: async (_, { id }) => {
			const location = await get(Number(id));
			return location;
		},
	},
};