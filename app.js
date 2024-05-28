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
    const clientSecret = '17fbc6e2fcd046159e9752a37b01888e';
    const redirectUri = 'https://rushiraj.online'; // Your redirect URI registered in Spotify Developer Dashboard

    const playButton = document.getElementById('play-button');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');

    let accessToken = '';

    async function fetchAccessToken() {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
            },
            body: 'grant_type=client_credentials'
        });
        const data = await response.json();
        accessToken = data.access_token;
        fetchRandomSong();
    }

    async function fetchRandomSong() {
        const response = await fetch('https://api.spotify.com/v1/recommendations?limit=1&seed_genres=pop', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        const track = data.tracks[0];
        songTitle.textContent = track.name;
        songArtist.textContent = track.artists.map(artist => artist.name).join(', ');
        playSong(track.uri);
    }

    function playSong(uri) {
        playButton.addEventListener('click', () => {
            fetch(`https://api.spotify.com/v1/me/player/play`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    uris: [uri]
                })
            });
        });
    }

    fetchAccessToken();
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