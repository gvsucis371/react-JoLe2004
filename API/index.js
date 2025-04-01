const { query } = require('express')
const express = require('express')
const ArtworkDB = require('./ArtworkDB')

const app = express()
const port = 3001

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "content-type")
    next();
});

const validateArtwork = (artwork) => {
    if (!artwork || typeof artwork !== 'object') return "Invalid artwork data";

    const { title, artist, year, medium } = artwork;

    if (!title || typeof title !== 'string' || title.trim() === "") return "Title is required";
    if (!artist || typeof artist !== 'string' || artist.trim() === "") return "Artist is required";
    if (!year || isNaN(year) || year < 1000 || year > new Date().getFullYear()) return "Year must be a valid number between 1000 and the current year";
    if (!medium || typeof medium !== 'string' || medium.trim() === "") return "Medium is required";

    return null; // No validation errors
};

// Get all artworks
app.get('/artworks', async (req, res) => {
    res.json(await ArtworkDB.allArtworks());
})

// Add a new artwork
app.post('/artworks', async (req, res) => {
    console.log(req.body);

    const error = validateArtwork(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }

    if (req.body == undefined) {
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        ArtworkDB.insertArtwork(req.body).then((data) => {
            res.json(data);
        })
    }
})

// Update an existing artwork by ID
app.post('/artworks/:id', async (req, res) => {
    let id = req.params.id;

    if (id != req.body.pk) {
        return res.status(400).json({ message: "Inconsistent Primary Key" });
    }

    const error = validateArtwork(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }

    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        ArtworkDB.updateArtwork(req.body).then((data) => {
            res.json(data);
        })
    }
})

// Delete an artwork by ID
app.delete('/artworks/:id', async (req, res) => {
    const id = req.params.id;

    ArtworkDB.deleteArtwork(id).then((result) => {
        if (result) {
            res.json({ message: "Artwork deleted successfully", id });
        } else {
            res.status(404).json({ message: "Artwork not found" });
        }
    });
});


/* Launch the server */
app.listen(port, () => console.log(`Server listening on port ${port}!`))
