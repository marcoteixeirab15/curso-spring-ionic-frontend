import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../services/storage.service";
import {AlertController} from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService,
              public alertController: AlertController) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error, caught) => {

        let errorObj = error;
        if (errorObj.error) {
          errorObj = errorObj.error;
        }
        if (!errorObj.status) {
          errorObj = JSON.parse(errorObj)
        }

        console.log("Erro detectado pelo interceptor");
        console.log(errorObj);

        switch (errorObj.status) {
          case 401:
            this.handle401();
            break;

          case 403:
            this.handle403();
            break;

          default:
            this.hadleDefaultError(errorObj);

        }

        return Observable.throw(errorObj);
      }) as any;
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

  handle401() {
    let alert = this.alertController.create({
      title: 'Erro 401: Falha de autheticação',
      message: 'Email ou senha incorretos',
      enableBackdropDismiss: false,
      buttons: [
        {text: 'Ok'},
      ]
    });
    alert.present();
  }

  private hadleDefaultError(errorObj: any) {
    let alert = this.alertController.create({
      title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {text: 'Ok'},
      ]
    });
    alert.present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
