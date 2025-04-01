import { users } from "../../data";
import { useState, useEffect } from "react";
import { Table, Tag, Avatar, Space, Button } from "antd";
import { usePagination } from "../../hooks/usePagination";
import type { User } from "../../data";
import type { TableProps } from "antd";
import type { Key } from "react";

const Lesson3 = () => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  }>({ key: "id", direction: "asc" });
  const [paginationState, paginationFunctions] = usePagination();

  // Update total records when component mounts
  useEffect(() => {
    paginationFunctions.updateTotalRecords(users.length);
  }, []);

  // Sắp xếp dữ liệu theo cột
  const sortedUsers = [...users].sort((a, b) => {
    const { key, direction } = sortConfig;
    const aValue = a[key];
    const bValue = b[key];

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const currentUsers = sortedUsers.slice(
    (paginationState.currentPage - 1) * paginationState.pageSize,
    paginationState.currentPage * paginationState.pageSize
  );

  const getTagColor = (tier: User["subscriptionTier"]): string => {
    const colors: Record<User["subscriptionTier"], string> = {
      free: "blue",
      basic: "orange",
      business: "green",
      design: "magenta",
      tester: "purple",
    };
    return colors[tier] || "default";
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
      render: (text: number) => <span>{text}</span>,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: true,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      onFilter: (value: boolean | Key, record: User) => record.sex === value,
    },
    {
      title: "Job Area",
      dataIndex: "jobArea",
      key: "jobArea",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Subscription",
      dataIndex: "subscriptionTier",
      key: "subscriptionTier",
      render: (tier: User["subscriptionTier"]) => (
        <Tag color={getTagColor(tier)}>{tier}</Tag>
      ),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => <Avatar src={avatar} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: User) => (
        <Space>
          <Button
            type="primary"
            size="small"
            style={{
              backgroundColor: "#e6f7ff",
              borderColor: "#91d5ff",
              color: "#1890ff",
            }}
          >
            Invite {record.lastName}
          </Button>
          <Button
            type="primary"
            size="small"
            style={{
              backgroundColor: "#fff1f0",
              borderColor: "#ffa39e",
              color: "#ff4d4f",
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange: TableProps<User>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    if (sorter && "field" in sorter && sorter.field) {
      setSortConfig({
        key: sorter.field as keyof User,
        direction: sorter.order === "ascend" ? "asc" : "desc",
      });
    }
  };

  return (
    <div className="">
      <p className="mb-6 font-bold">Thực hành mockup data</p>

      <div className="max-h-[650px]">
        <Table
          columns={columns}
          dataSource={currentUsers}
          rowKey="id"
          pagination={{
            total: paginationState.totalRecords,
            pageSize: paginationState.pageSize,
            current: paginationState.currentPage,
            onChange: paginationFunctions.changePage,
            onShowSizeChange: paginationFunctions.changePageSize,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default Lesson3;
