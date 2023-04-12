import {CGFobject} from '../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slicesN - number of slices
 * @param stacksN - number of stacks
 * @param inverted - direction of the Normals - inverted = 1 means the Normals point towards the inside of the sphere
*/
export class MySphere extends CGFobject {
	constructor(scene, slicesN, stacksN, inverted) {
		super(scene);
        this.slicesN = slicesN;
        this.stacksN = stacksN;
        this.inverted = inverted;
		this.initBuffers();
	}
	
	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
		var stackLen = 1/this.stacks;
        
        for(var i = 0; i < this.slices; i++){
            var xa=Math.sin(ang);
            var ma=Math.cos(ang);
            var count = i * (this.stacks+1);
            
			for (var t = 0; t < this.stacks+1; t++){
                var k = - stackLen * t;
                this.vertices.push(ma, -xa, k);
                // push normal once for each vertex of the two triangles
                this.normals.push(ma, -xa, 0);

                if(t != 0){
                    if(i<this.slices-1){
                        this.indices.push((count +1), (count +0), (count + this.stacks+1));
                        this.indices.push((count + this.stacks+2), (count +1), (count + this.stacks+1));
                        count += 1;
                    }
                    else{
                        this.indices.push((count +1), (count +0), (t-1) );
                        this.indices.push((t), (count +1), (t-1));
                        count += 1;
                    }
                }   
			}
            ang+=alphaAng;
        }
        


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
