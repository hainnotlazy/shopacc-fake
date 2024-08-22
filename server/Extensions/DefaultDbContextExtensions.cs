using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Extensions {
	public static class DefaultDbContextExtension {
		public static void SeedData(this ModelBuilder modelBuilder) {
			IConfigurationRoot configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json")
																																	 .AddEnvironmentVariables()
																																	 .Build();

			modelBuilder.Entity<User>().HasData(
				new User {
					Id = 1,
					Email = "shopacc.fake@gmail.com",
					Password = BCrypt.Net.BCrypt.HashPassword(configuration.GetValue<string>("AppSettings:AppKey")),
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
