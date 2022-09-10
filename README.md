# har-extractor-easy

Based on [har-extractor](https://github.com/azu/har-extractor) by [azu](https://github.com/azu).

In addition, this fork will:

1. Ensure filenames are unique so you dont lose queries
2. By default, does not require a output directory parameter and will create a new unique folder in the current directory
3. Ensures js mimetypes have the right file extension (via mime-db)
4. Can prettify JSON files (application/json)

A CLI that extract har file to directory.

-   [HTTP Archive (HAR) format](https://w3c.github.io/web-performance/specs/HAR/Overview.html "HTTP Archive (HAR) format")

## Install

Install with [npm](https://www.npmjs.com/):

    npm i -g har-extractor-easy
    # or
    npx har-extractor-easy [input]

## Usage

    Usage
      $ har-extractor-easy <harfile>

    Options:
      --output, -o Output directory (Default = ./[harfile-name])
      --remove-query-string, -r Remove query string from file path (Default = true)
      --dry-run Enable dry run mode (Default = false)
      --verbose Show processing file path (Default = true)
      --pretty Prettifies JSON files (Default = true)

    Examples
      $ har-extractor-easy ./net.har
      (Extracts to new directory with same name as har file eg. ./net-har/)

If you wish to run this tool after cloning, the cmd.js file is +x and will be run using node. Eg:

```sh
  $ ./bin/cmd.js ~/myHar.har
```

## Example

Extract [test/fixtures/en.wikipedia.org.har](test/fixtures/en.wikipedia.org.har) file to directory.

```
npx har-extractor-easy ./test/fixtures/en.wikipedia.org.har -o wikipedia
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

-   [HAR 1.2 Spec | Software is hard](http://www.softwareishard.com/blog/har-12-spec/ "HAR 1.2 Spec | Software is hard")
-   [HTTP Archive (HAR) format](https://w3c.github.io/web-performance/specs/HAR/Overview.html "HTTP Archive (HAR) format")
-   [micmro/har-format-ts-declaration: TypeScript typing for HAR (HTTP Archive) 1.2](https://github.com/micmro/har-format-ts-declaration "micmro/har-format-ts-declaration: TypeScript typing for HAR (HTTP Archive) 1.2")

## Changelog

See [Releases page](https://github.com/aceslick911/har-extractor-easy/releases).

## Running tests

Install devDependencies and Run `npm test`:

    yarn && yarn test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/aceslick911/har-extractor-easy/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

-   [github/aceslick911](https://github.com/aceslick911)

## Original Author

-   [github/azu](https://github.com/azu)
-   [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © aceslick911
