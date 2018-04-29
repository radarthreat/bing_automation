module.exports = {
  checkRewards: async (browser) => {
    const page = await browser.newPage();
    await page.goto('https://account.microsoft.com/rewards/pointsbreakdown');
    const statusSelector = '.pointsDetail';
    const status = {};
    try {
      const resultNodes = await page.evaluate(`document.querySelectorAll(${statusSelector})`);
      const pcPoints = resultNodes[3].innerText;
      const mobilePoints = resultNodes[5].innerText;
      status.pcStatus = pcPoints;
      status.mobileStatus = mobilePoints;
    } catch (err) {
      status.error = err;
    }

    return JSON.stringify(status);
  },
}