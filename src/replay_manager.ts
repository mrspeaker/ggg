import { Race, RaceState } from "./model/model.ts";

export type ReplayManager = {
    replay: ReplayData;
    take_snap: (race: Race) => void;
};

export type ReplayData = Race[];

export type SnapshotData = {
    tick: number;
    state: RaceState;
};

const mk_replay_data = (): ReplayData => {
    return [];
};

export const mk_replay_man = (): ReplayManager => {
    return {
        replay: mk_replay_data(),
        take_snap: function (race: Race) {
            this.replay.push(race);
        },
    };
};
