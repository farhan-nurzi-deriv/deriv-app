import React from 'react';
import useDevice from '../../hooks/useDevice';
import AlertAnnounce from '../../public/images/alert-annouce.svg';
import AlertDanger from '../../public/images/alert-danger.svg';
import AlertInfo from '../../public/images/alert-info.svg';
import Warning from '../../public/images/warning.svg';
import './InlineMessage.scss';

const type_icon_mapper = {
    warning: Warning,
    information: AlertInfo,
    announcement: AlertAnnounce,
    error: AlertDanger,
};

type TProps = {
    type?: keyof typeof type_icon_mapper;
    size?: 'xs' | 'sm' | 'md' | 'lg';
} & RequireAtLeastOne<{ title: React.ReactNode; message: React.ReactNode; children: React.ReactNode }>;

const InlineMessage: React.FC<TProps> = ({ type = 'warning', size = 'xs', title, message, children }) => {
    const { is_mobile } = useDevice();
    const Icon = type_icon_mapper[type];
    const icon_size = size === 'lg' && !is_mobile ? 24 : 16;

    const size_to_font_size_mapper: Record<string, string> = {
        xs: is_mobile ? '0.8rem' : '1rem',
        sm: is_mobile ? '1rem' : '1.2rem',
        md: is_mobile ? '1.2rem' : '1.4rem',
        lg: is_mobile ? '1.4rem' : '1.6rem',
    };

    const font_size = size_to_font_size_mapper[size];

    return (
        <div className={`wallets-inline-message wallets-inline-message__${type} wallets-inline-message__${size} `}>
            <Icon width={icon_size} height={icon_size} className={`wallets-inline-message__icon__${size}`} />
            <p
                style={{ fontSize: font_size }}
                className={`wallets-inline-message__messages inline-message__messages__${size}`}
            >
                {title && <strong>{title}</strong>}
                {message && <span>{message}</span>}
                {children}
            </p>
        </div>
    );
};

export default InlineMessage;
