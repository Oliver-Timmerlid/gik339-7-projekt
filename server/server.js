const express = require('express');

const server = express();

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./movies.db');

server
	.use(express.json())
	.use(express.urlencoded({ extended: false }))
	.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', '*');
		res.header('Access-Control-Allow-Methods', '*');

		next();
	});

server.listen(3000, () => console.log('The server is running'));

/*
De API-routes som ska finnas är:
• hämta alla (GET /resurs)
• uppdatera (PUT /resurs)
• skapa (POST /resurs)
• ta bort (DELETE /resurs/:id)
*/

server.get('/movies', (req, res) => {
	const sql = 'SELECT * FROM movies';

	db.all(sql, (err, rows) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(rows);
		}
	});
	// db.close();
});

server.get('/movies/:id', (req,res) => {
	const id = req.params.id;
	const sql = `SELECT * FROM movies WHERE id=${id}`;

	db.all(sql, (err, rows) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(rows[0]);
		}
	});
});

server.post('/movies', (req, res) => {
	const movie = req.body;
	const sql = `INSERT INTO movies(Title, Genre, Year) VALUES (?,?,?)`;

	// const sql = 'INSERT INTO movies (id,Title,Genre,Year)'

	db.run(sql, Object.values(movie), (err) => {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.send('Movie created');
		}
	});
});

server.put('/movies', (req, res) => {
	const bodyData = req.body;

	const id = bodyData.id;

	const movie = {
		Title: bodyData.Title,
		Genre: bodyData.Genre,
		Year: bodyData.Year,
	};

	let updateString = "";
	const columnsArray = Object.keys(movie);
	columnsArray.forEach((column, i)=>{
		updateString += `${column}="${movie[column]}"`;
		if(i !== columnsArray.length - 1) updateString += ',';
	});
	
	
	const sql = `UPDATE movies SET ${updateString} WHERE id=${id}`;

	db.run(sql, (err) => {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.send('Movie updated');
		}
	});
});

server.delete('/movies/:id', (req, res) => {
	const id = req.params.id;
	const sql = `DELETE FROM movies WHERE id = ${id}`;

	db.run(sql, (err) => {
		if(err){
			console.log(err);
			res.status(500).send(err);

		} else {
			res.send('The movie with id: '+ id + ' was deleted')
		}
	});
});



