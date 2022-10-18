//require('dotenv').config({ path: './config.env' });

import express, { Application } from "express";
import cors from "cors";

const app: Application = express();
const port: Number = 8080;

app.use(cors({
	origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req,res) => {
    res.send("Oh hi Mark");
})

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port} 🚀`);
	});
} catch (error: any) {
	console.error(`Error occured: ${error.message}`);
}