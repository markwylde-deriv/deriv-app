import React, { useEffect, useState } from 'react';
import { useActiveWalletAccount, useAuthorize } from '@deriv/api-v2';
import type { TSocketError } from '@deriv/api-v2/types';
import { Loader } from '../../../../components';
import { isServerError } from '../../../../utils/utils';
import { WithdrawalCryptoModule, WithdrawalFiatModule, WithdrawalVerificationModule } from '../../modules';
import { WithdrawalErrorScreen, WithdrawalNoBalance } from '../../screens';

const WalletWithdrawal = () => {
    const { switchAccount } = useAuthorize();
    const { data: activeWallet } = useActiveWalletAccount();
    const [verificationCode, setVerificationCode] = useState('');
    const [resendEmail, setResendEmail] = useState(false);
    const [error, setError] = useState<TSocketError<'cashier'>['error'] | undefined>();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const loginidQueryParam = queryParams.get('loginid');
        const verificationQueryParam = queryParams.get('verification');

        // if loginid query param doesn't match active wallet's loginid on mount, initiate account switching
        if (loginidQueryParam && loginidQueryParam !== activeWallet?.loginid) {
            switchAccount(loginidQueryParam);
            return;
        }

        // given that loginid query param matches active wallet's loginid on mount, clear query params and proceed
        if (verificationQueryParam) {
            setVerificationCode(verificationQueryParam);

            const url = new URL(window.location.href);
            url.searchParams.delete('loginid');
            url.searchParams.delete('verification');
            window.history.replaceState({}, document.title, url.toString());
        }
    }, [activeWallet?.loginid, switchAccount]);

    const isCrypto = activeWallet?.currency_config?.is_crypto;

    const onCloseHandler = () => setVerificationCode('');

    const resetError = () => {
        onCloseHandler();
        setError(undefined);
    };

    if (isServerError(error)) {
        return <WithdrawalErrorScreen error={error} resetError={resetError} setResendEmail={setResendEmail} />;
    }

    if (!activeWallet) return <Loader />;

    if (activeWallet.balance <= 0) return <WithdrawalNoBalance activeWallet={activeWallet} />;

    if (activeWallet?.currency && verificationCode) {
        return isCrypto ? (
            <WithdrawalCryptoModule
                onClose={() => {
                    setVerificationCode('');
                }}
                setError={setError}
                verificationCode={verificationCode}
            />
        ) : (
            <WithdrawalFiatModule setError={setError} verificationCode={verificationCode} />
        );
    }

    return <WithdrawalVerificationModule resendEmail={resendEmail} />;
};

export default WalletWithdrawal;
