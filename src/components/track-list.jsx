import React from 'react';
import nextId from 'react-id-generator';

const TrackList = ({ tracks }) => {
  return (
    <div className="track-list">
      <ol>
        {tracks.map((track) => {
          const id = nextId('track-');
          return (
            <li key={id}>
              <span className="song-title">{track.songTitle}</span> /{' '}
              <span className="song-artist">{track.songArtist}</span>{' '}
              <span className="song-duration">[{track.songDuration}]</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TrackList;
