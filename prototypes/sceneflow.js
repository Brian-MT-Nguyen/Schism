class SceneFlow extends SchismScene {
    constructor() {
        super("sceneflow", "Deez Nuts");
    }

    preload() {
        //characters
        this.load.path = '../assets/character/';
        this.load.image('lunebase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');


        //levels
        this.load.path = '../assets/levels/';
        this.load.image('office', 'officeLvlPast.png');
    }
    
    onEnter() {
        // Create background
        let bg = this.add.image(0, 0, 'office').setOrigin(0);

        // Create Player + Camera Follow
        this.player = new Player(this, 300, 1035, 'lunebase');
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        // Create floor
        this.floor = this.add.rectangle(0, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        // Player Physics
        this.physics.add.collider(this.player, this.floor);

        this.time.delayedCall(1000, () => {
            this.startDialogue(["idsaidoasjsioadiosajdiosajdoasdasoidjaosdioasdjasodjasoidjasoidjsaoidjsaidjasdjoiasjoidsaidasdjoasdioasd", "What's Up"], () => {console.log("start")}, () => {console.log("finish")});
        });

        this.time.delayedCall(5000, () => {
            this.startDialogue(["Round", "#2"], () => {console.log("let's")}, () => {console.log("goo")});
        });
    }

    update() {
        // Update Player Logics
        this.player.update();
    }

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
           this.scene.start(key, { inventory: this.inventory });
        });
    }

}

class CoreGameplay extends SchismScene {
    constructor() {
        super("coregameplay", "Deez Nuts");
    }

    preload() {
        //characters
        this.load.path = '../assets/character/';
        this.load.image('lunebase', 'luneBaseSprite.png');
        this.load.image('solBase', 'solBaseSprite.png');
        this.load.image('solSit', 'solSitting.png');


        //levels
        this.load.path = '../assets/levels/';
        this.load.image('office', 'officeLvlPast.png');
    }
    
    onEnter() {
        // Create background
        let bg = this.add.image(0, 0, 'office').setOrigin(0);

        // Create Player + Camera Follow
        this.player = new Player(this, 300, 1035, 'lunebase');
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        // Create floor
        this.floor = this.add.rectangle(0, 1250, 2560, 100).setOrigin(0);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;

        // Player Physics
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.worldbounds);
    }

    update() {
        // Update Player Logics
        this.player.update();
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
            debug: true,
            gravity: {
                x : 0,
                y : 500
            }
        }
    },
    backgroundColor: 0x000000,
    scene: [SceneFlow, CoreGameplay],
    title: "Schism"
});