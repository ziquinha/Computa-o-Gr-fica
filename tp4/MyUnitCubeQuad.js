import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";
import { CGFappearance } from "../lib/CGF.js";


/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
 export class MyUnitCubeQuad extends CGFobject {
        constructor(scene) {
            super(scene);
            this.initMaterials(scene);
            
            this.quad = new MyQuad(this.scene);

        }


        initMaterials(scene){
                        this.cubetop = new CGFappearance(scene);
            this.cubetop.setAmbient(0.1, 0.1, 0.1, 1);
            this.cubetop.setDiffuse(0.9, 0.9, 0.9, 1);
            this.cubetop.setSpecular(0.1, 0.1, 0.1, 1);
            this.cubetop.setShininess(10.0);
            this.cubetop.loadTexture('images/mineTop.png');
            this.cubetop.setTextureWrap('REPEAT', 'REPEAT');

            this.cubeside = new CGFappearance(scene);
            this.cubeside.setAmbient(0.1, 0.1, 0.1, 1);
            this.cubeside.setDiffuse(0.9, 0.9, 0.9, 1);
            this.cubeside.setSpecular(0.1, 0.1, 0.1, 1);
            this.cubeside.setShininess(10.0);
            this.cubeside.loadTexture('images/mineSide.png');
            this.cubeside.setTextureWrap('REPEAT', 'REPEAT');

            this.cubeBottom = new CGFappearance(scene);
            this.cubeBottom.setAmbient(0.1, 0.1, 0.1, 1);
            this.cubeBottom.setDiffuse(0.9, 0.9, 0.9, 1);
            this.cubeBottom.setSpecular(0.1, 0.1, 0.1, 1);
            this.cubeBottom.setShininess(10.0);
            this.cubeBottom.loadTexture('images/mineBottom.png');
            this.cubeBottom.setTextureWrap('REPEAT', 'REPEAT');


        }


        display() {
           
            // front side
            this.cubeside.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
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
            this.cubeBottom.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.scene.pushMatrix();
            this.scene.translate(0,-0.5,0);
            this.scene.rotate(90.0*Math.PI/180.0,1,0,0);
            this.quad.display();
            this.scene.popMatrix();

            //top side
            this.cubetop.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.scene.pushMatrix();
            this.scene.translate(0,0.5,0);
            this.scene.rotate(-90.0*Math.PI/180.0,1,0,0);
            this.quad.display();
            this.scene.popMatrix();
    
    
        }
    }