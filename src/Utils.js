/**
 * Check whether the response from one of the backedn services is empty.
 *
 * @param query the query string submitted to the backend
 * @param response
 * @returns {boolean} true if empty, false otherwise
 */
export function isEmptyResponse(query, response) {
    if (response.data.result.length === 0) {
        console.log("WARNING: empty response. Query was: " + query);
        return true;
    } else if (Object.entries(response.data.result[0]).length === 0) {
        console.log("WARNING: empty response. Query was: " + query);
        return true;
    }
    return false;
}
