import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {CategoriaDTO} from "../../models/categoria.dto";
import {Observable} from "rxjs";

@Injectable()
export class CategoriaService {

  constructor(public Http: HttpClient) {
  }

  findAll() : Observable<CategoriaDTO[]> {
    return this.Http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`)
  }

}
