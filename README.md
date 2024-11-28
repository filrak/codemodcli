# AI Codemod

**Requirement:** Node 19+


## Utilities

- `chat.js`: Uses OpenAI to chat with the user
  - `useChat(prompt)`: Sends a prompt to OpenAI and returns the response

- `files.js`: Read and write operations on files and directory to object serialization
  - `fileListToObject(fileList)`: Converts a list of file paths to an object with file contents
  - `isFile(path)`: Checks if a path points to a file
  - `directory(path).toObject()`: Converts a directory's files to an object with file contents 
  - `file(path).toString()`: Reads a file's contents as string
  - `file(path).save(content)`: Saves content to a file

- `scrapping.js`: Scrapes the content from a URL
  - `useScrapper(url, querySelector)`: Fetches HTML from URL and extracts content matching the selector

- `repo.js`: Clones a repository from a URL
  - `cloneRepository(options)`: Clones a git repo with options for URL and destination

## Setup

Install dependencies:

```bash
npm install
```

## Test case

Run it programatically:

```bash
npm run src
```

Run it via the CLI:

```bash
node cli -- 
    --repo-url=https://github.com/vuestorefront/unified-storefronts 
    --repo-copyto=playground 
    --instructions-path=/playground/instructions/01.md 
    --instructions-extractfiles=true
    --from-url=https://docs.alokai.com/storefront/modules/product-list
    --from-selector=.document-driven-page
    --workingdir=/playground/unified-storefronts/apps/storefront-unified-nuxt/ 
    --framework=nuxt
```

## TO-DO

- [ ] Test for larger modules
- [ ] Test for migration guides
- [ ] Better error handling and gracefull failure
- [ ] Ste-by-step input for the CLI
- [ ] Add claude as alternative option
- [ ] Allow for multiple agents for file processing instead of a generic one (esp. for more complex tasks)
- [x] Instructions from the URL