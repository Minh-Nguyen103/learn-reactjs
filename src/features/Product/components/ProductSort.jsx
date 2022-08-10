import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const hanldeSortChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <Tabs
      value={currentSort}
      indicatorColor="primary"
      textColor="primary"
      onChange={hanldeSortChange}
      aria-label="disabled tabs example"
    >
      <Tab label="Giá từ thấp tới cao" value="salePrice:ASC"></Tab>
      <Tab label="Giá từ cao tới thấp" value="salePrice:DESC"></Tab>
    </Tabs>
  );
}

export default ProductSort;
