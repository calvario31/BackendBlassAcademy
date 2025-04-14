export function filterByQuery(data: any[], query: any) {
  let filteredData = data;
  if (query.nombre) {
    filteredData = filteredData.filter((p) => p.nombre === query.nombre);
  }
  if (query.filterBy) {
    filteredData = filteredData.filter(
      (p) => p[query.filterBy] === query.value,
    );
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
