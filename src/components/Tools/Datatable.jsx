import React, { useState } from "react";
import { Table } from "antd";
import { usePagination } from "@/context/PaginationContext";

const Datatable = ({
  props,
  columns,
  dataSource,
  onSelectionChange,
  selectedRowKeys: preSelectedRowKeys,
  onRowSelectionChange,
  sumFields = [],
  setSelectedData,
  tableID = 'tableID',
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState(preSelectedRowKeys || []);
  const { paginationLimit } = usePagination();
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);

    const selectedRows = dataSource.filter((item) =>
      newSelectedRowKeys.includes(item.id)
    );

    // Expose selected rows
    if (setSelectedData) {
      setSelectedData(selectedRows);
    }

    if (onSelectionChange) {
      onSelectionChange(selectedRows);
    }

    if (onRowSelectionChange) {
      onRowSelectionChange(newSelectedRowKeys);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      id={tableID}
      key={props}
      rowSelection={rowSelection}
      className="table datanew dataTable no-footer"
      columns={columns}
      dataSource={dataSource}
      rowKey={(record) => record.id}
      pagination={
        dataSource?.length > paginationLimit
          ? { pageSize: paginationLimit }
          : false
      }
      summary={sumFields?.length > 0 ? (pageData) => {
        const totals = {};
        sumFields.forEach(field => {
          totals[field] = pageData.reduce((acc, item) => acc + Number(item[field] || 0), 0);
        });

        return (
          <>
          {dataSource?.length > 0 ? (
          <Table.Summary.Row className={`bg-primary`}>
            {columns.map((col, index) => {
              if (index === 0) {
                return (
                  <>
                  <Table.Summary.Cell>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                  key={col.dataIndex || index}>
                    {/* <strong>Total</strong> */}
                  </Table.Summary.Cell>
                  </>
                );
              } else if (sumFields.includes(col.dataIndex)) {
                return (
                  <Table.Summary.Cell key={col.dataIndex || index}>
                    <strong>{totals[col.dataIndex]}</strong>
                  </Table.Summary.Cell>
                );
              } else {
                return <Table.Summary.Cell key={col.dataIndex || index} />;
              }
            })}
          </Table.Summary.Row>
          ):(
            <></>
          )}
          </>
        );
      } : undefined}
    />
  );
};

export default Datatable;
