/* Monster action functions. */

var AI = AI || {};

AI.randomWalk =  function(callback) {
    this.moveBy(R.random(-1, 2), R.random(-1, 2));
};

AI.huntMelee = function(callback) {
    var path = [];
    var player = world.player;
    var that = this;
    var visible = function(x, y) {
        if (world.isSolid(x, y)) {
            return false;
        } else {
            var dist = Math.max(Math.abs(x - that.x), Math.abs(y - that.y));
            if (dist === 1) {
                return !world.monsterAt(x, y);
            } else {
                return true;
            }
        }
    };
    var astar = new ROT.Path.AStar(player.x, player.y, visible);
    astar.compute(this.x, this.y, function(x, y) {
        path.push({x: x, y: y});
    });
    if (path.length < 2) {
        debug(100, 'AI.huntMelee: monster is stuck');
    } else if (path.length === 2) {
        this.melee(player);
    } else if (path.length > 2) {
        this.tryMove(path[1].x, path[1].y);
    }
    callback();
};

/* Make the melee hunter the default. */
Monster.prototype.act = AI.huntMelee;
