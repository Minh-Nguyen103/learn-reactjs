import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './Filter/FilterByCategory';
import { Box } from '@material-ui/core';
import FilterByPrice from './Filter/FilterByPrice';

ProductFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.object,
};

function ProductFilter({ onChange, filter }) {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      'category.id': newCategoryId,
    };
    onChange(newFilter);
  };
  const handlePriceChange = () => {};

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handlePriceChange} />
    </Box>
  );
}

export default ProductFilter;
