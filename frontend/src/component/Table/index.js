import React from 'react'
import { MDBDataTable } from 'mdbreact';

const Table = () => {

    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Position',
                field: 'position',
                sort: 'asc',
                width: 270
              },
              {
                label: 'Office',
                field: 'office',
                sort: 'asc',
                width: 200
              },
              {
                label: 'Age',
                field: 'age',
                sort: 'asc',
                width: 100
              },
        ],
        rows: []
      };
  return (
    <MDBDataTable
      striped
      bordered
      hover
      data={data}
    />
  )
}

export default Table