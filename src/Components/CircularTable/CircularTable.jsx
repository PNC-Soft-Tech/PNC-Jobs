// src/components/CircularTable.js
import React, { useEffect, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { getAllJobCirculars } from '@/app/APIs/Circulars/Circular'; // Import the API function

const CircularTable = () => {
  const [data, setData] = useState([]); // State to hold job circular data
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch all job circulars from the backend
  const fetchJobCirculars = async () => {
    setLoading(true); // Set loading state to true before fetching data
    const circulars = await getAllJobCirculars(); // Call the API function
    // Map the backend data structure to the expected structure
    const mappedData = circulars.map((circular) => ({
      title: circular.title,
      company: circular.company,
      category: circular.jobCategory, // Assuming jobCategory is a string; adjust if it's an object
      deadline: new Date(circular.deadline).toLocaleDateString(), // Format deadline as needed
      link: circular.link || '#', // Use actual link or placeholder
    }));
    setData(mappedData);
    setLoading(false); // Set loading state to false after data is fetched
  };

  useEffect(() => {
    fetchJobCirculars(); // Fetch job circulars on component mount
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Company/Institute',
        accessor: 'company',
      },
      {
        Header: 'Deadline',
        accessor: 'deadline',
      },
      {
        Header: 'Download Link',
        accessor: 'link',
        Cell: ({ cell: { value } }) => (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Download
          </a>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
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
      columns,
      data,
      initialState: { pageIndex: 0 }, // Start at page 0
    },
    useSortBy,
    usePagination
  );

  if (loading) {
    return <p>Loading job circulars...</p>; // Display loading state
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination mt-4">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
            className="border rounded"
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="border rounded"
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CircularTable;
