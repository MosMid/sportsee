import { useEffect, useState } from "react";

/**

@function useFetch
@param {string} url - URL of the API to fetch data from.
@param {object} initialState - Initial state for data.
@returns {Array} - An array containing the data and a loading status.
*/
function useFetch(url, initialState){
    const [data, setData] = useState(initialState);
    const [loading,setLoading]=useState(false)
    /**

    Use effect hook to make a fetch request to the API and update the state
    */
    useEffect(() =>{
        setLoading(true)
        fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            setLoading(false)
            if(resp == "can not get user") setData(resp)
            else setData(resp.data)
        })
        .catch(function() {
            setLoading(false)
            setData("server error")
        });
    }, []);
    return [data,loading]
}
export default useFetch