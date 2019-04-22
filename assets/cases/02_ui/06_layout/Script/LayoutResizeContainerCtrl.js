
let info = cc.Class({
    name: 'info',
    properties: {
        target: cc.Node,
        num: 0
    }
});
// 5 3 10 12
cc.Class({
    extends: cc.Component,

    properties: {
        itemTemp: {
            default: null,
            type: cc.Prefab
        },
        targetAry: {
            default: [],
            type: [info]
        }
    },

    onLoad: function () {
        this._curTime = 0;
        this._curIndex = 0;
    },

    _createItem: function (parentNode, idx) {
        let item = cc.instantiate(this.itemTemp);
        let label = item.getComponentInChildren(cc.Label);
        label.string = idx;
        item.parent = parentNode;
    },

    update: function (dt) {
        this._curTime += dt;
        if (this._curTime >= 1) {
            this._curTime = 0;
            for (let i = 0; i < this.targetAry.length; ++i) {
                let num = this.targetAry[i].num;
                let target = this.targetAry[i].target;
                if (target && this._curIndex < num) {
                    this._createItem(target, this._curIndex);
                }
            }
            this._curIndex++;
        }
    }

});
