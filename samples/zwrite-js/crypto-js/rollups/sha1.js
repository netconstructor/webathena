/*
CryptoJS v3.x
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(m,n){var q={},h=q.lib={},o=h.Base=function(){function a(){}return{extend:function(b){a.prototype=this;var c=new a;b&&c.mixIn(b);c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.$super.extend(this)}}}(),p=h.WordArray=o.extend({init:function(a,b){a=
this.words=a||[];this.sigBytes=b!=n?b:4*a.length},toString:function(a){return(a||e).stringify(this)},concat:function(a){var b=this.words,c=a.words,d=this.sigBytes,a=a.sigBytes;this.clamp();if(d%4)for(var f=0;f<a;f++)b[d+f>>>2]|=(c[f>>>2]>>>24-8*(f%4)&255)<<24-8*((d+f)%4);else if(65535<c.length)for(f=0;f<a;f+=4)b[d+f>>>2]=c[f>>>2];else b.push.apply(b,c);this.sigBytes+=a;return this},clamp:function(){var a=this.words,b=this.sigBytes;a[b>>>2]&=4294967295<<32-8*(b%4);a.length=m.ceil(b/4)},clone:function(){var a=
o.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){return p.create(window.getRandomBytes(a),a)}}),k=q.enc={},e=k.Hex={stringify:function(a){for(var b=a.words,a=a.sigBytes,c=[],d=0;d<a;d++){var f=b[d>>>2]>>>24-8*(d%4)&255;c.push((f>>>4).toString(16));c.push((f&15).toString(16))}return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d+=2)c[d>>>3]|=parseInt(a.substr(d,2),16)<<24-4*(d%8);return p.create(c,b/2)}},g=k.Latin1={stringify:function(a){for(var b=a.words,
a=a.sigBytes,c=[],d=0;d<a;d++)c.push(String.fromCharCode(b[d>>>2]>>>24-8*(d%4)&255));return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d++)c[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return p.create(c,b)}},i=k.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},j=h.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=p.create();
this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=i.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,c=b.words,d=b.sigBytes,f=this.blockSize,e=d/(4*f),e=a?m.ceil(e):m.max((e|0)-this._minBufferSize,0),a=e*f,d=m.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(c,g);g=c.splice(0,a);b.sigBytes-=d}return p.create(g,d)},clone:function(){var a=o.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});h.Hasher=j.extend({init:function(){this.reset()},
reset:function(){j.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);this._doFinalize();return this._hash},clone:function(){var a=j.clone.call(this);a._hash=this._hash.clone();return a},blockSize:16,_createHelper:function(a){return function(b,c){return a.create(c).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return l.HMAC.create(a,c).finalize(b)}}});var l=q.algo={};return q}(Math);
(function(){var m=CryptoJS,n=m.lib,q=n.WordArray,n=n.Hasher,h=[],o=m.algo.SHA1=n.extend({_doReset:function(){this._hash=q.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(p,k){for(var e=this._hash.words,g=e[0],i=e[1],j=e[2],l=e[3],a=e[4],b=0;80>b;b++){if(16>b)h[b]=p[k+b]|0;else{var c=h[b-3]^h[b-8]^h[b-14]^h[b-16];h[b]=c<<1|c>>>31}c=(g<<5|g>>>27)+a+h[b];c=20>b?c+((i&j|~i&l)+1518500249):40>b?c+((i^j^l)+1859775393):60>b?c+((i&j|i&l|j&l)-1894007588):c+((i^j^l)-
899497514);a=l;l=j;j=i<<30|i>>>2;i=g;g=c}e[0]=e[0]+g|0;e[1]=e[1]+i|0;e[2]=e[2]+j|0;e[3]=e[3]+l|0;e[4]=e[4]+a|0},_doFinalize:function(){var h=this._data,k=h.words,e=8*this._nDataBytes,g=8*h.sigBytes;k[g>>>5]|=128<<24-g%32;k[(g+64>>>9<<4)+15]=e;h.sigBytes=4*k.length;this._process()}});m.SHA1=n._createHelper(o);m.HmacSHA1=n._createHmacHelper(o)})();