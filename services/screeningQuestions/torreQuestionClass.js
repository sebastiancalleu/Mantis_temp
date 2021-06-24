class Question {

  constructor(title, type, rank, options = []) {

    this.title = title;
    this.type = type;
    this.rank = rank;
    this.options = options;
    this.format = 'write';
    this.purpose = 'learn';
    this.locale = 'en';
  }
}

class Option {

  constructor(title, rank) {

    this.id = '';
    this.purposeType = 'qualifies';
    this.title = title;
    this.rank = rank;
  }
}

exports.Question = Question;
exports.Option = Option;