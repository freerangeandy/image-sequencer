
module.exports = function GridOverlay(options, UI) {
  
  var output;

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;
    
    function extraManipulation(pixels) {
      pixels = require('./GridOverlay')(pixels, options);
      return pixels;
    }

    function output(image, datauri, mimetype) {

      // This output is accesible by Image Sequencer
      step.output = { src: datauri, format: mimetype };

    }

    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      extraManipulation: extraManipulation,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: callback
    });

  
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
