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

        console.log(this.gap);

        this.vel.x = -PIPE_VELOCITY;
    }

    update()
    {
        super.update();
    }

    show()
    {
        noStroke();
        fill(0);
        rect(this.pos.x, 0, PIPE_WIDTH, this.gap.top);
        rect(this.pos.x, this.gap.bottom, PIPE_WIDTH, height - this.gap.bottom);
    }
}