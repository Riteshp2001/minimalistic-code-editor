import mongoose from "mongoose";

let isConnected;
let connectionPromise;

async function dbConnect() {
	if (isConnected) {
		return isConnected;
	}

	if (!connectionPromise) {
		const uri = process.env.MONGODB_URI;
		const options = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};

		connectionPromise = mongoose
			.connect(uri, options)
			.then((db) => {
				isConnected = db.connections[0].readyState;
				return db;
			})
			.catch((err) => {
				throw new Error(`MongoDB connection error: ${err}`);
			});
	}

	isConnected = await connectionPromise;
	return isConnected;
}

export default dbConnect;
