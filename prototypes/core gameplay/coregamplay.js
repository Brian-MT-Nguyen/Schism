//Really shit ways of seeing if we saw things in scene
let atDesk = 0;
let keyStatus = 0;
let brkCon = 0;
let platStat = 0;



class CoreGameplay extends SchismScene {
    constructor() {
        super("CoreGameplay", "Deez Nuts");
    }

    preload() {
        //characters
        this.load.path = '../../assets/character/';
        this.load.image('lunebase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');


        //levels
        this.load.path = '../../assets/levels/';
        this.load.image('lvl1Pres', 'scene_1_present.png');
    }
    
    onEnter() {

       //let rKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

       

       
        // Create background
        let bg = this.add.image(0, 0, 'lvl1Pres').setOrigin(0);

        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 300, 1035, 'lunebase');
        if(this.getData('x') != undefined) {
            this.player.x = this.getData('x');
        }
        if(this.getData('y') != undefined) {
            this.player.y = this.getData('y');
        }

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

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

        //this.physics.add.collider(this.player, this.goal);

        

        this.physics.add.overlap(this.player, this.goal, () => {if(keyStatus == 1){this.scene.start("CoreGameplay2")}});

        this.physics.add.overlap(this.player, this.desk, () => {if(atDesk == 0){atDesk = 1}});
        //this.physics.add.overlap(this.player, this.goal, null, null, this);
    }

    update() {
        // Update Player Logics

        //let atDesk = 0; 

        this.player.update();

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('CoreGameplayAlt');
            
            console.log(atDesk);
        }

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)) && atDesk == 1) {
            
            //Put desk note test here somehow
            console.log("desk note desc");

        }

        //this.physics.add.overlap(this.player, this.desk, () => {this.scene.start("CoreGameplay2")});
        

        //this.physics.add.overlap(this.player, this.goal, console.log("dog"), null, this);

    }
}

class CoreGameplayAlt extends SchismScene {

    //acursors;

    //goal;

    constructor() {
        super("CoreGameplayAlt", "Deez Nuts");
    }

    preload() {
        //characters
        this.load.path = '../../assets/character/';
        this.load.image('lunebase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');


        //levels
        this.load.path = '../../assets/levels/';
        this.load.image('lvl1Past', 'officeLvlPast.png');
    }
    
    onEnter() {

       //let rKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

       
        // Create background
        let bg = this.add.image(0, 0, 'lvl1Past').setOrigin(0);

        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 300, 1035, 'lunebase');
        if(this.getData('x') != undefined) {
            this.player.x = this.getData('x');
        }
        if(this.getData('y') != undefined) {
            this.player.y = this.getData('y');
        }

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        //passCode
        this.passCode = this.add.rectangle(2560 * 0.4, 1920 * 0.5, 2560 *0.1 , 1920 * 0.05, 0xff0000).setOrigin(0);
        this.physics.add.existing(this.passCode);
        this.passCode.body.allowGravity = false;
        this.passCode.body.immovable = true;
        

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

        this.physics.add.overlap(this.player, this.passCode, () => {if(keyStatus == 0){keyStatus = 1}});

        //this.physics.add.overlap(this.player, this.passCode, () => {this.scene.start("CoreGameplay2")});
        //this.physics.add.overlap(this.player, this.goal, null, null, this);
    }

    update() {
        // Update Player Logics
        this.player.update();

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('CoreGameplay');
        }

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F))) {
            
            //Put desk note test here somehow
            //console.log("desk note desc");

            if(keyStatus == 1){
                console.log("keys aquired");
            }
            else{
                console.log("no keys");
            }
            

        }

        //this.physics.add.overlap(this.player, this.goal, console.log("dog"), null, this);

    }
}


///SECOND SCENE

class CoreGameplay2 extends SchismScene {
    constructor() {
        super("CoreGameplay2", "testing");
    }

    preload() {
        this.load.path = '../../assets/character/';
        this.load.image('lunebase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');

        //levels
        this.load.path = '../../assets/levels/';
        this.load.image('lvl', 'level2_present.png');
    }

    onEnter() {
        // Create background
        let bg = this.add.image(0, 0, 'lvl').setOrigin(0);

        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 300, 1035, 'lunebase');
        if(this.getData('x') != undefined) {
            this.player.x = this.getData('x');
        }
        if(this.getData('y') != undefined) {
            this.player.y = this.getData('y');
        }

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        // Create floor left
        this.floor = this.add.rectangle(0, 1250, 2560*.4, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        // create floor right
        this.floor2 = this.add.rectangle(2560*.87, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor2);
        this.floor2.body.allowGravity = false;
        this.floor2.body.immovable = true;

        //brokeConsole
        this.brokeConsole = this.add.rectangle(2560 * 0.2, 1920 * 0.5, 2560 *0.1 , 1920 * 0.15, 0xff0000).setOrigin(0);
        this.physics.add.existing(this.brokeConsole);
        this.brokeConsole.body.allowGravity = false;
        this.brokeConsole.body.immovable = true;


        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.floor2);
        this.physics.add.collider(this.player, this.worldbounds);

        this.physics.add.overlap(this.player, this.brokeConsole, () => {if(brkCon == 0){brkCon = 1}});
    }

    update() {
        // Update Player Logics
        this.player.update();

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('CoreGameplay2Alt');
        }


        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F))) {
            
            //Put desk note test here somehow
            //console.log("desk note desc");

            if(brkCon == 1){
                console.log("the console is very broken");
            }
            else{
                console.log("check the console");
            }
            

        }
    }
}


class CoreGameplay2Alt extends SchismScene {
    constructor() {
        super("CoreGameplay2Alt", "testing");
    }

    preload() {
        //this.load.path = '../../assets/character/';
       // this.load.image('lunebase', 'luneBaseSprite.png');
        //this.load.image('solBase', 'solBaseSprite.png');
        //this.load.image('solSit', 'solSitting.png');

        //levels
        this.load.path = '../../assets/levels/';
        this.load.image('lvl2Past', 'level2Past.png');
    }

    onEnter() {
        // Create background
        let bg = this.add.image(0, 0, 'lvl2Past').setOrigin(0);

        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 300, 1035, 'lunebase');
        if(this.getData('x') != undefined) {
            this.player.x = this.getData('x');
        }
        if(this.getData('y') != undefined) {
            this.player.y = this.getData('y');
        }
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        // Create floor left
        this.floor = this.add.rectangle(0, 1250, 2560*.4, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        // create floor right
        this.floor2 = this.add.rectangle(2560*.87, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor2);
        this.floor2.body.allowGravity = false;
        this.floor2.body.immovable = true;

        //console
        this.activate = this.add.rectangle(2560 * 0.2, 1920 * 0.5, 2560 *0.1 , 1920 * 0.15, 0xff0000).setOrigin(0);
        this.physics.add.existing(this.activate);
        this.activate.body.allowGravity = false;
        this.activate.body.immovable = true;


        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.floor2);
        this.physics.add.collider(this.player, this.worldbounds);
    }

    update() {
        // Update Player Logics
        this.player.update();

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('CoreGameplay2');
        }

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F))) {
            
            //Put desk note test here somehow
            //console.log("desk note desc");

            this.physics.add.overlap(this.player, this.activate, () => {console.log("duck")});
        }
    }
}
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x : 0,
                y : 2000
            }
        }
    },
    backgroundColor: 0x000000,
    //scene: [CoreGameplay, CoreGameplayAlt, CoreGameplay2, CoreGameplay2Alt],
    scene: [CoreGameplay2, CoreGameplay2Alt],
    title: "Schism"
});