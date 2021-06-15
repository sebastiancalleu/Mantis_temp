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

exports.Question = Question;