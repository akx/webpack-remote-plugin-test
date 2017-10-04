import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const css = `
  body, input, button {
    font: 14pt sans-serif;
  }
  input {
    display: block;
  }
`;

function loadPluginFromString(modules, code) {
  const exports = {};
  const module = { exports };
  const argNames = ['module', 'exports', 'require'];
  const argValues = [
    module,
    exports,
    name => {
      if (!modules[name]) throw new Error('unknown module ' + name);
      return modules[name];
    },
  ];
  // DANJER ZONE (new Function is equivalent to eval)
  const builder = Function.constructor.apply(null, argNames.concat(code));
  builder.apply(this, argValues);
  return module.exports.__esModule ? module.exports.default : module.exports;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: 'So long, and thanks for all the fish',
    };
    this.plugins = {};
  }

  loadPlugin(name, url) {
    fetch(url)
      .then(resp => {
        if (!resp.ok) throw new Error(`failed to load plugin from ${url}`);
        return resp;
      })
      .then(resp => resp.text())
      .then(code => {
        const entryPoint = loadPluginFromString({ react: React }, code);
        this.plugins[name] = entryPoint;
        this.forceUpdate(); // CBA to put the plugins in the state :)
      })
      .catch(error => {
        this.setState({ error });
        throw err;
      });
  }

  render() {
    const { Plugin1, Plugin2 } = this.plugins;
    return (
      <div>
        <style>{css}</style>
        <h1>Plugin Test</h1>
        <input value={this.state.text} onChange={e => this.setState({ text: e.target.value })} />
        <button onClick={() => this.loadPlugin('Plugin1', './plugin1.js')}>Load Plugin 1</button>
        <button onClick={() => this.loadPlugin('Plugin2', './plugin2.js')}>Load Plugin 2</button>
        <div>Plugins loaded: {JSON.stringify(Object.keys(this.plugins).sort())}</div>
        <div>Last error: {this.state.error || 'none'}</div>
        <hr />
        {Plugin1 ? <Plugin1 text={this.state.text} /> : null}
        <hr />
        {Plugin2 ? <Plugin2 text={this.state.text} /> : null}
      </div>
    );
  }
}

const root = document.createElement('main');
document.body.appendChild(root);

ReactDOM.render(<App />, root);
