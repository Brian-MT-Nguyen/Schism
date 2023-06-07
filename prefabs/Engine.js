class SchismScene extends Phaser.Scene {
    init(data) {
        this.progressionData = data.progressionData || {};
        this.timeTravelTransition = data.timeTravel || false;
        this.dialogueData = data.dialogueData || [];
        if(this.dialogueData.length == 0) {
            fetch('../data/dialogue.json').then(
                (response) => response.json()
                ).then(
                    (json) => {
                        this.dialogueData = json;
                });
        }
    }   

    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create() {
        // Dialogue System
        this.dialogueActive = false;
        this.dialogueRectangle = this.add.rectangle(220, 1035, 1470, 300, 0x000000).setOrigin(0).setDepth(10).setAlpha(0.5);
        this.dialogueRectangle.visible = false;
        this.dialogueText = this.add.text(240, 1055, '', {fontSize: 40, color: '#ffffff', wordWrap: { width: 1470 }}).setDepth(10);
        this.dialogueKey;
        this.dialogueIndex = 0;

        // Transition for current scene
        this.transitionDuration = 1000;
        if(this.timeTravelTransition == true) {
            this.cameras.main.fadeIn(this.transitionDuration, 255, 255, 255);
        } else {
            this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
        }

        // Create world bounds
        this.worldbounds = this.add.group();
        this.lWall = this.add.rectangle(-100,0,100,1920).setOrigin(0);
        this.physics.add.existing(this.lWall);
        this.lWall.body.allowGravity = false;
        this.lWall.body.immovable = true;
        this.worldbounds.add(this.lWall);

        this.rWall = this.add.rectangle(2560,0,100,1920).setOrigin(0);
        this.physics.add.existing(this.rWall);
        this.rWall.body.allowGravity = false;
        this.rWall.body.immovable = true;
        this.worldbounds.add(this.rWall);

        this.onEnter();

        // Physics Logics
        this.physics.add.collider(this.player, this.worldbounds);
    }

    // Progession Data System Functions
    getData(key) {
        return this.progressionData[key];
    }

    addData(key, value = true) {
        this.progressionData[key] = value;
        console.log(this.progressionData);
    }

    removeData(key) {
        delete this.progressionData[key];
        console.log(this.progressionData);
    }

    resetData() {
        this.progressionData = {};
        console.log(this.progressionData);
    }

    // Dialogue System Functions
    startDialogue(key, start, callback) {
        this.dialogueActive = true;
        this.dialogueRectangle.visible = true;
        this.dialogueKey = key;
        this.dialogueIndex = 0;
        this.dialogueCallback = callback;
        start();
        this.handleDialogueInteraction();
        
        // Disable character movement
        this.player.body.enable = false;
        // Pause Animations

        // Register the dialogue event handlers with the correct context
        this.input.keyboard.on('keydown-SPACE', this.handleDialogueInteraction, this);
        this.input.on('pointerdown', this.handleDialogueInteraction, this);
    }
    
    handleDialogueInteraction() {
        if (this.dialogueActive && this.dialogueIndex < this.dialogueData[this.dialogueKey].length) {
            this.displayNextMessage();
            this.dialogueIndex++;
        } else {
            // All dialogue messages have been displayed
            this.finishDialogue();
        }
    }
    
    displayNextMessage() {
        this.dialogueText.setText(this.dialogueData[this.dialogueKey][this.dialogueIndex]);
    }
    
    finishDialogue() {
        this.dialogueActive = false;
        this.dialogueRectangle.visible = false;
        this.dialogueText.setText('');
    
        // Call the callback function if it exists
        if (typeof this.dialogueCallback === 'function') {
            this.dialogueCallback();
        }

        // Enable character movement
        this.player.body.enable = true;
        // Resume animations
    
        // Unregister the dialogue event handlers
        this.input.keyboard.off('keydown-SPACE', this.handleDialogueInteraction, this);
        this.input.off('pointerdown', this.handleDialogueInteraction, this);
    }
    
    // Scene Transition Functions
    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { progressionData: this.progressionData, timeTravel: false, dialogueData: this.dialogueData});
        });
    }

    timeTravel(key) {
        this.cameras.main.fade(this.transitionDuration/2, 255, 255, 255);
        this.time.delayedCall(this.transitionDuration/2, () => {
            this.scene.start(key, { progressionData: this.progressionData, timeTravel: true, dialogueData: this.dialogueData});
        });
    }
    
    // Magic to get it to link with Engine Scene
    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }
}