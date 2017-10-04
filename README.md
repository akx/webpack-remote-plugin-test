Webpack Remote Plugin Test
==========================

> Voiko react-sovellus muuten ilman magiaa käydä lataamassa itseensä koodia random paikasta on-demand runtimenä?
> Eli lukee rajapinnasta jonkun määreen, käy sen perusteella nuuhkimassa toisesta paikasta (koska ei ole ensisijaisen rajapinnan asia)
> millä koodilla tuon määreen mukaista dataa luetaan, ja lopulta lataa kolmannesta paikasta tarvittavat komponentit.

...

> Onnistuu, kunhan se komponentti on käännetty sopivalla taialla.

---

The Magic
---------

There's two parts to this: 

* We compile plugins separately, using Webpack's `commonjs2` library target mode and an `externals` clause to tell Webpack
  to shim React (and, if required, other libraries – though these will have to be settled upon between the host and the plugin beforehand)
  so they're not included within plugin bundles.  The plugins simply have to `export default` their main component.

* Then, in the host, we use `fetch()` to retrieve the code, build a function out of the code (yes, basically remote code execution)
  using a custom minimal CommonJS loader (basically just passing `module`, `exports` and `require` to the function), then invoke the function –
  and voila, we have a plugin entry point (component class).
  * Naturally, when the code is on another server, CORS has to be set up properly.

After that, it's smooth sailing; we can just `<Plugin>` and the plugged-in component is mounted.

The Structure
-------------

* `webpack.config.js` imports 3 configurations; one for the host and two for plugins.
* These configurations are created using functions in `config/common.js` and merged using `webpack-merge` for brevity;
  this is not a strict requirement by no means. All that matters is that the plugins have the correct `externals` and are compiled using
  the `commonjs2` `libraryTarget`.

The optional bits:

* There's the usual Babel (`babel-loader`/`babel-preset-env`/`babel-preset-react`/`.babelrc`) configuration.
* To make `dist/` work out of the box, we also include `html-webpack-plugin`.

Usage
-----

* Install deps using `yarn` or `npm`.
* Use `yarn dev` to start the dev server; see http://127.0.0.1:8080/webpack-dev-server/host to see how things work.
* Use `yarn build` to build things into `dist/`.
  Note that you'll still need an HTTP server to host these files, as `fetch()` won't work with local files.