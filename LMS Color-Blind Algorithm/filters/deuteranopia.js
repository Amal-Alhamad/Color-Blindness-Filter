// deuteranopia

if (document.getElementById("styleID")) {
    stylingID = document.getElementById("styleID").remove();
    filterID = document.getElementById("filterID").remove();
}
stylingID = document.createElement('style');
stylingID.id = "styleID";
document.body.appendChild(stylingID);

filterID = document.createElement('div');
filterID.id = "filterID";
filterID.setAttribute('style', 'height: 0; padding: 0; margin: 0; line-height: 0;');
document.body.appendChild(filterID);


filterID.innerHTML = '<svg id="colorblind-filters" style="display: none"> <defs> <filter id="deuteranopia" color-interpolation-filters="linearRGB"> <feColorMatrix type="matrix" values="0.29031,0.70969,-0.00000,0,0 0.29031,0.70969,-0.00000,0,0 -0.02197,0.02197,1.00000,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> </defs> </svg>';
stylingID.innerHTML = 'html{-webkit-filter:url(#deuteranopia);-moz-filter:(#deuteranopia);-ms-filter:(#deuteranopia);-o-filter:(#deuteranopia);filter:(#deuteranopia);}'

setTimeout(function () {
    window.scrollBy(1, 1);
    window.scrollBy(-1, -1);
}, 1);