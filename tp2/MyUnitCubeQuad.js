import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
 export class MyUnitCubeQuad extends CGFobject {
        constructor(scene) {
            super(scene);
    
            this.quad = new MyQuad(this.scene);

        }
        display() {
           
            // front side
            this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
            this.scene.popMatrix();

            // left side
            this.scene.pushMatrix();
            this.scene.translate(-0.5,0,0);
            this.scene.rotate(-90.0*Math.PI/180.0,0,1,0);
            this.quad.display();
            this.scene.popMatrix();

            // right side
            this.scene.pushMatrix();
            this.scene.translate(0.5,0,0);
            this.scene.rotate(90.0*Math.PI/180.0,0,1,0);
            this.quad.display();
            this.scene.popMatrix();

            // back side
            this.scene.pushMatrix();
            this.scene.translate(0,0,-0.5);
            this.scene.rotate(Math.PI,0,1,0);
            this.quad.display();
            this.scene.popMatrix();

            // bottom side
            this.scene.pushMatrix();
            this.scene.translate(0,-0.5,0);
            this.scene.rotate(90.0*Math.PI/180.0,1,0,0);
            this.quad.display();
            this.scene.popMatrix();

            //top side
            this.scene.pushMatrix();
            this.scene.translate(0,0.5,0);
            this.scene.rotate(-90.0*Math.PI/180.0,1,0,0);
            this.quad.display();
            this.scene.popMatrix();
    
    
        }
    }