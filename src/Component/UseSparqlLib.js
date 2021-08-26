
import * as d3 from 'd3-sparql';

export const execLibRequest = async (url, query) => {

    const result = await d3.sparql(url, query).then((data) => {
        console.log(data);
        return data;
    });

    console.log(result);
    return result;
};


