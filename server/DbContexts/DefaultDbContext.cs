using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using server.Extensions;
using server.Models;

namespace server.DbContexts
{
	public class DefaultDbContext(DbContextOptions<DefaultDbContext> options) : DbContext(options)
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Damage> Damages { get; set; }
		public DbSet<Champion> Champions { get; set; }
		public DbSet<Pet> Pets { get; set; }
		public DbSet<UnlockedChampion> UnlockedChampions { get; set; }
		public DbSet<Emote> Emotes { get; set; }
		public DbSet<Account> Accounts { get; set; }
		public DbSet<Chroma> Chromas { get; set; }
		public DbSet<Skin> Skins { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();
			modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();

			modelBuilder.Entity<Damage>(entity => {
				entity.HasKey(col => col.Id);

				entity.Property(col => col.Name).HasMaxLength(150).IsRequired();
			});

			modelBuilder.SeedData();
		}
	}
}
