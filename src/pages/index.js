import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from '../components/seo';
import Album from '../components/album';
import TrackList from '../components/track-list';
import Lights from '../components/lights';

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
    }
  `);

  const [showModal, setShowModal] = useState(false);
  const currentAlbum = albumData.allAlbumsJson.nodes[0];
  const priorAlbums = albumData.allAlbumsJson.nodes.slice(1);
  const [currentModalAlbum, setcurrentModalAlbum] = useState(currentAlbum);

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
        </header>
        <Lights />
        <main>
          <div className="albums">
            <div className="current-album">
              <Album
                key={currentAlbum.id}
                album={currentAlbum}
                size={450}
                clickAction={modalAlbum}
              />
            </div>
            <div className="past-albums">
              {priorAlbums.map((album) => {
                return (
                  <div className="past-album" key={album.id}>
                    <Album key={album.id} album={album} data={data} clickAction={modalAlbum} />
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
        <dialog className={showModal ? 'show-modal' : 'hide-modal'}>
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
        </dialog>
      </div>
    </div>
  );
};

export default IndexPage;
