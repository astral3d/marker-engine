export class Creature{
    constructor(){
        this.ready = new Promise((resolve, reject)=>{
            resolve();
        });
    }
    
    defaultValues(){
        
    }
    
    act(){
        
    }
    
    model(){
        //generate an InstancedMesh from the mesh
    }
    
    volume(){
        //the physics body for this creature
    }
}