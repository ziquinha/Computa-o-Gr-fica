import {CGFobject} from '../lib/CGF.js';
import { MyBirdWing } from "./MyBirdWing.js";
import { MyBirdBody } from "./MyBirdBody.js";
import { MyBirdHead } from "./MyBirdHead.js";
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
	constructor(scene) {
		super(scene);
		this.angleY=0;
		this.speed=1;
		this.pos = [0, 0, 0]
		this.initBuffers();
	}
	
	initBuffers() {
		this.wingRight = new MyBirdWing(this.scene, 0);
		this.wingLeft = new MyBirdWing(this.scene, 1);
		this.body = new MyBirdBody(this.scene);
		this.head = new MyBirdHead(this.scene);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
	}

	update(){
		console.log("update");
		this.pos[0] += this.speed;
	}

	display(){
		this.scene.pushMatrix();
		var translate = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			this.pos[0], this.pos[1], this.pos[2], 1.0,
		];
		this.scene.multMatrix(translate);
		this.body.display();
		
		this.wingRight.display();
		this.wingLeft.display();
		this.head.display();
	}

}
