class Renderer
{
    constructor()
    {
        this.showables = [];
    }

    addShowable(showable)
    {
        this.showables.push(showable);
    }

    render()
    {
        background(0, 100, 100);

        for (let showable of this.showables)
        {
            showable.show();
        }
    }
}