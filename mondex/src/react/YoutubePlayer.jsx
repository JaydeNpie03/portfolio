
import { useEffect, useRef, useState } from 'react';
import { loadYouTubeAPI } from '../js/youtubeApi';

function YouTubePlayer({ videoID }) {

    const playerContainer = useRef(null);
    const playerRef = useRef(null);

    const [ready, setReady] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function initializePlayer() {
            const YT = await loadYouTubeAPI();

            if (cancelled) return;

            playerRef.current = new YT.Player(
                playerContainer.current,
                {
                    width: '320',
                    height: '200',
                    videoId: videoID,

                    playerVars: {
                        playsinline: 1,
                        controls: 1
                    },

                    events: {
                        onReady: () => setReady(true)
                    }
                }
            );
        }

        initializePlayer();

        return () => {
            cancelled = true;
            playerRef.current?.destroy();
            playerRef.current = null;
        };

    }, [videoID]);

    function playVideo() {
        playerRef.current?.playVideo();
    }

    function pauseVideo() {
        playerRef.current?.pauseVideo();
    }

    return (
        <div>
            <div ref={playerContainer}></div>
        </div>
    );
}

export default YouTubePlayer;
