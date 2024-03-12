"use client";

import { FaSignOutAlt, FaUser } from "react-icons/fa";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";

export const UserButton = () => {
	const user = useCurrentUser();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user?.image || ""} />
					<AvatarFallback className='bg-gray-500'>
						<FaUser className='text-white' />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-40' align='center'>
				<LogoutButton>
					<LogoutButton>
						<DropdownMenuItem>
							<FaSignOutAlt className='size-4 mr-4' />
							Logout
						</DropdownMenuItem>
					</LogoutButton>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
