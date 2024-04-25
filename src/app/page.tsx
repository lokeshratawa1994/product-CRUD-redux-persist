'use client'
import { Button } from "@mui/material";
import TableData from "./component/table/page";
import { dataProps } from "./interface";
import AddForm from "./component/addform/page";
import { useState } from "react";

export default function Home() {
  const [editState,setEditState]= useState()
  return (
   <>
      <AddForm productToEdit={editState} />
      <TableData setEditState={setEditState} />
   </>
  );
}
