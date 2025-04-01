import ArtworkList from './ArtworkList'
import AddArtworkForm from './NewArtworkForm'
import { useState, useEffect } from 'react'
import ArtworkAPI from './ArtworkAPI'

const defaultArtwork = { id: null, title: "", artist: "", year: "", medium: "" }

function App() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [artworkToEdit, setArtworkToEdit] = useState(defaultArtwork);
  const [message, setMessage] = useState('');

  let fetchArtworks = () => {
    setLoading(true);
    ArtworkAPI.fetchArtworks()
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(`Error loading artworks: ${error.message}`);
      });
  };
  useEffect(fetchArtworks, []);

  const submit = (event) => {
    event.preventDefault();

    const trimmedTitle = artworkToEdit.title.trim();
    const trimmedArtist = artworkToEdit.artist.trim();
    const trimmedMedium = artworkToEdit.medium.trim();
    const year = Number(artworkToEdit.year);
    if (!trimmedTitle || !trimmedArtist || !trimmedMedium) {
      setMessage("All fields are required.");
      return;
    }
    if (!year || year < 1000 || year > new Date().getFullYear()) {
      setMessage("Please enter a valid year (1000-2025).");
      return;
    }
    setMessage("");
    setLoading(true);
    if (editMode) {
      ArtworkAPI.updateArtwork(artworkToEdit)
        .then((updatedArtwork) => {
          console.log(updatedArtwork)
          setArtworks(artworks.map(artwork => artwork.id === updatedArtwork.id ? updatedArtwork : artwork));
          setEditMode(false);
          setArtworkToEdit(defaultArtwork);
          setLoading(false);
        })
        .catch((error) => {
          setMessage(`Error updating artwork: ${error.message}`);
          setLoading(false);
        });
    } else {
      artworkToEdit.id = artworks.length
      ArtworkAPI.addArtwork(artworkToEdit)
        .then((newArtwork) => {
          setArtworks([newArtwork, ...artworks]);
          setEditMode(false);
          setArtworkToEdit(defaultArtwork);
          setLoading(false);
        })
        .catch((error) => {
          setMessage(`Error adding artwork: ${error.message}`);
          setLoading(false);
        });
    }
  };

  const editArtwork = (artwork) => {
    setArtworkToEdit(artwork);
    setEditMode(true);
  };

  const cancelEdit = () => {
    setArtworkToEdit(defaultArtwork);
    setEditMode(false);
  };

  const deleteArtwork = (id) => {
    setLoading(true);
    ArtworkAPI.deleteArtwork(id)
      .then(() => {
        setArtworks(artworks.filter(artwork => artwork.id !== id));
        setLoading(false);
      })
      .catch((error) => {
        setMessage(`Error deleting artwork: ${error.message}`);
        setLoading(false);
      });
  };

  return (
    <div style={{ margin: 50 }}>
      <h1>Artwork Gallery</h1>
      {message ? <p style={{ color: "red" }}>{message}</p> : null}

      <AddArtworkForm editMode={editMode} artworkToEdit={artworkToEdit} onUpdate={(artwork) => setArtworkToEdit(artwork)} onSubmit={submit} onCancelEdit={cancelEdit}/>
      <div id="list">
        <ArtworkList artworks={artworks} loading={loading} onEditArtwork={editArtwork} onDeleteArtwork={deleteArtwork}/>
      </div>
    </div>
  );
}

export default App;
