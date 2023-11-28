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
  adicional:string;
  nota:string;
  vence:string;
  estatus:string,
  selected?: boolean,
}
export interface Comprobante{
  id:string;
  id_cotizacion:string;
  nombre:string;
  ruta:string;
}
