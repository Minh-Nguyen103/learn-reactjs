import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from './Filter/FilterByCategory';
import FilterByPrice from './Filter/FilterByPrice';
import FilterByService from './Filter/FilterByService';

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
  const handleChange = (values) => {
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handleChange} />
      <FilterByService filter={filter} onChange={handleChange} />
    </Box>
  );
}

export default ProductFilter;
