"use client";

import { logout } from "@/actions/logout";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
	const session = useSession();
	const signOutOnClick = () => {
		logout();
	};
	return (
		<div>
			{JSON.stringify(session)}
			<button type='button' onClick={signOutOnClick}>
				Sign out
			</button>
		</div>
	);
};

export default SettingsPage;
