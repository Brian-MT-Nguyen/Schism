
class ending extends Phaser.Scene {
    constructor() {
        super("ending", "ending");
    }

    preload(){

    }

    onEnter() {
        //let circle = this.add.image(1920 *.51, 1080 *.5, 'player').setScale(1.5)
        //this.add.thing(1920 *.5, 1080 *.5,"player")
        this.add.text(2560 *.5, 1920 *.5,"you did it");
        this.add.text(2560 *.47, 1920 *.6,":>");

        this.add.text(0,0,"dog");
        console.log("dog");
        //this.input.on('pointerdown', () => this.scene.start('lvl3'));
    }

    update(){
        //console.log("dog");
        this.add.text(1920 *.5, 1080 *.5,"you did it");
        this.add.text(2560 *.5, 1920 *.6,":>");
    }
    


}