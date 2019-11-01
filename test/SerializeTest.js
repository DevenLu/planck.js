var diff = require('diff');
var sinon = require('sinon');

var expect = require('./testutil/expect');

var Vec2 = require('../lib/common/Vec2');
var Circle = require('../lib/shape/CircleShape');
var DistanceJoint = require('../lib/joint/DistanceJoint');
var World = require('../lib/World');
var Serializer = require('../lib/Serializer');

var serializer = Serializer;

describe('Serializer', function() {
  it('Serializer', function() {

    var world = new World();

    var circle = new Circle(1);

    var b1 = world.createBody({
      position : Vec2(0, 0),
      type : 'dynamic'
    });

    b1.createFixture(circle);

    var b2 = world.createBody({
      position : Vec2(2, 0),
      type : 'dynamic'
    });
    b2.createFixture(circle);

    world.createJoint(new DistanceJoint({
      bodyA: b1,
      localAnchorA: Vec2(6, 0),
      bodyB: b2,
      localAnchorB: Vec2(0, -1)
    }));

    var text = serializer.toJson(world);
    console.log(text);

    world = serializer.fromJson(text);
    var text2 = serializer.toJson(world);
    console.log(text2);

    var d =  diff.diffLines(text, text2);
    console.log(d);
    expect(d.length).be(1);
  });
});
