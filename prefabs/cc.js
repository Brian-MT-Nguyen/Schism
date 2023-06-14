class cc extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y){
        super(scene, x, y);

        //this.rect = scene.add.rectangle(2560 * 0.15, 1920 * 0.65, 2560 *0.5 , 1920 * 0.1, 0x222021).setOrigin(0).setAlpha(.75);

        this.rect = scene.add.rectangle(2560 * 0.15, 1920 * 0.65, 2560 *0.5 , 1920 * 0.1, 0x222021).setOrigin(0).setAlpha(.75);

        //this.text = scene.add.text(this.rect.x, 1920 * 0.65, "N/A");
    }


    update() {
        let aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //this.rect.x = x;
        /* this.lPress.x = this.scene.cameras.main.x + (300);
        this.lPress.y = this.scene.cameras.main.y + (980);

        this.rPress.x = this.scene.cameras.main.x + (100);
        this.rPress.y = this.scene.cameras.main.y + (980);

        this.uPress.x = this.scene.cameras.main.x + (1820);
        this.uPress.y = this.scene.cameras.main.y + (980); */

        if(aKey.isDown){

        }
    }

}