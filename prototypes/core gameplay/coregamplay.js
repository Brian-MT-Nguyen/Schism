class CoreGameplay extends SchismScene {

    //acursors;

    goal;

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
        this.load.image('office', 'officeLvlPast.png');
    }
    
    onEnter() {

       //let rKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

       
        // Create background
        let bg = this.add.image(0, 0, 'office').setOrigin(0);

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

        //goal
        this.goal = this.physics.add.sprite(2560*.5, 1920*.5,'solSit')
        

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

        

        this.physics.add.overlap(this.player, this.goal, () => {this.scene.start("CoreGameplay2")});
        //this.physics.add.overlap(this.player, this.goal, null, null, this);
    }

    switchLevel = (oldScene, newSceneString) => {
        console.log(`From ${oldScene.scene.key} to ${newSceneString}`);
        oldScene.scene.start(newSceneString);
      };

    update() {
        // Update Player Logics
        this.player.update();

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('CoreGameplayAlt');
        }

        //this.physics.add.overlap(this.player, this.goal, console.log("dog"), null, this);

    }
}

class CoreGameplayAlt extends SchismScene {

    //acursors;

    goal;

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
        this.load.image('office', 'officeLvlPast.png');
    }
    
    onEnter() {

       //let rKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

       
        // Create background
        let bg = this.add.image(0, 0, 'office').setOrigin(0);

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

        //goal
        this.goal = this.physics.add.sprite(2560*.5, 1920*.5,'solSit')
        

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

        

        this.physics.add.overlap(this.player, this.goal, () => {this.scene.start("CoreGameplay2")});
        //this.physics.add.overlap(this.player, this.goal, null, null, this);
    }

    switchLevel = (oldScene, newSceneString) => {
        console.log(`From ${oldScene.scene.key} to ${newSceneString}`);
        oldScene.scene.start(newSceneString);
      };

    update() {
        // Update Player Logics
        this.player.update();

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('CoreGameplay');
        }

        //this.physics.add.overlap(this.player, this.goal, console.log("dog"), null, this);

    }
}

class CoreGameplay2 extends SchismScene {
    constructor() {
        super("CoreGameplay2", "testing");
    }

    preload() {
        //this.load.path = '../../assets/character/';
        //this.load.image('lunebase', 'luneBaseSprite.png');
        //this.load.image('solBase', 'solBaseSprite.png');
        //this.load.image('solSit', 'solSitting.png');

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
            this.timeTravel('CoreGameplay2Alt');
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
    scene: [CoreGameplay, CoreGameplayAlt, CoreGameplay2, CoreGameplay2Alt],
    title: "Schism"
});