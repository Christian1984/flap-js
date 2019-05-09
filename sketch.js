

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const BIRD_SIZE = 20;

const GRAVITY = 0.981;
const PUSH = 2;

let renderer;
let bird;

function setup() 
{
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    renderer = new Renderer();
    bird = new Bird(0.1 * width, 0.5 * height);
    renderer.addShowable(bird);
}

function draw() 
{
    bird.update();
    renderer.render();
}

function keyPressed()
{

}