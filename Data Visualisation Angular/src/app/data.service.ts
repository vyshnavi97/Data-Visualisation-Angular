import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  constructor(private http:HttpClient) { }

  getApiData(){
    return this.http.get("https://health.data.ny.gov/resource/gnzp-ekau.json?$where=UPPER(ccs_diagnosis_description)%20like%20%27%25CANCER%25%27&$limit=50");
  }

}