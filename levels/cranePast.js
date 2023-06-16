class CranePast extends SchismScene {
    constructor() {
        super("cranePast", "Level2Past");
    }

    preload() {
        //interactables 
        this.load.path = 'assets/interactables/';
        this.load.image('consolePast', 'consolePast.png');
        this.load.image('lvl3platform', 'lvl3platform.png');
        this.load.image('cranePast', 'cranePast.png');
        this.load.image('craneHandPast', 'craneHandPast.png');

        //levels
        this.load.path = 'assets/levels/';
        this.load.image('lvl2Past', 'level2past.png');
    }

    onEnter() {
        this.tpSound = this.sound.add('sound');

        // Create background
        let bg = this.add.image(0, 0, 'lvl2Past').setOrigin(0).setDepth(envDepth);
        
        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 300, 1010, 'luneBase').setDepth(playerDepth);
        this.player.body.enable = true;
        if(this.getData('x') != undefined) {
            this.player.x = this.getData('x');
        }
        if(this.getData('y') != undefined) {
            this.player.y = this.getData('y');
        }

        //UI
        this.ui = new UI(this, "right", "interact", "mute", "swap", "fullscreen", "sound");

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        // Link mobile controls to Player
        let mobileControls = [this.ui.leftButton, this.ui.rightButton, this.ui.upButton];
        this.player.create(mobileControls);
        this.ui.swapButton.setVisible(false);

        //interactables
        this.interactables = this.add.group();

        //create crane
        let crane = this.physics.add.sprite(2560 *.415, 1920*.3, "cranePast").setDepth(objectDepth);
        crane.body.allowGravity = false;
        crane.body.immovable = true;

        //create crane hand
        let craneHand = this.physics.add.sprite(2560 *.5, 1920*.17, "craneHandPast").setDepth(objectDepth+1).setScale(.5);
        craneHand.body.allowGravity = false;
        craneHand.body.immovable = true;

        // Create console
        this.consoleWork = this.physics.add.sprite(2560 *.3, 1920*.49, "consolePast").setDepth(objectDepth);
        this.consoleWork.body.allowGravity = false;
        this.consoleWork.body.immovable = true;
        this.interactables.add(this.consoleWork);

        // Create floor
        this.floor = this.add.rectangle(0, 1250, 2560*.4, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        this.floor2 = this.add.rectangle(2560 *.87, 1250, 2560*.2, 100).setOrigin(0);
        this.physics.add.existing(this.floor2);
        this.floor2.body.allowGravity = false;
        this.floor2.body.immovable = true;

        this.floor3 = this.add.rectangle(2560*.4, 1300, 2560*.47, 50).setOrigin(0);
        this.physics.add.existing(this.floor3);
        this.floor3.body.allowGravity = false;
        this.floor3.body.immovable = true;

        this.floor4 = this.add.rectangle(2560*.4, 1250, 2560*.47, 50).setOrigin(0);
        this.physics.add.existing(this.floor4);
        this.floor4.body.allowGravity = false;
        this.floor4.body.immovable = true;

        this.bridge = this.physics.add.sprite(2560 *.64, 1920*.2, "lvl3platform").setScale(1.2).setDepth(objectDepth);
        this.bridge.body.allowGravity = false;
        this.bridge.body.immovable = false;

        //goal
        this.goal = this.add.rectangle(2560 *.94, 1200, 2560*.12, 100);
        this.physics.add.existing(this.goal);
        this.goal.body.allowGravity = false;
        this.goal.body.immovable = true;

        //Physics
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.worldbounds);
        this.physics.add.collider(this.player, this.floor2);

        this.physics.add.overlap(this.player, this.dog, () => {});
        this.physics.add.overlap(this.player, this.console, () => {});

        this.physics.add.overlap(this.player, this.goal, () => {
            this.time.delayedCall(1000, ()=>{this.ui.swapButton.setVisible(true)})
            });
        
        this.ui.interactButton.on('pointerover', () => {
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), this.consoleWork.getBounds()) 
            && !this.getData('bridgeMade')) {
                this.ui.leftButton.setVisible(false);
                this.ui.rightButton.setVisible(false);
                this.ui.upButton.setVisible(false);
                this.ui.interactButton.setVisible(false);
                this.ui.muteButton.setVisible(false);
                this.ui.fsButton.setVisible(false);
                this.player.rect.setVisible(false);

                this.startDialogue('workCon', () => {}, () => {
                    this.addData('bridgeMade');
                    //Makeshift cinematic
                    this.cameras.main.zoomTo(.75, 3000);
                    
                    this.bridge.body.allowGravity = true;
                    this.bridge.body.immovable = false;
                    this.bridge.body.setGravityY(-1750);

                    this.physics.add.collider(this.player, this.floor3);
                    this.physics.add.collider(this.player, this.floor4);

                    this.physics.add.collider(this.bridge, this.floor3, () => {
                        this.cameras.main.zoomTo(1, 500);
                        this.time.delayedCall(1000, () => {
                            this.ui.leftButton.setVisible(true);
                            this.ui.rightButton.setVisible(true);
                            this.ui.upButton.setVisible(true);
                            this.ui.interactButton.setVisible(true);
                            this.ui.muteButton.setVisible(true);
                            this.ui.fsButton.setVisible(true);
                            this.player.rect.setVisible(true);
                        });
                    });
                    this.time.delayedCall(3500, () => {
                        this.startDialogue('crossPlatform', () => {}, () => {});
                    });
                });
            }
        })

        this.ui.swapButton.on('pointerover', () => {
            this.tpSound.play();
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('cranepresent');
        });


        this.interactables.getChildren().forEach( (object) => {

            if(object == this.consoleWork && !this.getData('bridgeMade')){
                object.preFX.setPadding(32);
                let fx = object.preFX.addGlow();
                this.consoleWorkGlow = this.tweens.add({
                    targets: fx,
                    outerStrength: 15,
                    yoyo: true,
                    loop: -1,
                    ease: 'sine.inout'
                });
            }
        })
    }

    update() {
        // Update Player Logics
        this.player.update();

        // Update UI Logics
        this.ui.update();

        if(this.getData('bridgeMade')){
            this.consoleWorkGlow.stop();
            this.consoleWorkGlow.destroy();
            this.consoleWork.destroy();
            this.consoleWork = this.physics.add.sprite(2560 *.3, 1920*.49, "consolePast").setDepth(objectDepth);
            this.consoleWork.body.allowGravity = false;
            this.consoleWork.body.immovable = true;
        }

        if(this.player.x > 2560){
            this.gotoScene("CranePresent");
            resetData();
        }

        if(this.player.y > 1920){
            this.gotoScene("CranePresent");
            resetData();
        }

    }
}