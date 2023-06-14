import React from 'react';
import { RadioGroup } from '@deriv/components';
import { isMobile } from '@deriv/shared';
import { localize } from 'Components/i18next';
import './order-details-complain-modal-radio-group.scss';

type TOrderDetailsComplainModalRadioGroupProps = {
    dispute_reason: string;
    is_buy_order_for_user: boolean;
    onCheckboxChange: (reason: string) => void;
};

const OrderDetailsComplainModalRadioGroup = ({
    dispute_reason,
    onCheckboxChange,
    is_buy_order_for_user,
}: TOrderDetailsComplainModalRadioGroupProps) => (
    <RadioGroup
        className='order-details-complain-modal-radio-group'
        name='reason'
        onToggle={event => onCheckboxChange(event.target.value)}
        selected={dispute_reason}
        required
        should_wrap_items={isMobile()}
    >
        <RadioGroup.Item
            value={is_buy_order_for_user ? 'seller_not_released' : 'buyer_not_paid'}
            label={
                is_buy_order_for_user
                    ? localize('I’ve made full payment, but the seller hasn’t released the funds.')
                    : localize('I’ve not received any payment.')
            }
        />
        <RadioGroup.Item
            value='buyer_underpaid'
            label={
                is_buy_order_for_user
                    ? localize('I wasn’t able to make full payment.')
                    : localize('I’ve received less than the agreed amount.')
            }
        />
        <RadioGroup.Item
            value='buyer_overpaid'
            label={
                is_buy_order_for_user
                    ? localize('I’ve paid more than the agreed amount.')
                    : localize('I’ve received more than the agreed amount.')
            }
        />
    </RadioGroup>
);

export default OrderDetailsComplainModalRadioGroup;
