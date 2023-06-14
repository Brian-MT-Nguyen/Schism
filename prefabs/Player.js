class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
  
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setOrigin(0.5).setScale(0.8);
    }

    update(mc) {
        // Get mobile controls
        let mobileControls = mc;
      
        // Get desktop keyboard controls
        let aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      
        // Initialize movement flags
        let isLeftKeyPressed = false;
        let isRightKeyPressed = false;
        let isJumpKeyPressed = false;
      
        // Iterate over active pointers
        this.scene.input.manager.pointers.forEach(pointer => {
          if (pointer.isDown) {
            // Check mobile control bounds for each active pointer
            if (mobileControls[0].getBounds().contains(pointer.x, pointer.y)) {
              isRightKeyPressed = true;
            } else if (mobileControls[1].getBounds().contains(pointer.x, pointer.y)) {
              isLeftKeyPressed = true;
            } else if (mobileControls[2].getBounds().contains(pointer.x, pointer.y)) {
              isJumpKeyPressed = true;
            }
          }
        });
      
        // Handle movement based on the keys or touch events
        if (aKey.isDown || isLeftKeyPressed) {
          this.setVelocityX(-500);
        } else if (dKey.isDown || isRightKeyPressed) {
          this.setVelocityX(500);
        } else {
          this.setVelocityX(0);
        }
      
        if ((spaceKey.isDown || isJumpKeyPressed) && this.body.touching.down) {
          this.setVelocityY(-1000);
        }
      }
      
}