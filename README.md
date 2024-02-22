[![Downloads](https://img.shields.io/npm/dt/create-r3f-app.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/create-r3f-app) [![Discord Shield](https://img.shields.io/discord/740090768164651008?style=flat&colorA=000000&colorB=000000&label=discord&logo=discord&logoColor=ffffff)](https://discord.gg/ZZjjNvJ)

# :japanese_castle: React-Three-Next starter

A minimalist starter for NextJS, @react-three/fiber and Threejs.

![](https://user-images.githubusercontent.com/2223602/192515435-a3d2c1bb-b79a-428e-92e5-f44c97a54bf7.jpg)

- TTL ~ 100ms
- First load JS ~ 79kb
- Lighthouse score of 100 (Performance, Accessibility, Best Practices, SEO)

This starter allows you to navigate seamlessly between pages with dynamic dom and/or canvas content without reloading or creating a new canvas every time. 3D components are usable anywhere in the dom. The events, dom, viewport, everything is synchronized!

### ⚫ Demo :

[![image](https://user-images.githubusercontent.com/15867665/231395343-fd4770e3-0e39-4f5c-ac30-71d823a9ef1c.png)](https://react-three-next.vercel.app/)

### How to use

#### Installation

_Tailwind is the default style. styled-components (styled) are also available._

```sh
npm create r3f-app next my-app
# npm create r3f-app <next> my-app <tailwind|styled>? -ts?
```

### :passport_control: Typescript

For typescript add the parameter `-ts` or `--typescript`:

```sh
npm create r3f-app next my-app -ts
```
# Installation

Visage is available as an [npm package](https://www.npmjs.com/package/@readyplayerme/visage).
```sh
npm install @readyplayerme/visage
```

# Documentation & examples

You can find all **code examples** of the components and their **documentation** on [our GitHub page](https://readyplayerme.github.io/visage/).

Here is the first one to get you started:
```typescript jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Avatar } from '@readyplayerme/visage';

const modelSrc = 'https://readyplayerme.github.io/visage/male.glb';

function App() {
  return (
    <Avatar modelSrc={modelSrc} />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

### Validation
Props such as `modelSrc`, `animationSrc`, `poseSrc` and `onLoadedAnimation.src` are **validated** before rendering on the scene.
Animation source props support both `.glb` and `.fbx` formats. All other props mentioned before only support `.glb`.

Examples on supported resource formats:
* URL resources
  * relative `/headwear.glb`
  * absolute `https://readyplayerme.github.io/visage/male.glb?queryParams=allowed`
* Base64 strings
  * `data:application/octet-stream;base64`
  * `data:model/gltf-binary;base64`
* Binary input such as `model/gltf-binary`
  
### :mount_fuji: Features

- [x] GLSL imports
- [x] Canvas is not getting unmounted while navigating between pages
- [x] Canvas components usable in any div of the page
- [x] Based on the App directory architecture
- [x] PWA Support

### :bullettrain_side: Architecture

Thanks to [tunnel-rat](https://github.com/pmndrs/tunnel-rat) the starter can portal components between separate renderers. Anything rendered inside the `<View/>` component of the starter will be rendered in the 3D Context. For better performances it uses gl.scissor to cut the viewport into segments.

```jsx
<div className='relative'>
  <View orbit className='relative sm:h-48 sm:w-full'>
    <Dog scale={2} />
    // Some 3D components will be rendered here
  </View>
</div>
```

### :control_knobs: Available Scripts

- `npm dev` - Next dev
- `npm analyze` - Generate bundle-analyzer
- `npm lint` - Audit code quality
- `npm build` - Next build
- `npm start` - Next start

### ⬛ Stack

- [`create-r3f-app`](https://github.com/utsuboco/create-r3f-app) &ndash; Command line tool to simplify the installation.
- [`threejs`](https://github.com/mrdoob/three.js/) &ndash; A lightweight, 3D library with a default WebGL renderer.
- [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber) &ndash; A React renderer for Threejs on the web and react-native.
- [`@react-three/drei` - Optional](https://github.com/pmndrs/drei) &ndash; useful helpers for react-three-fiber
- [`@react-three/a11y` - Optional](https://github.com/pmndrs/react-three-a11y/) &ndash; Accessibility tools for React Three Fiber
- [`r3f-perf` - Optional](https://github.com/RenaudRohlinger/r3f-perf) &ndash; Tool to easily monitor react threejs performances.

### How to contribute :

```bash
git clone https://github.com/gg-ayush/R3F-NextJS-Starter-Package.git
&& cd react-three-next && npm install
```

