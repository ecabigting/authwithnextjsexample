import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "NextJS Auth V5",
	description: "example using NextJS Auth V5",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html lang='en' suppressHydrationWarning={true}>
				<body className={inter.className} suppressHydrationWarning={true}>
					{children}
				</body>
			</html>
		</SessionProvider>
	);
}
