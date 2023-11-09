export interface Cotizacion {
  id:string;
  id_material:string;
  id_analista:string;
  id_director:string;
  moneda:string;
  fabricacion:string;
  lme:string;
  premium:string;
  total:string;
  icoterm:string;
  estatus:string,
}
export interface Comprovante{
  id:string;
  id_cotizacion:string;
  nombre:string;
  ruta:string;
}
