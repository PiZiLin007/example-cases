cc.Class({
    extends: cc.Component,

    properties: {
        posAR: cc.Label,
        pos: cc.Label,
        goldAR: cc.Node,
        gold: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        let sheep = this.goldAR.parent;
        let posAR = sheep.convertToWorldSpaceAR(cc.v2(this.goldAR.x, this.goldAR.y));
        this.posAR.string = '(' + parseInt(posAR.x) + ', ' + parseInt(posAR.y) + ')';

        sheep = this.goldAR.parent;
        let pos = sheep.convertToWorldSpace(cc.v2(this.gold.x, this.gold.y));
        this.pos.string = '(' + parseInt(pos.x) + ', ' + parseInt(pos.y) + ')';
    },
});
