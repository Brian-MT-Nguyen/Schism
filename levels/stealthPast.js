class StealthPast extends SchismScene {
    constructor() {
        super("stealthpast", "Level3Past");
    }

    preload() {
        //levels
        this.load.path = 'assets/levels/';
        this.load.image('lvl3Past', 'level3past.png');
    }
    
    onEnter() {
        this.tpSound = this.sound.add('sound');

        // Create background
        let bg = this.add.image(0, 0, 'lvl3Past').setOrigin(0).setDepth(envDepth);

        //UI
        this.ui = new UI(this, "right", "interact", "mute", "swap", "fullscreen", "sound");
        
        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 300, 1010, 'luneBase').setDepth(playerDepth);
        if(this.getData('x') != undefined) {
            this.player.x = this.getData('x');
        }
        if(this.getData('y') != undefined) {
            this.player.y = this.getData('y');
        }
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        // Link mobile controls to Player
        let mobileControls = [this.ui.leftButton, this.ui.rightButton, this.ui.upButton];
        this.player.create(mobileControls);
        this.ui.swapButton.setVisible(false);

        // Time Travel
        this.ui.swapButton.on('pointerover', () => {
            this.tpSound.play();
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('stealthpresent');
        });
        
        // Create floor
        this.floor = this.add.rectangle(0, 1350, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        // Create console
        this.interactables =  this.add.group();
        this.consoleWork = this.physics.add.sprite(2400, 1120, "consolePast").setDepth(objectDepth).setScale(0.8);
        this.consoleWork.body.allowGravity = false;
        this.consoleWork.body.immovable = true;
        this.interactables.add(this.consoleWork);

        this.ui.interactButton.on('pointerover', () => {
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), this.consoleWork.getBounds())) {
                this.addData('robotOff');
                this.ui.swapButton.setVisible(true);
                this.consoleGlow.stop();
                this.consoleGlow.destroy();
                this.consoleWork.destroy();
                this.consoleWork = this.physics.add.sprite(2400, 1120, "consolePast").setDepth(objectDepth).setScale(0.8);
                this.consoleWork.body.allowGravity = false;
                this.consoleWork.body.immovable = true;
                this.startDialogue('finalCon', () => {}, () => {});
            }
        })

        // Interactable Events
        this.interactables.getChildren().forEach( (object) => {
            if(object == this.consoleWork && !this.getData('robotOff')){
                object.preFX.setPadding(32);
                let fx = object.preFX.addGlow();
                this.consoleGlow = this.tweens.add({
                    targets: fx,
                    outerStrength: 20,
                    yoyo: true,
                    loop: -1,
                    ease: 'sine.inout'
                });
            }
        });

        // Dialogue

        //Physics
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.worldbounds);
    }

    update() {
        // Update Player Logics
        this.player.update();

        // Update UI Logics
        this.ui.update();
    }
}