'use client'
import React, {useEffect, useState } from 'react';
import { Button, Drawer, TextField } from '@mui/material';
import { useForm,  Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { addProduct, ediProduct } from '@/app/redux/productSlice';
import { addProps, dataProps } from '@/app/interface';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  price: yup.number().required('Price is required').positive('Price must be a positive number'),
  quantity: yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
});

const AddForm = ({ productToEdit}:any) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { control, handleSubmit, setValue, formState: { errors },reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const toggleDrawer = () => setOpen(!open);

  useEffect(() => {
    if (productToEdit) {
        toggleDrawer()
      Object.keys(productToEdit).forEach((key:any) => setValue(key, productToEdit[key]));
    }
  }, [productToEdit, setValue]);

  const onSubmit = (data:dataProps|any) => {
    if (productToEdit) {
      dispatch(ediProduct({ ...data, id: productToEdit.id }));
      reset()
    } else {
      const uniqueId = Math.floor(Math.random() * 1000000);
      const newData = { ...data, id: uniqueId };
      dispatch(addProduct(newData));
      reset()
    }
    setOpen(false);
  };

  return (
    <>
      <div style={{
        display: 'flex',
        padding: '20px',
        justifyContent: 'flex-end',
      }}>
        <Button onClick={toggleDrawer} variant="outlined">Add</Button>
      </div>
      <Drawer open={open} onClose={toggleDrawer} >
        <div style={{
          marginTop: '40px',
          marginLeft: '60px',
          fontSize: '18px',
          fontWeight: 'bold',
        }}>{productToEdit ? 'Edit' : 'Add'} Product Details</div>
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 50,
          gap: 20,
        }} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                {...field}
                required
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                {...field}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                {...field}
                type="number"
                required
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                {...field}
                type="number"
                required
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
              />
            )}
          />
          <input
            style={{
              background: '#d1d0cd',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '50px',
            }}
            type="submit"
          />
        </form>
      </Drawer>
    </>
  );
};

export default AddForm;
