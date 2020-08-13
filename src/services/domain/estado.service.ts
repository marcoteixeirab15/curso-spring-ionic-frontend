import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {Observable} from "rxjs";
import {EstadoDTO} from "../../models/estado.dto";

@Injectable()
export class EstadoService {

  constructor(public Http: HttpClient) {
  }

  findAll(): Observable<EstadoDTO[]> {
    return this.Http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`)
  }

}
