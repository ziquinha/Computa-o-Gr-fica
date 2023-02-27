import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

    initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,  //front left down  -0-
			0.5, -0.5, 0.5,	  //front right down -1-
			0.5, 0.5, 0.5,	  //front right up   -2-
			-0.5, 0.5, 0.5,   // front left up   -3-
            -0.5,-0.5,-0.5,   // back left down  -4-
            0.5, -0.5,-0.5,   // back right down -5-
            -0.5,0.5, -0.5,   // back left up    -6-
            0.5,0.5,-0.5      // back right up   -7-

		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            2,3,0,
            0,1,5,
            5,4,0,
            1,5,7,
            7,2,1,
            3,0,4,
            4,6,3,
            4,5,7,
            7,6,4,
            3,2,7,
            7,6,3

		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}