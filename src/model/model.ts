export type GGDex = {
    [id: GGMonId]: GGMon;
};

export type GGMon = {
    id: GGMonId;
    acc: number;
    stamina: number;
};

export type GGMonId = number;

export type GGRacer = {
    gg_id: GGMonId;
    phys: RacePhysics;
};

export type RacePhysics = {
    pos: Vec;
    vel: number;
    acc: number;
    stamina: number;
};

export type Race = {
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
