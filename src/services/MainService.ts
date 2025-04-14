export interface MainService {
  findBy(id: string): any;
  findAll(query: any): any[];
  getKeysNotSupportedIn(body: any): string[];
}
