cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function () {
        let isRuntime = typeof runtime !== 'undefined';
        if (!isRuntime) {
            this.node.active = false;
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
