// Menu variables
let gameDone = true;
let inSettings = false;

// Depth variables
const envDepth = 0;
const playerDepth = 3;
const dogDepth = 2;
const objectDepth = 1;
const objectForeDepth = 4;
const dialogueDepth = 6;
const uiDepth = 5;

let bgm;
let muteStatus = 0;
let barkPlace = 0;

const game = new Phaser.Game({
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
    //scene: [BeginIntro, StudioIntro, IntroCinematic, TitleScreen, SettingsMenu, OfficePresent, OfficePast, CranePresent, CranePast, StealthPresent, StealthPast, ending],4
    scene: [CranePresent,CranePast],
    title: "Schism"
});