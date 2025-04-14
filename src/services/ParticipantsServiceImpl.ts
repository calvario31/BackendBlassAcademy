import { MainServiceImpl, MainServiceProps } from "./MainServiceImpl";
import { filterByQuery } from "@src/utilities/queryProcessing";

export class ParticipantsServiceImpl extends MainServiceImpl {
  constructor(protected props: MainServiceProps) {
    super(props);
  }
  findAll(query: any) {
    return orderByQuery(filterByQuery(this.props.resources, query), query);
  }
}

function orderByQuery(data: any[], query: any) {
  let orderedData = data;
  const order = query.order === "desc" ? -1 : 1;
  switch (query.sortBy) {
    case "likes":
    case "dislikes": {
      orderedData = orderedData.sort(
        (a, b) => order * (a.reaccion[query.sortBy] - b.reaccion[query.sortBy]),
      );
      break;
    }
    default:
      orderedData = orderedData.sort(
        (a, b) => order * (a[query.sortBy] - b[query.sortBy]),
      );
  }
  return orderedData;
}
