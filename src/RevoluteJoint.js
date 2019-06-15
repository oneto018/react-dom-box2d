//@ts-check
import React, { useRef, useEffect, useContext } from 'react';
import { Context } from './Box2dWorld';
import { b2Joint, b2JointDef, b2RevoluteJoint, b2RevoluteJointDef, b2World } from '@flyover/box2d';
import { fromCanvasToPhysics } from './Utils';

/**
 * 
 * @param {{x:number, y:number}} param0 
 */
const fromCanvasToPhysicsVec = ({ x, y }, SCALE) => {
    return { x: fromCanvasToPhysics(x, SCALE), y: fromCanvasToPhysics(y, SCALE) };
}

/**
 * 
 * @param {b2RevoluteJointDef & {anchorA: "center"|{x:number,y:number}, anchorB: "center"|{x:number,y:number}}} param0 
 */
export default function RevoluteJoint({ bodyA, bodyB, collideConnected = false, anchorA = "center", anchorB = "center", ...rest }) {
    /**
     * @type {{world: b2World, SCALE:number}}
     */
    const worldRef = useContext(Context);
    const jointRef = useRef(null);
    useEffect(() => {
        const jointDef = new b2RevoluteJointDef;
        jointDef.bodyA = bodyA;
        jointDef.bodyB = bodyB;
        jointDef.collideConnected = collideConnected;
        const anchA = (anchorA === "center") ? bodyA.GetLocalCenter() : fromCanvasToPhysicsVec(anchorA, worldRef.SCALE);
        jointDef.localAnchorA.Set(anchA.x, anchA.y);
        const anchB = (anchorB === "center") ? bodyB.GetLocalCenter() : fromCanvasToPhysicsVec(anchorB, worldRef.SCALE);
        jointDef.localAnchorA.Set(anchB.x, anchB.y);
        Object.assign(jointDef, rest);
        if (worldRef.world) {
            jointRef.current = worldRef.world.CreateJoint(jointDef);
        }

        return () => {
            if (jointRef.current) {
                console.log('destroying joint');
                worldRef.world.DestroyJoint(jointRef.current);
            }
        };
    }, [bodyA, bodyB])

}