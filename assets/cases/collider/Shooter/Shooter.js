cc.Class({
    extends: cc.Component,

    properties: {
        bullet: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        let canvas = cc.find('Canvas');
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
    },

    onTouchBegan: function (event) {
        let scene = cc.director.getScene();
        let touchLoc = event.touch.getLocation();
        let bullet = cc.instantiate(this.bullet);
        bullet.position = touchLoc;
        bullet.active = true;
        scene.addChild(bullet);
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    }
});
