# NodeJS is multi-thread

It’s very common we read about NodeJS as being “single-thread”, and this statement is not true. When someone says this, in most cases, they are talking about the V8. 

V8 is the runtime of NodeJS, responsible for interpreting the JS code, managing the memory, and ensuring the non-blocking operation… but, the V8 is not responsible for communicating directly with SO, nor for doing I/O Operations. For those cases, NodeJs use Libuv, written in C++

Libuv uses, by default, 4 threads. This can be configurable using the `UV_THREADPOOL_SIZE` environment variable. Async codes can run parallel in different threads

With this, We can say that NodeJS is Multi-thread, and I can prove it. Check the test repo link on the first comment.

This project ran a very expensive function 4 times, in parallel. Change the `UV_THREADPOOL_SIZE` for different values and see what magic happens. I ran with my laptop, which has 4 core

```jsx
$ UV_THREADPOOL_SIZE=1 node index.js
//output 
// 1:  700
// 2:  1394
// 3:  2096
// 4:  2790

$ UV_THREADPOOL_SIZE=2 node index.js
//output 
// 1:  700
// 2:  707
// 3:  1386
// 4:  1390

$ node index.js  
//DEFAULT: 4 threads
//output 
// 1:  695
// 2:  705
// 3:  706
// 4:  706
```

## References

https://tech.jotform.com/unraveling-the-javascript-execution-pipeline-understanding-v8-event-loop-and-libuv-for-4da6789fcfc2

https://www.udemy.com/course/advanced-node-for-developers/