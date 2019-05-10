class Pipes extends Showable
{
    constructor()
    {
        super();

        this.pipes = [];
        this.pipeDistance = 0;
        this.nextPipeDistance = 0;
    }

    spawnPipe()
    {
        this.pipeDistance = 0;
        this.nextPipeDistance = random(PIPE_MIN_DISTANCE, PIPE_MAX_DISTANCE);
        this.pipes.push(new Pipe());
    }

    update()
    {
        this.pipeDistance += PIPE_VELOCITY;

        if (this.pipeDistance >= this.nextPipeDistance)
        {
            this.spawnPipe();
        }

        for(let pipe of this.pipes)
        {
            pipe.update();

            if(!pipe.alive)
            {
                this.pipes.splice(0, 1);
            }
        }
    }

    show()
    {
        super.show();

        for (let pipe of this.pipes)
        {
            pipe.show();
        }
    }
}