
import * as d3 from 'd3-sparql';

export const execLibRequest = async (url, query) => {

    const result = await d3.sparql(url, query).then((data) => {
        console.log(data);
        return data;
    });

    console.log(result);
    return result;
};



/* ----> Somme Querry to test the library


const querryTitle = `select *
where {
<http://ns.inria.fr/covid19/f74923b3ce82c984a7ae3e0c2754c9e33c60554f> dct:title ?title.
}LIMIT 10`

const querryAuth = `select *
where {
<http://ns.inria.fr/covid19/f74923b3ce82c984a7ae3e0c2754c9e33c60554f> dce:creator ?authors.
}LIMIT 10`



const querry2 = `select *
        where {
            <http://ns.inria.fr/covid19/f74923b3ce82c984a7ae3e0c2754c9e33c60554f> dct:title ?title1.

            ?a1 a oa:Annotation;
                schema:about <http://ns.inria.fr/covid19/f74923b3ce82c984a7ae3e0c2754c9e33c60554f>;
                oa:hasBody ?uri;

                oa:hasTarget [ oa:hasSource    ?source ]
                .

        } limit 10`
 */

