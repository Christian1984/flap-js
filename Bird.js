class Bird extends GameObject
{
    update()
    {
        super.update();
        this.acc.y = GRAVITY;
    }

    show()
    {
        ellipse(this.pos.x, this.pos.y, BIRD_SIZE, BIRD_SIZE);
    }
}