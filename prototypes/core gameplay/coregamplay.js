//Really shit ways of seeing if we saw things in scene
let atDesk = 0;
let keyStatus = 0;
let brkCon = 0;
let platStat = 0;

const game = new Phaser.Game({
    input: {
        multiTouch: true,
        activePointers: 2
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
    scene: [CoreGameplay, CoreGameplayAlt, CoreGameplay2, CoreGameplay2Alt, CoreGameplay3, CoreGameplay3Alt, ending],
    //scene: [CoreGameplayAlt],
    //scene: [CoreGameplay3, CoreGameplay3Alt, ending],
    //scene:[ending],
    //scene: [CoreGameplay2, CoreGameplay2Alt,CoreGameplay3],
    title: "Schism"
});