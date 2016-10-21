/**
 * Created by lmunoz on 10/21/16.
 */
    // Create a Paper.js Path to draw a line into it:
var path = new Path();
// Give the stroke a color
path.strokeColor = 'red';
var start = new Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
path.lineTo(start + [ 500, -50 ]);

// var path = new Pa