class CoreGameplay extends Phaser.Scene {
    preload() {
        //characters
        this.load.path = '../assets/character/';
        this.load.image('lunebase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');


        //levels
        this.load.path = '../assets/levels/';
        this.load.image('office', 'officeLvlPast.png');
    }
    
    create() {
        // Create background
        let bg = this.add.image(0, 0, 'office').setOrigin(0);

        // Create Player
        this.player = this.physics.add.sprite(300, 700, 'lunebase').setOrigin(0.5).setScale(0.8);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        // Create floor
        this.floor = this.add.rectangle(0, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        //create world bounds
        this.worldbounds = this.add.group();
        this.lWall = this.add.rectangle(-100,0,100,1920).setOrigin(0);
        this.physics.add.existing(this.lWall);
        this.lWall.body.allowGravity = false;
        this.lWall.body.immovable = true;
        this.worldbounds.add(this.lWall);

        this.rWall = this.add.rectangle(2560,0,100,1920).setOrigin(0);
        this.physics.add.existing(this.rWall);
        this.rWall.body.allowGravity = false;
        this.rWall.body.immovable = true;
        this.worldbounds.add(this.rWall);

        // Player Physics
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.worldbounds);


        
    }

    update() {

        //controls
        let aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        //movement
        if (aKey.isDown)
        {
            this.player.setVelocityX(-320);

            //this.player.anims.play('left', true);
        }
        else if (dKey.isDown)
        {
            this.player.setVelocityX(320);

            //this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
        }

        if (spaceKey.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-500);
        }
    }

    cameraControl(x, y, player) {
        //this.cameras.main.setBounds(0, 0, 1920 * .25, 2048);
    }
}