console.log("Welcome to Spotify");

// Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('progressbar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Abhi naa jao chod kar", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Pehla Nasha", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Bahon mein chale aao", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Yeh dil tum bin lagta nahi", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Yeh sham mastani", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
];

// Update song items in UI
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Play/Pause toggle
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('circle-play-solid.svg');
        masterPlay.classList.add('./pause-solid.svg');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('./pause-solid.svg');
        masterPlay.classList.add('circle-play-solid.svg');
    }
});

// Update progress bar
audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek functionality
myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('pause-solid.svg');
        element.classList.add('circle-play-solid.svg');
    });
};

// Song list click play
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        songIndex = i;
        e.target.classList.remove('circle-play-solid.svg');
        e.target.classList.add('pause-solid.svg');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('circle-play-solid.svg');
        masterPlay.classList.add('pause-solid.svg');
    });
});

// Next song
document.getElementById("next").addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('circle-play-solid.svg');
    masterPlay.classList.add('pause-solid.svg');
});

// Previous song
document.getElementById("previous").addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('circle-play-solid.svg');
    masterPlay.classList.add('pause-solid.svg');
});
