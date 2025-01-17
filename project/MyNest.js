import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyBirdEgg } from "./MyBirdEgg.js";

export class MyNest extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.scale = 4;
    this.pos = [84, -67, -5];
    this.eggs = [];
    this.nEggs = 0;
    this.eggPositions = [[1.5, -1, 1.5], [-1.5, -1, -1.5], [1.5, -1, -1.5], [-1.5, -1, 1.5], [0, -1, 0]];

    this.texture = new CGFtexture(scene, "images/nest.jpg");
    this.appearance = new CGFappearance(scene);
    this.appearance.setAmbient(0.6, 0.6, 0.6, 1.0);
    this.appearance.setDiffuse(0.6, 0.6, 0.6, 1.0);
    this.appearance.setSpecular(0, 0, 0, 1.0);
    this.appearance.setShininess(10.0);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.initBuffers();
  }

  setDefaultAppearance() {
    
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

    var helperY = -0.5;
    var helperXZ = 1;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);
      if(latitude > this.latDivs/2){
        helperY = 1;
        helperXZ = 1.5;
      }

      textmaplongitude=0;
      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi * helperXZ;
        var y = cosPhi * helperY;
        var z = Math.sin(-theta) * sinPhi * helperXZ;
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
      phi += phiInc;
      textmaplatitude+=textmaplatpart;
    }

        
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  putEgg(){
    var egg = new MyBirdEgg(this.scene, this.scene.slices, this.scene.stacks, this.scale, this.minHeight, false, true);
    egg.pos=this.eggPositions[this.nEggs];
    this.nEggs++;
    this.eggs.push(egg);
    
  }

  display(){
    this.scene.pushMatrix();
    this.scene.translate(...this.pos);
    this.eggs.forEach(egg => {
      this.scene.pushMatrix();
      egg.display();
      this.scene.popMatrix();
    }) 
    this.scene.scale(this.scale, this.scale, this.scale);
    this.appearance.apply();
    super.display();
    this.scene.popMatrix();
  }
}
