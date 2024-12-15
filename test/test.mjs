/* global describe:false */
import { chai } from '@environment-safe/chai';
import { it } from '@open-automaton/moka';
import { MarkerEngine, Marker } from '../src/index.mjs';
import { Worker } from '@environment-safe/esm-worker';
const should = chai.should();

//import { Vector3 } from 'three';

describe('marker-engine', ()=>{
    describe('performs a simple test suite', ()=>{
        it('initializes a lone engine', async ()=>{
            should.exist(MarkerEngine);
            should.exist(Marker);
            const avatar = new Marker();
            const engine = new MarkerEngine({
                loop:()=>{
                    
                },
                'markers':{
                    './markers/monsters': ['player', 'enemy'], // marker.mjs in dir root
                    './markers/scenery': ['wall', 'floor', 'door', 'stairs'],
                    './marker/projectiles': ['ball', 'bouncing-ball']
                },
                //todo: save the following 4 types as well
                'getTile': (layer, tileX, tileY)=>{
                    
                },
                'getMapTile': (layer, tileX, tileY, tile)=>{
                    
                },
                //todo: support manual passibilityMap
                'getTileHeightMap': (layer, tileX, tileY)=>{
                    
                },
                'getTileMarkers':(layer, tileX, tileY)=>{
                    
                }
            });
            const future = new Promise((resolve, reject)=>{
                engine.on('transition', ()=>{
                    try{
                        engine.stop();
                        resolve();
                    }catch(ex){ reject(ex); }
                });
            });
            engine.setAvatar(avatar, {x:5, y: 5});
            engine.start();
            avatar.act('travelTo', {x: 18, y: 18});
            await future;
        });
        
        it.skip('initializes a pair of simulations', async ()=>{
            const worker = new Worker('./test-assets/messaging-test.mjs', {
                inheritMap: true, 
                root: import.meta.url,
                type:'module'
            });
            await new Promise((resolve, reject)=>{
                worker.onmessage = (e)=>{
                    resolve();
                };
                worker.postMessage(JSON.stringify({
                    type: 'world',
                    world: {
                        
                    }
                }));
            });
            worker.terminate();
        });
        
    });
});

