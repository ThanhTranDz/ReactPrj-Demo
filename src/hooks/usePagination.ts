import { useState, } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
}

interface PaginationFunctions {
  changePage: (page: number) => void;
  changePageSize: (size: number) => void;
  updateTotalRecords: (total: number) => void;
}

export const usePagination = (): [PaginationState, PaginationFunctions] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalRecords, setTotalRecords] = useState(0);
  
  // Get initial values from URL or use defaults
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;

  const changePage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  const changePageSize = (size: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('pageSize', size.toString());
    // Reset to first page when changing page size
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const updateTotalRecords = (total: number) => {
    setTotalRecords(total);
  };

  return [
    {
      currentPage,
      pageSize,
      totalRecords,
    },
    {
      changePage,
      changePageSize,
      updateTotalRecords,
    },
  ];
}; 