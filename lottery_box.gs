// 抽選箱クラス
class LotteryBox {
  constructor(members) {
    this.members = members;
    this.candidates = this.getCandidates();
  }

  // 候補者を取得する
  getCandidates() {
    const minimum = this.getMinimum(this.members);
    const candidates = [];
    this.members.map((member) => {
      if (member.isCandidate(minimum)) candidates.push(member);
    });

    return candidates;
  }

  // 発表回数の最小値を取得する
  getMinimum() {
    return Math.min(...this.members.map(member => member.presentationCount));
  }

  // 抽選を行う
  execute() {
    const target = Math.floor(Math.random() * this.candidates.length);
    return this.candidates[target];
  }
}