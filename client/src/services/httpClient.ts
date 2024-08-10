import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { IHttpClient } from "./interfaces";
import { ErrorResponse } from "@/core/responses";

class HttpClient implements IHttpClient {
	private readonly DEFAULT_ERROR_MESSAGE = "Unexpected error happened. Please try again later.";

	async get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
		const response = await axios.get<T>(url, options);
		return response.data;
	}
	async post<T>(url: string, payload: unknown, options?: AxiosRequestConfig): Promise<T> {
		const response = await axios.post<T>(url, payload, options);
		return response.data;
	}
	put<T>(url: string, data: unknown): Promise<T> {
		throw new Error("Method not implemented.");
	}
	delete<T>(url: string): Promise<T> {
		throw new Error("Method not implemented.");
	}

	getErrorResponse(error: unknown): {
		status: number;
		message: string;
	} {
		if (!(error instanceof AxiosError)) {
			return {
				status: 500,
				message: this.DEFAULT_ERROR_MESSAGE,
			};
		}

		const response = error.response as AxiosResponse<ErrorResponse>;

		if (response && response.data && typeof response.data.errors === "object") {
			const errors = response.data.errors;

			for (const key of Object.keys(errors)) {
				if (typeof errors[key] === "string") {
					return {
						status: response.data.status,
						message: errors[key],
					};
				}

				return {
					status: response.data.status,
					message: errors[key][0],
				};
			}
		}

		return {
			status: response.data.status,
			message: this.DEFAULT_ERROR_MESSAGE,
		};
	}
}

const httpClient = new HttpClient();
export default httpClient;
