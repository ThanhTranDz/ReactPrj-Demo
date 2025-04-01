import { TextInput, Select, MultiSelect } from "@mantine/core";
import { useState, useEffect } from "react";

interface FilterCondition {
  condition: string;
  field: string;
  value: string;
}

interface FilterResult {
  filterListId: number;
  filterWithConditions: FilterCondition[];
  operatorsOrder: string[];
  freeText: string;
  tags: string[];
}

const Lesson6 = () => {
  // Form states
  const [filterRows, setFilterRows] = useState([0]);
  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterValues, setFilterValues] = useState(
    filterRows.map(() => ({
      column: null as string | null,
      condition: null as string | null,
      text: "",
    }))
  );

  // Result states
  const [filterResult, setFilterResult] = useState<FilterResult | null>(null);

  // Load data from URL when component mounts
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const filterData = searchParams.get("filter");

    if (filterData) {
      try {
        const parsedData = JSON.parse(
          decodeURIComponent(filterData)
        ) as FilterResult;
        setFilterResult(parsedData);
        setSearchText(parsedData.freeText);
        setSelectedTags(parsedData.tags);

        // Reconstruct filter rows from conditions
        if (parsedData.filterWithConditions.length > 0) {
          setFilterRows(
            Array.from(
              { length: parsedData.filterWithConditions.length },
              (_, i) => i
            )
          );
          setFilterValues(
            parsedData.filterWithConditions.map((condition) => ({
              column: condition.field,
              condition: condition.condition,
              text: condition.value,
            }))
          );
        }
      } catch (error) {
        console.error("Error parsing URL data:", error);
      }
    }
  }, []);

  // Data for select components
  const tagOptions = [
    { value: "important", label: "Important" },
    { value: "urgent", label: "Urgent" },
    { value: "review", label: "Review" },
    { value: "bug", label: "Bug" },
  ];

  const columnOptions = [
    { value: "FIRST_NAME", label: "FIRST_NAME" },
    { value: "LAST_NAME", label: "LAST_NAME" },
    { value: "BIRTH_YEAR", label: "BIRTH_YEAR" },
    { value: "PERSONAL_NUMBER", label: "PERSONAL_NUMBER" },
    { value: "GENDER", label: "GENDER" },
    { value: "DATE_RECORDED", label: "DATE_RECORDED" },
    { value: "BUSINESS_AREA", label: "BUSINESS_AREA" },
    { value: "COUNTRY", label: "COUNTRY" },
    { value: "EMPLOYER", label: "EMPLOYER" },
    { value: "MANAGERIAL_POSITION", label: "MANAGERIAL_POSITION" },
    { value: "ZIPCODE", label: "ZIPCODE" },
    { value: "LINKED_IN_LINK", label: "LINKED_IN_LINK" },
    { value: "FIRST_EMPLOYMENT", label: "FIRST_EMPLOYMENT" },
    { value: "PHONE_NUMBER", label: "PHONE_NUMBER" },
    { value: "SECOND_PHONE_NUMBER", label: "SECOND_PHONE_NUMBER" },
    { value: "EMAIL_WORK", label: "EMAIL_WORK" },
    { value: "CREATE_BY", label: "CREATE_BY" },
  ];

  const isOptions = [
    { value: "IS", label: "IS" },
    { value: "IS_NOT", label: "IS_NOT" },
    { value: "CONTAINS", label: "CONTAINS" },
    { value: "NOT_CONTAINS", label: "NOT_CONTAINS" },
    { value: "GREATER_THAN", label: "GREATER_THAN" },
    { value: "LESS_THAN", label: "LESS_THAN" },
  ];

  const handleAddFilter = () => {
    setFilterRows([...filterRows, filterRows.length]);
    setFilterValues([
      ...filterValues,
      { column: null, condition: null, text: "" },
    ]);
  };

  const handleClear = () => {
    setFilterRows([0]);
    setSearchText("");
    setSelectedTags([]);
    setFilterValues([{ column: null, condition: null, text: "" }]);
    setFilterResult(null);
    // Clear URL params
    window.history.replaceState({}, "", window.location.pathname);
  };

  const handleFilterValueChange = (
    index: number,
    field: "column" | "condition" | "text",
    value: string | null
  ) => {
    const newFilterValues = [...filterValues];
    newFilterValues[index] = {
      ...newFilterValues[index],
      [field]: value,
    };
    setFilterValues(newFilterValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create filter conditions from valid rows
    const filterConditions = filterValues
      .filter((row) => row.column && row.condition && row.text)
      .map((row) => ({
        condition: row.condition as string,
        field: row.column as string,
        value: row.text,
      }));

    // Create filter result object
    const result: FilterResult = {
      filterListId: 0,
      filterWithConditions: filterConditions,
      operatorsOrder: [],
      freeText: searchText,
      tags: selectedTags,
    };

    setFilterResult(result);

    // Update URL with filter data
    const searchParams = new URLSearchParams();
    searchParams.set("filter", encodeURIComponent(JSON.stringify(result)));
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${searchParams.toString()}`
    );
  };

  return (
    <div>
      <p className="mb-6 font-bold">Thực hành extend form</p>

      <form
        onSubmit={handleSubmit}
        className="border-b-[1px] border-stroke pb-10 mb-[34px] border-[#e5e7eb]"
      >
        <div className="flex items-center justify-between">
          <h2 className="mb-8 text-2xl ">Filter</h2>
        </div>

        <div className="p-[0px_27px_0_20px]">
          <div className="flex gap-12">
            <div className="flex flex-col gap-2 mb-7 w-[431px]">
              <label
                htmlFor="search"
                className="text-base cursor-pointer opacity-60"
              >
                Search
              </label>
              <TextInput
                id="search"
                name="freeText"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="focus:border-primary outline-none border"
              />
            </div>
            <div className="flex flex-col gap-2 mb-7 w-[431px]">
              <label
                htmlFor="tag"
                className="text-base cursor-pointer opacity-60"
              >
                Tag
              </label>
              <MultiSelect
                id="tag"
                placeholder="Tag"
                className="max-w-[431px]"
                data={tagOptions}
                value={selectedTags}
                onChange={setSelectedTags}
                searchable
                clearable
              />
            </div>
          </div>

          {filterRows.map((index) => (
            <div key={index} className="flex flex-col gap-[11px] mb-[22px]">
              {index === 0 && (
                <label className="text-base opacity-60">
                  Show Only Records With
                </label>
              )}
              <div>
                <div className="flex items-center justify-between gap-6">
                  <Select
                    placeholder="Columns"
                    className="w-[318px]"
                    data={columnOptions}
                    value={filterValues[index].column}
                    onChange={(value) =>
                      handleFilterValueChange(index, "column", value)
                    }
                    searchable
                    clearable
                  />
                  <span className="text-base">That</span>
                  <Select
                    placeholder="Is"
                    className="w-[318px]"
                    data={isOptions}
                    value={filterValues[index].condition}
                    onChange={(value) =>
                      handleFilterValueChange(index, "condition", value)
                    }
                    searchable
                    clearable
                  />
                  <TextInput
                    placeholder="Text"
                    className="border w-[386px] focus:border-primary outline-none"
                    value={filterValues[index].text}
                    onChange={(e) =>
                      handleFilterValueChange(index, "text", e.target.value)
                    }
                    disabled={
                      !filterValues[index].column ||
                      !filterValues[index].condition
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddFilter}
            className="mb-5 text-base font-medium opacity-60 text-bgButtonAntd cursor-pointer"
          >
            + More Filter
          </button>

          <div className="flex items-center gap-5">
            <button
              className="py-3 text-white bg-green-300 rounded-md hover:bg-slate-400 px-9 cursor-pointer"
              type="submit"
            >
              filter
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="py-3 rounded px-9 hover:bg-slate-400 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      <table className={`${filterResult ? "w-full" : ""}`}>
        <thead>
          <tr className="grid grid-cols-2">
            <th className="px-5 py-4 border border-[#e5e7eb]">Filter</th>
            <th className="px-5 py-4 border border-[#e5e7eb]">Tags</th>
          </tr>
        </thead>
        <tbody>
          <tr className="grid grid-cols-2">
            <td className="px-5 py-4 border border-[#e5e7eb]">
              {filterResult ? (
                <pre className="font-mono text-sm break-words whitespace-normal">
                  {JSON.stringify(filterResult)}
                </pre>
              ) : null}
            </td>
            <td className="px-5 py-4 font-medium border border-[#e5e7eb]">
              {filterResult &&
                filterResult.tags.map((tag, index) => (
                  <span key={index} className="mr-2">
                    {tag}
                  </span>
                ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Lesson6;
