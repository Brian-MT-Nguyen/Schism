class SchismScene extends Phaser.Scene {
    init(data) {
        this.data = data.data || [];
        this.timeTravelTransition = data.timeTravel;
    }

    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create() {
        console.log(this.data);
        this.transitionDuration = 1000;
        if(this.timeTravelTransition == true) {
            this.cameras.main.fadeIn(this.transitionDuration, 255, 255, 255);
        } else {
            this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
        } 
        this.onEnter();
    }

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { data: this.data, timeTravel: false});
        });
    }

    timeTravel(key) {
        this.cameras.main.fade(this.transitionDuration/2, 255, 255, 255);
        this.time.delayedCall(this.transitionDuration/2, () => {
            this.scene.start(key, { data: this.data, timeTravel: true});
        });
    }

    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }
}