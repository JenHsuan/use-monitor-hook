import { useState, useEffect, useRef } from "react";

function monitoredPropsAreEqual(prevResults, nextResults){
    return JSON.stringify(prevResults) === JSON.stringify(nextResults);
}

const useMonitor = ({urls, freshRate = 1000}) => {
    //const freshRate = 1000;
    //const [timerIDQueue, setTimerIDQueue] = useState([]);
    const timerIDQueue = useRef([]);
    const [status, setStatus] = useState('[]');
    const [results, setResults] = useState('[]');
    const lastTimes = useRef(Array(urls.length).fill(''));
    const urlsJsonString = JSON.stringify(urls);

    useEffect(() => {
        console.info(`[use-react-monitor] freshRate: ${freshRate}`);
        // Clean the timer queue
        cleanTimerIDQueue();

        if (freshRate !== 0) {
            // Set the timer
            const ID = setInterval(async() => {
                await fetchResources();
            }, freshRate);

            // Save IDs in the timer queue
            setTimerIDQueue(ID)
        } else {
            // Clean the timer queue
            cleanTimerIDQueue();
        }

        return () => {
            cleanTimerIDQueue();
        };

    }, [freshRate, urlsJsonString]);

    //Modify the length of the updated times
    useEffect(() => {
        lastTimes.current = Array(urls.length).fill('');
    }, [urlsJsonString])

    const setTimerIDQueue = (id) => {
        timerIDQueue.current.push(id);
    }

    const fetchResources = async() => {
        try{
            let current = new Date();
            let time = current.toLocaleTimeString();
            console.info(`[use-react-monitor] executed at: ${time}`);
            let res = await Promise.allSettled(urls.map(async (url, index) => {
                let t = await fetch(url);
                updateLastTime(index);
                return t.json();
            }));
            setStatus(JSON.stringify(res.map(ele => ele.status)));
            setResults(JSON.stringify(res.map(ele => ele.value)));
        } catch(error){
            console.error(error);
        }
    }

    const updateLastTime = (index) => {
        if (index >= lastTimes.current.length) {
            return;
        }

        let current = new Date();
        let time = current.toLocaleTimeString();
        console.info(`[use-react-monitor] update the last fetched time: ${time}`);
        lastTimes.current[index] = time;
    }


    const cleanTimerIDQueue = () => {
        let current = new Date();
        let time = current.toLocaleTimeString();
        console.info(`[use-react-monitor] cleanTimerIDQueue at ${time}`);
        timerIDQueue.current.map(timerID => {
            clearInterval(timerID);
        });
        timerIDQueue.current = [];
    };

    return {
        results: JSON.parse(results),
        status: JSON.parse(status),
        lastTimes: lastTimes.current
    }
};

export {
    monitoredPropsAreEqual
}

export default useMonitor;

