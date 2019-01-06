//I hate writing utils file. Typically that means don't know how to group your utilities
//for now this will have to do
import {b2BodyDef,b2FixtureDef,b2Body,b2PolygonShape,b2BodyType} from  "@flyover/box2d";

//some utilities to deal with co-ordinate systems variations with some sanity intact
//seems simple enough. But without these , I get very easily confused

//Box2d typically deals with meters(realworld) and not pixels(our canvas on screen) 
const fromPhysicsToCanvas = (n,SCALE) => n*SCALE;
const fromCanvasToPhysics = (n,SCALE) => n/SCALE; 

//Dom co-ordinate and position system is slightly different from canvas positioning
const fromCanvasToDom =(x,y,width,height) => {
	let left = x-(width/2),
		top = y - (height/2);
	return {left,top};
};
const fromDomToCanvas = (left,top,width,height) =>{
	let x = left+(width/2),
		y = top+(height/2);
	return {x,y};
};



const setTransform = (element, value)=> {
  	element.style.transform = value; 
}

const setDomPosition = (dom,width,height,x,y,rotation,SCALE) => {
	//console.log('got SCALE',SCALE,{x,y,rotation});
	let {left,top }= fromCanvasToDom(fromPhysicsToCanvas(x,SCALE),fromPhysicsToCanvas(y,SCALE),width,height);
	//console.log('converted',{left,top,ow:dom.offsetWidth,oh:dom.offsetHeight});
	let transformString = `translate(${left}px,${top}px) rotate(${rotation}rad)`;
	//dom.style.transform = transformString;
	//console.log('dom transforming');
	setTransform(dom,transformString);
};

//without this , beginners (and almost everybody) will go mad
//this creates a box fence of static bodies to prevent the objects falling out of the visible area and continuing to fall infinitely like Alice in rabbit hole
const makeEnclosedBox = (width,height,thickness,world,SCALE) => {
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2BodyType.b2_staticBody;
	var fixDef = new b2FixtureDef;
	fixDef.shape = new b2PolygonShape;
	// half width, half height.
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0;

	//left 
	fixDef.shape.SetAsBox(fromCanvasToPhysics(thickness/2,SCALE),fromCanvasToPhysics(height/2,SCALE))
	bodyDef.position.x = fromCanvasToPhysics(thickness/2,SCALE);
	bodyDef.position.y = fromCanvasToPhysics(height/2,SCALE);
	let fixt = world.CreateBody(bodyDef).CreateFixture(fixDef);
	fixt.m_body.SetUserData({category:'_LEFT_WALL_'});
	//bottom
	//half width,half height
	fixDef.shape.SetAsBox(fromCanvasToPhysics(width/2,SCALE),fromCanvasToPhysics(thickness/2,SCALE));
	bodyDef.position.x = fromCanvasToPhysics(width/2,SCALE);
	bodyDef.position.y = fromCanvasToPhysics(height,SCALE);
	fixt = world.CreateBody(bodyDef).CreateFixture(fixDef);
	fixt.m_body.SetUserData({category:'_BOTTOM_WALL_'});

	//top
	fixDef.shape.SetAsBox(fromCanvasToPhysics(width/2,SCALE),fromCanvasToPhysics(thickness/2,SCALE));
	bodyDef.position.x = fromCanvasToPhysics(width/2,SCALE);
	bodyDef.position.y = fromCanvasToPhysics(thickness/2,SCALE);
	fixt = world.CreateBody(bodyDef).CreateFixture(fixDef);
	fixt.m_body.SetUserData({category:'_TOP_WALL_'});

	//right
	fixDef.shape.SetAsBox(fromCanvasToPhysics(thickness/2,SCALE),fromCanvasToPhysics(height/2,SCALE));
	bodyDef.position.x = fromCanvasToPhysics(width,SCALE);
	bodyDef.position.y = fromCanvasToPhysics(height/2,SCALE);
	fixt = world.CreateBody(bodyDef).CreateFixture(fixDef);
	fixt.m_body.SetUserData({category:'_RIGHT_WALL_'});

}

const delay = (millis)=> new Promise((resolve,reject)=>{
	setTimeout(()=>resolve(),millis);
});

const TWO_NUMBERS = function(props, propName, componentName) {
  if (!Array.isArray(props[propName]) || props[propName].length != 2 || !props[propName].every(Number.isFinite)) {
    return new Error(`${propName} needs to be an array of two numbers`);
  }

  return null
}




const TWO_NUMBERS_OPTIONAL = function(props, propName, componentName) {
  if(!props.TWO_NUMBERS_OPTIONAL){
  	return null;
  }
   if (!Array.isArray(props[propName]) || props[propName].length != 2 || !props[propName].every(Number.isFinite)) {
    return new Error(`${propName} needs to be an array of two numbers`);
  }

  return null
}

export {fromPhysicsToCanvas,fromCanvasToPhysics,fromCanvasToDom,fromDomToCanvas,setDomPosition,makeEnclosedBox,delay,TWO_NUMBERS,TWO_NUMBERS_OPTIONAL};