// tritanopia

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

filterID.innerHTML = '<svg id="colorblind-filters" style="display: none"> <defs> <filter id="tritanopia" color-interpolation-filters="linearRGB"> <feColorMatrix type="matrix" values="1.00000,0.15236,-0.15236,0,0 0.00000,0.86717,0.13283,0,0 -0.00000,0.86717,0.13283,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> </defs> </svg>';
stylingID.innerHTML = 'html{-webkit-filter:url(#tritanopia);-moz-filter:(#tritanopia);-ms-filter:(#tritanopia);-o-filter:(#tritanopia);filter:(#tritanopia);}'
setTimeout(function() {
    window.scrollBy(1, 1);
    window.scrollBy(-1, -1);
}, 1);