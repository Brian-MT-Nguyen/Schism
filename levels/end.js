
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

        this.time.delayedCall(1000, () => {this.t1 = this.add.text(1920 *.1, 1080 *.7,"Day 987: Lune, if you find this message, then you will grow to be disappointed upon my absence.").setDepth(playerDepth);} ,this)
        
        this.time.delayedCall(2000, () => {this.t2 = this.add.text(1920 *.1, 1080 *.73,"Ever since you came into this world, I knew you would grow the heart to look for your creator.").setDepth(playerDepth);}, this);

        this.time.delayedCall(3000, () => {this.t3 = this.add.text(1920 *.1, 1080 *.76,"I established that in you. However, after I have learned that the state of this world has fallen.").setDepth(playerDepth).set;}, this);

        this.time.delayedCall(4000, () => {this.t4 = this.add.text(1920 *.3, 1080 *.79,"I had to create something to take care of Sol.").setDepth(playerDepth);}, this);

        this.t1.setFontSize(28);
        this.t2.setFontSize(28);
        this.t3.setFontSize(28);
        this.t4.setFontSize(28);
    }
    
}