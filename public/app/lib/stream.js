/*eslint-env browser */
import Rx from 'rx';

/**
 * The RxStream manages the connections of a new Observer/Observable pair.
 * Once initialized, the stream can be subscribed to or triggered by consumers and
 * producers.
 */
export class RxStream {
	constructor() {
		this.initStream();
	}

	initStream() {
		this.stream = new Rx.Subject();
	}

	emit(msg) {
		this.stream.onNext(msg);
		return this;
	}

	emitMsg(...args) {
		this.emit(new Msg(...args));
		return this;
	}

	listen(type) {
		return type
			? this.stream
			.filter((msg) => msg.type == type)
			.pluck('data')
			: this.stream;
	}

	close() {
		this.stream.onCompleted();
		return this;
	}
}

export class RxDataStream extends RxStream {
	intiStream() {
		this.stream = new Rx.BehaviorSubject();
	}
}

/**
 * The Msg class is used to provide structure to messages passed over an RxStream.
 */
export class Msg {
	constructor(type, data) {
		this.type = type;
		this.data = data;
	}
}

/**
 * The RxReact HOC (Higher-order component) wraps the given component to extend its functionality and take care of
 * disposing streams when the component is unmounted. It also provides a method to add a stream, which is needed to
 * enable auto-disposal.
 *
 * @param Component
 * @returns {RxEnhanced}
 * @constructor
 */
export function RxReact(Component) {
	return class RxEnhanced extends Component {
		constructor() {
			super();
			this._streams = [];
		};

		componentWillUnmount() {
			if (super.componentWillUnmount)
				super.componentWillUnmount();

			this._streams.map((stream) => stream.dispose ? stream.dispose() : stream.stream.dispose());
		}

		_addStream = (stream) => {
			this._streams.push(stream);
			return stream;
		};
	}
}
