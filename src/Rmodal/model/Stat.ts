/**
 * promise返回值的模型
 */
class Stat {
  stat = '';

  result = {};

  constructor({ result = {}, stat = '' }) {
    this.stat = stat;
    this.result = result;
  }

  sayStat() {
    console.log(this.stat);
    console.log(this.result);
  }
}

export default Stat;
