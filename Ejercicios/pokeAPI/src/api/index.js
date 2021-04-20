async function apiCall({
    url,
    method = "get",
    body,
    headers,

}) {
    try{
        /*Le paso el primer parámetro url, luego los opcionales, que no importa si no están definidos no pasa nada*/
        const response = await fetch(url, {
            method,
            body,
            headers,
        });
        return (response.json());

    } catch (err) {
        Promise.reject(err); //Reject tira un error en el lugar donde haga la llamada al API
    }
}

export default apiCall;