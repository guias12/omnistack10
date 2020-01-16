module.exports = function parseStringAsArray(str){
    return str.split(',').map(strSplit => strSplit.trim());
}