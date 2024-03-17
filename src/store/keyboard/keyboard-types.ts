export interface KeyboardKey {
    key: string;
    value: string;
    type: KeyboardKeyType;
}

export enum KeyboardKeyType {
    NUMERIC = 'NUMERIC',
    OPERATOR = 'OPERATOR',
    CONTROL = 'CONTROL',
}

export const keyboardNumericKeys: KeyboardKey[] = [
    { key: "0", value: "0", type: KeyboardKeyType.NUMERIC },
    { key: "1", value: "1", type: KeyboardKeyType.NUMERIC },
    { key: "2", value: "2", type: KeyboardKeyType.NUMERIC },
    { key: "3", value: "3", type: KeyboardKeyType.NUMERIC },
    { key: "4", value: "4", type: KeyboardKeyType.NUMERIC },
    { key: "5", value: "5", type: KeyboardKeyType.NUMERIC },
    { key: "6", value: "6", type: KeyboardKeyType.NUMERIC },
    { key: "7", value: "7", type: KeyboardKeyType.NUMERIC },
    { key: "8", value: "8", type: KeyboardKeyType.NUMERIC },
    { key: "9", value: "9", type: KeyboardKeyType.NUMERIC },
];

export const keyboardOperatorKeys: KeyboardKey[] = [
    { key: "+", value: "+", type: KeyboardKeyType.OPERATOR },
    { key: "-", value: "-", type: KeyboardKeyType.OPERATOR },
    { key: "×", value: "*", type: KeyboardKeyType.OPERATOR },
    { key: "÷", value: "/", type: KeyboardKeyType.OPERATOR },
];

export const keyboardControlKeys: KeyboardKey[] = [
    { key: "Enter", value: "Enter", type: KeyboardKeyType.CONTROL },
    { key: "Backspace", value: "Backspace", type: KeyboardKeyType.CONTROL },
];
