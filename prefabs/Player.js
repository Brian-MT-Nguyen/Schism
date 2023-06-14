class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
  
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setOrigin(0.5).setScale(0.8);

        //testing
        this.rect = scene.add.rectangle(2560 * 0.25, 1920 * 0.46, 2560 *0.25 , 1920 * 0.1, 0x222021).setOrigin(0).setAlpha(.75);
        this.rect.setScrollFactor(0);

        this.text = scene.add.text(this.rect.x + 330, (1920 * 0.51), "").setOrigin(0.5,0.5)
        .setStyle({ fontSize: 100 });
        this.text.setScrollFactor(0);
      
        this.moving = false;
        this.jumping = false;
    }

    create(mc) {
        // Animation set

        // Idle animation
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('luneIdle', { frames: [0, 1, 2, 3] }),
            frameRate: 4,
            repeat: -1
        });

        // Run animation
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('luneRun', { frames: [0, 1, 2, 3] }),
            frameRate: 8,
            repeat: -1
        });

        // Jump animation
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('luneJump', { frames: [0, 1, 2, 3] }),
            frameRate: 4
        });

        // Play idle on load
        this.play('idle');

        // Player hitbox
        this.playerInteractBox = this.scene.physics.add.sprite(this.x, this.y, this.texture).setOrigin(0.5).setScale(0.8);
        this.playerInteractBox.visible = false;
        this.playerInteractBox.body.immovable = true;
        this.playerInteractBox.body.allowGravity = false;

        // Be able to listen to 2 touch inputs
        this.scene.input.addPointer(2);
        
        // Get mobile controls
        let mobileControls = mc;
        let leftButton = mobileControls[0];
        let rightButton = mobileControls[1];
        let jumpButton = mobileControls[2];
        let timeButton = mobileControls[3];
        let intButton = mobileControls[4];

        // Interact based on button input
        // POINTEROVER EVENTS
        leftButton.on('pointerover', () =>
        {
            this.text.setText("walking");
            this.setVelocityX(-500);
            this.flipX = true;
            if(!this.jumping) {
                this.play('run');
            }
            this.moving = true;
            this.playerInteractBox.body.setSize(555,600);
            this.playerInteractBox.body.setOffset(-200,0);
        });

        rightButton.on('pointerover', () =>
        {
            this.text.setText("walking");
            this.setVelocityX(500);
            this.flipX = false;
            if(!this.jumping) {
                this.play('run');
            }
            this.moving = true;
            this.playerInteractBox.body.setSize(555,600);
            this.playerInteractBox.body.setOffset(0,0);
        });

        jumpButton.on('pointerover', () =>
        {
            if(this.body.touching.down) {
                this.jumping = true;
                this.text.setText("jumping");
                this.setVelocityY(-1000);
                this.stop();
                this.play('jump');
                this.scene.time.delayedCall(1000, () => {
                    this.jumping = false;
                    if(!this.moving) {
                        this.text.setText("");
                        this.stop();
                        this.play('idle');
                    } else {
                        this.text.setText("walking");
                        this.play('run');
                    }
                })
            }
        });

        // POINTEROUT EVENTS
        leftButton.on('pointerout', () =>
        {
            this.moving = false;
            this.play('idle');
            this.text.setText("");
        });

        rightButton.on('pointerout', () =>
        {
            this.moving = false;
            this.play('idle');
            this.text.setText("");
        });
    }

    update() {
        // Interact hitbox follows player
        this.playerInteractBox.x = this.x;
        this.playerInteractBox.y = this.y;

        // While not moving idle player
        if(!this.moving) {
            this.setVelocityX(0);
        }
    }
}