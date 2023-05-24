import {CGFobject} from '../lib/CGF.js';
import {CGFappearance,CGFtexture} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBillboard extends CGFobject {
	constructor(scene, x, y, z) {
		super(scene);
		this.x=x;
		this.y=y;
		this.z=z;
		this.initBuffers();
	}
	
	initBuffers() {
		
		this.scene.quad = new MyQuad(this.scene);
					
	}

    display(){
        
        var cameraPos = vec3.fromValues(this.scene.camera.position[0],0,this.scene.camera.position[2]);
        var toCamera = vec3.create();
        vec3.subtract(toCamera, cameraPos, vec3.fromValues(this.x, 0 , this.z));
        vec3.normalize(toCamera, toCamera);
        var angle = Math.acos(vec3.dot(toCamera, vec3.fromValues(0,0,1)));
        //eixo de rotação.
        var axis = vec3.create();
        vec3.cross(axis, vec3.fromValues(0,0,1), toCamera);
        vec3.normalize(axis,axis);

        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.scene.rotate(angle, axis[0], axis[1], 0);
        this.scene.quad.display();
        this.scene.popMatrix();
    }
}