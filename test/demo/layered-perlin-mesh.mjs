import { ValueNoise } from '../../src/perlin.mjs';
const perlin = new ValueNoise(undefined, undefined, 'perlin');
export const voxels = (x, y, depth, options={})=>{
    const posx = x*16;
    const posy = y*16;
    const layers = options.layers || [0.1, 0.2, 0.1, 0.1, 0.2, 0.3]
    const results = [];
    let result = null;
    const scale = 2.0;
    for(let row=0; row < 16; row++){
        for(let col=0; col < 16; col++){
            result = 0;
            layers.forEach((factor, index)=>{
                result += perlin.evalXY(
                    Math.floor((posx+row)/Math.pow(2, index)), 
                    Math.floor((posy+col)/Math.pow(2, index))
                ) * factor
            })
            results.push(result * scale);
        }
    }
    return results;
};