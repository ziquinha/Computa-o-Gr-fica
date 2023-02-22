import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

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

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.triangleSmall = new MyTriangleSmall(this);
    this.triangleBig = new MyTriangleBig(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayMyDiamond = true;
    this.displayMyTriangle = true;
    this.displayMyParallelogram = true;
    this.displayMyTriangleSmall = true;
    this.displayMyTriangleBig = true;

    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
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

    this.setDefaultAppearance();

    this.pushMatrix();

    // ---- BEGIN Primitive drawing section

    // 1 - Diamond
    var translate = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      -1/Math.SQRT2, -3/Math.SQRT2, 0.0, 1.0,
    ];
    var rotate = [
      Math.cos(45 * Math.PI/180), -1 * Math.sin(45 * Math.PI/180), 0.0, 0.0,
      Math.sin(45 * Math.PI/180),  Math.cos(45 * Math.PI/180), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];
    this.multMatrix(translate);
    this.multMatrix(rotate);
    if (this.displayMyDiamond) this.diamond.display();
    this.popMatrix();
    this.pushMatrix();

    // 2 - Big Triangle 1
    rotate = [
      Math.cos(-135 * Math.PI/180), Math.sin(135 * Math.PI/180), 0.0, 0.0,
      Math.sin(-135 * Math.PI/180),  Math.cos(-135 * Math.PI/180), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];
    this.multMatrix(rotate);
    if (this.displayMyTriangleBig) this.triangleBig.display();
    this.popMatrix();
    this.pushMatrix();

    // 3 - Big Triangle 2
    rotate = [
      Math.cos(45 * Math.PI/180), Math.sin(-45 * Math.PI/180), 0.0, 0.0,
      Math.sin(45 * Math.PI/180),  Math.cos(45 * Math.PI/180), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];
    translate = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      2, 0.0, 0.0, 1.0,
    ];
    this.multMatrix(rotate);
    this.multMatrix(translate);
    if (this.displayMyTriangleBig) this.triangleBig.display();
    this.popMatrix();
    this.pushMatrix();

    // 4 - Small Triangle 1
    rotate = [
      Math.cos(-135 * Math.PI/180), Math.sin(135 * Math.PI/180), 0.0, 0.0,
      Math.sin(-135 * Math.PI/180),  Math.cos(-135 * Math.PI/180), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];
    translate = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      3/Math.SQRT2, -3/Math.SQRT2, 0.0, 1.0,
    ];
    this.multMatrix(translate);
    this.multMatrix(rotate);
    if (this.displayMyTriangleSmall) this.triangleSmall.display();
    this.popMatrix();
    this.pushMatrix();

    // 5 - Parallelogram
    var flip = [
      1.0, 0.0, 0.0, 0.0,
      0.0, -1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];
    rotate = [
      Math.cos(-135 * Math.PI/180), Math.sin(135 * Math.PI/180), 0.0, 0.0,
      Math.sin(-135 * Math.PI/180),  Math.cos(-135 * Math.PI/180), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];
    this.multMatrix(rotate);
    this.multMatrix(flip);
    if (this.displayMyParallelogram) this.parallelogram.display();
    this.popMatrix();
    this.pushMatrix();

    // 6 - Triangle
    rotate = [
      Math.cos(180 * Math.PI/180), Math.sin(-180 * Math.PI/180), 0.0, 0.0,
      Math.sin(180 * Math.PI/180),  Math.cos(180 * Math.PI/180), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];
    translate = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      -1.0, 1.0 + Math.SQRT2, 0.0, 1.0,
    ];
    this.multMatrix(translate);
    this.multMatrix(rotate);
    if (this.displayMyTriangle) this.triangle.display();
    this.popMatrix();
    this.pushMatrix();

    // 7 - Small Triangle 1
    translate = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      -1.0, 2.0 + Math.SQRT2, 0.0, 1.0,
    ];
    this.multMatrix(translate);
    if (this.displayMyTriangleSmall) this.triangleSmall.display();

    // ---- END Primitive drawing section
  }
}
