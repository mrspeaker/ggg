import "./App.css";

import React from "react";
import { useState } from "react";
import type { GGMon, GGRacer, Race, RacePhysics, Track } from "./model.ts";

const mk_init_ggdex = (): GGDex => {
    const dex = {
        1: {
            id: 1,
            acc: 2,
            stamina: 10,
        },
        2: {
            id: 2,
            acc: 2.2,
            stamina: 9,
        },
    };
    return dex;
};
const dex_to_array = (ggdex: GGDex): GGMon[] => Object.values(ggdex);

const mk_racer = (gg: GGMon): GGRacer => {
    return {
        gg_id: gg.id,
        phys: {
            pos: { x: 0, y: 0 },
            vel: 0,
            acc: gg.acc,
            stamina: gg.stamina,
        },
    };
};

const mk_race = (ggs: GGMon[]): Race => {
    return {
        tick: 0,
        track: { len: 100 },
        ggs,
    };
};

const move_gg = (ggracer: GGRacer): GGRacer => {
    const { gg_id, phys } = ggracer;
    let { pos, vel, acc, stamina } = phys;

    const newVel = vel + acc * 1 * (stamina > 0 ? 1 : 0);
    stamina = Math.max(0, stamina - 1);

    return {
        gg_id,
        phys: {
            ...phys,
            pos: { x: pos.x + newVel, y: pos.y },
            vel: newVel,
            stamina,
        },
    };
};

const tick_race = (race: Race): Race => {
    return {
        ...race,
        tick: race.tick++,
        ggs: race.ggs.map(move_gg),
    };
};

function App() {
    const [dex] = useState(mk_init_ggdex());
    const [race, setRace] = useState(mk_race(dex_to_array(dex).map(mk_racer)));

    const tick = () => setRace(tick_race);

    return (
        <>
            <div>
                <button onClick={tick}>Seconds is :{race.tick}</button>
            </div>
            <div>
                <Track ggs={race.ggs} tick={race.tick} />
            </div>
        </>
    );
}

const Track = ({ tick, ggs }) => {
    return (
        <div>
            <div>{tick}</div>
            <div className="tracks">
                {ggs.map((gg: GGRacer) => (
                    <div key={gg.gg_id} className="track">
                        <span
                            className="gg"
                            style={{ left: gg.phys.pos.x + "px" }}
                        >
                            {gg.gg_id}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
