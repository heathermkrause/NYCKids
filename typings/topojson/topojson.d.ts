declare module topojson {
    export function feature(topology:any, o:any):any;
}

declare module 'topojson' {
    export = topojson;
}