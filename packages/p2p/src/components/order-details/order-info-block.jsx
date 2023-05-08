import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@deriv/components';
import classNames from 'classnames';
import './order-info-block.scss';

const OrderInfoBlock = ({ className, label, value, size = 'xxs', weight = 'normal' }) => (
    <div className={classNames('order-info-block', className)}>
        <Text as='p' color='prominent' size={size} weight={weight}>
            {label}
        </Text>
        <div className='order-info-block-value'>{value}</div>
    </div>
);

OrderInfoBlock.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.string,
    value: PropTypes.any,
    weight: PropTypes.string,
};

export default OrderInfoBlock;
