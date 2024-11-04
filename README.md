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
    --workingdir=/playground/unified-storefronts/apps/storefront-unified-nuxt/ 
    --framework=nuxt
```