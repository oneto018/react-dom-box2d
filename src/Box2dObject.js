import React, { Component, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { b2Vec2, b2BodyDef, b2FixtureDef, b2Body, b2PolygonShape, b2CircleShape, b2BodyType } from "@flyover/box2d";
import { fromPhysicsToCanvas, fromCanvasToPhysics, fromCanvasToDom, fromDomToCanvas, setDomPosition, makeEnclosedBox, delay, TWO_NUMBERS_OPTIONAL } from './Utils';
import { Context } from './Box2dWorld';


/**
 * 
 * @param {{gravityScale?: number, body:b2Body,sleep?: boolean}} props 
 */
const HooksContainer = ({ body, gravityScale = 1, sleep = true }) => {
	useEffect(() => {
		if (body) {
			body.SetGravityScale(gravityScale);
			body.SetLinearDamping(0.8)
		}
	}, [body, gravityScale]);

	useEffect(() => {
		if (body) {
			body.SetSleepingAllowed(sleep);
		}
	}, [body, sleep])


	return null;
};

class Box2dObject extends Component {
	constructor(props) {
		super(props);
		this.state = { physicsInited: false, domWidth: null, domHeight: null, circleRadius: null };
		this.width = null;
		this.height = null;
	}
	static _internalType = "Box2dObject";

	//I am not sure in which browsers this works
	createFixturesForInline = (fixDef, body, rects) => {
		const worldRef = this.context;
		//const rects = this.el.getClientRects();
		const boundingRect = this.el.getBoundingClientRect();

		const centerX = this.el.offsetWidth / 2;
		const centerY = boundingRect.height / 2;
		const SCALE = worldRef.SCALE;
		//if for some reason a fixture of size 0 created whole simulation screws up and not working 
		const filteredRects = Array.from(rects).filter(x => ((x.width > 0) && (x.height > 0)));
		const leftOffset = boundingRect.left;
		const topOffset = boundingRect.top;
		const firstRect = filteredRects[0];
		for (let i = 0; i < filteredRects.length; i++) {
			let curRect = filteredRects[i];
			let fixtureX = (((curRect.left - leftOffset) + (curRect.right - leftOffset)) / 2) - centerX;
			let fixtureY = ((curRect.top - firstRect.top) + (curRect.height / 2)) - centerY;
			fixDef.shape = new b2PolygonShape;

			fixDef.shape.SetAsBox(fromCanvasToPhysics(curRect.width / 2, SCALE), fromCanvasToPhysics(curRect.height / 2, SCALE), new b2Vec2(fromCanvasToPhysics(fixtureX, SCALE), fromCanvasToPhysics(fixtureY, SCALE)));
			let fixt = body.CreateFixture(fixDef);
		}
	}

	//FIXME: this method is getting big
	physicsInit =  () => {
		const { fixed = false, restitution = 0.1, friction = 0.5, density = 1, shape = 'box', category = null, data, width, height, left, top, initialForce, initialImpulse, bullet } = this.props;
		const worldRef = this.context;
		const bodyDef = new b2BodyDef;
		bodyDef.type = (fixed) ? b2BodyType.b2_staticBody : b2BodyType.b2_dynamicBody;

		const fixDef = new b2FixtureDef;
		fixDef.shape = new b2PolygonShape;
		fixDef.density = density;
		fixDef.friction = friction;
		fixDef.restitution = restitution;
		let SCALE = worldRef.SCALE;


		//had to be done to get browser realize width/height in position:relative
		this.el.style.overflow = 'visible';
		//FIXME: Check browser compatibility of these methods.(I don't want to use jquery 😠 ). 
		let domWidth = (width) ? width : this.el.offsetWidth,
			domHeight = (height) ? height : this.el.offsetHeight,
			domLeft = ('left' in this.props) ? left : this.el.offsetLeft,
			domTop = ('top' in this.props) ? top : this.el.offsetTop;

		this.width = domWidth;
		this.height = domHeight;
		// (left,top,width,height) 
		let { x, y } = fromDomToCanvas(domLeft, domTop, domWidth, domHeight);

		bodyDef.position.x = fromCanvasToPhysics(x, worldRef.SCALE);
		bodyDef.position.y = fromCanvasToPhysics(y, worldRef.SCALE);

		const body = worldRef.world.CreateBody(bodyDef);

		if (shape === 'box') {
			const rects = this.el.getClientRects();

			if (rects.length > 1) {
				console.log('inline element detected', rects);
				//this is an inline element
				this.createFixturesForInline(fixDef, body, rects);
			} else {
				fixDef.shape = new b2PolygonShape;
				//half width,half height
				fixDef.shape.SetAsBox(fromCanvasToPhysics(domWidth / 2, SCALE), fromCanvasToPhysics(domHeight / 2, SCALE));
				body.CreateFixture(fixDef);
			}
		} else if (shape === 'circle') {
			if (domHeight != domWidth) {
				throw new Error('For shape circle, height and width should be same');
			}
			fixDef.shape = new b2CircleShape(fromCanvasToPhysics(domHeight / 2, SCALE));
			body.CreateFixture(fixDef);
			this.setState({ circleRadius: domHeight / 2 });

		} else {
			throw new Error(`Unknown shape ${shape}, only box and circle supported for now`);
		}

		const userData = { category, dom: this.el, rc: this };
		if (data) {
			userData.data = data;
		}
		//console.log('setting userData',userData);
		body.SetUserData(userData);
		this.body = body;
		if (bullet) {
			this.body.SetBullet(bullet);
		}

		if (initialForce) {
			this.applyForce(initialForce);
		}
		if (initialImpulse) {
			this.applyImpulse(initialImpulse);
		}
		this.setState({ domHeight, domWidth, physicsInited: true });
	};

	applyForce = ([x, y]) => {
		if (!this.body) {
			return;
		}
		this.body.ApplyForce(new b2Vec2(x, y), this.body.GetWorldCenter());
	}

	applyImpulse = ([x, y]) => {
		if (!this.body) {
			return;
		}
		this.body.ApplyLinearImpulse(new b2Vec2(x, y), this.body.GetWorldCenter());
	}

	componentWillUnmount() {
		//console.log('component unmounting',this.body);
		if (this.body) {

			let userData = this.body.GetUserData();
			userData.removed = true;
			this.body.SetUserData(userData);
			this.body.SetAwake(true);
		}
	}

	componentDidMount() {
		if ('waitFor' in this.props) {
			if (this.props.waitFor) {
				this.physicsInit();
			}
		} else {
			this.physicsInit();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (!('waitFor' in this.props)) {
			return;
		}

		if (this.state.physicsInited) {
			return;
		}

		if (this.props.waitFor) {
			this.physicsInit();
		}
	}

	render() {
		let { physicsInited, domHeight, domWidth, circleRadius } = this.state;
		let { hideUntil = true } = this.props;
		let { style = {} } = this.props.children.props;

		const styles = (physicsInited) ? { position: 'absolute', display: 'block', left: 0, top: 0, height: domHeight, width: domWidth, willChange: 'transform' } : (hideUntil ? { visibility: 'hidden' } : {});


		if (physicsInited && circleRadius) {
			styles.borderRadius = circleRadius;
		}
		return (
			<Fragment>
				<HooksContainer body={this.body} {...this.props} />
				{React.cloneElement(this.props.children, {
					ref: (el) => {
						this.el = el;
					}, style: { ...style, ...styles }
				})}
			</Fragment>)
	}

}

Box2dObject.propTypes = {
	children: PropTypes.element.isRequired,
	height: PropTypes.number,
	width: PropTypes.number,
	left: PropTypes.number,
	top: PropTypes.number,
	density: PropTypes.number,
	friction: PropTypes.number,
	restitution: PropTypes.number,
	bullet: PropTypes.bool,
	onBeginContact: PropTypes.func,
	onEndContact: PropTypes.func,
	shape: PropTypes.oneOf(['circle', 'box']),
	initialForce: TWO_NUMBERS_OPTIONAL,
	initialImpulse: TWO_NUMBERS_OPTIONAL,
	category: PropTypes.string,
};

Box2dObject.contextType = Context;


export default Box2dObject;
