import { MainServiceImpl, MainServiceProps } from "./MainServiceImpl";
import { orderByQuery } from "@src/utilities/queryProcessing";

export class ProductsServiceImpl extends MainServiceImpl {
  constructor(protected props: MainServiceProps) {
    super(props);
  }
  findAll(query: any) {
    return orderByQuery(filterByQuery(this.props.resources, query), query);
  }
}

function filterByQuery(data: any[], query: any) {
  let filteredData = data;
  if (query.nombre) {
    filteredData = filteredData.filter((p) => p.nombre === query.nombre);
  }
  switch (query.filterBy) {
    case "perecible": {
      filteredData = filteredData.filter(
        (p) => p[query.filterBy] === (query.value === "true"),
      );
      break;
    }
    case "etiquetas": {
      filteredData = filteredData.filter((p) =>
        p[query.filterBy].includes(query.value),
      );
      break;
    }
    default:
  }
  return filteredData;
}
