/**
 * Exports: Place, Wall, Floor
 */

/**
 * @constructor
 */
function Place() {
}

Place.prototype.solid = false;
Place.prototype.seen = false;

Place.prototype.toString = function() {
    return 'a ' + this.constructor.name.toLowerCase();
};

/* Types of places. */

function Wall() { Place.call(this); }
Wall.extend(Place);
Wall.prototype.solid = true;

function Floor() { Place.call(this); }
Floor.extend(Place);

function Stair(map)  {
    Place.call(this);
    if (map) this.map = map;
};
Stair.extend(Place);
Stair.prototype.map = null;

function StairUp() { Stair.apply(this, arguments); };
StairUp.extend(Stair);

function StairDown() { Stair.apply(this, arguments); };
StairDown.extend(Stair);
