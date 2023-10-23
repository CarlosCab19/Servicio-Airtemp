export interface Material {
  id:string;
  id_solicitud:string;
  descripcion:string;
  familia:string;
  caracterone:string;
  caractertwo:string;
  caracterthree:string;
  otra:string;
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
