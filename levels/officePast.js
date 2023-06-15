
class OfficePast extends SchismScene {

    //acursors;

    //goal;

    constructor() {
        super("officepast", "Level1Past");
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

        //UI
        this.ui = new UI(this, "right", "interact", "mute", "swap");

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
        //this.player.update();
        let mobileControls = [this.ui.leftButton, this.ui.rightButton, this.ui.upButton];
        this.player.update(mobileControls);
        this.ui.update();

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.player.text.setText("swssh");
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeSound = this.sound.add("sound");
            this.timeSound.play();
            this.timeTravel('CoreGameplay');
        }

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F))) {
            
            //Put desk note test here somehow
            //console.log("desk note desc");

            if(keyStatus == 1){
                console.log("keys aquired");
                this.player.text.setText("keys aquired");
            }
            else{
                console.log("no keys");
                this.player.text.setText("no keys");
            }
            

        }

        //this.physics.add.overlap(this.player, this.goal, console.log("dog"), null, this);

    }
}