using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.DbContexts;
using server.Services;
using server.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

/**
* Add services to the container.
* Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
*/
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/** Configure DbContext */
builder.Services.AddDbContext<DefaultDbContext>(options =>
{
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

/** Configure JWT */
var jwtSecret = builder.Configuration.GetValue<string>("JwtBearer:SecretKey");
var jwtSecretBytes = System.Text.Encoding.UTF8.GetBytes(jwtSecret);

builder.Services
	.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(options =>
	{
		options.TokenValidationParameters = new()
		{
			ValidateIssuer = false,
			ValidateAudience = false,
			ValidateIssuerSigningKey = true,
			IssuerSigningKey = new SymmetricSecurityKey(jwtSecretBytes),
		};
	});

/** Configure Services */
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
