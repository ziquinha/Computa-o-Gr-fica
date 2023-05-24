import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyBird } from "./MyBird.js";
import { MySphere } from "./MySphere.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBillboard } from "./MyBillboard.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.slices = 16;
    this.stacks = 8;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.sphere = new MySphere(this, this.slices,this.stacks);
    this.bird = new MyBird(this);

    this.nBirdEggs = 4;
    this.birdEggs = [];
    this.floorY = -63;
    for(let i =0; i <this.nBirdEggs; i++){
      this.birdEggs.push(new MyBirdEgg(this, this.slices,this.stacks, this.scaleFactor, this.floorY));
    }

    this.nest = new MyNest(this, this.slices,this.stacks);

    this.panoramaTexture = new CGFtexture(this, "images/panorama4.jpg"); 
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.terrain = new MyTerrain(this);
    this.billboard = new MyBillboard(this, 0,0,0);
    this.myTreeRPatch = new MyTreeRowPatch (this, 90,-40, 10);
    this.myTreeGPatch = new MyTreeGroupPatch (this,-90,-40,0);


    //Objects connected to MyInterface
    this.displayNormals = true;
    this.displayAxis = true;
    this.displaySphere = false;
    this.displayBird = true;
    this.displayBirdEggs = true;
    this.displayNest = true;
    this.displayTreeGroupPatch = true;
    this.displayTreeRowPatch = true;

    this.enableTextures(true);

    this.texture = new CGFappearance(this);
    this.texture.setAmbient(0.9, 0.9, 0.9, 1);
    this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
    this.texture.setSpecular(0.0, 0.0, 0.0, 1);
    this.texture.setShininess(10.0);
    this.texture.loadTexture('images/earth.jpg');
    this.texture.setTextureWrap('REPEAT','REPEAT');
    

    this.setUpdatePeriod(50);
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys(){
    var text="Keys pressed: ";
    var keysPressed = false;

    if(this.gui.isKeyPressed("KeyW")){
      this.bird.accelerate(this.speedFactor);
      text+=" W ";
      keysPressed = true;
    }

    if(this.gui.isKeyPressed("KeyS")){
      this.bird.accelerate(-this.speedFactor);
      text+=" S ";
      keysPressed = true;
    }

    if(this.gui.isKeyPressed("KeyA")){
      this.bird.turn(5);
      text+=" A ";
      keysPressed = true;
    }

    if(this.gui.isKeyPressed("KeyD")){
      this.bird.turn(-5);
      text+=" D ";
      keysPressed = true;
    }

    if(this.gui.isKeyPressed("KeyR")){
      this.bird.reset();
      text+=" R ";
      keysPressed = true;
    }

    if(this.gui.isKeyPressed("KeyP")){
      this.bird.beginDescent(this.floorY);
      text+=" P ";
      keysPressed = true;
    }

    if(keysPressed){
      console.log(text);
    }
  }

  update(){
    this.checkKeys();
    this.bird.update();
  }

  

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    if (this.displaySphere) {
      this.pushMatrix();
      this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      this.texture.apply();
      this.sphere.display();
      this.popMatrix();
    }

    this.panorama.display();

    // Terrain
    
    this.pushMatrix();
    this.translate(0, -100, 0); 
    this.scale(8,8,8);
    this.terrain.display();
    this.popMatrix(); 

    // ---- BEGIN Primitive drawing section
    
    if(this.displayNormals) this.bird.enableNormalViz();
    this.pushMatrix();
    if (this.displayBird) this.bird.display(this);
    this.popMatrix();

    // Display Nest
    if (this.displayNest){
      this.pushMatrix();
      this.translate(84, -67, -5); 
      this.scale(4, 4, 4);
      this.nest.display(this);
      this.popMatrix();
    }
    
    // Display Eggs
    if (this.displayBirdEggs) {
      this.birdEggs.forEach(egg => {
        this.pushMatrix();
        egg.display(this);
        this.popMatrix();
      })
    }

    this.pushMatrix();
    this.myTreeGPatch.display();
    this.popMatrix();


    this.pushMatrix();
    this.myTreeRPatch.display();
    this.popMatrix();

    // ---- END Primitive drawing section
    
  }

  
}
