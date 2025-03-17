const data = [
    {
        title: "Starry Night",
        artist: "Vincent van Gogh",
        year: 1889,
        medium: "Oil on canvas",
        dimensions: "73.7x92.1"
    },
    {
        title: "The Persistence of Memory",
        artist: "Salvador Dalí",
        year: 1931,
        medium: "Oil on canvas",
        dimensions: "24x33"
    },
    {
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        year: 1503,
        medium: "Oil on poplar panel",
        dimensions: "77x53"
    }
];

function Artwork(props) {
    return <div>
        <h2>{props.title}</h2>
        <p>Artist: {props.artist}</p>
        <p>Year: {props.year}</p>
        <p>Medium: {props.medium}</p>
        <p>Dimensions: {props.dimensions}</p>
    </div>;
}

function Gallery(props) {
    return <section>
        <h1>{props.title}</h1>
        <div classname="artworks">
            {props.artworks.map((artwork, index) => (
                <Artwork
                    key={index}
                    title={artwork.title}
                    artist={artwork.artist}
                    year={artwork.year}
                    medium={artwork.medium}
                    dimensions={artwork.dimensions}
                />
            ))}
        </div>
    </section>
}

ReactDOM.render(
    <Gallery artworks={data} title="Artworks" />,
    document.getElementById("main")
);
