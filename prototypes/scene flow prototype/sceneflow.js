let gameDone = true;
class IntroCinematic extends Phaser.Scene {
    constructor() {
        super("introcinematic");
    }

    preload() {
        this.load.video('schismIntro', '/assets/title/schism intro wip.mp4');
    }

    create() {
        const video = this.add.video(0, 0, 'schismIntro').setOrigin(0);

        video.on('complete', () => {
            // Add your logic here to move on or perform any other actions
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('titlescreen');
            });
        });
        
        video.play();

        this.input.on('pointerdown', (pointer) => {
            if (gameDone) {
                video.stop();
                this.scene.start('titlescreen');
            }
        });

    }

    update() {
        // if(gameDone && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
        //     this.cameras.main.fade(1000, 0, 0, 0);
        //     this.time.delayedCall(1000, () => {
        //         this.scene.start('titlescreen');
        //     });
        // }
    }
}

class TitleScreen extends Phaser.Scene {
    constructor() {
        super("titlescreen");
    }

    preload() {
        this.load.image('title', '/assets/title/schismTitle-01.png');
        //characters
        this.load.path = '/assets/character/';
        this.load.image('lunebase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');


        //levels
        this.load.path = '/assets/levels/';
        this.load.image('office', 'officeLvlPast.png');
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        let bg = this.add.image(0, -360, 'office').setOrigin(0);
        let lune = this.add.image(300, 675, 'lunebase').setOrigin(0.5).setScale(0.8);

        let title = this.add.image(game.config.width/2, 300, 'title').setOrigin(0.5);

        let play = this.add.text(game.config.width/2, 630, 'PLAY', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
        play.setInteractive()
            .on('pointerover', () => {
                play.setColor('#006400');
                this.tweens.add({
                    targets: play,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerout', () => {
                play.setColor('#000000');
                this.tweens.add({
                    targets: play,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerdown', () => {
                this.scene.start('gameplay1');
            });

        let settings = this.add.text(game.config.width/2, 750, 'SETTINGS', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
            settings.setInteractive()
            .on('pointerover', () => {
                settings.setColor('#006400');
                this.tweens.add({
                    targets: settings,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerout', () => {
                settings.setColor('#000000');
                this.tweens.add({
                    targets: settings,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerdown', () => {
                this.scene.start('settingsmenu');
            });
    }
}

class SettingsMenu extends Phaser.Scene {
    constructor() {
        super("settingsmenu");
    }
}

class Gameplay1 extends SchismScene {
    constructor() {
        super("gameplay1", "Deez Nuts");
    }

    onEnter() {
        // Create background
        let bg = this.add.image(0, 0, 'office').setOrigin(0);

        // Create Player + Camera Follow
        this.player = new Player(this, 300, 1035, 'lunebase');
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        // Create floor
        this.floor = this.add.rectangle(0, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        // Player Physics
        this.physics.add.collider(this.player, this.floor);

        
    }

    update() {
        // Update Player Logics
        this.player.update();
    }
}

class Gameplay2 extends SchismScene {
    constructor() {
        super("gameplay2", "Deez Nuts");
    }

    preload() {
        //characters
        this.load.path = '/assets/character/';
        this.load.image('lunebase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');


        //levels
        this.load.path = '/assets/levels/';
        this.load.image('office', 'officeLvlPast.png');
    }
    
    onEnter() {
        // Create background
        let bg = this.add.image(0, 0, 'office').setOrigin(0);

        // Create Player + Camera Follow
        this.player = new Player(this, 300, 1035, 'lunebase');
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        // Create floor
        this.floor = this.add.rectangle(0, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        // Player Physics
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.worldbounds);

        this.time.delayedCall(1000, () => {
            this.startDialogue('keycard', () => {console.log("start")}, () => {console.log("finish")});
        });
    }

    update() {
        // Update Player Logics
        this.player.update();
    }
}

class EndCredits extends Phaser.Scene {

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
    scene: [IntroCinematic, TitleScreen, SettingsMenu, Gameplay1, Gameplay2, EndCredits],
    title: "Schism"
});