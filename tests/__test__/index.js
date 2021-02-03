import React, {memo} from 'react';
import useMonitor, {monitoredPropsAreEqual} from '../../src/components/useMonitor';

const Tester = ({urls, freshRate}) => {
    const refCount = React.useRef(0);
    refCount.current++;
    const interval = 3000;
    const {results, status, lastTimes} = useMonitor({ urls, freshRate });

    return (
        <>
            <div>
                {refCount.current}
            </div>
            {<MemorizedResults results = {results} status = {status}/>}
        </>
    )
}

const Results = ({ results, status}) => {
    const refCount = React.useRef(0);
    refCount.current++;
    return (
        <div>
            {refCount.current}
        </div>
    );
};

const MemorizedResults = memo(Results, monitoredPropsAreEqual);

export default Tester



