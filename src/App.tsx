import "./App.css";

import React from "react";
import { useState } from "react";
import type {
    GGDex,
    GGMon,
    GGMonId,
    GGRacer,
    Race,
    Track,
} from "./model/model.ts";

let gguid: GGMonId = 0;
const mk_init_ggdex = (): GGDex => {
    const dex: GGDex = {};
    const g1 = mk_ggmon(gguid++, 2, 10);
    const g2 = mk_ggmon(gguid++, 2.2, 9);
    dex[g1.id] = g1;
    dex[g2.id] = g2;
    return dex;
};
const dex_to_array = (ggdex: GGDex): GGMon[] => Object.values(ggdex);

const mk_ggmon = (id: GGMonId, acc: number, stamina: number) => ({
    id,
    acc,
    stamina,
});

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

const mk_race = (ggs: GGRacer[]): Race => {
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
    const newPos = { x: pos.x + newVel, y: pos.y };

    return {
        gg_id,
        phys: {
            ...phys,
            pos: newPos,
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
