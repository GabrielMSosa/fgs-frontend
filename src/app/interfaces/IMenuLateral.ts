export interface IMenuLateral {
  icon: string;
  title: string;
  router_link:string;
  isSubMenu:boolean; 
  submenu:SubMenu[];

  }  


  export interface SubMenu {
    have_icon:boolean;
    title:string;
    icon:string;
    router_link:string
  }