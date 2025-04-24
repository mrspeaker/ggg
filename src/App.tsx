import React from "react";
import { useState } from "react";
import "./App.css";

type Vec2 = {
    x: number;
    y: number;
};

type GGmon = {
    id: number;
    pos: Vec2;
    vel: number;
    acc: number;
    stamina: number;
};

type Track = {
    len: number;
};

function mk_init_gg() {
    const ggs: GGmon[] = [];
    ggs.push({
        id: 1,
        pos: { x: 0, y: 0 },
        vel: 0,
        acc: 2,
        stamina: 10,
    });
    ggs.push({
        id: 2,
        pos: { x: 0, y: 0 },
        vel: 0,
        acc: 2.2,
        stamina: 9,
    });
    return ggs;
}

const move_gg = (gg: GGmon): GGmon => {
    const { pos } = gg;
    let { vel, acc, stamina } = gg;

    const newVel = vel + acc * 1 * (stamina > 0 ? 1 : 0);
    stamina = Math.max(0, stamina - 1);

    return {
        ...gg,
        pos: { x: pos.x + newVel, y: gg.pos.y },
        vel: newVel,
        stamina,
    };
};

function App() {
    const [tick, setTick] = useState(0);

    const [gg, setGG] = useState<GGmon[]>(mk_init_gg());

    const tick_one = () => {
        setTick((t) => t + 1);
        const prev = gg;
        const next = gg.map(move_gg);

        console.log(prev, next);

        setGG(next);
    };

    return (
        <>
            <div>
                <button onClick={tick_one}>Seconds is :{tick}</button>
            </div>
            <div>
                <Track ggs={gg} tick={tick} />
            </div>
        </>
    );
}

const Track = ({ tick, ggs }) => {
    return (
        <div>
            <div>{tick}</div>
            <div className="tracks">
                {ggs.map((gg: GGmon) => (
                    <div key={gg.id} className="track">
                        <span className="gg" style={{ left: gg.pos.x + "px" }}>
                            {gg.id}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
