var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		// Cannot open database
		console.error(err.message);
		throw err;
	} else {
		console.log("Connected to the SQLite database.");
		db.run(
			`CREATE TABLE posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title text, description text, author text)`,
			(err) => {
				if (err) {
				}
			}
		);
	}
});

module.exports = db;
