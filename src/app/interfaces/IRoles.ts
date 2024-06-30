export interface IRoles  {
    id:string;
    isNew:boolean; 
    roles:string[];
   }  

    export enum ROL {
    COLABORATOR="COLABORATOR",
    OPERATOR_READER="OPERATOR_READER",
    OPERATOR_WRITTER="OPERATOR_WRITTER",
    SUPERVISOR_WRITTER="SUPERVISOR_WRITTER",
    SUPERVISOR_READER="SUPERVISOR_READER",
    MANAGER="MANAGER"
  }
 

  //Level myVar = Level.MEDIUM;