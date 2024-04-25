import { Dispatch, SetStateAction } from "react";

export interface dataProps {
    id?:number | any,
    name: string,
    description: string,
    price: number,
    quantity: number,
    
}

export interface addProps {
    productToEdit:dataProps | any,
}

export interface editStateProps {
    setEditState: Dispatch<SetStateAction<undefined>> | any
}