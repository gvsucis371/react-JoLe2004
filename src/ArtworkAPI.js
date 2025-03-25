const hardCodedArtworks = [
    {
      id: 1,
      title: "Mona Lisa",
      artist: "Leonardo da Vinci",
      year: 1503,
      medium: "Oil on canvas"
    },
    {
      id: 2,
      title: "Starry Night",
      artist: "Vincent van Gogh",
      year: 1889,
      medium: "Oil on canvas"
    },
    {
      id: 3,
      title: "The Persistence of Memory",
      artist: "Salvador Dalí",
      year: 1931,
      medium: "Oil on canvas"
    }
  ];
  
  export default class ArtworkAPI {
    static fetchArtworks() {
      return new Promise((resolve) => {
        resolve(hardCodedArtworks);
      });
    }
  
    static addArtwork(artwork) {
      return new Promise((resolve, _reject) => {
        const newArtwork = { ...artwork, id: hardCodedArtworks.length + 1 };
        hardCodedArtworks.push(newArtwork);
        resolve(newArtwork);
      });
    }
  
    static updateArtwork(updatedArtwork) {
      return new Promise((resolve, reject) => {
        const index = hardCodedArtworks.findIndex(artwork => artwork.id == updatedArtwork.id);
        if (index == -1) {
          return reject(new Error("Artwork not found"));
        }
        hardCodedArtworks[index] = { ...hardCodedArtworks[index], ...updatedArtwork };
        resolve(hardCodedArtworks[index]);
      });
    }
  
    static deleteArtwork(id) {
      return new Promise((resolve, reject) => {
        const index = hardCodedArtworks.findIndex(artwork => artwork.id == id);
        if (index === -1) {
          return reject(new Error("Artwork not found"));
        }
        resolve(hardCodedArtworks[index]);
      });
    }
  }
  