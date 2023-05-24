import { CGFobject } from '../lib/CGF.js';
import { CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

export class MyTreeRowPatch extends CGFobject {
    constructor(scene, x, y, z) {
        super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.apps = [];
        this.treePositions = []; 
        this.initBuffers();
    }

    initBuffers() {
        this.scene.billboard = new MyBillboard(this.scene, 0, 0, 0);

        // Array de texturas
        const textures = ["images/billboardtree.png", "images/billboardtree2.png", "images/billboardtree3.png"];

         // Para cada textura, cria uma nova instância de CGFtexture e CGFappearance e adiciona a textura à CGFappearance.
        textures.forEach((textureUrl) => {
            const texture = new CGFtexture(this.scene, textureUrl);
            const app = new CGFappearance(this.scene);
            app.setTexture(texture);
            this.apps.push(app);
        });
        this.treePositions=[
            {x:10, z:-10},
            {x:15, z:-20},
            {x:20, z:25},
            {x:25, z:60},
            {x:30, z:-40},
            {x:12, z:45},
            {x:40, z:-25}
        ];
    }


    display() {
        const scaleX = 10;
        const scaleY = 50;
        const scaleZ = 15;
       // Para cada posição de árvore  traduz a cena para a posição correta, aplica a escala e a aparência, e exibe a árvore.
        for (let i = 0; i < this.treePositions.length; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.x + this.treePositions[i].x, this.y, this.z + this.treePositions[i].z);
            this.scene.scale(scaleX, scaleY, scaleZ);
            this.apps[i % this.apps.length].apply();
            this.scene.billboard.display();
            this.scene.popMatrix();
        }
    }
}