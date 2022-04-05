import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import categoriApi from 'api/categoryApi';
import { Box, makeStyles, Typography } from '@material-ui/core';
import FilterSkeletonList from './FilterSkeletonList';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& > li': {
      marginTop: theme.spacing(1),

      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.dark,
      },
    },
  },
}));

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoriApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Fail to fetch category list', error);
      }

      setLoading(false);
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };

  return (
    <div>
      {loading ? (
        <FilterSkeletonList length={6} />
      ) : (
        <Box className={classes.root}>
          <Typography variant="subtitle2">Danh mục sản phẩm</Typography>

          <ul className={classes.menu}>
            {categoryList.map((category) => (
              <li key={category.id} onClick={() => handleCategoryClick(category)}>
                <Typography variant="body2">{category.name}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </div>
  );
}

export default FilterByCategory;
