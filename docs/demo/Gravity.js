//@ts-check
import React from 'react';
import { World, Item } from '../../src/index';

const Component = () => {
    const [gravity, setGravity] = React.useState(false);

    return (
        <>
            <div>
                <button onClick={() => setGravity(v => !v)}>
                    {gravity ? "disable gravity" : "enable gravity"}
                </button>
            </div>
            <World height={400} width={600} gravity={[0, -9.8]}>

                <Item width={80} height={80} sleep={false} gravityScale={gravity ? 1 : -1}>
                    <div style={{ background: "green", left: 130, top: 25, textAlign: "center", lineHeight: 80, color: "red" }}>
                        <h2>test div</h2>
                    </div>
                </Item>
                <Item width={80} height={80} left={380} top={25}>
                    <div style={{ background: "red", textAlign: "center", lineHeight: 80, color: "red" }}>
                        <h2>test div</h2>
                    </div>
                </Item>
            </World>
        </>);
};

export default Component;
