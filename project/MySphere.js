import { CGFobject } from '../lib/CGF.js';

export class MySphere extends CGFobject {
  constructor(scene, slices, stacks, scale, invert = false) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.scale = scale;
    this.invert = invert;

    this.initBuffers();
  }

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

    var textmaplongpart = 1 / this.longDivs;
    var textmaplatpart = 1 / this.latDivs;

    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      textmaplongitude = 0;
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;
        this.vertices.push(this.scale * x,this.scale * y,this.scale * z);

        this.texCoords.push(textmaplongitude, textmaplatitude);

        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;

          if (this.invert) {
            this.indices.push(current + 1, next, current);
            this.indices.push(current + 1, next + 1, next);
          } else {
            this.indices.push(current, next, current + 1);
            this.indices.push(next, next + 1, current + 1);
          }
        }

        this.normals.push(x, y, z);
        theta += thetaInc;

        textmaplongitude += textmaplongpart;
      }
      phi += phiInc;
      textmaplatitude += textmaplatpart;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}