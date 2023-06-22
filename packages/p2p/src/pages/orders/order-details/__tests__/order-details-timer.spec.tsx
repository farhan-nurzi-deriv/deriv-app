import React from 'react';
import { render, screen } from '@testing-library/react';
import ServerTime from 'Utils/server-time';
import OrderDetailsTimer from '../order-details-timer';

const mock_order_info = {
    order_expiry_milliseconds: 0,
    should_show_order_timer: true,
};

jest.mock('Stores', () => ({
    ...jest.requireActual('Stores'),
    useStores: jest.fn(() => ({
        order_store: {
            order_information: { ...mock_order_info },
        },
    })),
}));

jest.mock('Utils/server-time', () => ({
    getDistanceToServerTime: jest.fn().mockReturnValue(8),
}));

jest.mock('Utils/date-time', () => ({
    secondsToTimer: jest.fn().mockReturnValue(17),
}));

describe('<OrderDetailsTimer/>', () => {
    it('should render the component when show_order_timer status is set', () => {
        render(<OrderDetailsTimer />);

        expect(screen.getByText('17')).toBeInTheDocument();
    });

    it('should not render the component when show_order_timer set to false', () => {
        mock_order_info.should_show_order_timer = false;
        render(<OrderDetailsTimer />);

        expect(screen.queryByText('Time left')).not.toBeInTheDocument();
    });

    it('should invoke clearInterval method when timer expires', () => {
        jest.spyOn(global, 'clearInterval');
        jest.spyOn(React, 'useRef').mockReturnValue({
            current: {
                childMethod: jest.fn(),
            },
        });

        (ServerTime.getDistanceToServerTime as jest.Mock).mockReturnValue(-1);
        render(<OrderDetailsTimer />);

        expect(clearInterval).toHaveBeenCalled();
    });
});
