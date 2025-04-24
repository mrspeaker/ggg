import "./App.css";

import React from "react";
import { useState } from "react";
import type { GGRacer, Track } from "./model/model.ts";

import {
    mk_init_ggdex,
    mk_race,
    dex_to_array,
    mk_racer,
    tick_race,
} from "./gg.ts";

function App() {
    const [dex] = useState(mk_init_ggdex());
    const [race, setRace] = useState(mk_race(dex_to_array(dex).map(mk_racer)));

    const tick = () => setRace(tick_race);

    return (
        <>
            <div>
                <button onClick={tick}>Seconds is :{race.tick}</button>
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

const Race = ({ tick, ggs }) => {
    return (
        <div>
            <div>Race {tick}</div>
            <div className="tracks">
                {ggs.map((gg: GGRacer) => (
                    <Track gg={gg} />
                ))}
            </div>
        </div>
    );
};

export default App;
