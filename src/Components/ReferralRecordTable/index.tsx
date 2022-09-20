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
import { IReferralRecord, referralRecords } from "../../constants/dummyData";
import {
    MdOutlineLastPage,
    MdOutlineFirstPage,
    MdNavigateNext,
    MdNavigateBefore,
} from "react-icons/md";

interface IProp {}

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
    UsePaginationInstanceProps<T> & {
        state: UsePaginationState<T>;
    };

const ReferralRecordTable: FC<IProp> = () => {
    const data = useMemo(() => referralRecords, []);
    const columns: Array<
        Column<{
            date: string;
            address: string;
            rewardAmount: string;
            status: string;
        }>
    > = useMemo(
        () => [
            {
                Header: "DATE",
                accessor: "date",
            },
            {
                Header: "ADDRESS",
                accessor: "address",
            },
            {
                Header: "REWARD",
                accessor: "rewardAmount",
            },
            {
                Header: "STATUS",
                accessor: "status",
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
    } = useTable({ columns, data }, usePagination) as TableInstanceWithHooks<{
        date: string;
        address: string;
        rewardAmount: string;
        status: string;
    }>;

    return (
        <div className={styles.root}>
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
                                {row.cells.map((cell) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <td
                                        {...cell.getCellProps()}
                                        className={styles.table__data}
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <div className={styles.page__info}>
                    <span>
                        Showing Page
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
