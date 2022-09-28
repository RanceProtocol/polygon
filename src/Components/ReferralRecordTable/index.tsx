import { FC, useMemo } from "react";
import styles from "./styles.module.css";
import {
    TableInstance,
    usePagination,
    UsePaginationInstanceProps,
    UsePaginationState,
    useTable,
    Column,
} from "react-table";
import {
    MdOutlineLastPage,
    MdOutlineFirstPage,
    MdNavigateNext,
    MdNavigateBefore,
} from "react-icons/md";
import { IReferralReward } from "../../modules/referral/domain/entities";
import { utils } from "ethers";
import clsx from "clsx";
import { shortenAddress, truncateString } from "../../utils/helpers";
import CustomToast, { STATUS, TYPE } from "../CustomToast";
import { toast } from "react-toastify";

interface IProp {
    data: IReferralReward[];
    claimReferralReward: ({
        referralRewardIds,
        callbacks,
    }: any) => Promise<void>;
}

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
    UsePaginationInstanceProps<T> & {
        state: UsePaginationState<T>;
    };

const ReferralRecordTable: FC<IProp> = ({ data, claimReferralReward }) => {
    // const data = useMemo(() => referralRecords, []);
    const recordData = useMemo(() => (data ? data : []), [data]);
    const columns: Array<Column<IReferralReward>> = useMemo(
        () => [
            {
                Header: "DATE",
                accessor: "date",
            },
            {
                Header: "ADDRESS",
                accessor: "user",
            },
            {
                Header: "REWARD",
                accessor: "rewardAmount",
            },
            {
                Header: "STATUS",
                accessor: "claimed",
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        { columns, data: recordData },
        usePagination
    ) as TableInstanceWithHooks<IReferralReward>;

    const handleWithdrawReward = async (referralRewardIds: string[]) => {
        if (referralRewardIds.length === 0) return;

        let pendingToastId: number | string = "";
        const callbacks = {
            sent: () => {
                const toastBody = CustomToast({
                    message: `Withdrawing referral reward`,
                    status: STATUS.PENDING,
                    type: TYPE.TRANSACTION,
                });
                pendingToastId = toast(toastBody, { autoClose: false });
            },
            successfull: async () => {
                const toastBody = CustomToast({
                    message: `Withdrawal reward successfully withdrawn`,
                    status: STATUS.SUCCESSFULL,
                    type: TYPE.TRANSACTION,
                });
                toast.dismiss(pendingToastId);
                toast(toastBody);
            },
            failed: (errorMessage?: string) => {
                const toastBody = CustomToast({
                    message: errorMessage
                        ? truncateString(errorMessage, 100)
                        : "Referral reward withdrawal failed",
                    status: STATUS.ERROR,
                    type: TYPE.TRANSACTION,
                });
                toast.dismiss(pendingToastId);
                toast(toastBody);
            },
        };

        await claimReferralReward({
            referralRewardIds,
            callbacks,
        });
    };

    return (
        <div className={styles.root}>
            <div className={styles.table__container}>
                <table {...getTableProps()} className={styles.table}>
                    <thead className={styles.table__head__container}>
                        {headerGroups.map((headerGroup) => (
                            // eslint-disable-next-line react/jsx-key
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((col) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <th
                                        {...col.getHeaderProps()}
                                        className={styles.table__head}
                                    >
                                        {col.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody
                        {...getTableBodyProps()}
                        className={styles.table__body__container}
                    >
                        {page.map((row) => {
                            prepareRow(row);

                            return (
                                // eslint-disable-next-line react/jsx-key
                                <tr
                                    {...row.getRowProps()}
                                    className={styles.table__row}
                                >
                                    {row.cells.map((cell) => {
                                        if (cell.column.Header === "REWARD") {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className={
                                                        styles.table__data
                                                    }
                                                >{`${Number(
                                                    utils.formatUnits(
                                                        cell.row.original
                                                            .rewardAmount,
                                                        cell.row.original
                                                            .rewardTokenDecimals
                                                    )
                                                ).toFixed(2)} ${
                                                    cell.row.original
                                                        .rewardTokenSymbol
                                                }`}</td>
                                            );
                                        } else if (
                                            cell.column.Header === "STATUS"
                                        ) {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className={clsx({
                                                        [styles.table__data]:
                                                            true,
                                                        [styles.status__availble]:
                                                            !cell.row.original
                                                                .claimed,
                                                        [styles.status__withdrawn]:
                                                            cell.row.original
                                                                .claimed,
                                                    })}
                                                >
                                                    {cell.row.original
                                                        .claimed ? (
                                                        "Withdrawn"
                                                    ) : (
                                                        <div
                                                            className={
                                                                styles.status__cell
                                                            }
                                                        >
                                                            <span
                                                                className={
                                                                    styles.status__availble
                                                                }
                                                            >
                                                                Available
                                                            </span>{" "}
                                                            <button
                                                                className={
                                                                    styles.withdraw__btn
                                                                }
                                                                onClick={() =>
                                                                    handleWithdrawReward(
                                                                        [
                                                                            cell
                                                                                .row
                                                                                .original
                                                                                .id,
                                                                        ]
                                                                    )
                                                                }
                                                            >
                                                                Withdraw
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            );
                                        } else if (
                                            cell.column.Header === "ADDRESS"
                                        ) {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className={
                                                        styles.table__data
                                                    }
                                                >
                                                    {shortenAddress(
                                                        cell.row.original.user
                                                    )}
                                                </td>
                                            );
                                        } else {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className={
                                                        styles.table__data
                                                    }
                                                >
                                                    {cell.render("Cell")}
                                                </td>
                                            );
                                        }
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                <div className={styles.page__info}>
                    <span>
                        Showing Page{" "}
                        <span>
                            {pageIndex + 1} of {pageOptions.length}
                        </span>
                    </span>
                </div>
                <div className={styles.control__btns}>
                    <button
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                        className={styles.btn}
                    >
                        <MdOutlineFirstPage />
                    </button>
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className={styles.btn}
                    >
                        <MdNavigateBefore />
                    </button>
                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className={styles.btn}
                    >
                        <MdNavigateNext />
                    </button>
                    <button
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                        className={styles.btn}
                    >
                        <MdOutlineLastPage />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReferralRecordTable;
