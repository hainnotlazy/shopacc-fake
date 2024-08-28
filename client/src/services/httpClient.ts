import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ICookiesService, IHttpClient } from "./interfaces";
import { ErrorResponse } from "@/core/responses";
import cookiesService, { AuthTokenType } from "./cookies.service";

class HttpClient implements IHttpClient {
	private readonly ACCESS_TOKEN: string;
	private readonly REFRESH_TOKEN: string;
	private readonly DEFAULT_ERROR_MESSAGE = "Unexpected error happened. Please try again later.";

	constructor(private readonly cookiesService: ICookiesService) {
		this.ACCESS_TOKEN = this.cookiesService.getToken(AuthTokenType.ACCESS_TOKEN) ?? "";
		this.REFRESH_TOKEN = this.cookiesService.getToken(AuthTokenType.REFRESH_TOKEN) ?? "";
	}

	async get<T>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
		options = {
			...options,
			headers: {
				Authorization: `Bearer ${this.ACCESS_TOKEN}`,
			},
		};
		const response = await axios.get<T>(url, options);
		return response.data;
	}

	async post<T>(url: string, payload: unknown, options: AxiosRequestConfig = {}): Promise<T> {
		options = {
			...options,
			headers: {
				Authorization: `Bearer ${this.ACCESS_TOKEN}`,
			},
		};
		const response = await axios.post<T>(url, payload, options);
		return response.data;
	}

	async put<T>(url: string, payload: unknown, options: AxiosRequestConfig = {}): Promise<T> {
		options = {
			...options,
			headers: {
				Authorization: `Bearer ${this.ACCESS_TOKEN}`,
			},
		};
		const response = await axios.put<T>(url, payload, options);
		return response.data;
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

		try {
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
		} catch {
			return {
				status: 500,
				message: this.DEFAULT_ERROR_MESSAGE,
			};
		}
	}
}

const httpClient = new HttpClient(cookiesService);
export default httpClient;
