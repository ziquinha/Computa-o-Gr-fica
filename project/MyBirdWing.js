import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdWing extends CGFobject {
	constructor(scene, isLeft) {
		super(scene);
		this.initBuffers(isLeft);
	}
	
	initBuffers(isLeft) {
		var tempVert1 = [
			// Upper side
			2.5, 3, 0, // 0
			-1, 3, 0,  // 1
			1, 3, 4,   // 2
			3, 3, 4,   // 3
			-1, 3, 12,  // 4

			//Lower side
			2.5, 2.5, 0,
			3, 2.5, 4,
		]

		this.vertices = [];

		var axis = 'x';

		(tempVert1).forEach(element => {
			if(axis == 'z'){
				if(isLeft){
					this.vertices.push(-1 * element);
				}
				else{
					this.vertices.push(element);
				}
				axis = 'x';
			}

			else if(axis == 'x'){
				this.vertices.push(element);
				axis ='y';
			}
			else{
				this.vertices.push(element);
				axis ='z';
			}
		});

		this.indices = [
			0, 1, 2,
			0, 2, 3,
			2, 4, 3,

			0, 3, 6,
			6, 5, 0,
			3, 4, 6,

			2, 1, 5,
			6, 2, 5,
			6, 4, 2,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
