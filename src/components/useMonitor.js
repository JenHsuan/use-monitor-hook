import { useState, useEffect } from "react";

function useMonitor (urls, freshRate=1000) {
    //const freshRate = 1000;
    const [timerIDQueue, setTimerIDQueue] = useState([]);
    const [status, setStatus] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Clean the timer queue
        cleanTimerIDQueue();

        if (freshRate !== 0) {
            // Set the timer
            const ID = setInterval(async() => {
                try{
                    let res = await Promise.allSettled(urls.map(async (url, index) => {
                        let t = await fetch(url);
                        return t.json();
                    }));
                    setStatus(res.map(ele => ele.status));
                    setResults(res.map(ele => ele.value));
                } catch(error){
                    console.log(error);
                }
            }, freshRate);
            // Save IDs in the timer queue
            setTimerIDQueue(prevItems => [...prevItems, ID]);
        } else {
            // Clean the timer queue
            cleanTimerIDQueue();
        }

        return () => {
            cleanTimerIDQueue();
        };

    }, [freshRate]);

    const cleanTimerIDQueue = () => {
        timerIDQueue.map(timerID => {
            clearInterval(timerID);
        });
        setTimerIDQueue([]);
    };

    return { results, status };
};

export default useMonitor;
