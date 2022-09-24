export const generateReferralLink = async (
    address: string,
    message: string,
    sign: (message: string) => Promise<string>,
    postClient: (url: string, configs: object) => Promise<any>
): Promise<any> => {
    try {
        const signature = await sign(message);
        const response = await postClient("/api/code/create", {
            data: JSON.stringify({
                message,
                signature,
                address,
            }),
        });
        console.log("generate link response: ", response);

        return response.data;
    } catch (error: any) {
        console.log("generate lik error: ", error);

        throw new Error(error.message);
    }
};
