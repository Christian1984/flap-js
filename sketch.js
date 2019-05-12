

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const BOUNDS_THICKNESS = 20;
const BIRD_RADIUS = 10;

const POPULATION_SIZE = 10;
const NN_SIZE_IN = 5;
const NN_SIZE_HIDDEN = 8;
const NN_SIZE_OUT = 1;

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
let birds;
let hud;

let pipesPassedLastRun;
let pipesPassedRecord;

let brains;

function setup() 
{
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    frameRate(60);
    restart();
}

function restart()
{
    if (brains)
    {
        cloneAndMutateBrains();
    }
    else
    {
        initBrains();
    }

    
    /*
    if(bird)
    {
        pipesPassedLastRun = bird.pipesPassed;
        
        if (bird.pipesPassed > pipesPassedRecord)
        {
            pipesPassedRecord = bird.pipesPassed;
        }
    }
    else
    {
        pipesPassedLastRun = 0;
        pipesPassedRecord = 0;
    }
    */
   
    renderer = new Renderer();
   
    floor = new Bounds(true, BOUNDS_THICKNESS);
    ceiling = new Bounds(false, BOUNDS_THICKNESS);
   
    pipes = new Pipes();
    pipes.spawnPipe();
    renderer.addShowable(pipes);
    
    renderer.addShowable(floor);
    renderer.addShowable(ceiling);
    
    initBirds();

    //hud = new Hud();
    //renderer.addShowable(hud);
}

function initBrains()
{
    brains = [];

    for (let i = 0; i < POPULATION_SIZE; i++)
    {
        brains.push(new NeuralNetwork(NN_SIZE_IN, NN_SIZE_HIDDEN, NN_SIZE_OUT));
    }
}

function cloneAndMutateBrains()
{
}

function initBirds()
{
    birds = [];

    for (let i = 0; i < POPULATION_SIZE; i++)
    {
        let bird = new Bird(0.1 * width, 0.5 * height, pipes);
        birds.push(bird);
        renderer.addShowable(bird);
    }
}

function draw() 
{
    for (let i = 0; i < POPULATION_SIZE; i++)
    {
        let bird = birds[i];

        let input = [
            bird.pos.y / height,
            bird.vel.y / width,
            bird.nextPipeX() / width,
            bird.nextPipeGap().top / height,
            bird.nextPipeGap().bottom / height
        ];

        if (brains[i].predict(input) >= 0)
        {
            bird.flap();
        }

        bird.update();
    }

    pipes.update();
    renderer.render();
}

/*function keyPressed()
{
    if (keyCode == 32)
    {
        bird.flap();
    }
}*/