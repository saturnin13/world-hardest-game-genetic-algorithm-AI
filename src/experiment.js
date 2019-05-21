////////// Circle creation and collision (not fully working) //////////

var circle = new Phaser.Geom.Circle(14, 14, 14);
var graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });
graphics.x = 400;
graphics.y = 300;

graphics.fillCircleShape(circle);
circle.diameter = circle.diameter - 8;
graphics.fillStyle(0x0022f5);
graphics.fillCircleShape(circle);

this.physics.add.existing(graphics);
graphics.body.width = 28;
graphics.body.height = 28;

console.log(graphics);

graphics.body.setVelocity(300, 0).setBounce(1, 1).setCollideWorldBounds(true);


var graphics2 = this.add.graphics({ lineStyle: { width: 4, color: 0x000000 } });

graphics2.x = 600;
graphics2.y = 0;

var line = new Phaser.Geom.Line(2, 0, 2, 600);

graphics2.strokeLineShape(line);

this.physics.add.existing(graphics2);
graphics2.body.width = 4;
graphics2.body.height = 600;

var group = this.physics.add.staticGroup();

group.add(graphics2);
console.log(group);

this.physics.add.collider(graphics, group);



this.engine.physics.add.staticGroup();
var group = this.engine.add.group();
var sprite = this.engine.add.sprite(400, 300, 'phaser');
group.add(sprite);
this.engine.physics.add.collider(sprite, group);


////////// Line creation //////////


// this.edgesGraphics = this.engine.add.graphics({ lineStyle: { width: 4, color: 0x000000 } });
// var line = new Phaser.Geom.Line(x1, y1, x2, y2);
//
// this.edgesGraphics.strokeLineShape(line);
