import {CGFobject,CGFappearance,CGFtexture,CGFshader} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';


/**
* MyPyramid
@constructor
*/
export class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene, 32);
        this.plane.initBuffers();    
        this.selectedExampleShader = 0;
		this.init();
	}

init(){	
		//shaders 
		this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(120);
		
		this.terrainTex = new CGFtexture(this.scene, "images/terrain.jpg");
		this.terrainMap = new CGFtexture(this.scene, "images/heightmap.jpg");
		this.altimetry = new CGFtexture(this.scene, "images/altimetry.png");
		this.appearance.setTexture(this.terrainTex);

		
		this.testShaders = [
					new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag"),
				];
		
		this.testShaders[0].setUniformsValues({ uSampler2: 1 });
		this.testShaders[0].setUniformsValues({ uSampler3: 2 });
    }
	
	// Show, hide shader code
	onShaderCodeVizChanged(v) {
		if (c)
			this.shadersDiv.style.display = "block";
		else
			this.shadersDiv.style.display = "none";
	}
    
	// Called when selected shader changes
	onSelectedShaderChanged(c) {
		// shader code
		this.scene.vShaderDiv.innerHTML = "<xmp>" + getStringFromUrl(this.testShaders[c].vertexURL) + "</xmp>";
		this.scene.fShaderDiv.innerHTML = "<xmp>" + getStringFromUrl(this.testShaders[c].fragmentURL) + "</xmp>";

		// scale factor
		//this.onScaleFactorChanged(this.scene.scaleFactor);
	}
		
	display() {

		this.appearance.apply(); //main app
		
        this.scene.setActiveShader(this.testShaders[0]); //set shader

		this.terrainMap.bind(1);
		this.altimetry.bind(2);	 

		this.scene.pushMatrix();
			this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
			this.scene.scale(60, 60, 1);
			this.plane.display();
		this.scene.popMatrix();
		this.scene.setActiveShader(this.scene.defaultShader);
    }

}