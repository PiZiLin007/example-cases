cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {

    },

    onBtnClick: function (event) {
        let target = event.target;
        let shapeClassName = `cc.${target.name}Collider`;
        let nodePath = 'Canvas/root/' + target.parent.name;
        let collider = cc.find(nodePath).getComponent(shapeClassName);
        collider.enabled = !collider.enabled;

        let label = target.getChildByName('Label').getComponent(cc.Label);
        if (collider.enabled) {
            label.string = label.string.replace('Show', 'Hide');
        }
        else {
            label.string = label.string.replace('Hide', 'Show');
        }
    }
});
