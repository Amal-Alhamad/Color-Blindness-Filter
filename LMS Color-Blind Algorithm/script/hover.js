

const makeCssStyles = type =>
  `#rainbow{-webkit-filter:url(#${type});-moz-filter:(#${type});-ms-filter:(#${type});-o-filter:(#${type});filter:(#${type});}`;
const makeSVGFilter = (type, filterValues) =>
  `<svg id="colorblind-filters" style="display: none"> <defs> <filter id="${type}" color-interpolation-filters="linearRGB"> <feColorMatrix type="matrix" values="${filterValues}" in="SourceGraphic" /> </filter> </defs> </svg>`;


  // global to hold the innerhtml of the colorblind filters. each filter has a filterSVG and filterStyles
const filters = {
  

  deuteranopiaSVG: makeSVGFilter(
    "deuteranopia",
    "0.29031,0.70969,-0.00000,0,0 0.29031,0.70969,-0.00000,0,0 -0.02197,0.02197,1.00000,0,0 0,0,0,1,0"
  ),
  deuteranopiaStyles: makeCssStyles("deuteranopia"),

  protanopiaSVG: makeSVGFilter(
    "protanopia",
    "0.10889,0.89111,-0.00000,0,0 0.10889,0.89111,0.00000,0,0 0.00447,-0.00447,1.00000,0,0 0,0,0,1,0"
  ),
  protanopiaStyles: makeCssStyles("protanopia"),

  tritanopiaSVG: makeSVGFilter(
    "tritanopia",
    "1.00000,0.15236,-0.15236,0,0 0.00000,0.86717,0.13283,0,0 -0.00000,0.86717,0.13283,0,0 0,0,0,1,0"
  ),
  tritanopiaStyles: makeCssStyles("tritanopia")
};

function applyFilter(filter) {
  
  // remove any currently applied filters
  if (
    document.getElementById("styleID") &&
    document.getElementById("filterID")
  ) {
    document.getElementById("styleID").remove();
    document.getElementById("filterID").remove();
  }
 
  // get the SVG and styles from the filters object in the global scope
  filterID.innerHTML = filters[filter + "SVG"];
  stylingID.innerHTML = filters[filter + "Styles"];
  // scrollBy event to force an update to the dom, fixes an issue where the SVG filter does not apply until the screen changes
  setTimeout(function() {
    window.scrollBy(1, 1);
    window.scrollBy(-1, -1);
  }, 1);
}

// checks for a valid filter name and calls the applyFilter() function to add the filter
function selectFilter(evt) {
  if (!evt) return;

  const filter = getID(evt.target);
  console.log("applying filter ", filter);
  if (!filter) return;
  applyFilter(filter);
}

function getID(element) {
  let filterID = element.id.replace("option-", "");
  // return ID if it exists OR if the element is a child of the div (get its parent)
  return !!filterID ? filterID : getID(element.parentNode);
}

// remove the currently rendered filter 
function removeFilter(evt) {
  if (!evt) return;

  const filter = getID(evt.target);
  console.log("removing filter ", filter);
  if (!filter) return;

  stylingID = document.getElementById("styleID");
  filterID = document.getElementById("filterID");
  if (stylingID && filterID) {
    stylingID.remove();
    filterID.remove();
  }
}
// get all divs containing that match the querySelector pattern below
const options = document.querySelectorAll('[id^="option-"]');

// iterate through all of the divs containing the radio buttons and labels
options.forEach(option => {
  option.addEventListener("mouseover", selectFilter, false);
  option.addEventListener(
    "mouseout",
    evt => {
      removeFilter(evt);
      // re-apply the currently selected filter
      if (window.selectedFilter) applyFilter(window.selectedFilter);
    },
    false
  );
});
