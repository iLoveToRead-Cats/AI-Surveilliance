objects=[];
video="";
status="";
function preload() {
    video=createVideo('video.mp4');
    video.hide();
}
function setup() {
    canvas=createCanvas(420, 270);

    canvas.position(470, 280);
}
function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i=0; i<objects.length; i++) {
            //this is probably wrong :D
            document.getElementById("number_of_objects").innerHTML="Number of Objects: "+objects.length;
            document.getElementById("status").innerHTML="Status: Objects Detected";
            
            fill('#ff0000');
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%", objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke('#ff0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start() {
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");   
    status=true;
    video.loop();
    video.volume(0);
    video.speed(1);
    //eeEEEeeEEEEEEee3eEeEeEEeeEeE
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results) 
    }
    objects=results;    
    
    
}