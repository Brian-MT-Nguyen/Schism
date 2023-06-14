class cc extends Phaser.Physics.Arcade.Sprite {

    constructor(scene){
        super(scene);

        //this.rect = scene.add.rectangle(2560 * 0.15, 1920 * 0.65, 2560 *0.5 , 1920 * 0.1, 0x222021).setOrigin(0).setAlpha(.75);

        //this.rect = scene.add.rectangle(2560 * 0.3  , 1920 * 0.65, 2560 *0.2 , 1920 * 0.1, 0x222021).setOrigin(0).setAlpha(.75);
        this.rect = scene.add.rectangle(2560 * 0.25, 1920 * 0.46, 2560 *0.25 , 1920 * 0.1, 0x222021).setOrigin(0).setAlpha(.75);
        this.rect.setScrollFactor(0);

        this.text = scene.add.text(this.rect.x + 230, (1920 * 0.49), "N/A")
        .setStyle({ fontSize: 100 });
        this.text.setScrollFactor(0);
    }


    update() {
        //this.rect.x = x;
        this.rect.x = this.scene.cameras.main.x + (600);
        this.rect.y = this.scene.cameras.main.y + (300);


        this.text.x = this.scene.cameras.main.x + (0);
        this.text.y = this.scene.cameras.main.y + (0);


        // Get desktop keeb controls
        let aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //movement
        if (aKey.isDown || leftKey)
        {
            this.setVelocityX(-500);
        }
        else if (dKey.isDown || rightKey)
        {
            console.log("walking sound");//sadsa
        }
        else {
            this.setVelocityX(0);
        }

        if ((spaceKey.isDown || jumpKey) && this.body.touching.down)
        {
            this.setVelocityY(-1000);
        }
    }
}