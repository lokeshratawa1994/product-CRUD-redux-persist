'use client'

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useAppSelector } from '@/app/redux/hooks';
import { deleteProduct } from '@/app/redux/productSlice';
import { dataProps, editStateProps } from '@/app/interface';
import { useDispatch } from 'react-redux';


export default function TableData({setEditState}:any) {
  const dispatch = useDispatch()
    const {data} = useAppSelector((state) => state.product);
    const handleDelete = (id:number)=> {
        dispatch(deleteProduct(id))
    }
    const handleEdit = (row:dataProps)=>{
        setEditState(row)
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Description</TableCell>
            <TableCell >Price</TableCell>
            <TableCell >Quantity</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: dataProps,index: React.Key | null | undefined) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell align="center">
                <Button onClick={()=>handleEdit(row)}>Edit</Button>
                <Button onClick={()=>handleDelete(row.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
