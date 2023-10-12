import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '../../app/core/services/upload.service';
import { DashboardService } from '../core/services/dashboard.service';
import { NgxToastService } from 'ngx-toast-notifier';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('uploadForm1', { static: false }) uploadForm1!: NgForm;
  shortLink: string = '';
  loading: boolean = false; 
  public  file: File | undefined = undefined;
  public nameUser = ''
  public initDate: string = '';
  public endDate: string = '';
  public databydate: any[] = []
  public databyday: any[] = []
  groupedData: any[] = [];
   usuarioConMasFotos = '';
  maxFotosSubidas = 0;
  hourlyPhotoCounts: any ={}

  constructor(private fileUploadService: UploadService, private dashboardService: DashboardService, private toastr: ToastrService, ) {
    
  }
  ngOnInit(): void {
    this.getDataByDay()
  }

 /**
  * metodo que se ejecuta cuando se selecciona un archivo.
  * @param event 
  */
 onChange(event: Event) {
   const inputElement = event.target as HTMLInputElement;
   if (inputElement && inputElement.files && inputElement.files.length > 0) {
     this.file = inputElement.files[0];
   }
 }

 /**
  * metodo que sube una imagen.
  */
 onUpload() {
  if (this.file) {
    this.loading = true;
    console.log(this.file);
    this.fileUploadService.upload(this.file, this.nameUser).subscribe((event: any) => {
      if (typeof event === 'object') {
        this.shortLink = event.link;
        this.loading = false;
        this.toastr.success('El archivo se ha subido correctamente', 'Éxito');
        this.uploadForm1.resetForm(); // Restablece el formulario
      } else {
        this.loading = false;
        this.toastr.error('Ha ocurrido un error al subir el archivo', 'Error');
      }
    });
  } else {
    this.toastr.error('No se ha seleccionado ningún archivo para subir', 'Error');
  }
}
  

 /**
  * metodo que obtiene los datos por fecha.
  */
 getDataByDate(){
   const startDate = this.initDate;
   const endDate = this.initDate;
   this.dashboardService.getDataByDate(startDate, endDate).subscribe((response) => {
     this.databydate = response;
     console.log(response);
   },
   (error) => {
     console.error(error);
   });
 }

 /**
  * metodo que obtiene los datos por día.
  */
 getDataByDay() {
   this.dashboardService.getDataByDay().subscribe(
     (response) => {
       this.databyday = response;
       console.log(response);

       const groupMap = new Map();

       for (const item of this.databyday) {
         const hour = item.hour;

         if (groupMap.has(hour)) {
           const group = groupMap.get(hour);
           group.count += item.count;
           group.urls.push(...item.urls);
           group.uploaders.push(...item.uploaders);
         } else {
           const newGroup = { ...item };
           groupMap.set(hour, newGroup);
         }
       }

       this.groupedData = Array.from(groupMap.values());
       console.log("Conteo por hora:", this.groupedData);

       for (const group of this.groupedData) {
         if (group.count > this.maxFotosSubidas) {
           this.maxFotosSubidas = group.count;
           this.usuarioConMasFotos = group.uploaders[0];
         }
       }

       const photosByHour: { [hour: string]: number } = {};

       for (const item of this.databyday) {
         const hour = item.hour.split(':')[0];
         if (photosByHour[hour]) {
           photosByHour[hour] += item.count;
         } else {
           photosByHour[hour] = item.count;
         }
       }
       this.hourlyPhotoCounts = Object.keys(photosByHour).map(hour => ({
         hour,
         count: photosByHour[hour]
       }));

       console.log("Conteo de fotos por rango de hora:", this.hourlyPhotoCounts);
     },
     (error) => {
       console.error(error);
     });
 }




  
 


}
