// Menu variables
let gameDone = true;
let inSettings = false;

// Depth variables
const envDepth = 0;
const playerDepth = 3;
const dogDepth = 2;
const objectDepth = 1;

let barkPlace = 0;

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
    //BeginIntro, StudioIntro, IntroCinematic, TitleScreen, SettingsMenu, 
    scene: [OfficePresent, OfficePast, CranePresent, CranePast, StealthPresent, StealthPast, ending],
    title: "Schism"
});