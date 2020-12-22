# Run

```bash
npm install
npm run dev
```

Then click the link to open browser and watch the console.

```
index.ts:25 []
index.ts:25 [Promise]
index.ts:25 (2) [Promise, Promise]
index.ts:25 (3) [Promise, Promise, Promise]
index.ts:25 (4) [Promise, Promise, Promise, Promise]
index.ts:25 (5) [Promise, Promise, Promise, Promise, Promise]
ConsoleLogger.ts:40 {"stack":"Error: Concurrent export limit reached\n    at CollectorTraceExporter.export (http://localhost:1234/index.e6222032.js:7047:24)\n    at http://localhost:1234/index.e6222032.js:6129:38\n    at StackContextManager.with (http://localhost:1234/index.e6222032.js:6574:20)\n    at ContextAPI.with (http://localhost:1234/index.e6222032.js:2368:46)\n    at http://localhost:1234/index.e6222032.js:6125:31\n    at new Promise (<anonymous>)\n    at BatchSpanProcessor._flush (http://localhost:1234/index.e6222032.js:6123:16)\n    at http://localhost:1234/index.e6222032.js:6145:18","message":"Concurrent export limit reached","name":"Error"}
ConsoleLogger.error @ ConsoleLogger.ts:40
(anonymous) @ logging-error-handler.ts:29
exports.globalErrorHandler @ global-error-handler.ts:38
(anonymous) @ BatchSpanProcessor.ts:134
Promise.catch (async)
(anonymous) @ BatchSpanProcessor.ts:133
setTimeout (async)
_maybeStartTimer @ BatchSpanProcessor.ts:132
_addToBuffer @ BatchSpanProcessor.ts:95
onEnd @ BatchSpanProcessor.ts:68
onEnd @ MultiSpanProcessor.ts:58
end @ Span.ts:185
(anonymous) @ index.ts:24
setInterval (async)
4ULxf.@opentelemetry/tracing @ index.ts:23
newRequire @ index.e6222032.js:69
(anonymous) @ index.e6222032.js:118
(anonymous) @ index.e6222032.js:141
```
