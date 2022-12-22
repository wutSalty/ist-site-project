var songname;

// Sets volume and title of first song if started from play/pause
window.onload = function () {
    document.getElementById("themusic").volume = 1;
    songname = document.getElementById("thefirstsong").innerHTML
}

// Listens to the audio
document.getElementById('themusic').addEventListener('pause', pauseoverride); // If music is paused
document.getElementById('themusic').addEventListener('playing', playoverride); // If music is played
document.getElementById('themusic').addEventListener('ended', songended); // If music ends

// Plays the song after selecting song
function musicplay(music) {
    if (document.getElementById("playericon").classList.contains('fa-play')) {
        document.getElementById("playericon").classList.remove('fa-play');
        document.getElementById("playericon").classList.add('fa-pause');
    };
    document.getElementById("themusic").pause();
    document.getElementById("themusic").setAttribute('src', music);
    document.getElementById("themusic").load();
    document.getElementById("themusic").play();
};

// Play/Pause button
function playpause() {
    if (document.getElementById("playericon").classList.contains('fa-play')) {   
        document.getElementById("nowplayingtext").innerHTML = songname;
        document.getElementById("themusic").play();
    } else {
        document.getElementById("themusic").pause();
    }
};

// When song ends, reset the text
function songended() {
    document.getElementById("nowplayingtext").innerHTML = "Currently paused";
    document.getElementById('run-time').innerHTML = '- - : - -';
};

// Set song name to text
function thebigthonk(event) {
    songname = event.target.innerHTML
    document.getElementById("nowplayingtext").innerHTML = songname;
}


// Calulating current audio duration and total audio duration. Then set that on text
function currentruntime() {
    var currentmin = Math.floor(document.getElementById('themusic').currentTime / 60);
    var currentsec = Math.floor(document.getElementById('themusic').currentTime - currentmin * 60);
    
    var totalmin = Math.floor(document.getElementById('themusic').duration / 60);
    var totalsec = Math.floor(document.getElementById('themusic').duration - totalmin * 60);
    
    currentmin = checktime(currentmin);
    currentsec = checktime(currentsec);
    totalmin = checktime(totalmin);
    totalsec = checktime(totalsec);
    
    document.getElementById('run-time').innerHTML = currentmin + ':' + currentsec + ' : ' + totalmin + ':' + totalsec;
}


// Adds '0' in front of number if single digit. Also prevents 'NaN' from appearing due to song load
function checktime(i) {
    if(i < 10) {
        i = '0' + i;
    } if(isNaN(i)) {
        i = '- -';
    }
    return i;
}

// When song is paused, change icon
function pauseoverride() {
    document.getElementById("playericon").classList.add('fa-play');
    document.getElementById("playericon").classList.remove('fa-pause');
}

// When song is played, change icon
function playoverride() {
    document.getElementById("playericon").classList.remove('fa-play');
    document.getElementById("playericon").classList.add('fa-pause');
}