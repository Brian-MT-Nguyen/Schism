class CoreGameplay2Alt extends SchismScene {
    constructor() {
        super("CoreGameplay2Alt", "CoreGameplay2Alt");
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

        this.bgm = this.sound.add("bgm");
        this.bgm.play({
            loop: true
        });

        platStat = 0;
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
        this.physics.add.collider(this.player, this.plat);
        this.physics.add.collider(this.player, this.worldbounds);

        this.physics.add.overlap(this.player, this.activate, this.pickUp, null, this);
        
    }

    pickUp() {
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F))) {
            this.plat = this.add.rectangle(2560*.4, 1250, 2560*.47, 100, 0xff0000).setOrigin(0);
            this.physics.add.existing(this.plat);
            this.plat.body.allowGravity = false;
            this.plat.body.immovable = true;

            this.physics.add.collider(this.player, this.plat);
              }
      }

    update() {
        // Update Player Logics
        this.player.update();

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.player.text.setText("swssh");
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('CoreGameplay2');
            this.timeSound = this.sound.add("sound");
            this.timeSound.play();
        }
    }
}