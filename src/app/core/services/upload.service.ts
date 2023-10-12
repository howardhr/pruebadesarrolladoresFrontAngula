import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  baseApiUrl = 'http://localhost:4068/uploadimg/upload';
  constructor(private http: HttpClient) {}
  /**
   * metodo para Carga imagen y datos de usuario al servidor.
   * @param {File} file
   * @param {any} userUpload
   * @returns {Observable<any>} 
   */
  upload(file: File, userUpload: any): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    formData.append('userUpload', JSON.stringify(userUpload));
    return this.http.post(this.baseApiUrl, formData);
  }

}
