var paddle1 = 10;
var paddle2 = 10;
var paddle1_x = 10;
var paddle1_height = 10;
var paddle2_y = 10;
var paddle2_height = 10;
var score1 = 0;
var score2 = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
game_status = "";

function preload()
{
    ball_touch = loadSound("ball_touch_paddel.wav")
    missed = loadSound("missed.wav")
}
function setup()
{
    var canvas = createCanvas(700,600);
    canvas.parent('canvas');
    video = createCapture(VIDEO);
    video.size(700,600);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
    console.log("model loaded");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);
    }
}
function draw()
{
    image(video, 0,0,700,600)
    if(scoreRightWrist > 0.2)
    {
        fill("red");
        stroke("red");
        circle(rightWristX,rightWristY,30);
    }
}