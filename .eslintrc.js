module.exports = {
  env: {
    commonjs: true,
    node: true,
  },
  extends: ["airbnb-base"],
  rules: {
    "class-methods-use-this": "off",
  },
  plugins: ["prettier"],
};
