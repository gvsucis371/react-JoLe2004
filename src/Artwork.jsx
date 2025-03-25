
export default function Artwork({ title, artist, year, medium, onEditClicked = f => f, onDeleteClicked = f => f }) {
    return (
      <section>
        <h1>{title}</h1>
        <div>
            <div>{artist}</div>
            <div>{year}</div>
            <div>{medium}</div>
            <button onClick={() => onEditClicked(title)}>Edit</button>
            <button onClick={() => onDeleteClicked(title)}>Delete</button>

        </div>
      </section>
    )
}