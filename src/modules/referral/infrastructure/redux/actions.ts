import { Dispatch } from "react";
import { toast } from "react-toastify";
import CustomToast, { STATUS, TYPE } from "../../../../Components/CustomToast";
import { RanceProtocol } from "../../../../typechain";
import { generateReferralLink as generateReferralLinkUsecase } from "../../usecases/generateReferralLink";
import { getReferralLink as getReferralLinkUsecase } from "../../usecases/getReferralLink";
import { IApiClientWrapper } from "../interfaces/apiClientWrapper";
import * as actionTypes from "./actionTypes";

export const getReferralLink =
    (address: string, apiClient: IApiClientWrapper) =>
    async (
        dispatch: Dispatch<{ type: string; payload?: any }>
    ): Promise<void> => {
        dispatch({
            type: actionTypes.GET__REFERRAL__LINK,
        });

        try {
            // call the usecase that will return the ref code here and dispatch GET__REFERRAL__LINK__SUCCESS with the payload
            const link = await getReferralLinkUsecase(address, apiClient);
            dispatch({
                type: actionTypes.GET__REFERRAL__LINK__SUCCESS,
                payload: { referralLink: link },
            });
        } catch (error: any) {
            if (error.response?.status === 404)
                return dispatch({
                    type: actionTypes.GET__REFERRAL__LINK__SUCCESS,
                    payload: { referralLink: null },
                });
            dispatch({
                type: actionTypes.GET__REFERRAL__LINK__FAILED,
            });
            const toastBody = CustomToast({
                message: error.message,
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
                apiClient
            );
            dispatch({
                type: actionTypes.GET__REFERRAL__LINK__SUCCESS,
                payload: { referralLink: link },
            });
            const toastBody = CustomToast({
                message: "Referral Link generated",
                status: STATUS.SUCCESSFULL,
                type: TYPE.SUCCESSFULL,
            });
            toast(toastBody);
        } catch (error: any) {
            dispatch({
                type: actionTypes.GENERATE__REFERRAL__LINK__FAILED,
            });
            const toastBody = CustomToast({
                message:
                    error.message ||
                    "Error generating your refferal link! Please try again",
                status: STATUS.ERROR,
                type: TYPE.ERROR,
            });
            toast(toastBody);
        }
    };
