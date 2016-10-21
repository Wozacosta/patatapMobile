/**
 * Created by lmunoz on 10/21/16.
 */
/* Create rectangle, used for touch/click input and will work like a giant piano
 rectangles positions on screen

 0  1
 2  3
 4  5      */

var rect = [];        /* Array of Rectangle objects */
var rectSounds = ["q", "r", "t", "i", "k", "y"];     /* Change rectangle sound by changing letter */
var soundNames = [];   /* Array of TextPoint that displays the sound name in the rectangle */
var circles = [];
var creator;          /* Me :P */

init();

function init(){
    rect[0] = new Path.Rectangle(new Point(0, 0),                                          new Point(view.size.width / 2, view.size.height / 3));
    rect[0].fillColor = '#267356';
    rect[1] = new Path.Rectangle(new Point(view.size.width / 2, 0),                        new Point(view.size.width, view.size.height / 3));
    rect[1].fillColor = '#AA7B39';
    rect[2] = new Path.Rectangle(new Point(0, view.size.height / 3),                       new Point(view.size.width / 2, view.size.height * 2 / 3));
    rect[2].fillColor = '#9A334F';
    rect[3] = new Path.Rectangle(new Point(view.size.width / 2, view.size.height / 3),     new Point(view.size.width, view.size.height * 2 / 3));
    rect[3].fillColor = '#482E74';
    rect[4] = new Path.Rectangle(new Point(0, view.size.height * 2 / 3),                   new Point(view.size.width / 2, view.size.height));
    rect[4].fillColor = '#28536C';
    rect[5] = new Path.Rectangle(new Point(view.size.width / 2, view.size.height * 2 / 3), new Point(view.size.width, view.size.height));
    rect[5].fillColor = '#FFDA00';

    /* Bind events to rectangles */
    for (var i = 0; i < rect.length; i++){
        console.log("i = " + i);
        rect[i].onMouseDown = (function(i){
            return function(event){
                var newCircle = new Path.Circle(event.point, 200);
                newCircle.fillColor = keyData[rectSounds[i]].color;
                keyData[rectSounds[i]].sound.play();
                newCircle.onMouseDown = circleMouseDown;
                circles.push(newCircle);
            };
        })(i);
    }


    /* Displays sound name in white in the rectangles */
    for (var i = 0; i < rect.length; i++){
        var pathSong = keyData[rectSounds[i]].sound._src;
        var songFile = pathSong.substring(pathSong.indexOf('/') + 1, pathSong.indexOf('.'));

        soundNames[i] = new PointText({

            point: [rect[i].position.x  - 90, rect[i].position.y - 30],
            content: songFile + "\n(click to repeat)",
            fillColor: "white",
            fontSize: 20,
            fontFamily: 'Courier New',
            shadowColor: new Color(0, 0, 0),
            shadowBlur: 12,
            shadowOffset: new Point(3, 3)
        });
        soundNames[i].onMouseDown = textMouseDown; /* Just like circles, we couldn't click on text */

    }

    creator = new PointText(new Point(60, 14));
    creator.justification = 'center';
    creator.fillColor = 'red';
    creator.content = '@wozacosta';
}


/* ---- HANDLES RESIZING OF RECTANGLES ---- */
view.onResize = function(event){
    init();
}



function onKeyDown(event){
    if(keyData[event.key]){
        var maxPoint = new Point(view.size.width, view.size.height);
        var randomPoint = Point.random();
        var point = maxPoint * randomPoint;
        var newCircle = new Path.Circle(point, 400);
        newCircle.fillColor = keyData[event.key].color;
        keyData[event.key].sound.play();
        circles.push(newCircle);
    }
}

function onFrame(event){
    for(var i = 0; i < circles.length; i++){
        circles[i].fillColor.hue += 1;
        circles[i].scale(0.98);
        if (circles[i].bounds.width < 0.01){
            circles.splice(i,1);
        }
    }
    creator.fillColor.hue +=1;
}


/* IF WE CLICK ON A CIRCLE ------ the rectangles have event handlers, but not the circles created on top of them */
function circleMouseDown(event){
    for (var i = 0; i < rect.length; i++){
        if (rect[i].contains(event.point)){
            rect[i].onMouseDown(event);
        }
    }
}


/* If we click on text ----- repeat circle+sound every second */
function textMouseDown(event){
    console.log("text mouseDown");
    for (var i = 0; i < rect.length; i++){
        if (rect[i].contains(event.point)) {
            setInterval((function (i, event) {
                return function () {
                    console.log("i = " + i);
                    rect[i].onMouseDown(event);
                }
            })(i, event), 1000);
        }

    }
}







