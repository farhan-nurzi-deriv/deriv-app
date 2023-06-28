import React from 'react';
import { reaction } from 'mobx';
import { P2POrderInfo } from '@deriv/api-types';
import { Button, DesktopWrapper, Div100vhContainer, InfiniteDataList, Loading, MobileWrapper } from '@deriv/components';
import { TRowRenderer } from '@deriv/components/src/components/data-list/data-list';
import { observer, useStore } from '@deriv/stores';
import { Localize, localize } from 'Components/i18next';
import TableError from 'Components/section-error';
import P2pEmpty from 'Components/p2p-empty';
import { useStores } from 'Stores';
import ExtendedOrderDetails, { createExtendedOrderDetails } from 'Utils/orders';
import OrderTableHeader from './order-table-header';
import OrderTableRow from './order-table-row';

const ContentWrapper = ({ children }: React.PropsWithChildren<unknown>) => {
    return (
        <React.Fragment>
            <MobileWrapper>
                <Div100vhContainer height_offset='21rem'>{children}</Div100vhContainer>
            </MobileWrapper>
            <DesktopWrapper>
                <OrderTableHeader>{children}</OrderTableHeader>
            </DesktopWrapper>
        </React.Fragment>
    );
};

const OrderTableContent = () => {
    const { general_store, order_store } = useStores();
    const { is_active_tab } = general_store;
    const { api_error_message, has_more_items_to_load, is_loading, loadMoreOrders, orders, setIsLoading, setOrders } =
        order_store;
    const {
        client: { loginid },
    } = useStore();

    const orderTableRowRenderer = (row_props: TRowRenderer & { row: ExtendedOrderDetails }) => {
        return <OrderTableRow {...row_props} />;
    };

    React.useEffect(
        () =>
            reaction(
                () => general_store.order_table_type,
                () => {
                    setIsLoading(true);
                    setOrders([]);
                    loadMoreOrders({ startIndex: 0 });
                },
                { fireImmediately: true }
            ),
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    if (is_loading) {
        return <Loading is_fullscreen={false} />;
    }

    if (api_error_message) {
        return <TableError message={api_error_message} size='xs' className='section-error__table' />;
    }

    if (orders.length) {
        const modified_list = orders.map((order: P2POrderInfo) =>
            createExtendedOrderDetails(order, loginid, general_store.server_time)
        );

        if (modified_list.length) {
            return (
                <ContentWrapper>
                    <InfiniteDataList
                        data_list_className='orders__data-list'
                        has_more_items_to_load={has_more_items_to_load}
                        items={modified_list}
                        keyMapperFn={item => item.id}
                        loadMoreRowsFn={loadMoreOrders}
                        rowRenderer={orderTableRowRenderer}
                    />
                </ContentWrapper>
            );
        }
    }

    return (
        <P2pEmpty has_tabs icon='IcNoOrder' title={localize('You have no orders.')}>
            {is_active_tab && (
                <Button primary large className='p2p-empty__button' onClick={() => general_store.handleTabClick(0)}>
                    <Localize i18n_default_text='Buy/Sell' />
                </Button>
            )}
        </P2pEmpty>
    );
};

export default observer(OrderTableContent);
