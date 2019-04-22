let Singleton = require('Singleton');

cc.Class({
    extends: cc.Component,

    properties: {

    },

    start: function () {
        let node = new cc.Node('Monster');
        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = Singleton.instance.monsterIcon;
        node.parent = this.node;
    }
});
