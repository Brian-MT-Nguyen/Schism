class Dog extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
  
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setOrigin(0.5);

        this.running = false;
        this.jumping = false;
    }

    create() {
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('sol', { frames: [0, 1, 2, 3, 4] }),
            frameRate: 8,
            repeat: -1
        });
    }

    update() {
        this.setVelocityX(this.scene.player.body.velocity.x);

        // Have Dog follow player
        if(this.body.velocity.x > 0) {
            this.body.setOffset(100,0);
            if(!this.running) {
                this.running = true;
                this.flipX = false;
                this.play('run');
            }
            if(this.x < this.scene.player.x + 50) {
                this.setVelocityX(this.scene.player.body.velocity.x + 200);
            }
            if(this.x > this.scene.player.x + 50) {
                this.setVelocityX(this.scene.player.body.velocity.x - 200);
            }
        }
        else if(this.body.velocity.x < 0) {
            this.body.setOffset(100,0);
            if(!this.running) {
                this.running = true;
                this.flipX = true;
                this.play('run');
            }
            if(this.x > this.scene.player.x - 50) {
                this.setVelocityX(this.scene.player.body.velocity.x - 200);
            }
            if(this.x < this.scene.player.x - 50) {
                this.setVelocityX(this.scene.player.body.velocity.x + 200);
            }
        }
        else if(this.body.velocity.x == 0  && this.running){
            this.body.setOffset(0,0);
            this.running = false;
            this.stop();
            this.setTexture("solBase");
        }

        // If player can't move then dog no move
        if(this.scene.player.body.enable == false) {
            this.body.enable = false;
        } else {
            this.body.enable = true;
        }
    }
}