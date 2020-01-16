let count = 0;
const limitHandle = (callback, limitNum, allNum) => {
  if (!limitNum || !allNum || limitNum > allNum) {
    return;
  }
  count++;
  if ((allNum - count) > limitNum) {
    return ;
  } else if ((allNum - count) <= 0) {
    count = 0;
    return;
  }
  callback && callback();
}


// test code
function test() {
  Array(30).fill(1).forEach(() => {
    limitHandle(() => {
      console.log(11);
    }, 1, 10);
  })
}
// log there times
test();
