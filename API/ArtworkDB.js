const sqlite3 = require('sqlite3').verbose();

class ArtworkDB {

    static initialize() {
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS Artworks (
                pk INTEGER PRIMARY KEY, 
                id TEXT NOT NULL, 
                title TEXT NOT NULL, 
                artist TEXT NOT NULL, 
                year INTEGER NOT NULL, 
                medium TEXT NOT NULL
            )`);
        });
    }

    static allArtworks() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM Artworks', (err, response) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
    }

    static insertArtwork(artwork) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO Artworks (id, title, artist, year, medium) 
                VALUES ("${artwork.id}", "${artwork.title}", "${artwork.artist}", "${artwork.year}", "${artwork.medium}")`, 
                function(err) {
                    if (err) reject(err);
                    else {
                        artwork.pk = this.lastID;
                        resolve(artwork);
                    }
                });
        });
    }

    static updateArtwork(artwork) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Artworks SET id="${artwork.id}", title="${artwork.title}", artist="${artwork.artist}", year="${artwork.year}", medium="${artwork.medium}" WHERE pk="${artwork.pk}"`;
            this.db.run(sql, function(err) {
                if (err) {
                    console.log("Error updating artwork:", err);
                    reject({ message: err });
                } else if (this.changes === 1) {
                    const updatedArtwork = {id: artwork.id, title: artwork.title, artist: artwork.artist, year: artwork.year, medium: artwork.medium, pk: artwork.pk};
                    resolve(updatedArtwork);
                } else {
                    reject(`Unknown problem. There were ${this.changes} changes.`);
                }
            });
        });
    }

    static deleteArtwork(id) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM Artworks WHERE id = ?', [id], function (err) {
                if (err) {
                    reject(err);
                } else if (this.changes === 0) {
                    reject(new Error("No artwork found with the given ID"));
                } else {
                    resolve(true);
                }
            });
        });
    }
    
}

ArtworkDB.db = new sqlite3.Database('artworks.sqlite');

module.exports = ArtworkDB;
