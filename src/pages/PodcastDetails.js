import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/loader/Loader';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Button from '../components/button/Button';
import EpisodeCard from '../components/episodeCard/EpisodeCard';
import FallbackUi from '../components/fallbackUi/FallbackUi';
import AudioPlayer from '../components/audioPlayer.js/AudioPlayer';
import Genres from '../components/genres/Genres';

function PodcastDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [podcast, setPodcast] = useState(null);
    const [episodes, setEpisodes] = useState([]);

    const [loading, setLoading] = useState(false);

    const [playingEpisode, setPlayingEpisode] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    
    useEffect(() => {
        const getPodcast = async () => {
            setLoading(true);
            if(id) {
                try{
                    const podcastDoc = await getDoc(doc(db, "podcasts", id))
                    const podcastData = podcastDoc.data();
                    setPodcast(podcastData);
                }
                catch(error){
                    setPodcast(null);
                }
                finally{
                    setLoading(false);
                }
            }
            else{
                setPodcast(null);
                setLoading(false);
            }
        }
        getPodcast();
    }, [id])

    useEffect(() => {
        const fetchEpisodes = async () => {
            setEpisodes([]);
            if(id){
                const episodesCollectionRef = collection(db, 'podcasts', id, 'episodes');
                const episodesData = await getDocs(episodesCollectionRef);
                const episodes = [];
                episodesData.forEach(doc => {
                    episodes.push({...doc.data(), id: doc.id});
                });
                setEpisodes(episodes);
            }
        }

        fetchEpisodes();
    }, [id])

    if(loading) {
        return <Loader />
    }

    if(!podcast){
        return <FallbackUi text={'This Is Not A Valid Address!!'} />
    }

    return (
        <div className='podcast-details'>
            <Header />
            <div className="podcast-wrapper">
                <div className='podcast-details-container'>
                    <div className="podcast-heading-container">
                        <div className="heading-left">
                            <h1 className='podcast-title-heading'>{podcast.title}</h1>
                            <p className='podcast-create-by'>Created By {podcast.createBy.name}</p>
                            <Genres genres={podcast?.genres} />
                        </div>
                        {
                            podcast.createBy.uid===auth.currentUser.uid && <Button
                                text='Create Episode'
                                onClick={() => navigate(`/podcast/${id}/create-episode`)}
                            />
                        }
                    </div>
                    <div className="banner-box">
                        <img src={podcast.bannerImage} alt="" />
                    </div>
                    <p className="podcast-details-description">{podcast.description}</p>
                    <h2 className="episodes-heading">Episodes</h2>

                    <div className="episodes-container">
                        {
                            episodes.map((episode, index) => (
                                <EpisodeCard
                                    episode={episode}
                                    index={index}
                                    playingEpisode={playingEpisode}
                                    setPlayingEpisode={setPlayingEpisode}
                                    isPlaying={isPlaying}
                                    setIsPlaying={setIsPlaying}
                                    key={episode.id}
                                />
                            ))
                        }
                        {episodes.length===0 && <FallbackUi text={'There Is No Episode!!'} style={{height:'8rem', fontSize:'1.5rem'}} />}
                    </div>

                </div>
            </div>
            {playingEpisode && 
            <AudioPlayer
                episode={playingEpisode}
                displayImage={podcast.displayImage}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />}
        </div>
    )
}

export default PodcastDetails