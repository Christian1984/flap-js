class Hud extends Showable
{
    constructor(bird)
    {
        super();
        this.bird = bird;
    }

    show()
    {
        fill(0);
        textSize(12);
        text("Pipes Passed (Current / Last / Best): " + bird.pipesPassed + " / " + pipesPassedLastRun + " / " + pipesPassedRecord + ", Frames Alive: " + bird.framesAlive + ", Framerate: " + frameRate().toFixed(), 3, 15);
    }
}