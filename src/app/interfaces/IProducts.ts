
  export interface IProduct  {
    id?:string,
    user_id:string;
    items:IItem[];
   }  


   export interface IItem{
    id?:string,
    category:string;
    item_name:string;
    quantity:number;
    unit:string;
   } 

   export interface ITransaction{
    id?:string,
    id_item:string,
    quantity:number;
   }