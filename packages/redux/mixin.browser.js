const React = require('react');
const Redux = require('redux');
const ReduxThunkMiddleware = require('redux-thunk').default;
const ReactRedux = require('react-redux');
const { Mixin } = require('@untool/core');

class ReduxMixin extends Mixin {
  constructor(config, element, options) {
    super(config, options);
    this.options = options;

    this.middlewares = options.middlewares || [ReduxThunkMiddleware];

    if (module.hot) {
      this.store = global.store || (global.store = this.createStore());
      Object.entries(options.reducers).forEach(([key, reducer]) => {
        this.store.replaceReducer(Redux.combineReducers(options.reducers));
      });
    } else {
      this.store = this.createStore();
    }
  }

  createStore() {
    return Redux.createStore(
      Redux.combineReducers(this.options.reducers),
      global.REDUX_STATE,
      this.composeEnhancers(...this.applyMiddlewares())
    );
  }

  getMiddlewares() {
    return this.middlewares;
  }

  applyMiddlewares() {
    return this.getMiddlewares().map(m => Redux.applyMiddleware(m));
  }

  composeEnhancers(...enhancers) {
    return Redux.compose(...enhancers);
  }

  enhanceElement(reactElement) {
    return React.createElement(
      ReactRedux.Provider,
      { store: this.store },
      reactElement
    );
  }
}

module.exports = ReduxMixin;
