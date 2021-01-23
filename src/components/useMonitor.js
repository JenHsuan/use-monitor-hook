import { useState, useEffect } from "react";

function useMonitor ({urls, freshRate = 1000}) {
    //const freshRate = 1000;
    const [timerIDQueue, setTimerIDQueue] = useState([]);
    const [status, setStatus] = useState([]);
    const [results, setResults] = useState([]);
    const [lastTimes, setLastTime] = useState(Array(urls.length).fill(undefined));

    useEffect(() => {
        console.log(`[use-react-monitor] freshRate: ${freshRate}`);
        // Clean the timer queue
        cleanTimerIDQueue();

        if (freshRate !== 0) {
            // Set the timer
            const ID = setInterval(async() => {
                await fetchResources();
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

    const fetchResources = async() => {
        try{
            let current = new Date();
            let time = current.toLocaleTimeString();
            console.log(`[use-react-monitor] executed at: ${time}`);
            let res = await Promise.allSettled(urls.map(async (url, index) => {
                let t = await fetch(url);
                updateLastTime(index);
                return t.json();
            }));
            setStatus(res.map(ele => ele.status));
            setResults(res.map(ele => ele.value));
        } catch(error){
            console.log(error);
        }
    }

    const updateLastTime = (index) => {
        let current = new Date();
        let time = current.toLocaleTimeString();
        let list = lastTimes;
        list[index] = time;
        setLastTime(list);
    }

    const cleanTimerIDQueue = () => {
        console.log('[use-react-monitor] cleanTimerIDQueue');
        timerIDQueue.map(timerID => {
            clearInterval(timerID);
        });
        setTimerIDQueue([]);
    };

    return { results, status, lastTimes };
};

export default useMonitor;
