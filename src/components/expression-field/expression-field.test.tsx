import { render, screen } from '@testing-library/react';
import { ExpressionField } from './expression-field';
import { StoreProvider } from '../../store/store';

describe('ExpressionField', () => {
    it('renders without crashing', () => {
        // Given

        // When
        render(
            <StoreProvider>
                <ExpressionField isActive={true} rowIndex={0} />
            </StoreProvider>
        );

        // Then

    });
    
    it('renders 5 input tiles', () => {
        // Given
        render(
            <StoreProvider>
                <ExpressionField isActive={true} rowIndex={0} />
            </StoreProvider>
        );
        const inputs = screen.getAllByTestId('tile');

        // When

        // Then
        expect(inputs.length).toBe(5);
    });
});
