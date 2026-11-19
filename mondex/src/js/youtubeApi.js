
let youtubeApiPromise;

export function loadYouTubeAPI() {
    if (window.YT?.Player) {
        return Promise.resolve(window.YT);
    }

    if (youtubeApiPromise) {
        return youtubeApiPromise;
    }

    youtubeApiPromise = new Promise((resolve, reject) => {
        window.onYouTubeIframeAPIReady = () => {
            resolve(window.YT);
        };

        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;

        script.onerror = () => {
            youtubeApiPromise = null;
            reject(new Error("Failed to load YouTube API"));
        };

        document.head.appendChild(script);
    });

    return youtubeApiPromise;
}