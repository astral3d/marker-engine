/*
import { isBrowser, isJsDom } from 'browser-or-node';
import * as mod from 'module';
import * as path from 'path';
let internalRequire = null;
if(typeof require !== 'undefined') internalRequire = require;
const ensureRequire = ()=> (!internalRequire) && (internalRequire = mod.createRequire(import.meta.url));
//*/
//import { Worker } from '@environment-safe/esm-worker';
import { Marker, Projectile, PhysicsProjectile, Scenery, Monster } from './marker.mjs';
import { Submesh } from './submesh.mjs';
//import { Random } from '@environment-safe/random';
// import { ValueNoise } from '@environment-safe/perlin';
import { Emitter } from 'extended-emitter';
import {  } from '@environment-safe/cannon';
import { InfiniteGrid } from '@astral3d/infinite-grid';
import Logger from 'bitwise-logger';
//import log levels locally
const { 
    //if Syslog:
    //EMERGENCY, ALERT, CRITICAL, ERROR, WARNING, 
    //NOTICE, INFORMATIONAL, DEBUG 
    // If log4j: 
    //eslint-disable-next-line no-unused-vars
    FATAL, ERROR, WARN, INFO, DEBUG, TRACE
} = Logger;
//import { allTiles, neighbors, weldTreadmill, tileForPos } from './tiles.mjs';
//import { tools, enable, createWireFrameFromGeometry } from './development.mjs';
//import { generateMeshCreationFromVoxelFn } from './voxel-mesh.mjs';


import {
    Clock
} from 'three';

/**
 * A JSON object
 * @typedef { object } JSON
 */
 
 
//TODO: dynamic directional constants
 
export class MarkerEngine{
    constructor(options={}){
        this.logger = options.logger || Logger;
        if(options.debug){
            const logger = options.logger || Logger;
            logger.level = ERROR & INFO;
        }
        this.clock = new Clock();
        (new Emitter()).onto(this);
        const cellSize = 16;
        this.cellSize = cellSize;
        const radius = options.gidSize?Math.floor((options.gidSize-1)/2):3;
        this.grid = new InfiniteGrid({
            radius,
            cellSize,
            x: options.x?Math.floor(options.x/cellSize):0,
            y: options.y?Math.floor(options.y/cellSize):0
        });
    }
    
    getSubmeshes(){
        return Object.keys(this.submeshes).map((key)=> this.submeshes[key]);
    }
    
    getGroundMeshes(){
        
    }
    
    getMarkerMeshes(){
        
    }
    
    getSubmeshAt(x, y){
        //const submeshName = tileForPos(x, y);
        //if(submeshName) return this.submeshes[submeshName];
    }
    
    setAvatar(marker, position){
        this.grid.setAvatar(marker, position || marker.position);
    }
    
    addMarker(marker, position){
        this.grid.addMarker(marker, position || marker.position);
    }
    
    async initialize(preloadHandler){
        try{
            this.logger.log('marker-engine.initialize', INFO);
        }catch(ex){
            this.logger.log(`MARKER ENGINE ERROR:${ex.message}`, TRACE);
            this.logger.log(ex.stack, TRACE);
        }
    }
    
    
    
    start(){
        console.log('start');
        this.logger.log('marker-engine.start', INFO);
        this.clock.start();
        this.running = true;
        let delta = null;
        console.log('1');
        
        /*(delta)=>{
            // physics tick
            self.physicalWorld.step(delta);
            // marker actions
            try{
                let lcv=null;
                for(lcv=0; lcv < self.markers.length; lcv++){
                    self.markers[lcv].act(delta, self);
                }
            }catch(ex){
                console.log("ERR", ex)
            }
            // treadmill check + optional update
        }*/
        let loop = async ()=>{
            delta = this.clock.getDelta();
            // physics tick
            //self.physicalWorld.step(delta);
            console.log('tick');
            // 1) update marker movement
            // 2) check for transition
            const transition = this.grid.checkForTransition();
            try{
                const markers = this.grid.markers;
                let lcv=null;
                for(lcv=0; lcv < markers.length; lcv++){
                    markers[lcv].act(delta, this);
                }
            }catch(ex){
                console.log('ERR', ex);
            }
            // if so, recenter
            if(transition){
                this.grid.offset.x += transition.x;
                this.grid.offset.y += transition.y;
                const markers = this.grid.markers;
                const offsetX = transition.x * this.cellSize;
                const offsetY = transition.y * this.cellSize;
                this.grid.avatar.position.x += offsetX;
                this.grid.avatar.position.y += offsetY;
                //todo: move camera
                for(let lcv=0; lcv < markers.length; lcv++){
                    markers[lcv].position.x += offsetX;
                    markers[lcv].position.y += offsetY;
                    //todo: clamp or Z
                }
                // 3) wait for new submeshes
                //await grid.cellsLoaded();
                // 4) push new markers and submeshes into update
            }
            // 5) push marker updates onto update
            if(this.running){
                setTimeout(loop);
            }
        };
        setTimeout( loop );
    }
    
    stop(){
        this.logger.log('marker-engine.stop', INFO);
        this.running = false;
    }
    
}

export { 
    Submesh, Marker, Projectile, PhysicsProjectile, Scenery, Monster
    //, tools, enable 
};