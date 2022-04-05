import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';

FilterSkeletonList.propTypes = {
  length: PropTypes.number,
};

FilterSkeletonList.defaultProps = {
  length: 6,
};

function FilterSkeletonList({ length }) {
  return (
    <Box>
      {Array.from(new Array(length)).map((x, index) => (
        <Box padding={1} key={index}>
          <Skeleton width="80%" />
        </Box>
      ))}
    </Box>
  );
}

export default FilterSkeletonList;
