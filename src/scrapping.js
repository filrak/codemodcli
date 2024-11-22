const cheerio = require('cheerio');

async function useScrapper(url, querySelector) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const extractedContent = $(querySelector).text();
    return extractedContent.trim();
  } catch (error) {
    console.error('Error scraping URL:', error);
    return null;
  }
}

// async function test () {
//   const result = await scrapUrl('https://docs.alokai.com/storefront/modules/product-list', '.document-driven-page');
//   console.log(result);
// }

// test()
module.exports = {
  useScrapper
};
