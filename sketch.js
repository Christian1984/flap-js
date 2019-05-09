

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const BOUNDS_THICKNESS = 20;
const BIRD_RADIUS = 10;

const PIPE_WIDTH = 40;
const PIPE_MIN_GAP = 80;
const PIPE_MAX_GAP = 160;
const PIPE_MIN_DISTANCE = 100;
const PIPE_MAX_DISTANCE = 200;
const PIPE_VELOCITY = 3;

const GRAVITY = 0.0981;
const FLAP_FORCE = 4;

let pipes;
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

    pipes = [];
    pipes.push(new Pipe());

    bird = new Bird(0.1 * width, 0.5 * height);

    renderer.addShowable(floor);
    renderer.addShowable(ceiling);

    for (let pipe of pipes)
    {
        renderer.addShowable(pipe);
    }

    renderer.addShowable(bird);
}

function draw() 
{
    for (let pipe of pipes)
    {
        pipe.update();
    }

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