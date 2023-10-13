 
 // get the canvas and context
 var canvas = document.getElementById('canvas');
 var ctx = canvas.getContext('2d');

 // get the file input element
 var fileInput = document.getElementById('file');

 // create an image object
 var image = new Image();

 // when the file input changes, load the image
fileInput.addEventListener('change', function() {
  try {
    // check if the file is an image
    if (!fileInput.files[0].type.startsWith('image/')) {
      throw new Error('File is not an image');
    }

    image.src = URL.createObjectURL(this.files[0]);
  } catch (e) {
    // handle the error
    console.error(e.message);
    alert('Error: ' + e.message);
  }

});

// when the image is loaded, draw it to the canvas
image.addEventListener('load', function() {
  try {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  } catch (e) {
  console.error('An error occurred while trying to load the image: ', e);
  alert('Error: Only image files can be uploaded. Please try again.');
  }
   // set the canvas size to the image size
   applyLMS();

 } );


const lToR =  [
[0.0809 , -0.1305, 0.1167 , 0],
[-0.0102, 0.0540 , -0.1136, 0],
[-0.0003, -0.0041, 0.6932 , 0],
[0 , 0 , 0 , 1]
];

const rToL = [
[17.8824, 43.5161, 4.1193, 0],
[3.4557, 27.1554, 3.8671, 0],
[0.02996, 0.18431, 1.4700, 0],
[0, 0, 0, 1]
];

const tritanopia = [
[1, 0, 0, 0],
[0, 1, 0, 0],
[0, 0.05, 0, 0],
[0, 0, 0, 1]
];


const deuteranopia = [
[1, 0, 0, 0],
[0.4942, 0, 1.2483, 0],
[0, 0, 1, 0],
[0, 0, 0, 1]
];

const protanopia = [
[0, 2.02344, -2.52581, 0],
[0, 1, 0, 0],
[0, 0, 1, 0],
[0, 0, 0, 1]
];





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
  xhttp.open("GET", "C_page.html", true);
  xhttp.send();
}

document.querySelectorAll(['[id^="radio"]']).forEach((radioButton) => {
  const filter = radioButton.parentElement.id.replace("option-", "");
  radioButton.addEventListener("click", function () {

    setSelected(radioButton.id);
    console.log(filter);
    
	if(filter == "deuteranopia")
	{
		target = deuteranopia;
	} else if (filter == "tritanopia")
	{
		target = tritanopia;
	} else if(filter == "protanopia")
	{
		target = protanopia;
	}
    applyLMS()
  });
});


function applyLMS() {
  canvas.width = image.width;
  canvas.height = image.height;
  // draw the image to the canvas 
  ctx.drawImage(image, 0, 0, image.width, image.height);
  let data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.putImageData(applyLMSColorCorrection(data), 0, 0);
}

function multiply(vector, matrix) {
    return [
        vector[0] * matrix[0][0] + vector[1] * matrix[0][1] + vector[2] * matrix[0][2] + vector[3] * matrix[0][3],
        vector[0] * matrix[1][0] + vector[1] * matrix[1][1] + vector[2] * matrix[1][2] + vector[3] * matrix[1][3],
        vector[0] * matrix[2][0] + vector[1] * matrix[2][1] + vector[2] * matrix[2][2] + vector[3] * matrix[2][3],
        vector[0] * matrix[3][0] + vector[1] * matrix[3][1] + vector[2] * matrix[3][2] + vector[3] * matrix[3][3],
    ];
}
 function applyLMSColorCorrection(imageData) {
  // Get the width and height of the image
  const width = imageData.width;
  const height = imageData.height;
  // Get the pixel data as a typed array
  const data = imageData.data;
  // Loop over each pixel in the image
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Calculate the index of the current pixel in the data array
      const index = (y * width + x) * 4;
      // Get the RGB values of the pixel
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
    // Apply the LMS color correction algorithm to the RGB values
    // Convert to float 0-1 range
    let colors = [r/255, g/255, b/255, 1]
    // Multiply matrices
    colors = multiply(multiply(multiply(colors, rToL), target), lToR);
    // Convert from float to 0 - 255 range
    values = colors.map(v => Math.floor(v*255))
      // Update the pixel data with the corrected RGB values
      data[index] = values[0];
      data[index + 1] = values[1];
      data[index + 2] = values[2];
    }
  }

  // Return the modified image data
  return imageData;
}