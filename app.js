let audio = new Audio();

const playbutton = document.getElementById("play");
let tape = document.getElementById("TapeRotate");
let Progress = document.getElementById("myProgress");
let Tape_Image = document.getElementById("tapeImage");
let VolumeProgress = document.getElementById("VolProgress");
let marqTitle = document.getElementById('MarqueTitle')
let playlistButton = document.getElementById('playlistButton');
let playlistContainor = document.getElementById('PlayList');
let ShowPlaylist = false;

let list;
let playlistIndex;

let currSong;
let nextSong = document.getElementById("forward");

let StartTime = document.getElementById("StartTime");
let curTime = 0
let endTime;
let MinuteInStart = 0
let SecondInStart = 0
let currIndex = 0;
let playingSong;

let SuffleRepeat = document.getElementById("Suffle_Repeat");
let repeatAll =true
let suffleActive = false;
let repeatOne = false;

const songLists = [
    {   
        songTitle: "/Songs/we_rollin.mp3", 
        songImage: "/SongAlbum/we Rollin0.jpg" },
    {
        songTitle: "/Songs/Dil ye pukare aaja.mp3",
        songImage: "/SongAlbum/Dil ye pukare .jpg",
    },
    {   
        songTitle: "/Songs/Keshriya.mp3", 
        songImage: "/SongAlbum/Kesariya-Lyrics.jpg" },
    {
        songTitle: "/Songs/Sami_sami.mp3",
        songImage: "/SongAlbum/sami_sami.jpg",
    },
    {
        songTitle: "/Songs/War_Ap_Dhillon.mp3",
        songImage: "/SongAlbum/war192.jpg",
    },
    {
        songTitle: "/Songs/har_har_sambhu.mp3",
        songImage: "/SongAlbum/Har-Har-Shambhu-Shiv-Mahadeva.jpg",
    },
    {
        songTitle: "/Songs/rata lambiya.mp3",
        songImage: "/SongAlbum/Raataan-Lambiyan.jpg"
    },
];

loadSong(currIndex);
let HtmlPlayList =`<h1>Playlist</h1>`;
songLists.forEach((list, playlistIndex)=>{
    HtmlPlayList +=`<div class="playlist my-2  bg-white " id="songIndex${playlistIndex}" onclick="playlistSong(${playlistIndex})">
                <div class="d-block">
                    <img src="${list.songImage}" id="playlistImage" width="40px " height="40px" alt="" >
                </div>
                <div>
                    ${list.songTitle}
                </div>             
        </div>`

        playlistContainor.innerHTML = HtmlPlayList; 

    
})
let temp = 0;
let current 
let next =0;
function playlistSong (playlistIndex){
    console.log("PlaylistSong click" + playlistIndex)
    currIndex = playlistIndex;
    loadSong(currIndex)
    // 
    
    current = temp;
    next = playlistIndex
    temp = next
    if(!audio.paused){
        document.getElementById("songIndex"+current).classList.remove('play-list','text-white')
        document.getElementById("songIndex"+next).classList.add('play-list','text-white')
    }else{
        playSong()
        document.getElementById("songIndex"+current).classList.remove('play-list','text-white')
        document.getElementById("songIndex"+next).classList.add('play-list','text-white')
    }
    
    
}


// songLists.forEach((songList, index) => {
//     currSong = songList.songTitle;
//     currImage = songList.songImage;
//     loadSong(currSong,currImage);
// });
function next_Song() {
    if(suffleActive){
        isSuffleActive();
        playlistSong(currIndex)
    }
    else if(repeatOne){
        currIndex = currIndex;
        loadSong(currIndex);
        playlistSong(currIndex)
    }else{
        if (currIndex < songLists.length - 1) {
            currIndex = currIndex + 1;
            loadSong(currIndex);
            playlistSong(currIndex)
        } else {
            currIndex = 0;
            loadSong(currIndex);
            playlistSong(currIndex)

        }
    }
    playSong();
    playbutton.classList.remove("fa-play-circle");
    playbutton.classList.add("fa-pause-circle");
}

function prev_Song() {
    if(suffleActive){
        isSuffleActive();
        playlistSong(currIndex)
    }else if(repeatOne){
        currIndex = currIndex;
        loadSong(currIndex);
        playlistSong(currIndex)
    }else
        if(currIndex > 0) {
            currIndex = currIndex - 1;
            loadSong(currIndex);
            playlistSong(currIndex)

        }else {
            currIndex = songLists.length - 1;
            loadSong(currIndex);
            playlistSong(currIndex)

    }

    playSong();
    playbutton.classList.remove("fa-play-circle");
    playbutton.classList.add("fa-pause-circle");
}
function resetValue() {
    Progress.value = 0;
    audio.currentTime = 0

}


// *********DEFAULT TIME WHEN OPEN MUSIC APPLICATION*********

function loadSong(currIndex) {
    playingSong = songLists[currIndex].songTitle
    Tape_Image.src = songLists[currIndex].songImage

    audio.src = playingSong;

}

function playSong() {
    audio.play();
    playbutton.classList.remove("fa-play-circle");
    playbutton.classList.add("fa-pause-circle");
}


audio.addEventListener("loadedmetadata", function () {


    marqTitle.innerHTML = songLists[currIndex].songTitle
    Progress.value = 0
    StartTime.innerHTML = "0:00";

    document.getElementById("StartTime").innerHTML = "0:00";
    endTime = parseInt(audio.duration);

    const MinuteInLast = parseInt(endTime / 60);
    const SecondInLast = endTime % 60;

    //     
    // curTime = curTime/endTime * 100;
    console.log(MinuteInLast + " Minutes ");
    console.log(SecondInLast + " Seconds ");
    document.getElementById("EndingTime").innerHTML = MinuteInLast + ":" + SecondInLast;
},
    false
);

// *************TIME UPADTE DISPLAYED WHEN PLAY SONG**************

audio.addEventListener("timeupdate", () => {
    curTime = parseInt(audio.currentTime)
    Progress.value = (curTime / endTime * 100)
    // console.log(curTime + " "+ endTime + "TIMEEEEEEEEEEEE")

    MinuteInStart = parseInt(curTime / 60);
    SecondInStart = parseInt(curTime % 60);



    if (SecondInStart <= 9) {
        SecondInStart = "0" + SecondInStart;
    }
    if (Progress.value == 100) {
        // tape.classList.remove("tapeRotate");
        // playbutton.classList.remove("fa-pause-circle");
        // playbutton.classList.add("fa-play-circle");
    }

    StartTime.innerHTML = MinuteInStart + ":" + SecondInStart;
    if (Progress.value == 100) {
        if(suffleActive){
            next_Song();
        }else if(repeatOne){
            next_Song();
        }
        else{
            next_Song();
            
        }
    }
});

// *************TIME UPADTE & DISPLAYED WHEN MOVE PROGRESSBAR OF MSUIC**************

Progress.addEventListener("change", () => {
    audio.currentTime = (Progress.value * audio.duration) / 100;
    curTime = parseInt(audio.currentTime);

    MinuteInStart = parseInt(curTime / 60);
    SecondInStart = parseInt(curTime % 60);

    if (SecondInStart <= 9) {
        SecondInStart = "0" + SecondInStart;
    }

    if (Progress.value == 100) {
        tape.classList.remove("tapeRotate");
        playbutton.classList.remove("fa-pause-circle");
        playbutton.classList.add("fa-play-circle");
    }

    StartTime.innerHTML = MinuteInStart + ":" + SecondInStart;
});

playbutton.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        tape.classList.add("tapeRotate");

        playbutton.classList.remove("fa-play-circle");
        playbutton.classList.add("fa-pause-circle");
        document.getElementById("songIndex"+next).classList.add('play-list','text-white')
        // document.getElementById("songIndex"+current).classList.remove('play-list','text-white')

    } else {
        audio.pause();
        tape.classList.remove("tapeRotate");
        playbutton.classList.remove("fa-pause-circle");
        playbutton.classList.add("fa-play-circle");
        document.getElementById("songIndex"+next).classList.remove('play-list','text-white')


    }
});

VolumeProgress.addEventListener("change", () => {
    console.log(VolumeProgress.value + " PROGESS VALUE");

    let volume = (1 * VolumeProgress.value) / 100;
    audio.volume = volume;
    console.log(volume + " AUDIO VOLUME");
})

//************   SUFFLE/RANDOM PLYA SONG ********* */

SuffleRepeat.addEventListener('click', () => {

    if (repeatAll) {
        console.log("suffle")
        suffleActive = true;
        repeatOne = false;
        repeatAll = false;
        SuffleRepeat.classList.remove('fa-repeat')
        SuffleRepeat.classList.add('fa-random')
        SuffleRepeat.innerHTML = '';


        // isSuffleActive()
    }else if(suffleActive){
        console.log("One active")
        repeatOne = true;
        suffleActive = false;
        repeatAll = false;
        SuffleRepeat.classList.remove('fa-random')
        SuffleRepeat.classList.add('fa-repeat')
        SuffleRepeat.innerHTML = '1';

    }else{
        console.log("repeat all active")
        repeatAll = true;
        suffleActive = false;
        repeatOne = false;
        SuffleRepeat.classList.remove('fa-random')
        SuffleRepeat.classList.add('fa-repeat')
        SuffleRepeat.innerHTML = '';
    }
})

function isSuffleActive() {
    {
        currIndex = Math.floor(Math.random() * songLists.length)
        console.log(currIndex)
        loadSong(currIndex)
    }
    
}

playlistButton.addEventListener('click', ()=>{
    if(!ShowPlaylist){
        console.log("DISPLAY NONE")
        playlistContainor.classList.add('ShowHidePlayList')
        ShowPlaylist = true
    }else{
        console.log("DISPLAY SHOW")
        playlistContainor.classList.remove('ShowHidePlayList')
        ShowPlaylist = false
    }
})

//************   REAPEAT ONE PLYA SONG ********* */


