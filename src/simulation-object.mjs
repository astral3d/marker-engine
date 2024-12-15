//complexity: the simulation will need to map the attachment points during the animation to spawn the correct origins

//eslint-disable-next-line no-unused-vars
const loaders = {
    
};

export class SimulationObject{
    constructor(options={}){
        this.options = options;
        this.path = this.options.path;
        this.type = this.options.type;
        this.loaded = this.load();
    }
    
    states(){
        return ['idle'];
    }
    
    //by default, do nothing
    tick(){}
    
    load(){
        
    }
    
    //physics hull for simulation
    body(){
        
    }
    
    // used for 3d representations
    model(){
        
    }
    
    // used for 2d overhead
    counter(){
        
    }
    
    // used for 2d views or 2.5d views
    faceted(){
        
    }
    
}