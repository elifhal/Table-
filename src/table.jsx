import React, { useState } from 'react';
import { Data } from './data.js';
import './App.css';

function Table() {
  const [suppliers, setsuppliers] = useState(Data);
  const [sortConfig, setSortConfig] = useState(null);

  const deletesupplier = (id) => {
    var result = window.confirm('Want to delete?');
    if (result) {
      var filteredsuppliers = suppliers.filter((q) => q.id !== id);
      setsuppliers(filteredsuppliers);
    }
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    const sortedSuppliers = [...suppliers].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setsuppliers(sortedSuppliers);
  };

  return (
    <>
      <div className="App">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort('id')}>Id</th>
              <th onClick={() => requestSort('companyName')} >Company Name</th>
              <th onClick={() => requestSort('contactName')}>Contact Name</th>
              <th onClick={() => requestSort('contactTitle')}>Contact Title</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.id}</td>
                <td>{supplier.companyName}</td>
                <td>{supplier.contactName}</td>
                <td>{supplier.contactTitle}</td>
                <td>
                  <button onClick={() => deletesupplier(supplier.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
