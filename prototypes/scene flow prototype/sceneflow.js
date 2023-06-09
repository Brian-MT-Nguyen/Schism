let gameDone = true;
let inSettings = false;

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
            this.input.on('pointerdown', (pointer) => {
                video.stop();
                this.scene.start('titlescreen');
            });
        }
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
        // Create backdrop
        let bg = this.add.image(0, -360, 'office').setOrigin(0);
        let lune = this.add.image(300, 675, 'lunebase').setOrigin(0.5).setScale(0.8);

        // Create title image
        let title = this.add.image(game.config.width/2, 300, 'title').setOrigin(0.5);

        // Create play button and interactive properties
        let play = this.add.text(game.config.width/2, 630, 'PLAY', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
        play.on('pointerover', () => {
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

        // Create settings button and interactive properties
        let settings = this.add.text(game.config.width/2, 750, 'SETTINGS', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
            settings.on('pointerover', () => {
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

class SettingsMenu extends Phaser.Scene {
    constructor() {
        super("settingsmenu");
    }

    create() {
        // Update in settings var
        inSettings = true;

        // Create backdrop
        let bg = this.add.image(0, -360, 'office').setOrigin(0);
        let lune = this.add.image(300, 675, 'lunebase').setOrigin(0.5).setScale(0.8);

        // Create back button and interactive properties
        let back = this.add.text(game.config.width/2, 950, 'BACK', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
        back.setInteractive()
            .on('pointerover', () => {
                back.setColor('#006400');
                this.tweens.add({
                    targets: back,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerout', () => {
                back.setColor('#000000');
                this.tweens.add({
                    targets: back,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerdown', () => {
                this.scene.start('titlescreen');
            });
        
        // Create placeholder text
        let placeholder = this.add.text(game.config.width/2, 300, 'Settings Placeholder Text', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
    }
}

class Gameplay1 extends SchismScene {
    constructor() {
        super("gameplay1", "Deez Nuts");
    }

    onEnter() {
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

        // Create floor
        this.floor = this.add.rectangle(0, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        // Create instructions for prototype
        let instructions = this.add.text(game.config.width/2, 1320, 'A to Move Left, D to Move Right, Space to Jump\nPress E to switch to Past Gameplay Scene\nGet to the door on the right and Press E on it to go to final End Credits Scene (Must be in this scene)', {font: `40px Futura`, color: '#000000'})
            .setOrigin(0.5);

        // Create Door interact box
        let interactDoorHitbox = this.add.rectangle()

        // Player Physics
        this.physics.add.collider(this.player, this.floor);
    }

    update() {
        // Update Player Logics
        this.player.update();

        // If E press update player coords, disable body, time travel
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('gameplay2');
        }
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
        this.floor = this.add.rectangle(0, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        // Player Physics
        this.physics.add.collider(this.player, this.floor);

        // Create instructions for prototype
        let instructions = this.add.text(game.config.width/2, 1320, 'Press E to switch back to Present Gameplay Scene\nMust go back to reach final End Credits Scene', {font: `40px Futura`, color: '#000000'})
            .setOrigin(0.5);
    }

    update() {
        // Update Player Logics
        this.player.update();

        // If E press update player coords, disable body, time travel
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.player.body.enable = false;
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('gameplay1');
        }
    }
}

class EndCredits extends Phaser.Scene {
    constructor() {
        super("endcredits");
    }

    preload() {
        gameDone = true;
    }

    create() {

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
    scene: [IntroCinematic, TitleScreen, SettingsMenu, Gameplay1, Gameplay2, EndCredits],
    title: "Schism"
});