import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/material.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Material } from 'src/app/shared/material';
import { Solicitud, junte } from 'src/app/shared/solicitud';

@Component({
  selector: 'app-rechazada',
  templateUrl: './rechazada.component.html',
  styleUrls: ['./rechazada.component.css']
})

export class RechazadaComponent implements OnInit{
  tableClass = 'table-style';
  solicituds:Solicitud[]=[];
  solicitudN!:Solicitud;
  materials:Material[]=[];
  materialN!:Material;
  id:string='4'
  junte:junte[]=[];
  materialS: any[] = [/* tus datos de materiales aquí */];


  Rsocial:string="";
  codiProv:string="";
  nomClien:string="";
  numParte:string="";
  Estatus:string="";

  constructor(private solicitud:SolicitudService, private material:MaterialService){}

  ngOnInit(): void {
      this.solicitud.getList(this.id).subscribe((data: Solicitud[])=>{
        this.solicituds=data;
      });
      this.solicitud.find(this.id).subscribe(response=>{
        //console.log('entro en donde se recuperan los datos de la solicitud')
        this.solicitudN=response;
        this.codiProv=response.codProv;
        this.Rsocial=response.Rsocial;
        this.nomClien=response.NomCliente;
        this.numParte=response.NumParte;
        this.Estatus=response.estatus;
      });

      this.material.getList(this.id).subscribe((data: Material[])=>{
        this.materials = data;
      });

  }
  // Función para generar las filas de materiales
  /*generateMaterialRows(): string {
    let rows = '';
    for (const material of this.materials) {
      rows += `
        <tr>
          <td>${material.id}</td>
          <td>${material.descripcion}</td>
          <td>${material.familia}</td>
          <td>${material.caracterone}</td>
          <td>${material.caractertwo}</td>
        </tr>
      `;
    }
    return rows;
  }*/
  /*generateMaterialRows(): string {
    let rows = '';
    for (const material of this.materials) {
      rows += `
        ${material.id}\t${material.descripcion}\t${material.familia}\t${material.caracterone}\t${material.caractertwo}\n
      `;
    }
    return rows;
  }*/

  /*generateMaterialTable(): string {
    let table = '';
    table += 'id\t\tdescripcion\t\tfamilia\t\tcaracteristica 1\t\tcaracteristica 2\n';
    for (const material of this.materials) {
      table += `${material.id}\t\t${material.descripcion}\t\t${material.familia}\t\t${material.caracterone}\t\t${material.caractertwo}\n`;
    }
    return table;
  }*/
  /*generateMaterialTable(): string {
    let table = '';
    table += `<table class="${this.tableClass}">\n`;
    table += '<thead>\n';
    table += '<tr>\n';
    table += '  <th>id</th>\n';
    table += '  <th>descripcion</th>\n';
    table += '  <th>familia</th>\n';
    table += '  <th>caracteristica 1</th>\n';
    table += '  <th>caracteristica 2</th>\n';
    table += '</tr>\n';
    table += '</thead>\n';
    table += '<tbody>\n';
    for (const material of this.materials) {
      table += '<tr>\n';
      table += `  <td>${material.id}</td>\n`;
      table += `  <td>${material.descripcion}</td>\n`;
      table += `  <td>${material.familia}</td>\n`;
      table += `  <td>${material.caracterone}</td>\n`;
      table += `  <td>${material.caractertwo}</td>\n`;
      table += '</tr>\n';
    }
    table += '</tbody>\n';
    table += '</table>\n';
    return table;
  }*/
  generateMaterialTable(): string {
    let table = '';
    table += `<table class="${this.tableClass}">\n`;
    table += '<thead>\n';
    table += '<tr>\n';
    table += '  <th>Solicitud ID</th>\n';
    table += '  <th>Solicitud Solicitante</th>\n';
    table += '  <th>Solicitud CodigoProv</th>\n';
    table += '  <th>Solicitud Rsocial</th>\n';
    table += '  <th>Solicitud Cliente</th>\n';
    table += '  <th>Solicitud Parte</th>\n';
    table += '</tr>\n';
    table += '</thead>\n';
    table += '<tbody>\n';
    table += `  <td>${this.id}</td>\n`;
    table += `  <td>${this.nomClien}</td>\n`;
    table += `  <td>${this.codiProv}</td>\n`;
    table += `  <td>${this.Rsocial}</td>\n`;
    table += `  <td>${this.nomClien}</td>\n`;
    table += `  <td>${this.numParte}</td>\n`;
    table += '</tbody>\n'
    table += '<thead>\n';
    table += '<tr>\n';
    table += '  <th>Material ID</th>\n';
    table += '  <th>Material Descripcion</th>\n';
    table += '  <th>Material Familia</th>\n';
    table += '  <th>Material Caracteristica 1</th>\n';
    table += '  <th>Material Caracteristica 2</th>\n';
    table += '</tr>\n';
    table += '</thead>\n';
    table += '<tbody>\n';

    for (let i = 0; i < Math.max(this.materials.length, this.solicituds.length); i++) {
      table += '<tr>\n';
      table += `  <td>${this.materials[i] ? this.materials[i].id : ''}</td>\n`;
      table += `  <td>${this.solicituds[i] ? this.solicituds[i].id : ''}</td>\n`;
      table += `  <td>${this.materials[i] ? this.materials[i].descripcion : ''}</td>\n`;
      //table += `  <td>${this.solicituds[i] ? this.solicituds[i].solicitante : ''}</td>\n`;
      table += `  <td>${this.materials[i] ? this.materials[i].familia : ''}</td>\n`;
      //table += `  <td>${this.materials[i] ? this.materials[i].caracterone : ''}</td>\n`;
      //table += `  <td>${this.materials[i] ? this.materials[i].caractertwo : ''}</td>\n`;
      table += '</tr>\n';
    }

    table += '</tbody>\n';
    table += '</table>\n';
    return table;
  }



}
