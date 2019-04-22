cc.Class({
    extends: cc.Component,

    properties: {
        rotationToNode: cc.Node,
        rotateByNode: cc.Node
    },

    onToClick: function () {
        let rotationTo = cc.rotateTo(1, 0, 100);
        this.rotationToNode.runAction(rotationTo);
    },

    onReverseToClick: function () {
        let rotationTo = cc.rotateTo(1, 100, 0);
        this.rotationToNode.runAction(rotationTo);
    },

    onToRecoverClick: function () {
        this.rotationToNode.rotationX = 0;
        this.rotationToNode.rotationY = 0;
    },

    onByClick: function () {
        let rotateBy = cc.rotateBy(1, 0, 100);
        this.rotateByNode.runAction(rotateBy);
    },

    onReverseByClick: function () {
        let rotateBy = cc.rotateBy(1, 100, 100);
        this.rotateByNode.runAction(rotateBy);
    },

    onByRecoverClick: function () {
        this.rotateByNode.rotationX = 0;
        this.rotateByNode.rotationY = 0;
    }

});
