//Really shit ways of seeing if we saw things in scene
let atDesk = 0;
let keyStatus = 0;
let brkCon = 0;
let platStat = 0;
//let barkPlace = 0;

const game = new Phaser.Game({

    preload() {
        //sound
        this.load.path = '../assets/sound/';
        this.load.audio('sound', 'sound.mp3');
        this.load.audio('bgm', 'bgm.mp3');
    },

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
                y : 2000
            }
        }
    },
    backgroundColor: 0x000000,
    //scene: [CoreGameplay, CoreGameplayAlt, CoreGameplay2, CoreGameplay2Alt, CoreGameplay3, CoreGameplay3Alt, ending],
    //scene: [CoreGameplay3, CoreGameplay3Alt, ending],
    scene: [CoreGameplay],
    //scene: [CoreGameplay2, CoreGameplay2Alt,CoreGameplay3],
    title: "Schism"
});