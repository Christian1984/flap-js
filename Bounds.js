class Bounds extends GameObject
{
    constructor(isFloor, thickness)
    {
        super(-5, isFloor ? height - thickness + 5 : -5);

        this.width = width + 10;
        this.height = thickness + 5;
    }

    show()
    {
        noStroke();
        fill(255);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }
}