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

        //sound
        this.load.path = '../../assets/sound/';
        this.load.audio('sound', 'sound.mp3');
        this.load.audio('bgm', 'bgm.mp3');

        //UI
        this.load.path = '../../assets/UI/';
        this.load.image('right', 'right.png');
        this.load.image('interact', 'interact.png');
        this.load.image('mute', 'mute.png');
        this.load.image('sound', 'sound.png');
        this.load.image('swap', 'swap.png');
    }
    
    onEnter() {

        this.bgm = this.sound.add("bgm");
        this.bgm.play({
            loop: true
        });

        // Create background
        let bg = this.add.image(0, 0, 'lvl1Pres').setOrigin(0);

        //UI
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

        //cc
        this.cc = new cc(this, this.player.x, this.player.y);

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

        this.time.delayedCall(6000, () => {this.startDialogue("keycard", () => {console.log("test")}, () => {console.log("test")})});

        

        this.physics.add.overlap(this.player, this.goal, () => {if(keyStatus == 1){this.scene.start("CoreGameplay2")}});

        this.physics.add.overlap(this.player, this.desk, () => {if(atDesk == 0){atDesk = 1}});
        //this.physics.add.overlap(this.player, this.goal, null, null, this);
    }

    update() {
        // Update Player Logics

        //let atDesk = 0; 
        let mobileControls = [this.ui.leftButton, this.ui.rightButton, this.ui.upButton];
        this.player.update(mobileControls);
        this.ui.update();

        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
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

       this.bgm = this.sound.add("bgm");
       this.bgm.play({
        loop: true
    });

       
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
            this.timeSound = this.sound.add("sound");
            this.timeSound.play();
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

        this.bgm = this.sound.add("bgm");
        this.bgm.play({
            loop: true
        });
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

        //goal
        this.goal = this.add.rectangle(2560 * 0.9, 1920 * 0.5, 2560 *0.1 , 1920 * 0.15, 0xff0000).setOrigin(0);
        this.physics.add.existing(this.goal);
        this.goal.body.allowGravity = false;
        this.goal.body.immovable = true;


        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.floor2);
        this.physics.add.collider(this.player, this.worldbounds);

        //this.physics.add.overlap(this.player, this.brokeConsole, () => {if(brkCon == 0){brkCon = 1}});
        this.physics.add.overlap(this.player, this.brokeConsole, this.pickUp, null, this);
        this.physics.add.overlap(this.player, this.goal, () => {this.scene.start("CoreGameplay3")});
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
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeSound = this.sound.add("sound");
            this.timeSound.play();
            this.timeTravel('CoreGameplay2Alt');
        }


        /* if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F))) {
            
            //Put desk note test here somehow
            //console.log("desk note desc");

            if(brkCon == 1){
                console.log("the console is very broken");
            }
            else{
                console.log("check the console");
            }
            

        } */
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

        // create moving platform
        /* this.plat = this.add.rectangle(2560*.4, 1920, 2560*.47, 100, 0xff0000).setOrigin(0);
        this.physics.add.existing(this.plat);
        this.plat.body.allowGravity = false;
        this.plat.body.immovable = true; */


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
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('CoreGameplay2');
            this.timeSound = this.sound.add("sound");
            this.timeSound.play();
        }

        /* if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F))) {
            
            //Put desk note test here somehow
            //console.log("desk note desc");

            this.physics.add.overlap(this.player, this.activate,
                 () => {
                    if(platStat == 0){
                        platStat = 1;
                        this.plat = this.add.rectangle(2560*.4, 1250, 2560*.47, 100, 0xff0000).setOrigin(0);
                        this.physics.add.existing(this.plat);
                        this.plat.body.allowGravity = false;
                        this.plat.body.immovable = true;

                        this.physics.add.collider(this.player, this.plat);
            }});
        } */
    }
}

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

class CoreGameplay3Alt extends SchismScene {
    constructor() {
        super("CoreGameplay3Alt", "testing");
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
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeSound = this.sound.add("sound");
            this.timeSound.play();
            this.timeTravel('CoreGameplay3');
        }

        
    }
}

class ending extends Phaser.Scene {
    constructor() {
        super("ending", "ending");
    }

    preload(){

    }

    onEnter() {
        //let circle = this.add.image(1920 *.51, 1080 *.5, 'player').setScale(1.5)
        //this.add.thing(1920 *.5, 1080 *.5,"player")
        this.add.text(2560 *.5, 1920 *.5,"you did it");
        this.add.text(2560 *.47, 1920 *.6,":>");

        this.add.text(0,0,"dog");
        console.log("dog");
        //this.input.on('pointerdown', () => this.scene.start('lvl3'));
    }

    update(){
        //console.log("dog");
        this.add.text(1920 *.5, 1080 *.5,"you did it");
        this.add.text(2560 *.5, 1920 *.6,":>");
    }
    


}
const game = new Phaser.Game({
    input: {
        multiTouch: true,
        activePointers: 2
    },    
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
    scene: [CoreGameplay, CoreGameplayAlt, CoreGameplay2, CoreGameplay2Alt, CoreGameplay3, CoreGameplay3Alt, ending],
    //scene: [CoreGameplay3, CoreGameplay3Alt, ending],
    //scene:[ending],
    //scene: [CoreGameplay2, CoreGameplay2Alt,CoreGameplay3],
    title: "Schism"
});