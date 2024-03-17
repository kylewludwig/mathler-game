import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Tile } from './tile';
import { TileStatus, initialTileState } from '../../store/tile/tile-types';

describe('Tile', () => {
    it('renders without crashing', () => {
        // Given

        // When
        render(<Tile index={0} tileState={initialTileState} />);

        // Then

    });

    it('renders values from props', () => {
        // Given
        const tileState = {
            value: '1',
            status: TileStatus.INITIAL
        };
        
        // When
        render(
            <Tile index={0} tileState={tileState} />
        );

        // Then
        expect(screen.getByText('1')).toBeDefined();
    })
});
