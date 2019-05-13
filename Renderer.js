class Renderer
{
    constructor()
    {
        this.showables = [];
        this.players = [];
        this.hud;
    }

    addShowable(showable, isPlayer = false)
    {
        if (isPlayer)
        {
            this.players.push(showable);
        }
        else
        {
            this.showables.push(showable);
        }
    }

    addHud(hud)
    {
        this.hud = hud;
    }

    render(renderPlayersCount)
    {
        if (renderPlayersCount === undefined || renderPlayersCount != 0)
        {
            background(0, 100, 100);

            for (let showable of this.showables)
            {
                showable.show();
            }

            let count = 0;

            for (let player of this.players)
            {
                if (renderPlayersCount === undefined || count < renderPlayersCount || player.best)
                {
                    player.show();

                    if (player.alive)
                    {
                        count++;
                    }
                }
            }
        }
        else
        {
            background(255);
        }

        if (hud)
        {
            hud.show();
        }
    }
}