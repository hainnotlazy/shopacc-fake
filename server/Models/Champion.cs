using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Champions")]
[Index(nameof(Name), IsUnique = true)]
public class Champion
{
	[Key]
	public int Id { get; set; }
	public required string Name { get; set; }
	public string? Image { get; set; }
}
