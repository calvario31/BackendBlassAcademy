import products from "@src/resources/products.json";

export function findBy(id: string) {
  return products.filter((p) => p.id.toString() === id)[0];
}

export function findAll(query: any) {
  return orderByQuery(filterByQuery(products, query), query);
}

export function filterByQuery(data: any[], query: any) {
  let filteredData = data;
  if (query.q) {
    filteredData = filteredData.filter((p) => p.nombre === query.q);
  }
  switch (query.filterBy) {
    case "esPerecible": {
      filteredData = filteredData.filter(
        (p) => p[query.filterBy] === (query.value === "true"),
      );
      break;
    }
    case "tags": {
      filteredData = filteredData.filter((p) =>
        p[query.filterBy].includes(query.value),
      );
      break;
    }
    default:
  }
  return filteredData;
}

export function orderByQuery(data: any[], query: any) {
  let orderedData = data;
  if (query.sortBy) {
    const order = query.order === "desc" ? -1 : 1;
    orderedData = orderedData.sort(
      (a, b) => order * (a[query.sortBy] - b[query.sortBy]),
    );
  }
  return orderedData;
}
