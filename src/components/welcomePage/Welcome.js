import React, { useEffect, useState } from 'react'
import './style.css'
import welcomeBanner from '../../assets/welcome-banner.png'

function Welcome() {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        let interval = null;
        
        setTimeout(() => {
            interval = setInterval(() => {
                setPercent(prev => {
                    let next = prev+1;
                    if(next === 100) clearInterval(interval);
                    return next<=100?next:100;
                })
            }, 20)
            return () => clearInterval(interval)
        }, 550)
    }, [])

    return (
        <div className='welcome-page'>
            <div className="welcome-container">
                <img src={welcomeBanner} alt="" />
                <h1 className="welcome-msg">
                    Welcome To PodPulse
                </h1>
                <p className="intro">You Can Create, Listen, And Share Podcasts</p>
                <div className="progress">
                    <div className="progress-track">
                        <div className="progress-bar" style={{width: `${percent}%`}}></div>
                        <p className="progress-percent">{percent}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome