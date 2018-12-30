import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {b2World,b2Vec2,b2BodyDef,b2FixtureDef,b2Body,b2PolygonShape,b2CircleShape,b2BodyType} from  "@flyover/box2d";
import {fromPhysicsToCanvas,fromCanvasToPhysics,fromCanvasToDom,fromDomToCanvas,setDomPosition,makeEnclosedBox,TWO_NUMBERS_OPTIONAL} from './Utils';
import {getApproxImpactFromContact,getBodyBCategory,getBodyACategory} from './ContactUtils';


const {Provider,Consumer} = React.createContext();



class Box2dWorld extends Component{
	constructor(props){
		super(props);
		let {width,height,
			gravity=[0,10],
			allowSleep=true,
			scaleFactor=60,
			enclosed=true,
			enclosureThickness=3,
			children,
			style={},
			...rest} = props;
		this.restProps = rest;
		this.SCALE = scaleFactor;

		this.world = new b2World(new b2Vec2(gravity[0], gravity[1]),allowSleep);
		window.world = this.world;
		if(enclosed){
			makeEnclosedBox(width,height,enclosureThickness,this.world,this.SCALE);
		}

		this.worldChangeStatus  = 0;


		this._contactCbProcess  = (contact,cb)=> {
				let SCALE = this.SCALE;
				const dataA = contact.GetFixtureA().m_body.GetUserData();
				if(dataA){
					dataA[cb] = true;
				}
				//could use object pool to reuse this
				const eventObj = {
						SCALE,
						contact,
					};
				if(dataA && dataA.rc && dataA.rc.props[cb]){
					eventObj.getOthersCategory = getBodyBCategory;
					dataA.rc.props[cb](eventObj);
				}
				const dataB = contact.GetFixtureB().m_body.GetUserData();
				if (dataB){
					dataB[cb] = true;
				}
				if(dataB && dataB.rc && dataB.rc.props[cb]){
					eventObj.getOthersCategory = getBodyACategory;
					//console.log('prop',dataB.rc.props,'cb',cb,'cbe',dataB.rc.props[cb]);
					dataB.rc.props[cb](eventObj);
				}
		}

		this._contactListener = {
			BeginContact:(contact)=>{
				this._contactCbProcess(contact,'onBeginContact');
			},
			EndContact: (contact) => {
				this._contactCbProcess(contact,'onEndContact');
			},
			PreSolve:(contact,oldManifold)=>{
				//console.log('PreSolve',{contact,oldManifold});
			},
			PostSolve:(contact,impulse) => {
				//console.log('PostSolve',{contact,impulse});
			}
		};

		this.world.SetContactListener(this._contactListener);

		//some styles to make this abomination work
		let worldStyle = {
			width,height,
			position:'relative',
			overlow:'hidden',
			boxSizing:'border-box',
			padding:enclosureThickness,
		};
		this.worldStyle = {...worldStyle,...style};
	}

	renderPhysics = () => {
		//box2d libs typically implement linkedlist for fast looping
		for (let b = this.world.m_bodyList; b; b = b.m_next) {
			// if(this.worldChangeStatus>0){
			// 	b.SetAwake(true);
			// 	this.worldChangeStatus = 1;
			// }
			if(!b.IsAwake()){
				//if the body is sleeping , why bother
				continue;
				//I probably could optimize static bodies render only once. But not now
			}

	    	let userData=b.GetUserData();
	    	
	    	if(userData && userData.dom){
	    		//console.log('userData',userData);
	    		if(userData.removed){
	    			//this is the most convenient place to do this. I should probably rename the method 
	    			//console.log('body removing',b);
	    			this.world.DestroyBody(b);
	    			//this.worldChangeStatus=2;
	    		} else {
	    			let {x,y} = b.GetPosition();
	    			let angle = b.GetAngle();
	    			//sidestepping whole React and applying css transforms directly to the dom nodes directly (seems simpler this way , hopefully more performant)
	    			//(dom,x,y,rotation,SCALE)
	    			setDomPosition(userData.dom,x,y,angle,this.SCALE);
	    		}
	    	}

		}
		// if(this.worldChangeStatus===1){
		// 	this.worldChangeStatus=0;
		// }

	};

	physLoop = ()=>{
		this.rafId = undefined;
		this.world.Step(
		         1 / 60   //frame-rate (just hoping typical 60hz. in future, planning to use webworkers for uninterrupted physics simulation)
		      ,  10       //velocity iterations
		      ,  10       //position iterations
		);
	   	this.world.ClearForces();
	   	this.renderPhysics();
		this.physLoopStart();
		//console.log('physLoop running');
	};

	physLoopStart = () => {
		if (!this.rafId) {
	       this.rafId = window.requestAnimationFrame(this.physLoop);
	    }
	};

	componentDidMount() {
		//start the simulation/render loop
		this.physLoopStart();
	}

	componentWillUnmount() {
		if (this.rafId) {
	       window.cancelAnimationFrame(this.rafId);
	       this.rafId = undefined;
	    }
	}

	getChildrenMapped = () => {
		return React.Children.map(this.props.children,(child)=>{
			if(child.type._internalType==='Box2dObject'){
				return React.cloneElement(child,{worldRef:this});
			} else {
				return child;
			}
		});
	}

	render() {
		let {className='Box2dWorld',children} = this.props;
		
		return (

			<div className={className} {...this.restProps} style={this.worldStyle}>
				<Provider value={this}>
					{this.getChildrenMapped()}
				</Provider>
			</div>
		);
	}


}



Box2dWorld.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	gravity: TWO_NUMBERS_OPTIONAL,
	enclosed: PropTypes.bool,
	allowSleep: PropTypes.bool,
	scaleFactor: PropTypes.number,
	enclosureThickness: PropTypes.number
};

export {Consumer};

export default Box2dWorld;