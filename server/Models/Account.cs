using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using server.Enums;

namespace server.Models;

[Table("Account")]
[Index(nameof(Username), IsUnique = true)]
public class Account
{
	[Key]
	public required string Id { get; set; }
	public required string Username { get; set; }
	public required string Password { get; set; }
	public required string Email { get; set; }
	public required int Level { get; set; }
	public required int RiotPoints { get; set; }
	public required int BlueEssence { get; set; }
	public required string IngameName { get ;set; }
	public required RankedAccount CurrentRank { get; set; }
	public string? PreviewImage { get; set; }
}
