import { observable, action, reaction } from 'mobx';

const CONTRACT_STATUS = [
    'Bot is not running',
    'Attempting to Buy',
    'Buy Succeeded',
    'Bot is stopping',
    'Closing Contract',
    'Contract Closed',
];

export default class TradeAnimationStore {
    constructor(root_store) {
        this.root_store = root_store;
    }

    @observable status_class = ['', '', ''];
    @observable status_title = CONTRACT_STATUS[0];

    @action.bound onMount () {
        reaction(() => this.root_store.flyout.contract_status, () => {
            const { flyout: { contract_status } } = this.root_store;
            const progress_status = contract_status > 2 ? contract_status - 2 : contract_status - 1;

            this.status_title = CONTRACT_STATUS[contract_status];

            const status_class_temp = observable(['', '', '']);
            if (progress_status >= 0 && progress_status < 3) {
                status_class_temp[progress_status] =  'active';
            }

            for (let i = 0; i < progress_status; i++) {
                status_class_temp[i] = 'completed';
            }
            this.status_class = status_class_temp;
        });
    }
}
