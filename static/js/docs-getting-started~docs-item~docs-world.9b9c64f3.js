(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"./src/index.js":function(e,t,o){"use strict";var r=o("./node_modules/react/index.js"),n=o.n(r),i=o("./node_modules/@flyover/box2d/dist/box2d.umd.js"),a=function(e,t){return e*t},s=function(e,t){return e/t},l=function(e,t,o,r){return{x:e+o/2,y:t+r/2}},c=function(e,t,o,r,n){var i,s,l=function(e,t,o,r){return{left:e-o/2,top:t-r/2}}(a(t,n),a(o,n),e.offsetWidth,e.offsetHeight),c=l.left,u=l.top,d="translate(".concat(c,"px,").concat(u,"px) rotate(").concat(r,"rad)");s=d,(i=e).style.webkitTransform=s,i.style.mozTransform=s,i.style.msTransform=s,i.style.oTransform=s,i.style.transform=s},u=function(e,t,o,r,n){var a=new i.b2BodyDef;a.type=i.b2BodyType.b2_staticBody;var l=new i.b2FixtureDef;l.shape=new i.b2PolygonShape,l.density=1,l.friction=.5,l.restitution=0,l.shape.SetAsBox(s(o/2,n),s(t/2,n)),a.position.x=s(o/2,n),a.position.y=s(t/2,n);var c=r.CreateBody(a).CreateFixture(l);c.m_body.SetUserData({category:"_LEFT_WALL_"}),l.shape.SetAsBox(s(e/2,n),s(o/2,n)),a.position.x=s(e/2,n),a.position.y=s(t,n),(c=r.CreateBody(a).CreateFixture(l)).m_body.SetUserData({category:"_BOTTOM_WALL_"}),l.shape.SetAsBox(s(e/2,n),s(o/2,n)),a.position.x=s(e/2,n),a.position.y=s(o/2,n),(c=r.CreateBody(a).CreateFixture(l)).m_body.SetUserData({category:"_TOP_WALL_"}),l.shape.SetAsBox(s(o/2,n),s(t/2,n)),a.position.x=s(e,n),a.position.y=s(t/2,n),(c=r.CreateBody(a).CreateFixture(l)).m_body.SetUserData({category:"_RIGHT_WALL_"})};function d(){return this.contact.GetFixtureA().m_body.GetUserData().category}function p(){return this.contact.GetFixtureB().m_body.GetUserData().category}function f(e){return(f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(){return(y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e}).apply(this,arguments)}function h(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)o=i[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)o=i[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}function m(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function w(e,t){return(w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var x=n.a.createContext(),S=x.Provider,O=(x.Consumer,function(e){function t(e){var o,r,a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,a=b(t).call(this,e),o=!a||"object"!==f(a)&&"function"!==typeof a?v(r):a,g(v(v(o)),"renderPhysics",function(){for(var e=o.world.m_bodyList;e;e=e.m_next)if(e.IsAwake()){var t=e.GetUserData();if(t&&t.dom)if(t.removed)o.world.DestroyBody(e);else{var r=e.GetPosition(),n=r.x,i=r.y,a=e.GetAngle();c(t.dom,n,i,a,o.SCALE)}}}),g(v(v(o)),"physLoop",function(){o.rafId=void 0,o.world.Step(1/60,10,10),o.world.ClearForces(),o.renderPhysics(),o.physLoopStart()}),g(v(v(o)),"physLoopStart",function(){o.rafId||(o.rafId=window.requestAnimationFrame(o.physLoop))}),g(v(v(o)),"getChildrenMapped",function(){return n.a.Children.map(o.props.children,function(e){return"Box2dObject"===e.type._internalType?n.a.cloneElement(e,{worldRef:v(v(o))}):e})});var s=e.width,l=e.height,y=e.gravity,m=void 0===y?[0,10]:y,w=e.allowSleep,x=void 0===w||w,S=e.scaleFactor,O=void 0===S?60:S,j=e.enclosed,_=void 0===j||j,C=e.enclosureThickness,P=void 0===C?3:C,k=(e.children,e.style),B=void 0===k?{}:k,I=h(e,["width","height","gravity","allowSleep","scaleFactor","enclosed","enclosureThickness","children","style"]);o.restProps=I,o.SCALE=O,o.world=new i.b2World(new i.b2Vec2(m[0],m[1]),x),window.world=o.world,_&&u(s,l,P,o.world,o.SCALE),o.worldChangeStatus=0,o._contactCbProcess=function(e,t){var r=o.SCALE,n=e.GetFixtureA().m_body.GetUserData();n&&(n[t]=!0);var i={SCALE:r,contact:e};n&&n.rc&&n.rc.props[t]&&(i.getOthersCategory=p,n.rc.props[t](i));var a=e.GetFixtureB().m_body.GetUserData();a&&(a[t]=!0),a&&a.rc&&a.rc.props[t]&&(i.getOthersCategory=d,a.rc.props[t](i))},o._contactListener={BeginContact:function(e){o._contactCbProcess(e,"onBeginContact")},EndContact:function(e){o._contactCbProcess(e,"onEndContact")},PreSolve:function(e,t){},PostSolve:function(e,t){}},o.world.SetContactListener(o._contactListener);var A={width:s,height:l,position:"relative",overlow:"hidden",boxSizing:"border-box",padding:P};return o.worldStyle=function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},r=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),r.forEach(function(t){g(e,t,o[t])})}return e}({},A,B),o}var o,a,s;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&w(e,t)}(t,r["Component"]),o=t,(a=[{key:"componentDidMount",value:function(){this.physLoopStart()}},{key:"componentWillUnmount",value:function(){this.rafId&&(window.cancelAnimationFrame(this.rafId),this.rafId=void 0)}},{key:"render",value:function(){var e=this.props,t=e.className,o=void 0===t?"Box2dWorld":t;e.children;return n.a.createElement("div",y({className:o},this.restProps,{style:this.worldStyle}),n.a.createElement(S,{value:this},this.getChildrenMapped()))}}])&&m(o.prototype,a),s&&m(o,s),t}()),j=O;O.__docgenInfo={description:"",methods:[{name:"renderPhysics",docblock:null,modifiers:[],params:[],returns:null},{name:"physLoop",docblock:null,modifiers:[],params:[],returns:null},{name:"physLoopStart",docblock:null,modifiers:[],params:[],returns:null},{name:"getChildrenMapped",docblock:null,modifiers:[],params:[],returns:null}],displayName:"Box2dWorld",props:{width:{type:{name:"number"},required:!0,description:"Width of your world in pixels"},height:{type:{name:"number"},required:!0,description:"height of your world in pixels"},gravity:{type:{name:"custom",raw:"TWO_NUMBERS_OPTIONAL"},required:!1,description:"Gravity in the world in form of [x,y] array. By default the gravity is [0,10]. Meaning downward gravity of 10. For upward gravity it would be [0,-10]. Earth typically has gravity [0,9.8]"},enclosed:{type:{name:"bool"},required:!1,description:"Whether to create an invisible walls enclosing our world. default is true. Without the enclosing, your objects will drift endlessly unless its been removed. This is mainly a convenience to prevent that. This is kind of like training wheel. Once you feel ready, disable this."},enclosureThickness:{type:{name:"number"},required:!1,description:"Thickness of the walls created if enclosed=true in pixels. By default this is 3px"},allowSleep:{type:{name:"bool"},required:!1,description:"You probably don't need to change this. Tells whether the objects in the physics world allowed tp sleep  or not. By default, its true."},scaleFactor:{type:{name:"number"},required:!1,description:"Internal scaling factor used to translate the physical dimensions for simulation to the screen. Changing this value will have no effect of the size of the rendered objects. Its just used internally for the physical simulation. Mostly this parameter need not be edited. By default its 60"}}};var _=o("./node_modules/@babel/runtime/regenerator/index.js"),C=o.n(_);function P(e){return(P="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},r=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),r.forEach(function(t){q(e,t,o[t])})}return e}function B(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var o=[],r=!0,n=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(o.push(a.value),!t||o.length!==t);r=!0);}catch(l){n=!0,i=l}finally{try{r||null==s.return||s.return()}finally{if(n)throw i}}return o}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function I(e,t,o,r,n,i,a){try{var s=e[i](a),l=s.value}catch(c){return void o(c)}s.done?t(l):Promise.resolve(l).then(r,n)}function A(e){return function(){var t=this,o=arguments;return new Promise(function(r,n){var i=e.apply(t,o);function a(e){I(i,r,n,a,s,"next",e)}function s(e){I(i,r,n,a,s,"throw",e)}a(void 0)})}}function F(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function T(e){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function L(e,t){return(L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function E(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function q(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var W=function(e){function t(e){var o,r,n;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,n=T(t).call(this,e),o=!n||"object"!==P(n)&&"function"!==typeof n?E(r):n,q(E(E(o)),"createFixturesForInline",function(e,t,r){for(var n=o.el.getBoundingClientRect(),a=o.el.offsetWidth/2,l=n.height/2,c=o.props.worldRef.SCALE,u=Array.from(r).filter(function(e){return e.width>0&&e.height>0}),d=n.left,p=(n.top,u[0]),f=0;f<u.length;f++){var y=u[f],h=(y.left-d+(y.right-d))/2-a,m=y.top-p.top+y.height/2-l;e.shape=new i.b2PolygonShape,e.shape.SetAsBox(s(y.width/2,c),s(y.height/2,c),new i.b2Vec2(s(h,c),s(m,c)));t.CreateFixture(e)}}),q(E(E(o)),"physicsInit",A(C.a.mark(function e(){var t,r,n,a,c,u,d,p,f,y,h,m,b,w,v,g,x,S,O,j,_,P,k,B,I,A,F,T,L,q,W,D,U,R,G;return C.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=o.props,r=t.fixed,n=void 0!==r&&r,a=t.restitution,c=void 0===a?.1:a,u=t.friction,d=void 0===u?.5:u,p=t.density,f=void 0===p?1:p,y=t.shape,h=void 0===y?"box":y,m=t.category,b=void 0===m?null:m,w=t.worldRef,v=t.data,g=t.width,x=t.height,S=t.left,O=t.top,j=t.initialForce,_=t.initialImpulse,P=t.bullet,(k=new i.b2BodyDef).type=n?i.b2BodyType.b2_staticBody:i.b2BodyType.b2_dynamicBody,(B=new i.b2FixtureDef).shape=new i.b2PolygonShape,B.density=f,B.friction=d,B.restitution=c,I=w.SCALE,o.el.style.overflow="auto",A=g||o.el.offsetWidth,F=x||o.el.offsetHeight,T="left"in o.props?S:o.el.offsetLeft,L="top"in o.props?O:o.el.offsetTop,q=l(T,L,A,F),W=q.x,D=q.y,k.position.x=s(W,w.SCALE),k.position.y=s(D,w.SCALE),U=w.world.CreateBody(k),"box"!==h){e.next=21;break}R=o.el.getClientRects(),console.log("rects",R),R.length>1?(console.log("inline element detected",R),o.createFixturesForInline(B,U,R)):(B.shape=new i.b2PolygonShape,B.shape.SetAsBox(s(A/2,I),s(F/2,I)),U.CreateFixture(B)),e.next=30;break;case 21:if("circle"!==h){e.next=29;break}if(F==A){e.next=24;break}throw new Error("For shape circle, height and width should be same");case 24:B.shape=new i.b2CircleShape(s(F/2,I)),U.CreateFixture(B),o.setState({circleRadius:F/2}),e.next=30;break;case 29:throw new Error("Unknown shape ".concat(h,", only box and circle supported for now"));case 30:G={category:b,dom:o.el,rc:E(E(o))},v&&(G.data=v),U.SetUserData(G),o.body=U,P&&o.body.SetBullet(P),j&&o.applyForce(j),_&&o.applyImpulse(_),o.setState({domHeight:F,domWidth:A,physicsInited:!0});case 38:case"end":return e.stop()}},e,this)}))),q(E(E(o)),"applyForce",function(e){var t=B(e,2),r=t[0],n=t[1];o.body&&o.body.ApplyForce(new i.b2Vec2(r,n),o.body.GetWorldCenter())}),q(E(E(o)),"applyImpulse",function(e){var t=B(e,2),r=t[0],n=t[1];o.body&&o.body.ApplyLinearImpulse(new i.b2Vec2(r,n),o.body.GetWorldCenter())}),o.state={physicsInited:!1,domWidth:null,domHeight:null,circleRadius:null},!e.worldRef)throw new Error("worldRef prop is missing. Please use world consumer to acquire the worldRef or put the Item component direct child of the World");return o}var o,a,c;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&L(e,t)}(t,r["Component"]),o=t,(a=[{key:"componentWillUnmount",value:function(){if(this.body){var e=this.body.GetUserData();e.removed=!0,this.body.SetUserData(e),this.body.SetAwake(!0)}}},{key:"componentDidMount",value:function(){"waitFor"in this.props?this.props.waitFor&&this.physicsInit():this.physicsInit()}},{key:"componentDidUpdate",value:function(e,t){"waitFor"in this.props&&(this.state.physicsInited||this.props.waitFor&&this.physicsInit())}},{key:"render",value:function(){var e=this,t=this.state,o=t.physicsInited,r=t.domHeight,i=t.domWidth,a=t.circleRadius,s=this.props.hideUntil,l=void 0===s||s,c=this.props.children.props.style,u=void 0===c?{}:c,d=o?{position:"absolute",display:"block",left:0,top:0,height:r,width:i,willChange:"transform"}:l?{visibility:"hidden"}:{};return o&&a&&(d.borderRadius=a),n.a.cloneElement(this.props.children,{ref:function(t){e.el=t},style:k({},u,d)})}}])&&F(o.prototype,a),c&&F(o,c),t}();q(W,"_internalType","Box2dObject"),W.defaultProps={fixed:!1,density:1,shape:"box",bullet:!1};var D=W;W.__docgenInfo={description:"",methods:[{name:"createFixturesForInline",docblock:null,modifiers:[],params:[{name:"fixDef",type:null},{name:"body",type:null},{name:"rects",type:null}],returns:null},{name:"physicsInit",docblock:null,modifiers:["async"],params:[],returns:null},{name:"applyForce",docblock:null,modifiers:[],params:[{name:"[x,y]",type:null}],returns:null},{name:"applyImpulse",docblock:null,modifiers:[],params:[{name:"[x,y]",type:null}],returns:null}],displayName:"Box2dObject",props:{fixed:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:"whether or not the object is fixed static or not. Setting this true would making the object fixed in its initial left and top"},density:{defaultValue:{value:"1",computed:!1},type:{name:"number"},required:!1,description:"density of the object. This combined with height and width determine the mass of the object. Higher this value heavier the object is"},shape:{defaultValue:{value:"'box'",computed:!1},type:{name:"enum",value:[{value:"'circle'",computed:!1},{value:"'box'",computed:!1}]},required:!1,description:"shape to simulate"},bullet:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:"This is a special flag , that set true for very fast(really really) moving objects. Set this to true . But More objects with this flag true would cause performance issues. Rule of thumb. If you notice some objects pass through other objects when moving fast, set this to true"},children:{type:{name:"element"},required:!0,description:"This component has to have a single dom element child"},height:{type:{name:"number"},required:!1,description:"Height of the object. If not specified it will try to determine automatically (Auto detection is iffy due to the complexity of css rendering)"},width:{type:{name:"number"},required:!1,description:"Width of the object. If not specified it will try to determine automatically (Auto detection is iffy due to the complexity of css rendering)"},left:{type:{name:"number"},required:!1,description:"Left of the object. If not specified it will try to determine automatically (Auto detection is iffy due to the complexity of css rendering)"},top:{type:{name:"number"},required:!1,description:"Height of the object. If not specified it will try to determine automatically (Auto detection is iffy due to the complexity of css rendering)"},friction:{type:{name:"number"},required:!1,description:"Friction for object in physics simuation. lesser the value, more slippery the object would be"},restitution:{type:{name:"number"},required:!1,description:"Bounciness or elasticity of the object.its should be between 0 to 1. Higher the value more the object bounce with other objects"},onBeginContact:{type:{name:"func"},required:!1,description:"callback on begin colliding with other objects"},onEndContact:{type:{name:"func"},required:!1,description:"callback on end of colliding. This may not happen always"},initialForce:{type:{name:"custom",raw:"TWO_NUMBERS_OPTIONAL"},required:!1,description:"in form of [x,y] . Setting this would apply this force after creating the body"},initialImpulse:{type:{name:"custom",raw:"TWO_NUMBERS_OPTIONAL"},required:!1,description:"in form of [x,y] . Same as force . But it aplies impulse instead of force."},category:{type:{name:"string"},required:!1,description:"A string tag to identify the kind of object. This would be primarily used to identify the objects after collision"}}},o.d(t,"b",function(){return U}),o.d(t,"a",function(){return R});var U=j,R=D}}]);
//# sourceMappingURL=docs-getting-started~docs-item~docs-world.c439f2de3c33db52524e.js.map