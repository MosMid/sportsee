import React, { useEffect, useState } from "react";

function useFetch(url, initialState){
    const [data, setData] = useState(initialState);
    const [loading,setLoading]=useState(false)
    useEffect(() =>{
        setLoading(true)
        fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            setLoading(false)
            setData(resp.data)
            })
    }, []);
    return [data,loading]
}
export default useFetch