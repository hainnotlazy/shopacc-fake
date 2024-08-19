using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Damages")]
[Index(nameof(Name), IsUnique = true)]
public class Damage
{
	[Key]
	public int Id { get; set; }
	public required string Name { get; set; }
	public string? Image { get; set; }
}
