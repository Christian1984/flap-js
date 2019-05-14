class Layer
{
    constructor(size)
    {
        this.size = size;
    }

    process(input)
    {
        if (input < -1)
        {
            return -1;
        }
        else if (input > 1)
        {
            return 1;
        }
        
        return input;
    }

    copy()
    {
        
    }
}

class NeuralNetwork
{
    constructor (sizeIn, sizeHidden, sizeOut, weightsInHidden = undefined, weightsHiddenOut = undefined)
    {
        this.in = new Layer(sizeIn);
        this.hidden = new Layer(sizeHidden);
        this.out = new Layer(sizeOut);
        
        this.weightsInHidden = weightsInHidden ? weightsInHidden : this.generateWeights(sizeIn, sizeHidden);
        this.weightsHiddenOut = weightsHiddenOut ? weightsHiddenOut : this.generateWeights(sizeHidden, sizeOut);
    }

    generateWeights(numIn, numOut)
    {
        let rows = [];

        for (let i = 0; i < numIn; i++)
        {
            let row = [];

            for (let j = 0; j < numOut; j++)
            {
                let weight = this.randomizedWeight();
                row.push(weight);
            }

            rows.push(row);
        }

        return rows;
    }

    randomizedWeight()
    {
        return random() * (random() < 0.5 ? -1 : 1);
    }

    predict(input)
    {
        if (input.length != this.in.size)
        {
            return 0;
        }

        let inOut = this.processLayer(input, this.in);
        let hiddenIn = this.processWeights(inOut, this.hidden, this.weightsInHidden);
        let hiddenOut = this.processLayer(hiddenIn, this.hidden);
        let outIn = this.processWeights(hiddenOut, this.out, this.weightsHiddenOut);
        let out = this.processLayer(outIn, this.out);

        return out;
    }

    processWeights(input, layer, weights)
    {
        if (input.length != weights.length || layer.size != weights[0].length)
        {
            console.error("processWeights: matrix does not match input and output")
            return 0;
        }

        let processed = [];

        for (let i = 0; i < layer.size; i++)
        {
            let res = 0;

            for (let j = 0; j < weights.length; j++)
            {
                res += weights[j][i] * input[j];
            }

            processed.push(res);
        }

        return processed;
    }

    processLayer(input, layer)
    {
        if (input.length != layer.size)
        {
            console.error("processNodes: input and nodes arrays do not match!")
            return 0;
        }

        let processed = [];

        for (let i = 0; i < input.length; i++)
        {
            processed.push(layer.process(input[i]));
        }

        return processed;
    }

    mutate(rate)
    {
        let totalMutations = this.mutateWeights(rate, this.weightsInHidden);
        totalMutations += this.mutateWeights(rate, this.weightsHiddenOut);
        return totalMutations;
    }

    mutateWeights(rate, weights)
    {
        let mutationsCount = 0;

        for (let i = 0; i < weights.length; i++)
        {
            for (let j = 0; j < weights[i].length; j++)
            {
                if(random() < rate)
                {
                    weights[i][j] = this.randomizedWeight();
                    mutationsCount++;
                }
            }
        }

        return mutationsCount;
    }

    clone()
    {
        let ihWeightsClone = this.cloneWeights(this.weightsInHidden);
        let hoWeightsClone = this.cloneWeights(this.weightsHiddenOut);

        let nnClone = new NeuralNetwork(this.in.size, this.hidden.size, this.out.size, ihWeightsClone, hoWeightsClone);
        
        return nnClone;
    }

    cloneWeights(weights)
    {
        let rows = [];

        for (let i = 0; i < weights.length; i++)
        {
            let row = [];

            for (let j = 0; j < weights[i].length; j++)
            {
                row.push(weights[i][j]);
            }

            rows.push(row);
        }

        return rows;
    }

    dump()
    {
        return {
            numIn: this.in.size,
            numHidden: this.hidden.size,
            numOut: this.out.size,
            weightsInHidden: this.weightsInHidden,
            weightsHiddenOut: this.weightsHiddenOut
        };
    }
}