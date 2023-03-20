import { CGFappearance, CGFobject} from '../lib/CGF.js';
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
		this.initMaterials();
		this.diamond = new MyDiamond(scene);
    	this.triangle = new MyTriangle(scene);
    	this.parallelogram = new MyParallelogram(scene);
    	this.triangleSmall1 = new MyTriangleSmall(scene);
		this.triangleSmall2 = new MyTriangleSmall(scene);
    	this.triangleBig1 = new MyTriangleBig(scene);
		this.triangleBig2 = new MyTriangleBig(scene);
	}


	enableNormalViz() {
		this.diamond.enableNormalViz();
    	this.triangle.enableNormalViz();
    	this.parallelogram.enableNormalViz();
    	this.triangleSmall1.enableNormalViz();
		this.triangleSmall2.enableNormalViz();
    	this.triangleBig1.enableNormalViz();
		this.triangleBig2.enableNormalViz();
	}

	disableNormalViz() {
		this.diamond.disableNormalViz();
    	this.triangle.disableNormalViz();
    	this.parallelogram.disableNormalViz();
    	this.triangleSmall1.disableNormalViz();
		this.triangleSmall2.disableNormalViz();
    	this.triangleBig1.disableNormalViz();
		this.triangleBig2.disableNormalViz();
	}

	initMaterials(){
		                
		this.green = new CGFappearance(this.scene);
		this.green.setAmbient(0.0,0.0,0.0,1);
		this.green.setDiffuse(0.0693, 0.770, 0.233,1.0);
		this.green.setSpecular(1,1,1,1.0);
		this.green.setShininess(10.0);

		this.yellow = new CGFappearance(this.scene);
		this.yellow.setAmbient(0.0,0.0,0.0,1);
		this.yellow.setDiffuse(0.930, 0.917, 0.130,1.0);
		this.yellow.setSpecular(1,1,1,1.0);
		this.yellow.setShininess(10.0);

		
		this.orange = new CGFappearance(this.scene);
		this.orange.setAmbient(0.0,0.0,0.0,1);
		this.orange.setDiffuse(0.930, 0.530, 0.130,1.0);
		this.orange.setSpecular(1,1,1,1.0);
		this.orange.setShininess(10.0);

	
		this.blue = new CGFappearance(this.scene);
		this.blue.setAmbient(0.0,0.0,0.0,1);
		this.blue.setDiffuse(0.0752, 0.623, 0.940,1.0);
		this.blue.setSpecular(1,1,1,1.0);
		this.blue.setShininess(10.0);


		this.pink = new CGFappearance(this.scene);
		this.pink.setAmbient(0.0,0.0,0.0,1);
		this.pink.setDiffuse(0.930, 0.493, 0.908,1.0);
		this.pink.setSpecular(1,1,1,1.0);
		this.pink.setShininess(10.0);


		this.purple = new CGFappearance(this.scene);
		this.purple.setAmbient(0.0,0.0,0.0,1);
		this.purple.setDiffuse(0.590, 0.136, 0.567,1.0);
		this.purple.setSpecular(1,1,1,1.0);
		this.purple.setShininess(10.0);

		
		this.red = new CGFappearance(this.scene);
		this.red.setAmbient(0.0,0.0,0.0,1);
		this.red.setDiffuse(0.930, 0.0372, 0.0967,1.0);
		this.red.setSpecular(1,1,1,1.0);
		this.red.setShininess(10.0);

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
		//this.green.apply();
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
		//this.orange.apply();
		this.triangleBig1.updateTexCoords([
			1, 1,
			1, 0,
			0.5, 0.5
		]);
		this.triangleBig1.display();
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
		//this.blue.apply();
		this.triangleBig2.updateTexCoords([
			0, 0,
			1, 0,
			0.5, 0.5
		]);
		this.triangleBig2.display();
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
		//this.red.apply();
		this.triangleSmall1.updateTexCoords([
			0.25, 0.75,
			0.75, 0.75,
			0.5, 0.5
		]);
		this.triangleSmall1.display();
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
		//this.yellow.apply();
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
		//this.pink.apply();
		this.triangle.display();
		scene.popMatrix();
		scene.pushMatrix();

		// 7 - Small Triangle 2
		translate = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-1.0, 2.0 + Math.SQRT2, 0.0, 1.0,
		];
		scene.multMatrix(translate);
		//this.purple.apply();
		this.triangleSmall2.updateTexCoords([
			0, 0,
			0, 0.5,
			0.25, 0.25
		]);
		this.triangleSmall2.display();
		scene.popMatrix();
		scene.pushMatrix();
	}
}
