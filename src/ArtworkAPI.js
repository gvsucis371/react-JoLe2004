const apiURL = 'http://localhost:3001';

export default class ArtworkAPI {

  static fetchArtworks() {
    return fetch(`${apiURL}/artworks`).then(response => {
      return response.json();
    });
  }

  static addArtwork(artwork) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(artwork)
    };

    return fetch(`${apiURL}/artworks/`, options).then(async response => {
      if (response.ok) {
        console.log('Response was ok');
        return response.json();
      } else {
        throw new Error(`Problem with POST: ${(await response.json()).message}`);
      }
    });
  }

  static updateArtwork(artwork) {
    if (!artwork.pk) {
      throw new Error('Artwork must have a primary key to update');
    }

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(artwork)
    };

    return fetch(`${apiURL}/artworks/${artwork.pk}`, options).then(async response => {
      if (response.ok) {
        console.log('Response was ok');
        return response.json();
      } else {
        throw new Error(`Problem with POST: ${(await response.json()).message}`);
      }
    });
  }

  static deleteArtwork(id) {
    const options = {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    return fetch(`${apiURL}/artworks/${id}`, options).then(async response => {
        if (response.ok) {
            console.log('Artwork deleted successfully');
            return response.json();
        } else {
            throw new Error(`Problem with DELETE: ${(await response.json()).message}`);
        }
    });
  }
}
