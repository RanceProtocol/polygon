import { FC } from "react";
import styles from "./styles.module.css";
import { useTable, usePagination } from 'react-table'
import { referralRecords } from "../../constants/dummyData";

interface IProp {
    
}

const ReferralRecordTable: FC<IProp> = () => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page
    
        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
      } = useTable(
        {
          5,
          data,
          initialState: { pageIndex: 2 },
        },
        usePagination
      )
    return <div className={styles.root}></div>;
};

export default ReferralRecordTable;
