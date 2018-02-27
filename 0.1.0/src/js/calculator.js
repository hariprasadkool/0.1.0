var calc = {
  add: function(a,b){return a+b;},
  sub: function(a,b){return a-b;},
  mul:function(a,b){return a*b;},
  div:function(a,b){return a/b;}

};

//without namespace
module.exports = calc;
//to look the body elegent we use without-namespace method mostly



//with namespace
module.exports.calculator = calc;
//we dont use with-namespace method mostly as it is little complicates the things..
