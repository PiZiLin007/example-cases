cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        _url: []
    },

    onLoad: function () {
        this._url = ['test_assets/atlas', 'test_assets/prefab'];
    },

    loadSpriteFrame: function () {
        let url = this._url[0];
        this._releaseResource(url, cc.SpriteAtlas);
        cc.loader.loadRes(url, cc.SpriteAtlas, (err, atlas) => {
            this._removeAllChildren();
            cc.loader.setAutoRelease(atlas, true);
            let node = new cc.Node();
            this.content.addChild(node);
            node.position = cc.v2(0, 0);
            let sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = atlas.getSpriteFrame('sheep_run_0');
        });
    },

    loadPrefab: function () {
        let url = this._url[1];
        this._releaseResource(url, cc.Prefab);
        cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
            this._removeAllChildren();
            cc.loader.setAutoRelease(prefab, true);
            let node = cc.instantiate(prefab);
            this.content.addChild(node);
            node.position = cc.v2(0, 0);
        });
    },

    onDisable() {
        this._releaseResource(this._url[0], cc.SpriteAtlas);
        this._releaseResource(this._url[1], cc.Prefab);
    },

    _removeAllChildren: function () {
        this.content.removeAllChildren(true);
    },

    _releaseResource: function (url, type) {
        this._removeAllChildren();
        let res = cc.loader.getRes(url, type);
        let all = cc.loader.getDependsRecursively(res);
        cc.loader.release(all);
    }
});
