import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BatchSpanProcessor } from "@opentelemetry/tracing";
import { WebTracerProvider } from "@opentelemetry/web";
import { CollectorTraceExporter } from "@opentelemetry/exporter-collector";

const collectorOptions = {
  url: "/v1/trace", // so we don't need CORS, send to a proxied endpoint
  concurrencyLimit: 10, // an optional limit on pending requests
};

const provider = new WebTracerProvider();
const exporter = new CollectorTraceExporter(collectorOptions);
provider.addSpanProcessor(
  new BatchSpanProcessor(exporter, {
    // send spans as soon as we have this many
    bufferSize: 10,
    // send spans if we have buffered spans older than this
    bufferTimeout: 500,
  })
);

provider.register();
const tracer = provider.getTracer("index.tsx");

setInterval(() => {
  tracer.startSpan("Test").end();
  console.log((exporter as any)._sendingPromises);
}, 1000);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
