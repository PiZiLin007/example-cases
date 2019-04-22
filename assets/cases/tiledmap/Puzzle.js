
let MoveDirection = cc.Enum({
    NONE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
});

let minTilesCount = 2;
let mapMoveStep = 1;
let minMoveValue = 50;

cc.Class({
    extends: cc.Component,
    editor: {
        requireComponent: cc.TiledMap
    },

    properties: {
        _touchStartPos: {
            default: null,
            serializable: false,
        },
        _touching: {
            default: false,
            serializable: false,
        },

        _isMapLoaded: {
            default: false,
            serializable: false,
        },

        floorLayerName: {
            default: 'floor'
        },

        barrierLayerName: {
            default: 'barrier'
        },

        objectGroupName: {
            default: 'players'
        },

        startObjectName: {
            default: 'SpawnPoint'
        },

        successObjectName: {
            default: 'SuccessPoint'
        }
    },

    // use this for initialization
    onLoad: function () {
        this._player = this.node.getChildByName('player');
        if (!this._isMapLoaded) {
            this._player.active = false;
        }

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this._onKeyPressed, this);

        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            this._touching = true;
            this._touchStartPos = event.touch.getLocation();
        });
        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (!this._touching || !this._isMapLoaded || this._succeedLayer.active) return;

            this._touching = false;
            let touchPos = event.touch.getLocation();
            let movedX = touchPos.x - this._touchStartPos.x;
            let movedY = touchPos.y - this._touchStartPos.y;
            let movedXValue = Math.abs(movedX);
            let movedYValue = Math.abs(movedY);
            if (movedXValue < minMoveValue && movedYValue < minMoveValue) {
                // touch moved not enough
                return;
            }

            let newTile = cc.v2(this._curTile.x, this._curTile.y);
            let mapMoveDir = MoveDirection.NONE;
            if (movedXValue >= movedYValue) {
                // move to right or left
                if (movedX > 0) {
                    newTile.x += 1;
                    mapMoveDir = MoveDirection.LEFT;
                } else {
                    newTile.x -= 1;
                    mapMoveDir = MoveDirection.RIGHT;
                }
            } else {
                // move to up or down
                if (movedY > 0) {
                    newTile.y -= 1;
                    mapMoveDir = MoveDirection.DOWN;
                } else {
                    newTile.y += 1;
                    mapMoveDir = MoveDirection.UP;
                }
            }
            this._tryMoveToNewTile(newTile, mapMoveDir);
        });
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this._onKeyPressed, this);
    },

    restartGame: function() {
        this._succeedLayer.active = false;
        this._initMapPos();
        this._curTile = this._startTile;
        this._updatePlayerPos();
    },

    start: function(err) {
        if (err) return;

        // init the map position
        this._initMapPos();

        // init the succeed layer
        this._succeedLayer = this.node.getParent().getChildByName('succeedLayer');
        this._succeedLayer.active = false;

        // init the player position
        this._tiledMap = this.node.getComponent('cc.TiledMap');
        let objectGroup = this._tiledMap.getObjectGroup(this.objectGroupName);
        if (!objectGroup) return;

        let startObj = objectGroup.getObject(this.startObjectName);
        let endObj = objectGroup.getObject(this.successObjectName);
        if (!startObj || !endObj) return;

        let startPos = cc.v2(startObj.x, startObj.y);
        let endPos = cc.v2(endObj.x, endObj.y);

        this._layerFloor = this._tiledMap.getLayer(this.floorLayerName);
        this._layerBarrier = this._tiledMap.getLayer(this.barrierLayerName);
        if (!this._layerFloor || !this._layerBarrier) return;

        this._curTile = this._startTile = this._getTilePos(startPos);
        this._endTile = this._getTilePos(endPos);

        if (this._player) {
            this._updatePlayerPos();
            this._player.active = true;
        }

        this._isMapLoaded = true;
    },

    _initMapPos: function() {
        this.node.setPosition(cc.visibleRect.bottomLeft);
    },

    _updatePlayerPos: function() {
        let pos = this._layerFloor.getPositionAt(this._curTile);
        this._player.setPosition(pos);
    },

    _getTilePos: function(posInPixel) {
        let mapSize = this.node.getContentSize();
        let tileSize = this._tiledMap.getTileSize();
        let x = Math.floor(posInPixel.x / tileSize.width);
        let y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);

        return cc.v2(x, y);
    },

    _onKeyPressed: function(event) {
        if (!this._isMapLoaded || this._succeedLayer.active) return;

        let newTile = cc.v2(this._curTile.x, this._curTile.y);
        let mapMoveDir = MoveDirection.NONE;
        switch (event.keyCode) {
            case cc.macro.KEY.up:
                newTile.y -= 1;
                mapMoveDir = MoveDirection.DOWN;
                break;
            case cc.macro.KEY.down:
                newTile.y += 1;
                mapMoveDir = MoveDirection.UP;
                break;
            case cc.macro.KEY.left:
                newTile.x -= 1;
                mapMoveDir = MoveDirection.RIGHT;
                break;
            case cc.macro.KEY.right:
                newTile.x += 1;
                mapMoveDir = MoveDirection.LEFT;
                break;
            default:
                return;
        }

        this._tryMoveToNewTile(newTile, mapMoveDir);
    },

    _tryMoveToNewTile: function(newTile, mapMoveDir) {
        let mapSize = this._tiledMap.getMapSize();
        if (newTile.x < 0 || newTile.x >= mapSize.width) return;
        if (newTile.y < 0 || newTile.y >= mapSize.height) return;

        if (this._layerBarrier.getTileGIDAt(newTile)) {
            cc.log('This way is blocked!');
            return false;
        }

        // update the player position
        this._curTile = newTile;
        this._updatePlayerPos();

        // move the map if necessary
        this._tryMoveMap(mapMoveDir);

        // check the player is success or not
        if (this._curTile.equals(this._endTile)) {
            cc.log('succeed');
            this._succeedLayer.active = true;
        }
    },

    _tryMoveMap: function(moveDir) {
        // get necessary data
        let mapContentSize = this.node.getContentSize();
        let mapPos = this.node.getPosition();
        let playerPos = this._player.getPosition();
        let viewSize = cc.size(cc.visibleRect.width, cc.visibleRect.height);
        let tileSize = this._tiledMap.getTileSize();
        let minDisX = minTilesCount * tileSize.width;
        let minDisY = minTilesCount * tileSize.height;

        let disX = playerPos.x + mapPos.x;
        let disY = playerPos.y + mapPos.y;
        let newPos;
        switch (moveDir) {
            case MoveDirection.UP:
                if (disY < minDisY) {
                    newPos = cc.v2(mapPos.x, mapPos.y + tileSize.height * mapMoveStep);
                }
                break;
            case MoveDirection.DOWN:
                if (viewSize.height - disY - tileSize.height < minDisY) {
                    newPos = cc.v2(mapPos.x, mapPos.y - tileSize.height * mapMoveStep);
                }
                break;
            case MoveDirection.LEFT:
                if (viewSize.width - disX - tileSize.width < minDisX) {
                    newPos = cc.v2(mapPos.x - tileSize.width * mapMoveStep, mapPos.y);
                }
                break;
            case MoveDirection.RIGHT:
                if (disX < minDisX) {
                    newPos = cc.v2(mapPos.x + tileSize.width * mapMoveStep, mapPos.y);
                }
                break;
            default:
                return;
        }

        if (newPos) {
            // calculate the position range of map
            let minX = viewSize.width - mapContentSize.width - cc.visibleRect.left;
            let maxX = cc.visibleRect.left.x;
            let minY = viewSize.height - mapContentSize.height - cc.visibleRect.bottom;
            let maxY = cc.visibleRect.bottom.y;

            if (newPos.x < minX) newPos.x = minX;
            if (newPos.x > maxX) newPos.x = maxX;
            if (newPos.y < minY) newPos.y = minY;
            if (newPos.y > maxY) newPos.y = maxY;

            if (!newPos.equals(mapPos)) {
                cc.log('Move the map to new position: ', newPos);
                this.node.setPosition(newPos);
            }
        }
    }
});
