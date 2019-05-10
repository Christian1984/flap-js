class Bird extends GameObject
{
    constructor(xPos, yPos, pipes)
    {
        super(xPos, yPos);
        this.pipes = pipes;
    }

    update()
    {
        if (!this.alive)
        {
            return;
        }

        super.update();
        this.acc.y = GRAVITY;

        if (!this.inBounds() || this.pipeCollision())
        {
            this.die();
        }

    }

    flap()
    {
        if (!this.alive)
        {
            return;
        }

        this.acc.y = -FLAP_FORCE;
    }

    show()
    {
        if (!this.alive)
        {
            return;
        }

        stroke(0);
        fill(255);
        ellipseMode(RADIUS);
        ellipse(this.pos.x, this.pos.y, BIRD_RADIUS, BIRD_RADIUS);
    }

    inBounds()
    {
        return this.pos.y - BIRD_RADIUS >= BOUNDS_THICKNESS && this.pos.y + BIRD_RADIUS <= height - BOUNDS_THICKNESS;
    }

    pipeCollision()
    {
        for (let i = 0; i < 2; i++)
        {
            if (i >= this.pipes.pipes.length)
            {
                break;
            }

            let pipe = this.pipes.pipes[i];

            if (this.pos.x + BIRD_RADIUS > pipe.pos.x && this.pos.x - BIRD_RADIUS < pipe.pos.x + PIPE_WIDTH)
            {
                if (this.pos.y - BIRD_RADIUS < pipe.gap.top || this.pos.y + BIRD_RADIUS > pipe.gap.bottom)
                {
                    return true;
                }
            }
        }

        return false;
    }
}