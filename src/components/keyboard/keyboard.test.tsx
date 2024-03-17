import { render, screen, fireEvent } from '@testing-library/react';
import { Keyboard } from './keyboard';

describe('Keyboard', () => {
  it('renders without crashing', () => {
    // Given
    const onKeyPress = vi.fn();

    // When
    render(<Keyboard onKeyPress={onKeyPress} />);

    // Then
    
  });

  it('renders 16 keys', () => {
    // Given
    const onKeyPress = vi.fn();
    render(<Keyboard onKeyPress={onKeyPress}/>);

    // When
    const keys = screen.getAllByRole('button');

    // Then
    expect(keys).toHaveLength(16);
  });

  it('fires event on key click', async () => {
    // Given
    const onKeyPress = vi.fn();
    render(<Keyboard onKeyPress={onKeyPress} />);

    // When
    const keys = screen.getAllByRole('button');
    fireEvent.click(keys[0]);

    // Then
    expect(onKeyPress).toHaveBeenCalledOnce();
  });

  it('renders 2 rows', () => {
    // Given
    const onKeyPress = vi.fn();
    const { container } = render(<Keyboard onKeyPress={onKeyPress} />);

    // When
    const rows = container.getElementsByClassName('keyboard__row');

    // Then
    expect(rows).toHaveLength(2);
  });
});