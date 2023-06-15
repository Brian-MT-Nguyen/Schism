
class StealthPast extends SchismScene {
    constructor() {
        super("stealthpast", "Level3Past");
    }

    preload() {
        this.load.path = '../../assets/character/';
        this.load.image('lunebase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');
        this.load.image('dedemy', 'enemyBaseSprite_disabled.png');

        //levels
        this.load.path = '../../assets/levels/';
        this.load.image('lvl3past', 'level3Past.png');

        //interactibles
        this.load.path = '../../assets/interactables/';
        this.load.image('consolePast', 'console past.PNG');

    

    }

    onEnter() {

        this.bgm = this.sound.add("bgm");
        this.bgm.play({
            loop: true
        });

        //let rKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
         // Create background
         let bg = this.add.image(0, 0, 'lvl3past').setOrigin(0);
 
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
         this.ded = this.physics.add.sprite(2560 *.7, 1920*.5, 'dedemy').setScale(.9);
         this.physics.add.existing(this.ded);
         //this.enemy.setVelocityX(-250);

         //console
         this.conPres = this.physics.add.sprite(2560 *.9, 1920*.5, 'consolePast');
         this.physics.add.existing(this.conPres);
 
         // Player Physics
         this.physics.add.collider(this.player, this.floor);
         this.physics.add.collider(this.player, this.worldbounds);

         // Enemy Physics
         this.physics.add.collider(this.ded, this.floor);
         this.physics.add.collider(this.ded, this.worldbounds);

         //console
         this.physics.add.collider(this.conPres, this.floor);
         this.physics.add.collider(this.conPres, this.worldbounds);
 
 

 
         //this.physics.add.collider(this.player, this.goal);
 
         
 
         //this.physics.add.overlap(this.player, this.goal, () => {if(keyStatus == 1){this.scene.start("CoreGameplay2")}});
 
         //this.physics.add.overlap(this.player, this.desk, () => {if(atDesk == 0){atDesk = 1}});
         //this.physics.add.overlap(this.player, this.goal, null, null, this);
     }

     pickUp() {
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F))) {
                  console.log("the console is very broken");
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
            this.timeSound = this.sound.add("sound");
            this.timeSound.play();
            this.timeTravel('CoreGameplay3');
        }

        
    }
}
