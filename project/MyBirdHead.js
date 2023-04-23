import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdHead extends CGFobject {
	constructor(scene) {
		super(scene);
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
			4.5, 3.75, 0, //11
			3.25, 3.75, 0, //12
			4.5, 3.75, 0,   //13

			// Lower
			3.5, 2, 0,  //14
			5, 2.5, 0,  //15
			

			/*
            //Bird left side lower
			3.25, 2, 0,       //0
			3, 3, 0.5,       //1
			0.25, 1, 0.5,    //2
			1.75, 3, 1,      //3
			-1, 3, 1,         //4
			-1.25, 1.25, 0.5, //5
			-5, 3, 0,        //6

			//Bird left side upper
			2.5, 3.5, 0,       //7
			1, 3.75, 0,     //8
			-3, 3.5, 0,      //9

			//Bird underside
			0.25, 1, 0,    //10
			-1.25, 1.25, 0, //11*/
 		];

		
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
			4, 6, 13,
			4, 13, 12,

			//Lower
			0, 14, 2,
			2, 14, 9,
			9, 14, 15,
			9, 15, 10,

		];

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

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}

