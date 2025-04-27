export type GGDex = {
    [id: GGMonId]: GGMon;
};

export type GGMon = {
    id: GGMonId;
    acc: number;
    stamina: number;
    magic: number;
};

export type GGMonId = number;

export type GGRacer = {
    gg_id: GGMonId;
    phys: RacePhysics;
    stats: RaceStats;
};
export type RacePhysics = {
    pos: Vec;
    vel: number;
    acc: number;
};

export type RaceStats = {
    mana: number;
    stamina: number;
    magic: number;
};

export enum RaceState {
    UNINIT,
    PRE,
    RACING,
    WINNER,
    POST,
    DONE,
}

export type Race = {
    track: Track;
    ticks: RaceTick[];
};

export type RaceTick = {
    state: RaceState;
    tick: number;
    track: Track;
    ggs: GGRacer[];
};

export type Track = {
    len: number;
};

export type GGLifetime = {
    gg_id: GGMonId;
    races: number;
};

export type GGAlmanac = {
    [id: GGMonId]: GGLifetime;
};

export type Vec = {
    x: number;
    y: number;
};

export type Fact = {
    //
};
