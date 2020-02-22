import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  uri: "/";

  createPdf(data: any) {
    const url = this.uri + "";
    return this.http.post(url, data);
  }

  getPdf() {
    const url = this.uri + "";
    return this.http.get(url);
  }
}
