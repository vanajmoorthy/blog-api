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
			`CREATE TABLE posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            description text, 
            )`,
			(err) => {
				if (err) {
				} else {
					// Table just created, creating some rows
					var insert =
						"INSERT INTO posts (title, description) VALUES (?,?)";
					db.run(insert, ["333", "this is a post"]);
					db.run(insert, ["post2", "ohter psot"]);
					db.run(insert, ["pos222t2", "ohter psot"]);
				}
			}
		);
	}
});

module.exports = db;
