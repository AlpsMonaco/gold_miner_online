/* eslint-env node */

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (_env, _argv) => {
    const mode = process.env.NODE_ENV || "production";
    console.log(`Building ${mode}...`);

    return {
        mode,
        entry: "./js/ruffle.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "ruffle.js",
            publicPath: "",
            chunkFilename: "core.ruffle.[contenthash].js",
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.wasm$/i,
                    type: "asset/resource",
                },
            ],
        },
        devtool: "source-map",
        plugins: [
            new CopyPlugin({
                patterns: [{ from: path.resolve(__dirname, "dist/index.html") }, { from: path.resolve(__dirname, "dist/game.swf") }, { from: "LICENSE*" }, { from: "README.md" }],
            }),
        ],
    };
};
