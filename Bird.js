class Bird extends GameObject
{
    update()
    {
        if (!this.alive)
        {
            return;
        }

        super.update();
        this.acc.y = GRAVITY;

        if (!this.inBounds())
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
}