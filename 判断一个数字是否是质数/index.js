/**
 * Created by Stevenzwzhai on 2017/3/1.
 */
//。如果你测试输入偶数，你的算法将慢2倍（你测试双倍数字）。可以采取其他一些更明智的优化手段，我这里采用的是适用于大多数情况的。例如，如果一个数字不能被5整除，它也不会被5的倍数整除。所以，没有必要检测10,15,20等等。
function isPrime(number){
	if(typeof number != "number" || !Number.isInteger(number)){
		return false;
	}
	if(number<2){
		return false;
	}
	if(number == 2){
		return true;
	}else if(number%2==0){
		return false;
	}
	var squareRoot = Math.sqrt(number);
	for(var i = 3; i <= squareRoot; i += 2) {
		if (number % i === 0) {
			return false;
		}
	}
	return true;
}