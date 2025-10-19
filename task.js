const a = 5;

const myFilter = (e, i, a) => {
  console.log(55);
};

myFilter();

Array.prototype.filter2 = function (fn) {
  //   this = []
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    if ((fn(this[i]), i, this)) {
      newArr.push(this[i]);
    }
  }
};

const arr = [1, 2, 3, 4, 5];
arr.filter2();
