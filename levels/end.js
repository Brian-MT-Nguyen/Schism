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

        this.time.delayedCall(1000, () => {
            this.t1 = this.add.text(50, 1080 *.7,"Day 987: Lune, if you find this message, then you will grow to be disappointed upon my absence.", {fontSize: 32}).setDepth(playerDepth);
        } ,this)
        
        this.time.delayedCall(2000, () => {
            this.t2 = this.add.text(50, 1080 *.73,"Ever since you came into this world, I knew you would grow the heart to look for your creator.", {fontSize: 32}).setDepth(playerDepth);
        }, this);

        this.time.delayedCall(3000, () => {
            this.t3 = this.add.text(50, 1080 *.76,"I established that in you. However, after I have learned that the state of this world has fallen.", {fontSize: 32}).setDepth(playerDepth);
        }, this);

        this.time.delayedCall(4000, () => {
            this.t4 = this.add.text(game.config.width/2, 1080 *.805,"I had to create something to take care of Sol.", {fontSize: 32}).setOrigin(0.5).setDepth(playerDepth);
        }, this);

        this.time.delayedCall(5000, () => {
            this.credits = this.add.text(game.config.width/2, 1080 *.82, "Credits:\nAbraham Halim (Testing Lead)\nBrian Nguyen (Technology Lead)\nHazelle Malonzo (Art Co-Lead)\nMax Schwab (Art Co-Lead)\nSamip Niraula (Production Lead)", {fontSize: 32}).setOrigin(0.5, 0).setDepth(playerDepth);
        }, this);

        this.time.delayedCall(5000, () => {
            this.credits = this.add.text(game.config.width-300, 1080 *.1, "THE END\n\nClick anywhere to restart", {fontSize: 32}).setOrigin(0.5, 0).setDepth(playerDepth);
            this.input.on('pointerdown', () => {
                this.scene.start('introcinematic');
            });
        }, this);
    }
    
}