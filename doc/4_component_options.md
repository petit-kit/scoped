## Component options

For the `ComponentOptions` here the way to setup the component:

```javascript
{
  props: {
    attributeName: {
      type: Number|String|Boolean,
      default: 0 // default value
    }
  },
  styles: `c-slider { color: red; }`
  plugins: [timerPlugin()], // an array of plugins
  shadow: false // activate shadow DOM
}
```
