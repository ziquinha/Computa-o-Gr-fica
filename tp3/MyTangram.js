import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers(scene);
	}

	initBuffers(scene) {
		this.diamond = new MyDiamond(scene);
    	this.triangle = new MyTriangle(scene);
    	this.parallelogram = new MyParallelogram(scene);
    	this.triangleSmall = new MyTriangleSmall(scene);
    	this.triangleBig = new MyTriangleBig(scene);
	}

	enableNormalViz() {
		this.diamond.enableNormalViz();
    	this.triangle.enableNormalViz();
    	this.parallelogram.enableNormalViz();
    	this.triangleSmall.enableNormalViz();
    	this.triangleBig.enableNormalViz();
	}

	disableNormalViz() {
		this.diamond.disableNormalViz();
    	this.triangle.disableNormalViz();
    	this.parallelogram.disableNormalViz();
    	this.triangleSmall.disableNormalViz();
    	this.triangleBig.disableNormalViz();
	}

	display(scene){
		scene.pushMatrix();
		// 1 - Diamond
		var translate = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-1/Math.SQRT2, -3/Math.SQRT2, 0.0, 1.0,
		];
		var rotate = [
			Math.cos(45 * Math.PI/180), -1 * Math.sin(45 * Math.PI/180), 0.0, 0.0,
			Math.sin(45 * Math.PI/180),  Math.cos(45 * Math.PI/180), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
		scene.multMatrix(translate);
		scene.multMatrix(rotate);
		this.diamond.display();
		scene.popMatrix();
		scene.pushMatrix();

		// 2 - Big Triangle 1
		rotate = [
			Math.cos(-135 * Math.PI/180), Math.sin(135 * Math.PI/180), 0.0, 0.0,
			Math.sin(-135 * Math.PI/180),  Math.cos(-135 * Math.PI/180), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
		scene.multMatrix(rotate);
		this.triangleBig.display();
		scene.popMatrix();
		scene.pushMatrix();

		// 3 - Big Triangle 2
		rotate = [
			Math.cos(45 * Math.PI/180), Math.sin(-45 * Math.PI/180), 0.0, 0.0,
			Math.sin(45 * Math.PI/180),  Math.cos(45 * Math.PI/180), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
		translate = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			2, 0.0, 0.0, 1.0,
		];
		scene.multMatrix(rotate);
		scene.multMatrix(translate);
		this.triangleBig.display();
		scene.popMatrix();
		scene.pushMatrix();

		// 4 - Small Triangle 1
		rotate = [
			Math.cos(-135 * Math.PI/180), Math.sin(135 * Math.PI/180), 0.0, 0.0,
			Math.sin(-135 * Math.PI/180),  Math.cos(-135 * Math.PI/180), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
		translate = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			3/Math.SQRT2, -3/Math.SQRT2, 0.0, 1.0,
		];
		scene.multMatrix(translate);
		scene.multMatrix(rotate);
		this.triangleSmall.display();
		scene.popMatrix();
		scene.pushMatrix();

		// 5 - Parallelogram
		var flip = [
			1.0, 0.0, 0.0, 0.0,
			0.0, -1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
		rotate = [
			Math.cos(-135 * Math.PI/180), Math.sin(135 * Math.PI/180), 0.0, 0.0,
			Math.sin(-135 * Math.PI/180),  Math.cos(-135 * Math.PI/180), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
		scene.multMatrix(rotate);
		scene.multMatrix(flip);
		this.parallelogram.display();
		scene.popMatrix();
		scene.pushMatrix();

		// 6 - Triangle
		rotate = [
			Math.cos(180 * Math.PI/180), Math.sin(-180 * Math.PI/180), 0.0, 0.0,
			Math.sin(180 * Math.PI/180),  Math.cos(180 * Math.PI/180), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
		translate = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-1.0, 1.0 + Math.SQRT2, 0.0, 1.0,
		];
		scene.multMatrix(translate);
		scene.multMatrix(rotate);
		this.triangle.display();
		scene.popMatrix();
		scene.pushMatrix();

		// 7 - Small Triangle 1
		translate = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-1.0, 2.0 + Math.SQRT2, 0.0, 1.0,
		];
		scene.multMatrix(translate);
		this.triangleSmall.display();
		scene.popMatrix();
		scene.pushMatrix();
	}
}
