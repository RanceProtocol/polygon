import { multicall2Address } from "../constants/addresses";
import { Interface } from "@ethersproject/abi";
import { Multicall2__factory } from "../typechain";
import { CallOverrides } from "ethers";

export interface Call {
    address: string; // Address of the contract
    name: string; // Function name on the contract (example: balanceOf)
    params?: any[]; // Function params
}

export interface MulticallOptions extends CallOverrides {
    requireSuccess?: boolean;
}

const useMulticall = (provider: any) => {
    const multicallContract = Multicall2__factory.connect(
        multicall2Address,
        provider
    );

    const multicall = async <T = any>(
        abi: any[],
        calls: Call[]
    ): Promise<T> => {
        const itf = new Interface(abi);

        const calldata = calls.map((call) => ({
            target: call.address.toLowerCase(),
            callData: itf.encodeFunctionData(call.name, call.params),
        }));
        const { returnData } = await multicallContract.aggregate(calldata);

        const res = returnData.map((call, i) =>
            itf.decodeFunctionResult(calls[i].name, call)
        );

        return res as any;
    };
    const multicall2 = async <T = any>(
        abi: any[],
        calls: Call[],
        options?: MulticallOptions
    ): Promise<T> => {
        const { requireSuccess = true, ...overrides } = options || {};
        const itf = new Interface(abi);

        const calldata = calls.map((call) => ({
            target: call.address.toLowerCase(),
            callData: itf.encodeFunctionData(call.name, call.params),
        }));

        const returnData = await multicallContract.tryAggregate(
            requireSuccess,
            calldata,
            overrides
        );
        const res = returnData.map((call, i) => {
            const [result, data] = call;
            return result
                ? itf.decodeFunctionResult(calls[i].name, data)
                : null;
        });

        return res as any;
    };

    return { multicall, multicall2 };
};

export default useMulticall;
