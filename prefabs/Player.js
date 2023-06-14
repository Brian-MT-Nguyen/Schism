class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
  
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setOrigin(0.5).setScale(0.8);

        //testing

        this.rect = scene.add.rectangle(2560 * 0.25, 1920 * 0.46, 2560 *0.25 , 1920 * 0.1, 0x222021).setOrigin(0).setAlpha(.75);
        this.rect.setScrollFactor(0);

        this.text = scene.add.text(this.rect.x + 330, (1920 * 0.51), "N/A").setOrigin(0.5,0.5)
        .setStyle({ fontSize: 100 });
        this.text.setScrollFactor(0);


    }

    update(mc) {
        // Get mobile controls
        let mobileControls = mc;
        let rightKey = this.scene.input.pointer1.isDown && mobileControls[0].getBounds().contains(this.scene.input.activePointer.x, this.scene.input.activePointer.y);
        let leftKey = this.scene.input.pointer1.isDown && mobileControls[1].getBounds().contains(this.scene.input.activePointer.x, this.scene.input.activePointer.y);
        let jumpKey = this.scene.input.pointer2.isDown && mobileControls[2].getBounds().contains(this.scene.input.activePointer.x, this.scene.input.activePointer.y);

        // Get desktop keeb controls
        let aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //movement
        if (aKey.isDown || leftKey)
        {
            this.setVelocityX(-500);
            this.text.setText("walking");
            
        }
        else if (dKey.isDown || rightKey)
        {
            this.setVelocityX(500);
            this.text.setText("walking");
        }
        else {
            this.setVelocityX(0);
            this.text.setText("...");
        }

        if ((spaceKey.isDown || jumpKey) && this.body.touching.down)
        {
            this.setVelocityY(-1000);
            
        }

        if(!this.body.touching.down){
            this.text.setText("jumping");
        }
    }
}