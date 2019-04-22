cc.Class({
    extends: cc.Component,

    properties: {
        map_root: cc.Node
    },

    onLoadTileMap(url) {
        cc.loader.loadRes(url, cc.TiledMapAsset, (err, tmxAsset) => {
            if (err) {
                cc.error(err);
                return;
            }
            this.onCreateTileMap(tmxAsset);
        });
    },

    onCreateTileMap(tmxAsset) {
        this.map_root.destroyAllChildren();
        let node = new cc.Node();
        this.map_root.addChild(node);
        let tileMap = node.addComponent(cc.TiledMap);
        tileMap.tmxAsset = tmxAsset;
    },

    onBtnCreateTileMap() {
        let url = 'tilemap/tile_iso_offset';
        this.onLoadTileMap(url);
    },

    onBtnCreateTileMapWithTsx() {
        let url = 'tilemap/tile_iso_offset_with_tsx';
        this.onLoadTileMap(url);
    },
});
