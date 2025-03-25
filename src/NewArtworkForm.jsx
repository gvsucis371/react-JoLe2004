export default function AddArtworkForm({ editMode = false, artworkToEdit, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f }) {
    
    return (
        <div id='updateForm'>
            { editMode ? 'Update' : "New" } Artwork
        <form onSubmit={onSubmit}>
            <input
                value={artworkToEdit.title}
                onChange={event => onUpdate({...artworkToEdit, title: event.target.value})}
                type="text"
                placeholder="Title"
                required
            />
            <input
                value={artworkToEdit.artist}
                onChange={event =>onUpdate({...artworkToEdit, artist: event.target.value})}
                type="text"
                placeholder="Artist"
                required
            />
            <input
                value={artworkToEdit.year}
                onChange={event =>onUpdate({...artworkToEdit, year: event.target.value})}
                type="number"
                placeholder="Year"
                required
            />
            <input
                value={artworkToEdit.medium}
                onChange={event =>onUpdate({...artworkToEdit, medium: event.target.value})}
                type="text"
                placeholder="Medium"
                required
            />
            <button>{editMode ? 'Update' : 'Add'}</button>
            <button type='button' onClick={onCancelEdit}>Cancel</button>
        </form>
        </div>
    )
}