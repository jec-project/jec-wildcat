# JEC Wildcat Project

Wildcat is the built-in archetype manager of the [GlassCat Application Server][jec-glasscat-url].
It allows developers to easily deploy EJP applications in [GlassCat][jec-glasscat-url].

[![][jec-logo]][jec-url]

## Requirements

JEC Wildcat needs the following system parameters in order to work correctly:

- Node 6+
- npm 3+
- TypeScript 2+

## Installation

Set up the JEC Wildcat module with:

```bash
$ npm install jec-wildcat --save
```

## Running Tests

To execute all unit tests, use:

```bash
$ npm test
```

## API Reference

The API Reference documentation is not included into the JEC Wildcat node module. To build the API reference documentation, use:

```bash
$ grunt doc
```

Documentation will be generated in the `docs/api-reference` repository.
The online version of the  API reference documentation will be available soon at the JEC Website.

The documentation generator is [TypeDoc](http://typedoc.org/)

## Update Release Notes

**Current stable release:** [1.0.1](CHANGELOG.md#jec-wildcat-1.0.1)
 
For a complete listing of release notes for all JEC Wildcat update releases, see the [CHANGELOG](CHANGELOG.md) file. 

## License
This JEC Wildcat Project is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).

```
Copyright 2016-2017 Pascal ECHEMANN.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[jec-url]: https://github.com/pechemann/JEC
[jec-glasscat-url]: https://github.com/pechemann/jec-glasscat
[jec-logo]: https://raw.githubusercontent.com/pechemann/JEC/master/assets/jec-logos/jec-logo.png