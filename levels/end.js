
class ending extends Phaser.Scene {
    constructor() {
        super("ending", "ending");
    }

    preload(){
        this.load.path = 'assets/levels/';
        this.load.image('end', 'endscreen.png');
    }

    create() {

        let bg = this.add.image(0, 0, 'end').setOrigin(0).setDepth(envDepth);

        this.add.text(1920 *.5, 1080 *.5,"you did it").setDepth(playerDepth);
    }
}