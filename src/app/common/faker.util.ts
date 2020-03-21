import * as faker from 'faker';

export class FakerUtil {

  static headRows() {
    return [
      { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
    ];
  }

  static headRowsObj(): {} {
     return { id: 'ID', name: 'Name', email: 'Email' };
  }

  static footRows() {
    return [
      { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
    ];
  }

  static columns() {
    return [
      { header: 'ID', dataKey: 'id' },
      { header: 'Name', dataKey: 'name' },
      { header: 'Email', dataKey: 'email' },
      { header: 'City', dataKey: 'city' },
      { header: 'Exp', dataKey: 'expenses' },
    ];
  }

  static data(rowCount) {
    rowCount = rowCount || 10;
    const body = [];
    for (let j = 1; j <= rowCount; j++) {
      body.push({
        id: j,
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
        expenses: faker.finance.amount(),
        countryCode: faker.address.countryCode()
      });
    }
    return body;
  }

  static bodyRows(rowCount) {
    rowCount = rowCount || 10;
    const body = [];
    for (let j = 1; j <= rowCount; j++) {
      body.push({
        id: j,
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
        expenses: faker.finance.amount(),
      });
    }
    return body;
  }

  static getRowAndColSpanBody(count?: number) {
    count = count || 40;
    const body = [];
    const raw = this.bodyRows(count);
    for (let i = 0; i < raw.length; i++) {
      const row = [];
      // tslint:disable-next-line:forin
      for (const key in raw[i]) {
        row.push(raw[i][key]);
      }
      if (i % 5 === 0) {
        row.unshift({
          rowSpan: 5,
          content: i / 5 + 1,
          styles: { valign: 'middle', halign: 'center' },
        });
      }
      body.push(row);
    }
    return body;
  }

  static getLoremText(chars?: number): string {
    chars = chars || 45;
    return faker.lorem.sentence(chars);
  }

}
