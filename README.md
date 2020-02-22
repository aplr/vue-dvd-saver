# Vue DVD Saver

Your beloved nostalgic screensaver for your beloved JavaScript Framework.

[Will it hit the corner?](https://www.youtube.com/watch?v=QOtuX0jL85Y)

## Quick Start

### Install

You can install `vue-dvd-saver` either using a package manager or by including the script in your html.

#### Package Manager

```bash
npm install vue-dvd-saver
```

```bash
yarn install vue-dvd-saver
```

#### Unpkg

```html
<script src="https://www.unpkg.com/vue-dvd-saver@latest/dist/dvdSaver.umd.min.js">
```

### Basic Usage

```vue
<template>
    <div>
        <ScreenSaver class="screenSaver" />
    </div>
</template>

<script>
import ScreenSaver from "vue-dvd-saver";

export default {
    components: {
        ScreenSaver
    }
}
</script>

<style>
.screenSaver {
    width: 100%;
    height: 100%;
}
</style>
```

## Local development

### Project setup

```bash
npm install
```

### Compile, hot-reload and run dev-server for development

```bash
npm run serve
```

### Compile and minify for production

```bash
npm run build
```

### Compile and minify docs

```bash
npm run docs
```

### Lint and fix files

```bash
npm run lint
```
