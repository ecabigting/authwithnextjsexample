import { db } from "@/lib/db";
import { LoginSchema } from "@/schemas";

export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({ where: { email } });
		return user;
	} catch (e) {
		return e;
	}
};

export const getUserByID = async (id: string) => {
	try {
		const user = await db.user.findUnique({ where: { id } });
		return user;
	} catch (e) {
		return e;
	}
};
