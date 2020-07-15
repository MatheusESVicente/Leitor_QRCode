import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Historico } from '../model/Historico';
import { HistoricoService } from '../services/historico.service';
import { Subscriber, from } from 'rxjs';

import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private historicos: Historico[] = [];
 

  constructor(private screenOrientation: ScreenOrientation,
    private historicoService: HistoricoService,
    ) {
      registerLocaleData(localePtBr);
    }

  public buscarHistoricos(){
    this.historicos = [];

    this.historicoService.getAll().subscribe(dados =>{
      this.historicos = dados.map(register =>{
        return {
          $key: register.payload.doc.id,
          leitura: register.payload.doc.data()['leitura'],
          dataHora: new Date(register.payload.doc.data()['dataHora']['secunds'] * 1000)
         } as Historico;
      });
    });
  }

  async ionViewWillEnter(){
    await this.buscarHistoricos();
  }

  public deletar(key: string){
    this.historicoService.delete(key);
    this.buscarHistoricos();
  }

}
