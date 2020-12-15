import React from 'react';

const Album = ({ album, size, clickAction }) => {
  const coverSize = size ? size : 250;
  const spotifyLink = album.onSpotify ? (
    <a href={album.onSpotify} target="_blank" rel="noreferrer">
      <img
        src="../../images/spotify.png"
        alt="listen on spotify"
        title="listen on spotify"
        className="link-logo"
      />
    </a>
  ) : (
    <div>-</div>
  );

  const amazonLink = album.onAmazon ? (
    <a href={album.onAmazon} target="_blank" rel="noreferrer">
      <img
        src="../../images/amazon-music.png"
        alt="listen on amazon"
        title="listen on amazon"
        className="link-logo"
      />
    </a>
  ) : (
    <div>-</div>
  );

  console.log(album);
  const image = (
    <img
      alt={album.albumTitle}
      title={album.albumTitle}
      src={`../../images/${album.id}/${album.albumImage.match(/\d{4}\/(.*)/)[1]}`}
      width={coverSize}
      height={coverSize}
      className="album-cover-art"
    />
  );

  const imageLink = clickAction ? (
    <button onClick={() => clickAction(album)} className="no-style">
      {image}
    </button>
  ) : (
    image
  );

  return (
    <div className="past-album">
      <div key={`album-${album.id}`} className="album">
        {imageLink}
        <h3>
          {album.albumTitle}
          <div className="links">
            {spotifyLink} {amazonLink}
          </div>
        </h3>
      </div>
    </div>
  );
};

export default Album;
