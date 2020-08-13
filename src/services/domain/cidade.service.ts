import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {CidadeDTO} from "../../models/cidade.dto";
import {Observable} from "rxjs";

@Injectable()
export class CidadeService {

  constructor(public Http: HttpClient) {
  }

  findAll(estadoId: string) : Observable<CidadeDTO[]> {
    return this.Http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`)
  }

}
