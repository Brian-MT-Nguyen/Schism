class StealthPresent extends SchismScene {
    constructor() {
        super("stealthpresent", "Level3Present");
    }

    preload() {
        //characters
        this.load.path = 'assets/character/';
        this.load.image('enemyBase', 'enemyBaseSprite.png');
        this.load.image('enemyDisabled', 'enemyBaseSprite_disabled.png');

        //sound
        this.load.path = 'assets/sound/';
        this.load.audio('sound', 'sound.mp3');
        this.load.audio('woof', 'woof.mp3');

        //levels
        this.load.path = 'assets/levels/';
        this.load.image('lvl3Pres', 'level3_present.png');


        
        //characters
        this.load.path = 'assets/character/';
        this.load.image('luneSleep', 'luneSleep.png');
        this.load.image('luneBase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');
        this.load.spritesheet('luneIdle', 'luneIdle_spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('luneRun', 'luneRun_spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('luneJump', 'luneJump_spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('sol', 'spritesheetSol-01.png', {frameWidth: 600, frameHeight: 300});


        //levels
        this.load.path = 'assets/levels/';
        this.load.image('lvl1Pres', 'scene_1_present.png');

        //sound
        this.load.path = 'assets/sound/';
        this.load.audio('sound', 'sound.mp3');
        this.load.audio('bgm', 'bgm.mp3');

        //UI
        this.load.path = 'assets/UI/';
        this.load.image('right', 'right.png');
        this.load.image('interact', 'interact.png');
        this.load.image('mute', 'mute.png');
        this.load.image('sound', 'sound.png');
        this.load.image('swap', 'swap.png');
        this.load.image('fullscreen', "fullScreen.png");

        //Interactables
        this.load.path = 'assets/interactables/';
        this.load.image('podPresent', 'podPresent.PNG');
        this.load.image('podDoor', 'podDoor.PNG');
        this.load.image('laptopPresent', 'laptopPresent.png');
        this.load.image('laptopPresentOn', 'laptopPresent_on.png');
        this.load.image('dogTreatsFut', 'dogTreatsFuture.png');
        this.load.image('cratePresent', 'cratePresent.png');
        this.load.image('crateDoorPresent', 'crateDoorPresent.png');
    }
    
    onEnter() {
        this.tpSound = this.sound.add('sound');

        // Create background
        let bg = this.add.image(0, 0, 'lvl3Pres').setOrigin(0).setDepth(envDepth);

        this.barkSound = this.sound.add('woof');

        //UI
        this.ui = new UI(this, "right", "interact", "mute", "swap", "fullscreen", "sound");
        
        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 200, 1110, 'luneBase').setDepth(playerDepth);
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
        this.dog.canFollow = false;
        if(!this.getData('level3Lured')) {
            this.dog.canFollow = true;
        }

        if(this.getData('level3Lured')) {
            this.dog.level3Back = true;
        }

        // Create enemy
        this.enemy = this.physics.add.sprite(2000, 1100, 'enemyBase').setDepth(playerDepth).setScale(0.8);
        this.enemyInteractBox = this.physics.add.sprite(this.enemy.x, this.enemy.y, "enemyBase").setOrigin(0.5).setScale(0.8);
        this.enemyInteractBox.visible = false;
        this.enemyInteractBox.body.immovable = true;
        this.enemyInteractBox.body.allowGravity = false;
        this.enemyInteractBox.body.setSize(2870,600);
        this.enemyInteractBox.body.setOffset(-1000, 0);

        // Create console
        this.interactables =  this.add.group();
        this.consoleBroke = this.physics.add.sprite(2400, 1120, "consoleFuture").setDepth(objectDepth).setScale(0.8);
        this.consoleBroke.body.allowGravity = false;
        this.consoleBroke.body.immovable = true;
        this.interactables.add(this.consoleBroke);

        this.ui.swapButton.visible = false;

        // Create door
        this.door = this.add.rectangle(1190, 980, 160, 370).setOrigin(0);
        this.physics.add.existing(this.door);
        this.door.body.allowGravity = false;
        this.door.body.immovable = true;
        this.interactables.add(this.door);
        
        // Interactable Events
        this.interactables.getChildren().forEach( (object) => {
            if(object == this.consoleBroke && !this.getData('interactedConsole')){
                object.preFX.setPadding(32);
                let fx = object.preFX.addGlow();
                this.consoleGlow = this.tweens.add({
                    targets: fx,
                    outerStrength: 20,
                    yoyo: true,
                    loop: -1,
                    ease: 'sine.inout'
                });
            }
        });
        
        //sit
        this.ui.interactButton.on('pointerover', () => {

            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), this.door.getBounds()) ) {
                this.resetData();
                this.gotoScene('ending');
            }
            if(this.dog.canFollow == true && !this.getData('level3Lured')){
                this.sitDog()
            }
            else{
                console.log("we in");
                if(!this.getData('barked') && !this.getData('level3Lured')) {
                    //bark
                    this.bark(this.dog, this.enemy);
                }   
            }
        })

        // Time Travel
        this.ui.swapButton.on('pointerover', () => {
            this.tpSound.play();
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('stealthpast');
            this.addData('level3Lured');
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
        if(!this.getData('level3GoalDone')) {
            this.startDialogue('level3Goal', () => {}, () => {
                this.startDialogue('barkTutorial', () => {}, () => {this.addData('level3GoalDone')});
            });
        }

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

        this.ui.interactButton.on('pointerover', () => {
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), this.consoleBroke.getBounds()) 
                && !this.getData('interactedConsole')) {
                this.startDialogue('brokenCon', () => {
                    this.addData('interactedConsole');
                }, () => {
                    this.ui.swapButton.visible = true;
                });
            }
        })

        if (this.getData('robotOff') && this.getData('robotOff') != undefined) {
            this.enemyInteractBox.destroy(); 
            this.enemy.setTexture('enemyDisabled');
        }
    }

    enemyDetection() {
        this.player.body.enable = false;
        this.player.stop();
        this.dog.stop();
        this.gotoScene('stealthpresent');
        this.resetData();
        this.addData('level3GoalDone');
    }

    sitDog(){
        this.dog.canFollow = false;
    }

    bark(dog, enemy){
        this.addData('barked');
        let time = (enemy.x - dog.x)*5;
        this.barkSound.play();
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

        if(this.getData('interactedConsole')) {
            this.consoleGlow.stop();
            this.consoleGlow.destroy();
            this.consoleBroke.destroy();
            this.consoleBroke = this.physics.add.sprite(2400, 1120, "consoleFuture").setDepth(objectDepth).setScale(0.8);
            this.consoleBroke.body.allowGravity = false;
            this.consoleBroke.body.immovable = true;
        }
    }
}