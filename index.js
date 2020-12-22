const {
  BasicTracerProvider,
  BatchSpanProcessor,
} = require("@opentelemetry/tracing");
const { CollectorTraceExporter } = require("@opentelemetry/exporter-collector");

const collectorOptions = {
  serviceName: "otel-",
  headers: {
    foo: "bar",
  }, // an optional object containing custom headers to be sent with each request will only work with http
  concurrencyLimit: 10, // an optional limit on pending requests
};

const provider = new BasicTracerProvider();
const exporter = new CollectorTraceExporter(collectorOptions);
provider.addSpanProcessor(
  new BatchSpanProcessor(exporter, {
    // send spans as soon as we have this many
    bufferSize: 1000,
    // send spans if we have buffered spans older than this
    bufferTimeout: 30000,
  })
);

provider.register();
