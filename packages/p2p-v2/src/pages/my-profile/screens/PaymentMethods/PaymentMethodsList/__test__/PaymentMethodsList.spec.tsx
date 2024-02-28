import React from 'react';
import { useDevice, useQueryString } from '@/hooks';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PaymentMethodsList from '../PaymentMethodsList';

jest.mock('../PaymentMethodsListContent', () => jest.fn().mockReturnValue(<div>PaymentMethodsListContent</div>));

jest.mock('@/hooks', () => ({
    ...jest.requireActual('@/hooks'),
    useDevice: jest.fn().mockReturnValue({
        isDesktop: false,
        isMobile: false,
        isTablet: false,
    }),
    useQueryString: jest.fn().mockReturnValue({ setQueryString: jest.fn() }),
}));

const mockUseDevice = useDevice as jest.MockedFunction<typeof useDevice>;
const mockUseQueryString = useQueryString as jest.MockedFunction<typeof useQueryString>;

describe('PaymentMethodsList', () => {
    it('should render the component when an empty list of payment methods is provided and ismobile is true', () => {
        mockUseDevice.mockReturnValueOnce({
            isDesktop: false,
            isMobile: true,
            isTablet: false,
        });
        render(
            <PaymentMethodsList
                formState={{}}
                onAdd={jest.fn()}
                onDelete={jest.fn()}
                onEdit={jest.fn()}
                onResetFormState={jest.fn()}
                p2pAdvertiserPaymentMethods={[]}
            />
        );
        expect(screen.queryByText('PaymentMethodsListContent')).not.toBeInTheDocument();
    });
    it('should render the component when an empty list of payment methods is provided and ismobile is false', () => {
        mockUseDevice.mockReturnValueOnce({
            isDesktop: false,
            isMobile: false,
            isTablet: false,
        });
        render(
            <PaymentMethodsList
                formState={{}}
                onAdd={jest.fn()}
                onDelete={jest.fn()}
                onEdit={jest.fn()}
                onResetFormState={jest.fn()}
                p2pAdvertiserPaymentMethods={[]}
            />
        );
        expect(screen.queryByText('PaymentMethodsListContent')).not.toBeInTheDocument();
    });
    it('should render the component when a list of payment methods is provided and ismobile is true', () => {
        mockUseDevice.mockReturnValueOnce({
            isDesktop: false,
            isMobile: true,
            isTablet: false,
        });
        render(
            <PaymentMethodsList
                formState={{}}
                onAdd={jest.fn()}
                onDelete={jest.fn()}
                onEdit={jest.fn()}
                onResetFormState={jest.fn()}
                p2pAdvertiserPaymentMethods={[
                    {
                        display_name: 'test',
                        fields: {},
                        id: '1',
                        is_enabled: 0,
                        method: '',
                        type: 'other',
                        used_by_adverts: null,
                        used_by_orders: null,
                    },
                ]}
            />
        );
        expect(screen.queryByText('PaymentMethodsListContent')).toBeInTheDocument();
    });
    it('should render the component when a list of payment methods is provided and ismobile is false', () => {
        mockUseDevice.mockReturnValueOnce({
            isDesktop: false,
            isMobile: false,
            isTablet: false,
        });
        render(
            <PaymentMethodsList
                formState={{}}
                onAdd={jest.fn()}
                onDelete={jest.fn()}
                onEdit={jest.fn()}
                onResetFormState={jest.fn()}
                p2pAdvertiserPaymentMethods={[
                    {
                        display_name: 'test',
                        fields: {},
                        id: '1',
                        is_enabled: 0,
                        method: '',
                        type: 'other',
                        used_by_adverts: null,
                        used_by_orders: null,
                    },
                ]}
            />
        );
        expect(screen.queryByText('PaymentMethodsListContent')).toBeInTheDocument();
    });
    it('should handle onclick for the back button for mobile', () => {
        const { setQueryString: mockSetQueryString } = mockUseQueryString();
        mockUseDevice.mockReturnValueOnce({
            isDesktop: false,
            isMobile: true,
            isTablet: false,
        });
        render(
            <PaymentMethodsList
                formState={{}}
                onAdd={jest.fn()}
                onDelete={jest.fn()}
                onEdit={jest.fn()}
                onResetFormState={jest.fn()}
                p2pAdvertiserPaymentMethods={[]}
            />
        );
        const backButton = screen.getByTestId('dt_p2p_v2_mobile_wrapper_button');
        userEvent.click(backButton);
        expect(mockSetQueryString).toHaveBeenCalledWith({ tab: 'default' });
    });
});
