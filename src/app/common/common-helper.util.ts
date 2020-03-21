export class CommonHelperUtil {

  static getBase64Image(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }
  // eg.
  // const base64 = getBase64Image(document.getElementById('imageid'));

  static convertSvgToBase64Image() {
    const svg = new XMLSerializer().serializeToString(document.getElementsByTagName('svg')[0]);
    const base64 = window.btoa(svg);
    document.getElementById('base').appendChild(document.createTextNode('data:image/svg+xml;base64,' + base64));
  }
  // eg.
  // <div id="base"></div>
  //  <svg viewBox="0 0 1226 1481">
  //  <path d="M0 1394V87C0 46.3 13.3 19.8 40 7.5 66.7-4.8 98.7.3 136 23l1034 634c37.3 22.7 56 50.3 56 83s-18.7 60.3-56 83L136 1458c-37.3 22.7-69.3 27.8-96 15.5-26.7-12.3-40-38.8-40-79.5z" fill="red"/>
  // </svg>


  /**
 * Convert an image
 * to a base64 url
 * @param  {String}   url
 * @param  {Function} callback
 * @param  {String}   [outputFormat=image/png]
 */
  static convertImgToBase64URL(url, callback, outputFormat) {
    // outputFormat = outputFormat || 'image/png';
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      let canvas: any = document.createElement('CANVAS');
      let ctx = canvas.getContext('2d'), dataURL;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      canvas = null;
    };
    img.src = url;
  }

}
