import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Album = ({ album, size, clickAction, albumImage }) => {
  const coverSize = size ? size : 250;
  const spotifyLink = album.onSpotify ? (
    <a href={album.onSpotify} target="_blank" rel="noreferrer">
      <img
        src="../../images/spotify.png"
        alt="stream on Spotify"
        title="stream on Spotify"
        className="link-logo"
      />
    </a>
  ) : (
    <div></div>
  );

  const amazonLink = album.onAmazon ? (
    <a href={album.onAmazon} target="_blank" rel="noreferrer">
      <img
        src="../../images/amazon-music.png"
        alt="stream on Amazon"
        title="stream on Amazon"
        className="link-logo"
      />
    </a>
  ) : (
    <div></div>
  );

  console.log("albumImage: ", albumImage);

  const image = albumImage ? (
    <div style={{ width: "100%" }}>
      <GatsbyImage
        image={getImage(albumImage)}
        className="album-cover-art"
        alt={album.albumTitle}
        title={album.albumTitle}
        fit="scale-down"
      />
    </div>
  ) : (
    <img
      alt={album.albumTitle}
      title={album.albumTitle}
      src={`../../images/${album.id}/${
        album.albumImage.match(/\d{4}\/(.*)/)[1]
      }`}
      width={coverSize}
      height={coverSize}
      className="album-cover-art"
    />
  );

  const imageLink = clickAction ? (
    <button
      onClick={() => clickAction(album)}
      className={`no-style w-${coverSize}`}
    >
      {image}
    </button>
  ) : (
    image
  );

  return (
    <div key={`album-${album.id}`} className="album">
      {imageLink}
      <h2 className="album-title">
        {album.albumTitle}
        <div className="links">
          {spotifyLink} {amazonLink}
        </div>
      </h2>
    </div>
  );
};

export default Album;
