# har-extractor

A CLI that extract har file to directory.

- [HTTP Archive (HAR) format](https://w3c.github.io/web-performance/specs/HAR/Overview.html "HTTP Archive (HAR) format")

## Install

Install with [npm](https://www.npmjs.com/):

    npm install har-extractor -g
    # or
    npx har-extractor [input]

## Usage

    Usage
      $ har-extractor <harfile> --output /path/to/output

    Options:
      --output, -o Output directory
      --dry-run Enable dry run mode
      --verbose Show processing file path

    Examples
      $ har-extractor ./net.har --output /path/to/output

## Example

Extract [test/fixtures/en.wikipedia.org.har](test/fixtures/en.wikipedia.org.har) file to directory.

```
npx har-extractor ./test/fixtures/en.wikipedia.org.har -o wikipedia
wikipedia/en.wikipedia.org/wiki/har
wikipedia/en.wikipedia.org/static/images/project-logos/enwiki-2x.png
wikipedia/en.wikipedia.org/w/load.php!debug=false&lang=en&modules=ext.cite.styles!ext.uls.interlanguage!ext.visualEditor.desktopA
wikipedia/en.wikipedia.org/w/load.php!debug=false&lang=en&modules=startup&only=scripts&skin=vector
wikipedia/en.wikipedia.org/w/load.php!debug=false&lang=en&modules=ext.gadget.charinsert-styles&only=styles&skin=vector
wikipedia/en.wikipedia.org/w/load.php!debug=false&lang=en&modules=site.styles&only=styles&skin=vector
wikipedia/en.wikipedia.org/static/images/wikimedia-button-2x.png
wikipedia/en.wikipedia.org/static/images/poweredby_mediawiki_176x62.png
wikipedia/en.wikipedia.org/w/load.php!debug=false&lang=en&modules=jquery,mediawiki!mediawiki.legacy.wikibits&only=scripts&skin=ve
wikipedia/en.wikipedia.org/static/images/mobile/copyright/wikipedia-wordmark-en.svg
```

## References

* [HAR 1.2 Spec | Software is hard](http://www.softwareishard.com/blog/har-12-spec/ "HAR 1.2 Spec | Software is hard")
* [HTTP Archive (HAR) format](https://w3c.github.io/web-performance/specs/HAR/Overview.html "HTTP Archive (HAR) format")
* [micmro/har-format-ts-declaration: TypeScript typing for HAR (HTTP Archive) 1.2](https://github.com/micmro/har-format-ts-declaration "micmro/har-format-ts-declaration: TypeScript typing for HAR (HTTP Archive) 1.2")



## Changelog

See [Releases page](https://github.com/azu/har-extractor/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/har-extractor/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
