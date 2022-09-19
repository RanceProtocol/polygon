import { Dispatch } from "react";
import { toast } from "react-toastify";
import CustomToast, { STATUS, TYPE } from "../../../../Components/CustomToast";
import { RanceProtocol } from "../../../../typechain";
import * as actionTypes from "./actionTypes";

export const getReferralCode =
    (address: string) =>
    async (
        dispatch: Dispatch<{ type: string; payload?: any }>
    ): Promise<void> => {
        dispatch({
            type: actionTypes.GET__REFERRAL__CODE,
        });

        try {
            // call the usecase that will return the ref code here and dispatch GET__REFERRAL__CODE__SUCCESS with the payload
        } catch (error) {
            dispatch({
                type: actionTypes.GET__REFERRAL__CODE__FAILED,
            });
            const toastBody = CustomToast({
                message:
                    "Error getting user referral code! Please reload the page",
                status: STATUS.ERROR,
                type: TYPE.ERROR,
            });
            toast(toastBody);
        }
    };

export const getReferralRecord =
    (contract: RanceProtocol, userAddress: string | null | undefined) =>
    async (
        dispatch: Dispatch<{ type: string; payload?: any }>
    ): Promise<void> => {
        dispatch({
            type: actionTypes.GET__REFERRAL__RECORD,
        });

        try {
            // call the usecase that will return the referral record here and dispatch GET__REFERRAL__RECORD__SUCCESS with the payload
        } catch (error) {
            dispatch({
                type: actionTypes.GET__REFERRAL__RECORD__FAILED,
            });
            const toastBody = CustomToast({
                message:
                    "Error getting user referral record! Please reload the page",
                status: STATUS.ERROR,
                type: TYPE.ERROR,
            });
            toast(toastBody);
        }
    };
