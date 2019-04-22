cc.Class({
    extends: cc.Component,

    properties: {
        container: cc.Node
    },

    // use this for initialization
    switch: function () {
        let children = this.container.children;
        let length = children.length;
        if (length > 1) {
            let src = Math.floor(Math.random() * length);
            let node = children[src];
            let dst = src === length - 1 ? 0 : src + 1;
            node.setSiblingIndex(dst);
        }
    },
});
