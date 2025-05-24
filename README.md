# Phaser Webpack Boilerplate

A modern boilerplate for Phaser 3 games using Webpack 5. This setup provides a development environment with hot reloading and production build optimization.

## Features

- Phaser 3.24.1
- Webpack 5
- Babel for JavaScript transpilation
- Development server with hot reloading
- Production build optimization
- Asset management with CopyWebpackPlugin
- Vendor chunk splitting for better caching

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd phaser-webpack-boilerplate
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server with hot reloading:
```bash
npm run dev
```

The game will be available at `http://localhost:8080`

## Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `build` directory.

## Project Structure

```
phaser-webpack-boilerplate/
├── assets/          # Game assets (images, audio, etc.)
├── src/             # Source code
│   └── index.js     # Main entry point
├── index.html       # HTML template
├── webpack.common.js # Common webpack configuration
├── webpack.prod.js  # Production webpack configuration
└── package.json     # Project dependencies and scripts
```

## Common Issues and Solutions

### 1. Webpack Dev Server Issues

If you encounter issues with `webpack-dev-server`, make sure you're using the correct command format:

```json
// package.json
{
  "scripts": {
    "dev": "webpack serve --config webpack.common.js"
  }
}
```

The old format using `webpack-dev-server` directly is deprecated:
```json
// ❌ Don't use this
"dev": "webpack-dev-server --config webpack.common.js --watch"
```

### 2. HTML Webpack Plugin Issues

Make sure your `index.html` has the proper structure and a container for the game:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Phaser Game</title>
    <style>
      body {
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #000;
      }
    </style>
  </head>
  <body>
    <div id="game"></div> <!-- This is the container for the game -->
  </body>
</html>
```

### 3. Dependencies Version Conflicts

Make sure you're using compatible versions of webpack and its plugins:

```json
{
  "devDependencies": {
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.99.9",
    "webpack-cli": "^6.0.1",
    "webpack-dev-server": "^5.2.1"
  }
}
```

## Webpack Configuration

The boilerplate uses two webpack configurations:

1. `webpack.common.js`: Common configuration for both development and production
2. `webpack.prod.js`: Production-specific optimizations

Key features in the webpack configuration:
- Source maps for debugging
- Babel transpilation
- Asset copying
- Vendor chunk splitting
- HTML template processing