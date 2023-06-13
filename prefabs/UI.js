class UI extends Phaser.Physics.Arcade.Sprite {
    //2560, 1920
    //
    /* constructor(left, right, up, time, interact, mute, fullscreen) {
        super(left, right, up, time, interact, mute, fullscreen)
    } */

    constructor(scene, arrow, interact, mute, music, swap){
        super(scene, arrow, interact, mute, music, swap);

        //left
        this.lPress = scene.add.sprite(0, 0, arrow).setScale(0.12);
        this.lPress.setScrollFactor(0);

        //right
        this.rPress = scene.add.sprite(0, 0, arrow).setScale(0.12);
        this.rPress.setFlipX(true);
        this.rPress.setScrollFactor(0);

        //up
        this.uPress = scene.add.sprite(0, 0,arrow).setScale(0.12);
        this.uPress.angle += 270;
        this.uPress.setScrollFactor(0);

        
        //dscene.physics.world.enable(this);
        // /this.setOrigin(0.1).setScale(0.8);
    }

    

    update() {
        this.lPress.x = this.scene.cameras.main.x + (300);
        this.lPress.y = this.scene.cameras.main.y + (980);

        this.rPress.x = this.scene.cameras.main.x + (100);
        this.rPress.y = this.scene.cameras.main.y + (980);

        this.uPress.x = this.scene.cameras.main.x + (1820);
        this.uPress.y = this.scene.cameras.main.y + (980);
    }
}