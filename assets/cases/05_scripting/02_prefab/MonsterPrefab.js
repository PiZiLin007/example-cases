let Helpers = require('Helpers');

cc.Class({
    extends: cc.Component,

    properties: {
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        }
    },

    // use this for initialization
    onLoad: function () {
        let randomIdx = Helpers.getRandomInt(0, this.spriteList.length);
        let sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteList[randomIdx];
    }

});
