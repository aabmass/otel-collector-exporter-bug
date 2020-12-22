import {BatchSpanProcessor} from '@opentelemetry/tracing';
import {WebTracerProvider} from '@opentelemetry/web';
import {CollectorTraceExporter} from '@opentelemetry/exporter-collector';

const collectorOptions = {
  url: '/v1/trace',
  concurrencyLimit: 5,
};

const provider = new WebTracerProvider();
const exporter = new CollectorTraceExporter(collectorOptions);
provider.addSpanProcessor(
  new BatchSpanProcessor(exporter, {
    bufferSize: 10,
    bufferTimeout: 500,
  })
);

provider.register();

const tracer = provider.getTracer('index.tsx');

setInterval(() => {
  tracer.startSpan('Test').end();
  console.log((exporter as any)._sendingPromises);
}, 1000);
