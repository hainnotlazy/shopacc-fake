export interface ErrorResponse {
	status: number;
	title: string;
	errors: {
		[key: string]: string | string[];
	};
}
