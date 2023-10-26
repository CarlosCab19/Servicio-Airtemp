export interface Material {
  id:string;
  id_solicitud:string;
  descripcion:string;
  familia:string;
  estatus:string;
}

export interface Familia{
  id:string;
  familia:string;
}

export interface Caracteristica{
  id:string;
  caracteristica:string;
  id_familia:string;
}

export interface Caractermaterial{
  id:string;
  id_material:string;
  caracteristica:string;
  valor:string;
  estatus:string;
}
