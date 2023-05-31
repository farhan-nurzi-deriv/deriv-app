import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Icon, Checklist, Text } from '@deriv/components';
import { isDesktop, isMobile, routes } from '@deriv/shared';
import { observer } from 'mobx-react-lite';
import { useStores } from 'Stores';
import Dp2pBlocked from 'Components/dp2p-blocked';
import { Localize } from 'Components/i18next';
import { useModalManagerContext } from 'Components/modal-manager/modal-manager-context';
import './verification.scss';

const VerificationWrapper = ({ should_wrap, children }) => {
    if (should_wrap) {
        return (
            <div
                className={classNames('verification__wrapper', {
                    'verification__wrapper--mobile': isMobile(),
                })}
                data-testid='dt_verification_wrapper'
            >
                {children}
            </div>
        );
    }

    return children;
};

const Verification = ({ should_wrap }) => {
    const { general_store } = useStores();
    const { showModal } = useModalManagerContext();

    if (!general_store.is_advertiser && general_store.poi_status === 'verified' && general_store.nickname) {
        return <Dp2pBlocked />;
    }

    const checklist_items = [
        {
            content: general_store.nickname || <Localize i18n_default_text='Choose your nickname' />,
            status: general_store.nickname ? 'done' : 'action',
            onClick: general_store.nickname
                ? () => {}
                : () => {
                      if (isDesktop()) showModal({ key: 'NicknameModal' });
                      general_store.toggleNicknamePopup();
                  },
        },
        {
            content: general_store.poiStatusText(general_store.poi_status),
            is_disabled: general_store.poi_status !== 'verified' && !general_store.nickname,
            status: general_store.poi_status === 'verified' ? 'done' : 'action',
            onClick:
                general_store.poi_status === 'verified'
                    ? () => {}
                    : () => {
                          window.location.href = `${routes.proof_of_identity}?ext_platform_url=${routes.cashier_p2p}`;
                      },
        },
    ];

    return (
        <VerificationWrapper should_wrap={should_wrap}>
            <div className='verification' data-testid='dt_verification_container'>
                <Icon icon='IcCashierSendEmail' className='verification__icon' size={102} />
                <div className='verification__text'>
                    <Text className='verification__text-title' weight='bold' align='center'>
                        <Localize i18n_default_text='Please register with us!' />
                    </Text>
                    <div className='verification__text-description'>
                        <Text as='p' size='xs' line_height='s' align='center'>
                            <Localize i18n_default_text='To use Deriv P2P, you need to choose a display name (a nickname) and verify your identity.' />
                        </Text>
                    </div>
                </div>
                <Checklist className='verification__checklist' items={checklist_items} />
            </div>
        </VerificationWrapper>
    );
};

Verification.propTypes = {
    should_wrap: PropTypes.bool,
};

export default observer(Verification);
