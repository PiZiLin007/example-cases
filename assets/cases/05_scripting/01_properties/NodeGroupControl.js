cc.Class({
    extends: cc.Component,

    properties: {
        nodeList: {
            default: [],
            type: [cc.Node]
        }
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        this.inervalId = setInterval(function () {
            self.toggleNodesVisibility();
        }, 1000);
    },

    onDestroy: function () {
        clearInterval(this.inervalId);
    },

    toggleNodesVisibility: function() {
        console.log('toggle visibility');
        for (let i = 0; i < this.nodeList.length; ++i) {
            this.nodeList[i].active = !this.nodeList[i].active;
        }
    }
});
