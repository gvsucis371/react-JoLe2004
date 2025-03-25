import React from "react";
import Artwork from "./Artwork";

export default function ArtworkList({ artworks = [], loading = false, message, onEditArtwork = f => f, onDeleteArtwork = f => f }) {
  if (message) {
    return <div>{message}</div>
  } else if (loading) {
    return <div>Loading ......</div>;
  } else if(!artworks.length) {
    return <div>No Artworks Listed.</div>;
  } 
  return (
    <div>
      {
        artworks.map(artwork => <Artwork key={artwork.id} {...artwork} onEditClicked={() => onEditArtwork(artwork)} onDeleteClicked={() => onDeleteArtwork(artwork.id)}/>)
      }
    </div>
  );
}
