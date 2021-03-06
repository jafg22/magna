/**
 * Created by arch-hyperion on 17/04/16.
 */
// Most of this is all Dave Rupert
// See http://codepen.io/davatron5000/pen/uqktG

(function(){
    $(document.body).on("click", ".play-pause", function() {

        if($(this).hasClass('pausing')){
            $(this).removeClass('pausing');
            $(this).addClass('playing');
            $(this).css("background-image", "url(media/images/player/play-to-pause-faster.gif)");
            $('#main-audio')[0].play();
        }
        else if($(this).hasClass('playing')){
            $(this).removeClass('playing');
            $(this).addClass('pausing');
            $(this).css("background-image", "url(media/images/player/pause-to-play-faster.gif)");
            $('#main-audio')[0].pause();
        }
        else {
            $(this).addClass('playing');
            $(this).css("background-image", "url(media/images/player/play-to-pause-faster.gif)");
            $('#main-audio')[0].play();
        }

    });

    var pcastPlayers = document.querySelectorAll('.player-container');
    var speeds = [ 1, 1.5, 2, 2.5, 3, 0.5 ]

    for(i=0;i<pcastPlayers.length;i++) {
        var player = pcastPlayers[i];
        var audio = player.querySelector('audio');/*
         var play = player.querySelector('.play-pause.playing');
         var pause = player.querySelector('.play-pause.pausing');*/



        var progress = player.querySelector('.pcast-progress')[0];

        var currentTime = player.querySelector('.pcast-currenttime')[0];

        var currentSpeedIdx = 0;


        var toHHMMSS = function ( totalsecs ) {
            var sec_num = parseInt(totalsecs, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0"+hours; }
            if (minutes < 10) {minutes = ""+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}

            var time = hours+':'+minutes+':'+seconds;
            if (hours   <= 1) { var time = minutes+':'+seconds; }

            return time;
        };

        audio.addEventListener('loadedmetadata', function(){
            progress.setAttribute('max', Math.floor(audio.duration));
            duration.textContent  = toHHMMSS(audio.duration);
        });

        audio.addEventListener('timeupdate', function(){
            progress.setAttribute('value', audio.currentTime);
            currentTime.textContent  = toHHMMSS(audio.currentTime);
        });

        progress.addEventListener('click', function(e){
            audio.currentTime = Math.floor(audio.duration) * (e.offsetX / e.target.offsetWidth);
        }, false);



    }
})(this);



