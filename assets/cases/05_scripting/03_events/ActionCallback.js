cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        let touchEvent = this.getComponent('TouchEvent');
        let mouseEvent = this.getComponent('MouseEvent');
        let event = touchEvent || mouseEvent;
        event._callback = function () {
            this.node.runAction(cc.sequence(
                cc.scaleTo(0.5, 2, 1),
                cc.scaleTo(0.25, 1, 1)
            ));
        };
    },
});