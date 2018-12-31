import React,{Component,Fragment} from 'react';
import PropTypes from 'prop-types';
import {b2Vec2,b2BodyDef,b2FixtureDef,b2Body,b2PolygonShape,b2CircleShape,b2BodyType} from  "@flyover/box2d";
import {fromPhysicsToCanvas,fromCanvasToPhysics,fromCanvasToDom,fromDomToCanvas,setDomPosition,makeEnclosedBox,delay,TWO_NUMBERS_OPTIONAL} from './Utils';


class Box2dObject extends Component{
	constructor(props){
		super(props);
		this.state = {physicsInited:false,domWidth:null,domHeight:null,circleRadius:null};
		if(!props.worldRef){
			throw new Error('worldRef prop is missing. Please use world consumer to acquire the worldRef or put the Item component direct child of the World');
		}
	}
	static _internalType="Box2dObject";
	
	//I am not sure in which browsers this works
	createFixturesForInline = (fixDef,body,rects) => {
		//const rects = this.el.getClientRects();
		const boundingRect = this.el.getBoundingClientRect();
		
		const centerX = this.el.offsetWidth/2;
		const centerY = boundingRect.height/2;
		const SCALE = this.props.worldRef.SCALE;
		//if for some reason a fixture of size 0 created whole simulation screws up and not working 
		const filteredRects = Array.from(rects).filter(x => ((x.width>0)&&(x.height>0)));
		const leftOffset = boundingRect.left;
		const topOffset = boundingRect.top;
		const firstRect = filteredRects[0];
		for (let i = 0; i < filteredRects.length; i++) {
			let curRect = filteredRects[i];
			let fixtureX = (((curRect.left-leftOffset)+(curRect.right-leftOffset))/2)-centerX;
			let fixtureY = ((curRect.top - firstRect.top)+(curRect.height/2))-centerY;
			fixDef.shape = new b2PolygonShape;
			
			fixDef.shape.SetAsBox(fromCanvasToPhysics(curRect.width/2,SCALE),fromCanvasToPhysics(curRect.height/2,SCALE),new b2Vec2(fromCanvasToPhysics(fixtureX,SCALE),fromCanvasToPhysics(fixtureY,SCALE)));
			let fixt = body.CreateFixture(fixDef);
		}
	}

	//FIXME: this method is getting big
	physicsInit = async () => {
		const {fixed=false,restitution=0.1,friction=0.5,density=1,shape='box',category=null,worldRef,data,width,height,left,top,initialForce,initialImpulse,bullet}=this.props;

		const bodyDef = new b2BodyDef;
		bodyDef.type = (fixed)? b2BodyType.b2_staticBody:b2BodyType.b2_dynamicBody;
		
		const fixDef = new b2FixtureDef;
		fixDef.shape = new b2PolygonShape;
		fixDef.density = density;
		fixDef.friction = friction;
		fixDef.restitution = restitution;
		let SCALE = worldRef.SCALE;
		
		
		//had to be done to get browser realize width/height in position:relative
		this.el.style.overflow='auto';
		//FIXME: Check browser compatibility of these methods.(I don't want to use jquery 😠 ). 
		let domWidth = (width)?width: this.el.offsetWidth,
			domHeight =(height)?height: this.el.offsetHeight,
			domLeft = ('left' in this.props)?left: this.el.offsetLeft,
			domTop = ('top' in this.props )?top:this.el.offsetTop;
		
	
					// (left,top,width,height) 
		let {x,y} = fromDomToCanvas(domLeft,domTop,domWidth,domHeight);
		
		bodyDef.position.x = fromCanvasToPhysics(x,worldRef.SCALE);
		bodyDef.position.y = fromCanvasToPhysics(y,worldRef.SCALE);
		
		const body  = worldRef.world.CreateBody(bodyDef);
		
		if(shape==='box'){
			const rects = this.el.getClientRects();
			console.log('rects',rects);
			if(rects.length>1){
				console.log('inline element detected',rects);
				//this is an inline element
				this.createFixturesForInline(fixDef,body,rects);
			} else {
				fixDef.shape = new b2PolygonShape;
				//half width,half height
				fixDef.shape.SetAsBox(fromCanvasToPhysics(domWidth/2,SCALE),fromCanvasToPhysics(domHeight/2,SCALE));
				body.CreateFixture(fixDef);
			}
		} else if(shape==='circle'){
			if (domHeight != domWidth){
				throw new Error('For shape circle, height and width should be same');
			}
			fixDef.shape = new b2CircleShape(fromCanvasToPhysics(domHeight/2,SCALE));
			body.CreateFixture(fixDef);
			this.setState({circleRadius:domHeight/2});

		} else {
			throw new Error(`Unknown shape ${shape}, only box and circle supported for now`);
		}
		
		const userData = {category,dom:this.el,rc:this};
		if(data){
			userData.data = data;
		}
		//console.log('setting userData',userData);
		body.SetUserData(userData);
		this.body = body;
		if(bullet){
			this.body.SetBullet(bullet);
		}
		
		if(initialForce){
			this.applyForce(initialForce);
		}
		if(initialImpulse){
			this.applyImpulse(initialImpulse);
		}
		this.setState({domHeight,domWidth,physicsInited:true});
	};

	applyForce = ([x,y]) => {
		if(!this.body){
			return;
		}
		this.body.ApplyForce(new b2Vec2(x,y),this.body.GetWorldCenter());
	}

	applyImpulse = ([x,y]) => {
		if(!this.body){
			return;
		}
		this.body.ApplyLinearImpulse(new b2Vec2(x,y),this.body.GetWorldCenter());
	}	

	componentWillUnmount() {
		//console.log('component unmounting',this.body);
		if(this.body){

			let userData = this.body.GetUserData();
			userData.removed = true;
			this.body.SetUserData(userData);
			this.body.SetAwake(true);
		}
	}

	componentDidMount() {
		if('waitFor' in this.props){
			if(this.props.waitFor){
				this.physicsInit();
			}
		} else {
			this.physicsInit();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(!('waitFor' in this.props)){
			return;
		}

		if(this.state.physicsInited){
			return;
		}

		if(this.props.waitFor){
			this.physicsInit();
		}
	}

	render() {
		let {physicsInited,domHeight,domWidth,circleRadius} = this.state;
		let {hideUntil=true} = this.props;
		let {style = {}} = this.props.children.props;

		const styles = (physicsInited)?{position:'absolute',display:'block',left:0,top:0,height:domHeight,width:domWidth,willChange:'transform'}:(hideUntil?{visibility:'hidden'}:{});

		
		if(physicsInited && circleRadius){
			styles.borderRadius=circleRadius;
		}
		return React.cloneElement(this.props.children,{ref:(el)=>{
			this.el = el;
		},style: {...style,...styles}});
	}

}

Box2dObject.defaultProps = {
	fixed: false,
	density:1,
	shape:'box',
	bullet:false,

};

Box2dObject.propTypes = {
	/** This component has to have a single dom element child */
	children: PropTypes.element.isRequired,
	/** Height of the object. If not specified it will try to determine automatically (Auto detection is iffy due to the complexity of css rendering) */
	height: PropTypes.number,
	/** Width of the object. If not specified it will try to determine automatically (Auto detection is iffy due to the complexity of css rendering) */
	width: PropTypes.number,

	/** Left of the object. If not specified it will try to determine automatically (Auto detection is iffy due to the complexity of css rendering) */
	left: PropTypes.number,

	/** Height of the object. If not specified it will try to determine automatically (Auto detection is iffy due to the complexity of css rendering) */
	top: PropTypes.number,

	/** whether or not the object is fixed static or not. Setting this true would making the object fixed in its initial left and top */
	fixed: PropTypes.bool,

	/** density of the object. This combined with height and width determine the mass of the object. Higher this value heavier the object is */
	density: PropTypes.number,

	/** Friction for object in physics simuation. lesser the value, more slippery the object would be */
	friction: PropTypes.number,

	/** Bounciness or elasticity of the object.its should be between 0 to 1. Higher the value more the object bounce with other objects */
	restitution: PropTypes.number,

	/** This is a special flag , that set true for very fast(really really) moving objects. Set this to true . But More objects with this flag true would cause performance issues. Rule of thumb. If you notice some objects pass through other objects when moving fast, set this to true */
	bullet: PropTypes.bool,

	/** callback on begin colliding with other objects */
	onBeginContact: PropTypes.func,

	/** callback on end of colliding. This may not happen always */
	onEndContact: PropTypes.func,

	/** shape to simulate */
	shape: PropTypes.oneOf(['circle','box']),

	/** in form of [x,y] . Setting this would apply this force after creating the body */
	initialForce: TWO_NUMBERS_OPTIONAL,

	/** 
		in form of [x,y] . Same as force . But it aplies impulse instead of force.
	 */
	initialImpulse: TWO_NUMBERS_OPTIONAL,

	/**
		A string tag to identify the kind of object. This would be primarily used to identify the objects after collision
	*/
	category: PropTypes.string,
};

export default Box2dObject;