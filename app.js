document.getElementById('menu-btn').addEventListener('click', function(event) {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.left = '0';
    event.stopPropagation(); // Prevent the click from propagating to the document
});

document.addEventListener('click', function(event) {
    var sidebar = document.getElementById('sidebar');
    var menuBtn = document.getElementById('menu-btn');
    var isClickInsideSidebar = sidebar.contains(event.target);
    var isClickInsideMenuBtn = menuBtn.contains(event.target);

    if (!isClickInsideSidebar && !isClickInsideMenuBtn) {
        sidebar.style.left = '-250px';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const clientId = 'd64c225793754c8b930647622b8a2d7f';
    const redirectUri = 'https://rushiraj.online/callback'; // Your redirect URI registered in Spotify Developer Dashboard

    const playButton = document.getElementById('play-button');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');

    let accessToken = localStorage.getItem('spotify_access_token');
    
    if (!accessToken) {
        authorizeUser();
    } else {
        setupPlayer();
    }

    function authorizeUser() {
        const scopes = 'streaming user-read-email user-read-private';
        const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
        window.location = authUrl;
    }

    function setupPlayer() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new Spotify.Player({
                name: 'Web Playback SDK Template',
                getOAuthToken: cb => { cb(accessToken); }
            });

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                fetchRandomSong(device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error(message);
                authorizeUser(); // Reauthorize if authentication fails
            });

            player.addListener('account_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('playback_error', ({ message }) => {
                console.error(message);
            });

            player.connect();
        };
    }

    async function fetchRandomSong(deviceId) {
        const response = await fetch('https://api.spotify.com/v1/recommendations?limit=1&seed_genres=pop', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        const track = data.tracks[0];
        songTitle.textContent = track.name;
        songArtist.textContent = track.artists.map(artist => artist.name).join(', ');
        playSong(track.uri, deviceId);
    }

    function playSong(uri, deviceId) {
        playButton.addEventListener('click', () => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uris: [uri]
                })
            });
        });
    }
});

window.addEventListener('scroll', function() {
    var hero = document.getElementById('hero');
    var container = document.getElementById('container');
    var scrollPosition = window.scrollY;
    var opacity = 1 - (scrollPosition / 500); // Adjust 500 to change scroll sensitivity

    if (opacity < 0) {
        opacity = 0; // Ensure opacity doesn't go below 0
    }

    hero.style.opacity = opacity;
    container.style.opacity = 1 - opacity;
});
