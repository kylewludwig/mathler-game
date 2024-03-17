export const enum TileStatus {
    INITIAL = 'initial',
    CORRECT = 'correct',
    PRESENT = 'present',
    ABSENT = 'absent'
}

export interface TileState {
    value: string;
    status: TileStatus;
}

export const initialTileState: TileState = {
    value: '',
    status: TileStatus.INITIAL
};