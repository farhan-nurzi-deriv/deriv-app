import { formatMoney, toMoment, getSymbolDisplayName, getMarketInformation } from '@deriv/shared';
import { ActiveSymbols, ProfitTableResponse } from '@deriv/api-types';

export type TTransaction = NonNullable<NonNullable<ProfitTableResponse['profit_table']>['transactions']>[number];

export const formatProfitTableTransactions = (
    transaction: TTransaction,
    currency: string,
    active_symbols: ActiveSymbols = []
) => {
    const format_string = 'DD MMM YYYY HH:mm:ss';
    const purchase_time = transaction.purchase_time && `${toMoment(+transaction.purchase_time).format(format_string)}`;
    const purchase_time_unix = transaction.purchase_time;
    const sell_time = transaction.sell_time && `${toMoment(+transaction.sell_time).format(format_string)}`;
    const payout = transaction.payout;
    const sell_price = transaction.sell_price;
    const buy_price = transaction.buy_price;
    const profit_loss = formatMoney(currency, sell_price && buy_price ? Number(sell_price - buy_price) : 0, true);
    const display_name = getSymbolDisplayName(
        active_symbols,
        getMarketInformation(transaction.shortcode ?? '').underlying
    );

    return {
        ...transaction,
        ...{
            payout,
            sell_price,
            buy_price,
            profit_loss,
            sell_time,
            purchase_time,
            display_name,
            purchase_time_unix,
        },
    };
};
