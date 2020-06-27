import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Historico } from '../model/Historico';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private historicos: Historico[] = [
    { dataHora: "21/06/2020 18:25", leitura: "http://www.ronanzenatti.com" },
    { dataHora: "22/06/2020 18:30", leitura: "https://github.com/MatheusESVicente" },
    { dataHora: "23/06/2020 18:35", leitura: "https://ionicframework.com/" },
    { dataHora: "24/06/2020 18:40", leitura: "http://www.etecbarrabonita.com.br/" },
    { dataHora: "25/06/2020 18:45", leitura: "Primeiro teste" },
  ];
 

  constructor(private screenOrientation: ScreenOrientation) {}

  

  
}
