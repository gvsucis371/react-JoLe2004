
export default function Artwork({ title, artist, year, medium, onEditClicked = f => f, onDeleteClicked = f => f }) {
    return (
<section className="container">
      <h1 className="title">{title}</h1>
      <div className="info">
        <div><strong>Artist:</strong> {artist}</div>
        <div><strong>Year:</strong> {year}</div>
        <div><strong>Medium:</strong> {medium}</div>
        <div className="buttons">
          <button className="edit" onClick={() => onEditClicked(title)}>Edit</button>
          <button className="delete" onClick={() => onDeleteClicked(title)}>Delete</button>
        </div>
      </div>
    </section>
    )
}