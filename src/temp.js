import React, { useMemo, useState, useEffect, Fragment } from 'react';
import DATA from './NEW_MOCK_DATA.json';
import COLOR from './COLOR_MOCK_DATA.json';
import CARS from './CARS_MOCK_DATA.json';
import { useTable, usePagination, useRowSelect } from 'react-table';

function App() {
  const [usersData, setUsersData] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const handleEdit = () => {
    setDisabled(false);
  };

  const handleSave = (id) => {
    setDisabled(true);
  };
  const handleDelete = (e) => {
    const value = Number(e.target.value);
    console.log('Data Before: ', usersData);

    const filtered_data = usersData.filter((el) => el.id !== value);
    setUsersData(filtered_data);

    console.log('Filter: ', filtered_data);

    alert('Successfully Deleted!');
  };

  console.log('Data After: ', usersData);

  // let color = [];
  // for (let i = 0; i < COLOR.length; i++) {
  //   color.push(COLOR[i].color);
  // }

  // let cars = [];
  // for (let i = 0; i < CARS.length; i++) {
  //   cars.push(CARS[i].name);
  // }

  // const TextFile = () => {
  //   const element = document.createElement('a');
  //   const textFile = new Blob([JSON.stringify(usersData)], {
  //     type: 'application/json',
  //   }); //pass data from localStorage API to blob
  //   element.href = URL.createObjectURL(textFile);
  //   element.download = 'NEW_MOCK_DATA.json';
  //   document.body.appendChild(element);
  //   element.click();
  // };

  useEffect(() => {
    // DATA.forEach((el) => {
    //   const option = [cars[Math.floor(Math.random() * 8)]];
    //   el['cars'] = option;
    // });
    // // DATA.forEach((el) => {
    // //   el['color'] = color[Math.floor(Math.random() * 10)];
    // // });
    setUsersData(DATA);
    // TextFile();
  }, []);

  // console.log(DATA);

  const data = useMemo(() => usersData, [usersData]);

  const columns = useMemo(
    () => [
      {
        Header: 'Avatar',
        accessor: 'avatar', // accessor is the "key" in the data
        Cell: (row) => <img src={row.value} alt="avatar" />,
        maxWidth: 70,
      },
      {
        Header: 'First Name',
        accessor: 'first_name', // accessor is the "key" in the data
        Cell: (row) => {
          return (
            <input
              type="text"
              id="first_name"
              name="first_name"
              defaultValue={row.value}
              disabled={disabled}
              style={{ width: '97%', height: '25px', fontSize: '15px' }}
            ></input>
          );
        },
      },
      {
        Header: 'Last Name',
        accessor: 'last_name', // accessor is the "key" in the data
        Cell: (row) => {
          return (
            <input
              type="text"
              id="last_name"
              name="last_name"
              defaultValue={row.value}
              disabled={disabled}
              style={{ width: '97%', height: '25px', fontSize: '15px' }}
            ></input>
          );
        },
      },
      {
        Header: 'Email',
        accessor: 'email', // accessor is the "key" in the data
        Cell: (row) => {
          return (
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={row.value}
              disabled={disabled}
              style={{ width: '97%', height: '25px', fontSize: '15px' }}
            ></input>
          );
        },
      },
      {
        Header: 'Favourite Color',
        accessor: 'color',
        Cell: (row) => {
          return (
            <select
              defaultValue={row.value}
              disabled={disabled}
              style={{ width: '100%', height: '30px', fontSize: '15px' }}
            >
              {COLOR.map((el, index) => {
                return <option key={index}>{el.color}</option>;
              })}
            </select>
          );
        },
      },
      {
        Header: 'Desired Cars',
        accessor: 'cars',
        Cell: (row) => {
          let arr = [];
          let cars = row.value;
          CARS.map((el) => {
            arr.push(cars.includes(el.name));
          });

          return (
            <>
              {CARS.map((el, index) => {
                return (
                  <Fragment key={index}>
                    <input
                      name="checkbox"
                      type="checkbox"
                      defaultChecked={arr[index]}
                      disabled={disabled}
                    ></input>
                    <label htmlFor="checkbox"> {el.name}</label>
                    <br />
                  </Fragment>
                );
              })}
            </>
          );
        },
      },
    ],
    [disabled]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Actions',
        Header: 'Actions',
        Cell: ({ row }) => {
          return (
            <div align="center">
              {disabled === false ? (
                <button onClick={() => handleSave(row.original.id)}>
                  Save
                </button>
              ) : (
                <></>
              )}
              <br />
              <button
                value={row.original.id}
                onClick={(e) => {
                  if (
                    window.confirm(
                      `Are you sure to delete ${row.values.first_name} ${row.values.last_name}?`
                    )
                  )
                    return handleDelete(e);
                }}
              >
                Delete
              </button>
              <br />
            </div>
          );
        },
      },
    ]);
  };

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
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, tableHooks, usePagination);

  return (
    <>
      <h1 align="center">React Table </h1>

      <div
        align="center"
        style={{
          marginBottom: '30px',
          width: '100%',
          height: '30px',
          fontSize: '20px',
        }}
      >
        <button>Add New Row </button>
        <br />
        <button onClick={() => handleEdit()}>Edit Table</button>
      </div>

      <div align="center">
        <table
          {...getTableProps()}
          align="center"
          style={{
            border: 'solid 1px black',
            marginTop: '30px',
            marginBottom: '10px',
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: 'solid 3px red',
                      background: 'aliceblue',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: 'papayawhip',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          className="pagination"
          style={{
            marginBottom: '30px',
            width: '100%',
            height: '30px',
            fontSize: '20px',
          }}
        >
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
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
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
export default App;
