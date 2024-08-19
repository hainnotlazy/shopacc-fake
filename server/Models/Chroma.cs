using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Chromas")]
[Index(nameof(Name), IsUnique = true)]
public class Chroma
{
	[Key]
	public int Id { get; set; }
	public required string Name { get; set; }
	public string? Image { get; set; }
}
