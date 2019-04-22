cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        target: cc.Node
    },

    onLoad: function () {
        let self = this; let
            parent = this.node.parent;
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let touches = event.getTouches();
            if (touches.length >= 2) {
                let touch1 = touches[0]; let
                    touch2 = touches[1];
                let delta1 = touch1.getDelta(); let
                    delta2 = touch2.getDelta();
                let touchPoint1 = parent.convertToNodeSpaceAR(touch1.getLocation());
                let touchPoint2 = parent.convertToNodeSpaceAR(touch2.getLocation());
                // 缩放
                let distance = touchPoint1.sub(touchPoint2);
                let delta = delta1.sub(delta2);
                let scale = 1;
                if (Math.abs(distance.x) > Math.abs(distance.y)) {
                    scale = (distance.x + delta.x) / distance.x * self.target.scale;
                }
                else {
                    scale = (distance.y + delta.y) / distance.y * self.target.scale;
                }
                self.target.scale = scale < 0.1 ? 0.1 : scale;
            }
        }, self.node);
    }
});
