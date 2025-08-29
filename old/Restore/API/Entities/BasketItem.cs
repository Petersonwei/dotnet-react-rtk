using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities;

[Table("BasketItems")]

public class BasketItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }

    // Navigation property
    public int ProductId { get; set; }
    public required Product Product { get; set; } 

    public int BasketId { get; set; }

    [JsonIgnore]
    public Basket Basket { get; set; } = null!;
}
