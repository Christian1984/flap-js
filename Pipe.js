class Pipe extends GameObject
{
    constructor()
    {
        super(width, 0);

        let gap_height = Math.round(random(PIPE_MIN_GAP / 2, PIPE_MAX_GAP / 2));
        let gap_pos = Math.round(random(gap_height + BOUNDS_THICKNESS, height - gap_height - BOUNDS_THICKNESS));

        
        this.gap = {
            top: gap_pos - gap_height,
            bottom: gap_pos + gap_height
        };

        this.vel.x = -PIPE_VELOCITY;
    }

    update()
    {
        super.update();

        if (this.pos.x + PIPE_WIDTH < 0)
        {
            this.die();
        }
    }

    show()
    {
        noStroke();
        fill(255);
        rect(this.pos.x, -5, PIPE_WIDTH, this.gap.top + 5);
        rect(this.pos.x, this.gap.bottom, PIPE_WIDTH, height - this.gap.bottom + 5);
    }
}