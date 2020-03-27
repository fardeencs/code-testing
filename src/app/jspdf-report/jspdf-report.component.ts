import 'jspdf-autotable';

import html2pdf from 'html2pdf.js';
import * as jsPDF from 'jspdf';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FakerUtil } from '../common/faker.util';
import { jsPDFUtil } from '../common/jspdf-util';
import { base64Img } from './base64-util';
import { isEmpty, find as lFind, filter as lFilter, includes, each } from 'lodash';
import { CommonHelperUtil } from '../common/common-helper.util';
import { IPdfTemplate } from './jspdf.model';
import { JsPdfHelper } from './jspdf.helper';


@Component({
  selector: 'app-jspdf-report',
  templateUrl: './jspdf-report.component.html',
  styleUrls: ['./jspdf-report.component.scss']
})
export class JspdfReportComponent implements OnInit {

  @ViewChild('content', { static: false }) reportContent: ElementRef;
  gridData: Array<any>;
  base64Img = base64Img;
  constructor() {
    this.gridData = FakerUtil.data(40);
    // console.log('grid-data', this.gridData);

  }

  ngOnInit() {
  }


  html2PDF() {
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
    const iframe = '<iframe width=\'100%\' height=\'100%\' src=\'' + dataStr + '\'></iframe>';

    const x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
    // Save the PDF
    html2pdf().set(opt).from(content).save();
  }

  createPDFByHTML(doc: jsPDF, Y: number, elementId: string): jsPDF {
    const totalPagesExp = '{total_pages_count_string}';
    const htmlId = `#${elementId}`;
    doc.autoTable({
      html: htmlId,
      tableLineColor: [114, 113, 133],
      tableLineWidth: 1,
      styles: {
        lineColor: [155, 155, 155],
        lineWidth: 1,
        cellWidth: 'auto'
      },
      startY: Y,
      headStyles: {
        fillColor: [36, 141, 220],
        fontSize: 10,
        halign: 'center'
      },
      bodyStyles: { valign: 'top', fontSize: 8, },
      rowPageBreak: 'auto',
      alternateRowStyles: {
        fillColor: [241, 241, 241],
      },
      // styles: { cellWidth: 'wrap' },
      columnStyles: { text: { cellWidth: 'wrap' } },
      theme: 'grid',
      allSectionHooks: true,
      // Use for customizing texts or styles of specific cells after they have been formatted by this plugin.
      // This hook is called just before the column width and other features are computed.
      didParseCell: (data) => {
        // console.log('didParseCell', data);

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
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        if (base64Img) {
          doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
        }
        doc.text('Report', data.settings.margin.left + 15, 22);

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
      },
      margin: { top: 30 },
    });

    doc.autoTable({
      html: '#table2',
      tableLineColor: [114, 113, 133],
      tableLineWidth: 1,
      styles: {
        lineColor: [155, 155, 155],
        lineWidth: 1,
        cellWidth: 'normal'
      },
      // startY: Y,
      startY: doc.previousAutoTable.finalY + 15,
      headStyles: {
        fillColor: [36, 141, 220],
        fontSize: 10,
      },
      rowPageBreak: 'auto',
      bodyStyles: { valign: 'top', fontSize: 8, },
      alternateRowStyles: {
        fillColor: [241, 241, 241],
      },
      // styles: { cellWidth: 'wrap' },
      columnStyles: { text: { cellWidth: 'wrap' } },
      theme: 'grid',
      allSectionHooks: true
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    return doc;
  }

  createPDFDynamically(doc: jsPDF, Y: number): jsPDF {
    CommonHelperUtil.convertImgToBase64URL('../../assets/images/img01.jpg', function (base64Img) {
      console.log('convertImgToBase64URL', base64Img);

      // Base64DataURL
    }, 'image/jpg');
    // CommonHelperUtil.getBase64Image()
    const body1 = FakerUtil.getRowAndColSpanBody();
    // doc.autoTable({
    //   startY: 60,
    //   head: [
    //     [
    //       {
    //         content: 'People',
    //         colSpan: 5,
    //         styles: { halign: 'center', fillColor: [22, 160, 133] },
    //       },
    //     ],
    //   ],
    //   body: body,
    //   theme: 'grid',
    // });

    // const columns = [
    //   { dataKey: 'id', header: 'ID' },
    //   { dataKey: 'name', header: 'Name' },
    //   { dataKey: 'expenses', header: 'Sum' },
    // ];

    let head = FakerUtil.headRowsObj();
    head = {
      ...head,
      id: {
        content: 'ID',
        rowSpan: 2,
      },
      name: {
        content: 'Name',
        rowSpan: 2,
      },
      email: {
        content: 'Email',
        rowSpan: 2,
        // styles: { halign: 'center', fillColor: [22, 160, 133], cellWidth: 10 }
      },
      people: {
        content: 'Row & Col span Header',
        rowSpan: 2,
        colSpan: 3,
        styles: { halign: 'center', fillColor: [22, 160, 133] }
      }
    };
    // [{
    //   content: 'People',
    //   colSpan: 5,
    //   styles: { halign: 'center', fillColor: [22, 160, 133] },
    // },],
    const headers = [head];
    const _body = FakerUtil.data(40);

    const body = [];
    const raw = _body;
    for (let i = 0; i < raw.length; i++) {
      const row = [];
      // tslint:disable-next-line:forin
      for (const key in raw[i]) {
        row.push(raw[i][key]);
      }
      // if (i % 3 === 0) {
      // row.push({
      //   colSpan: 3,
      //   // content: i / 5 + 1,
      //   styles: { valign: 'middle', halign: 'center' },
      // });
      // }
      body.push(row);
    }

    // console.log('body', body);
    // console.log('body1', body1);

    //  const colSpanItem = {
    //     rowSpan: 5,
    //     content: 10 / 5 + 1,
    //     styles: { valign: 'middle', halign: 'center' },
    //  };
    //  body.push({});

    doc.autoTable({
      // startY: doc.previousAutoTable.finalY + 15,
      head: headers,
      body: body,
      tableLineColor: [114, 113, 133],
      tableLineWidth: 1,
      styles: {
        lineColor: [155, 155, 155],
        lineWidth: 1,
        cellWidth: 'auto'
      },
      startY: Y,
      headStyles: {
        fillColor: [36, 141, 220],
        fontSize: 10,
      },
      rowPageBreak: 'auto',
      bodyStyles: { valign: 'top', fontSize: 8, },
      alternateRowStyles: {
        fillColor: [241, 241, 241],
      },
      columnStyles: { text: { cellWidth: 'auto' } },
      rowStyles: { text: { cellWidth: 'auto' } },
      theme: 'grid',
      allSectionHooks: true,
      // Use for customizing texts or styles of specific cells after they have been formatted by this plugin.
      // This hook is called just before the column width and other features are computed.
      didParseCell: (data) => {
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
        if (data.row.section === 'head') {
          // if(data.column.dataKey === 'city' || data.column.dataKey === 'expenses' || data.column.dataKey === 'countryCode'){
          // }
          // if (data.column.dataKey === 'city') {
          //   const w = data.cell.width;
          //   console.log('city', w);

          // }
          // if (data.column.dataKey === 'expenses') {
          //   const w = data.cell.width;
          //   console.log('expenses', w);
          // }
          // if (data.column.dataKey === 'countryCode') {
          //   const w = data.cell.width;
          //   console.log('countryCode', w);
          // }

          // if (data.column.dataKey === 'people_1' || data.column.dataKey === 'people_2') {
          //   const w = data.cell.width;
          //   console.log('people_1, people_2', w);
          // }

          if (data.column.dataKey === 'people') {
            const tblCols = data.table.columns;
            console.log('tblCols', data);
            const matches = lFilter(tblCols, s => s.dataKey.includes('people'));
            console.log('peoples', matches);
            // const subHead2 = {
            //   people: {
            //     content: 'City',
            //     rowSpan: 1,
            //     styles: { cellWidth: 20, halign: 'center', fillColor: [22, 160, 133] }
            //   },
            //   people_1: {
            //     content: 'Expenses',
            //     rowSpan: 1,
            //     styles: { cellWidth: 10, halign: 'center', fillColor: [22, 160, 133] }
            //   },
            //   people_2: {
            //     content: 'Country Code',
            //     rowSpan: 1,
            //     styles: { cellWidth: 5, halign: 'center', fillColor: [22, 160, 133] }
            //   }
            //   // people: {
            //   //   content: 'Row & Col span Header',
            //   //   rowSpan: 2,
            //   //   colSpan: 3,
            //   //   styles: { halign: 'center', fillColor: [22, 160, 133] }
            //   // }
            // };

            let subHead = [];
            let subColumnStyles = {};
            each(matches, (d, ind) => {
              let header = '';
              switch (ind) {
                case 0:
                  header = 'City';
                  break;
                case 1:
                  header = 'Expenses';
                  break;
                case 2:
                  header = 'Country Code';
                  break;
                default:
                  break;
              }
              console.log(d, ind);
              subHead = {
                ...subHead, [d.dataKey]: {
                  content: header,
                  cellWidth: d.width,
                  width: d.width,
                  halign: 'center', fillColor: [22, 160, 133]
                }
              };

              subColumnStyles = {
                ...subColumnStyles,
                [d.index]: {
                  cellWidth: d.width,
                }
              };

              // subHead.push({
              //   header: header,
              //   dataKey: d.dataKey,
              //   minWidth: d.minWidth,
              //   wrappedWidth: d.wrappedWidth,
              //   width: d.width
              // });

              // subColumnStyles = {
              //   ...subColumnStyles,
              //   [d.dataKey]: {
              //     cellWidth: d.width,
              //     minCellWidth: d.minWidth,
              //     width: d.width,

              //   }
              // };

            });
            console.log('subHead', subHead, subColumnStyles);

            const cellWidth = data.cell.width / 3;
            const cellHeight = data.cell.height / 2;
            const headStyles = {
              fontSize: 10,
              // width: data.cell.width
              // width: 113
            };
            doc.autoTable({
              // head: [['City', 'Expenses', 'Country Code']],
              head: [subHead],
              // columns: subHead,
              body: [],
              tableLineColor: [114, 113, 133],
              tableLineWidth: 1,
              styles: {
                lineColor: [155, 155, 155],
                lineWidth: 1,
                // cellWidth: 'auto'
              },
              headStyles: headStyles,
              startY: data.cell.y + cellHeight,
              margin: { left: data.cell.x },
              // margin: { left: data.cell.x  + data.cell.padding('left') },
              // tableWidth: 'wrap',
              columnStyles: { ...subColumnStyles },
              // columnStyles: { text: { cellWidth: 'auto' } },
              // columnStyles: { text: { cellWidth: '5' } },
              didDrawCell: (cellData) => {
                // cellData.cell.styles.width = cellWidth;
              }
              // theme: 'grid',
            });
          }

          // doc.autoTable({
          //   head: [["One", "Two", "Three", "Four"]],
          //   body: [
          //     ["1", "2", "3", "4"],
          //     ["1", "2", "3", "4"],
          //     ["1", "2", "3", "4"],
          //     ["1", "2", "3", "4"]
          //   ],
          //   startY: data.cell.y + 2,
          //   margin: { left: data.cell.x + data.cell.padding('left') },
          //   tableWidth: 'wrap',
          //   theme: 'grid',
          //   styles: {
          //     fontSize: 7,
          //     cellPadding: 1,
          //   }
          // });
        }


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


    return doc;
  }

  genratePdf(key: string, elemntId?: string) {
    let doc = new jsPDF('p', 'pt');
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.setFontStyle('bold');

    const X = 40; let Y = 70;
    doc.text('Report Title', X, Y);
    const docPageSize = doc.internal.pageSize;
    const docPageWidth = docPageSize.width ? docPageSize.width : docPageSize.getWidth();
    const docPageHeight = docPageSize.height ? docPageSize.height : docPageSize.getHeight();
    const txtMaxWidth = docPageWidth - (X * 2);
    // doc.text(loremTxt, X, Y, { maxWidth: txtMaxWidth, align: 'justify' });
    const loremTxt = FakerUtil.getLoremText(70);
    const dim = doc.getTextDimensions(loremTxt);
    console.log('dim', dim);

    const splitText: Array<any> = doc.splitTextToSize(loremTxt, txtMaxWidth, { align: 'justify' });
    Y = Y + 15;
    doc.text(splitText, X, Y);
    const dim2 = doc.getTextDimensions(splitText);
    console.log('dim2', dim2);

    const txtLineLength = (splitText && !isEmpty(splitText)) ? splitText.length : 1;
    Y = Y + 10 + (10 * txtLineLength);
    switch (key) {
      case 'HTML':
        this.createPDFByHTML(doc, Y, elemntId);
        break;
      case 'DYNAMIC':
        doc = this.createPDFDynamically(doc, Y);
        break;

      default:
        break;
    }
    jsPDFUtil.openPdf(doc);
    // doc.save('file.pdf');
  }

  createTablePdfByHtmlId(htmlId: string, cordY?: number) {
    htmlId = '#' + htmlId;
    cordY = cordY || 40;
    const fontSize = 10;
    const doc = new jsPDF('p', 'pt');
    doc.setFontSize(10);
    doc.autoTable({
      html: htmlId,
      useCss: true,
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
      startY: cordY,
      headStyles: {
        // fillColor: [36, 141, 220],
        font: 'times',
        textColor: [0, 0, 0],
        fillColor: [204, 204, 204],
        fontSize: fontSize,
        halign: 'center'
      },
      bodyStyles: { valign: 'top', fontSize: fontSize, font: 'times', },
      rowPageBreak: 'auto',
      alternateRowStyles: {
        fillColor: [241, 241, 241],
      },
      // styles: { cellWidth: 'wrap' },
      columnStyles: { text: { cellWidth: 'wrap' } },
      theme: 'grid'
    });

    jsPDFUtil.openPdf(doc);
  }

  createPdfTableByJsPdf() {
    const X = 20, Y = 20;
    const template: Array<IPdfTemplate> = [
      {
        cordX: X,
        cordY: Y,
        width: 20,
        text: 'Rais Bano',
        rowNo: 1,
        colNo: 1,
      },
      {
        cordX: X,
        cordY: Y,
        width: 80,
        text: 'Siraj Ahmad',
        rowNo: 1,
        colNo: 2,
      },
      {
        cordX: X,
        cordY: Y,
        width: 20,
        text: FakerUtil.getLoremText(100),
        rowNo: 2,
        colNo: 1,
      },
      {
        cordX: X,
        cordY: Y,
        width: 30,
        text: FakerUtil.getLoremText(50),
        rowNo: 2,
        colNo: 2,
      },
      {
        cordX: X,
        cordY: Y,
        width: 50,
        text: FakerUtil.getLoremText(150),
        rowNo: 2,
        colNo: 3,
      },

      {
        cordX: X,
        cordY: Y,
        width: 20,
        text: FakerUtil.getLoremText(10),
        rowNo: 3,
        colNo: 1,
      },
      {
        cordX: X,
        cordY: Y,
        width: 80,
        text: FakerUtil.getLoremText(80),
        rowNo: 3,
        colNo: 2,
      },
      // {
      //   cordX: X,
      //   cordY: Y,
      //   width: 20,
      //   text: FakerUtil.getLoremText(5),
      //   rowNo: 4,
      //   colNo: 1,
      // },
      // {
      //   cordX: X,
      //   cordY: Y,
      //   width: 20,
      //   text: FakerUtil.getLoremText(10),
      //   rowNo: 4,
      //   colNo: 2,
      // },
      // {
      //   cordX: X,
      //   cordY: Y,
      //   width: 60,
      //   text: FakerUtil.getLoremText(20),
      //   rowNo: 4,
      //   colNo: 3,
      // }
    ];

    const doc = new jsPDF('p', 'pt');
    doc.setFontSize(10);
    JsPdfHelper.creteTable(doc, template);

    // Optional - set properties on the document
    doc.setProperties({
      title: 'Title',
      subject: 'This is the subject',
      author: 'Fardeen Ahmad',
      keywords: 'jsPDF table',
      creator: 'Fardeen'
    });

    jsPDFUtil.openPdf(doc);
  }


  // tslint:disable-next-line:member-ordering
  actions = {
    exportToPdf: (key: string, elementId?: string) => {
      this.genratePdf(key, elementId);
    },
    exportComplex: (id) => {
      this.createTablePdfByHtmlId(id)
    },
    exportPdfTableByJsPdf: () => {
      this.createPdfTableByJsPdf();
    }
  };

}




export const DUMMY_COL_AND_ROWSPAN_DATA = [];
