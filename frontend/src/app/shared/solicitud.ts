export interface Solicitud {
  id:string;
  id_usuario:string;
  solicitante:string;
  codProv:string;
  Rsocial:string;
  NomCliente:string;
  NumParte:string;
  estatus:string;
  created_at:Date|string;
}

export interface junte{
  id_soli:string;
  id_material:string;
}
