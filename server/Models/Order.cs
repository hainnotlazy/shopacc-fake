using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Enums;

namespace server.Models;

[Table("Orders")]
public class Order {
	[Key]
	public int Id { get; set; }
	public required int UserId { get; set; }
	public required int Type { get; set; }
	public required OrderStatus Status { get; set; }
	public required int Total { get; set; }
	public required DateTime CreateAt { get; set; }
	public string? AccountId { get; set; }
}
