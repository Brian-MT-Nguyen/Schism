let gameDone = false;
let inSettings = false;

class BeginIntro extends Phaser.Scene {
  constructor() {
      super('beginintro')
  }
  preload() {
      this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }
  create() {
      this.cameras.main.setBackgroundColor('#777B7E');
      // Ensure font loads in for user since it's the first scene
      WebFont.load({
          google: {
              families: ['Press Start 2P']
          },
          active: () => {
              let veryStartText = this.add.text(
                  50,
                  50,
                  "Tap to Begin.",
                  {
                      fontFamily: "'Press Start 2P', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: 40,
                      fill: "#FFFFFF"
                  }
              );
              this.input.on('pointerdown', () => {
                  this.scene.start('studiointro');
              });
          }
      });   
  }
}

class StudioIntro extends Phaser.Scene {
  constructor() {
      super('studiointro')
  }
  preload() {
      this.load.path = '../../assets/studio/';
      this.load.audio('sfxOpen', 'FridgeOpen.wav');
      this.load.audio('sfxClose', 'FridgeClose.wav');
      this.load.image('gfc', 'GreenFridgeClosed.png');
      this.load.image('gfho', 'GreenFridgeHalfOpened.png');
      this.load.image('gfo', 'GreenFridgeOpened.png');
      this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }
  create() {

      this.cameras.main.setBackgroundColor('#777B7E');
      //preload studio text
      let studioText = this.add.text(
          1030,
          490,
          "Ham and Cheese\nSandwich Studios",
          {
              fontFamily: "'Press Start 2P', sans-serif",
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: 37,
              fill: "#000000",
              lineSpacing: 30,
              align: 'center',
              wordWrap: true,
              wordWrapWidth: 400
          }
      );
      studioText.setOrigin(0.5,0.5);
      studioText.setScale(0);

      this.anims.create({
          key: 'GreenFridgeOpenAnimation',
          frames: [
              { key: 'gfc' },
              { key: 'gfho' },
              { key: 'gfo' }
          ],
          frameRate: 3, // frames per second
      });

      this.anims.create({
          key: 'GreenFridgeCloseAnimation',
          frames: [
              { key: 'gfo' },
              { key: 'gfho' },
              { key: 'gfc' }
          ],
          frameRate: 15, // frames per second
      });
      let fridge = this.add.sprite(960, 250, 'gfc');
      fridge.setOrigin(0.5,0.5);
      fridge.setScale(0,0);
      studioText.depth = fridge.depth + 1;
      this.tweens.add({
          targets: fridge,
          scale: 0.83,
          duration: 3000,
          ease: 'Linear',
          onComplete: () => {
              this.sound.play('sfxOpen');
              fridge.play('GreenFridgeOpenAnimation');
              fridge.on('animationcomplete', () => {
                  studioText.visible = true;
                  this.tweens.add({
                      targets: studioText,
                      angle: 360,
                      scale: 1,
                      duration: 1000,
                      hold: 2000,
                      yoyo: true,
                      onComplete: () => {
                          fridge.setScale(0);
                          let fridgeClosed = this.add.sprite(960, 250, 'gfo').setScale(0.83);
                          fridgeClosed.setOrigin(0.5,0.5);
                          fridgeClosed.play('GreenFridgeCloseAnimation');
                          this.sound.play('sfxClose');
                          fridgeClosed.on('animationcomplete', () => {
                            // Fade camera to Title Screen
                            this.cameras.main.fade(1000);
                            this.time.delayedCall(990, () => this.scene.start('titlescreen'));
                          });
                      }
                  });
              });
          }
      });
  }
}


class TitleScreen extends Phaser.Scene {
  constructor() {
      super("titlescreen");
  }

  preload() {
      //title
      this.load.image('title', '../../assets/title/schismTitle-01.png');

      //characters
      this.load.path = '../../assets/character/';
      this.load.image('lunebase', 'luneBaseSprite.png');
      this.load.image('solBase', 'solBaseSprite.png');
      this.load.image('solSit', 'solSitting.png');

      //levels
      this.load.path = '../../assets/levels/';
      this.load.image('office', 'scene_1_present.png');

      //Interactables
      this.load.path = '../../assets/interactables/';
      this.load.image('podPresent', 'podPresent.PNG');
      this.load.image('podDoor', 'podDoor.PNG');
  }

  create() {
      // Create backdrop
      let bg = this.add.image(0, -360, 'office').setOrigin(0);
      let pod = this.add.image(330, 675, 'podPresent').setOrigin(0.5).setScale(1);
      let lune = this.add.image(300, 675, 'lunebase').setOrigin(0.5).setScale(0.8);
      let podDoor = this.add.image(330, 675, 'podDoor').setOrigin(0.5).setScale(1);

      //tween

      this.tweens.add({
        targets: lune,
        angle: '+=1',
        duration: 250,
        repeat: -1
      });




      // Create title image
      let title = this.add.image(game.config.width/2, 300, 'title').setOrigin(0.5);

      // Create play button and interactive properties
      let play = this.add.text(game.config.width/2, 630, 'PLAY', {font: `bold 50px Futura`, color: '#000000'})
          .setOrigin(0.5);
      play.on('pointerdown', () => {
              play.setColor('#006400');
              this.tweens.add({
                  targets: play,
                  scale: 1.2,
                  ease: 'Expo.Out',
                  duration: 500
              });
          })
          .on('pointerup', () => {
              play.setColor('#000000');
              this.tweens.add({
                  targets: play,
                  scale: 1,
                  ease: 'Expo.Out',
                  duration: 500,
                  onComplete: () => {
                    this.scene.start('gameplay1');
                  }
              });
          })

          play.preFX.setPadding(32);

          const fx = play.preFX.addGlow();
    
          this.tweens.add({
            targets: fx,
            outerStrength: 15,
            yoyo: true,
            loop: -1,
            ease: 'sine.inout'
        });

        this.tweens.add({
            targets: play,
            angle: '+=1',
            duration: 250,
            repeat: -1
          });

      this.tweens.add({
          targets: title,
          scale: 1,
          alpha: {from: 0, to: 1},
          duration: 2500
      });
      

      // Create settings button and interactive properties
      let settings = this.add.text(game.config.width/2, 750, 'SETTINGS', {font: `bold 50px Futura`, color: '#000000'})
          .setOrigin(0.5);
          settings.on('pointerdown', () => {
              settings.setColor('#006400');
              this.tweens.add({
                  targets: settings,
                  scale: 1.2,
                  ease: 'Expo.Out',
                  duration: 500
              });
          })
          .on('pointerup', () => {
              settings.setColor('#000000');
              this.tweens.add({
                  targets: settings,
                  scale: 1,
                  ease: 'Expo.Out',
                  duration: 500,
                  onComplete: () => {
                    this.scene.start('settingsmenu');
                  }
              });
          })
      
      // Logic for if getting out of settings or not
      if (inSettings != true) {
          this.cameras.main.fadeIn(1000, 0, 0, 0);
          this.time.delayedCall(1000, () => {
              play.setInteractive();
          });
          this.time.delayedCall(1000, () => {
              settings.setInteractive();
          });
      } else {
          play.setInteractive();
          settings.setInteractive();
      }
      inSettings = false;
  }

  
}

class SettingsMenu extends Phaser.Scene {
  constructor() {
      super("settingsmenu");
  }

  create() {
      // Update in settings var
      inSettings = true;

      // Create backdrop
      let bg = this.add.image(0, -360, 'office').setOrigin(0);
      let pod = this.add.image(330, 675, 'podPresent').setOrigin(0.5).setScale(1);
      let lune = this.add.image(300, 675, 'lunebase').setOrigin(0.5).setScale(0.8);
      let podDoor = this.add.image(330, 675, 'podDoor').setOrigin(0.5).setScale(1);

      // Create back button and interactive properties
      let back = this.add.text(game.config.width/2, 950, 'BACK', {font: `bold 50px Futura`, color: '#000000'})
          .setOrigin(0.5);
      back.setInteractive()
          .on('pointerdown', () => {
              back.setColor('#006400');
              this.tweens.add({
                  targets: back,
                  scale: 1.2,
                  ease: 'Expo.Out',
                  duration: 500
              });
          })
          .on('pointerup', () => {
              back.setColor('#000000');
              this.tweens.add({
                  targets: back,
                  scale: 1,
                  ease: 'Expo.Out',
                  duration: 500,
                  onComplete: () => {
                    this.scene.start('titlescreen');
                  }
              });
          })
      
      // Create placeholder text
      let placeholder = this.add.text(game.config.width/2, 300, 'Settings Placeholder Text', {font: `bold 50px Futura`, color: '#000000'})
          .setOrigin(0.5);
  }
}


class Gameplay1 extends SchismScene {
  constructor() {
      super("gameplay1", "Deez Nuts");
  }

  onEnter() {

    
      // Create background
      let bg = this.add.image(0, 0, 'office').setOrigin(0);
      let pod = this.add.image(330, 1035, 'podPresent').setOrigin(0.5).setScale(1);

      // Create Player + Set Position + Camera Follow
      this.player = new Player(this, 300, 1035, 'lunebase');
      this.player.body.enable = false;
      if(this.getData('x') != undefined) {
          this.player.x = this.getData('x');
      }
      if(this.getData('y') != undefined) {
          this.player.y = this.getData('y');
      }

      let podDoor = this.add.image(330, 1035, 'podDoor').setOrigin(0.5).setScale(1);

      this.time.delayedCall(400, () => {
        this.tweens.add({
          targets: podDoor, 
          x: `-=${270}`,
          duration: 1000,
          onComplete: () => {
            this.player.body.enable = true;
            this.player.setDepth(podDoor.depth + 1);
          }
        });
      });

      this.cameras.main.startFollow(this.player);
      this.cameras.main.setBounds(0, 0, bg.width, bg.height);

      // Create floor
      this.floor = this.add.rectangle(0, 1250, 2560, 100).setOrigin(0);
      this.physics.add.existing(this.floor);
      this.floor.body.allowGravity = false;
      this.floor.body.immovable = true;

      // Player Physics
      this.physics.add.collider(this.player, this.floor);
  }

  update() {
      // Update Player Logics
      this.player.update();

      // If E press update player coords, disable body, time travel
      if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
          this.player.body.enable = false;
          this.addData('x', this.player.x);
          this.addData('y', this.player.y);
          this.timeTravel('gameplay2');
      }
  }
}


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
          gravity: {
              x : 0,
              y : 2000
          }
      }
  },
  backgroundColor: 0x000000,
  scene: [BeginIntro, StudioIntro, TitleScreen, SettingsMenu, Gameplay1],
  //scene: [TitleScreen],
  title: "Schism"
});
////gqgqgqgqg