let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');


let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

//audio element (we create)
let track = document.createElement('audio');

//Tracklist
let All_song = [
  {
    name: 'first song',
    path: 'audio/aud1.mp3',
    img: 'img/img1.jpg',
    singer: 'first singer'
  },

  {
    name: 'second song',
    path: 'audio/aud2.mp3',
    img: 'img/img2.jpg',
    singer: 'second singer'
  },

  {
    name: 'third song',
    path: 'audio/aud3.mp3',
    img: 'img/img3.jpg',
    singer: 'third singer'
  },

  {
    name: 'fourth song',
    path: 'audio/aud4.mp3',
    img: 'img/img4.jpg',
    singer: 'fourth singer'
  },

  {
    name: 'fifth song',
    path: 'audio/aud5.mp3',
    img: 'img/img5.jpg',
    singer: 'fifth singer'
  },
];


//All function

//function to load tracks
function load_track(index_no){
  clearInterval(timer);
  reset_slider();
  track.src = All_song[index_no].path;
  title.innerHTML = All_song[index_no].name;
  track_image.src = All_song[index_no].img;
  artist.innerHTML = All_song[index_no].singer;
  track.load();
//gives correct count on songs (1/5, 2/5, 3/5 etc)
  total.innerHTML = All_song.length;
  present.innerHTML = index_no + 1;
  timer = setInterval(range_slider , 1000);
}

load_track(index_no);



//mute sound
function mute_sound(){
  track.volume = 0;
  volume.value = 0;
  volume_show.innerHTML = 0;
}




//reset slider
function reset_slider(){
  slider.value = 0;
}

//checking to see if song is playing or not

function justplay(){
  if(playing_song==false){
    playsong();
  }else{
    pausesong();
  }
}

// function for playsong
function playsong(){
  track.play();
  playing_song = true;
  play.innerHTML = '<i class= "fa fa-pause"></i>';
}

// function for pausing song
function pausesong(){
  track.pause();
  playing_song = false;
  play.innerHTML = '<i class= "fa fa-play"></i>';
}


// function for the next_song
function next_song(){
  if (index_no < All_song.length - 1){
    index_no += 1;
    load_track(index_no);
    playsong();
  }else{
    index_no = 0;
    load_track(index_no);
    playsong();
  }
}


//go back to previous song

function previous_song(){
  if (index_no > 0){
    index_no -= 1;
    load_track(index_no);
    playsong();
  }else{
    index_no = All_song.length;
    load_track(index_no);
    playsong();
  }
}


//volume controls
function volume_change(){
  volume_show.innerHTML = recent_volume.value;
  track.volume = recent_volume.value / 100;
}


//change slider position
function change_duration(){
  slider_position = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch(){
  if (autoplay==1){
    autoplay=0;
    auto_play.style.background = "rgba(255, 255, 255, 0.2)";
  }else{
    autoplay = 1;
    auto_play.style.background = "#eb4034";
  }
}


function range_slider(){
  let position = 0;

  //update slider position
  if(!isNaN(track.duration)){
    position = track.currentTime * (100/ track.duration);
    slider.value = position;
  }

  //function will run at the end of a song
  if (track.ended){
    play.innerHTML = '<i class= "fa fa-play"></i>';
    if (autoplay==1){
      index_no += 1;
      load_track(index_no);
      playsong();
    }
  }
}
