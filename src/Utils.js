/**
 * Check whether the response from one of the backend services is empty.
 *
 * @param query the query string submitted to the backend
 * @param response
 * @returns {boolean} true if empty, false otherwise
 */
export function isEmptyResponse(query, response) {

    if (response.data === undefined || response.data.result === undefined) {
        console.log("WARNING: incomplete response\n: " + JSON.stringify(response) + " . Query was\n: " + query);
        return true;
    }
    if (response.data.result.length === 0) {
        console.log("WARNING: empty response.data.result\n: " + JSON.stringify(response) + " . Query was: " + query);
        return true;
    } else if (Object.entries(response.data.result[0]).length === 0) {
        console.log("WARNING: empty response.data.result[0]\n: " + JSON.stringify(response) + " . Query was: " + query);
        return true;
    }
    return false;
}
