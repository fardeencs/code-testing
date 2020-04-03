import * as jsPDF from 'jspdf';

export class jsPDFUtil {

  static createSquare(
    pdf: jsPDF,
    rectY: any,
    rectX: any,
    length: number,
    flag = false
  ) {
    const pdfPageWidth = pdf.internal.pageSize.width - rectX;
    rectY = rectY + 50;
    let sqrX = rectX;
    for (let index = 0; index < length; index++) {
      pdf.rect(sqrX, rectY, 19, 19);
      if (flag) {
        pdf.setFontSize(12);
        pdf.text(index.toString(), sqrX + 6, rectY + 13);
      }
      sqrX += pdfPageWidth / length;
    }
  }

  static centeredText(doc: jsPDF, text: string, y: number) {
    const textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
  }

  static centeredText2(doc: jsPDF, text: string, rectX: number, cordY: number, leftTxtWidth: number, rightTxtWidth: number): number {
    const pdfPageWidth = doc.internal.pageSize.width;
    const txtMaxWidth = (pdfPageWidth - (leftTxtWidth + rightTxtWidth + 50));
    // const textWidth = ((txtMaxWidth * doc.internal.getFontSize()) / doc.internal.scaleFactor);
    // const textOffset = (pdfPageWidth - textWidth) / 2;
    doc.text(text, leftTxtWidth + rectX + 5, cordY + 3, { maxWidth: txtMaxWidth, align: 'justify' });
    return txtMaxWidth;
  }

  static inLineText(doc: jsPDF, text: string, y: number) {
    const textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
  }

  static getTextWidth(doc: jsPDF, text: string): any {
    return (
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor
    );
  }

  static addPage(pdf, cordY): number {
    const pdfPageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
    if (cordY > pdfPageHeight) { pdf.addPage(); }

    cordY += 20;
    return cordY;
  }

  static drawRow(
    pdf: jsPDF,
    text: string,
    cordY: any,
    leftLbl: string,
    rightLbl: string,
    rightGap: number
  ): void {
    const rectX = 40;
    const pdfPageWidth = pdf.internal.pageSize.width;
    const lblEnW = this.getTextWidth(pdf, leftLbl);
    pdf.setFontSize(10);
    pdf.text(leftLbl, rectX, cordY);
    this.centeredText(pdf, text, cordY);
    pdf.setFontSize(10);
    pdf.viewerPreferences({ Direction: 'R2L' });
    pdf.line(
      rectX + lblEnW + 5,
      cordY + 3,
      pdfPageWidth - (lblEnW + rightGap),
      cordY + 3
    );
    pdf.text(rightLbl, pdfPageWidth - rectX, cordY, null, null, 'right');
  }

  static drawRowWithContent(
    pdf: jsPDF,
    text: string,
    cordY: any,
    leftLbl: string,
    rightLbl: string,
    rightGap: number
  ): number {
    // cordY += 20;
    const rectX = 40;
    const pdfPageWidth = pdf.internal.pageSize.width;
    // const lblEn = 'Account Holder Name';
    // const lblAr = 'اسم صاحب الحساب';
    const lblEnW = this.getTextWidth(pdf, leftLbl);
    const lblArW = this.getTextWidth(pdf, rightLbl);
    pdf.addFont('daxNormal.ttf', 'daxNormal', 'normal');
    pdf.setFont('daxNormal', 'normal');
    pdf.setFontSize(10);
    pdf.text(leftLbl, rectX, cordY);
    const maxtxtWidth = this.centeredText2(pdf, text, rectX, cordY, lblEnW, lblArW);
    const txtMaxWidth = pdfPageWidth - (rectX * 2);
    // pdf.text(text, rectX, cordY, { maxWidth: txtMaxWidth, align: 'justify' });
    const maxWidth = (pdfPageWidth) - ((rectX * 2) + 20);
    const splitTxt = pdf.splitTextToSize(text, maxWidth);
    const _cordY = cordY;
    cordY += (12 * splitTxt.length);
    pdf.addFont('tajawalFont.ttf', 'tajawalFont', 'normal');
    pdf.setFont('tajawalFont', 'normal');
    pdf.setFontSize(10);
    pdf.viewerPreferences({ Direction: 'R2L' });
    pdf.line(
      rectX + lblEnW + 5,
      cordY + 3,
      txtMaxWidth,
      cordY + 3
    );
    pdf.text(rightLbl, pdfPageWidth - rectX, _cordY, null, null, 'right');
    return cordY;
  }

  static openPdf(doc: jsPDF) {
    const string = doc.output('datauristring');

    const iframe =
      '<iframe width=\'100%\' height=\'100%\' src=\'' + string + '\'></iframe>';

    const x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  }

  static openPdf2(datauristring: string) {
    const iframe =
      '<iframe width=\'100%\' height=\'100%\' src=\'' + datauristring + '\'></iframe>';

    const x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  }




}
