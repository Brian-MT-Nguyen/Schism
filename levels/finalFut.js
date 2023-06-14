
let barkPlace = 0;

class CoreGameplay3 extends SchismScene {
    constructor() {
        super("CoreGameplay3", "testing");
    }

    preload() {
        this.load.path = '../../assets/character/';
        this.load.image('lunebase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');
        this.load.image('enemy', 'enemyBaseSprite.png');

        //levels
        this.load.path = '../../assets/levels/';
        this.load.image('lvl3present', 'level3_present.png');

        //interactibles
        this.load.path = '../../assets/interactables/';
        this.load.image('consolePres', 'console future.PNG');

        //sound
        this.load.path = '../../assets/sound/';
        this.load.audio('woof', 'woof.mp3');

        
        
    }

    onEnter() {

        this.bgm = this.sound.add("bgm");
        this.bgm.play({
            loop: true
        });

        //let rKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
         // Create background

         

        
         let bg = this.add.image(0, 0, 'lvl3present').setOrigin(0);
 
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
         
 
         // Create floor
         this.floor = this.add.rectangle(0, 1920*.7, 2560, 100).setOrigin(0);
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

         //create enemy
         this.enemy = this.physics.add.sprite(2560 *.7, 1920*.5, 'enemy').setScale(.8);
         this.physics.add.existing(this.enemy);
         this.vision = this.physics.add.sprite(this.enemy.x-150, 1920*.5, 'enemy').setScale(.75).setAlpha(.5);

         this.physics.add.existing(this.vision);
         //this.vision.body.allowGravity = false;
         //this.vision.setVelocityX(100);
         //this.enemy.setVelocityX(-250);

         //console
         this.conPres = this.physics.add.sprite(2560 *.9, 1920*.5, 'consolePres');
         this.physics.add.existing(this.conPres);

         
 
         // Player Physics
         this.physics.add.collider(this.player, this.floor);
         this.physics.add.collider(this.player, this.worldbounds);

         // Enemy Physics
         this.physics.add.collider(this.enemy, this.floor);
         this.physics.add.collider(this.enemy, this.worldbounds);

         this.physics.add.collider(this.vision, this.floor);
         this.physics.add.collider(this.vision, this.worldbounds);

         this.physics.add.collider(this.conPres, this.floor);
         this.physics.add.collider(this.conPres, this.worldbounds);
 



         this.physics.add.overlap(this.player, this.enemy, () => {this.gotoScene("CoreGameplay3")});
         //this.physics.add.overlap(this.player, this.vision, () => {this.gotoScene("CoreGameplay3")});


         this.physics.add.overlap(this.player, this.conPres, () => {this.gotoScene("ending")});

 
         //this.physics.add.collider(this.player, this.goal);
 
         
 
         //this.physics.add.overlap(this.player, this.goal, () => {if(keyStatus == 1){this.scene.start("CoreGameplay2")}});
 
         //this.physics.add.overlap(this.player, this.desk, () => {if(atDesk == 0){atDesk = 1}});
         //this.physics.add.overlap(this.player, this.goal, null, null, this);
     }

     update() {
        // Update Player Logics
        
        this.player.update();

        //enemy vison
        //this.vision.moveTo(this.vision, this.player.x, this.player.y);

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeSound = this.sound.add("sound");
            this.timeSound.play();

            this.timeTravel('CoreGameplay3Alt');
        }

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F))) {
            this.enemy.setVelocityX(-250);
            this.vision.setVelocityX(-250);

            this.woof = this.sound.add("woof");
            this.woof.play();
            
            barkPlace = this.player.x;
        }
        if (this.enemy.x <= barkPlace){
            this.enemy.setVelocityX(0);
            this.vision.setVelocityX(0);
            //this.vision.setVelocityX(-250);
        }

        this.physics.add.overlap(this.player, this.vision, () => {this.enemy.setVelocityX(-250);
            this.vision.setVelocityX(-250);});




        /* if (this.enemy.x >= 2560*.9)
        {
            this.enemy.setVelocityX(-250);
        }
        else if (this.enemy.x <= 2560 * .45)
        {
            this.enemy.setVelocityX(250);
        } */
    }

    

}