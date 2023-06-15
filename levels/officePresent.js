class OfficePresent extends SchismScene {
    constructor() {
        super("officepresent", "Level1Present");
    }

    preload() {
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

        // Create background
        let bg = this.add.image(0, 0, 'lvl1Pres').setOrigin(0).setDepth(envDepth);

        //UI
        this.ui = new UI(this, "right", "interact", "mute", "swap", "fullscreen", "sound");
        
        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 300, 1010, 'luneSleep').setDepth(playerDepth);
        if(this.getData('started') == undefined) {
            this.player.body.enable = false;
        }
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

        // Start of game pod opening
        let pod = this.add.image(330, 1010, 'podPresent').setOrigin(0.5).setScale(1.1).setDepth(envDepth);
        let podDoor = this.add.image(330, 1010, 'podDoor').setOrigin(0.5).setDepth(playerDepth);

        if(this.getData('started') == undefined) {
            this.time.delayedCall(400, () => {
                this.tweens.add({
                    targets: podDoor, 
                    x: `-=${270}`,
                    duration: 1000,
                    onComplete: () => {
                        console.log(podDoor.x);
                        this.player.body.enable = true;
                        this.player.play('idle');
                        podDoor.setDepth(envDepth);
                        this.addData('started');
                        this.startDialogue("tutorial1", () => {}, () => {});
                    }
                });
            });
        } else {
            podDoor.x = 60;
            podDoor.setDepth(envDepth);
        }

        // Create dog
        this.dog = new Dog(this, 1700, this.player.y, "solBase").setDepth(dogDepth);
        this.dog.create();
        if(this.getData('friendAcquired') == undefined) {
            this.dog.visible = false;
            this.dog.canFollow = false;
            this.dog.flipX = true;
        }

        // Create door collision
        this.door = this.add.rectangle(2250, 700, 270, 550).setOrigin(0);
        this.physics.add.existing(this.door);
        this.door.body.allowGravity = false;
        this.door.body.immovable = true;

        // Interactable Events
        this.interactables =  this.add.group();

        this.laptop = this.physics.add.sprite(1024, 960, 'laptopPresent').setOrigin(0.5).setScale(0.4).setDepth(objectDepth);
        this.laptop.body.allowGravity = false;
        this.laptop.body.immovable = true;
        this.interactables.add(this.laptop);

        //console.log(interactables);

        if(this.getData('interactedLaptop')) {
            laptop.setTexture('laptopPresentOn');
        }

        this.dogTreats = this.physics.add.sprite(1274, 960, 'dogTreatsFut').setOrigin(0.5).setScale(0.25).setDepth(objectDepth);
        this.dogTreats.body.allowGravity = false;
        this.dogTreats.body.immovable = true;
        this.interactables.add(this.dogTreats);

        /* bomb.preFX.setPadding(32);

        const fx = bomb.preFX.addGlow();

        //  For PreFX Glow the quality and distance are set in the Game Configuration

        this.tweens.add({
            targets: fx,
            outerStrength: 10,
            yoyo: true,
            loop: -1,
            ease: 'sine.inout'
        }); */

        if(this.getData('interactedTreats')) {

        }

        this.crateDoorPresent = this.physics.add.sprite(1700, 1125, 'crateDoorPresent').setOrigin(0.5).setScale(0.4).setDepth(objectForeDepth);
        this.crateDoorPresent.body.allowGravity = false;
        this.crateDoorPresent.body.immovable = true;
        this.crateDoorPresent.visible = false;
        this.interactables.add(this.crateDoorPresent);

        if(this.getData('friendAcquired')) {

        }

        this.cratePresent = this.physics.add.sprite(1970, 1100, 'cratePresent').setOrigin(0.5).setScale(0.6).setDepth(objectForeDepth);
        this.cratePresent.body.allowGravity = false;
        this.cratePresent.body.immovable = true; 
        this.interactables.add(this.cratePresent);

        //interactables.preFX.setPadding(32);

        //  For PreFX Glow the quality and distance are set in the Game Configuration


        this.ui.swapButton.visible = false;
        this.ui.swapButton.disableInteractive();

        this.ui.interactButton.on('pointerover', () => {
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), this.laptop.getBounds()) 
                && !this.getData('interactedLaptop')) {
                this.laptop.setTexture('laptopPresentOn');
                this.startDialogue('desk', () => {}, () => {this.addData('interactedLaptop')});
            }
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), this.dogTreats.getBounds()) 
                && this.getData('interactedLaptop') != undefined && !this.getData('interactedTreats')) {
                this.startDialogue('dogTreats', () => {
                    this.dogTreats.setScrollFactor(0);
                    this.dogTreats.setDepth(objectForeDepth);
                    this.dogTreats.x = game.config.width/2;
                    this.dogTreats.y = game.config.height/3;
                    this.dogTreats.angle = -15;
                    this.dogTreats.setScale(1);
                }, () => {
                    this.addData('interactedTreats');
                    this.dogTreats.destroy();
                });
            }
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), this.cratePresent.getBounds()) 
                && this.getData('interactedLaptop') && this.getData('interactedTreats')  && !this.getData('friendAcquired')) {
                this.startDialogue('crate', () => {
                    this.crateDoorPresent.visible = true;
                    this.dog.visible = true;
                }, () => {
                    this.addData('friendAcquired');
                    this.dog.canFollow = true;
                    this.ui.swapButton.visible = true;
                    this.ui.swapButton.setInteractive();
                    
                });
            }
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), this.door.getBounds()) 
                && this.getData('keycard')) {
                this.gotoScene('cranepresent');
                this.resetData();
            }
        });

        // Time Travel
        this.ui.swapButton.on('pointerover', () => {
            if(this.getData('friendAcquired') != undefined) {
                this.addData('x', this.player.x);
                this.addData('y', this.player.y);
                this.timeTravel('officepast');
            }
        });
        

        // Create floor
        this.floor = this.add.rectangle(0, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        //Physics
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.worldbounds);

        this.physics.add.collider(this.dog, this.floor);
        this.physics.add.collider(this.dog, this.worldbounds);

        
        this.interactables.getChildren().forEach( (object) => {

            if(object == this.laptop && !this.getData('interactedLaptop')){
                object.preFX.setPadding(32);
                let fx = object.preFX.addGlow();
                this.laptopGlow = this.tweens.add({
                    targets: fx,
                    outerStrength: 10,
                    yoyo: true,
                    loop: -1,
                    ease: 'sine.inout'
                });
            }

            if(object == this.dogTreats && !this.getData('interactedTreats')){
                object.preFX.setPadding(32);
                let fx = object.preFX.addGlow();
                this.dogTreatsGlow = this.tweens.add({
                    targets: fx,
                    outerStrength: 10,
                    yoyo: true,
                    loop: -1,
                    ease: 'sine.inout'
                });
            }

            if(object == this.cratePresent && !this.getData('friendAcquired')){
                object.preFX.setPadding(32);
                let fx = object.preFX.addGlow();
                this.crateGlow = this.tweens.add({
                    targets: fx,
                    outerStrength: 10,
                    yoyo: true,
                    loop: -1,
                    ease: 'sine.inout'
                });
            }
          });
    }

    update() {
        // Update Player Logics
        this.player.update();

        // Update Dog Logics
        this.dog.update();

        // Update UI Logics
        this.ui.update();

        if(this.getData('interactedLaptop')){
            this.laptopGlow.stop();
            this.laptopGlow.destroy();
            this.laptop.destroy();
            this.laptop = this.physics.add.sprite(1024, 960, 'laptopPresentOn').setOrigin(0.5).setScale(0.4).setDepth(objectDepth);
            this.laptop.body.allowGravity = false;
            this.laptop.body.immovable = true;
        }

        if(this.getData('friendAcquired')) {
            this.crateGlow.stop();
            this.crateGlow.destroy();
            this.cratePresent.destroy();
            this.cratePresent = this.physics.add.sprite(1970, 1100, 'cratePresent').setOrigin(0.5).setScale(0.6).setDepth(objectForeDepth);
            this.cratePresent.body.allowGravity = false;
            this.cratePresent.body.immovable = true; 
        }

        if(this.getData('interactedTreats')) {
            this.dogTreatsGlow.stop();
            this.dogTreatsGlow.destroy();
        }
    }
}