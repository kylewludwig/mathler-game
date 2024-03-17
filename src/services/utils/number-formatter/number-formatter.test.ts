import { NumberFormatter } from './number-formatter';

describe('number formatter', () => {
    it('formats 1 to ordinal 1st', () => {
        // Given
        const number = 1;

        // When
        const result = NumberFormatter.numberToOrdinal(number);

        // Then
        expect(result).toBe('1st');
    })

    it('formats 2 to ordinal 2nd', () => {
        // Given
        const number = 2;

        // When
        const result = NumberFormatter.numberToOrdinal(number);

        // Then
        expect(result).toBe('2nd');
    })

    it('formats 3 to ordinal 3rd', () => {
        // Given
        const number = 3;

        // When
        const result = NumberFormatter.numberToOrdinal(number);

        // Then
        expect(result).toBe('3rd');
    })

    it('formats 4 to ordinal 4th', () => {
        // Given
        const number = 4;

        // When
        const result = NumberFormatter.numberToOrdinal(number);

        // Then
        expect(result).toBe('4th');
    })

    it('formats 11 to ordinal 11th', () => {
        // Given
        const number = 11;

        // When
        const result = NumberFormatter.numberToOrdinal(number);

        // Then
        expect(result).toBe('11th');
    })

    it('formats 12 to ordinal 12th', () => {
        // Given
        const number = 12;

        // When
        const result = NumberFormatter.numberToOrdinal(number);

        // Then
        expect(result).toBe('12th');
    })

    it('formats 13 to ordinal 13th', () => {
        // Given
        const number = 13;

        // When
        const result = NumberFormatter.numberToOrdinal(number);

        // Then
        expect(result).toBe('13th');
    })

    it('formats 14 to ordinal 14th', () => {
        // Given
        const number = 14;

        // When
        const result = NumberFormatter.numberToOrdinal(number);

        // Then
        expect(result).toBe('14th');
    })

    it('formats 21 to ordinal 21st', () => {
        // Given
        const number = 21;

        // When
        const result = NumberFormatter.numberToOrdinal(number);

        // Then
        expect(result).toBe('21st');
    })

    it('formats 22 to ordinal 22nd', () => {
        // Given
        const number = 22;

        // When
        const result = NumberFormatter.numberToOrdinal(number);

        // Then
        expect(result).toBe('22nd');
    })

    it('formats 23rd to ordinal 23rd', () => {
        // Given
        const number = 23;

        // When
        const result = NumberFormatter.numberToOrdinal(number);

        // Then
        expect(result).toBe('23rd');
    })

    it('formats 24th to ordinal 24th', () => {
        // Given
        const number = 24;

        // When
        const result = NumberFormatter.numberToOrdinal(number);

        // Then
        expect(result).toBe('24th');
    })
})