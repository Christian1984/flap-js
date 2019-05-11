class Bounds extends GameObject
{
    constructor(isFloor, thickness)
    {
        super(0, isFloor ? height - thickness : 0);

        this.width = width;
        this.height = thickness;
    }

    show()
    {
        noStroke();
        fill(255);
        rectMode(CORNER);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }
}