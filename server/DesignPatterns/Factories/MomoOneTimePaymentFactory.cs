using System.Text;
using Newtonsoft.Json;
using server.DesignPatterns.Factories.Abstract;
using server.Dtos.Payment;
using server.Dtos.Payment.Momo;

namespace server.DesignPatterns.Factories {
  public class MomoOneTimePaymentFactory(string accessKey, string secretKey, string partnerCode, string? storeId = null, string? storeName = null): IPaymentFactory
  {
		private readonly string API_ENDPOINT_URL = "https://test-payment.momo.vn/v2/gateway/api/create";

		public async Task<InitPaymentResponse> CreatePaymentAsync(string orderId, string orderDescription, long amount)
		{
			using var httpClient = new HttpClient();

			OneTimePaymentRequest request = new() {
				PartnerCode = partnerCode,
				StoreId = storeId,
				StoreName = storeName,
				Amount = amount,
				IpnUrl = "https://example.com/momo_ip",
				OrderId = orderId,
				RedirectUrl = "https://momo.vn/",
				RequestType = "captureWallet",
				OrderInfo = orderDescription,
				RequestId = Guid.NewGuid().ToString(),
				ExtraData = GetEncodedBase64ExtraData(GetDefaultExtraData())
			};
			request.CreateSignature(secretKey, accessKey);
			string json = JsonConvert.SerializeObject(request, Formatting.Indented,
																								new JsonSerializerSettings {
																									DefaultValueHandling = DefaultValueHandling.Ignore,
																									NullValueHandling = NullValueHandling.Ignore
																								});
			StringContent httpContent = new(json, Encoding.UTF8, "application/json");
			var apiResponse = await httpClient.PostAsync(API_ENDPOINT_URL, httpContent);
			InitPaymentResponse response = new() {
				Message = string.Empty,
				OrderId = orderId
			};

			try {
				//Handle response status
				apiResponse.EnsureSuccessStatusCode();

				OneTimePaymentResponse? oneTimePaymentResponse = await apiResponse.Content.ReadFromJsonAsync<OneTimePaymentResponse>();

				if(oneTimePaymentResponse != null) {
					response.Message = "Created Momo payment successfully";

					response.PayUrl = oneTimePaymentResponse.PayUrl;
					response.QrCodeUrl = oneTimePaymentResponse.QrCodeUrl;
					response.TransactionId = oneTimePaymentResponse.RequestId;
				}
				else {
					response.Message = $"Cannot parse json to {nameof(OneTimePaymentRequest)} class when receiving reponse from Momo API server";
				}
			} catch(Exception e) {
				//Catch an exception if http status code is not 2xx
				response.Message = "An error when calling to Momo API server";
				//Log the exception
				Console.WriteLine(await apiResponse.Content.ReadAsStringAsync());
			}
			return response;
		}

		private static string GetEncodedBase64ExtraData(Dictionary<string, string> extraData) {
			string data = extraData.Count > 0 ? JsonConvert.SerializeObject(extraData) : "";
			byte[] bytes = Encoding.UTF8.GetBytes(data);
			return Convert.ToBase64String(bytes);
		}

		private static Dictionary<string, string> GetDefaultExtraData() {
			return [];
		}
  }
}
