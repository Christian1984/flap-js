class GameObject extends Showable
{
    constructor(xPos, yPos)
    {
        super();

        this.pos = createVector(xPos, yPos);
        this.vel = createVector();
        this.acc = createVector();

        this.alive = true;
    }

    update()
    {
        if (this.alive)
        {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
        }
    }

    show()
    {
        super.show();
    }

    die()
    {
        this.alive = false;
    }
}