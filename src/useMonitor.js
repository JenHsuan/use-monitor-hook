import React, { useState, useEffect, Fragment } from "react";

const useMonitor = (freshRate) => {
    const [timerIDQueue, setTimerIDQueue] = useState([]);

    useEffect(() => {
        timerIDQueue.map(timerID => {
            clearInterval(timerID);
          });
        if (freshRate !== 0) {
            const ID = setInterval(() => {

            });

        } else {
            timerIDQueue.map(timerID => {
              clearInterval(timerID);
            });
        }

    }, [freshRate]);

    return {

    }
}

export default useMonitor;
