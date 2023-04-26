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
		this.flapAngle = 0;
		this.flapDirection = 1;
		this.oscilateHeight = 0;
		this.oscilateDirection = 1;
		this.isFlying = false;
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
		if(this.isFlying){
			this.pos[0] += this.speed * Math.cos(this.angleY); //X
			this.pos[2] -= this.speed * Math.sin(this.angleY); //Z
			this.flapWings();
			this.oscilate();
		}
	}

	flapWings(){
		var change = this.flapDirection * (this.speed * Math.PI/10);
		var tempAngle = this.flapAngle + change;
		if(tempAngle > 2*Math.PI/6){
			change = tempAngle - 2*Math.PI/6;
			this.flapAngle -= change;
			this.flapDirection = -1;
		}
		else if(tempAngle < -2*Math.PI/6){
			change = tempAngle + 2*Math.PI/6;
			this.flapAngle -= change;
			this.flapDirection = 1;
		}	
		else{
			this.flapAngle += change;
		}
	}

	oscilate(){
		if(this.oscilateDirection > 0){
			this.oscilateHeight += this.oscilateDirection/5;
			if(this.oscilateHeight >= 1.5){
				this.oscilateDirection = -1;
			}
		}
		if(this.oscilateDirection < 0){
			this.oscilateHeight += 3*this.oscilateDirection/10;
			if(this.oscilateHeight <= -1.5){
				this.oscilateDirection = 1;
			}
		}
		this.pos[1] = this.oscilateHeight; //X
	}

	accelerate(v){
		this.isFlying = true;
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
		this.flapAngle = 0;
		this.flapDirection = 1;
		this.oscilateHeight = 0;
		this.oscilateDirection = 1;
		this.isFlying = false;
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
		this.head.display();

		var flapRightWing = [
			1.0, 0.0, 0.0, 0.0, 
			0.0, Math.cos(this.flapAngle), Math.sin(this.flapAngle), 0.0,
			0.0, -Math.sin(this.flapAngle), Math.cos(this.flapAngle), 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
		var flapLeftWing = [
			1.0, 0.0, 0.0, 0.0, 
			0.0, Math.cos(-this.flapAngle), Math.sin(-this.flapAngle), 0.0,
			0.0, -Math.sin(-this.flapAngle), Math.cos(-this.flapAngle), 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
		var resetX = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, -3.0, 0.0, 1.0,
		];
		var unresetX = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 3.0, 0.0, 1.0,
		];
		this.scene.multMatrix(unresetX);
		this.scene.pushMatrix();
		this.scene.multMatrix(flapRightWing);
		this.scene.multMatrix(resetX);
		this.wingRight.display();
		this.scene.popMatrix();
		this.scene.multMatrix(flapLeftWing);
		this.scene.multMatrix(resetX);
		this.wingLeft.display();
		
	}

}
