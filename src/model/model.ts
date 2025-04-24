export type Race = {
    tick: number;
    track: Track;
    ggs: GGRacer[];
};

export type Track = {
    len: number;
};

export type GGMonId = number;

export type GGDex = GGMon[];

export type GGMon = {
    id: GGMonId;
    stamina: number;
};

export type GGRacer = {
    gg: GGMon;
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
