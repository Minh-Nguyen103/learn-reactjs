import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from './Filter/FilterByCategory';
import FilterByPrice from './Filter/FilterByPrice';

ProductFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.object,
};

function ProductFilter({ onChange, filter, loading }) {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return;

    const newFilter = {
      'category.id': newCategoryId,
    };
    onChange(newFilter);
  };
  const handlePriceChange = (values) => {
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handlePriceChange} />
    </Box>
  );
}

export default ProductFilter;
