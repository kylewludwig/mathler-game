import { render } from '@testing-library/react';
import App from './app';
import { StoreProvider } from '../../store/store';

describe('App', () => {
    it('renders without crashing', () => {
        // Given

        // When
        render(
            <StoreProvider>
                <App />
            </StoreProvider>
        );

        // Then

    });
})