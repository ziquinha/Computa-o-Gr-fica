import { CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";


export class MyPanorama {
    constructor(scene, texture) {
      this.scene = scene;
      this.texture = texture;
      this.material = new CGFappearance(scene);
      this.material.setEmission(1, 1, 1, 1);
      this.material.setTexture(texture);
      this.material.setTextureWrap('REPEAT', 'REPEAT');
      this.sphere = new MySphere(scene, 50, 50, 1, true); // Aqui, usamos true para criar uma esfera invertida.
    }
  
    display() {
      this.scene.pushMatrix();
      this.material.apply();
      this.scene.scale(200, 200, 200);
      this.sphere.display();
      this.scene.popMatrix();
    }
  }