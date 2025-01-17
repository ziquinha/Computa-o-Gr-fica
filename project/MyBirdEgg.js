import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyNest } from "./MyNest.js";

export class MyBirdEgg extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks, scale, floorY, randomLoc, randomRot) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.scale = scale;
    this.pos = randomLoc ? this.getEggPlacement(floorY) : [0,0,0];
    this.angles = randomRot ? this.getEggAngles() : [0,0,0];
    this.isDropping = false;
    this.dropIncrement = 0;
    this.eggDefaultPos = [0,0,0];
		this.eggAngle=-100*Math.PI/180;
    this.dropIntervalDivs = 40;
    this.speedX;
    this.speedY;
    this.g = -0.5;
    
    this.texture = new CGFtexture(scene, "images/egg.jpg");
    this.appearance = new CGFappearance(scene);
    this.appearance.setAmbient(0.6, 0.6, 0.6, 1.0);
    this.appearance.setDiffuse(0.6, 0.6, 0.6, 1.0);
    this.appearance.setSpecular(0, 0, 0, 1.0);
    this.appearance.setShininess(10.0);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.initBuffers();
  }

  beginDrop(initPos, angle, speed){
    this.isDropping = true;
    this.pos[0] = initPos[0];
    this.pos[1] = initPos[1];
    this.pos[2] = initPos[2];
    this.angles[1] = angle;
    this.speedX = speed;
    console.log(this.scene.nest);
  }

  bePickedUp(){
    this.eggDefaultPos = [-2.5, 1, 0];
    this.angles = [0, 0, this.eggAngle];
  }

  getEggPlacement(floorY){
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min;
    }
    return([rand(-20, 80), floorY, rand(30, 140)])
  }

  getEggAngles(){
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min;
    }
    return([rand(0, 360)*Math.PI/180, rand(0, 360)*Math.PI/180, rand(0, 360)*Math.PI/180])
  }

  update(){
    if(this.isDropping){
      this.dropIncrement += this.g;
      this.pos[1] += this.dropIncrement;
      this.pos[0] += this.speedX * Math.cos(this.angles[1]); //X
      this.pos[2] -= this.speedX * Math.sin(this.angles[1]); //Z
    }
    if(this.pos[1] <= this.scene.nest.pos[1]){
      this.isDropping = false;
    }
  }

  simulateDrop(pos, angleY, speed){
    var finalPos = [...pos];
    var increment = 0;
    while(finalPos[1] > this.scene.nest.pos[1]){
      increment += this.g;
      finalPos[1] += increment;
      finalPos[0] += speed * Math.cos(angleY); //X
      finalPos[2] -= speed * Math.sin(angleY); //Z
    }
    return finalPos;
  }


  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    var textmaplatitude = 0;
    var textmaplongitude = 0;
  
    var textmaplongpart = 1/this.longDivs;
    var textmaplatpart = 1/this.latDivs;
    var scaler = this.latDivs/10;
    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      textmaplongitude=0;
      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi * scaler;
        var z = Math.sin(-theta) * sinPhi;
        this.vertices.push(x, y, z);

        //--- Texture coordinates
        this.texCoords.push(textmaplongitude,textmaplatitude);
        
        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        // To be done... 
        // May need some additional code also in the beginning of the function.
        textmaplongitude+=textmaplongpart;
        
      }
      if(scaler>1.1)
        scaler-=1/20;

      phi += phiInc;
      textmaplatitude+=textmaplatpart;
    }

        
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display(){
    this.appearance.apply();
    this.scene.translate(this.pos[0],this.pos[1], this.pos[2]);
    var rotateX = [
			1.0, 0.0, 0.0, 0.0, 
			0.0, Math.cos(this.angles[0]), Math.sin(this.angles[0]), 0.0,
			0.0, -Math.sin(this.angles[0]), Math.cos(this.angles[0]), 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
    var rotateY = [
			Math.cos(this.angles[1]), 0.0, -Math.sin(this.angles[1]), 0.0,
			0.0, 1.0, 0.0, 0.0,
			Math.sin(this.angles[1]), 0.0, Math.cos(this.angles[1]), 0.0,
			0.0, 0.0, 0.0, 1.0,
		];
    var rotateZ = [
			Math.cos(this.angles[2]), Math.sin(this.angles[2]), 0.0, 0.0,
			-Math.sin(this.angles[2]), Math.cos(this.angles[2]), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0,
		];

    this.scene.multMatrix(rotateY);
    this.scene.translate(this.eggDefaultPos[0],this.eggDefaultPos[1], this.eggDefaultPos[2]);
    this.scene.multMatrix(rotateX);
    this.scene.multMatrix(rotateZ);
    super.display();
  }
}
