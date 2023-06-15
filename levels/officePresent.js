class OfficePresent extends SchismScene {
    constructor() {
        super("officepresent", "Level1Present");
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


        //levels
        this.load.path = '../assets/levels/';
        this.load.image('lvl1Pres', 'scene_1_present.png');

        //sound
        this.load.path = '../assets/sound/';
        this.load.audio('sound', 'sound.mp3');
        this.load.audio('bgm', 'bgm.mp3');

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
        this.load.image('podPresent', 'podPresent.PNG');
        this.load.image('podDoor', 'podDoor.PNG');
        this.load.image('laptopPresent', 'laptopPresent.png');
        this.load.image('laptopPresentOn', 'laptopPresent_on.png');
        this.load.image('dogTreatsFut', 'dogTreatsFuture.png');
        this.load.image('cratePresent', 'cratePresent.png');
        this.load.image('crateDoorPresent', 'crateDoorPresent.png');

    }
    
    onEnter() {

        this.bgm = this.sound.add("bgm");
        this.bgm.play({
            loop: true
        });

        // Create background
        let bg = this.add.image(0, 0, 'lvl1Pres').setOrigin(0).setDepth(envDepth);

        //UI
        this.ui = new UI(this, "right", "interact", "mute", "swap", "fullscreen", "sound");
        
        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 300, 1010, 'luneSleep').setDepth(playerDepth);
        this.player.body.enable = false;
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

        let pod = this.add.image(330, 1010, 'podPresent').setOrigin(0.5).setScale(1.1).setDepth(envDepth);
        let podDoor = this.add.image(330, 1010, 'podDoor').setOrigin(0.5).setDepth(playerDepth);

        this.time.delayedCall(400, () => {
            this.tweens.add({
                targets: podDoor, 
                x: `-=${270}`,
                duration: 1000,
                onComplete: () => {
                    this.player.body.enable = true;
                    this.player.play('idle');
                    podDoor.setDepth(envDepth);
                }
            });
        });

        // Create dog
        this.dog = new Dog(this, this.player.x, this.player.y, "solSit").setDepth(dogDepth);
        this.dog.create();
        this.dog.visible = false;
        this.dog.canFollow = false;

        // Create desk
        this.desk = this.add.rectangle(2560 * 0.4, 1920 * 0.5, 2560 *0.1 , 1920 * 0.05, 0xff0000).setOrigin(0);
        this.physics.add.existing(this.desk);
        this.desk.body.allowGravity = false;
        this.desk.body.immovable = true;
        

        // Create floor
        this.floor = this.add.rectangle(0, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        // Dialogue
        this.time.delayedCall(6000, () => {
            this.player.anims.pause();
            this.startDialogue("tutorial1", () => {console.log("test")}, () => {this.player.anims.resume()});
        });

        //Physics
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.worldbounds);

        this.physics.add.collider(this.dog, this.floor);
        this.physics.add.collider(this.dog, this.worldbounds);

        this.physics.add.overlap(this.player, this.dog, () => {});
        this.physics.add.overlap(this.player, this.desk, () => {});
    }

    update() {
        // Update Player Logics
        this.player.update();

        // Update Dog Logics
        this.dog.update();

        // Update UI Logics
        this.ui.update();
    }
}