# AI Codemod

**Requirement:** Node 19+
Install dependencies:

```bash
npm install
```

Then to run it programatically:

```bash
npm run src
```

Or to run it via the CLI:

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
- [x] Instructions from the URL