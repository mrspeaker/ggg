import React from "react";
import { useState } from "react";
import "./App.css";
import type { GGMon, GGRacer, Race, RacePhysics, Track } from "./model.ts";

const mk_racer = (gg: GGMon): GGRacer => {
    return {
        gg,
        phys: {
            pos: { x: 0, y: 0 },
            vel: 0,
            acc: 2,
            stamina: gg.stamina,
        },
    };
};

const mk_init_ggs = (): GGMon[] => {
    const ggs: GGMon[] = [];
    ggs.push({
        id: 1,
        stamina: 10,
    });
    ggs.push({
        id: 2,
        stamina: 9,
    });
    return ggs;
};

const mk_race = (ggs: GGMon[]): Race => {
    return {
        tick: 0,
        track: { len: 1000 },
        ggs,
    };
};

const move_gg = (ggracer: GGRacer): GGRacer => {
    const { gg, phys } = ggracer;
    let { pos, vel, acc, stamina } = phys;

    const newVel = vel + acc * 1 * (stamina > 0 ? 1 : 0);
    stamina = Math.max(0, stamina - 1);

    return {
        gg,
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
    const [race, setRace] = useState(mk_race(mk_init_ggs().map(mk_racer)));
    const gg = race.ggs;
    const tick = race.tick;

    const tick_one = () => setRace(tick_race);

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
                {ggs.map((gg: GGMon) => (
                    <div key={gg.id} className="track">
                        <span
                            className="gg"
                            style={{ left: gg.phys.pos.x + "px" }}
                        >
                            {gg.id}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
