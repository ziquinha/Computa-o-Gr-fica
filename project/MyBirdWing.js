import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdWing extends CGFobject {
	constructor(scene, isLeft) {
		super(scene);

		this.texture = new CGFtexture(scene, "images/featherswing.jpg");
		this.appearance = new CGFappearance(scene);
		this.appearance.setAmbient(0.9, 0.9, 0.9, 1.0);
    	this.appearance.setDiffuse(0.6, 0.6, 0.6, 1.0);
    	this.appearance.setSpecular(0.1, 0.1, 0.1, 1.0);
    	this.appearance.setShininess(10.0);
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');

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

		var repeatedVerticesOg = [4, 5, 6];
		var repeatedVerticesOGToNew = {};

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

		var lastvert = (this.vertices.length/3) -1;

		repeatedVerticesOg.forEach(index => {
			var x = this.vertices[3*index];
			var y = this.vertices[3*index + 1];
			var z = this.vertices[3*index + 2];

			lastvert++;
			repeatedVerticesOGToNew[index] = lastvert;
			this.vertices.push(x, y, z);
		});



		this.indices = [];
		var tempIndices = [
			// Upper side
			[0, 1, 2],
			[0, 2, 3],
			[2, 4, 3],

			// Front side
			[0, 3, 9],
			[9, 8, 0],
			[3, 7, 9],
		

			// Lower side
			[2, 1, 5],
			[6, 2, 5],
			[6, 4, 2]
		];

		tempIndices.forEach(side => {
			if(isLeft){
				this.indices.push(...(side.reverse()));
			}
			else{
				this.indices.push(...side);
			}
		});

		// Finding list of normals for each side of the bird / Finding which vertices are included in which side
		var order = 0;
		var normalList = [];
		var trianglePoints = {};
		var sideIndex = 0;
		var verticesToSides = {};

		(this.indices).forEach(vertex => {
			// Add side in question to list of sides in which the vertex is contained 
			var sides = verticesToSides[vertex];
			if(sides == undefined){
				sides = [];
			}
			sides.push(sideIndex);
			verticesToSides[vertex] = sides;

			if(order == 2){
				// Calculate normal of the side;
				trianglePoints[3] = this.getCoords(vertex);
				normalList[sideIndex] = this.getNormal(trianglePoints);

				order = 0;
				sideIndex++;
			}

			else if(order == 0){
				trianglePoints[1] = this.getCoords(vertex);
				order++;
			}

			else{
				trianglePoints[2] = this.getCoords(vertex);
				order++
			}

		});

		console.log(verticesToSides);
		console.log(normalList);

		this.normals = [];

		for(const vertex of Object.keys(verticesToSides)){ // For each vertex of the bird
			var normals = [];
			for (const sideIndex of verticesToSides[vertex]){ // Iterate over the sides in which vertex is contained
				normals.push(normalList[sideIndex]); // Add that side's normal to the list of normals that apply to the vertex
			}

			this.normals.push(...this.combinedNormal(normals)) // Combine the normals of the sides into the normal of the vertex
		}

		this.texCoords = [
			0.0, 0.1,	//0
			0.0, 0.5,	//1
			0.5, 0.5,	//2
			0.5, 0.1,	//3
			1.0, 0.5,	//4
			0.0, 1.0,	//5
			0.5, 1.0,	//6
			1.0, 0.0,	//7
			0.0, 0.0,	//8
			0.5, 0.0	//9
		];
		

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	getCoords(vertexId) {
		var point = {};
		var vertexInThis = vertexId*3;

		point["x"] = this.vertices[vertexInThis]; 
		point["y"] = this.vertices[vertexInThis + 1]; 
		point["z"] = this.vertices[vertexInThis + 2]; 

		return point;
	}

	getNormal(points) {
		var normal = {};

		var vectorA = {};
		vectorA["x"] = points[2]["x"] - points[1]["x"];
		vectorA["y"] = points[2]["y"] - points[1]["y"];
		vectorA["z"] = points[2]["z"] - points[1]["z"];

		var vectorB = {};
		vectorB["x"] = points[3]["x"] - points[1]["x"];
		vectorB["y"] = points[3]["y"] - points[1]["y"];
		vectorB["z"] = points[3]["z"] - points[1]["z"];

		normal["x"] = (vectorA["y"] * vectorB["z"]) - (vectorA["z"] * vectorB["y"]);
		normal["y"] = (vectorA["z"] * vectorB["x"]) - (vectorA["x"] * vectorB["z"]);
		normal["z"] = (vectorA["x"] * vectorB["y"]) - (vectorA["y"] * vectorB["x"]);

		return normal;
	}

	combinedNormal(normalsList){
		var combinedNormal = [];
		combinedNormal[0] = 0;
		combinedNormal[1] = 0;
		combinedNormal[2] = 0;

		normalsList.forEach(normal => {
			combinedNormal[0] += normal["x"];
			combinedNormal[1] += normal["y"];
			combinedNormal[2] += normal["z"];
		});

		var mag = Math.sqrt((combinedNormal[0] * combinedNormal[0]) + (combinedNormal[1] * combinedNormal[1]) + (combinedNormal[2] * combinedNormal[2]));

		combinedNormal[0] = combinedNormal[0]/mag;
		combinedNormal[1] = combinedNormal[1]/mag;
		combinedNormal[2] = combinedNormal[2]/mag;

		return combinedNormal;
	}

	display(){
		this.appearance.apply();
		super.display();
	}
}
