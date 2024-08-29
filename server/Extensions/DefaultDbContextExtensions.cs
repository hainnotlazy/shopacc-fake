using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Extensions
{
	public static class DefaultDbContextExtension
	{
		public static void SeedData(this ModelBuilder modelBuilder, IConfiguration configuration)
		{
			// #pragma warning disable CS8600
			// string runningMode = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
			// string envFileName =
			// 	runningMode == "Development" ? "appsettings.Development.json" : "appsettings.json";

			// IConfigurationRoot configuration = new ConfigurationBuilder()
			// 	.AddJsonFile(envFileName)
			// 	.AddEnvironmentVariables()
			// 	.Build();
			modelBuilder
				.Entity<User>()
				.HasData(
					new User
					{
						Id = 1,
						Email = "shopacc.fake@gmail.com",
						Password = BCrypt.Net.BCrypt.HashPassword(
							configuration.GetValue<string>("AppSettings:AppKey")
						),
						Username = "admin",
						IsAdmin = true,
						UseDarkMode = false,
						EmailVerificationCode = 0,
						IsEmailVerified = true
					}
				);
		}
	}
}
