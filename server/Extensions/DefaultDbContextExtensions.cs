using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Extensions {
	public static class DefaultDbContextExtension {
		public static void SeedData(this ModelBuilder modelBuilder) {
			modelBuilder.Entity<User>().HasData(
				new User {
					Id = 1,
					Email = "shopacc.fake@gmail.com",
					Password = BCrypt.Net.BCrypt.HashPassword("admin"),
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
