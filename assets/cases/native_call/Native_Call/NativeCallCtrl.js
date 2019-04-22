let tips = null;
cc.TestNativeCallJS = function () {
    tips.string = 'The test was successful...';
};

cc.Class({
    extends: cc.Component,

    properties: {
        button: cc.Node
    },

    onLoad: function () {
        let tipNode = cc.find('Canvas/New Label');
        tips = tipNode.getComponent(cc.Label);
        tips.string = 'Native Call Test';
    },

    onClick: function () {
        let className = 'org/cocos2dx/javascript/AppActivity';
        let methodName = 'showAlertDialog';
        let methodSignature = '(Ljava/lang/String;Ljava/lang/String;)V';
        jsb.reflection.callStaticMethod(className, methodName, methodSignature, 'Title', 'Native Call Test');
    }
});
