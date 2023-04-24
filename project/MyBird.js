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
		this.speed=0;
		this.pos = [0, 0, 0];
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
		this.pos[0] += this.speed * Math.cos(this.angleY); //X
		this.pos[2] -= this.speed * Math.sin(this.angleY); //Z
	}

	accelerate(v){
		if(this.speed+v >= 0){
			this.speed+=v;
		}
	}

	turn(degrees){
		var rad = Math.PI * degrees/180;
		this.angleY += rad;
	}

	reset(){
		this.angleY=0;
		this.speed=0;
		this.pos = [0, 0, 0];
	}

	display(){
		this.scene.pushMatrix();
		var translate = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			this.pos[0], this.pos[1], this.pos[2], 1.0,
		];
		var rotate = [
			Math.cos(this.angleY), 0.0, -Math.sin(this.angleY), 0.0,
			0.0, 1.0, 0.0, 0.0,
			Math.sin(this.angleY), 0.0, Math.cos(this.angleY), 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
		this.scene.multMatrix(translate);
		this.scene.multMatrix(rotate);
		this.body.display();
		
		this.wingRight.display();
		this.wingLeft.display();
		this.head.display();
	}

}
