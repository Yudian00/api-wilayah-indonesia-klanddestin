module.exports = {
    apps: [{
        name: "API Wilayah Indonesia",
        script: "build/src/index.js",
        node_args: "-r dotenv/config",
        env: {
            DOTENV_CONFIG_PATH: "./.env"
        }
    }],
}