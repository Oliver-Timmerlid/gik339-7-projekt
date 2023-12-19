
DROP TABLE IF EXISTS movies;
CREATE TABLE IF NOT EXISTS movies(
   id        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,Title    VARCHAR NOT NULL
  ,Genre    VARCHAR NOT NULL
  ,Year     INTEGER NOT NULL
);

INSERT INTO movies(id,Title,Genre,Year) VALUES (1,'Gone Girl','Thriller','2014');
INSERT INTO movies(id,Title,Genre,Year) VALUES (2,'IT','Horror','1990');
INSERT INTO movies(id,Title,Genre,Year) VALUES (3,'Die Hard','Christmas','1988');
INSERT INTO movies(id,Title,Genre,Year) VALUES (4,'Dumpad','Comedy','2008');
INSERT INTO movies(id,Title,Genre,Year) VALUES (5,'Armageddon','Action','1998');
INSERT INTO movies(id,Title,Genre,Year) VALUES (6,'The Lord of the Rings: The Return of the King','Action','2003');
INSERT INTO movies(id,Title,Genre,Year) VALUES (7,'Unknown: The lost pyramid','Documentary','2023');
INSERT INTO movies(id,Title,Genre,Year) VALUES (8,'The Gentlemen','Action','2019');
INSERT INTO movies(id,Title,Genre,Year) VALUES (9,'Paddington','Comedy','2014');
INSERT INTO movies(id,Title,Genre,Year) VALUES (10,'Fanny och Alexander','Drama','1982');


select * from movies;