import { AxiosRequestConfig } from "axios";

export interface IHttpClient {
	get<T>(url: string, options?: AxiosRequestConfig): Promise<T>;
	post<T>(url: string, data: unknown, options?: AxiosRequestConfig): Promise<T>;
	put<T>(url: string, data: unknown): Promise<T>;
	delete<T>(url: string): Promise<T>;

	getErrorResponse(error: unknown): {
		status: number;
		message: string;
	};
}
