class CranePast extends SchismScene {
    constructor() {
        super("cranepast", "Level2Past");
    }

    preload() {
        //characters
        this.load.path = '../assets/character/';
        this.load.image('luneSleep', 'luneSleep.png');
        this.load.image('luneBase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');
        this.load.spritesheet('luneIdle', 'luneIdle_spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('luneRun', 'luneRun_spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('luneJump', 'luneJump_spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('sol', 'spritesheetSol-01.png', {frameWidth: 600, frameHeight: 300});

        //UI
        this.load.path = '../assets/UI/';
        this.load.image('right', 'right.png');
        this.load.image('interact', 'interact.png');
        this.load.image('mute', 'mute.png');
        this.load.image('sound', 'sound.png');
        this.load.image('swap', 'swap.png');
        this.load.image('fullscreen', "fullScreen.png");

        //interactables 
        this.load.path = '../assets/interactables/';
        this.load.image('consolePast', 'consolePast.png');
        this.load.image('lvl3platform', 'lvl3platform.png');
        this.load.image('cranePresent', 'cranePast.png');
        this.load.image('craneHandPast', 'craneHandPast.png');

        //levels
        this.load.path = '../../assets/levels/';
        this.load.image('lvl2Past', 'level2past.png');
    }

    onEnter() {

        // Create background
        let bg = this.add.image(0, 0, 'lvl2Past').setOrigin(0).setDepth(envDepth);

        
        
        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 300, 1010, 'luneBase').setDepth(playerDepth);
        this.player.body.enable = true;
        if(this.getData('x') != undefined) {
            this.player.x = this.getData('x');
        }
        if(this.getData('y') != undefined) {
            this.player.y = this.getData('y');
        }




        //UI
        this.ui = new UI(this, "right", "interact", "mute", "swap", "fullscreen", "sound");



        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        // Link mobile controls to Player
        let mobileControls = [this.ui.leftButton, this.ui.rightButton, this.ui.upButton];
        this.player.create(mobileControls);
        this.ui.swapButton.setVisible(false);

        //let pod = this.add.image(330, 1010, 'podPresent').setOrigin(0.5).setScale(1.1).setDepth(envDepth);
        //let podDoor = this.add.image(330, 1010, 'podDoor').setOrigin(0.5).setDepth(playerDepth);

        //create crane
        let crane = this.physics.add.sprite(2560 *.415, 1920*.3, "cranePresent").setDepth(objectDepth);
        crane.body.allowGravity = false;
        crane.body.immovable = true;

        //create crane hand
        let craneHand = this.physics.add.sprite(2560 *.5, 1920*.17, "craneHandPast").setDepth(objectDepth+1).setScale(.5);
        craneHand.body.allowGravity = false;
        craneHand.body.immovable = true;

        // Create console
        let consoleWork = this.physics.add.sprite(2560 *.3, 1920*.49, "consolePast").setDepth(objectDepth);
        consoleWork.body.allowGravity = false;
        consoleWork.body.immovable = true;

        /* let laptop = this.physics.add.sprite(1024, 960, 'laptopPresent').setOrigin(0.5).setScale(0.4).setDepth(objectDepth);
        laptop.body.allowGravity = false;
        laptop.body.immovable = true; */
        

        // Create floor
        this.floor = this.add.rectangle(0, 1250, 2560*.4, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        this.floor2 = this.add.rectangle(2560 *.87, 1250, 2560*.2, 100).setOrigin(0);
        this.physics.add.existing(this.floor2);
        this.floor2.body.allowGravity = false;
        this.floor2.body.immovable = true;

        this.floor3 = this.add.rectangle(2560*.4, 1300, 2560*.47, 50).setOrigin(0);
        this.physics.add.existing(this.floor3);
        this.floor3.body.allowGravity = false;
        this.floor3.body.immovable = true;

        this.floor4 = this.add.rectangle(2560*.4, 1250, 2560*.47, 50).setOrigin(0);
        this.physics.add.existing(this.floor4);
        this.floor4.body.allowGravity = false;
        this.floor4.body.immovable = true;

        this.bridge = this.physics.add.sprite(2560 *.64, 1920*.2, "lvl3platform").setScale(1.2).setDepth(objectDepth);
        this.bridge.body.allowGravity = false;
        this.bridge.body.immovable = false;


        this.goal = this.rect

        // Dialogue
        /*  this.time.delayedCall(6000, () => {
            this.player.anims.pause();
            this.startDialogue("tutorial1", () => {console.log("test")}, () => {this.player.anims.resume()});
        });  */

        //this.player.anims.resume

        //Physics
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.worldbounds);
        this.physics.add.collider(this.player, this.floor2);
        //this.physics.add.collider(this.player, this.bridge);

        
        //this.physics.add.collider(this.bridge, this.floor2);

        this.physics.add.overlap(this.player, this.dog, () => {});
        this.physics.add.overlap(this.player, this.console, () => {});
        
        this.ui.interactButton.on('pointerover', () => {
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), consoleWork.getBounds()) 
            && !this.getData('bridgeMade')) {
                //laptop.setTexture('laptopPresentOn');
                this.startDialogue('workCon', () => {}, () => {this.addData('bridgeMade')})


                this.ui.leftButton.setVisible(false);
                this.ui.rightButton.setVisible(false);
                this.ui.upButton.setVisible(false);
                this.ui.interactButton.setVisible(false);
                this.ui.muteButton.setVisible(false);
                this.ui.fsButton.setVisible(false);


                //Makeshift cinematic
                //this.cameras.main.pan(2560*.5, 1440*.5  , 1000);
                this.cameras.main.zoomTo(.75, 3000);
                
                this.bridge.body.allowGravity = true;
                this.bridge.body.immovable = false;
                this.bridge.body.setGravityY(-1750);

                this.physics.add.collider(this.player, this.floor3);
                this.physics.add.collider(this.player, this.floor4);

                this.physics.add.collider(this.bridge, this.floor3, () => {
                    //console.log("bunk")
                    this.ui.leftButton.setVisible(true);
                    this.ui.rightButton.setVisible(true);
                    this.ui.upButton.setVisible(true);
                    this.ui.swapButton.setVisible(true);
                    this.ui.interactButton.setVisible(true);
                    this.ui.muteButton.setVisible(true);
                    this.ui.fsButton.setVisible(true);
                    //this.cameras.main.startFollow(this.player)
                    //this.cameras.main.setBounds(0, 0, bg.width, bg.height);

                    this.cameras.main.zoomTo(1, 500);
                })
                    

                //console.log("bunk");

                
                
            }
        })

        
    }

    update() {
        // Update Player Logics
        this.player.update();

        // Update Dog Logics
        //this.dog.update();

        // Update UI Logics
        this.ui.update();

    }
}



/* 
// Interactable Events
let laptop = this.physics.add.sprite(1024, 960, 'laptopPresent').setOrigin(0.5).setScale(0.4).setDepth(objectDepth);
laptop.body.allowGravity = false;
laptop.body.immovable = true;

let dogTreats = this.physics.add.sprite(1274, 960, 'dogTreatsFut').setOrigin(0.5).setScale(0.25).setDepth(objectDepth);
dogTreats.body.allowGravity = false;
dogTreats.body.immovable = true;

let crateDoorPresent = this.physics.add.sprite(1700, 1125, 'crateDoorPresent').setOrigin(0.5).setScale(0.4).setDepth(objectForeDepth);
crateDoorPresent.body.allowGravity = false;
crateDoorPresent.body.immovable = true;
crateDoorPresent.visible = false;

let cratePresent = this.physics.add.sprite(1970, 1100, 'cratePresent').setOrigin(0.5).setScale(0.6).setDepth(objectForeDepth);
cratePresent.body.allowGravity = false;
cratePresent.body.immovable = true;

this.ui.interactButton.on('pointerover', () => {
    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), laptop.getBounds()) 
        && !this.getData('interactedLaptop')) {
        laptop.setTexture('laptopPresentOn');
        this.startDialogue('desk', () => {}, () => {this.addData('interactedLaptop')});
    }
    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), dogTreats.getBounds()) 
        && this.getData('interactedLaptop') != undefined) {
        this.startDialogue('dogTreats', () => {
            dogTreats.setScrollFactor(0);
            dogTreats.setDepth(objectForeDepth);
            dogTreats.x = game.config.width/2;
            dogTreats.y = game.config.height/3;
            dogTreats.angle = -15;
            dogTreats.setScale(1);
        }, () => {
            this.addData('interactedTreats');
            dogTreats.destroy();
        });
    }
    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), cratePresent.getBounds()) 
        && this.getData('interactedLaptop') && this.getData('interactedTreats')) {
        this.startDialogue('crate', () => {
            this.dog.visible = true;
        }, () => {
            this.addData('friendAcquired');
            this.dog.canFollow = true;
        });
    }
}); */