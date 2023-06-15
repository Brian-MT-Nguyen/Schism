class BeginIntro extends Phaser.Scene {
    constructor() {
        super('beginintro')
    }
    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.video('schismIntro', '../assets/title/schismCinematic.mp4');
    }
    create() {
        this.cameras.main.setBackgroundColor('#777B7E');
        // Ensure font loads in for user since it's the first scene
        WebFont.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                let veryStartText = this.add.text(
                    50,
                    50,
                    "Tap to Begin.",
                    {
                        fontFamily: "'Press Start 2P', sans-serif",
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: 40,
                        fill: "#FFFFFF"
                    }
                );
                this.input.on('pointerdown', () => {
                    this.scene.start('studiointro');
                });
            }
        });   
    }
  }
  
class StudioIntro extends Phaser.Scene {
    constructor() {
        super('studiointro')
    }
    preload() {
        this.load.path = '../assets/studio/';
        this.load.audio('sfxOpen', 'FridgeOpen.wav');
        this.load.audio('sfxClose', 'FridgeClose.wav');
        this.load.image('gfc', 'GreenFridgeClosed.png');
        this.load.image('gfho', 'GreenFridgeHalfOpened.png');
        this.load.image('gfo', 'GreenFridgeOpened.png');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    create() {
  
        this.cameras.main.setBackgroundColor('#777B7E');
        //preload studio text
        let studioText = this.add.text(
            1030,
            490,
            "Ham and Cheese\nSandwich Studios",
            {
                fontFamily: "'Press Start 2P', sans-serif",
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: 37,
                fill: "#000000",
                lineSpacing: 30,
                align: 'center',
                wordWrap: true,
                wordWrapWidth: 400
            }
        );
        studioText.setOrigin(0.5,0.5);
        studioText.setScale(0);
  
        this.anims.create({
            key: 'GreenFridgeOpenAnimation',
            frames: [
                { key: 'gfc' },
                { key: 'gfho' },
                { key: 'gfo' }
            ],
            frameRate: 3, // frames per second
        });
  
        this.anims.create({
            key: 'GreenFridgeCloseAnimation',
            frames: [
                { key: 'gfo' },
                { key: 'gfho' },
                { key: 'gfc' }
            ],
            frameRate: 15, // frames per second
        });
        let fridge = this.add.sprite(960, 250, 'gfc');
        fridge.setOrigin(0.5,0.5);
        fridge.setScale(0,0);
        studioText.depth = fridge.depth + 1;
        this.tweens.add({
            targets: fridge,
            scale: 0.83,
            duration: 3000,
            ease: 'Linear',
            onComplete: () => {
                this.sound.play('sfxOpen');
                fridge.play('GreenFridgeOpenAnimation');
                fridge.on('animationcomplete', () => {
                    studioText.visible = true;
                    this.tweens.add({
                        targets: studioText,
                        angle: 360,
                        scale: 1,
                        duration: 1000,
                        hold: 2000,
                        yoyo: true,
                        onComplete: () => {
                            fridge.setScale(0);
                            let fridgeClosed = this.add.sprite(960, 250, 'gfo').setScale(0.83);
                            fridgeClosed.setOrigin(0.5,0.5);
                            fridgeClosed.play('GreenFridgeCloseAnimation');
                            this.sound.play('sfxClose');
                            fridgeClosed.on('animationcomplete', () => {
                              // Fade camera to Title Screen
                              this.cameras.main.fade(1000);
                              this.time.delayedCall(990, () => this.scene.start('introcinematic'));
                            });
                        }
                    });
                });
            }
        });
    }
}

class IntroCinematic extends Phaser.Scene {
    constructor() {
        super("introcinematic");
    }

    create() {
        let video = this.add.video(game.config.width/2, game.config.height/2, 'schismIntro');

        video.on('complete', () => {
            // Add your logic here to move on or perform any other actions
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('titlescreen');
            });
        });

        video.play();

        if(gameDone) {
            let skip = this.add.text(100, 980, 'Click to Skip...', {font: `bold 50px Futura`, color: '#ffffff'})
                .setOrigin(0).setAlpha(0);
                this.time.delayedCall(500, () => {
                    this.tweens.add({
                        targets: skip,
                        alpha: 1,
                        ease: 'Linear',
                        duration: 1000,
                        yoyo: true,
                        repeat: -1
                    });
                });
            this.input.on('pointerdown', () => {
                video.stop();
                this.scene.start('titlescreen');
            });
        }
    }
}