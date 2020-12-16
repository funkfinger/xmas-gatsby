import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from '../components/seo';
import Album from '../components/album';
import TrackList from '../components/track-list';

import '../style/styles.scss';

const IndexPage = ({ data }) => {
  const albumData = useStaticQuery(graphql`
    query MyQuery {
      allAlbumsJson {
        nodes {
          id
          albumTitle
          albumDownloadUrl
          albumImage
          onSpotify
          onAmazon
          songs {
            songArtist
            songDuration
            songTitle
            songUrl
          }
        }
      }
      allFile {
        nodes {
          absolutePath
          childImageSharp {
            fluid(maxWidth: 500, maxHeight: 500, quality: 100) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  `);

  const [showModal, setShowModal] = useState(false);
  const currentAlbum = albumData.allAlbumsJson.nodes[0];
  const priorAlbums = albumData.allAlbumsJson.nodes.slice(1);
  const [currentModalAlbum, setcurrentModalAlbum] = useState(currentAlbum);

  const getImageById = (id) => {
    return albumData.allFile.nodes.find(({ absolutePath }) => absolutePath.match(id));
  };

  const modalAlbum = (a) => {
    setcurrentModalAlbum(a);
    setShowModal(true);
  };

  return (
    <div className="page">
      <SEO title="" />
      <div className="page">
        <header>
          <h1>
            <small>Carrie, Jay &amp; Wilson's</small> MERRY MERRY XMAS
          </h1>
          <a
            href={`https://open.spotify.com/playlist/7gHCWiuQwjU8dgDA6tIQby?si=lb1_BWdRQm6lLYDMpP4olQ`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="stream-link">
              <div className="stream-link-icon stream-link-item">
                <img
                  src="../../images/spotify-white.png"
                  alt="stream on Spotify"
                  title="stream on Spotify"
                  className="link-logo"
                />
              </div>
              <div className="stream-link-text stream-link-item">stream them all! </div>
            </div>
          </a>
        </header>
        <main>
          <div className="albums">
            <div className="current-album">
              <Album
                key={currentAlbum.id}
                album={currentAlbum}
                albumImage={getImageById(currentAlbum.id)}
                size={450}
                clickAction={modalAlbum}
              />
            </div>
            <div className="past-albums">
              {priorAlbums.map((album) => {
                return (
                  <div className="past-album" key={album.id}>
                    <Album
                      key={album.id}
                      album={album}
                      data={data}
                      clickAction={modalAlbum}
                      albumImage={getImageById(album.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        <footer>
          <p>
            All media on this website is for sampling and promotional purposes and we encourage you
            to purchase the albums of any song you hear and like. If you have rights to any of the
            media here (or represent those who do) and feel that we have not used your media in the
            way it was intended, please contact us (xmas [at] irk dot com) and we'll remove it.
            Happy holidays!
          </p>
        </footer>

        {/* <dialog
          onClick={(e) => {
            console.log(e.target);
          }}
        > */}
        <div className={showModal ? 'show-modal' : 'hide-modal'}>
          {/* <div className={showModal ? 'show-modal' : 'hide-modal'}> */}
          <div className="album-modal">
            <button
              onClick={() => {
                console.log('clicked');
                setShowModal(false);
                console.log(showModal);
              }}
            >
              close
            </button>
            <Album album={currentModalAlbum} size={350} />
            <TrackList tracks={currentModalAlbum.songs}></TrackList>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
