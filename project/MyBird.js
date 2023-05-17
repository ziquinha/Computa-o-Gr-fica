import {CGFobject} from '../lib/CGF.js';
import { MyBirdWing } from "./MyBirdWing.js";
import { MyBirdBody } from "./MyBirdBody.js";
import { MyBirdHead } from "./MyBirdHead.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
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
		this.isDescending = false;
		this.isAscending = false;
		this.minHeight;
		this.heightIncrement;
		this.heightPreDescent;
		this.closeEnoughDist = 10;

		this.egg = null;

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

	enableNormalViz(){
		this.body.enableNormalViz;
	}

	update(){
		if(this.isFlying){
			this.pos[0] += this.speed * Math.cos(this.angleY); //X
			this.pos[2] -= this.speed * Math.sin(this.angleY); //Z
		}
		if(this.isDescending){
			this.pos[1] -= this.heightIncrement;
			if(this.pos[1] <= this.minHeight){
				this.isDescending = false;
				this.isAscending = true;
				var pickedUp = -1;
				if(this.egg == null){
					for(let i=0; i<this.scene.birdEggs.length; i++){
						if(pickedUp == -1 && this.closeEnough(this.scene.birdEggs[i].pos, this.pos)){
							pickedUp = i;
						}
					}

					if(pickedUp != -1){
						this.pickUpEgg(pickedUp)
					}
				}
			}
		}
		else if(this.isAscending){
			this.pos[1] += this.heightIncrement;
			if(this.pos[1] >= 0){
				this.isAscending = false;
				this.pos[1] = this.heightPreDescent;
			}
		}
		else{
			this.oscilate();
		}
		this.flapWings();
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

	beginDescent(minHeight){
		if(this.egg == null){
			this.minHeight = minHeight+2;
			this.isDescending = true;
			this.heightIncrement = -(minHeight - this.pos[1])/20;
			this.heightPreDescent = this.pos[1];
		}
	}

	closeEnough(coords1, coords2){
		var diff = 0;
		console.log(coords1);
		console.log(coords2);
		for(let i=0; i<coords1.length; i++){
			diff += (coords1[i] - coords2[i])*(coords1[i] - coords2[i])
		}
		console.log(diff);
		diff = Math.sqrt(diff);
		console.log(diff);
		if(diff < this.closeEnoughDist){
			return true;
		}
		return false;
	}

	pickUpEgg(index){
		console.log("Picking up egg # " + index);
		this.scene.removeEgg(index);
		this.egg = new MyBirdEgg(this.scene, this.scene.slices, this.scene.stacks, this.scale, this.minHeight, false);
		console.log(this.egg);
		this.egg.bePickedUp();
	}

	dropEgg(nest){
		if(this.egg != null){
			console.log("Checking")
			console.log(nest.pos);
			var simPos = this.egg.simulateDrop(this.pos, this.angleY, this.speed);
			if(this.closeEnough([simPos[0], simPos[2]], [nest.pos[0], nest.pos[2]])){
				console.log("dropping");
				this.egg.beginDrop(this.pos, this.angleY, this.speed);
			}		
		}
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
		this.isDescending = false;
		this.isAscending = false;
	}

	display(){
		if(this.egg != null && this.egg.isDropping){
			this.egg.update();
			if(this.egg.isDropping){
				this.scene.pushMatrix();
				this.egg.display();
				this.scene.popMatrix();
			}
			else{
				this.egg=null;
				this.scene.nest.putEgg();
			}
		}
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
		if(this.egg != null && !this.egg.isDropping){
			this.scene.pushMatrix();
			this.egg.display();
			this.scene.popMatrix();
		}
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
		this.scene.popMatrix();
		
	}
}
