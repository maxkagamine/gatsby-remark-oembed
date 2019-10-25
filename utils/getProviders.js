const amendOptions = require("./amendOptions");
const amendProviders = require("./amendProviders");
const filterProviders = require("./filterProviders");
const fetchOembedProviders = require("./fetchOembedProviders");

module.exports = async ({ cache, reporter }, rawOptions) => {
  let providers = await cache.get("remark-oembed-providers");

  return providers || (await fetchProviders({ cache, reporter }, rawOptions));
};

const fetchProviders = async ({ cache, reporter }, rawOptions) => {
  let rawProviders;
  try {
    rawProviders = await fetchOembedProviders();
  } catch (error) {
    reporter.info(
      "gatsby-remark-oembed: Failed to fetch list of providers - using prefetched list",
      error
    );
    rawProviders = require("../.prefetched-providers.json");
  }

  try {
    const options = amendOptions(rawOptions);
    const providers = processProviders(rawProviders, options.providers);
    return await cache.set("remark-oembed-providers", providers);
  } catch (error) {
    reporter.error(
      "gatsby-remark-oembed: Failed to save providers to cache",
      error
    );
  }
};

const processProviders = (providers, providerOptions = {}) => {
  providers = amendProviders(providers, providerOptions.settings);
  return filterProviders(providers, providerOptions);
};
