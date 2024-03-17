import { ToastMessage } from "./toast-message";
import { render } from "@testing-library/react";
import {screen} from '@testing-library/dom'

describe("ToastMessage", () => {
    it("renders without crashing", () => {
        // Given

        // When
        render(<ToastMessage message={undefined} timeout={0} onTimeout={() => {}} />);

        // Then

    });

    it("renders message", () => {
       // Given
       
       // When
       const { getByText } = render(<ToastMessage message={'test'} timeout={0} onTimeout={() => {}} />);
       const toastMessage = getByText('test');

       // Then
       expect(toastMessage).toBeDefined();
    });

    it("removes message after timeout", () => {
       // Given
       vi.useFakeTimers();

       let message: string | undefined = 'test';
       const onTimeout = () => {
           message = undefined;
       }
       const { container, rerender } = render(<ToastMessage message={message} timeout={1} onTimeout={onTimeout} />);
       const initialToastMessage = container.getElementsByClassName('toast-message')[0]
       expect(initialToastMessage).not.toBeUndefined();

       // When
       vi.advanceTimersByTime(1000);
       rerender(<ToastMessage message={message} timeout={1} onTimeout={onTimeout} />);
       
       // Then
       const finalToastMessage = container.getElementsByClassName('toast-message')[0]
       expect(finalToastMessage).toBeUndefined();
    })
})