
window.onload = function () {
  localStorage.getItem(["key"], function (result) {
    try {
      document.getElementById(result.key).click();
    } catch (e) {
      console.log(e);
    }
  });
};

function setSelected(value) {
  try {
    console.log("dsdds" + localStorage.getItem(["key"]));
    localStorage.setItem({ key: value }, function () {
      document.getElementById(value).checked = true;
    });
  } catch {}
}

function injectFilter(fileName) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var script = document.createElement("script");
      script.src = fileName;
      document.body.appendChild(script);
      console.log(script.src);
    }
  };
  xhttp.open("GET", "S_page.html", true);
  xhttp.send();
}

document.querySelectorAll(['[id^="radio"]']).forEach((radioButton) => {
  const filter = radioButton.parentElement.id.replace("option-", "");
  radioButton.addEventListener("click", function () {
    // page-specific filters
    setSelected(radioButton.id);
    console.log(filter);
    injectFilter(`./filters/${filter}.js`);
    
  });
});
