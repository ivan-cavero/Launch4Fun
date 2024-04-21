module.exports = (api) => {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@Navigation": "./src/navigation",
            "@Components": "./src/components",
            "@Styles": "./src/styles",
            "@Utils": "./src/utils",
            "@Hooks": "./src/hooks",
            "@Store": "./src/store",
            "@Services": "./src/services",
            "@Assets": "./assets"
          },
          extensions: [".js", ".jsx"]
        }
      ]
    ]
  }
}
