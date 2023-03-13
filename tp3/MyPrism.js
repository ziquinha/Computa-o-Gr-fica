
import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */ 
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices; //n de lados
		this.stacks = stacks; //n de prismas stacked
		this.initBuffers();
	}
	
	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
		var stackLen = 1/this.stacks;
        var ang2 = ang + alphaAng/2;

        var count = 0

        for(var i = 0; i < this.slices; i++){
            var xa=Math.sin(ang);
            var xaa=Math.sin(ang+alphaAng);
            var ma=Math.cos(ang);
            var maa=Math.cos(ang+alphaAng);

			for (var t = 0; t < this.stacks; t++){
				var k = - stackLen * t;
				this.vertices.push(maa, -xaa, k);
				this.vertices.push(ma, -xa, k);
				this.vertices.push(maa, -xaa, k - stackLen);
				this.vertices.push(ma, -xa, k - stackLen);

                this.indices.push((count +1), (count +0), (count +2) );
				this.indices.push((count +1), (count +2), (count +3) );
                count += 4;

                // push normal once for each vertex of the two triangles
                var s2 = Math.sin(ang2+2*alphaAng);
                var c2 = Math.cos(ang2+2*alphaAng);
                this.normals.push(s2, c2, 0);
                this.normals.push(s2, c2, 0);
                this.normals.push(s2, c2, 0);
                this.normals.push(s2, c2, 0);
			}
            ang+=alphaAng;
            ang2+=alphaAng;
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


