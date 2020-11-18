import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Subscription } from 'rxjs';
import {Chart} from 'node_modules/chart.js';


@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css'],
  providers:[DataService]
})
export class SecondComponent implements OnInit {
  private paramsSubscription:Subscription;
  
  Piechart=[];
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.paramsSubscription=this.dataService.getApiData().subscribe(data=>{

      let diagnosisData=[];
      let filtereddiagnosisData=[];

      let totalData=[];
      let newtotalData=[];

      let valArray=Object.values(data);
      valArray.forEach((user)=>diagnosisData.push(user.ccs_diagnosis_description));
      diagnosisData.forEach(element=>{
        if(!filtereddiagnosisData.includes(element)){
          filtereddiagnosisData.push(element);
        }
      })

      
      valArray.forEach((user)=>totalData.push(user.ccs_diagnosis_description));

      var map=new Map()

       
    for(var i=0;i<totalData.length;i++){
      map.has(totalData[i]) ? map.set(totalData[i],map.get(totalData[i])+1) : map.set(totalData[i],1);
    }
    
    console.log(map);
    for(var key of map.keys()){
       newtotalData.push(map.get(key)); 
    }

      this.Piechart=new Chart('pieChart',{
        type:'pie',
        data:{
          labels:filtereddiagnosisData,
          datasets:[{
            label:'types of cancer',
            data:newtotalData,
            backgroundColor:[
              'rgba(40,23,244,0.9)',
              'rgba(192,255,0,0.9)',
              'rgb(255,0,0)',
              'rgb(10,0,255)',
              'rgb(60,179,113)',
              'rgb(238,130,238)',
              'rgb(255,165,0)',
              'rgb(120,90,205)',
              'rgb(120,120,120)',
              'rgb(128,128,0)',
              'rgb(128,0,0)',
              'rgb(0,255,255)',
              'rgb(0,128,128)',
            ],

          }]
        },
        options:{
          title:{
            text:"Pie Chart",
            display:true
          },
          scales:{
            yAxes:[{
              ticks:{
                begainAtZero:true
              }
            }]
          }
        }
      })


    

  });
    
  }

  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
  }

}
