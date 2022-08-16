import { Box, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {},

  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '200px',
  },
}));

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const { errors, setValue } = form;
  const hasError = !!errors[name];

  return (
    <div>
      <FormControl error={hasError} size="small" margin="normal" variant="outlined">
        <Typography>{label}</Typography>
        <Controller
          name={name}
          control={form.control}
          render={({ onChange, onBlur, value, name }) => (
            <Box className={classes.box}>
              <IconButton onClick={() => setValue(name, Number.parseInt(value - 1))}>
                <RemoveCircleOutline />
              </IconButton>

              <OutlinedInput
                id={name}
                disabled={disabled}
                type="number"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />

              <IconButton onClick={() => setValue(name, Number.parseInt(value + 1))}>
                <AddCircleOutline />
              </IconButton>
            </Box>
          )}
        />

        <FormHelperText>{errors[name]?.message} </FormHelperText>
      </FormControl>
    </div>
  );
}

export default QuantityField;
