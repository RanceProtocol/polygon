import { Dispatch } from "react";
import { toast } from "react-toastify";
import CustomToast, { STATUS, TYPE } from "../../../../Components/CustomToast";
import { RanceProtocol } from "../../../../typechain";
import { generateReferralLink as generateReferralLinkUsecase } from "../../usecases/generateReferralLink";
import { IApiClientWrapper } from "../interfaces/apiClientWrapper";
import * as actionTypes from "./actionTypes";

export const getReferralCode =
    (address: string | null | undefined, apiClient: IApiClientWrapper) =>
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

export const genarateReferralLink =
    (
        address: string,
        message: string,
        sign: (message: string) => Promise<string>,
        apiClient: IApiClientWrapper
    ) =>
    async (
        dispatch: Dispatch<{ type: string; payload?: any }>
    ): Promise<void> => {
        dispatch({
            type: actionTypes.GENERATING__REFERRAL__LINK,
        });

        try {
            const link = await generateReferralLinkUsecase(
                address,
                message,
                sign,
                apiClient.post
            );
            // dispatch here
        } catch (error) {
            dispatch({
                type: actionTypes.GENERATE__REFERRAL__LINK__FAILED,
            });
            const toastBody = CustomToast({
                message:
                    "Error generating your refferal link! Please try again",
                status: STATUS.ERROR,
                type: TYPE.ERROR,
            });
            toast(toastBody);
        }
    };
