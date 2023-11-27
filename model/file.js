import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	files: [
		{
			html: String,
			css: String,
			js: String,
		},
	],
	created: Date.now,
});

const Files = mongoose.model("Files", fileSchema);

module.exports = Files;
