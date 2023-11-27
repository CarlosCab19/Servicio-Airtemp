export interface Solicitud {
  id:string;
  id_solicitante:string;
  solicitante:string;
  tipo:string;
  codProv:string;
  Rsocial:string;
  NomCliente:string;
  NumParte:string;
  id_analista:string;
  id_director:string;
  vence:string;
  estatus:string;
  created_at:Date|string;
  estado?:number;
}

export interface junte{
  id_soli:string;
  id_material:string;
}
