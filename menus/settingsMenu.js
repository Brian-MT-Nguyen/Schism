class SettingsMenu extends Phaser.Scene {
    constructor() {
        super("settingsmenu");
    }
  
    create() {
        // Update in settings var
        inSettings = true;
  
        // Create backdrop
        let bg = this.add.image(0, -360, 'office').setOrigin(0);
        let pod = this.add.image(330, 675, 'podPresent').setOrigin(0.5).setScale(1);
        let lune = this.add.image(300, 675, 'lunebase').setOrigin(0.5).setScale(0.8);
        let podDoor = this.add.image(330, 675, 'podDoor').setOrigin(0.5).setScale(1);
  
        // Create back button and interactive properties
        let back = this.add.text(game.config.width/2, 950, 'BACK', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
        back.setInteractive()
            .on('pointerdown', () => {
                back.setColor('#006400');
                this.tweens.add({
                    targets: back,
                    scale: 1.2,
                    ease: 'Expo.Out',
                    duration: 500
                });
            })
            .on('pointerup', () => {
                back.setColor('#000000');
                this.tweens.add({
                    targets: back,
                    scale: 1,
                    ease: 'Expo.Out',
                    duration: 500,
                    onComplete: () => {
                      this.scene.start('titlescreen');
                    }
                });
            })
        
        // Create placeholder text
        let placeholder = this.add.text(game.config.width/2, 300, 'Settings Placeholder Text', {font: `bold 50px Futura`, color: '#000000'})
            .setOrigin(0.5);
    }
  }