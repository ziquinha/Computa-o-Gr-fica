import { CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayMyDiamond').name('Display Diamond');
        this.gui.add(this.scene, 'displayMyTriangle').name('Display Triangle');
        this.gui.add(this.scene, 'displayMyParallelogram').name('Display Pllelogram');
        this.gui.add(this.scene, 'displayMyTriangleSmall').name('Display S Triangle');
        this.gui.add(this.scene, 'displayMyTriangleBig').name('Display B Triangle');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}