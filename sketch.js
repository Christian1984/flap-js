

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const BOUNDS_THICKNESS = 20;
const BIRD_RADIUS = 10;

const PIPE_WIDTH = 40;
const PIPE_MIN_GAP = 80;
const PIPE_MAX_GAP = 160;
const PIPE_MIN_DISTANCE = 250;
const PIPE_MAX_DISTANCE = 400;
const PIPE_VELOCITY = 3;

const GRAVITY = 0.1;
const FLAP_FORCE = 4;

let pipes;
let renderer;
let floor;
let ceiling;
let bird;
let hud;

let pipeDistance;
let nextPipeDistance;

function setup() 
{
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    frameRate(60);
    restart();
}

function restart()
{
    renderer = new Renderer();

    floor = new Bounds(true, BOUNDS_THICKNESS);
    ceiling = new Bounds(false, BOUNDS_THICKNESS);
    
    pipes = new Pipes();
    pipes.spawnPipe();
    renderer.addShowable(pipes);

    bird = new Bird(0.1 * width, 0.5 * height, pipes);
    
    renderer.addShowable(floor);
    renderer.addShowable(ceiling);
    
    renderer.addShowable(bird);

    hud = new Hud();
    renderer.addShowable(hud);
}

function draw() 
{
    if (!bird.alive)
    {
        restart();
    }

    bird.update();
    pipes.update();
    renderer.render();
}

function keyPressed()
{
    if (keyCode == 32)
    {
        bird.flap();
    }
}