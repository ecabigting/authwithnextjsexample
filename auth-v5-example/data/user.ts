import { db } from "@/lib/db";
import { User } from "@prisma/client";
export const getUserByEmail = async (email: string): Promise<User | any> => {
	try {
		const user = (await db.user.findUnique({ where: { email } })) as User;
		return user;
	} catch (e) {
		return e;
	}
};

export const getUserByID = async (id: string): Promise<User | any> => {
	try {
		const user = await db.user.findUnique({ where: { id } });
		return user;
	} catch (e) {
		return e;
	}
};
