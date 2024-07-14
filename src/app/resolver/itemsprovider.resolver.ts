import { ResolveFn } from '@angular/router';
import { ItemsService } from '../services/provider/items.service';
import { inject } from '@angular/core';
import { IProduct } from '../interfaces/IProducts';

export const itemsproviderResolver: ResolveFn<IProduct> = (route, state) => {
  const jsn_usr=sessionStorage.getItem('userbussiness')||"";
  const user=JSON.parse(jsn_usr)
  return inject(ItemsService).SearchProductByIdUser(user.id)
 
};
