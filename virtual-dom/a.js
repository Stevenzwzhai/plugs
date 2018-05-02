var findMedianSortedArrays = function(nums1, nums2) {
    var c1 = 0;
    var i1 = 0
    if(nums1.length == 1){
        c1 = nums1[0]
        i1 = 1;
    }else if(nums1.length>1){
        c1 = nums1.length%2 ? nums1[Math.floor(nums1.length/2)] : (nums1[nums1.length/2-1]+nums1[nums1.length/2])/2
        i1 = nums1.length%2 ? Math.floor(nums1.length/2) : nums1.length/2
    }
    var c2 = 0;
    var i2 = 0;
    if(nums2.length == 1){
        c2 = nums2[0]
        i2 = 1;
    }else if(nums2.length>1){
        c2 = nums2.length%2 ? nums1[Math.floor(nums2.length/2)] : (nums2[nums2.length/2-1]+nums2[nums2.length/2])/2
        i2 = nums2.length%2 ? Math.floor(nums2.length/2) : nums2.length/2
    }
    var l1 = [], l2 = [], r1 = [], r2 = [];
    if(c1 > c2){
        for(var i = i2;i<nums2.length;i++){
            if(nums2[i]>=c1){
                i2 = i;
                break;
            }
        }
    }else{
        for(var i = i1;i<nums1.length;i++){
            if(nums1[i]>=c2){
                i1 = i;
                break;
            }
        }
    }
    console.log(c1, c2, i1, i2)
    l1 = nums1.slice(0, i1)
    l2 = nums2.slice(0, i2)
    r1 = nums1.slice(i1, nums1.length)
    r2 = nums2.slice(i2, nums2.length)
    var llen = l1.length+l2.length;
    var rlen = r1.length+r2.length;
    var diffLen = llen-rlen;
    console.log(diffLen, l1, l2)
    if(diffLen>0){
        var newArr = l1.concat(l2).sort((a,b) => a>b);
        console.log(newArr)
        return diffLen%2 ? newArr[newArr.length-Math.ceil(diffLen/2)] : (newArr[newArr.length-Math.ceil(diffLen/2)]+newArr[newArr.length-Math.floor(diffLen/2)])/2
    }else if(diffLen==0){
       return ( Math.max(l1.pop(), l2.pop())+Math.max(r1.shift(), r2.shift()))/2
    }else{
        var newArr = r1.concat(r2).sort((a,b) => a>b);
        return diffLen%2 ? newArr[Math.floor(diffLen/2)] : (newArr[Math.ceil(diffLen/2)]+newArr[Math.floor(diffLen/2)])/2
    }
};
console.log(findMedianSortedArrays([1,3], [2]))