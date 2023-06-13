class UI extends Phaser.Physics.Arcade.Sprite {
    //2560, 1920
    //
    /* constructor(left, right, up, time, interact, mute, fullscreen) {
        super(left, right, up, time, interact, mute, fullscreen)
    } */

    constructor(scene, arrow, follow){
        super(scene, arrow, follow);

        //left
        this.lPress = scene.add.sprite(2560 * .2,1920 * .7,arrow).setScale(0.12);
        this.lPress.setScrollFactor(0)
        //this.lPress.main.startFollow(follow);

        //right
        this.rPress = scene.add.sprite(2560 * .05,1920 * .7,arrow).setScale(0.12)
        this.rPress.flipX=true;

        //up
        this.uPress = scene.add.sprite(2560 * .125,1920 * .7,arrow).setScale(0.12)
        this.uPress.angle += 270;

        
        //dscene.physics.world.enable(this);
        // /this.setOrigin(0.1).setScale(0.8);
    }

    

    update() {

    }
}