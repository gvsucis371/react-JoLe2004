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

  let fetchColors = () => {
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
  useEffect(fetchColors, []);

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (editMode) {
      ArtworkAPI.updateArtwork(artworkToEdit)
        .then((updatedArtwork) => {
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
      .then((deletedArtwork) => {
        setArtworks(artworks.filter(artwork => artwork.id !== deletedArtwork.id));
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
      <AddArtworkForm editMode={editMode} artworkToEdit={artworkToEdit} onUpdate={(artwork) => setArtworkToEdit(artwork)} onSubmit={submit} onCancelEdit={cancelEdit}/>
      <div id="list">
      <ArtworkList artworks={artworks} loading={loading} message={message} onEditArtwork={editArtwork} onDeleteArtwork={deleteArtwork}/>
      </div>
    </div>
  );
}

export default App;
