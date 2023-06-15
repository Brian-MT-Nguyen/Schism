class StealthPresent extends SchismScene {
    constructor() {
        super("stealthpresent", "Level3Present");
    }

    preload() {
        //characters
        this.load.path = '../assets/character/';
        this.load.image('luneSleep', 'luneSleep.png');
        this.load.image('luneBase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');
        this.load.image('enemyBase', 'enemyBaseSprite.png');
        this.load.image('enemyDisabled', 'enemyBaseSprite_disabled.png');
        this.load.spritesheet('luneIdle', 'luneIdle_spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('luneRun', 'luneRun_spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('luneJump', 'luneJump_spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('sol', 'spritesheetSol-01.png', {frameWidth: 600, frameHeight: 300});


        //levels
        this.load.path = '../assets/levels/';
        this.load.image('lvl3Pres', 'level3_present.png');

        //sound
        this.load.path = '../assets/sound/';
        this.load.audio('sound', 'sound.mp3');
        this.load.audio('bgm', 'bgm.mp3');
        this.load.audio('woof', 'woof.mp3');

        //UI
        this.load.path = '../assets/UI/';
        this.load.image('right', 'right.png');
        this.load.image('interact', 'interact.png');
        this.load.image('mute', 'mute.png');
        this.load.image('sound', 'sound.png');
        this.load.image('swap', 'swap.png');
        this.load.image('fullscreen', "fullScreen.png");

        //Interactables
        this.load.path = '../../assets/interactables/';
        this.load.image('consoleFuture', 'consoleFuture.png');
    }
    
    onEnter() {
        // Create background
        let bg = this.add.image(0, 0, 'lvl3Pres').setOrigin(0).setDepth(envDepth);

        //UI
        this.ui = new UI(this, "right", "interact", "mute", "swap", "fullscreen", "sound");
        
        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 200, 1110, 'luneSleep').setDepth(playerDepth);
        if(this.getData('x') != undefined) {
            this.player.x = this.getData('x');
        }
        if(this.getData('y') != undefined) {
            this.player.y = this.getData('y');
        }
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        // Link mobile controls to Player
        let mobileControls = [this.ui.leftButton, this.ui.rightButton, this.ui.upButton];
        this.player.create(mobileControls);

        // Create dog
        this.dog = new Dog(this, 200, this.player.y, "solBase").setDepth(dogDepth);
        this.dog.create();
        this.dog.visible = true;
        this.dog.canFollow = true;
        this.dog.flipX = true;

        // Create enemy
        this.enemy = this.physics.add.sprite(2000, 1100, 'enemyBase').setDepth(playerDepth).setScale(0.8);
        this.enemyInteractBox = this.physics.add.sprite(this.enemy.x, this.enemy.y, "enemyBase").setOrigin(0.5).setScale(0.8);
        this.enemyInteractBox.visible = false;
        this.enemyInteractBox.body.immovable = true;
        this.enemyInteractBox.body.allowGravity = false;
        this.enemyInteractBox.body.setSize(700,600);

        // Create console
        this.consoleBroke = this.physics.add.sprite(2400, 1120, "consoleFuture").setDepth(objectDepth).setScale(0.8);
        this.consoleBroke.body.allowGravity = false;
        this.consoleBroke.body.immovable = true;

        this.ui.swapButton.visible = false;
        
        // Interactable Events
        
        //sit
        this.ui.interactButton.on('pointerover', () => {

            if(this.getData('robotOff')){
                if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), this.dog.getBounds()) ) {
                    this.gotoScene('ending');
                }
            }
            let dogX = this.dog.x;
            if(this.dog.canFollow == true){
                this.sitDog()
            }
            else{
                //bark
                this.bark(this.dog, this.enemy);
                /* let time = (this.enemy.x - this.dog.x)*5;

                this.tweens.add({
                    targets: this.enemy,
                    x: dogX,
                    duration:time,
                    ease: 'Linear', // You can change the easing function if desired
                  }); */
            }
        })

        // Time Travel
        this.ui.swapButton.on('pointerover', () => {
                this.addData('x', this.player.x);
                this.addData('y', this.player.y);
                this.timeTravel('stealthpast');
        });
        
        // Create floor
        this.floor = this.add.rectangle(0, 1350, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        // Create Platforms
        this.platform1 = this.add.rectangle(440, 1080, 400, 50, 0xFFFFFF).setOrigin(0);
        this.physics.add.existing(this.platform1);
        this.platform1.body.allowGravity = false;
        this.platform1.body.immovable = true;
        this.platform1.visible = false;

        this.platform2 = this.add.rectangle(820, 850, 960, 50, 0xFFFFFF).setOrigin(0);
        this.physics.add.existing(this.platform2);
        this.platform2.body.allowGravity = false;
        this.platform2.body.immovable = true;
        this.platform2.visible = false;
        
        this.platform1.body.checkCollision.down = false;
		this.platform1.body.checkCollision.left = false;
		this.platform1.body.checkCollision.right = false;

        this.platform2.body.checkCollision.down = false;
		this.platform2.body.checkCollision.left = false;
		this.platform2.body.checkCollision.right = false;
        // Dialogue

        //Physics
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.worldbounds);


        this.physics.add.collider(this.enemy, this.floor);
        this.physics.add.collider(this.enemy, this.worldbounds);

        this.physics.add.collider(this.player, this.platform1);
        this.physics.add.collider(this.player, this.platform2);

        this.physics.add.collider(this.dog, this.floor);
        this.physics.add.collider(this.dog, this.worldbounds);

        this.physics.add.overlap(this.player, this.enemyInteractBox, this.enemyDetection, null, this);

        this.physics.add.overlap(this.player, this.consoleBroke, () => {
            this.ui.swapButton.setVisible(true)
        });

        if (this.getData('robotOff') && this.getData('robotOff') != undefined) {
            this.enemyInteractBox.destroy(); 
            this.enemy.setTexture('enemyDisabled');
        }
    }

    enemyDetection() {
        this.scene.start('stealthpresent');
        this.resetData();
    }

    sitDog(){
        this.dog.canFollow = false;
    }

    bark(dog, enemy){
        let time = (enemy.x - dog.x)*5;

                this.tweens.add({
                    targets: enemy,
                    x: dog.x,
                    duration:time,
                    ease: 'Linear', // You can change the easing function if desired
                  });
    }

    update() {
        // Update Player Logics
        this.player.update();

        // Update Dog Logics
        this.dog.update();

        // Update UI Logics
        this.ui.update();

        // Enemy hitbox detection
        this.enemyInteractBox.x = this.enemy.x;
        this.enemyInteractBox.y = this.enemy.y;
    }
}