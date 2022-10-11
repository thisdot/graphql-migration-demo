import { Dotter, PrismaClient } from "@prisma/client";
import { ValidationError } from "@utils/errors";

const prisma = new PrismaClient();

export const destroy = async (id: number): Promise<Dotter | null> => {
	if (isNaN(id)) {
		throw new ValidationError("Invalid identifier");
	}

	const dotter = await prisma.dotter.delete({
		where: {
			id: Number(id),
		},
	});

	return dotter;
};
