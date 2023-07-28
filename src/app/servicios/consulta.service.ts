import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  //url =  "https://19ee-181-230-219-190.ngrok.io/student";
  url= "https://bbcb-181-231-122-56.ngrok-free.app/student"
  options: any;
  parameters = new HttpHeaders();
  params =  new HttpParams();  
  
  constructor(private http: HttpClient) { 

    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
        })
    };
  }

  loadStudents() {
    console.log("loadStudents");
    return this.http.get(this.url + "/getAll", this.options);
  }

  addStudent(student:any) {
    console.log("addStudent");
    return this.http.post(this.url, student, this.options);
  }
  
  removeStudent(id:any) {
    console.log("removeStudent");
    return this.http.post(this.url + "/" + id +"/delete", this.options);
  }

  getStudents(id:any) {
    console.log("getStudents");
    return this.http.get(this.url + "/get", this.options);
  }

  updateStudent(id:any, student:any) {
    console.log("updateStudent");
    return this.http.post(this.url + "/" + id + "/update",student, this.options);
  }

}
