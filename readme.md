# React monitor hook
A library that provides a hook for monitoring multipule endpoints with the specific interval.
This hook uses [fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API) and [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) to retrive resources and manage interval IDs for the developer.

![demo](https://raw.githubusercontent.com/JenHsuan/use-monitor-hook/master/demo/screen-shot.png)

## Installation and usage

The easiest way to use use-react-monitor is to install it from npm.

```s
npm i use-react-monitor
```

Then use it in your app

```javascript

import React, { useEffect } from 'react';
import useMonitor from 'use-react-monitor';

const Tester = () => {
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
                        <div key={`lastTime-${i}`}>Last updated time: {lastTimes[i]}</div>
                        <div key={`status-${i}`}>Status: {status[i]}</div>
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

export default Tester

```

### Also provide the shallowly compare function to support React.memo

``` javascript

import React, {memo} from 'react';
import useMonitor, {monitoredPropsAreEqual} from 'use-react-monitor';

const Tester = () => {
    const interval = 3000;
    const {results, status, lastTimes} = useMonitor(
        { urls:['http://rem-rest-api.herokuapp.com/api/users',
                'http://rem-rest-api.herokuapp.com/api/users'],
          freshRate: interval});

    return (
        <>
            {<MemorizedResults results = {results} status = {status}/>}
        </>
    )
}

const Results = ({ results, status}) => {
    const refCount = React.useRef(0);
    refCount.current++;
    return (
        <div>
        <p>
       {`render time: ${refCount.current}`}
        </p>
        {results && results.map((result, i) =>{
            return (
                <>
                    <div key={`status-${i}`}>Status: {status && status[i]}</div>
                    <ul key={i}>
                        {result.data.map((r, index) => {
                            return (<li key={index}>{r.id} {r.firstName} {r.lastName}</li>)
                        })}
                    </ul>
                </>)
        })}
     </div>
    );
};

const MemorizedResults = memo(Results, monitoredPropsAreEqual);

export default Tester

```

* [The repository of the example to use use-react-monitor ](https://github.com/JenHsuan/example-use-monitor-hook)


## Parameters
* urls
* freshRate (ms)

## Release notes
### 1.1.30: add the unit test case (Jest)
* 1.0.2: modify the readme.md
* 1.0.1: add a reference
### 1.0.0: initialization

## References
* [How to create a customized React hook package and publish it to npm?](https://medium.com/a-layman/how-to-create-a-customized-react-hook-package-and-publish-it-to-npm-4fa966359c7b)
* [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
* [npm-link 與 Invalid hook call 錯誤](https://andyyou.medium.com/npm-link-%E8%88%87-invalid-hook-call-%E9%8C%AF%E8%AA%A4-7c4c204ad62e)
* [SOLVING REACT HOOKS' INVALID HOOK CALL WARNING](https://robkendal.co.uk/blog/2019-12-22-solving-react-hooks-invalid-hook-call-warning)

## About
* [Author](https://jenhsuan.github.io/ALayman/profile.html)
* [100DaysOfCode](https://dev.to/jenhsuan)
* [Medium](https://medium.com/a-layman)
