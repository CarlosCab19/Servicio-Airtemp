import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalService } from '../services/personal.service';
import { Personal } from '../shared/personal';
import { Solicitud } from '../shared/solicitud';
import { SolicitudService } from '../services/solicitud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vista-analista',
  templateUrl: './vista-analista.component.html',
  styleUrls: ['./vista-analista.component.css']
})
export class VistaAnalistaComponent implements OnInit{

  //para el menu
  isOffcanvasOpen: boolean = false;
  //variables que se usan para los componentes interactivos
  verporCotizar:boolean=true;
  verCotizados:boolean=false;
  verAprobadas:boolean=false;
  //variables que se usan para los datos del analista
  id:string='';
  analista!:Personal;
  idAnalista:string='';
  datosAnalista:string='';
  solicitudes:Solicitud[]=[];
  solicitudesN!:Solicitud;
  //
  formCotizacion:boolean=false;
  idSolicitud:string='';
  //recupera el valor que se manda por el buscador para que se pueda filtrar
  @Input() filtroBusqueda: string = '';

  constructor(private router: Router,private rutaActiva: ActivatedRoute,private personalService:PersonalService,
    private solicitudesService:SolicitudService){}

  ngOnInit(): void {
    //trae los datos del usuario
    this.id=this.rutaActiva.snapshot.paramMap.get('id') as string;
    this.personalService.find(this.id).subscribe(response=>{
      this.analista=response;
      this.idAnalista=response.id;
      this.datosAnalista=response.nombres+' '+response.apellidos;
    });
    //trae todas las solicitudes nuevas
    this.solicitudesService.getNueva().subscribe((data: Solicitud[])=>{
      this.solicitudes = data;
    });
  }
  //para filtrar y buscar información en la tabla
  filtrarSolicitudes(): any[] {
    const valorBusqueda = this.filtroBusqueda.toLowerCase();
    return this.solicitudes.filter((solicitud) => {
      return solicitud.id.toString().toLowerCase().includes(valorBusqueda) ||
             solicitud.solicitante.toLowerCase().includes(valorBusqueda) ||
             solicitud.tipo.toLowerCase().includes(valorBusqueda) ||
             solicitud.NomCliente.toLowerCase().includes(valorBusqueda)||
             solicitud.estatus.toLowerCase().includes(valorBusqueda);
    });
  }
  //las acciones de los componentes interactivos
  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }
  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }
  verFormCoti(id:string){
    this.formCotizacion=true;
    this.idSolicitud=id;
    this.verporCotizar=false;
  }
  closeForm(valor:boolean){
    this.verporCotizar=valor;
    this.formCotizacion=!valor;
    console.log(valor);
    if(valor===true){
      window.location.reload();
    }
  }
  Nuevas(valor:boolean){
    this.verporCotizar=valor;
    this.verCotizados=!valor;
    this.formCotizacion=!valor;
    this.verAprobadas=!valor;
    this.closeOffcanvas();
  }
  Cotizadas(valor:boolean){
    this.verCotizados=valor;
    this.verporCotizar=!valor;
    this.formCotizacion=!valor;
    this.verAprobadas=!valor;
    this.closeOffcanvas();
  }
  aprobadas(valor:boolean){
    console.log(valor);
    this.verAprobadas=valor;
    this.verCotizados=!valor;
    this.verporCotizar=!valor;
    this.formCotizacion=!valor;
    this.closeOffcanvas();
  }

  salir(){
    this.router.navigate(['/inicio']);
  }

}
