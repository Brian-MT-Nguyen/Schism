class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
  
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setOrigin(0.5).setScale(0.8);
        this.moving = false;
    }

    create(mc) {
        // Get mobile controls
        let mobileControls = mc;
        let leftButton = mobileControls[0];
        let rightButton = mobileControls[1];
        let jumpButton = mobileControls[2];

        // Interact based on button input
        this.scene.input.on('gameobjectdown', (pointer, gameObject) =>
        {
            if(gameObject == leftButton) {
                this.setVelocityX(-500);
                this.moving = true;
            }
            if(gameObject == rightButton) {
                this.setVelocityX(500);
                this.moving = true;
            }
            if(gameObject == jumpButton && this.body.touching.down) {
                this.setVelocityY(-1000);
            }
        });
        this.scene.input.on('gameobjectout', (pointer, gameObject) =>
        {
            this.moving = false;
        });
    }

    update() {
        

        // Get desktop keyboard controls
        let aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        let moving = false;

        // // Iterate over active pointers
        // this.scene.input.manager.pointers.forEach(pointer => {
        //     if (pointer.isDown) {
        //         moving = true;
        //         // Check mobile control bounds for each active pointer
        //         if (mobileControls[0].getBounds().contains(pointer.x, pointer.y)) {
        //             this.setVelocityX(500);
        //         }

        //         else if (mobileControls[1].getBounds().contains(pointer.x, pointer.y)) {
        //             this.setVelocityX(-500);
        //         }
        //         if (mobileControls[2].getBounds().contains(pointer.x, pointer.y) && this.body.touching.down) {
        //             this.setVelocityY(-1000);
        //         }
        //     } 
        // });

        // Handle movement based on the keys events
        if(!this.moving) {
            if (aKey.isDown) {
                this.setVelocityX(-500);
            } 
            else if (dKey.isDown) {
                this.setVelocityX(500);
            } else {
                this.setVelocityX(0);
            }
        }
        
        if (spaceKey.isDown && this.body.touching.down) {
            this.setVelocityY(-1000);
        }
    }
}