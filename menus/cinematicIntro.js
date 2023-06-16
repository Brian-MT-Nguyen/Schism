class IntroCinematic extends Phaser.Scene {
    constructor() {
        super("introcinematic");
    }

    preload() {
        this.load.video('schismIntro', '../../assets/title/schismCinematic.mp4');

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

        if(!gameDone) {
            let skip = this.add.text(100, 980, 'Click to Begin...', {font: `bold 50px Futura`, color: '#ffffff'})
                .setOrigin(0);
            this.input.on('pointerdown', () => {
                skip.visible = false;
                video.play();
            });
        } else {
            video.play();
        }

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