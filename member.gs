// メンバークラス
class Member {
  constructor(id, name, presentationCount, isTodayPresenter, isNextWeekPresenter) {
    this.id = id;
    this.name = name;
    this.presentationCount = presentationCount;
    this.isTodayPresenter = isTodayPresenter;
    this.isNextWeekPresenter = isNextWeekPresenter;
  }

  isReserved() {
    if (this.isTodayPresenter || this.isNextWeekPresenter) return true;

    return false;
  }

  isSelected(selectedMember) {
    return this === selectedMember
  }

  isCandidate(minimum) {
    // 発表の予約が入っている人は候補者には含まない
    if (this.isReserved()) return false;

    // 発表回数が少ない人を候補者にする
    return this.presentationCount === minimum;
  }

  setPresenterInfo() {
    if (this.isTodayPresenter) this.isTodayPresenter = 0;
    if (this.isNextWeekPresenter) {
      this.isTodayPresenter = 1;
      this.isNextWeekPresenter = 0;
    }
  }

  setSelectedMemberInfo() {
    this.presentationCount += 1;
    this.isNextWeekPresenter = 1;
  }

  toSpreadSheet(spreadSheet) {
    const recordArray = [
      this.name,
      this.presentationCount,
      this.isTodayPresenter,
      this.isNextWeekPresenter,
    ];
    spreadSheet.update(this.id, recordArray);
  }
}