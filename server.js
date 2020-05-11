const express = require("express");
const db = require("./database.js");
// Create express app
const app = express();
app.use(express.json());

// Server port
const HTTP_PORT = 8000;
// Start server
app.listen(HTTP_PORT, () => {
	console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});
// Root endpoint
app.get("/", (req, res, next) => {
	res.json({ message: "Ok" });
});

app.get("/posts", (req, res, next) => {
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

app.post("/posts", (req, res, next) => {
	let errors = [];

	console.log(req.body);
	if (!req.body.title) {
		errors.push("Please specify a title");
	}

	if (!req.body.description) {
		errors.push("Please specify a body");
	}

	if (errors.length) {
		res.status(400).json({ error: errors.join(",") });
		return;
	}

	var data = {
		title: req.body.title,
		description: req.body.description,
		auhor: req.body.author,
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
// Insert here other API endpoints

// Default response for any other request
app.use(function (req, res) {
	res.status(404);
});
