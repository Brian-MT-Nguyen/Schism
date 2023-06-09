class CoreGameplay extends SchismScene {

    //acursors;

    goal;

    constructor() {
        super("coregameplay", "Deez Nuts");
    }

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
    
    onEnter() {

       //let rKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

       
        // Create background
        let bg = this.add.image(0, 0, 'office').setOrigin(0);

        // Create Player
        this.player = new Player(this, 300, 1035, 'lunebase');
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        //goal
        //this.goal = this.Phaser.Physics.Arcade.Sprite.add.staticGroup();

        //this.goal.create(2560*.95, 1920*.59,'solSit').refreshBody()

        this.goal = this.physics.add.sprite(2560*.5, 1920*.5,'lunebase')

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

        //this.physics.add.overlap(this.player, this.goal, console.log("dog"), null, this);

    }
}

class CoreGameplay2 extends SchismScene {

    //keyboard;

    

    constructor() {
        super("CoreGameplay2", "testing");
    }

    preload() {
        this.load.path = '../assets/character/';
        this.load.image('lunebase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');

        //levels
        this.load.path = '../assets/levels/';
        this.load.image('lvl', 'level2_present.png');
    }

    onEnter() {

        let tense = 0;
        // Create background
        let bg = this.add.image(0, 0, 'lvl').setOrigin(0);

        // Create Player
        this.player = new Player(this, 300, 1035, 'lunebase');
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        // Create left floor
        this.floor = this.add.rectangle(0, 1250, 2560*.4, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;
        
        // create right floor
        this.floor2 = this.add.rectangle(2560*.87, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor2);
        this.floor2.body.allowGravity = false;
        this.floor2.body.immovable = true;

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
    }

    update() {
        // Update Player Logics
        this.player.update();

        //let fKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        var fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        if (fKey.isDown)
        {
            console.log("dog")
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
                y : 500
            }
        }
    },
    backgroundColor: 0x000000,
    scene: [CoreGameplay, CoreGameplay2],
    title: "Schism"
});