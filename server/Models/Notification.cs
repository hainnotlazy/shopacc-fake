using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

[Table("Notifications")]
public class Notification
{
	[Key]
	public int Id { get; set; }
	public required int UserId { get; set; }
	public required int Type { get; set; }
	public required string Message { get; set; }
}
