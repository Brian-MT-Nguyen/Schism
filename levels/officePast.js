
class OfficePast extends SchismScene {

    //acursors;

    //goal;

    constructor() {
        super("officepast", "Level1Past");
    }

    preload() {
        //levels
        this.load.path = 'assets/levels/';
        this.load.image('lvl1Past', 'officeLvlPast.png');

        //Interactables
        this.load.path = 'assets/interactables/';
        this.load.image('keycard', 'keycard.png');
        this.load.image('podPast', 'podPast.png');
        this.load.image('dogTreatsPast', 'dogTreatsPast.png');
        this.load.image('laptopPast', 'laptopPast_on.png');
    }
    
    onEnter() {
        this.tpSound = this.sound.add('sound');

        // Create background
        let bg = this.add.image(0, 0, 'lvl1Past').setOrigin(0);

        //UI
        this.ui = new UI(this, "right", "interact", "mute", "swap", "fullscreen", "sound");

        // Start of game pod opening
        let pod = this.add.image(330, 1010, 'podPast').setOrigin(0.5).setScale(1.1).setDepth(envDepth);
        
        // Create Player + Set Position + Camera Follow
        this.player = new Player(this, 300, 1010, 'luneBase').setDepth(playerDepth);
        if(this.getData('x') != undefined) {
            this.player.x = this.getData('x');
        }
        if(this.getData('y') != undefined) {
            this.player.y = this.getData('y');
        }
        this.player.play('idle');

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        // Link mobile controls to Player
        let mobileControls = [this.ui.leftButton, this.ui.rightButton, this.ui.upButton];
        this.player.create(mobileControls);

        // Interactable Events
        this.interactables =  this.add.group();

        let laptop = this.physics.add.sprite(1024, 960, 'laptopPast').setOrigin(0.5).setScale(0.4).setDepth(objectDepth);
        laptop.body.allowGravity = false;
        laptop.body.immovable = true;

        let dogTreats = this.physics.add.sprite(1274, 960, 'dogTreatsPast').setOrigin(0.5).setScale(0.25).setDepth(objectDepth);
        dogTreats.body.allowGravity = false;
        dogTreats.body.immovable = true;

        this.keycard = this.physics.add.sprite(1474, 980, 'keycard').setOrigin(0.5).setScale(0.2).setDepth(objectDepth);
        this.keycard.body.allowGravity = false;
        this.keycard.body.immovable = true;
        this.interactables.add(this.keycard);

        this.ui.swapButton.visible = false;
        this.ui.swapButton.disableInteractive();

        this.ui.interactButton.on('pointerover', () => {
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.playerInteractBox.getBounds(), this.keycard.getBounds())) {
                this.startDialogue('keycard', () => {
                    this.keycard.setScrollFactor(0);
                    this.keycard.setDepth(objectForeDepth);
                    this.keycard.x = game.config.width/2;
                    this.keycard.y = game.config.height/3;
                    this.keycard.angle = -15;
                    this.keycard.setScale(1);
                }, () => {
                    this.ui.swapButton.visible = true;
                    this.ui.swapButton.setInteractive();
                    this.keycard.destroy();
                    this.addData('keycard');
                });
            }
        });

        // Time Travel
        this.ui.swapButton.on('pointerover', () => {
            this.tpSound.play();
            this.addData('x', this.player.x);
            this.addData('y', this.player.y);
            this.timeTravel('officepresent');
        });
        

        // Create floor
        this.floor = this.add.rectangle(0, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        // Dialogue

        //Physics
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.worldbounds);

        this.interactables.getChildren().forEach( (object) => {

            if(object == this.keycard && !this.getData('keycard')){
                object.preFX.setPadding(32);
                let fx = object.preFX.addGlow();
                this.keycardGlow = this.tweens.add({
                    targets: fx,
                    outerStrength: 20,
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

    }
}