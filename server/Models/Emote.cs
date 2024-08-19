using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Emotes")]
[Index(nameof(Name), IsUnique = true)]
public class Emote
{
	[Key]
	public int Id { get; set; }
	public required string Name { get; set; }
	public string? Image { get; set; }
}
