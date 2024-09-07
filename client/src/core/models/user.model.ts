export interface User {
	id: number;
	username: string;
	password?: string;
	fullname: string;
	bio: string;
	balance: number;
	avatar: string;
	email: string;
	emailVerificationCode?: number;
	isEmailVerified: boolean;
	nextEmailVerificationTime: Date | null;
	useDarkMode: boolean;
	isAdmin: boolean;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}
