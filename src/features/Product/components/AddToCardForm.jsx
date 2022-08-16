import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import InputField from 'components/Form-controls/InputField';
import QuantityField from 'components/Form-controls/QuantityField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCardForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCardForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup.number().min(1, 'Minium value is 1').typeError('Please enter a number'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <QuantityField name="quantity" label="Quantity" form={form} />

        <Button type="submit" color="primary" variant="contained" fullWidth size="large">
          Buy
        </Button>
      </form>
    </div>
  );
}

export default AddToCardForm;
