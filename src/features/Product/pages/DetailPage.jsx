import { Box, CircularProgress, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ProductInfo from '../components/ProductInfo';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hook/useProductDetail';

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
  const { productId } = useParams();

  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return <CircularProgress className={classes.loadingProgress} />;
  }

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
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailPage;
