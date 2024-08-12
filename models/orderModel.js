const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	user_id: String,
	user_email: String,

	username: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	phone_number: {
		type: String,
		required: true,
	},
	delivery_date: Date,
	ordered_date: {
		type: Date,
		default: Date.now(),
	},
	products: [
		{
			product_id: String,
			quantity: Number,
		},
	],
});

orderSchema.pre("save", function (next) {
	if (!this.delivery_date) {
		this.delivery_date = new Date(this.ordered_date);
		this.delivery_date.setDate(this.delivery_date.getDate() + 7);
	}
	next();
});

module.exports = mongoose.model("Order", orderSchema);