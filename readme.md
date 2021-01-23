# React monitor hook
A library that provides a hook for monitoring multipule endpoints with the specific interval.
This hook uses fetch and [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) to retrive resources and manage interval IDs for the developer.

## Installation and usage

The easiest way to use use-react-monitor is to install it from npm.

```s
npm i use-react-monitor
```

Then use it in your app

```javascript

import React, { useEffect } from 'react';
import useMonitor from 'use-react-monitor';

const ReduxTester = () => {
    const interval = 3000;
    const {results, status, lastTimes} = useMonitor(
        { urls:['http://rem-rest-api.herokuapp.com/api/users',
                'http://rem-rest-api.herokuapp.com/api/users',
                'http://rem-rest-api.herokuapp.com/api/users'],
          freshRate: interval});

    return (
        <div>
            {results.map((result, i) =>{
                return (
                    <>
                        <div>Last updated time: {lastTimes[i]}</div>
                        <div>Status: {status[i]}</div>
                        <ul key={i}>
                            {result.data.map((r, index) => {
                                return (<li key={index}>{r.id} {r.firstName} {r.lastName}</li>)
                            })}
                        </ul>
                    </>)
            })}
         </div>

    )
}

export default ReduxTester

```

## Parameters
* urls
* freshRate (ms)

## References
* [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
* [npm-link 與 Invalid hook call 錯誤](https://andyyou.medium.com/npm-link-%E8%88%87-invalid-hook-call-%E9%8C%AF%E8%AA%A4-7c4c204ad62e)
* [SOLVING REACT HOOKS' INVALID HOOK CALL WARNING](https://robkendal.co.uk/blog/2019-12-22-solving-react-hooks-invalid-hook-call-warning)
