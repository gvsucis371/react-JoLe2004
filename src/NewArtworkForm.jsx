import { useState } from "react";

export default function AddArtworkForm({ editMode = false, artworkToEdit, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f }) {
    
    return (
        <div id='updateForm'>
        <h2>{ editMode ? 'Update' : "New" } Artwork</h2>

        <form onSubmit={onSubmit}>
            <input
                value={artworkToEdit.title}
                onChange={event => onUpdate({...artworkToEdit, title: event.target.value})}
                type="text"
                placeholder="Title"
            />
            <input
                value={artworkToEdit.artist}
                onChange={event =>onUpdate({...artworkToEdit, artist: event.target.value})}
                type="text"
                placeholder="Artist"
            />
            <input
                value={artworkToEdit.year}
                onChange={event =>onUpdate({...artworkToEdit, year: event.target.value})}
                type="number"
                placeholder="Year"
            />
            <input
                value={artworkToEdit.medium}
                onChange={event =>onUpdate({...artworkToEdit, medium: event.target.value})}
                type="text"
                placeholder="Medium"
            />
            <button>{editMode ? 'Update' : 'Add'}</button>
            <button type='button' onClick={onCancelEdit}>Cancel</button>
        </form>
        </div>
    )
}