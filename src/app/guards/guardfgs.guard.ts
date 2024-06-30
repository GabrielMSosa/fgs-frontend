 
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guardfgsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let flag=false;
  let rol=sessionStorage.getItem("ROL")||"";
  let roljson=JSON.parse(rol);
  let rol_array=roljson.roles;
  const allowedRoles:string[] = route.data?.['allowedRoles'];
  console.log("el valor de data vale"+allowedRoles);
  console.log("el valor rol vale"+rol);

 if (rol==null){
  router.navigate(['forbidden']);
  return false;
 }

//si o si todos los roles de la ruta deben estar en el del usuario.
 allowedRoles.forEach(element => {
  if(rol_array?.indexOf(element)==-1){
    console.log("el valor de data valexx"+element+"   "+allowedRoles);
    flag=true;
  }
 });
 if(!flag){
  return true;
 }else{
  router.navigate(['forbidden']);
  return false; 
 }
 
 return false;
};
