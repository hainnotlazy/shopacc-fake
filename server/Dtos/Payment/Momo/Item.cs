namespace server.Dtos.Payment.Momo {
	public class Item {
		public required string Id { get; set; }
		public required string Name { get; set; }
		public string Description { get; set; } = "";
		public string Category { get; set; } = "";
		public string ImageUrl { get; set; } = "";
		public string Manufacturer { get; set; } = "";
		public required long Price { get; set; }
		public required string Currency { get; set; } = "VND";
		private int _Quantity;
		public required int Quantity
		{
			get => _Quantity;
			set {
				if(value <= 0) {
					throw new ArgumentException("Quantity must be greater than 0");
				}
				_Quantity = value;
			}
		}
		public string Unit { get; set; } = "";
		public required long TotalPrice { get; set; }
		public required long TaxAmount { get; set; }
	}
}
