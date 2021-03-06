import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { startCase, toLower, isEmpty, map as lMap, each, filter as lFilter, find, groupBy as lGroupBy, maxBy as lMaxBy, cloneDeep } from 'lodash';
import { IPdfTemplate, IRectangelEntity, IViewTemplate, IJsPdfUtilEntity, AppView, IGridTemplate, JsPdfConfig, IOption } from './jspdf.model';


export class JsPdfHelper {

  base64Img: any;


  static createSquare(
    pdf: jsPDF,
    cordY: any,
    cordX: any,
    text?: string,
    noOfShape?: number,
    width?: number,
    height?: number,
  ) {
    const { pageWidth } = this.getDocHeightAndWidth(pdf);
    const pdfPageWidth = pageWidth - cordX;
    let sqrX = cordX;
    width = width || 19;
    height = height || 19;
    noOfShape = noOfShape || 1;
    for (let index = 0; index < noOfShape; index++) {
      pdf.rect(sqrX, cordY, width, height);
      if (text) {
        pdf.setFontSize(12);
        pdf.text(text, sqrX + 6, cordY + 13);
      }
      sqrX += pdfPageWidth / noOfShape;
    }
  }

  static getTextWidth(doc: jsPDF, txt: string) {
    const txtWidth = doc.getStringUnitWidth(txt) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    return txtWidth;
  }

  static getTxtHeight(pdf: jsPDF, content: string, txtMaxWidth?: number, cordX?: number, padding?: IOption): { [key: string]: any } {
    const { pageWidth } = this.getDocHeightAndWidth(pdf);

    if (!txtMaxWidth) {
      if (!cordX) {
        // const notify = InjectorInstance.get<NotificationService>(NotificationService);
        alert('x cordinate must be passed');
        return;
      }
      txtMaxWidth = pageWidth - ((cordX * 2));
    }
    // height = font size * number of lines * line height
    const maxTxtWidth: number = txtMaxWidth - (padding.left + padding.right);
    const splitText: Array<any> = pdf.splitTextToSize(content, maxTxtWidth, { align: 'justify' });
    const noOfLines = (splitText && !isEmpty(splitText)) ? splitText.length : 1;
    const internal = pdf.internal;
    // const _txtHeight = pdf.internal.getFontSize() * noOfLines * pdf.internal.getLineHeight();
    const _txtHeight = pdf.internal.getFontSize() * noOfLines;
    const txtHeight = _txtHeight / pdf.internal.scaleFactor;
    const dim = pdf.getTextDimensions(splitText);
    // console.log('dimwnsion', dim, txtMaxWidth, txtHeight);

    return {
      txtHeight: dim.h,
      txtWidth: txtMaxWidth,
      noOfLines,
      splitText
    };
    // return {
    //   txtHeight: txtHeight,
    //   txtWidth: txtMaxWidth,
    //   noOfLines,
    //   splitText
    // };
  }

  static calculatePercentage(srcWith: number, targetWidth: number, cordX?: number) {
    const margin = (cordX) ? (cordX * 2) : 0;
    const availableWidth = srcWith - margin;
    return (targetWidth / 100) * availableWidth;
  }

  static createCell(pdf: jsPDF, entity: IPdfTemplate): number {
    const { pageWidth } = this.getDocHeightAndWidth(pdf);
    let { cordY, cordX, cellWidth, rowHeight, splitText, padding, textColor, backGroundColor, borderColor } = entity;
    const { left, right, top, bottom } = padding;
    if (borderColor) {
      pdf.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    } else {
      pdf.setDrawColor(0, 0, 0);
    }
    if (backGroundColor) {
      pdf.setFillColor(backGroundColor[0], backGroundColor[1], backGroundColor[2]);
      pdf.rect(cordX, cordY, cellWidth, rowHeight, 'FD');
    } else {
      pdf.setFillColor(255, 0, 0);
      pdf.rect(cordX, cordY, cellWidth, rowHeight);
    }
    // pdf.rect(120, 20, 10, 10, "FD");
    const x = cordX + left;
    // const y = cordY + bottom;
    //  const y = cordY + bottom;
    const y = cordY + pdf.internal.getFontSize() + top;
    if (textColor) {
      pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    }
    pdf.text(splitText, x, y);
    cordY = y + rowHeight;
    pdf.setTextColor(0, 0, 0);
    return cordY;
  }

  static creteTable(pdf: jsPDF, pdfTemplate: Array<IPdfTemplate>): Array<IPdfTemplate> {
    const { pageHeight, pageWidth } = this.getDocHeightAndWidth(pdf);
    const rowGrp = lGroupBy(pdfTemplate, (gr: IPdfTemplate) => (gr.rowNo));
    const cellTemplates: Array<IPdfTemplate> = [];
    for (const key in rowGrp) {
      if (rowGrp.hasOwnProperty(key)) {
        const element = rowGrp[key];
        each(element, (tmp: IPdfTemplate, ind: number) => {
          const { cordX, width, text, padding } = tmp;
          if (isEmpty(padding)) {
            const cPadding: IOption = {
              left: 5,
              right: 5,
              top: 5,
              bottom: 5
            };
            tmp = {
              ...tmp,
              padding: cPadding
            };
          }
          const percentageWidth = this.calculatePercentage(pageWidth, width, cordX);
          const txtMaxWidth = percentageWidth;
          const { txtHeight, txtWidth, noOfLines, splitText } = this.getTxtHeight(pdf, text, txtMaxWidth, null, tmp.padding);
          cellTemplates.push({
            ...tmp,
            cellHeight: txtHeight,
            cellWidth: txtWidth,
            splitText,
            noOfLines
          });
        });
      }
    }
    // console.log('cellTemplates', cellTemplates);
    let prevRow, prevCordX, prevCordY, prevRowHeight, rtnCordY = 0, updatedTemplates = new Array<any>();;
    each(cellTemplates, (tmp: IPdfTemplate, ind: number) => {
      let { cordY, cordX, rowNo, cellWidth } = tmp;
      const filerObj = lFilter(cellTemplates, (cell: IPdfTemplate) => cell.rowNo === rowNo);
      const maxObj: IPdfTemplate = lMaxBy(filerObj, m => m.cellHeight);
      const rowHeight = maxObj.cellHeight + 20;

      prevCordX = prevCordX || cordX;
      prevCordY = prevCordY || cordY;
      prevRow = prevRow || rowNo;
      prevRowHeight = prevRowHeight || rowHeight;

      if (rowNo !== prevRow) {
        prevCordX = cordX;
        prevCordY = prevCordY + prevRowHeight;
        prevRow = rowNo;
        prevRowHeight = rowHeight;
      }
      const updatedTemplate: IPdfTemplate = {
        ...tmp,
        cordX: prevCordX,
        cordY: prevCordY,
        rowHeight: prevRowHeight
      };
      updatedTemplates.push(updatedTemplate);
      cordY = this.createCell(pdf, updatedTemplate);
      prevCordX += cellWidth;
    });
    return updatedTemplates;
  }

  static createMultipleRectangle(
    pdf: jsPDF,
    cordY: any,
    cordX: any,
    entity: Array<IRectangelEntity>
  ): number {
    const _cordY = cordY;
    // const _cordX = cordX;
    const { pageWidth } = this.getDocHeightAndWidth(pdf);
    const pdfPageWidth = pageWidth - cordX;
    let sqrX = cordX;
    // width = width || (pageWidth - (cordX * 2));
    // height = height || 20;
    // noOfShape = noOfShape || 1;
    const noOfShape = entity.length;
    let prevWidth: number = 0;
    let prevHeight: number = 0;
    each(entity, (d: IRectangelEntity, ind: number) => {
      const width = d.width;
      prevWidth = d.width;
      const txtMaxWidth = width - (10);
      let txtLineLength = 1;
      let splitText: Array<any> = new Array<any>();
      if (d.text) {
        splitText = pdf.splitTextToSize(d.text, txtMaxWidth, { align: 'justify' });
        txtLineLength = (splitText && !isEmpty(splitText)) ? splitText.length : 1;
      }
      if (ind === 0) {
        // const height = 40 + (10 * txtLineLength);
        const height = d.height;
        prevHeight = height;
        pdf.rect(sqrX, _cordY, width, height);
        cordY = cordY + 15;
        pdf.text(splitText, cordX + 5, _cordY + 15);
      } else {
        pdf.rect(sqrX, _cordY, width, prevHeight);
        cordY = cordY + 15;
        pdf.text(splitText, sqrX + 5, _cordY + 15);
      }
      // if (ind === 0) {
      //     const height = 40 + (10 * txtLineLength);
      //     prevHeight = height;
      //     pdf.rect(sqrX, _cordY, width, height);
      //     cordY = cordY + 15;
      //     pdf.text(splitText, cordX + 5, _cordY + 15);
      // } else {
      //     pdf.rect(sqrX, _cordY, width, prevHeight);
      //     cordY = cordY + 15;
      //     pdf.text(splitText, sqrX + 5, _cordY + 15);
      // }
      sqrX = width + sqrX;
    });

    cordY = cordY + prevHeight;
    return cordY;
  }

  static createRectangle(
    pdf: jsPDF,
    cordY: any,
    cordX: any,
    text?: string,
    noOfShape?: number,
    width?: number,
    height?: number,
    flag?: boolean,
  ): number {
    const { pageWidth } = this.getDocHeightAndWidth(pdf);
    const pdfPageWidth = pageWidth - cordX;
    let sqrX = cordX;
    width = width || (pageWidth - (cordX * 2));
    height = height || 20;
    noOfShape = noOfShape || 1;
    for (let index = 0; index < noOfShape; index++) {
      pdf.setDrawColor(138, 138, 138);
      // pdf.setFillColor(234, 234, 234);
      pdf.setFillColor(187, 187, 187);
      pdf.rect(sqrX, cordY, width, height, 'FD');
      cordY = cordY + height;
      pdf.setFontSize(13);
      pdf.text(text, cordX + 5, cordY - 5);
      if (flag) {
        pdf.setFontSize(12);
        pdf.text(index.toString(), sqrX + 6, cordY + 13);
      }
      sqrX += pdfPageWidth / noOfShape;
    }
    return cordY;
  }

  static createTextArea(
    pdf: jsPDF,
    cordY: any,
    cordX: any,
    text?: string
  ): number {
    const { pageWidth } = this.getDocHeightAndWidth(pdf);
    const width = pageWidth - (cordX * 2);
    const txtMaxWidth = pageWidth - ((cordX * 2) + 10);
    const splitText: Array<any> = pdf.splitTextToSize(text, txtMaxWidth, { align: 'justify' });
    const txtLineLength = (splitText && !isEmpty(splitText)) ? splitText.length : 1;
    const height = 30 + (10 * txtLineLength);
    pdf.rect(cordX, cordY, width, height);
    cordY = cordY + 15;
    pdf.text(splitText, cordX + 5, cordY);
    cordY = cordY + height;
    return cordY;
  }

  static centeredText(doc: jsPDF, text: string, y: number) {
    const textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
  }

  static centeredText2(doc: jsPDF, text: string, cordX: number, cordY: number, leftTxtWidth: number, rightTxtWidth: number): number {
    const pdfPageWidth = doc.internal.pageSize.width;
    const txtMaxWidth = (pdfPageWidth - (leftTxtWidth + rightTxtWidth + 50));
    // const textWidth = ((txtMaxWidth * doc.internal.getFontSize()) / doc.internal.scaleFactor);
    // const textOffset = (pdfPageWidth - textWidth) / 2;
    doc.text(text, leftTxtWidth + cordX + 5, cordY + 3, { maxWidth: txtMaxWidth, align: 'justify' });
    return txtMaxWidth;
  }

  static inLineText(doc: jsPDF, text: string, y: number) {
    const textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
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
    const cordX = 40;
    const pdfPageWidth = pdf.internal.pageSize.width;
    const lblEnW = this.getTextWidth(pdf, leftLbl);
    pdf.setFontSize(10);
    pdf.text(leftLbl, cordX, cordY);
    this.centeredText(pdf, text, cordY);
    pdf.setFontSize(10);
    pdf.viewerPreferences({ Direction: 'R2L' });
    pdf.line(
      cordX + lblEnW + 5,
      cordY + 3,
      pdfPageWidth - (lblEnW + rightGap),
      cordY + 3
    );
    pdf.text(rightLbl, pdfPageWidth - cordX, cordY, null, null, 'right');
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
    const cordX = 40;
    const pdfPageWidth = pdf.internal.pageSize.width;
    // const lblEn = 'Account Holder Name';
    // const lblAr = 'اسم صاحب الحساب';
    const lblEnW = this.getTextWidth(pdf, leftLbl);
    const lblArW = this.getTextWidth(pdf, rightLbl);
    pdf.addFont('daxNormal.ttf', 'daxNormal', 'normal');
    pdf.setFont('daxNormal', 'normal');
    pdf.setFontSize(10);
    pdf.text(leftLbl, cordX, cordY);
    const maxtxtWidth = this.centeredText2(pdf, text, cordX, cordY, lblEnW, lblArW);
    const txtMaxWidth = pdfPageWidth - (cordX * 2);
    // pdf.text(text, cordX, cordY, { maxWidth: txtMaxWidth, align: 'justify' });
    const maxWidth = (pdfPageWidth) - ((cordX * 2) + 20);
    const splitTxt = pdf.splitTextToSize(text, maxWidth);
    const _cordY = cordY;
    cordY += (12 * splitTxt.length);
    pdf.addFont('tajawalFont.ttf', 'tajawalFont', 'normal');
    pdf.setFont('tajawalFont', 'normal');
    pdf.setFontSize(10);
    pdf.viewerPreferences({ Direction: 'R2L' });
    pdf.line(
      cordX + lblEnW + 5,
      cordY + 3,
      txtMaxWidth,
      cordY + 3
    );
    pdf.text(rightLbl, pdfPageWidth - cordX, _cordY, null, null, 'right');
    return cordY;
  }

  static openPdf(doc: jsPDF) {
    const string = doc.output('datauristring');

    const iframe = '<iframe width=\'100%\' height=\'100%\' src=\'' + string + '\'></iframe>';

    const x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  }

  static alignCentre(doc: jsPDF, txt: string, y: number, underline = true, fonstSize: number = 12) {
    const fontSize = doc.internal.getFontSize();
    // Get page width
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    // Get the actual text's width
    /* You multiply the unit width of your string by your font size and divide
     * by the internal scale factor. The division is necessary
     * for the case where you use units other than 'pt' in the constructor
     * of jsPDF.
    */
    const txtWidth = doc.getStringUnitWidth(txt) * fontSize / doc.internal.scaleFactor;
    // Calculate text's x coordinate
    const x = (pageWidth - txtWidth) / 2;
    doc.setFontSize(fonstSize);
    doc.text(txt, x, y);
    if (underline) {
      doc.setDrawColor(0, 0, 0);
      doc.line(x - 1, y + 1, x + txtWidth + 2, y + 1);
    }
  }

  static parseViewTemplateData(viewTmpl: IViewTemplate, data: any): any {
    // switch (viewTmpl.type) {
    //     case FieldType.DATE_TIME_DISPLAY:
    //     case FieldType.DATE_BOX:
    //         data = HerlperUtil.transformDateTimeByMoment(data);
    //         break;
    //     case FieldType.DATE_DISPLAY:
    //     case FieldType.DATE_BOX:
    //         data = HerlperUtil.transformDateByMoment(data);
    //         break;
    //     case FieldType.NUMBER_DISPLAY:
    //     case FieldType.NUMBER_BOX:
    //         data = HerlperUtil.toNumberFormate(data);
    //         break;
    //     default:
    //         data = !viewTmpl.titlecase ? data : startCase(toLower(data));
    //         if (viewTmpl.defaultValue)
    //             data = viewTmpl.defaultValue;
    //         break;
    // }
    // return data;
  }

  static getAttrText(element: IViewTemplate, field: string) {
    // const value = this.parseViewTemplateData(element, field);
    // const text = element.header + ' : ' + value;
    // return text;
  }

  static getDocHeightAndWidth(doc: jsPDF): { [key: string]: any } {
    const pageSize = doc.internal.pageSize;
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    return {
      pageHeight,
      pageWidth
    };
  }

  static createTablePdfByHtmlId(doc: jsPDF, elementId: string, jsPdfUtilEntity: IJsPdfUtilEntity): jsPDF {
    const { yCord, xCord, isAllSectionHooks, isActiveTotalPageSize, fontSize, showHead, config } = jsPdfUtilEntity;
    const { isCss } = config;
    const Y = yCord;
    const base64Img = null;
    const totalPagesExp = '{total_pages_count_string}';
    const htmlId = `#${elementId}`;
    doc.autoTable({
      html: htmlId,
      useCss: isCss,
      // tableLineColor: [114, 113, 133],
      tableLineColor: [187, 187, 187],
      tableLineWidth: 1,
      styles: {
        // lineColor: [155, 155, 155],
        lineColor: [221, 221, 221],
        lineWidth: 1,
        cellWidth: 'auto'
        // cellWidth: 30
      },
      startY: Y,
      headStyles: {
        // fillColor: [36, 141, 220],
        font: 'times',
        textColor: [0, 0, 0],
        fillColor: [204, 204, 204],
        fontSize: 8,
        halign: 'center'
      },
      bodyStyles: { valign: 'top', fontSize: 7, font: 'times', },
      rowPageBreak: 'auto',
      alternateRowStyles: {
        fillColor: [241, 241, 241],
      },
      // styles: { cellWidth: 'wrap' },
      columnStyles: { text: { cellWidth: 'wrap' } },
      theme: 'grid',
      margin: { left: xCord, right: xCord },
      // padding: {top: 2, right: 2, bottom: 2, left: 2},
      allSectionHooks: isAllSectionHooks,
      // Use for customizing texts or styles of specific cells after they have been formatted by this plugin.
      // This hook is called just before the column width and other features are computed.
      didParseCell: (data) => {
        console.log('didParseCell', data);

        // if (data.row.index === 5) {
        //   data.cell.styles.fillColor = [40, 170, 100]
        // }

        // if (
        //   (data.row.section === 'head' || data.row.section === 'foot') &&
        //   data.column.dataKey === 'expenses'
        // ) {
        //   data.cell.text = '' // Use an icon in didDrawCell instead
        // }

        // if (
        //   data.row.index === 0 &&
        //   data.row.section === 'body' &&
        //   data.column.dataKey === 'city'
        // ) {
        //   data.cell.text = 'とうきょう'
        // }
      },
      // Use for changing styles with jspdf functions or customize the positioning of cells or cell text
      // just before they are drawn to the page.
      willDrawCell: (data) => {
        // console.log('willDrawCell', data);
        // if (data.row.section === 'body' && data.column.dataKey === 'expenses') {
        //   if (data.cell.raw > 750) {
        //     doc.setTextColor(231, 76, 60) // Red
        //     doc.setFontStyle('bold')
        //   }
        // }
      },
      // Use for adding content to the cells after they are drawn. This could be images or links.
      // You can also use this to draw other custom jspdf content to cells with doc.text or doc.rect
      // for example.
      didDrawCell: (data) => {
        // console.log('didDrawCell', data);
        // if (
        //   (data.row.section === 'head' || data.row.section === 'foot') &&
        //   data.column.dataKey === 'expenses' &&
        //   coinBase64Img
        // ) {
        //   doc.addImage(
        //     coinBase64Img,
        //     'PNG',
        //     data.cell.x + 5,
        //     data.cell.y + 2,
        //     5,
        //     5
        //   )
        // }
      },
      // Use this to add content to each page that has the autoTable on it. This can be page headers,
      // page footers and page numbers for example.
      didDrawPage: (data) => {
        // console.log('didDrawPage', data);
        // Header
        // doc.setFontSize(20);
        // doc.setTextColor(40);
        // doc.setFontStyle('normal');
        // if (base64Img) {
        //     doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
        // }
        // doc.text('Report', data.settings.margin.left + 15, 22);

        // Footer
        let str = 'Page ' + doc.internal.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' of ' + totalPagesExp;
        }
        doc.setFontSize(10);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
        // doc.setFontSize(18)
        // doc.text('Custom styling with hooks', data.settings.margin.left, 22)
        // doc.setFontSize(12)
        // doc.text(
        //   'Conditional styling of cells, rows and columns, cell and table borders, custom font, image in cell',
        //   data.settings.margin.left,
        //   30
        // )
      }
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    return doc;
  }

  static createDynamicTable(doc: jsPDF, jsPdfUtilEntity: IJsPdfUtilEntity, columns: Array<any>, rows: Array<any>, jsPDFConfig?: JsPdfConfig): IJsPdfUtilEntity {
    const { yCord, xCord, isAllSectionHooks, isActiveTotalPageSize, fontSize } = jsPdfUtilEntity;
    doc.autoTable(columns, rows, {
      startY: yCord,
      showHead: jsPdfUtilEntity.showHead,
      tableLineColor: [187, 187, 187],
      tableLineWidth: 1,
      styles: {
        lineColor: [221, 221, 221],
        lineWidth: 1,
        cellWidth: 'auto'
      },
      headStyles: {
        // fillColor: [36, 141, 220],
        font: 'courier',
        textColor: [0, 0, 0],
        fillColor: [204, 204, 204],
        fontSize: 8,
        halign: 'center'
      },
      bodyStyles: { valign: 'top', fontSize: 7, font: 'times', },
      rowPageBreak: 'auto',
      alternateRowStyles: {
        fillColor: [241, 241, 241],
      },
      columnStyles: { text: { cellWidth: 'wrap' } },
      theme: 'grid',
      allSectionHooks: isAllSectionHooks,
      margin: { left: xCord, right: xCord },
      didDrawPage: (data) => {
        jsPdfUtilEntity.hookData = data;
        if (isActiveTotalPageSize) {
          const pageNumber = doc.internal.getNumberOfPages()
          let str = "Page " + pageNumber;
          if (typeof doc.putTotalPages === "function") {
            str = str + " of " + jsPdfUtilEntity.totalPagesExp;
          }
          doc.setFontSize(fontSize);
          const { pageHeight } = this.getDocHeightAndWidth(doc);
          doc.text(str, data.settings.margin.left, pageHeight - 5);
        }
      }
    });
    return jsPdfUtilEntity;
  }


  static createPdfByViewTemplate(doc: jsPDF, jsPdfUtilEntity: IJsPdfUtilEntity, viewTemplate: AppView, viewData: any): jsPDF {
    // const { yCord, xCord, isAllSectionHooks, isActiveTotalPageSize, fontSize, showHead } = jsPdfUtilEntity;
    // let Y = yCord;
    // try {
    //     let columns = [];
    //     let rows = [];
    //     const length = viewTemplate.columnOne.length ? viewTemplate.columnOne.length : viewTemplate.columnTwo.length;
    //     let colindex = 1;
    //     const colLength = Object.keys(viewTemplate).length;
    //     for (let index = 0; index < colLength; index++) {
    //         const colindex = index + 1;
    //         const colKey = `col-${colindex}`;
    //         columns.push({ title: colKey, dataKey: colKey });
    //     }
    //     for (let index = 0; index < length; index++) {
    //         const element1: IViewTemplate = viewTemplate.columnOne[index];
    //         const element2: IViewTemplate = viewTemplate.columnTwo[index];
    //         let text1 = '', text2 = '';
    //         if (element1) {
    //             const fieldVal = viewData[element1.field] || '';
    //             text1 = this.getAttrText(element1, fieldVal);
    //         }
    //         if (element2) {
    //             const fieldVal = viewData[element1.field] || '';
    //             text2 = this.getAttrText(element2, fieldVal);
    //         }

    //         if (columns.length === 2)
    //             rows.push({ 'col-1': text1, 'col-2': text2 });
    //         else if (columns.length === 1)
    //             rows.push({ 'col-1': text1 });
    //     }
    //     Y = Y + 20;
    //     let jsPdfUtilEntity: IJsPdfUtilEntity = {
    //         yCord: Y,
    //         fontSize,
    //         showHead,
    //         xCord
    //     }
    //     jsPdfUtilEntity = this.createDynamicTable(doc, jsPdfUtilEntity, columns, rows);

    // } catch (error) {
    //     const notify = InjectorInstance.get<NotificationService>(NotificationService);
    //     notify.clientError(error)
    // }
  }


  static createPdfByGridTemplate(doc: jsPDF, jsPdfUtilEntity: IJsPdfUtilEntity, colDef: Array<IGridTemplate>, viewData: any): jsPDF {
    // const { yCord, xCord, noOfCols, isAllSectionHooks, isActiveTotalPageSize, fontSize, showHead } = jsPdfUtilEntity;
    // let Y = yCord;
    // try {
    //     let columns = [];
    //     let rows = [];
    //     let allKeys = {};
    //     if (!noOfCols || noOfCols <= 0) {
    //         const notify = InjectorInstance.get<NotificationService>(NotificationService);
    //         notify.error('Number of dynamic was columns invalid');
    //         return;
    //     }
    //     for (let index = 0; index < noOfCols; index++) {
    //         const colKey = `col-${index}`;
    //         columns.push({ dataKey: colKey, header: `COL ${index}` })
    //     }

    //     // const keyArr = HerlperUtil.getObjKeysFromArray(columns, 'dataKey', 'header');
    //     // allKeys = keyArr.reduce((obj, cur, i) => { return { ...obj, [cur]: cur }; }, {});
    //     // console.log('allKeys', allKeys);

    //     each(colDef, (d: IGridTemplate, ind: number) => {
    //         rows.push(
    //             {
    //                 'col-0': d.header,
    //                 'col-1': viewData[d.field]
    //             });
    //     })
    //     // console.log('createDummyPDF', columns, rows);
    //     Y = Y + 20;
    //     let jsPdfUtilEntity: IJsPdfUtilEntity = {
    //         yCord: Y,
    //         fontSize,
    //         showHead,
    //         xCord
    //     }
    //     jsPdfUtilEntity = this.createDynamicTable(doc, jsPdfUtilEntity, columns, rows);

    // } catch (error) {
    //     const notify = InjectorInstance.get<NotificationService>(NotificationService);
    //     notify.clientError(error);
    // }
  }


}
