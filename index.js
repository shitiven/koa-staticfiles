'use strict';

/**
  Serves files from specified directory at specified path or from root.
  Supports 'index' file.
  @param {String} rootDir
  @param {Object} opts
  @return {Object} - {Function} serve
  @api public
*/

const path = require("path");
const assert = require("assert");
const send = require("koa-send");

module.exports = function(rootDir, opts) {

    opts = opts || {};
    assert(rootDir, 'rootDir is required to serve files');
    assert.strictEqual(typeof rootDir, "string", "rootDir must be specified")

    if (opts.prefix) {
        assert.equal(opts.prefix.charAt(0), "/", "prefix must start with '/'")
    }

    opts.root = path.resolve(rootDir);
    opts.index = opts.index || "index.html";    

    return function serve(ctx, next) {

        return next().then(() => {

            if (ctx.method != 'HEAD' && ctx.method != 'GET') return;
            if (ctx.body != null || ctx.status != 404) return;

            if (!opts.prefix) {
                return send(ctx, ctx.path, opts);
            } 

            /* Serve folders as specified
             eg. :
                rootDir = 'WEBAPP/public'
                opts.prefix = '/static'
            'WEBAPP/static/file.txt' will be served as 'http://server/static/file.txt'
            */

            // Redirect non-slashed request to slashed
            // eg. /doc to /doc/

            if (ctx.path == opts.prefix) {
                return ctx.redirect(path.normalize(opts.prefix + "/"));
            }

            let prefixRegx = new RegExp("^" + opts.prefix);
            ctx.path = path.normalize(ctx.path.replace(prefixRegx, "/"));
            return send(ctx, ctx.path, opts);

        })
        
    }

}