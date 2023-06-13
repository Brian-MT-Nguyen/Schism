class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
  
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setOrigin(0.5).setScale(0.8);
    }

    update() {
        let aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //movement
        if (aKey.isDown)
        {
            this.setVelocityX(-500);
        }
        else if (dKey.isDown)
        {
            this.setVelocityX(500);
        }
        else {
            this.setVelocityX(0);
        }

        if (spaceKey.isDown && this.body.touching.down)
        {
            this.setVelocityY(-1000);
        }
    }

    //afaf
}