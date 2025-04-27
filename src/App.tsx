import "./App.css";

import React from "react";
import { useState } from "react";
import type { GGRacer, Track } from "./model/model.ts";

import {
    mk_init_ggdex,
    mk_race,
    dex_to_array,
    mk_racer,
    sim_race,
    tick_race,
} from "./gg.ts";

function App() {
    const [dex] = useState(mk_init_ggdex);
    const [race, setRace] = useState(() =>
        mk_race(dex_to_array(dex).map(mk_racer)),
    );

    const [whole_race] = useState(() => sim_race(dex));
    const [scrubVal, setScrubVal] = useState(0);
    console.log("Whole Race:", whole_race);

    const tick = () => {
        const next = tick_race(race);
        whole_race[next.tick] = next; // TODO: dodge mutation
        setRace(next);
    };

    const onSliderScrub = (e) => {
        //        console.log(e.target.value);
        setScrubVal(e.target.value);
        setRace(whole_race[scrubVal]);
    };

    const replay = (dir = 1) => {
        setRace((race) => {
            const tick = Math.max(0, race.tick + dir);
            return whole_race[tick];
        });
    };

    return (
        <>
            <div>
                <button onClick={tick}>Sim one frame</button>
                <button onClick={() => replay(1)}>FWD</button>
                <button onClick={() => replay(-1)}>REV</button>
                <input
                    type="range"
                    min={0}
                    max={whole_race.length - 1}
                    defaultValue={scrubVal}
                    onChange={onSliderScrub}
                />
            </div>
            <Race ggs={race.ggs} tick={race.tick} />
        </>
    );
}

const Track = ({ gg }: { gg: GGRacer }) => {
    return (
        <div key={gg.gg_id} className="track">
            <span className="stat">{gg.stats.mana.toFixed(2)}</span>&nbsp;
            <span className="stat">{gg.stats.stamina.toFixed(2)}</span>
            <span className="gg" style={{ left: gg.phys.pos.x + "px" }}>
                {gg.gg_id}
            </span>
        </div>
    );
};

const Race = ({ tick, ggs }: { tick: number; ggs: GGRacer[] }) => {
    return (
        <div>
            <div>Race {tick}</div>
            <div className="tracks">
                {ggs.map((gg: GGRacer) => (
                    <Track gg={gg} key={gg.gg_id} />
                ))}
            </div>
        </div>
    );
};

export default App;
