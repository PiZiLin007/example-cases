cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        let touchEvent = this.getComponent('TouchEvent');

        // Emit CUSTOM_EVENT to its listeners while touch end
        touchEvent._callback = function () {
            this.node.emit('CUSTOM_EVENT');
        }.bind(this);

        let addButton = cc.find('Canvas/add');
        let cancelButton = cc.find('Canvas/cancel');

        function onCustomEvent(event) {
            this.runAction(cc.sequence(
                cc.scaleTo(0.5, 2, 1),
                cc.scaleTo(0.25, 1, 1)
            ));
        }

        this.node.on('CUSTOM_EVENT', onCustomEvent, addButton);
        this.node.on('CUSTOM_EVENT', onCustomEvent, cancelButton);
    },
});
