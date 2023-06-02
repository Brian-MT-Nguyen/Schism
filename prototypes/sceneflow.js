class transitions extends Phaser.Scene {

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
           this.scene.start(key, { inventory: this.inventory });
        });
    }

}