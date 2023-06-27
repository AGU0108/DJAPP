song = "";
song2 = "";

song1_status = "";
song2_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload(){

  song = loadSound("happy_song.mp3");
  song2 = loadSound("HP.mp3");

}

function setup(){
    canvas = createCanvas(600,600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is OK!!');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

       

        leftWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.rightWrist.y;
    }
}

function draw(){
    image(video, 0, 0, 600, 600);

    song1_status = song.isPlaying();
    song2_status = song2.isPlaying();


    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);

        song2.stop();

        if(song1_status == false)
        {
            song.play();
            document.getElementById("song").innerHTML = "Playing - Happy Song";

        }

    }

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY,20);

        song.stop();

        if(song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";

        }

    }
  
}

     function play(){
         song.play();
         song.setVolume(1);
         song.rate(1.5)
     }


