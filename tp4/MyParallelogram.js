import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 0, 0,	//1
			1, 1, 0,	//2
			2, 0, 0,	//3
			2, 1, 0,	//4
			3, 1, 0,	//5

			//Back side
			0, 0, 0,	//0
			1, 0, 0,	//1
			1, 1, 0,	//2
			2, 0, 0,	//3
			2, 1, 0,	//4
			3, 1, 0  	//5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1, 3,
			3, 4, 2,
			3, 5, 4,

			//Back side
			2, 1, 0,
			3, 1, 2,
			2, 4, 3,
			4, 5, 3
		];

		this.texCoords = [
			0.25, 0.75,
			0.5, 0.75,
			0.5, 1,
			0.75, 0.75,
			0.75, 1,
			1, 1
		];

		this.normals = []
		for(var i = 0; i < 6; i++){
			this.normals.push(0, 0, 1);
		}
		for(var i = 0; i < 6; i++){
			this.normals.push(0, 0, -1);
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

