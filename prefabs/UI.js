class UI extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, arrow, interact, mute, swap, fullScreen, unmute){
        super(scene, arrow, interact, mute, swap, fullScreen, unmute);

        let muteStatus = 0;

        // Left Button
        this.leftButton = scene.add.sprite(0, 0, arrow).setScale(0.12);
        this.leftButton.setFlipX(true);
        this.leftButton.setScrollFactor(0);
        this.leftButton.setInteractive();

        // Right Button
        this.rightButton = scene.add.sprite(0, 0, arrow).setScale(0.12);
        this.rightButton.setScrollFactor(0);
        this.rightButton.setInteractive();

        // Up Button
        this.upButton = scene.add.sprite(0, 0, arrow).setScale(0.12);
        this.upButton.angle += 270;
        this.upButton.setScrollFactor(0);
        this.upButton.setInteractive();

        // Interact Button
        this.interactButton = scene.add.sprite(0, 0, interact).setScale(0.12);
        this.interactButton.setScrollFactor(0);
        this.interactButton.setInteractive();

        // Mute Button
        this.muteButton = scene.add.sprite(0, 0, mute).setScale(0.12);
        this.muteButton.setScrollFactor(0);
        this.muteButton.setInteractive()
        .on('pointerdown', () => {
            if(muteStatus == 0){
                this.muteButton = this.muteButton.setTexture(unmute)
                game.sound.mute = true;
                muteStatus = 1;
            }else{
                this.muteButton = this.muteButton.setTexture(mute)
                game.sound.mute = false;
                muteStatus = 0;
            }
        })
        
        // Swap Button
        this.swapButton = scene.add.sprite(0, 0, swap).setScale(0.12);
        this.swapButton.setScrollFactor(0);
        this.swapButton.setInteractive();

        // fullscreen
        this.fsButton = scene.add.sprite(0,0,fullScreen);
        this.fsButton.setScrollFactor(0);
        this.fsButton.setInteractive()
        .on('pointerdown', () => {
            if (scene.scale.isFullscreen) {
                scene.scale.stopFullscreen();
            } else {
                scene.scale.startFullscreen();
            }
        })
    }
    
    update() {
        // Movement Buttons
        this.leftButton.x = this.scene.cameras.main.x + (100);
        this.leftButton.y = this.scene.cameras.main.y + (980);

        this.rightButton.x = this.scene.cameras.main.x + (300);
        this.rightButton.y = this.scene.cameras.main.y + (980);

        this.upButton.x = this.scene.cameras.main.x + (1820);
        this.upButton.y = this.scene.cameras.main.y + (980);

        // Interact Button
        this.interactButton.x = this.scene.cameras.main.x + (1820);
        this.interactButton.y = this.scene.cameras.main.y + (780);

        // Mute Button
        this.muteButton.x = this.scene.cameras.main.x + (1820);
        this.muteButton.y = this.scene.cameras.main.y + (100);

        // Swap Button
        this.swapButton.x = this.scene.cameras.main.x + (1620);
        this.swapButton.y = this.scene.cameras.main.y + (980);
        //FS 
        this.fsButton.x = this.scene.cameras.main.x + (100);
        this.fsButton.y = this.scene.cameras.main.y + (100);
    }
}