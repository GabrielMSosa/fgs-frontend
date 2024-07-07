 
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guardfgsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let flag=false;
  let user=JSON.parse(sessionStorage.getItem("userbussiness")||"");
  let stat="";
  if(user.isProvider&&!user.isCompany){
    stat="PROVIDER";
  }
  if(!user.isProvider&&user.isCompany){
    stat="COMPANY";
  }
  let rol=sessionStorage.getItem("ROL")||"";
  let roljson=JSON.parse(rol);
  let rol_array=roljson.roles;
  const allowedRoles:string[] = route.data?.['allowedRoles'];
  const alloweType:string[] = route.data?.['allowType'];
  console.log("los valores admitidos de typo son"+alloweType)
  console.log("el valor de data vale"+allowedRoles);
  console.log("el valor rol vale"+rol);

 if (rol==null){
  router.navigate(['forbidden']);
  return false;
 }
 if (user==null){
  router.navigate(['forbidden']);
  return false;
 }
 //aca vamos a hacer la validacion de tipos pero con OR 
 if(alloweType.indexOf(stat)!=-1){
  flag=false;
 }else{
  flag=true;
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
