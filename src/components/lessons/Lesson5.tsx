import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Menu, Checkbox, Button, Input, Divider, Table } from "@mantine/core";
import { Pagination, Group, Text, Select } from "@mantine/core";
import { ArrowUp, ArrowDown } from "lucide-react";
import { usePagination } from "../../hooks/usePagination";

interface Review {
  id: number;
  rating: number;
  comment: string;
  user: string;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: string;
  dimensions: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

interface Column {
  label: string;
  checked: boolean;
  sortable?: boolean;
  sortDirection?: "asc" | "desc";
}

const Lesson5 = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpened, setMenuOpened] = useState(false);
  const [columns, setColumns] = useState<Column[]>([
    { label: "id", checked: true, sortable: true },
    { label: "title", checked: true, sortable: true },
    { label: "description", checked: true },
    { label: "category", checked: false, sortable: true },
    { label: "price", checked: true, sortable: true },
    { label: "discountPercentage", checked: false, sortable: true },
    { label: "rating", checked: true, sortable: true },
    { label: "stock", checked: true, sortable: true },
    { label: "tags", checked: false },
    { label: "brand", checked: true, sortable: true },
    { label: "sku", checked: false },
    { label: "weight", checked: false },
    { label: "dimensions", checked: false },
    { label: "warrantyInformation", checked: false },
    { label: "shippingInformation", checked: false },
    { label: "availabilityStatus", checked: false },
    { label: "reviews", checked: false },
    { label: "returnPolicy", checked: false },
    { label: "minimumOrderQuantity", checked: false },
    { label: "meta", checked: false },
    { label: "images", checked: false },
    { label: "thumbnail", checked: true },
  ]);

  const [paginationState, paginationFunctions] = usePagination();

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${
          paginationState.pageSize
        }&skip=${(paginationState.currentPage - 1) * paginationState.pageSize}`
      );
      console.log("API Response:", response.data);
      console.log("First product details:", response.data.products[0]);

      setProducts(response.data.products);
      paginationFunctions.updateTotalRecords(response.data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [paginationState.currentPage, paginationState.pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle checkbox change
  const handleCheckboxChange = (index: number) => {
    const updatedColumns = [...columns];
    updatedColumns[index].checked = !updatedColumns[index].checked;
    setColumns(updatedColumns);
  };

  const handleRestoreDefaults = () => {
    setColumns([
      { label: "id", checked: true, sortable: true },
      { label: "title", checked: true, sortable: true },
      { label: "description", checked: true },
      { label: "category", checked: false, sortable: true },
      { label: "price", checked: true, sortable: true },
      { label: "discountPercentage", checked: false, sortable: true },
      { label: "rating", checked: true, sortable: true },
      { label: "stock", checked: true, sortable: true },
      { label: "tags", checked: false },
      { label: "brand", checked: true, sortable: true },
      { label: "sku", checked: false },
      { label: "weight", checked: false },
      { label: "dimensions", checked: false },
      { label: "warrantyInformation", checked: false },
      { label: "shippingInformation", checked: false },
      { label: "availabilityStatus", checked: false },
      { label: "reviews", checked: false },
      { label: "returnPolicy", checked: false },
      { label: "minimumOrderQuantity", checked: false },
      { label: "meta", checked: false },
      { label: "images", checked: false },
      { label: "thumbnail", checked: true },
    ]);
  };

  // Handle sorting
  const handleSort = (columnLabel: string) => {
    const updatedColumns = columns.map((col) => {
      if (col.label === columnLabel) {
        return {
          ...col,
          sortDirection:
            col.sortDirection === "asc" ? "desc" : ("asc" as "asc" | "desc"),
        };
      }
      return col;
    });
    setColumns(updatedColumns);

    const sortedProducts = [...products].sort((a, b) => {
      const aValue = a[columnLabel.toLowerCase() as keyof Product];
      const bValue = b[columnLabel.toLowerCase() as keyof Product];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return updatedColumns.find((col) => col.label === columnLabel)
          ?.sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return updatedColumns.find((col) => col.label === columnLabel)
        ?.sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    setProducts(sortedProducts);
  };

  return (
    <div className="">
      <p className="mb-6 font-bold">
        Thực hành xử lý bảng + dữ liệu ( dynamic table )
      </p>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <>
          <div className="flex items-center gap-12 mb-12 ">
            <div className="relative w-[150px] ml-auto items-end">
              <Menu
                shadow="md"
                width={256}
                position="bottom-start"
                opened={menuOpened}
                onChange={setMenuOpened}
                closeOnItemClick={false}
              >
                <Menu.Target>
                  <div className="flex justify-between items-center px-[14px] py-1.5 border rounded-md text-black cursor-pointer">
                    Columns <ArrowDown size={16} className="mt-1" />
                  </div>
                </Menu.Target>

                <Menu.Dropdown>
                  <div className="px-3 py-2">
                    <Input placeholder="Search" size="xs" />
                  </div>

                  <div className="px-4 py-2">
                    <Text
                      size="sm"
                      c="blue"
                      className="cursor-pointer hover:underline"
                      onClick={handleRestoreDefaults}
                    >
                      Restore Defaults
                    </Text>
                  </div>

                  <Divider />

                  <div className="max-h-48 overflow-y-auto">
                    {columns.map((column, index) => (
                      <Menu.Item key={index} className="py-1">
                        <Checkbox
                          label={column.label}
                          checked={column.checked}
                          onChange={() => handleCheckboxChange(index)}
                          size="sm"
                        />
                      </Menu.Item>
                    ))}
                  </div>

                  <Divider />

                  <div className="flex justify-end p-2">
                    <Button
                      variant="subtle"
                      size="xs"
                      color="gray"
                      className="mr-2"
                      onClick={() => setMenuOpened(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="xs"
                      color="blue"
                      onClick={() => setMenuOpened(false)}
                    >
                      Done
                    </Button>
                  </div>
                </Menu.Dropdown>
              </Menu>
            </div>

            <Group>
              <Text>
                {(paginationState.currentPage - 1) * paginationState.pageSize +
                  1}
                -
                {Math.min(
                  paginationState.currentPage * paginationState.pageSize,
                  paginationState.totalRecords
                )}{" "}
                of {paginationState.totalRecords}
                items
              </Text>

              <Pagination
                total={Math.ceil(
                  paginationState.totalRecords / paginationState.pageSize
                )}
                value={paginationState.currentPage}
                onChange={paginationFunctions.changePage}
              />

              <Select
                value={paginationState.pageSize.toString()}
                checkIconPosition="right"
                onChange={(value) =>
                  paginationFunctions.changePageSize(Number(value))
                }
                data={["10", "20", "30", "50", "80", "100"]}
                style={{ width: 100 }}
              />
            </Group>
          </div>

          <Table className="w-full">
            <Table.Thead>
              <Table.Tr className="">
                {columns
                  .filter((column) => column.checked)
                  .map((column, index) => (
                    <Table.Th
                      key={index}
                      className="p-[24px_24px_23px] text-left break-words cursor-pointer"
                      onClick={() =>
                        column.sortable && handleSort(column.label)
                      }
                    >
                      <div className="flex items-center gap-1">
                        {column.label}
                        {column.sortable &&
                          (column.sortDirection === "asc" ? (
                            <ArrowUp size={16} />
                          ) : (
                            <ArrowDown size={16} />
                          ))}
                      </div>
                    </Table.Th>
                  ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {products.map((product) => (
                <Table.Tr key={product.id} className=" cunstom_products">
                  {columns
                    .filter((column) => column.checked)
                    .map((column, index) => (
                      <Table.Td
                        key={index}
                        className="p-[24px_24px_23px] text-left break-words"
                      >
                        {column.label === "thumbnail" ? (
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-[75px] h-[75px] object-cover"
                            title={product.thumbnail}
                          />
                        ) : column.label === "description" ? (
                          <p className="max-w-[150px] break-words line-clamp-3">
                            {product[
                              column.label.toLowerCase() as keyof Product
                            ]?.toString() || "-"}
                          </p>
                        ) : column.label === "Title" ? (
                          <span>
                            {product[
                              column.label.toLowerCase() as keyof Product
                            ]?.toString() || "-"}
                          </span>
                        ) : column.label === "price" ? (
                          <p>${product.price}</p>
                        ) : column.label === "discountPercentage" ? (
                          <p>{product.discountPercentage}%</p>
                        ) : (
                          <p>
                            {product[
                              column.label as keyof Product
                            ]?.toString() || "-"}
                          </p>
                        )}
                      </Table.Td>
                    ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default Lesson5;
