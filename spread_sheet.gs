// スプレッドシートクラス
class SpreadSheet {
  constructor(sheetId, sheetName) {
    this.sheetId = sheetId;
    this.sheetName = sheetName;
    this.sheet = SpreadsheetApp.openById(this.sheetId).getSheetByName(this.sheetName);
    // Sheetオブジェクト.getRange(行番号, 列番号, 行数, 列数)
    this.lastColumn = this.sheet.getRange(HEADER_ROW, START_COLUMN).getNextDataCell(SpreadsheetApp.Direction.NEXT).getColumn();
    this.lastRow = this.sheet.getRange(HEADER_ROW, START_COLUMN).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
    this.records = this.sheet.getRange(HEADER_ROW, START_COLUMN, this.lastRow, this.lastColumn).getValues();
  }

  // GASで使いやすい配列に変換する
  toArray() {
    const keys = this.records[0];
    const array = this.records.slice(1).map((record) => {
      let obj = {};
      keys.forEach((key, i) => (obj[key] = record[i]));
      return obj;
    });

    return array;
  }

  // レコードを更新する
  update(id, ...record) {
    this.sheet.getRange(HEADER_ROW+id, START_COLUMN, 1, this.lastColumn).setValues(record);
  }
}