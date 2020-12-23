class Foo {
  public _sendingPromises: Promise<void>[] = [];

  sendWithHttp(onSuccess: () => void, onError: (error: Error) => void): void {
    setTimeout(() => {
      if (Math.random() > 0.8) {
        onError(new Error('Random error'));
      } else {
        onSuccess();
      }
    }, 50);
  }

  doSomething() {
    const promise = new Promise<void>(resolve => {
      const onSuccess = () => {
        console.log('onSuccess()');
      };
      const onError = (error: Error) => {
        console.log('onError()', error);
      };

      const _onSuccess = (): void => {
        onSuccess();
        _onFinish();
      };
      const _onError = (error: Error): void => {
        onError(error);
        _onFinish();
      };
      const _onFinish = () => {
        resolve();
        const index = this._sendingPromises.indexOf(promise);
        this._sendingPromises.splice(index, 1);
      };
      setTimeout(() => {}, 50);
      this.sendWithHttp(_onSuccess, _onError);
    });

    this._sendingPromises.push(promise);
  }
}

const foo = new Foo();
setInterval(() => {
  foo.doSomething();
  console.log(foo._sendingPromises);
}, 1000);

// import {BasicTracerProvider, BatchSpanProcessor} from '@opentelemetry/tracing';
// import {CollectorTraceExporter} from '@opentelemetry/exporter-collector';

// const collectorOptions = {
//   serviceName: 'demo-problem',
//   concurrencyLimit: 5,
// };

// const provider = new BasicTracerProvider();
// const exporter = new CollectorTraceExporter(collectorOptions);
// provider.addSpanProcessor(
//   new BatchSpanProcessor(exporter, {
//     // send spans as soon as we have this many
//     bufferSize: 10,
//     // send spans if we have buffered spans older than this
//     bufferTimeout: 100,
//   })
// );

// provider.register();

// const tracer = provider.getTracer(__filename);
// setInterval(() => {
//   tracer.startSpan('testspan').end();
// }, 2000);
