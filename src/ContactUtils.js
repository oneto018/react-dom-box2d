export function getBodyACategory(){
	return this.contact.GetFixtureA().m_body.GetUserData().category;
}

export function getBodyBCategory(){
	return this.contact.GetFixtureB().m_body.GetUserData().category;
}

//this is unreliable
// export function getApproxImpactFromContact () {
// 	const contact = this.contact,
// 		SCALE = this.SCALE;

// 	let impact = 0;
// 	for (let i = 0; i < contact.m_manifold.points.length; i++) {
// 		//this is actually the impulse required to execute the collision response. I don't know any other simple ways to estimate the impact easily without the presolve /post solve callbacks.

// 		impact+=contact.m_oldManifold.points[i].normalImpulse;
// 		//console.log('impact calc',{impact});
// 		//impact+=contact.m_oldManifold.points[i].tangentImpulse;
// 		//console.log('impact calc',{impact});
// 	}
// 	//without multiplying , the value would be like 0.0016655....
// 	return impact;
// };

