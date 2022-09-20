import { IReferralReward } from "../../domain/entities";
import IReferralStore from "../../domain/referralStore";
import * as actionTypes from "./actionTypes";

const initialState: IReferralStore = {
    loadingReferralRecord: false,
    loadingReferralCode: false,
    referralRecord: [],
    referralCode: null,
};

export const referralReducer = (
    state = initialState,
    action: { type: string; payload?: any }
): IReferralStore => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.GET__REFERRAL__CODE:
            return { ...state, loadingReferralCode: true };
        case actionTypes.GET__REFERRAL__CODE__SUCCESS:
            return {
                ...state,
                referralCode: payload.referralCode,
                loadingReferralCode: false,
            };
        case actionTypes.GET__REFERRAL__CODE__FAILED:
            return {
                ...state,
                loadingReferralCode: false,
            };
        case actionTypes.GET__REFERRAL__RECORD:
            return { ...state, loadingReferralRecord: true };
        case actionTypes.GET__REFERRAL__RECORD__SUCCESS:
            return {
                ...state,
                referralRecord: payload.referralRecord,
                loadingReferralRecord: false,
            };
        case actionTypes.GET__REFERRAL__RECORD__FAILED:
            return { ...state, loadingReferralRecord: false };

        default:
            return state;
    }
};
