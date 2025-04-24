export type Race = {
    tick: number;
    track: Track;
    ggs: GGRacer[];
};

export type Track = {
    len: number;
};

export type GGDex = {
    [id: GGMonId]: GGMon;
};

export type GGMon = {
    id: GGMonId;
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

export type GGLife = {
    gg_id: GGMonId;
    races: number;
};

export type Vec = {
    x: number;
    y: number;
};
