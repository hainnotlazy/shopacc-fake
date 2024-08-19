using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Pets")]
[Index(nameof(Name), IsUnique = true)]
public class Pet
{
	[Key]
	public int Id { get; set; }
	public required string Name { get; set; }
	public string? Image { get; set; }
}
