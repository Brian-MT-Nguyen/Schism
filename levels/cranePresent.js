
class CranePresent extends SchismScene {
    constructor() {
        super("CranePresent", "CranePresent");
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
        this.load.image('consoleFuture', 'consoleFuture.png');

        //levels
        this.load.path = '../../assets/levels/';
        this.load.image('lvl', 'level2_present.png');
    }

    onEnter() {

        // Create background
        let bg = this.add.image(0, 0, 'lvl').setOrigin(0).setDepth(envDepth);

        //UI
        this.ui = new UI(this, "right", "interact", "mute", "swap", "fullscreen", "sound");
        
        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 300, 1010, 'luneBase').setDepth(playerDepth);
        this.player.body.enable = true;
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

        this.ui.swapButton.setVisible(false);

        //let pod = this.add.image(330, 1010, 'podPresent').setOrigin(0.5).setScale(1.1).setDepth(envDepth);
        //let podDoor = this.add.image(330, 1010, 'podDoor').setOrigin(0.5).setDepth(playerDepth);

        

        // Create dog
        this.dog = new Dog(this, this.player.x, this.player.y, "solSit").setDepth(dogDepth);
        this.dog.create();  

        // Create console
        let consoleBroke = this.physics.add.sprite(2560 *.3, 1920*.49, "consoleFuture").setDepth(objectDepth);
        consoleBroke.body.allowGravity = false;
        consoleBroke.body.immovable = true;

        /* let laptop = this.physics.add.sprite(1024, 960, 'laptopPresent').setOrigin(0.5).setScale(0.4).setDepth(objectDepth);
        laptop.body.allowGravity = false;
        laptop.body.immovable = true; */
        

        // Create floor
        /* this.floor = this.add.rectangle(0, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true; */
        this.floor = this.add.rectangle(0, 1250, 2560*.4, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        this.floor2 = this.add.rectangle(2560 *.87, 1250, 2560*.2, 100).setOrigin(0);
        this.physics.add.existing(this.floor2);
        this.floor2.body.allowGravity = false;
        this.floor2.body.immovable = true;


        //create goal
        this.goal = this.add.rectangle(2560 *.94, 1200, 2560*.12, 100);
        this.physics.add.existing(this.goal);
        this.goal.body.allowGravity = false;
        this.goal.body.immovable = true;

        // Dialogue
        /*  this.time.delayedCall(6000, () => {
            this.player.anims.pause();
            this.startDialogue("tutorial1", () => {console.log("test")}, () => {this.player.anims.resume()});
        });  */

        //this.player.anims.resume

        //Physics
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.floor2);
        this.physics.add.collider(this.player, this.worldbounds);

        this.physics.add.collider(this.dog, this.floor);
        this.physics.add.collider(this.dog, this.floor2);
        this.physics.add.collider(this.dog, this.worldbounds);

        this.physics.add.overlap(this.player, this.dog, () => {});
        this.physics.add.overlap(this.player, this.console, () => {});

        this.physics.add.overlap(this.player, this.goal, () => {
            this.time.delayedCall(1000, this.gotoScene("StealthPresent"))
            });

        this.ui.interactButton.on('pointerover', () => {
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), consoleBroke.getBounds()) 
            && !this.getData('interactedConsole')) {
                //laptop.setTexture('laptopPresentOn');
                this.startDialogue('brokenCon', () => {}, () => {this.addData('interactedConsole')})

                this.ui.swapButton.setVisible(true);
            }
        })

        this.ui.swapButton.on('pointerover', () => {
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            //this.scene.start('CranePast');
            this.timeTravel('CranePast');
        });
    }

    update() {
        // Update Player Logics
        this.player.update();

        // Update Dog Logics
        this.dog.update();

        // Update UI Logics
        this.ui.update();

        //bg.width, bg.height

        if(this.player.x > 2560){
            this.gotoScene("CranePresent");
            this.resetData();
        }

        if(this.player.y > 1920){
            this.gotoScene("CranePresent");
            this.resetData();
        }
    }
}
