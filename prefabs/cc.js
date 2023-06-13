class cc extends Phaser.Physics.Arcade.Sprite {

    constructor(scene){
        super(scene);

        this.rect = scene.add.rectangle(2560 * 0.2, 1920 * 0.5, 2560 *0.1 , 1920 * 0.05, 0xff0000).setOrigin(0);
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