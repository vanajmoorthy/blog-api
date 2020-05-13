const express = require("express");
const db = require("./database.js");
var cors = require("cors");

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.options("*", cors());
// Server port
const HTTP_PORT = process.env.PORT;

// Start server
app.listen(HTTP_PORT, () => {
	console.log(`Server running on port ${HTTP_PORT}`);
});

// Root endpoint
app.get("/", cors(), (req, res, next) => {
	var sql = "select * from posts";
	var params = [];
	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		console.log(rows);
		res.json({
			message: "success",
			data: rows,
		});
	});
});

app.post("/", cors(), (req, res, next) => {
	let errors = [];

	console.log(req.body);
	if (!req.body.title) {
		errors.push("Please specify a title");
	}

	if (!req.body.description) {
		errors.push(" Please specify a body");
	}

	if (errors.length) {
		res.status(400).json({ error: errors.join(",") });
		return;
	}

	var data = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
	};

	var sql = "INSERT INTO posts (title, description, author) VALUES (?,?,?)";
	var params = [data.title, data.description, data.author];

	db.run(sql, params, function (err, result) {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: "success",
			data: data,
			id: this.lastID,
		});
	});
});

// Default response for any other request
app.use(function (req, res) {
	res.status(404);
});
