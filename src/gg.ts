import type {
    GGDex,
    GGMon,
    GGMonId,
    GGRacer,
    Race,
    RacePhysics,
    RaceStats,
} from "./model/model.ts";
import { RaceState } from "./model/model.ts";

let gguid: GGMonId = 0;
export const mk_init_ggdex = (): GGDex => {
    const dex: GGDex = {};
    const g1 = mk_ggmon(gguid++, 2, 12, 0.8);
    const g2 = mk_ggmon(gguid++, 2.2, 9, 1);
    dex[g1.id] = g1;
    dex[g2.id] = g2;
    return dex;
};
export const dex_to_array = (ggdex: GGDex): GGMon[] => Object.values(ggdex);

const mk_ggmon = (
    id: GGMonId,
    acc: number,
    stamina: number,
    magic: number,
): GGMon => ({
    id,
    acc,
    stamina,
    magic,
});

export const mk_racer = (gg: GGMon): GGRacer => {
    return {
        gg_id: gg.id,
        phys: {
            pos: { x: 0, y: 0 },
            vel: 0,
            acc: gg.acc,
        },
        stats: {
            stamina: gg.stamina,
            mana: 0,
            magic: gg.magic,
        },
    };
};

export const mk_race = (ggs: GGRacer[]): Race => {
    return {
        state: RaceState.RACING,
        tick: 0,
        track: { len: 100 },
        ggs,
    };
};

const update_phys = (phys: RacePhysics, stats: RaceStats): RacePhysics => {
    const { pos, vel, acc } = phys;
    const { stamina } = stats;

    const next_vel = vel + acc * 1 * (stamina > 0 ? 1 : 0);
    const next_pos = { x: pos.x + next_vel, y: pos.y };
    return {
        ...phys,
        pos: next_pos,
        vel: next_vel,
    };
};

const update_stats = (stats: RaceStats): RaceStats => {
    const { stamina, mana, magic } = stats;
    const next_stamina = Math.max(0, stamina - 1);
    const next_mana = mana + magic;
    return {
        ...stats,
        stamina: next_stamina,
        mana: next_mana,
    };
};

const effect_boost = (stats: RaceStats): RaceStats => {
    return {
        ...stats,
        stamina: stats.stamina + 5,
        mana: stats.mana - 10,
    };
};

const ai = (
    prev_phys: Readonly<RacePhysics>,
    prev_stats: Readonly<RaceStats>,
    new_phys: RacePhysics,
    next_stats: RaceStats,
): string[] => {
    if (next_stats.mana > 10) {
        const next = effect_boost(next_stats);
        // Bzzzt. Mutating
        next_stats.stamina = next.stamina;
        next_stats.mana = next.mana;
        return ["boost"];
    }
    return [];
};

const update_gg = (ggracer: GGRacer): GGRacer => {
    const { gg_id, phys, stats } = ggracer;

    const next_phys = update_phys(phys, stats);
    const next_stats = update_stats(stats);
    const effects = ai(phys, stats, next_phys, next_stats);
    if (effects.length) {
        console.log(effects);
    }

    return {
        gg_id,
        phys: next_phys,
        stats: next_stats,
    };
};

export const tick_race = (race: Race): Race => {
    const { state } = race;
    let ggs = state == RaceState.DONE ? race.ggs : race.ggs.map(update_gg);
    let done = ggs.some((g) => g.phys.pos.x > 1048);

    return {
        ...race,
        state: done ? RaceState.DONE : race.state,
        tick: race.tick++,
        ggs,
    };
};
