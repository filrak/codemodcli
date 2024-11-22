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

module.exports = {
  useScrapper
};
