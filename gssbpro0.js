/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/697891

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss



const textToWrite = "MUD press";
const SEGMENTS    = 200;

//auto start variables
let centerX, centerY, fontSize, INNER_RADIUS, RADIUS_VARIATION;

function setup() {
	createCanvas(windowWidth, windowHeight);
	centerX = windowWidth/2;
	centerY = windowHeight/2;
	
	let screenPct = min(height, width) / 1000;
	fontSize = screenPct * 150;
	INNER_RADIUS = screenPct * 200;
	RADIUS_VARIATION = screenPct * 200;
	
	textFont('Helvetica');
	textSize(fontSize);
}

//code adapted from @GoToLoop
//generates a circular noise with perfect looping
//https://forum.processing.org/one/topic/how-to-make-perlin-noise-loop.html
function pointForIndex(pct) {
	const NOISE_SCALE       = 1.5;
  let angle = pct * TWO_PI;
  let cosAngle = cos(angle);
  let sinAngle = sin(angle);
  let time = frameCount / 100;
  let noiseValue = noise(NOISE_SCALE * cosAngle + NOISE_SCALE, NOISE_SCALE * sinAngle + NOISE_SCALE, time);
  let radius = INNER_RADIUS + RADIUS_VARIATION * noiseValue;
  return {
		x: radius * cosAngle + centerX,
		y: radius * sinAngle + centerY
	};
}

function draw() {
  background(5000);
	fill(80);
  noStroke();
	
	//draw sphere
	beginShape();
		for (let i = 0; i < SEGMENTS; i++) {
			let p0 = pointForIndex(i/SEGMENTS);
                                   
			vertex(p0.x, p0.y);
		}
	endShape(CLOSE);
	
	//draw text
	let pct = atan2(mouseY - centerY, mouseX - centerX) / TWO_PI;//follow mouse
	//let pct = 0.5;//dont follow mouse
	let pixToAngularPct = 1/((INNER_RADIUS+RADIUS_VARIATION/2)*TWO_PI);
	for (var i = 0; i < textToWrite.length; i++) {
		let charWidth = textWidth(textToWrite.charAt(i));
		pct += charWidth/2 * pixToAngularPct;
		
		//calculate angle
		let leftP = pointForIndex(pct-0.01);
		let rightP = pointForIndex(pct+0.01);
		let angle = atan2(leftP.y - rightP.y, leftP.x - rightP.x) + PI;
		
		push();
			let p = pointForIndex(pct);
			//apply angle
			translate(p.x, p.y);
				rotate(angle);
			translate(-p.x, -p.y);
		
			text(textToWrite.charAt(i), p.x-charWidth/2, p.y);
		pop();
		
		pct += charWidth/2 * pixToAngularPct;
	}//for
}

******************/
let footprints = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(245, 222, 179);  // Use a "wheat" color to simulate dry mud
}

function draw() {
    background(245, 222, 179);

    // Check if the mouse is clicked, then create new footprint
    if (mouseIsPressed) {
        let newFootprint = new Footprint(mouseX, mouseY);
        footprints.push(newFootprint);
    }

    // Display all footprints
    for (let i = footprints.length-1; i >= 0; i--) {
        footprints[i].display();
        footprints[i].fade();
        if(footprints[i].isGone()){
            footprints.splice(i,1);
        }
    }
}

class Footprint {
    constructor(x, y) {
        this.x = x //+ random(-5,5);  // Add a random offset to simulate the irregularity of stepping in mud
        this.y = y //+ random(-5,5);
        this.alpha = 255;  // Initial transparency
    }

    display() {
        //draw footprint
        push();
        noStroke();
        fill(139, 69, 19, this.alpha);  // Use a "saddlebrown" color to simulate wet mud
        translate(this.x, this.y);

        beginShape();
        vertex(0,22);
        vertex(5,23 );
        vertex( 10,22);
        vertex(12,20.5 );
        vertex(14,17.5 );
        vertex( 14,10);
        vertex(12,6 );
        vertex(10,3 );
        vertex( 8,0.5);
        vertex( 5,-4);
        vertex(4.5,-6);
        vertex( 5,-10);

        vertex(6,-12.5);
        vertex(10,-19.5);
        vertex(11.5,-24.5);
        vertex( 12,-30);
        vertex(11,-32.5);
        vertex(10,-34);
        vertex(7.5,-35.5);
        vertex(4.5,-36.5);
        vertex(2,-37);
        vertex(0,-36.5);

        vertex(-4,-34);
        vertex(-6,-31.5);
        vertex(-7.6,-28);
        vertex(-8,-22.5);
        vertex(-8.5,-19);
        vertex(-12.5,-10);
        vertex(-15.5,4);
        vertex(-15,10);
        vertex(-13.5,14);
        vertex(-12,16);
        vertex(-9,19);
        vertex( -5,21);
        vertex(-2,22);
        endShape(CLOSE);



        ellipse(13, 30, 14, 14);  // Draw heel of footprint
        ellipse(2.7, 29.5, 11, 11);  // Draw heel of footprint
        ellipse(-5, 28, 9, 9);  // Draw heel of footprint
        ellipse(-11, 25, 7, 7);  // Draw heel of footprint
        ellipse(-15.5, 20, 6, 6);  // Draw heel of footprint

        pop();
    }

    // This function gradually decreases the footprint's transparency
    fade() {
        this.alpha -= 0.2;
        // As the footprint dries, change its color to match the background
        if(this.alpha < 127){
            fill(245, 222, 179, this.alpha);
        }
    }

    // This function checks if the footprint is completely faded
    isGone() {
        return this.alpha < 0;
    }
}
