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
      
        this.moving = false;
    }

    create(mc) {
        // Be able to listen to 2 touch inputs
        this.scene.input.addPointer(2);
        
        // Get mobile controls
        let mobileControls = mc;
        let leftButton = mobileControls[0];
        let rightButton = mobileControls[1];
        let jumpButton = mobileControls[2];

        // Interact based on button input
        // POINTEROVER EVENTS
        leftButton.on('pointerover', () =>
        {
            this.setVelocityX(-500);
            this.moving = true;
        });

        rightButton.on('pointerover', () =>
        {
            this.setVelocityX(500);
            this.moving = true;
        });

        jumpButton.on('pointerover', () =>
        {
            if(this.body.touching.down) {
                this.setVelocityY(-1000);
                this.moving = true;
            }
        });

        // POINTEROUT EVENTS
        leftButton.on('pointerout', () =>
        {
            this.moving = false;
        });

        rightButton.on('pointerout', () =>
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

        //While in the air play jump cc
        if(!this.body.touching.down){
            this.text.setText("jumping");
        }

        //timewarp cc
        if(eKey.isDown || timeKey){
            this.text.setText("swssh");
        }

        //shitty activatables
        
    }
}