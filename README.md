# Archifiltre

## Contributing

### Launching the app

First install the dependencies

```bash
yarn
```

Then build the project

```bash
yarn buildDev
```
or
```bash
yarn watchBuildDev
```

Then launch the application

```bash
yarn electron
```

### AutoReloading

You can also use autoreloading, using

```bash
yarn devServer
```

```bash
yarn electron-server
```

and then, reload your electron app with the refresh command (`CMD + R` on OSX)

### Pull requests

If you want to contribute, you must respect our linter specs. You can run `yarn lint` for compliance test.

You are welcome to open pull requests to add features to the project.


### Building/releasing the app.

First, prepare the build in production mode

```bash
yarn prepareProd
```

Then you can package the app for the right platform:

```bash
yarn win32
yarn win64
yarn mac
yarn linux
```

Or you can prepare the build and build for all four platforms with one command:

```bash
yarn buildProd
```

Once built, production binaries are found in the dist folder, each in their corresponding platform's subfolder.