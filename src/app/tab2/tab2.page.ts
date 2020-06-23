import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public Hora:string = "14:15";
  public Data:string = "22/06/2020";


  constructor(private screenOrientation: ScreenOrientation) {}

  
}
