
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

        this.add.text(1920 *.3, 1080 *.7,"Day 987: Lune, if you find this message, then you will grow to be disappointed upon my absence.").setDepth(playerDepth);
        this.add.text(1920 *.3, 1080 *.72,"Ever since you came into this world, I knew you would grow the heart to look for your creator.").setDepth(playerDepth);
        this.add.text(1920 *.3, 1080 *.74,"I established that in you. However, after I have learned that the state of this world has fallen. I had to create something to take care of Sol.").setDepth(playerDepth);
        this.add.text(1920 *.3, 1080 *.72,"Ever since you came into this world\n I knew you would grow the heart to look for your creator.").setDepth(playerDepth);
    }
}