import { MainService } from "./MainService";
import { orderByQuery, filterByQuery } from "@src/utilities/queryProcessing";

export interface MainServiceProps {
  resources: any[];
}

export class MainServiceImpl implements MainService {
  constructor(protected props: MainServiceProps) {}
  findBy(id: string) {
    return this.props.resources.filter((p) => p.id.toString() === id)[0];
  }
  findAll(query: any) {
    return orderByQuery(filterByQuery(this.props.resources, query), query);
  }
  getKeysNotSupportedIn(body: any) {
    const keys = Object.keys(body);
    const resourceKeys = Object.keys(this.props.resources[0]);

    return keys.filter((key) => !resourceKeys.includes(key));
  }
}
