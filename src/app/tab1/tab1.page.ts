import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { HistoricoService } from '../services/historico.service';
import { Historico } from '../model/Historico';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public valor_leitura:any;
  public corpoPagina: HTMLElement;
  public img: HTMLElement;
  public scanner: any;
  public link: false;

  constructor(private qrScanner: QRScanner,
     private dialogs: Dialogs, 
     private platform: Platform, 
     private screenOrientation: ScreenOrientation,
     private historicoService:HistoricoService
     ) {
    this.platform.backButton.subscribeWithPriority(0, ()=>{
      this.corpoPagina.style.opacity = '1';
      this.img.style.opacity = '1';
      this.scanner.unsubscribe();
      this.qrScanner.hide();
      this.link = false;
      this.valor_leitura = null;
    })
  }

  public async lerQRCode(){
    // Optionally request the permission early
this.qrScanner.prepare()
.then((status: QRScannerStatus) => {
   if (status.authorized) {    
     this.qrScanner.show();
     this.corpoPagina = document.getElementsByTagName('ion-content')[0] as HTMLElement;
     this.img = document.getElementById('logo') as HTMLElement;
     this.corpoPagina.style.opacity = "0";
     this.img.style.opacity = "0";

     this.scanner = this.qrScanner.scan().subscribe(async(text: string) => {

      this.valor_leitura= (text['result']) ? text['result'] : text;
      this.corpoPagina.style.opacity = "1";
      this.img.style.opacity = "1";
      this.qrScanner.hide(); // hide camera preview
      this.scanner.unsubscribe(); // stop scanning

      const historico = new Historico();
      historico.leitura = this.valor_leitura;
      historico.dataHora = new Date();

      await this.historicoService.create(historico).then(resposta =>{
        console.log(resposta);
      }).catch(error =>{
        this.presentAlert('ERRO',"Erro ao salvar no Firebase.");
        console.log('ERRO: ', error);
      });
    });


   } else if (status.denied) {
   } else {
   }

   
})
.catch((e: any) => console.log('Error is', e));

  }
  presentAlert(arg0: string, arg1: string) {
    throw new Error("Method not implemented.");
  }
}




