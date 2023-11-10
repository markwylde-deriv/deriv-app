import mock_account_security from './account_security';
import mock_authorize, { DEFAULT_ACCOUNTS } from './authorize';
import mock_balance_all from './balance_all';
import mock_balance_one from './balance_one';
import mock_get_account_status from './get_account_status';
import mock_get_financial_assessment from './get_financial_assessment';
import mock_get_limits from './get_limits';
import mock_get_self_exclusion from './get_self_exclusion';
import mock_get_settings from './get_settings';
import mock_landing_company from './landing_company';
import mock_mt5_login_list from './mt5_login_list';
import mock_p2p_advertiser_info from './p2p_advertiser_info';
import mock_p2p_order_list from './p2p_order_list';
import mock_paymentagent_list from './paymentagent_list';
import mock_platform_dxtrade from './platform_dxtrade';
import mock_platform_mt5 from './platform_mt5';
import mock_portfolio from './portfolio';
import mock_statement from './statement';
import mock_trading_platform_accounts from './trading_platform_accounts';
import mock_trading_platform_available_accounts from './trading_platform_available_accounts';
import mock_transaction from './transaction';
import { Context } from 'Utils/mocks/mocks';

const loggedIn = async (context: Context) => {
    mock_account_security(context);
    mock_authorize(context);
    mock_balance_all(context);
    mock_balance_one(context);
    mock_get_account_status(context);
    mock_get_financial_assessment(context);
    mock_get_limits(context);
    mock_get_self_exclusion(context);
    mock_get_settings(context);
    mock_landing_company(context);
    mock_mt5_login_list(context);
    mock_p2p_advertiser_info(context);
    mock_p2p_order_list(context);
    mock_paymentagent_list(context);
    mock_platform_dxtrade(context);
    mock_platform_mt5(context);
    mock_portfolio(context);
    mock_statement(context);
    mock_trading_platform_accounts(context);
    mock_trading_platform_available_accounts(context);
    mock_transaction(context);
};

export default loggedIn;

