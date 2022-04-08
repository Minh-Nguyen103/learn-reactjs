import { Box, Chip, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    padding: 0,
    margin: theme.spacing(2, 0),
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

FilterView.propTypes = {
  filter: PropTypes.object,
  onChange: PropTypes.func,
};

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Miễn phí vận chuyển',
    isActive: (filter) => filter.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filter) => {
      const newFilter = { ...filter };
      if (newFilter.isFreeShip) {
        delete newFilter.isFreeShip;
      } else {
        newFilter.isFreeShip = true;
      }

      return newFilter;
    },
  },

  {
    id: 2,
    getLabel: () => 'Có khuyến mãi',
    isActive: () => true,
    isVisible: (filter) => filter.isPromotion,
    isRemovable: true,
    onRemove: (filter) => {
      const newFilter = { ...filter };
      delete newFilter.isPromotion;
      return newFilter;
    },
    onToggle: () => {},
  },

  {
    id: 3,
    getLabel: (filter) =>
      `Từ ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
        filter.salePrice_gte
      )} đến ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
        filter.salePrice_lte
      )}`,
    isActive: () => true,
    isVisible: (filter) =>
      Object.keys(filter).includes('salePrice_gte') &&
      Object.keys(filter).includes('salePrice_lte') &&
      filter.salePrice_gte >= 0 &&
      filter.salePrice_lte > 0,
    isRemovable: true,
    onRemove: (filter) => {
      const newFilter = { ...filter };
      delete newFilter.salePrice_gte;
      delete newFilter.salePrice_lte;
      return newFilter;
    },
    onToggle: () => {},
  },

  {
    id: 4,
    getLabel: () => `Danh mục: ${localStorage.getItem('categoryName')} `,
    isActive: () => true,
    isVisible: (filter) => Object.keys(filter).includes('category.id'),
    isRemovable: true,
    onRemove: (filter) => {
      const newFilter = { ...filter };
      delete newFilter['category.id'];
      return newFilter;
    },
    onToggle: () => {},
  },
];

function FilterView({ filter = {}, onChange = null }) {
  const classes = useStyles();

  const visibleFilter = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filter));
  }, [filter]);

  return (
    <Box component={'ul'} className={classes.root}>
      {visibleFilter.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filter)}
            color={x.isActive(filter) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            size="small"
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;

                    const newFilter = x.onToggle(filter);
                    onChange(newFilter);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;

                    const newFilter = x.onRemove(filter);
                    onChange(newFilter);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterView;
