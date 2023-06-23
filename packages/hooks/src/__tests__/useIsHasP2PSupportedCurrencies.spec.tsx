import * as React from 'react';
import { APIProvider, useFetch } from '@deriv/api';
import { StoreProvider, mockStore } from '@deriv/stores';
import { renderHook } from '@testing-library/react-hooks';
import useIsHasP2PSupportedCurrencies from '../useIsHasP2PSupportedCurrencies';

jest.mock('@deriv/api', () => ({
    ...jest.requireActual('@deriv/api'),
    useFetch: jest.fn(),
}));

const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch<'website_status'>>;

describe('useIsHasP2PSupportedCurrencies', () => {
    test('should return false if supported currencies is not in the account info', () => {
        const mock = mockStore({
            client: {
                active_accounts: [{ currency: 'EUR', is_virtual: 0 }],
            },
        });

        // @ts-expect-error need to come up with a way to mock the return type of useFetch
        mockUseFetch.mockReturnValue({ data: { website_status: { p2p_config: { supported_currencies: ['usd'] } } } });

        const wrapper = ({ children }: { children: JSX.Element }) => (
            <APIProvider>
                <StoreProvider store={mock}>{children}</StoreProvider>
            </APIProvider>
        );

        const { result } = renderHook(() => useIsHasP2PSupportedCurrencies(), { wrapper });

        expect(result.current.data).toBe(false);
    });

    test('should return true if supported currencies is in the account info', () => {
        const mock = mockStore({
            client: {
                active_accounts: [{ currency: 'USD', is_virtual: 0 }],
            },
        });

        // @ts-expect-error need to come up with a way to mock the return type of useFetch
        mockUseFetch.mockReturnValue({ data: { website_status: { p2p_config: { supported_currencies: ['usd'] } } } });

        const wrapper = ({ children }: { children: JSX.Element }) => (
            <APIProvider>
                <StoreProvider store={mock}>{children}</StoreProvider>
            </APIProvider>
        );

        const { result } = renderHook(() => useIsHasP2PSupportedCurrencies(), { wrapper });

        expect(result.current.data).toBe(true);
    });

    test('should return false if there is no real account', () => {
        const mock = mockStore({
            client: {
                active_accounts: [{ currency: 'USD', is_virtual: 1 }],
            },
        });

        // @ts-expect-error need to come up with a way to mock the return type of useFetch
        mockUseFetch.mockReturnValue({ data: { website_status: { p2p_config: { supported_currencies: ['usd'] } } } });

        const wrapper = ({ children }: { children: JSX.Element }) => (
            <APIProvider>
                <StoreProvider store={mock}>{children}</StoreProvider>
            </APIProvider>
        );

        const { result } = renderHook(() => useIsHasP2PSupportedCurrencies(), { wrapper });

        expect(result.current.data).toBe(false);
    });
});
