import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { AppService } from '../app.service';


import {
  openSan,
  tajawalFont,
  daxFont2,
  daxFont,
  elMessiri,
  nafeeLFont,
  amiriFont
} from '../base64Fonst';
import { AmiriRagular } from './arabic-fonts';

@Component({
  selector: 'app-js-pdf',
  templateUrl: './js-pdf.component.html',
  styleUrls: ['./js-pdf.component.scss']
})
export class JsPdfComponent implements OnInit {

  @ViewChild('content', { static: false }) reportContent: ElementRef;
  arabicPara =
    // tslint:disable-next-line:max-line-length
    'أن شموليةً التقليدية حدى. في عدم المسرح بمعارضة, تم يبق مرجع والقرى. دون والتي القادة من, أصقاع بالرغم الخاسرة كان هو. ان ونتج اتّجة الأبرياء وتم, لم مارد وجهان عليها كان, وصل من مسارح الأرض الباهضة. المتحدة والمعدات بها قد, يكن أن أدوات العناد. غير عل عالمية الطرفين الموسوعة, جمعت أمام نفس بـ. ومن وفنلندا الجديدة، كل.';


  englishPara = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
  englishPara2 = `"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."`;
  constructor(private dataService: AppService) {
  }

  ngOnInit(): void {
    // getPdfDoc();
    this.abrabicFontTesting();
  }


  private createPDF() {
    const reqData = {
      pdfUrl: 'http://localhost:4200/',
      directory: 'servcie-panel',
      fileName: 'aof'
    };
    this.dataService.createPdf(reqData).subscribe(result => {
      console.log('createPDF', result);
    });
  }


  private alignText(align: string) {
    //   if (align) {
    //     // ...
    //     if (align === 'justify') {
    //        left = x;
    //     }
    //     else {
    //         throw new Error('Unrecognized alignment option, use "center" or "right".');
    //     }
    //     prevX = x;
    //     text = '(' + da[0];
    //     let pdfPageWidth = this.internal.pageSize.width;
    //     let wordSpacing;
    //     if( align === 'justify' ) {
    //         let fontSize = this.internal.getFontSize();
    //         let nWords = da[0].trim().split(/\s+/).length;
    //         let textWidth = this.getStringUnitWidth(da[0].replace(/\s+/g, '')) / this.internal.scaleFactor;
    //         wordSpacing = (Math.max(0, (pdfPageWidth - textWidth) / Math.max(1, nWords - 1));
    //         wordSpacing += ' Tw\n';
    //         text = wordSpacing + text;
    //     }
    //     // ...
    // }
  }

  private centeredText(doc: jsPDF, text: string, y: number) {
    const textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
  }

  private centeredText2(doc: jsPDF, text: string, rectX: number, cordY: number, leftTxtWidth: number, rightTxtWidth: number): number {
    const pdfPageWidth = doc.internal.pageSize.width;
    const txtMaxWidth = (pdfPageWidth - (leftTxtWidth + rightTxtWidth + 50));
    // const textWidth = ((txtMaxWidth * doc.internal.getFontSize()) / doc.internal.scaleFactor);
    // const textOffset = (pdfPageWidth - textWidth) / 2;
    doc.text(text, leftTxtWidth + rectX + 5, cordY + 3, { maxWidth: txtMaxWidth, align: 'justify' });
    return txtMaxWidth;
  }

  private inLineText(doc: jsPDF, text: string, y: number) {
    const textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
  }
  private getTextWidth(doc: jsPDF, text: string): any {
    return (
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor
    );
  }

  html2PDF() {
    // const content = `<h1>صلي علي سيدنا محمد صلي الله عليه وسلم</h1>`;
    const content = this.reportContent.nativeElement;
    const opt = {
      margin: [40, 5, 40, 5],
      filename: 'Test.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };

    const dataStr = html2pdf()
      .set(opt)
      .from(content)
      .output('datauristring');
    const iframe =
      '<iframe width=\'100%\' height=\'100%\' src=\'' + dataStr + '\'></iframe>';

    const x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
    // Save the PDF
    html2pdf().set(opt).from(content).save();
  }

  public exportToPDF() {
    const doc = new jsPDF();

    doc.text('This is the default font.', 20, 20);

    doc.setFont('courier');
    doc.setFontStyle('normal');
    doc.text('This is courier normal.', 20, 30);

    doc.setTextColor(255, 0, 0);
    doc.text('This is red.', 20, 40);
    this.centeredText(doc, 'this is test  text', 40);
    // doc.setTextColor(255, 0, 0);
    // doc.text('This is red.', 20, 40);

    // doc.setTextColor(0, 255, 0);
    // doc.text('This is green.', 20, 50);
    const text1 = 'My name is Fardeen.';
    const text2 = ' My name is Ahmad';
    let x = 20;
    const y = 50;
    doc.text(text1, x, y);
    x = x + parseFloat(this.getTextWidth(doc, text1));
    doc.text(text2, x, y);

    let wordSpacing;
    const fontSize = doc.internal.getFontSize();
    const pdfPageWidth = doc.internal.pageSize.width;
    const nWords = text1.trim().split(/\s+/).length;
    const textWidth =
      doc.getStringUnitWidth(text1.replace(/\s+/g, '')) /
      doc.internal.scaleFactor;
    wordSpacing = Math.max(
      0,
      (pdfPageWidth - textWidth) / Math.max(1, nWords - 1)
    );
    wordSpacing += ' Tw\n';

    // doc.setFont('times');
    // doc.setFontStyle('italic');
    // doc.text('This is times italic.', 20, 40);

    // doc.setFont('helvetica');
    // doc.setFontStyle('bold');
    // doc.text('This is helvetica bold.', 20, 50);

    doc.setFont('courier');
    doc.setFontStyle('bolditalic');
    doc.text('This is courier bolditalic.', 20, 60);

    doc.setFont('times');
    doc.setFontStyle('normal');
    doc.text('This is centred text.', 105, 80, null, null, 'center');
    doc.text(
      'And a little bit more underneath it.',
      105,
      90,
      null,
      null,
      'center'
    );
    doc.text('This is right aligned text', 200, 100, null, null, 'right');
    doc.text('And some more', 200, 110, null, null, 'right');
    doc.text('Back to left', 20, 120);

    doc.text('10 degrees rotated', 20, 140, null, 10);
    doc.text('-10 degrees rotated', 20, 160, null, -10);

    doc.save('test.pdf');
  }

  exportToPDF2() {
    const pdfSize = 71;
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'pt',
      format: 'a4'
    });
    // const pdf = new jsPDF();

    pdf.addFileToVFS('daxNormal.ttf', daxFont);
    pdf.addFileToVFS('daxBold.ttf', daxFont2);
    pdf.addFileToVFS('openSan.ttf', openSan);
    pdf.addFileToVFS('tajawalFont.ttf', tajawalFont);
    pdf.addFileToVFS('elMessiri.ttf', elMessiri);
    pdf.addFileToVFS('nafeeLFont.ttf', nafeeLFont);
    const pdfPageWidth = pdf.internal.pageSize.width;
    const pdfPageHeight = pdf.internal.pageSize.height;

    const rectX = 40;
    let rectY = 50;
    const rectW = 200;
    const rectH = 250;
    const rectCenterY = rectH / 2;

    const text = 'This is a block of text that you can read legibly.'; // add custom font to file
    // tslint:disable-next-line:quotemark
    const arabicText = "أي كان الفرنسي الكونجرس    ";
    // tslint:disable-next-line:max-line-length
    const arabicPara =
      // tslint:disable-next-line:max-line-length
      'أن شموليةً التقليدية حدى. في عدم المسرح بمعارضة, تم يبق مرجع والقرى. دون والتي القادة من, أصقاع بالرغم الخاسرة كان هو. ان ونتج اتّجة الأبرياء وتم, لم مارد وجهان عليها كان, وصل من مسارح الأرض الباهضة. المتحدة والمعدات بها قد, يكن أن أدوات العناد. غير عل عالمية الطرفين الموسوعة, جمعت أمام نفس بـ. ومن وفنلندا الجديدة، كل.';
    // const lines = pdf.splitTextToSize(text, rectW - 50);
    // const lines = pdf.splitTextToSize(text, rectW - 50);
    const lblEn = 'Account Holder Name';
    const lblAr = 'اسم صاحب الحساب';
    const lblEnW = this.getTextWidth(pdf, lblEn);
    const lblArW = this.getTextWidth(pdf, lblAr);


    pdf.addFont('daxNormal.ttf', 'daxNormal', 'normal');
    pdf.setFont('daxNormal', 'normal');
    pdf.setFontSize(10);
    rectY += 20;
    pdf.line(rectX, rectX, pdfPageWidth - rectX, rectX); // horizontal line
    // pdf.setLineWidth(400);
    rectY += 20;
    const txtMaxWidth = pdfPageWidth - (rectX * 2);
    pdf.text(this.englishPara, rectX, rectY, { maxWidth: txtMaxWidth, align: 'justify' });
    pdf.internal.write(0, 'Tw'); // <- add this
    rectY += 20;
    // pdf.line(rectX, rectY, pdfPageWidth - rectX, rectY);
    rectY += 50;
    const cordY = this.drawRowWithContent(
      pdf,
      this.englishPara,
      rectY,
      'Amount pay to',
      'دفع المبلغ ل',
      35
    );
    rectY += cordY;
    const cordY1 = this.drawRowWithContent(
      pdf,
      this.englishPara2,
      rectY,
      'Amount pay to Fardeen Ahmad',
      'دفع المبلغ ل',
      35
    );
    rectY += cordY1;
    // rectY += 40;
    // const splitTxt = pdf.splitTextToSize(this.englishPara, txtMaxWidth);
    // for (let i = 0; i < splitTxt.length; i++) {
    //   // if (rectY > 280) {
    //   //   rectY += 20;
    //   //   pdf.addPage();
    //   // }
    //   pdf.text(splitTxt[i], rectX, rectY);
    //   rectY += 3;
    //   pdf.line(rectX, rectY, pdfPageWidth - rectX, rectY);
    //   rectY += 20;
    // }
    // rectY += this.addPage(pdf, rectY);
    // pdf.text(15, 20, splitTxt);
    rectY += 20;
    pdf.text(text, rectX, rectY);
    rectY += 20;
    pdf.text('RIM#', rectX, rectY);

    pdf.addFont('daxBold.ttf', 'daxBold', 'Bold');
    pdf.setFont('daxBold', 'Bold');
    pdf.setFontSize(10);
    rectY += 20;
    pdf.text(text, rectX, rectY);
    rectY += 20;
    pdf.text('RIM#', rectX, rectY);
    rectY += 20;
    pdf.text(text, rectX, rectY);
    rectY += 20;
    pdf.text('RIM#', rectX, rectY);
    rectY += 20;
    this.centeredText(pdf, text, rectY);
    rectY += 3;
    // pdf.setLineWidth(0.01);
    pdf.line(rectX, rectY, pdfPageWidth - rectX, rectY);
    rectY += 20;
    pdf.text(lblEn, rectX, rectY);
    // pdf.text(text, rectX, rectY,'right');
    this.centeredText(pdf, text, rectY);
    pdf.addFont('tajawalFont.ttf', 'tajawalFont', 'normal');
    pdf.setFont('tajawalFont', 'normal');
    pdf.setFontSize(10);
    // pdf.viewerPreferences({ Direction: 'R2L' });
    pdf.line(
      rectX + lblEnW + 5,
      rectY + 3,
      pdfPageWidth - (lblEnW + 30),
      rectY + 3
    );
    pdf.text(lblAr, pdfPageWidth - rectX, rectY, null, null, 'right');
    // rectY += this.addPage(pdf, rectY);
    rectY += 20;
    this.drawRow(pdf, text, rectY, lblEn, lblAr, 30);
    rectY += 20;
    this.drawRow(pdf, 'I am doing jspdf code', rectY, 'Company', 'شركة', 30);
    rectY += 20;
    this.drawRow(
      pdf,
      'I am doing jspdf code',
      rectY,
      'Street Name',
      'اسم الشارع',
      35
    );
    // pdf.text(arabicText, pdfPageWidth - rectX, rectY, null, null, 'right');
    // pdf.text(arabicText, rectX, rectY, {maxWidth: pdfPageWidth, lang: 'ar',  dir: 'rtl'});
    rectY += 40;
    this.centeredText(pdf, arabicText, rectY);
    rectY += 20;
    pdf.text(arabicText, 220, rectY, {
      maxWidth: 250,
      align: 'right',
      lang: 'ar'
    });
    rectY += 20;
    // pdf.text(arabicPara, rectX, rectY, {maxWidth: pdfPageWidth, align: 'left', lang: 'ar', rtl: true});
    pdf.addFont('nafeeLFont.ttf', 'nafeeLFont', 'normal');
    pdf.setFont('nafeeLFont', 'normal');
    pdf.setFontSize(10);
    pdf.setR2L(true);
    const maxWidth = pdfPageWidth / 2 - (rectX + 10);
    const lines = pdf.splitTextToSize(arabicPara, maxWidth);
    pdf.text(lines, pdfPageWidth / 2 - rectX, rectY, {
      align: 'left',
      lang: 'ar'
    });
    // pdf.text(arabicPara, rectX, rectY, {
    //   maxWidth: pdfPageWidth,
    //   align: 'left',
    //   lang: 'ar',
    //   dir: 'rtl'
    // });
    // pdf.text(arabicText, rectX, rectY, { lang: 'ar' });

    // const lineHeight = pdf.getLineHeight();

    // pdf.rect(rectX, rectY, rectW, rectH, 'S');

    // pdf
    //   .setDrawColor(0, 255, 0)
    //   .setLineWidth(1 / 72)
    //   .line(0, rectY + 25, 500, rectY + 25)
    //   .line(0, rectY + rectH - 25, 500, rectY + rectH - 25);

    // To center the text vertically:
    // Find the center y of the container object
    // y = (objectHeight/2) [x,y]
    // Then find the center y of the placement object
    // y = (objectHeight/2) [x,y]
    // Then subtract placementObjectY from containerObjectY
    // textY = (containerObjectY - placementObjectY)

    // To find the text height:
    // First find the amount of lines the text has
    // Then multiply that length by the height of each line
    // ex. height = lines * lineHeight

    // const height = lines.length * lineHeight;
    // const textCenterY = height / 2;

    // pdf.text(lines, rectX + 25, rectY + (rectCenterY - textCenterY));
    // pdf.text(lines.length + '/' + lineHeight, 0, lineHeight);

    // filled square
    // Empty square
    rectY += 100;
    pdf.rect(rectX, rectY, 19, 19);
    // Filled square
    rectY = rectY + 2.5;
    pdf.rect(rectX + 2.55, rectY, 14, 14, 'F');
    this.createSquare(pdf, rectY, rectX, 4);
    rectY += 30;
    this.createSquare(pdf, rectY, rectX, 4, true);

    this.openPdf(pdf);
    // pdf.save(); // Uncomment to save and see
  }

  private addPage(pdf, cordY): number {
    const pdfPageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
    if (cordY > pdfPageHeight) { pdf.addPage(); }

    cordY += 20;
    return cordY;
  }

  private drawRow(
    pdf: jsPDF,
    text: string,
    cordY: any,
    leftLbl: string,
    rightLbl: string,
    rightGap: number
  ): void {
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
    this.centeredText(pdf, text, cordY);
    pdf.addFont('tajawalFont.ttf', 'tajawalFont', 'normal');
    pdf.setFont('tajawalFont', 'normal');
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

  private drawRowWithContent(
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

  private createSquare(
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

  // generatePDF() {
  //   const content = this.reportContent.nativeElement;
  //   html2canvas(content).then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');
  //     // Few necessary setting options
  //     const imgWidth = 208;
  //     const pageHeight = 295;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     const doc = new jsPDF('p', 'mm');
  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;
  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       doc.addPage();
  //       doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }
  //     // Generated PDF
  //     doc.save('asdfghj' + '.pdf');
  //     // this.openPdf(doc);
  //   });
  //   // html2canvas(this.reportContent.nativeElement, <Html2Canvas.Html2CanvasOptions>{
  //   //   onrendered: function(canvas: HTMLCanvasElement) {
  //   //     const pdf = new jsPDF('p', 'pt', 'a4');
  //   //     pdf.addHTML(canvas, function() {
  //   //       pdf.save('web.pdf');
  //   //     });
  //   //   }
  //   // });
  // }

  downloadPdf() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const content = this.reportContent.nativeElement;
    doc.internal.scaleFactor = 4; // play with this value
    console.log('doc', doc);
    // doc.addHTML(content.innerHTML, {pagesplit: true, retina: true, background: '#fff'}, function () { // addHtml with automatic pageSplit
    //     //var out = pdf.save('dataurlnewwindow');
    //     // output format of your pdf -> there are a lot blob, base64....
    //     doc.save("asdfghj");
    // });
    // doc.formHtml(content.innerHTML, 15, 15, {
    //   width: 190,
    //   elementHandlers: specialElementHandlers
    // });
    // this.openPdf(doc);
    // doc.save('asdfghj' + '.pdf');
  }

  abrabicFontTesting() {
    const doc = new jsPDF();
    // doc.addFont('./../../assets/fonts/Amiri-Regular.ttf', 'Amiri', 'normal');
    // pdf.addFileToVFS('daxNormal.ttf', daxFont);
    doc.addFileToVFS('Amiri-Regular.ttf', AmiriRagular.trim());
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');

    doc.setFont('Amiri'); // set font
    // doc.setFontSize(50);

    // doc.addButton
    const arabicText = 'إذا لم تستح فاصنع ما شئت';

    doc.text(arabicText, 10, 60, {lang: 'ar'});
    this.openPdf(doc);
  }

  private openPdf(doc: jsPDF) {
    const string = doc.output('datauristring');

    const iframe =
      '<iframe width=\'100%\' height=\'100%\' src=\'' + string + '\'></iframe>';

    const x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  }

}
