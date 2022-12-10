((window) => {
  console.log("Tracking-Skript startet!");
  const {
    document: { referrer },
    location: { host, pathname },
    navigator: { language, platform, userAgent, maxTouchPoints, msMaxTouchPoints },
    screen: { width, height },
  } = window;
  const script = window.document.querySelector("script[data-identifier]");

  if (!script || navigator.doNotTrack) {
    console.log("Do Not Track ist aktiviert! \nEs werden keine Daten zu Wapplytics gesendet!");
    return;
  }

  const sendData = () => {
    const data = {
      userAgent: userAgent,
      touchpoints: { maxTouchPoints, msMaxTouchPoints },
      os: platform,
      screen: { width, height },
      language: language,
      referrer: referrer,
      website: host,
      path: pathname,
      identifier: script.dataset.identifier,
    };
    console.log("Data:", data);
    const wapplytics = new URL(script.src).origin;
    const api = "/api/track";
    fetch(wapplytics + api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
    });
  };
  // CORS Serverseitig aktivieren Cross-Origin Requests
  sendData();
})(window);
