class Hud extends Showable
{
    show()
    {
        fill(0);
        textSize(12);
        text("Framerate: " + frameRate().toFixed(), 3, 15);
    }
}