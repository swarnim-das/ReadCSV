//var exports = module.exports = {};

exports.arrayMerge = function(arr1, arr2, arr3) {
    for(let i=0;i<arr1.length;i++) {
        for(let j=0;j<arr2.length;j++) {
            if(i===j) {
                let tempObj = Object.assign(arr1[j],arr2[j]);
                arr3.push(tempObj);
            }    
        }
    }
}