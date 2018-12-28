const httpsGet = require('./https_get');
const findScriptUrls = require('./find_script_urls');
const { makeProgress } = require('./log');

const getBundlesFromHtml = async (url) => {
  const gettingHtml = makeProgress(`Getting source from URL ${url}`);
  let html;
  try {
    html = await httpsGet(url);
    gettingHtml.done();
  } catch (err) {
    gettingHtml.error(err);
    throw err;
  }

  let scriptUrls;
  const findingBundles = makeProgress('Finding bundles');
  try {
    scriptUrls = findScriptUrls(url, html);
    findingBundles.done(`Found ${scriptUrls.length} bundles.`);
  } catch (err) {
    findingBundles.error(err);
    throw err;
  }

  return scriptUrls;
};

module.exports = getBundlesFromHtml;
