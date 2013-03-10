/* Monster action functions. */

var AI = AI || {};

AI.randomWalk =  function(callback) {
    this.moveBy(R.random(-1, 2), R.random(-1, 2));
};

AI.huntMelee = function(callback) {
    var path = [];
    var player = world.player;
    var visible = complement(world.isSolid.bind(world));
    var astar = new ROT.Path.AStar(player.x, player.y, visible);
    astar.compute(this.x, this.y, function(x, y) {
        path.push({x: x, y: y});
    });
    if (path.length === 2) {
        this.melee(player);
    } else {
        this.tryMove(path[1].x, path[1].y);
    }
    callback();
};

/* Make the melee hunter the default. */
Monster.prototype.act = AI.huntMelee;