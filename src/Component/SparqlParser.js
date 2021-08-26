import {execLibRequest} from 'UseSparqlLib'


/**
 *
 * @type {string}
 */
const endpoint = `https://covidontheweb.inria.fr/sparql`;

const querryTitle = `select *
where {
<http://ns.inria.fr/covid19/f74923b3ce82c984a7ae3e0c2754c9e33c60554f> dct:title ?title.
}LIMIT 10`;

const querryAuth = `select *
where {
<http://ns.inria.fr/covid19/f74923b3ce82c984a7ae3e0c2754c9e33c60554f> dce:creator ?authors.
}LIMIT 10`;

export const execRequest = (querry) => {
   return execLibRequest(endpoint, querry)
};

export const requestTitle = () => {
   return execRequest(querryTitle)
};






