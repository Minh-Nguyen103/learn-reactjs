import { Box, Container, Grid, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import productApi from 'api/productApi';
import React, { useEffect, useMemo, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import FilterView from '../components/FilterView';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },

  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: '30px',
    paddingBottom: '20px',
  },
}));

function ListPage(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const queryParam = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 9,
  });

  const [loading, setLoading] = useState(true);
  // const [filter, setFilter] = useState({
  //   ...params,
  //   _page: Number.parseInt(params._page) || 1,
  //   _limit: Number.parseInt(params._limit) || 9,
  //   _sort: 'salePrice:ASC',
  // });

  // useEffect(() => {
  //   //TODO: Sync filter to URL
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filter),
  //   });
  // }, [history, filter]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParam);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Fail to fetch product list', error);
      }

      setLoading(false);
    })();
  }, [queryParam]);

  const handlePageChange = (e, page) => {
    // setFilter((prevFilter) => ({
    //   ...prevFilter,
    //   _page: page,
    // }));

    const filter = {
      ...queryParam,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const handleSortChange = (newSortValue) => {
    // setFilter((prevFilter) => ({
    //   ...prevFilter,
    //   _sort: newSortValue,
    // }));

    const filter = {
      ...queryParam,
      _sort: newSortValue,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const handleFilterChange = (newFilter) => {
    // setFilter((prevFilter) => ({
    //   ...prevFilter,
    //   ...newFilter,
    // }));

    const filter = {
      ...queryParam,
      ...newFilter,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const setNewFilter = (newFilter) => {
    // setFilter(newFilter);

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilter),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilter filter={queryParam} onChange={handleFilterChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParam._sort} onChange={handleSortChange} />
              <FilterView filter={queryParam} onChange={setNewFilter} />

              {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}

              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  onChange={handlePageChange}
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
