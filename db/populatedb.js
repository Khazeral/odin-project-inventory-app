#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS comic (
  id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, 
  description TEXT
);

CREATE TABLE IF NOT EXISTS author ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL);

CREATE TABLE IF NOT EXISTS genre ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL);

CREATE TABLE IF NOT EXISTS comic_author (                                             
  comic_id INT NOT NULL,
  author_id INT NOT NULL,
  PRIMARY KEY (comic_id, author_id),
  FOREIGN KEY (comic_id) REFERENCES comic(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES author(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comic_genre (
  comic_id INT NOT NULL,
  genre_id INT NOT NULL,
  PRIMARY KEY (comic_id, genre_id),
  FOREIGN KEY (comic_id) REFERENCES comic(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genre(id) ON DELETE CASCADE
);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/top_users",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
