const doGet = (e) => {  
  const html = HtmlService.createTemplateFromFile('index');

  const membersSheet = new SpreadSheet(SHEET_ID, MEMBERS_SHEET_NAME);
  const members = membersSheet.toArray().map((record, index) => {
    return new Member(index+HEADER_ROW, ...Object.values(record));
  });
  html['members'] = members;

  return html.evaluate()
             .setTitle('LT会担当者選出')
             .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

const doPost = () => {
  const membersSheet = new SpreadSheet(SHEET_ID, MEMBERS_SHEET_NAME);
  const members = membersSheet.toArray().map((record, index) => {
    return new Member(index+HEADER_ROW, ...Object.values(record))
  });

  const lottertBox = new LotteryBox(members);
  const selectedMember = lottertBox.execute();

  members.map((member) => {
    member.setPresenterInfo();
    if (member.isSelected(selectedMember)) {
      member.setSelectedMemberInfo();
    }

    member.toSpreadSheet(membersSheet);
  });
  
  return selectedMember.name;
}