import { IApiClientWrapper } from "../infrastructure/interfaces/apiClientWrapper";

export const getReferrerAddress = async (
    link: string,
    apiClient: IApiClientWrapper
): Promise<any> => {
    const code = link.split("ref=")[0];
    try {
        const response = await apiClient.get(
            `/api/referral/address?code=${code}`
        );
        return response.data.address;
    } catch (error: any) {
        throw error;
    }
};
