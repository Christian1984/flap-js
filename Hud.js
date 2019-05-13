class Hud extends Showable
{
    constructor()
    {
        super();
    }

    show()
    {
        fill(0);
        textSize(12);
        textAlign(LEFT, BOTTOM);
        text(
            "Generation: " + generation + 
            //", Pipes Passed (Last / Best): " + pipesPassedLastRun + " / " + pipesPassedRecord + 
            ", Birds Alive: " + alive + 
            ", Frames Alive: " + framesAlive + 
            ", Framerate: " + frameRate().toFixed(), 3, 15);
    }
}