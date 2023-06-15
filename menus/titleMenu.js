class TitleScreen extends Phaser.Scene {
    constructor() {
        super("titlescreen");
    }
  
    preload() {
        //title
        this.load.image('title', 'assets/title/schismTitle-01.png');
  
        //characters
        this.load.path = 'assets/character/';
        this.load.image('lunebase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');
  
        //levels
        this.load.path = 'assets/levels/';
        this.load.image('office', 'scene_1_present.png');
  
        //Interactables
        this.load.path = 'assets/interactables/';
        this.load.image('podPresent', 'podPresent.png');
        this.load.image('podDoor', 'podDoor.png');

        //sound
        this.load.path = 'assets/sound/';
        this.load.audio('sound', 'sound.mp3');
        this.load.audio('bgm', 'bgm.mp3');
    }
  
    create() {
        if(bgm == undefined) {
            bgm = this.sound.add("bgm");
            bgm.play({
                loop: true
            });
        }

        // Create backdrop
        let bg = this.add.image(0, -360, 'office').setOrigin(0);
        let pod = this.add.image(330, 675, 'podPresent').setOrigin(0.5).setScale(1);
        let lune = this.add.image(300, 675, 'lunebase').setOrigin(0.5).setScale(0.8);
        let podDoor = this.add.image(330, 675, 'podDoor').setOrigin(0.5).setScale(1);
  
        // Jitter Lune Tween
        this.tweens.add({
          targets: lune,
          angle: '+=1',
          duration: 250,
          repeat: -1
        });
  
        // Create title image
        let title = this.add.image(game.config.width/2, 300, 'title').setOrigin(0.5);
  
        // Create play button and interactive properties
        let play = this.add.text(game.config.width/2, 630, 'PLAY', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
        play.on('pointerdown', () => {
                play.setColor('#006400');
                this.tweens.add({
                    targets: play,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerup', () => {
                play.setColor('#000000');
                this.tweens.add({
                    targets: play,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500,
                    onComplete: () => {
                      this.scene.start('officepresent');
                    }
                });
            })
  
            play.preFX.setPadding(32);
  
            const fx = play.preFX.addGlow();
      
            this.tweens.add({
              targets: fx,
              outerStrength: 15,
              yoyo: true,
              loop: -1,
              ease: 'sine.inout'
          });
  
          this.tweens.add({
              targets: play,
              angle: '+=1',
              duration: 250,
              repeat: -1
            });
            
        if(!inSettings) {
            this.tweens.add({
                targets: title,
                scale: 1,
                alpha: {from: 0, to: 1},
                duration: 2500
            });
        }
        
  
        // Create settings button and interactive properties
        let settings = this.add.text(game.config.width/2, 750, 'SETTINGS', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
            settings.on('pointerdown', () => {
                settings.setColor('#006400');
                this.tweens.add({
                    targets: settings,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerup', () => {
                settings.setColor('#000000');
                this.tweens.add({
                    targets: settings,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500,
                    onComplete: () => {
                      this.scene.start('settingsmenu');
                    }
                });
            })
        
        // Logic for if getting out of settings or not
        if (inSettings != true) {
            this.cameras.main.fadeIn(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                play.setInteractive();
            });
            this.time.delayedCall(1000, () => {
                settings.setInteractive();
            });
        } else {
            play.setInteractive();
            settings.setInteractive();
        }
        inSettings = false;
    }
}