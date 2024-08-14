export interface User {
	id: number;
	username: string;
	password?: string;
	email: string;
	emailVerificationCode?: number;
	isEmailVerified: boolean;
	nextEmailVerificationTime: Date | null;
}
