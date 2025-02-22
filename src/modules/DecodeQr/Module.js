/*
 * Decodes QR from a given image.
 */
module.exports = function DoNothing(options, UI) {

  var output;
  var jsQR = require('jsqr');
  var getPixels = require('get-pixels');

  // This function is called everytime a step has to be redrawn
  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    getPixels(input.src, function(err, pixels){

      if(err) throw err;

      var w = pixels.shape[0];
      var h = pixels.shape[1];
      var decoded = jsQR(pixels.data, w, h);


      // Tell Image Sequencer that this step is complete
      options.step.qrval = (decoded) ? decoded.data : 'undefined';
    });

    function output(image, datauri, mimetype){
      // This output is accessible by Image Sequencer
      step.output = {
        src: datauri,
        format: mimetype
      };
    }
    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      format: input.format,
      image: options.image,
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
