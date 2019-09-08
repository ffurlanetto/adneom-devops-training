import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AppService {
  private baseUrl: string = environment.apiEndpoint + '/hello';

  constructor(private http: HttpClient) {
  }

  getTitle(): Observable<string> {
    return this.http.get<string>(this.baseUrl, {responseType: 'text'});
  }
}
