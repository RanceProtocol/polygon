import { IReferralReward } from "../../domain/entities";
import IReferralStore from "../../domain/interfaces/referralStore";
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
        case actionTypes.GENERATING__REFERRAL__LINK:
            return { ...state, loadingReferralCode: true };
        case actionTypes.GENERATE__REFERRAL__LINK__SUCCESS:
            return {
                ...state,
                loadingReferralCode: false,
                referralCode: payload.referralCode,
            };
        case actionTypes.GENERATE__REFERRAL__LINK__FAILED:
            return { ...state, loadingReferralCode: false };

        default:
            return state;
    }
};
