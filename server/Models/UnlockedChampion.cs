using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("UnlockedChampions")]
[PrimaryKey(nameof(AccountId), nameof(ChampionId))]
public class UnlockedChampion
{
	public required string AccountId;
	public required int ChampionId;
}
