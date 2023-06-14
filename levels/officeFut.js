class CoreGameplay extends SchismScene {
    constructor() {
        super("CoreGameplay", "CoreGameplay");
    }

    preload() {
        //characters
        this.load.path = '../assets/character/';
        this.load.image('luneSleep', 'luneBaseSprite.png');
        this.load.image('luneBase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');
        this.load.spritesheet('luneIdle', 'luneIdle_spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('luneRun', 'luneRun_spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('luneJump', 'luneJump_spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('sol', 'spritesheetSol-01.png', {frameWidth: 600, frameHeight: 600});


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

    }
    
    onEnter() {

        this.bgm = this.sound.add("bgm");
        this.bgm.play({
            loop: true
        });

        // Create background
        let bg = this.add.image(0, 0, 'lvl1Pres').setOrigin(0);

        //UI
        this.ui = new UI(this, "right", "interact", "mute", "swap", "fullscreen", "sound");
        
        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 300, 1010, 'luneSleep');
        let mobileControls = [this.ui.leftButton, this.ui.rightButton, this.ui.upButton];
        this.player.create(mobileControls);
        if(this.getData('x') != undefined) {
            this.player.x = this.getData('x');
        }
        if(this.getData('y') != undefined) {
            this.player.y = this.getData('y');
        }

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        //cc
        //this.cc = new cc(this);

        //dog
        this.goal = this.physics.add.sprite(2560*.6, 1920*.5,'solSit')
        this.goal.flipX=true;

        //desk
        this.desk = this.add.rectangle(2560 * 0.4, 1920 * 0.5, 2560 *0.1 , 1920 * 0.05, 0xff0000).setOrigin(0);
        this.physics.add.existing(this.desk);
        this.desk.body.allowGravity = false;
        this.desk.body.immovable = true;
        

        // Create floor
        this.floor = this.add.rectangle(0, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        // Create world bounds
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


        this.physics.add.collider(this.goal, this.floor);
        this.physics.add.collider(this.goal, this.worldbounds);

        this.time.delayedCall(6000, () => {this.startDialogue("tutorial1", () => {console.log("test")}, () => {console.log("test")})});

        

        this.physics.add.overlap(this.player, this.goal, () => {if(keyStatus == 1){this.scene.start("CoreGameplay2")}});

        this.physics.add.overlap(this.player, this.desk, () => {if(atDesk == 0){atDesk = 1}});
        //this.physics.add.overlap(this.player, this.goal, null, null, this);
    }

    update() {
        // Update Player Logics
        this.player.update();

        // Update UI Logics
        this.ui.update();

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.player.text.setText("swssh");
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeSound = this.sound.add("sound");
            this.timeSound.play();
            this.timeTravel('CoreGameplayAlt');
            
            //console.log(atDesk);
        }

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)) && atDesk == 1) {
            
            //Put desk note test here somehow
            console.log("desk note desc");

        }

        //this.physics.add.overlap(this.player, this.desk, () => {this.scene.start("CoreGameplay2")});
        

        //this.physics.add.overlap(this.player, this.goal, console.log("dog"), null, this);

    }
}