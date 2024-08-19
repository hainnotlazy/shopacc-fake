using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

[Table("BalanceHistories")]
public class BalanceHistory
{
	[Key]
	public required string UserId { get; set; }
	public required string OrderId { get; set; }
	public required int CurrentBalance { get; set; }
	public required int NewBalance { get; set; }
	public required DateTime CreatedAt { get; set; }
}
