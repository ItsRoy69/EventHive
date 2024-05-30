
const checkMobileAppInstalled = (userAgent) => {
    const isAndroid = userAgent.includes('Android');
    const isIOS = userAgent.includes('iOS');
    return isAndroid || isIOS;
  };
  
  module.exports = checkMobileAppInstalled;