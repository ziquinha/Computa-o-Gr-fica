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
			0.5,0.5,0.5,
			0.5,0.5,-0.5,
			-0.5,0.5,-0.5,
			-0.5,0.5,0.5,
			0.5,-0.5,0.5,
			0.5,-0.5,-0.5,
			-0.5,-0.5,-0.5,
			-0.5,-0.5,0.5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0,4,5,
			0,5,1,
			1,5,6,
			1,6,2,
			2,6,7,
			2,7,3,
			0,3,7,
			0,7,4,
			1,2,3,
			1,3,0,
			7,6,5,
			7,5,4
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}