(e=>{console.log("Tracking-Skript startet!");const{document:{referrer:t},location:{host:o,pathname:i},navigator:{language:n,platform:r,userAgent:a,maxTouchPoints:s,msMaxTouchPoints:c},screen:{width:d,height:h}}=e,g=e.document.querySelector("script[data-identifier]");var u;!g||navigator.doNotTrack?console.log("Do Not Track ist aktiviert! \nEs werden keine Daten zu Wapplytics gesendet!"):(e={userAgent:a,touchpoints:{maxTouchPoints:s,msMaxTouchPoints:c},os:r,screen:{width:d,height:h},language:n,referrer:t,website:o,path:i,identifier:g.dataset.identifier},u=new URL(g.src).origin,fetch(u+"/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),mode:"cors"}))})(window);