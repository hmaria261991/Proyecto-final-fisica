var Example = Example || {};


let luna = 1.62;
let mercurio = 3.7;
let pluton = 0.62;
let jupiter = 24.79;
let tierra = 9.81;

let gravity = tierra / tierra;

Example.catapult = function() {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vector = Matter.Vector;



  let titulo = document.getElementById("titulo");

  // create engine
  var engine = Engine.create(),
    world = engine.world;

  function setGravity() {
    world.gravity = {
      x: 0,
      y: gravity,
      scale: 0.001
    }
  }

  setGravity();





  // create renderer
  var render = Render.create({
    element: document.getElementById("body"),
    engine: engine,
    options: {
      width: 1200,
      height: 768,
      showAngleIndicator: true,
      showCollisions: true,
      showVelocity: true,
      wireframes: false,
      background: `rgb(42,42,42)`
    }
  });

  function restartSimulation(){
    setGravity();
    Engine.clear(engine);
    Matter.Render.stop(render);
    Matter.Runner.stop(runner);
    if (render.canvas) {
      render.canvas.parentElement.removeChild(render.canvas);
    }
    Example.catapult();
  }

  document.getElementById("luna").addEventListener('click', ev=>{
    gravity = luna / tierra;
    titulo.innerHTML = 'Luna <br> (1.62m/s &sup2;)';
    restartSimulation();
  });

  document.getElementById("mercurio").addEventListener('click', ev=>{
    gravity = mercurio / tierra;
    titulo.innerHTML = 'Mercurio <br> (3.7m/s &sup2;)';
    restartSimulation();
  });

  document.getElementById("pluton").addEventListener('click', ev=>{
    gravity = pluton / tierra;
    titulo.innerHTML = 'Plutón <br> (0.62m/s &sup2;)';
    restartSimulation();
  });

  document.getElementById("jupiter").addEventListener('click', ev=>{
    gravity = jupiter / tierra;
    titulo.innerHTML = 'Jupiter <br> (24.79m/s &sup2;)';
    restartSimulation();
  });

  document.getElementById("tierra").addEventListener('click', ev=>{
    gravity = tierra / tierra;
    titulo.innerHTML = 'Tierra <br> (9.81m/s &sup2;)';
    restartSimulation();
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // add bodies
  var group = Body.nextGroup(true);

  var stack = Composites.stack(250, 255, 1, 6, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 30, 30);
  });

  var catapult = Bodies.rectangle(400, 520, 320, 20, { collisionFilter: { group: group }, render: {fillStyle: '#900c3e'}});//Catapulta

  Composite.add(world, [
    stack,
    catapult,
    Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true, render: { fillStyle: '#73c6b6' } }),//Barra inferior
    Bodies.rectangle(250, 555, 20, 50, { isStatic: true, render: { fillStyle: '#154360' } }),//Sostén izquierdo
    Bodies.rectangle(400, 535, 20, 80, { isStatic: true, collisionFilter: { group: group }, render: { fillStyle: '#154360' } }),//Barra del centro
    Bodies.circle(560, 100, 50, { density: 0.005, render: {fillStyle: '#F9473B'}}), //Bola de plomo
    Constraint.create({
      bodyA: catapult,
      pointB: Vector.clone(catapult.position),
      stiffness: 1,
      length: 0
    })
  ]);

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

  Composite.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
  });

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function() {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    },
    setGravityLuna: function(){
      console.log(`Setting gravity to moon`);
      world.gravity = {
        x: 0,
        y: luna / tierra,
        scale: 0.001
      }
      gravity = luna / tierra;
      setGravity();
    }
  };
};


Example.catapult();


