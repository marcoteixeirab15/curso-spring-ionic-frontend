import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findByCategoria(categoria_id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/page?categorias=${categoria_id}`);
  }

}
