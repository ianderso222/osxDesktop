
document.getElementById('space').style.backgroundColor = '#303030';
$("#hex").on("change keyup paste click", function(colorSwatch) {
    var updateColor = document.getElementById('hex').value;
    document.getElementById('space').style.backgroundColor = updateColor;
});
function resize() {

    var canvas = document.getElementById('canvasDiv');
    var canvasRatio = canvas.height / canvas.width;
    var windowRatio = window.innerHeight / window.innerWidth;
    var width;
    var height;

    if (windowRatio < canvasRatio) {
        height = window.innerHeight;
        width = height / canvasRatio;
    } else {
        width = window.innerWidth;
        height = width * canvasRatio;
    }

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    console.log(width + ' ' + height);
};

window.addEventListener('resize', resize, false);

// Variables for referencing the canvas and 2dcanvas context
    var canvas,ctx;

    // Variables to keep track of the mouse position and left-button status
    var mouseX,mouseY,mouseDown=0;

    // Variables to keep track of the touch position
    var touchX,touchY;
    // Keep track of the old/last position when drawing a line
   // We set it to -1 at the start to indicate that we don't have a good value for it yet
   var lastX,lastY=0;

   // Draws a line between the specified position on the supplied canvas name
    // Parameters are: A canvas context, the x position, the y position, the size of the dot
    function drawLine(ctx,x,y,brush) {
        var color = document.getElementById('hex').value;
        var brush = document.getElementById('brushSlider').value;

        // If lastX is not set, set lastX and lastY to the current position
    if (lastX==-1) {
            lastX=x;
	        lastY=y;
        }


        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
        //r=0; g=0; b=0; a=255;

        // Select a fill style
        ctx.strokeStyle = color;
        ctx.lineWidth = brush;

        // Set the line "cap" style to round, so lines at different angles can join into each other
        ctx.lineCap = "round";
        //ctx.lineJoin = "round";


        // Draw a filled line
        ctx.beginPath();

	// First, move to the old (previous) position
	ctx.moveTo(lastX,lastY);

	// Now draw a line to the current touch/pointer position
	ctx.lineTo(x,y);

        // Set the line thickness and draw the line

        ctx.stroke();

        ctx.closePath();

	// Update the last position to reference the current position
	lastX=x;
	lastY=y;
    }
    $('#clear').on('click', function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    // Draws a dot at a specific position on the supplied canvas name
    // Parameters are: A canvas context, the x position, the y position, the size of the dot
    // function drawLine(ctx,x,y,size) {
    //     // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    //     r=0; g=0; b=0; a=255;
    //     var color = document.getElementById('hex').value;
    //     var size = document.getElementById('brushSlider').value;
    //
    //     // Select a fill style
    //     ctx.fillStyle = color;
    //
    //     // Draw a filled circle
    //     ctx.beginPath();
    //     ctx.lineCap = "round";
    //     ctx.arc(x, y, size, 0, Math.PI*2, true);
    //     ctx.closePath();
    //     ctx.fill();
    //     $('#clear').on('click', function(){
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     });
    // }

    // Clear the canvas context using the canvas width and height
    function clearCanvas(canvas,ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Keep track of the mouse button being pressed and draw a dot at current location
    function sketchpad_mouseDown() {
        mouseDown=1;
        drawLine(ctx,mouseX,mouseY,12);
    }

    // Keep track of the mouse button being released
    function sketchpad_mouseUp() {
        mouseDown=0;
        lastX=-1;
        lastY=-1;
    }
    function sketchpad_touchEnd() {
    // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
    lastX=-1;
    lastY=-1;
    }

    // Keep track of the mouse position and draw a dot if mouse button is currently pressed
    function sketchpad_mouseMove(e) {
        // Update the mouse co-ordinates when moved
        getMousePos(e);

        // Draw a dot if the mouse button is currently being pressed
        if (mouseDown==1) {
            drawLine(ctx,mouseX,mouseY);
        }
    }

    // Get the current mouse position relative to the top-left of the canvas
    function getMousePos(e) {
        var rect = canvas.getBoundingClientRect();
        if (!e)
            var e = event;

        if (e.offsetX) {
            mouseX = e.offsetX ;
            mouseY = e.offsetY ;
        }
        else if (e.layerX) {
            mouseX = e.layerX ;
            mouseY = e.layerY ;
        }
     }

    // Draw something when a touch start is detected
    function sketchpad_touchStart() {
        // Update the touch co-ordinates
        getTouchPos();

        drawLine(ctx,touchX,touchY,12);

        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    }

    // Draw something and prevent the default scrolling when touch movement is detected
    function sketchpad_touchMove(e) {
        // Update the touch co-ordinates
        getTouchPos(e);

        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        drawLine(ctx,touchX,touchY,12);

        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();
    }

    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    function getTouchPos(e) {
        if (!e)
            var e = event;

        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                touchX=touch.pageX-touch.target.offsetLeft;
                touchY=touch.pageY-touch.target.offsetTop;
            }
        }
    }


    // Set-up the canvas and add our event handlers after the page has loaded
    function init() {
        // Get the specific canvas element from the HTML document
        canvas = document.getElementById('canvasDiv');

        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
        if (canvas.getContext)
            ctx = canvas.getContext('2d');

        // Check that we have a valid context to draw on/with before adding event handlers
        if (ctx) {
            // React to mouse events on the canvas, and mouseup on the entire document
            canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
            canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
            window.addEventListener('mouseup', sketchpad_mouseUp, false);

            // React to touch events on the canvas
            canvas.addEventListener('touchstart', sketchpad_touchStart, false);
            canvas.addEventListener('touchmove', sketchpad_touchMove, false);
            canvas.addEventListener('touchend', sketchpad_touchEnd, false);
        }
    }



        document.getElementById("reset").onclick = function() {
        document.getElementById("hex").value = ('#303030');
        document.getElementById("brushSlider").value = 50;
        document.getElementById('space').style.backgroundColor = '#303030';
        }; // reset slider, color values

        document.getElementById("blackBtn").onclick = function() {
        document.getElementById("hex").value = ('#303030');
        document.getElementById('space').style.backgroundColor = '#303030';
        }; // set color to black

        document.getElementById("whiteBtn").onclick = function() {
        document.getElementById("hex").value = ('#FFFFFF');
        document.getElementById('space').style.backgroundColor = '#FFFFFF';
    }; // set color to white

        document.getElementById("redBtn").onclick = function() {
        document.getElementById("hex").value = ('#FF7373');
        document.getElementById('space').style.backgroundColor = '#FF7373';
    }; // set color to red

        document.getElementById("orangeBtn").onclick = function() {
        document.getElementById("hex").value = ('#FFB473');
        document.getElementById('space').style.backgroundColor = '#FFB473';
    }; // set color to orange

        document.getElementById("yellowBtn").onclick = function() {
        document.getElementById("hex").value = ('#FFEE73');
        document.getElementById('space').style.backgroundColor = '#FFEE73';
    }; // set color to yellow

        document.getElementById("blueBtn").onclick = function() {
        document.getElementById("hex").value = ('#63B8FF');
        document.getElementById('space').style.backgroundColor = '#63B8FF';
    }; // set color to blue

        document.getElementById("greenBtn").onclick = function() {
        document.getElementById("hex").value = ('#A4FF73');
        document.getElementById('space').style.backgroundColor = '#A4FF73';
    }; // set color to green

        document.getElementById("purpBtn").onclick = function() {
        document.getElementById("hex").value = ('#D284FF');
        document.getElementById('space').style.backgroundColor = '#d284ff';
    }; // set color to purple

    $( "#dropdownArea" ).click(function() {
        $('#windowPaintMenu').toggleClass("hideMenu showMenu");
        $("#windowPaintMenu > *").click(function(e) {
                e.stopPropagation();
           });
       });
