import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import {ClienteDTO} from "../../models/cliente.dto";
import {ClienteService} from "../../services/domain/cliente.service";
import {StorageService} from "../../services/storage.service";

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public clienteService: ClienteService,
              public storage: StorageService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocaluser();
    if (localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
            this.items = response['enderecos'];
          },
          error => {
            if (error.status){
              this.navCtrl.setRoot("HomePage");
            }
          });
    }
    else {
      this.navCtrl.setRoot("HomePage");
    }
  }

}
