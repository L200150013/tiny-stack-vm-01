import{readFileSync as A,writeFileSync as B,mkdirSync as C,readdirSync as D}from"node:fs";
let Z={16:(a,b)=>a+b|0,17:(a,b)=>a-b|0,18:(a,b)=>Math.imul(a,b),19:(a,b)=>b?(a/b)|0:NaN,20:(a,b)=>b?a%b:NaN,21:(a,b)=>b?(a>>>0)/(b>>>0)|0:NaN,22:(a,b)=>b?(a>>>0)%(b>>>0)|0:NaN,24:(a,b)=>a&b,25:(a,b)=>a|b,26:(a,b)=>a^b,28:(a,b)=>a<<(b&31),29:(a,b)=>a>>(b&31),30:(a,b)=>a>>>(b&31),32:(a,b)=>a==b?1:0,33:(a,b)=>a<b?1:0,34:(a,b)=>(a>>>0)<(b>>>0)?1:0};
for(let I of D("/input").sort()){
let P=A("/input/"+I+"/program.bin"),N=A("/input/"+I+"/input.bin"),S=[],K=[],M=new Int32Array(256),O="",p=0,s=0,j=0,e=0,x=0;
let g=()=>P[x]|P[x+1]<<8,U=n=>{if(S.length<n){e=2;return 1}},V=v=>{if(S.length>255){e=3;return 1}S.push(v|0)};
X:for(;;){
if(s++>=1e6){e=10;break}
if(p<0||p>=P.length){e=9;break}
let o=P[p];x=p+1;
switch(o){
case 0:e=0;break X;
case 1:if(x>=P.length){e=9;break X}if(V(P[x]<<24>>24))break X;p=x+1;break;
case 2:if(x+3>=P.length){e=9;break X}if(V(P[x]|P[x+1]<<8|P[x+2]<<16|P[x+3]<<24))break X;p=x+4;break;
case 3:if(U(1))break X;S.pop();p=x;break;
case 4:if(U(1))break X;if(V(S[S.length-1]))break X;p=x;break;
case 5:if(U(2))break X;S.push(S.pop(),S.pop());p=x;break;
case 6:if(U(2))break X;if(V(S[S.length-2]))break X;p=x;break;
case 7:if(U(3))break X;S.push(S.splice(S.length-3,1)[0]);p=x;break;
case 23:if(U(1))break X;S[S.length-1]=-S[S.length-1]|0;p=x;break;
case 27:if(U(1))break X;S[S.length-1]=~S[S.length-1];p=x;break;
case 48:if(x+1>=P.length){e=9;break X}p=x+2+(g()<<16>>16);break;
case 49:case 50:if(x+1>=P.length){e=9;break X}if(U(1))break X;{let v=S.pop();p=(o==49)==(v==0)?x+2+(g()<<16>>16):x+2}break;
case 51:if(x+1>=P.length){e=9;break X}if(K.length>63){e=7;break X}K.push(x+2);p=g();break;
case 52:if(!K.length){e=8;break X}p=K.pop();break;
case 64:if(U(1))break X;{let a=S.pop();if(a<0||a>255){e=6;break X}S.push(M[a])}p=x;break;
case 65:if(U(2))break X;{let a=S.pop(),v=S.pop();if(a<0||a>255){e=6;break X}M[a]=v}p=x;break;
case 80:if(U(1))break X;{let v=S.pop(),t=""+v;if(O.length+t.length>65536){e=11;break X}O+=t}p=x;break;
case 81:if(U(1))break X;{let v=S.pop();if(O.length+1>65536){e=11;break X}O+=String.fromCharCode(v&255)}p=x;break;
case 82:if(V(j<N.length?N[j++]:-1))break X;p=x;break;
case 83:if(U(1))break X;e=S.pop()&255;break X;
default:{let f=Z[o];if(!f){e=5;break X}if(U(2))break X;let b=S.pop(),a=S.pop(),r=f(a,b);if(r!==r){e=4;break X}S.push(r|0);p=x}
}
}
C("/output/"+I,{recursive:true});
B("/output/"+I+"/stdout.bin",Buffer.from(O,"latin1"));
B("/output/"+I+"/exit.txt",e+"\n");
}
