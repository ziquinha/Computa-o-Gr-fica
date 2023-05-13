import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdHead extends CGFobject {
	constructor(scene) {
		super(scene);

		this.texture = new CGFtexture(scene, "images/feathershead.jpg");
		this.appearance = new CGFappearance(scene);
		this.appearance.setAmbient(0.9, 0.9, 0.9, 1.0);
    	this.appearance.setDiffuse(0.6, 0.6, 0.6, 1.0);
    	this.appearance.setSpecular(0.1, 0.1, 0.1, 1.0);
    	this.appearance.setShininess(10.0);
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			//Neck
			2.5, 1.5, 0,       //0 - 0
			3, 3, 0.75,        //1 - 1
			3.5, 2, 0.25,     //2
			2.5, 3.5, 0,	  //3 - 7
			3.25, 3.75, 0.5,  //4

			// Head
			3.75, 3.25, 0.75, //5
			4.5, 3.75, 0.25,   //6
			4.75, 3, 0.5,     //7 
			5, 3.25, 0,       //8
			5, 2.5, 0.25,     //9

			// Beak
			6.25, 2.5, 0,  //10

			// Upper
			4.52, 3.75, 0, //11
			3.25, 3.75, 0, //12

			// Lower
			3.5, 2, 0,  //13
			5, 2.5, 0,  //14
 		];

		var repeatedVerticesOg = [0, 10, 13, 14];
		var repeatedVerticesOGToNew = {};

		
		// Finding the vertices in the left hand side of the bird (negative z coordinate)
		var dict = {};
		var axis = 'x';
		var elem = 0;
		var x;
		var y;
		var lastvert = (this.vertices.length/3) -1;
		var vert2 = [];

		(this.vertices).forEach(element => {
			if(axis == 'z'){
				var elem2 = elem;
				if(element != 0){
					lastvert++;
					elem2 = lastvert;
					vert2.push(x, y, -1 * element);
				}
				else if(repeatedVerticesOg.includes(elem)) { // Repeated vertices => Need to be repeated fro texCoord reasons
					lastvert++;
					elem2 = lastvert;
					repeatedVerticesOGToNew[elem] = elem2;
					vert2.push(x, y, element);
				}
				dict[elem] = elem2;
				axis = 'x';
				elem++;
			}

			else if(axis == 'x'){
				x = element;
				axis ='y';
			}
			else{
				y = element;
				axis ='z';
			}
		});

		console.log(dict);

		this.vertices.push(...vert2);

		//Counter-clockwise reference of vertices
		this.indices = [
			//Side
			0, 2, 1,
			1, 4, 3,
			1, 2, 5,
			1, 5, 4,
			4, 5, 6,
			5, 2, 7,
			5, 7, 6,
			6, 7, 8,
			2, 9, 7,
			
			//Beak
			7, 9, 8,
			8, 9, 10,

			//Upper
			6, 8, 11,
			3, 4, 12,
			4, 6, 11,
			4, 11, 12,

			//Lower
			0, 13, 2,
			2, 13, 9,
			9, 13, 14,
			9, 14, 10,

		];

		// Finding the edges in the left hand side of the bird
		var ind2 = [];
		var i0;
		var i1;
		var i2;
		var order = 0;

		(this.indices).forEach(element => {
			if(order == 2){
				i2 = dict[element];
				ind2.push(i2, i1, i0);
				order = 0;
			}

			else if(order == 0){
				i0 = dict[element];
				order = 1;
			}
			else{
				i1 = dict[element];
				order = 2;
			}
		});

		this.indices.push(...ind2);

		// Finding list of normals for each side of the bird / Finding which vertices are included in which side
		order = 0;
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

		var noRepeatNormals = [];
		this.normals = [];

		for(const vertex of Object.keys(verticesToSides)){ // For each vertex of the bird
			var normals = [];
			for (const sideIndex of verticesToSides[vertex]){ // Iterate over the sides in which vertex is contained
				normals.push(normalList[sideIndex]); // Add that side's normal to the list of normals that apply to the vertex
			}
			noRepeatNormals.push(this.combinedNormal(normals)) // Combine the normals of the sides into the normal of the vertex
		}

		// Combine Normals of repeated vertices
		repeatedVerticesOg.forEach(vertex => {
			var repeatVertex = repeatedVerticesOGToNew[vertex];
			var finalNormal = this.combinedNormal([noRepeatNormals[vertex], noRepeatNormals[repeatVertex]]);
			noRepeatNormals[vertex] = finalNormal;
			noRepeatNormals[repeatVertex] = finalNormal;
		});

		noRepeatNormals.forEach(normal => {
			this.normals.push(...normal);
		})
		
		this.texCoords = [
			1.0, 1.0, 	//0
			0.7, 0.9,	//1
			0.9, 0.7,	//2
			0.6, 1.0,	//3
			0.55, 0.8,	//4
			0.65, 0.6,	//5
			0.55, 0.45,	//6
			0.7, 0.35,	//7
			0.5, 0.3,	//8
			0.8, 0.3,	//9
			0.5, 0.0,	//10
			0.5, 0.45,	//11
			0.5, 0.8, 	//12
			0.85, 0.7,	//13
			0.85, 0.3,	//14

			0.0, 1.0,	//15 rep 0
			0.3, 0.9,	//16 sim 1
			0.1, 0.7,	//17 sim 2
			0.45, 0.8,	//18 sim 4
			0.35, 0.6,	//19 sim 5
			0.45, 0.45,	//20 sim 6
			0.3, 0.35,	//21 sim 7
			0.2, 0.3,	//22 sim 9
			0.5, 0.0,	//23 rep 10
			0.15, 0.7,	//24 rep 13
			0.15, 0.3,	//25 rep 14
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	getCoords(vertexId) {
		var point = [0, 0, 0];
		var vertexInThis = vertexId*3;

		point[0] = this.vertices[vertexInThis]; 
		point[1] = this.vertices[vertexInThis + 1]; 
		point[2] = this.vertices[vertexInThis + 2]; 

		return point;
	}

	getNormal(points) {
		var normal = [0, 0, 0];

		var vectorA = [0, 0, 0];
		vectorA[0] = points[2][0] - points[1][0];
		vectorA[1] = points[2][1] - points[1][1];
		vectorA[2] = points[2][2] - points[1][2];

		var vectorB = [0, 0, 0];
		vectorB[0] = points[3][0] - points[1][0];
		vectorB[1] = points[3][1] - points[1][1];
		vectorB[2] = points[3][2] - points[1][2];

		normal[0] = (vectorA[1] * vectorB[2]) - (vectorA[2] * vectorB[1]);
		normal[1] = (vectorA[2] * vectorB[0]) - (vectorA[0] * vectorB[2]);
		normal[2] = (vectorA[0] * vectorB[1]) - (vectorA[1] * vectorB[0]);

		return normal;
	}

	combinedNormal(normalsList){
		var combinedNormal = [0, 0, 0];

		normalsList.forEach(normal => {
			combinedNormal[0] += normal[0];
			combinedNormal[1] += normal[1];
			combinedNormal[2] += normal[2];
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
