import React, { useMemo } from 'react';
import { useActiveWalletAccount, useWalletAccountsList } from '@deriv/api';
import useDevice from '../../../hooks/useDevice';
import { CTraderList } from '../CTraderList';
import { MT5PlatformsList } from '../MT5PlatformsList';
import { OtherCFDPlatformsList } from '../OtherCFDPlatformsList';
import CFDPlatformsListEmptyState from './CFDPlatformsListEmptyState';
import './CFDPlatformsList.scss';

const CFDPlatformsList = () => {
    const { data: activeWallet } = useActiveWalletAccount();
    const { data: walletAccountsList } = useWalletAccountsList();
    const { isMobile } = useDevice();

    const fiatAccount = useMemo(
        () => walletAccountsList?.find(account => account.account_type === 'doughflow'),
        [walletAccountsList]
    );

    return (
        <div className='wallets-cfd-list'>
            <section className='wallets-cfd-list__header'>
                {!isMobile && (
                    <div className='wallets-cfd-list__header-title'>
                        <h1>CFDs</h1>
                    </div>
                )}
                <div className='wallets-cfd-list__header-description'>
                    <h1>
                        Trade with leverage and tight spreads for better returns on trades.{' '}
                        <a className='wallets-cfd-list__header-description__link' href='#'>
                            Learn more
                        </a>
                    </h1>
                </div>
            </section>
            {!activeWallet?.currency_config?.is_crypto && (
                <div>
                    <MT5PlatformsList />
                    {activeWallet?.is_virtual && <CTraderList />}
                    <OtherCFDPlatformsList />
                </div>
            )}
            {activeWallet?.currency_config?.is_crypto && (
                <CFDPlatformsListEmptyState
                    cryptoCurrency={activeWallet.currency}
                    fiatCurrency={fiatAccount?.wallet_currency_type}
                />
            )}
        </div>
    );
};

export default CFDPlatformsList;
