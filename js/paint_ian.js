document.getElementById('space').style.backgroundColor = '#303030';
$("#hex").on("change keyup paste click", function(colorSwatch) {
    var updateColor = document.getElementById('hex').value;
    document.getElementById('space').style.backgroundColor = updateColor;
});


// set canvas id to variable
  var canvas = document.getElementById('canvasDiv');

  // get canvas 2D context and set it to the correct size
  var ctx = canvas.getContext('2d');
  // add event listeners to specify when functions should be triggered
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mousedown', setPosition);
  canvas.addEventListener('mousedown', draw);
  canvas.addEventListener('mouseenter', setPosition);

  // last known position
  var pos = { x: 0, y: 0 };

  // new position from mouse events
  function setPosition(e) {
    pos.x = e.offsetX;
    pos.y = e.offsetY;
  }


// drawing/paint function
  function draw(e) {
    if( $(".window").hasClass("ui-draggable-dragging")) {
      console.log("off")
      return;
    }


    if (e.buttons !== 1) return; // if mouse is pressed.....

    var color = document.getElementById('hex').value;
    var brush = document.getElementById('brushSlider').value;


    ctx.beginPath(); // begin the drawing path

    ctx.lineWidth = brush; // width of line
    ctx.lineCap = 'round'; // rounded end cap
    ctx.strokeStyle = color; // hex color of line

    ctx.moveTo(pos.x, pos.y); // from position
    setPosition(e);
    ctx.lineTo(pos.x, pos.y); // to position

    ctx.stroke(); // draw it!

    $('#clear').on('click', function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });




}// end draw function


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
    document.getElementById("hex").value = ('#d284ff');
    document.getElementById('space').style.backgroundColor = '#d284ff';
}; // set color to purple

$( "#dropdownArea" ).click(function() {
    $('#windowPaintMenu').toggleClass("hideMenu showMenu");
    $("#windowPaintMenu > *").click(function(e) {
            e.stopPropagation();
       });
   });
