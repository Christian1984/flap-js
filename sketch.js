

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const BOUNDS_THICKNESS = 20;
const BIRD_RADIUS = 10;

const POPULATION_SIZE = 1000;
const NN_SIZE_IN = 5;
const NN_SIZE_HIDDEN = 10;
const NN_SIZE_OUT = 1;
const MUTATION_RATE = 0.01;

const PIPE_WIDTH = 40;
const PIPE_MIN_GAP = 140;
const PIPE_MAX_GAP = 200;
const PIPE_MIN_DISTANCE = 400;
const PIPE_MAX_DISTANCE = 600;
const PIPE_VELOCITY = 3;

const GRAVITY = 0.1;
const FLAP_FORCE = 4;

let pipes;
let renderer;
let floor;
let ceiling;
let birds;
let hud;

let birdsX;

let pipesPassedLastRun = 0;
let pipesPassedRecord = 0;
let generation = 0;
let generationFramesAlive = 0;
let alive = 0;
let warning = 0;

let brains;

let inputDiv;
let sliderRenderCount;
let checkBoxLimitFramerate;

function setup() 
{
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    frameRate(60);

    birdsX = 0.1 * width;
    restart();

    inputDiv = createDiv("");
    sliderRenderCount = createSlider(0, POPULATION_SIZE, POPULATION_SIZE / 10, 1);
    sliderRenderCount.parent(inputDiv);
    checkBoxLimitFramerate = createCheckbox("Limit Frame Rate", true);
    checkBoxLimitFramerate.parent(inputDiv);
}

function draw() 
{
    generationFramesAlive++;
    alive = 0;

    if (checkBoxLimitFramerate.checked())
    {
        frameRate(60);
    }
    else
    {
        frameRate(1024);
    }

    let nextPipe = nextPipeId();
    let npx = nextPipeX(nextPipe);
    let npg = nextPipeGap(nextPipe);

    for (let i = 0; i < POPULATION_SIZE; i++)
    {
        let bird = birds[i];

        if (bird.alive)
        {

            let input = [
                bird.pos.y / height,
                bird.vel.y / width,
                npx / width,
                npg.top / height,
                npg.bottom / height
            ];

            if (brains[i].predict(input) >= 0)
            {
                bird.flap();
            }

            bird.update();
            alive++;
        }
    }
    
    pipes.update();
    renderer.render(sliderRenderCount.value());

    if (alive == 0)
    {
        restart();
    }
}

function restart()
{
    generation++;
    
    if (brains)
    {
        cloneAndMutateBrains();
    }
    else
    {
        initBrains();
    }
    
    renderer = new Renderer();
    
    floor = new Bounds(true, BOUNDS_THICKNESS);
    ceiling = new Bounds(false, BOUNDS_THICKNESS);
    
    pipes = new Pipes();
    pipes.spawnPipe();
    renderer.addShowable(pipes);
    
    renderer.addShowable(floor);
    renderer.addShowable(ceiling);
    
    initBirds();
    
    hud = new Hud();
    renderer.addHud(hud);

    generationFramesAlive = 0;
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
    let nextGenBrains = [];
    
    let totalFitness = 0;
    
    let bestBrainIndex = 0;
    let bestBrainFramesAlive = 0;
    let bestBrainFitness = 0;

    let mostPipesPassed = 0;

    for (let i = 0; i < birds.length; i++)
    {
        let fitness = birds[i].framesAlive 
            * birds[i].framesAlive 
            * birds[i].framesAlive;
        totalFitness += fitness;

        if (fitness > bestBrainFitness)
        {
            bestBrainFitness = fitness;
            bestBrainFramesAlive = birds[i].framesAlive;
            bestBrainIndex = i;
        }

        let pipesPassed = birds[i].pipesPassed;

        if (pipesPassed > mostPipesPassed)
        {
            mostPipesPassed = pipesPassed;
            mostPipesPassedIndex = i;
        }
    }

    pipesPassedLastRun = mostPipesPassed;
    
    if (pipesPassedLastRun > pipesPassedRecord)
    {
        pipesPassedRecord = pipesPassedLastRun;
    }
    
    //let s = "Cloning brains for generation " + generation + "\n==================================\n";
    
    for (let i = 0; i < brains.length - 1; i++)
    {
        let brainIndex = pickWeightedRandomBrain(totalFitness);
        let clonedBrain = brains[brainIndex].clone(); //TODO: pick brain randomly but weighted by fitness
        let mutationCount = clonedBrain.mutate(MUTATION_RATE);

        //s += "Mutated " + mutationCount + " weights for brain " + i + "\n";

        nextGenBrains.push(clonedBrain);
    }

    //console.log(s);
    

    console.log("Best Brain: " + bestBrainIndex + " with Fitness " + bestBrainFitness + " and livespan of " + bestBrainFramesAlive + " ticks");
    console.log(JSON.stringify(brains[bestBrainIndex].dump()));

    nextGenBrains.push(brains[bestBrainIndex].clone());

    brains = nextGenBrains;
}

function pickWeightedRandomBrain(totalFitness)
{
    let runningSum = 0;
    let rand = random(totalFitness);

    for (let j = 0; j < brains.length; j++)
    {
        runningSum += birds[j].framesAlive 
            * birds[j].framesAlive
            * birds[j].framesAlive;
        if (rand < runningSum)
        {
            //console.log("Picked brain", j);
            return j;
        }
    }
}

function initBirds()
{
    birds = [];

    for (let i = 0; i < POPULATION_SIZE; i++)
    {
        let bird = new Bird(birdsX, 0.5 * height, pipes, i);

        if (generation > 1 && i == POPULATION_SIZE - 1)
        {
            bird.best = true;
        }

        birds.push(bird);
        renderer.addShowable(bird, true);
    }
}

function nextPipeId()
{
    for (let i = 0; i < 2; i++)
    {
        if (pipes.pipes.length == i)
        {
            return undefined;
        }
        
        let distance = pipes.pipes[i].pos.x - (birdsX + BIRD_RADIUS);

        if (distance >= 0)
        {
            return i;
        }
    }

    return undefined;
}

function nextPipeX(nextPipeId)
{
    if (nextPipeId === undefined)
    {
        return 100000;
    }

    return pipes.pipes[nextPipeId].pos.x;
}

function nextPipeGap(nextPipeId)
{
    if (nextPipeId === undefined)
    {
        return 0;
    }

    return pipes.pipes[nextPipeId].gap;
}

/*function keyPressed()
{
    if (keyCode == 32)
    {
        bird.flap();
    }
}*/