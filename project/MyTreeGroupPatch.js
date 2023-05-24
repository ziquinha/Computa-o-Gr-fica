import { CGFobject } from '../lib/CGF.js';
import { CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

export class MyTreeGroupPatch extends CGFobject {
    constructor(scene, x, y, z) {
        super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.treePositions = [];
        this.apps = [];
        this.initBuffers();
    }

    initBuffers() {
        this.treeTextures = ["images/billboardtree.png", "images/billboardtree2.png", "images/billboardtree3.png"];
        // Para cada textura, cria uma nova instância de CGFtexture e CGFappearance e adiciona a textura à CGFappearance.
        this.apps = this.treeTextures.map(textureUrl => {
            const texture = new CGFtexture(this.scene, textureUrl);
            const textureApp = new CGFappearance(this.scene);
            textureApp.setTexture(texture);
            return textureApp;
        });
        this.treePositions = [
            { x: -10, z: 10 },  //normal -10,10
            { x: 5, z: 35 },    // 0 ,10
            { x: 10, z: 25 },   // 10 , 10
            { x: -10, z: 0 },   //-10 , 0
            { x: -40, z: 50 },     // 0 ,0 
            { x: 15, z: 20 },    // 10 , 0
            { x: -10,z: 110 }, // -10 , -10 
            { x: 15, z: 120 },  // 0 , -120
            { x: 20, z: -60 },  // --
        ];
    }

    display() {
        const scaleX = 10;
        const scaleY = 50;
        const scaleZ = 15;

         // Para cada posição de árvore  traduz a cena para a posição correta, aplica a escala e a aparência, e exibe a árvore.
        for (let i = 0; i < this.treePositions.length; i++) {
            this.scene.pushMatrix();
            const { x, z } = this.treePositions[i];
            this.scene.translate(this.x + x, this.y, this.z + z);
            this.scene.scale(scaleX, scaleY, scaleZ);
            this.apps[i % this.apps.length].apply();
            this.scene.billboard.display();
            this.scene.popMatrix();
        }
    }
}