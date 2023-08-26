import React, { useState } from 'react';
import { Table, Input } from 'antd';

const YourTableComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const data = [
    { column1: 'wang', column2: '18' },
    { column1: 'ting', column2: '17' },
  ];

  const columns = [
    {
      title: '列1',
      dataIndex: 'column1',
      key: 'column1',
    },
    {
      title: '列2',
      dataIndex: 'column2',
      key: 'column2',
    },
    // Add more columns as needed
  ];

  // 定义搜索函数
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // 清除搜索函数
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`搜索 ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <button
          type="button"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </button>
        <button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>
          重置
        </button>
      </div>
    ),
    filterIcon: (filtered) => (
      <i
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      >
        🔍
      </i>
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  columns.forEach((col) => {
    col.title = col.title + getColumnSearchProps(col.dataIndex).filterIcon;
    col.filterDropdown = getColumnSearchProps(col.dataIndex).filterDropdown;
    col.onFilter = getColumnSearchProps(col.dataIndex).onFilter;
  });

  return (
    <Table
      columns={columns}
      dataSource={data}
      // 其他Table属性
    />
  );
};

export default YourTableComponent;
