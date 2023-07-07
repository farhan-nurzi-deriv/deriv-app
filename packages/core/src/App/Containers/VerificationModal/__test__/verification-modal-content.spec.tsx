import React from 'react';
import { render, screen } from '@testing-library/react';
import VerificationModalContent from '../verification-modal-content';

jest.mock('Stores/connect', () => ({
    __esModule: true,
    default: 'mockedDefaultExport',
    connect: () => (Component: React.ReactElement) => Component,
}));

jest.mock('@deriv/account', () => ({
    ...jest.requireActual('@deriv/account'),
    FormSubHeader: () => <div>FormSubHeader</div>,
    ProofOfIdentityContainer: () => <div>ProofOfIdentityContainer</div>,
    ProofOfAddressContainer: () => <div>ProofOfAddressContainer</div>,
}));

const getByTextFn = (text: string, should_be: boolean) => {
    if (should_be) {
        expect(screen.getByText(text)).toBeInTheDocument();
    } else {
        expect(screen.queryByText(text)).not.toBeInTheDocument();
    }
};

const testAllStepsFn = (steps: { body: string }[], step_no: number) => {
    steps.map((step, index) => {
        if (index === step_no) {
            getByTextFn(step.body, true);
        } else {
            getByTextFn(step.body, false);
        }
    });
};

const steps = [
    {
        body: 'ProofOfIdentityContainer',
    },
    {
        body: 'ProofOfAddressContainer',
    },
];

describe('<VerificationModalContent />', () => {
    let modal_root_el: HTMLDivElement;

    beforeAll(() => {
        modal_root_el = document.createElement('div');
        modal_root_el.setAttribute('id', 'modal_root');
        document.body.appendChild(modal_root_el);
    });

    afterAll(() => {
        document.body.removeChild(modal_root_el);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mock_props = {
        addNotificationByKey: jest.fn(),
        fetchResidenceList: jest.fn(),
        fetchStatesList: jest.fn(),
        getChangeableFields: jest.fn(),
        openPendingDialog: jest.fn(),
        refreshNotifications: jest.fn(),
        removeNotificationByKey: jest.fn(),
        removeNotificationMessage: jest.fn(),
        storeProofOfAddress: jest.fn(),
        toggleModal: jest.fn(),
        authentication_status: {
            document_status: 'none',
            identity_status: 'none',
        },
        client_email: 'mock@gmail.com',
        account_settings: {
            account_opening_reason: '',
            address_city: 'MUDGEERABA',
            address_line_1: "29 Ross Street, .'",
            address_line_2: ".'",
            address_postcode: '111',
            address_state: '',
            allow_copiers: 0,
            citizen: '',
            client_tnc_status: 'Version 4.2.0 2020-08-07',
            country: 'Singapore',
            country_code: 'sg',
            date_of_birth: 984960000,
            email: 'mock@gmail.com',
            email_consent: 1,
            feature_flag: {
                wallet: 0,
            },
            first_name: 'mock_name',
            has_secret_answer: 1,
            immutable_fields: ['residence'],
            is_authenticated_payment_agent: 0,
            last_name: 'am',
            non_pep_declaration: 1,
            phone: '+651213456',
            place_of_birth: null,
            preferred_language: 'EN',
            request_professional_status: 0,
            residence: 'Singapore',
            salutation: '',
            tax_identification_number: null,
            tax_residence: null,
            user_hash: '823341c18bfccb391b6bb5d77ab7e6a83991f82669c1ba4e5b01dbd2fd71c7fe',
        },
        is_fully_authenticated: true,
        landing_company: {
            config: {
                tax_details_required: 1,
                tin_format: ['^\\d{15}$'],
                tin_format_description: '999999999999999',
            },
            dxtrade_financial_company: {},
            dxtrade_gaming_company: {},
            financial_company: {},
            gaming_company: {},
            id: 'id',
            minimum_age: 18,
            mt_financial_company: {},
            mt_gaming_company: {},
            name: 'Indonesia',
            virtual_company: 'virtual',
        },
        residence_list: [
            {
                identity: {
                    services: {
                        idv: {
                            documents_supported: {},
                            has_visual_sample: 0,
                            is_country_supported: 0,
                        },
                        onfido: {
                            documents_supported: {
                                passport: {
                                    display_name: 'Passport',
                                },
                            },
                            is_country_supported: 0,
                        },
                    },
                },
                phone_idd: '93',
                text: 'Afghanistan',
                value: 'af',
            },
        ],
        states_list: {
            text: 'Central Singapore',
            value: '01',
        },
    };

    it('should render VerificationModalContent component', () => {
        render(<VerificationModalContent {...mock_props} />);

        expect(screen.getByTestId('dt_verification_modal_body')).toBeInTheDocument();
    });

    it('should render properly for the first step content', () => {
        render(<VerificationModalContent {...mock_props} />);

        testAllStepsFn(steps, 0);
    });

    it('should render properly for the second step content', () => {
        jest.spyOn(React, 'useState').mockReturnValueOnce([1, jest.fn()]);
        render(<VerificationModalContent {...mock_props} />);

        testAllStepsFn(steps, 1);
    });
});
