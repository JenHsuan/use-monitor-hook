import React from 'react';
import useMonitor from '../../src/components/useMonitor';

const Tester = ({urls, freshRate}) => {
    const interval = 3000;
    const {results, status, lastTimes} = useMonitor({ urls, freshRate });

    return (
        <>
            {<Results results = {results} status = {status}/>}
        </>
    )
}

const Results = ({ results, status}) => {
    const refCount = React.useRef(0);
    refCount.current++;
    return (
        <div data-testid="text-content">{refCount.current}
        </div>
    );
};

export default Tester



