import React from "react";
import Artwork from "./Artwork";

export default function ArtworkList({ artworks = [], loading = false, onEditArtwork = f => f, onDeleteArtwork = f => f }) {
  if (loading) {
    return <div>Loading ......</div>;
  } else if(!artworks.length) {
    return <div style={{color: "white"}}>No Artworks Listed.</div>;
  } 
  return (
    <div>
      {
        artworks.map(artwork => <Artwork key={artwork.id} {...artwork} onEditClicked={() => onEditArtwork(artwork)} onDeleteClicked={() => onDeleteArtwork(artwork.id)}/>)
      }
    </div>
  );
}
