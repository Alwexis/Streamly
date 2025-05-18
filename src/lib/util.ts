import { QueryParams } from "./types";

// export function parseQueryParams(query: string): QueryParams {
//     const params = new URLSearchParams(query);
//     const queryParams: QueryParams = {};
//     for (const [key, value] of params.entries()) {
//         console.log(key, value)
//         if (key === "nombre") queryParams.name = value as string;
//         else if (key === "minyear") queryParams.minyear = Number(value);
//         else if (key === "maxyear") queryParams.maxyear = Number(value);
//         else if (key === "genre") queryParams.genre = value.split(",").map(Number);
//     }
//     console.log(queryParams)
//     return queryParams;
// }

export function parseQueryParamsToUrl(query: QueryParams): string {
    let params = "?";
    if (query.name) params += `name=${query.name}&`;
    if (query.minyear) params += `minyear=${query.minyear}&`;
    if (query.maxyear) params += `maxyear=${query.maxyear}&`;
    if (query.genre && query.genre.length > 0) params += `genre=${query.genre.join(",")}&`;
    if (params.endsWith("&")) params = params.slice(0, -1);
    return params;
}
