import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import {DataService} from './data.service';
import {Chart} from 'node_modules/chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[DataService]
})
export class AppComponent {
  title = 'Project2';
  chart=[];
  
  
  private paramsSubscription:Subscription;
  constructor(private dataService:DataService  ){
    
  }
  ngOnInit(){
    this.paramsSubscription=this.dataService.getApiData().subscribe(data=>{

         
      let ageData=[];
      let filteredAgeData=[];

      let morData=[];
      let newmorData=[];
     
      let valArray=Object.values(data);
      valArray.forEach((user)=>ageData.push(user.age_group));
      ageData.forEach(element=>{
        if(!filteredAgeData.includes(element)){
          filteredAgeData.push(element);
        }
      })

      valArray.forEach((user)=>morData.push(user.apr_risk_of_mortality));

      var map=new Map()

       
    for(var i=0;i<morData.length;i++){
      map.has(morData[i]) ? map.set(morData[i],map.get(morData[i])+1) : map.set(morData[i],1);
    }

    for(var key of map.keys()){
       newmorData.push(map.get(key)); 
    }
    let revmorData=[4,10,22,14]

    this.chart=new Chart('chart',{
      type:'line',
      data:{
        labels:filteredAgeData,
        datasets:[
          {
            
            label:'minor',
            data:revmorData,
            borderColor:'blue',
            fill:false
          },
          {

            label:'extreme',
            data:newmorData,
            borderColor:'red',
            fill:false
          }
        ]
      },
      options:{
        title:{
          text:"Line Chart",
          display:true,
        },
        legend:{
          display:false
        },
        scales:{
          xAxes:[{
            display:true
          }],
          yAxes:[{
            display:true
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