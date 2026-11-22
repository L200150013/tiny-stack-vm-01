import{readFileSync as A,writeFileSync as B,mkdirSync as C,readdirSync as D}from"fs";
let Z="a+b;a-b;Math.imul(a,b);b?a/b:NaN;b?a%b:NaN;b?(a>>>0)/(b>>>0):NaN;b?(a>>>0)%(b>>>0):NaN;;a&b;a|b;a^b;;a<<b;a>>b;a>>>b;;a==b;a<b;(a>>>0)<(b>>>0)".split(";").map(s=>s&&eval("(a,b)=>"+s)),u="/input/";
for(let I of D(u)){
let P=A(u+I+"/program.bin"),N=A(u+I+"/input.bin"),S=[],K=[],M=[],O="",p=0,s=0,j=0,e=-1,a,b,f,r,o,d,q;
let g=()=>P[p]|P[p+1]<<8,U=n=>S.length<n?e=2:0,V=v=>S.length<256?S.push(v|0)&&0:e=3,Q=()=>S.length?S.pop():e=2;
for(;e<0;)
++s>1e6?e=10:p<0|p>=P.length?e=9:(o=P[p++],q=p+2+(g()<<16>>16),o==0?e=0:o==1?p>=P.length?e=9:V(P[p++]<<24>>24):o==2?p+3>=P.length?e=9:(V(P.readInt32LE(p)),p+=4):o==3?Q():o==4?U(1)?0:V(S.at(-1)):o==5?S.push(Q(),Q()):o==6?U(2)?0:V(S.at(-2)):o==7?U(3)?0:V(S.splice(-3,1)[0]):o==23?V(-Q()|0):o==27?V(~Q()):o==48?p+1>=P.length?e=9:p=q:o==49|o==50?p+1>=P.length?e=9:(a=Q(),p=(o==49)==(a==0)?q:p+2):o==51?p+1>=P.length?e=9:K[63]?e=7:(K.push(p+2),p=g()):o==52?K[0]?p=K.pop():e=8:o==64?(a=Q(),a>>8?e=6:V(M[a]|0)):o==65?(a=Q(),b=Q(),e<0&&a>>8?e=6:M[a]=b):o==80?U(1)?0:(a=Q(),O.length+(""+a).length>65536?e=11:O+=a):o==81?U(1)?0:(a=Q(),O.length>65535?e=11:O+=String.fromCharCode(a&255)):o==82?V(N[j++]??-1):o==83?e=Q()&255:(f=Z[o-16])?(b=Q(),a=Q(),r=f(a,b),e<0?r!==r?e=4:V(r|0):0):e=5);
d="/output/"+I;C(d,{recursive:true});B(d+"/stdout.bin",O,"latin1");B(d+"/exit.txt",e+"\n");
}
