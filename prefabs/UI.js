class UI extends Phaser.Physics.Arcade.Sprite {
    //2560, 1920
    //
    /* constructor(left, right, up, time, interact, mute, fullscreen) {
        super(left, right, up, time, interact, mute, fullscreen)
    } */

    constructor(scene, left){
        super(scene, left);

        //left
        this.lPress = scene.add.sprite(2560 * .2,1920 * .7,left).setScale(0.12);

        //right
        this.rPress = scene.add.sprite(2560 * .10,1920 * .7,left).setScale(0.12)
        this.rPress.flipX=true;
        //dscene.physics.world.enable(this);
        // /this.setOrigin(0.1).setScale(0.8);
    }

    

    update() {

    }
}