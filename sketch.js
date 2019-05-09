

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const BOUNDS_THICKNESS = 20;
const BIRD_RADIUS = 10;

const GRAVITY = 0.0981;
const FLAP_FORCE = 4;

let renderer;
let floor;
let ceiling;
let bird;

function setup() 
{
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    renderer = new Renderer();

    floor = new Bounds(true, BOUNDS_THICKNESS);
    ceiling = new Bounds(false, BOUNDS_THICKNESS);
    bird = new Bird(0.1 * width, 0.5 * height);

    renderer.addShowable(floor);
    renderer.addShowable(ceiling);
    renderer.addShowable(bird);
}

function draw() 
{
    bird.update();
    renderer.render();
}

function keyPressed()
{
    if (keyCode == 32)
    {
        bird.flap();
    }
}