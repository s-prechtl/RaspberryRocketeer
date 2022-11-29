let obstacle: Obstacle;
let raspberry: Raspberry;
function setup() {
    createCanvas(400, 400)
    background(187)
    line(0,0, 400,400)

    raspberry = new Raspberry();
    obstacle = new Obstacle(new Pipe(new Position(width, 0), 20, 50, 0), new Pipe(new Position(width, 300), 20, 50, 0))
}

function draw() {
    background(187)
    raspberry.draw();
    raspberry.update();
    obstacle.draw();
    obstacle.update();
}
//
// function keyPressed() {
//
// }