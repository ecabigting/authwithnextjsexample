"use server";

import { signOut } from "@/auth";

export const logout = async () => {
	// TODO : Server cleanups/actions we need to do before logging out
	await signOut();
};
