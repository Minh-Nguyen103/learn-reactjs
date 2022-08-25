import { Box, CircularProgress, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddToCardForm from '../components/AddToCardForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hook/useProductDetail';
import { addToCart, showMiniCart } from 'features/Cart/cartSlice';

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '400px',
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(1.5),
  },

  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },

  loadingProgress: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
}));

function DetailPage() {
  const classes = useStyles();
  const {
    params: { productId },
    url,
  } = useRouteMatch();

  const dispatch = useDispatch();

  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return <CircularProgress className={classes.loadingProgress} />;
  }

  const handleAddToCardSubmit = ({ quantity }) => {
    dispatch(
      addToCart({
        id: product.id,
        product,
        quantity,
      })
    );
    dispatch(showMiniCart());
  };

  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCardForm onSubmit={handleAddToCardSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
        <Switch>
          <Route path={url} exact>
            <ProductDescription product={product} />
          </Route>

          <Route path={`${url}/additional`}>
            <ProductAdditional />
          </Route>

          <Route path={`${url}/reviews`}>
            <ProductReviews />
          </Route>
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
