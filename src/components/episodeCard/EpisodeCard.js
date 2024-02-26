import React, { useState } from 'react'
import './style.css'
import PlayButton from '../button/PlayButton';

function EpisodeCard({ episode, index, playingEpisode, setPlayingEpisode }) {


    const handlePlay = () => {
        setPlayingEpisode(playingEpisode===episode ? null : episode)
    }

    return (
        <div className='episode-card'>
            <h3 className="episode-title">{index+1}. {episode.title}</h3>
            <p className="episode-description">{episode.description}</p>
            <PlayButton
                text={episode === playingEpisode ? 'Playing' : 'Play'}
                onClick={handlePlay}
                style={{width:'6rem'}}
            />
        </div>
    )
}

export default EpisodeCard