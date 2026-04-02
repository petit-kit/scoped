function _r(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Tu,bt;function yr(){if(bt)return Tu;bt=1;function e(b){return b instanceof Map?b.clear=b.delete=b.set=function(){throw new Error("map is read-only")}:b instanceof Set&&(b.add=b.clear=b.delete=function(){throw new Error("set is read-only")}),Object.freeze(b),Object.getOwnPropertyNames(b).forEach(k=>{const w=b[k],B=typeof w;(B==="object"||B==="function")&&!Object.isFrozen(w)&&e(w)}),b}class u{constructor(k){k.data===void 0&&(k.data={}),this.data=k.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function t(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function n(b,...k){const w=Object.create(null);for(const B in b)w[B]=b[B];return k.forEach(function(B){for(const J in B)w[J]=B[J]}),w}const r="</span>",i=b=>!!b.scope,o=(b,{prefix:k})=>{if(b.startsWith("language:"))return b.replace("language:","language-");if(b.includes(".")){const w=b.split(".");return[`${k}${w.shift()}`,...w.map((B,J)=>`${B}${"_".repeat(J+1)}`)].join(" ")}return`${k}${b}`};class s{constructor(k,w){this.buffer="",this.classPrefix=w.classPrefix,k.walk(this)}addText(k){this.buffer+=t(k)}openNode(k){if(!i(k))return;const w=o(k.scope,{prefix:this.classPrefix});this.span(w)}closeNode(k){i(k)&&(this.buffer+=r)}value(){return this.buffer}span(k){this.buffer+=`<span class="${k}">`}}const c=(b={})=>{const k={children:[]};return Object.assign(k,b),k};class l{constructor(){this.rootNode=c(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(k){this.top.children.push(k)}openNode(k){const w=c({scope:k});this.add(w),this.stack.push(w)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(k){return this.constructor._walk(k,this.rootNode)}static _walk(k,w){return typeof w=="string"?k.addText(w):w.children&&(k.openNode(w),w.children.forEach(B=>this._walk(k,B)),k.closeNode(w)),k}static _collapse(k){typeof k!="string"&&k.children&&(k.children.every(w=>typeof w=="string")?k.children=[k.children.join("")]:k.children.forEach(w=>{l._collapse(w)}))}}class p extends l{constructor(k){super(),this.options=k}addText(k){k!==""&&this.add(k)}startScope(k){this.openNode(k)}endScope(){this.closeNode()}__addSublanguage(k,w){const B=k.root;w&&(B.scope=`language:${w}`),this.add(B)}toHTML(){return new s(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function a(b){return b?typeof b=="string"?b:b.source:null}function f(b){return g("(?=",b,")")}function h(b){return g("(?:",b,")*")}function d(b){return g("(?:",b,")?")}function g(...b){return b.map(w=>a(w)).join("")}function m(b){const k=b[b.length-1];return typeof k=="object"&&k.constructor===Object?(b.splice(b.length-1,1),k):{}}function E(...b){return"("+(m(b).capture?"":"?:")+b.map(B=>a(B)).join("|")+")"}function _(b){return new RegExp(b.toString()+"|").exec("").length-1}function x(b,k){const w=b&&b.exec(k);return w&&w.index===0}const y=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function v(b,{joinWith:k}){let w=0;return b.map(B=>{w+=1;const J=w;let Q=a(B),R="";for(;Q.length>0;){const T=y.exec(Q);if(!T){R+=Q;break}R+=Q.substring(0,T.index),Q=Q.substring(T.index+T[0].length),T[0][0]==="\\"&&T[1]?R+="\\"+String(Number(T[1])+J):(R+=T[0],T[0]==="("&&w++)}return R}).map(B=>`(${B})`).join(k)}const C=/\b\B/,D="[a-zA-Z]\\w*",F="[a-zA-Z_]\\w*",$="\\b\\d+(\\.\\d+)?",M="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",O="\\b(0b[01]+)",z="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",U=(b={})=>{const k=/^#![ ]*\//;return b.binary&&(b.begin=g(k,/.*\b/,b.binary,/\b.*/)),n({scope:"meta",begin:k,end:/$/,relevance:0,"on:begin":(w,B)=>{w.index!==0&&B.ignoreMatch()}},b)},H={begin:"\\\\[\\s\\S]",relevance:0},q={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[H]},V={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[H]},we={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},G=function(b,k,w={}){const B=n({scope:"comment",begin:b,end:k,contains:[]},w);B.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const J=E("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return B.contains.push({begin:g(/[ ]+/,"(",J,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),B},ae=G("//","$"),fe=G("/\\*","\\*/"),be=G("#","$"),De={scope:"number",begin:$,relevance:0},Le={scope:"number",begin:M,relevance:0},Tn={scope:"number",begin:O,relevance:0},Mn={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[H,{begin:/\[/,end:/\]/,relevance:0,contains:[H]}]},Rn={scope:"title",begin:D,relevance:0},Nn={scope:"title",begin:F,relevance:0},On={begin:"\\.\\s*"+F,relevance:0};var ru=Object.freeze({__proto__:null,APOS_STRING_MODE:q,BACKSLASH_ESCAPE:H,BINARY_NUMBER_MODE:Tn,BINARY_NUMBER_RE:O,COMMENT:G,C_BLOCK_COMMENT_MODE:fe,C_LINE_COMMENT_MODE:ae,C_NUMBER_MODE:Le,C_NUMBER_RE:M,END_SAME_AS_BEGIN:function(b){return Object.assign(b,{"on:begin":(k,w)=>{w.data._beginMatch=k[1]},"on:end":(k,w)=>{w.data._beginMatch!==k[1]&&w.ignoreMatch()}})},HASH_COMMENT_MODE:be,IDENT_RE:D,MATCH_NOTHING_RE:C,METHOD_GUARD:On,NUMBER_MODE:De,NUMBER_RE:$,PHRASAL_WORDS_MODE:we,QUOTE_STRING_MODE:V,REGEXP_MODE:Mn,RE_STARTERS_RE:z,SHEBANG:U,TITLE_MODE:Rn,UNDERSCORE_IDENT_RE:F,UNDERSCORE_TITLE_MODE:Nn});function In(b,k){b.input[b.index-1]==="."&&k.ignoreMatch()}function Ln(b,k){b.className!==void 0&&(b.scope=b.className,delete b.className)}function Bn(b,k){k&&b.beginKeywords&&(b.begin="\\b("+b.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",b.__beforeBegin=In,b.keywords=b.keywords||b.beginKeywords,delete b.beginKeywords,b.relevance===void 0&&(b.relevance=0))}function Pn(b,k){Array.isArray(b.illegal)&&(b.illegal=E(...b.illegal))}function $n(b,k){if(b.match){if(b.begin||b.end)throw new Error("begin & end are not supported with match");b.begin=b.match,delete b.match}}function zn(b,k){b.relevance===void 0&&(b.relevance=1)}const Un=(b,k)=>{if(!b.beforeMatch)return;if(b.starts)throw new Error("beforeMatch cannot be used with starts");const w=Object.assign({},b);Object.keys(b).forEach(B=>{delete b[B]}),b.keywords=w.keywords,b.begin=g(w.beforeMatch,f(w.begin)),b.starts={relevance:0,contains:[Object.assign(w,{endsParent:!0})]},b.relevance=0,delete w.beforeMatch},qn=["of","and","for","in","not","or","if","then","parent","list","value"],jn="keyword";function Qu(b,k,w=jn){const B=Object.create(null);return typeof b=="string"?J(w,b.split(" ")):Array.isArray(b)?J(w,b):Object.keys(b).forEach(function(Q){Object.assign(B,Qu(b[Q],k,Q))}),B;function J(Q,R){k&&(R=R.map(T=>T.toLowerCase())),R.forEach(function(T){const L=T.split("|");B[L[0]]=[Q,Hn(L[0],L[1])]})}}function Hn(b,k){return k?Number(k):Zn(b)?0:1}function Zn(b){return qn.includes(b.toLowerCase())}const et={},Be=b=>{console.error(b)},ut=(b,...k)=>{console.log(`WARN: ${b}`,...k)},ze=(b,k)=>{et[`${b}/${k}`]||(console.log(`Deprecated as of ${b}. ${k}`),et[`${b}/${k}`]=!0)},iu=new Error;function tt(b,k,{key:w}){let B=0;const J=b[w],Q={},R={};for(let T=1;T<=k.length;T++)R[T+B]=J[T],Q[T+B]=!0,B+=_(k[T-1]);b[w]=R,b[w]._emit=Q,b[w]._multi=!0}function Gn(b){if(Array.isArray(b.begin)){if(b.skip||b.excludeBegin||b.returnBegin)throw Be("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),iu;if(typeof b.beginScope!="object"||b.beginScope===null)throw Be("beginScope must be object"),iu;tt(b,b.begin,{key:"beginScope"}),b.begin=v(b.begin,{joinWith:""})}}function Wn(b){if(Array.isArray(b.end)){if(b.skip||b.excludeEnd||b.returnEnd)throw Be("skip, excludeEnd, returnEnd not compatible with endScope: {}"),iu;if(typeof b.endScope!="object"||b.endScope===null)throw Be("endScope must be object"),iu;tt(b,b.end,{key:"endScope"}),b.end=v(b.end,{joinWith:""})}}function Vn(b){b.scope&&typeof b.scope=="object"&&b.scope!==null&&(b.beginScope=b.scope,delete b.scope)}function Kn(b){Vn(b),typeof b.beginScope=="string"&&(b.beginScope={_wrap:b.beginScope}),typeof b.endScope=="string"&&(b.endScope={_wrap:b.endScope}),Gn(b),Wn(b)}function Yn(b){function k(R,T){return new RegExp(a(R),"m"+(b.case_insensitive?"i":"")+(b.unicodeRegex?"u":"")+(T?"g":""))}class w{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(T,L){L.position=this.position++,this.matchIndexes[this.matchAt]=L,this.regexes.push([L,T]),this.matchAt+=_(T)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const T=this.regexes.map(L=>L[1]);this.matcherRe=k(v(T,{joinWith:"|"}),!0),this.lastIndex=0}exec(T){this.matcherRe.lastIndex=this.lastIndex;const L=this.matcherRe.exec(T);if(!L)return null;const re=L.findIndex((Ve,Cu)=>Cu>0&&Ve!==void 0),ee=this.matchIndexes[re];return L.splice(0,re),Object.assign(L,ee)}}class B{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(T){if(this.multiRegexes[T])return this.multiRegexes[T];const L=new w;return this.rules.slice(T).forEach(([re,ee])=>L.addRule(re,ee)),L.compile(),this.multiRegexes[T]=L,L}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(T,L){this.rules.push([T,L]),L.type==="begin"&&this.count++}exec(T){const L=this.getMatcher(this.regexIndex);L.lastIndex=this.lastIndex;let re=L.exec(T);if(this.resumingScanAtSamePosition()&&!(re&&re.index===this.lastIndex)){const ee=this.getMatcher(0);ee.lastIndex=this.lastIndex+1,re=ee.exec(T)}return re&&(this.regexIndex+=re.position+1,this.regexIndex===this.count&&this.considerAll()),re}}function J(R){const T=new B;return R.contains.forEach(L=>T.addRule(L.begin,{rule:L,type:"begin"})),R.terminatorEnd&&T.addRule(R.terminatorEnd,{type:"end"}),R.illegal&&T.addRule(R.illegal,{type:"illegal"}),T}function Q(R,T){const L=R;if(R.isCompiled)return L;[Ln,$n,Kn,Un].forEach(ee=>ee(R,T)),b.compilerExtensions.forEach(ee=>ee(R,T)),R.__beforeBegin=null,[Bn,Pn,zn].forEach(ee=>ee(R,T)),R.isCompiled=!0;let re=null;return typeof R.keywords=="object"&&R.keywords.$pattern&&(R.keywords=Object.assign({},R.keywords),re=R.keywords.$pattern,delete R.keywords.$pattern),re=re||/\w+/,R.keywords&&(R.keywords=Qu(R.keywords,b.case_insensitive)),L.keywordPatternRe=k(re,!0),T&&(R.begin||(R.begin=/\B|\b/),L.beginRe=k(L.begin),!R.end&&!R.endsWithParent&&(R.end=/\B|\b/),R.end&&(L.endRe=k(L.end)),L.terminatorEnd=a(L.end)||"",R.endsWithParent&&T.terminatorEnd&&(L.terminatorEnd+=(R.end?"|":"")+T.terminatorEnd)),R.illegal&&(L.illegalRe=k(R.illegal)),R.contains||(R.contains=[]),R.contains=[].concat(...R.contains.map(function(ee){return Xn(ee==="self"?R:ee)})),R.contains.forEach(function(ee){Q(ee,L)}),R.starts&&Q(R.starts,T),L.matcher=J(L),L}if(b.compilerExtensions||(b.compilerExtensions=[]),b.contains&&b.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return b.classNameAliases=n(b.classNameAliases||{}),Q(b)}function nt(b){return b?b.endsWithParent||nt(b.starts):!1}function Xn(b){return b.variants&&!b.cachedVariants&&(b.cachedVariants=b.variants.map(function(k){return n(b,{variants:null},k)})),b.cachedVariants?b.cachedVariants:nt(b)?n(b,{starts:b.starts?n(b.starts):null}):Object.isFrozen(b)?n(b):b}var Jn="11.11.1";class Qn extends Error{constructor(k,w){super(k),this.name="HTMLInjectionError",this.html=w}}const vu=t,rt=n,it=Symbol("nomatch"),er=7,st=function(b){const k=Object.create(null),w=Object.create(null),B=[];let J=!0;const Q="Could not find the language '{}', did you forget to load/include a language module?",R={disableAutodetect:!0,name:"Plain text",contains:[]};let T={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:p};function L(A){return T.noHighlightRe.test(A)}function re(A){let I=A.className+" ";I+=A.parentNode?A.parentNode.className:"";const Z=T.languageDetectRe.exec(I);if(Z){const K=Fe(Z[1]);return K||(ut(Q.replace("{}",Z[1])),ut("Falling back to no-highlight mode for this block.",A)),K?Z[1]:"no-highlight"}return I.split(/\s+/).find(K=>L(K)||Fe(K))}function ee(A,I,Z){let K="",ue="";typeof I=="object"?(K=A,Z=I.ignoreIllegals,ue=I.language):(ze("10.7.0","highlight(lang, code, ...args) has been deprecated."),ze("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),ue=A,K=I),Z===void 0&&(Z=!0);const ge={code:K,language:ue};ou("before:highlight",ge);const Te=ge.result?ge.result:Ve(ge.language,ge.code,Z);return Te.code=ge.code,ou("after:highlight",Te),Te}function Ve(A,I,Z,K){const ue=Object.create(null);function ge(S,N){return S.keywords[N]}function Te(){if(!P.keywords){oe.addText(Y);return}let S=0;P.keywordPatternRe.lastIndex=0;let N=P.keywordPatternRe.exec(Y),j="";for(;N;){j+=Y.substring(S,N.index);const W=ye.case_insensitive?N[0].toLowerCase():N[0],ce=ge(P,W);if(ce){const[Se,mr]=ce;if(oe.addText(j),j="",ue[W]=(ue[W]||0)+1,ue[W]<=er&&(lu+=mr),Se.startsWith("_"))j+=N[0];else{const xr=ye.classNameAliases[Se]||Se;_e(N[0],xr)}}else j+=N[0];S=P.keywordPatternRe.lastIndex,N=P.keywordPatternRe.exec(Y)}j+=Y.substring(S),oe.addText(j)}function cu(){if(Y==="")return;let S=null;if(typeof P.subLanguage=="string"){if(!k[P.subLanguage]){oe.addText(Y);return}S=Ve(P.subLanguage,Y,!0,pt[P.subLanguage]),pt[P.subLanguage]=S._top}else S=Au(Y,P.subLanguage.length?P.subLanguage:null);P.relevance>0&&(lu+=S.relevance),oe.__addSublanguage(S._emitter,S.language)}function de(){P.subLanguage!=null?cu():Te(),Y=""}function _e(S,N){S!==""&&(oe.startScope(N),oe.addText(S),oe.endScope())}function lt(S,N){let j=1;const W=N.length-1;for(;j<=W;){if(!S._emit[j]){j++;continue}const ce=ye.classNameAliases[S[j]]||S[j],Se=N[j];ce?_e(Se,ce):(Y=Se,Te(),Y=""),j++}}function ft(S,N){return S.scope&&typeof S.scope=="string"&&oe.openNode(ye.classNameAliases[S.scope]||S.scope),S.beginScope&&(S.beginScope._wrap?(_e(Y,ye.classNameAliases[S.beginScope._wrap]||S.beginScope._wrap),Y=""):S.beginScope._multi&&(lt(S.beginScope,N),Y="")),P=Object.create(S,{parent:{value:P}}),P}function dt(S,N,j){let W=x(S.endRe,j);if(W){if(S["on:end"]){const ce=new u(S);S["on:end"](N,ce),ce.isMatchIgnored&&(W=!1)}if(W){for(;S.endsParent&&S.parent;)S=S.parent;return S}}if(S.endsWithParent)return dt(S.parent,N,j)}function dr(S){return P.matcher.regexIndex===0?(Y+=S[0],1):(Fu=!0,0)}function hr(S){const N=S[0],j=S.rule,W=new u(j),ce=[j.__beforeBegin,j["on:begin"]];for(const Se of ce)if(Se&&(Se(S,W),W.isMatchIgnored))return dr(N);return j.skip?Y+=N:(j.excludeBegin&&(Y+=N),de(),!j.returnBegin&&!j.excludeBegin&&(Y=N)),ft(j,S),j.returnBegin?0:N.length}function pr(S){const N=S[0],j=I.substring(S.index),W=dt(P,S,j);if(!W)return it;const ce=P;P.endScope&&P.endScope._wrap?(de(),_e(N,P.endScope._wrap)):P.endScope&&P.endScope._multi?(de(),lt(P.endScope,S)):ce.skip?Y+=N:(ce.returnEnd||ce.excludeEnd||(Y+=N),de(),ce.excludeEnd&&(Y=N));do P.scope&&oe.closeNode(),!P.skip&&!P.subLanguage&&(lu+=P.relevance),P=P.parent;while(P!==W.parent);return W.starts&&ft(W.starts,S),ce.returnEnd?0:N.length}function br(){const S=[];for(let N=P;N!==ye;N=N.parent)N.scope&&S.unshift(N.scope);S.forEach(N=>oe.openNode(N))}let au={};function ht(S,N){const j=N&&N[0];if(Y+=S,j==null)return de(),0;if(au.type==="begin"&&N.type==="end"&&au.index===N.index&&j===""){if(Y+=I.slice(N.index,N.index+1),!J){const W=new Error(`0 width match regex (${A})`);throw W.languageName=A,W.badRule=au.rule,W}return 1}if(au=N,N.type==="begin")return hr(N);if(N.type==="illegal"&&!Z){const W=new Error('Illegal lexeme "'+j+'" for mode "'+(P.scope||"<unnamed>")+'"');throw W.mode=P,W}else if(N.type==="end"){const W=pr(N);if(W!==it)return W}if(N.type==="illegal"&&j==="")return Y+=`
`,1;if(Su>1e5&&Su>N.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=j,j.length}const ye=Fe(A);if(!ye)throw Be(Q.replace("{}",A)),new Error('Unknown language: "'+A+'"');const gr=Yn(ye);let Du="",P=K||gr;const pt={},oe=new T.__emitter(T);br();let Y="",lu=0,Pe=0,Su=0,Fu=!1;try{if(ye.__emitTokens)ye.__emitTokens(I,oe);else{for(P.matcher.considerAll();;){Su++,Fu?Fu=!1:P.matcher.considerAll(),P.matcher.lastIndex=Pe;const S=P.matcher.exec(I);if(!S)break;const N=I.substring(Pe,S.index),j=ht(N,S);Pe=S.index+j}ht(I.substring(Pe))}return oe.finalize(),Du=oe.toHTML(),{language:A,value:Du,relevance:lu,illegal:!1,_emitter:oe,_top:P}}catch(S){if(S.message&&S.message.includes("Illegal"))return{language:A,value:vu(I),illegal:!0,relevance:0,_illegalBy:{message:S.message,index:Pe,context:I.slice(Pe-100,Pe+100),mode:S.mode,resultSoFar:Du},_emitter:oe};if(J)return{language:A,value:vu(I),illegal:!1,relevance:0,errorRaised:S,_emitter:oe,_top:P};throw S}}function Cu(A){const I={value:vu(A),illegal:!1,relevance:0,_top:R,_emitter:new T.__emitter(T)};return I._emitter.addText(A),I}function Au(A,I){I=I||T.languages||Object.keys(k);const Z=Cu(A),K=I.filter(Fe).filter(at).map(de=>Ve(de,A,!1));K.unshift(Z);const ue=K.sort((de,_e)=>{if(de.relevance!==_e.relevance)return _e.relevance-de.relevance;if(de.language&&_e.language){if(Fe(de.language).supersetOf===_e.language)return 1;if(Fe(_e.language).supersetOf===de.language)return-1}return 0}),[ge,Te]=ue,cu=ge;return cu.secondBest=Te,cu}function ur(A,I,Z){const K=I&&w[I]||Z;A.classList.add("hljs"),A.classList.add(`language-${K}`)}function wu(A){let I=null;const Z=re(A);if(L(Z))return;if(ou("before:highlightElement",{el:A,language:Z}),A.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",A);return}if(A.children.length>0&&(T.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(A)),T.throwUnescapedHTML))throw new Qn("One of your code blocks includes unescaped HTML.",A.innerHTML);I=A;const K=I.textContent,ue=Z?ee(K,{language:Z,ignoreIllegals:!0}):Au(K);A.innerHTML=ue.value,A.dataset.highlighted="yes",ur(A,Z,ue.language),A.result={language:ue.language,re:ue.relevance,relevance:ue.relevance},ue.secondBest&&(A.secondBest={language:ue.secondBest.language,relevance:ue.secondBest.relevance}),ou("after:highlightElement",{el:A,result:ue,text:K})}function tr(A){T=rt(T,A)}const nr=()=>{su(),ze("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function rr(){su(),ze("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let ot=!1;function su(){function A(){su()}if(document.readyState==="loading"){ot||window.addEventListener("DOMContentLoaded",A,!1),ot=!0;return}document.querySelectorAll(T.cssSelector).forEach(wu)}function ir(A,I){let Z=null;try{Z=I(b)}catch(K){if(Be("Language definition for '{}' could not be registered.".replace("{}",A)),J)Be(K);else throw K;Z=R}Z.name||(Z.name=A),k[A]=Z,Z.rawDefinition=I.bind(null,b),Z.aliases&&ct(Z.aliases,{languageName:A})}function sr(A){delete k[A];for(const I of Object.keys(w))w[I]===A&&delete w[I]}function or(){return Object.keys(k)}function Fe(A){return A=(A||"").toLowerCase(),k[A]||k[w[A]]}function ct(A,{languageName:I}){typeof A=="string"&&(A=[A]),A.forEach(Z=>{w[Z.toLowerCase()]=I})}function at(A){const I=Fe(A);return I&&!I.disableAutodetect}function cr(A){A["before:highlightBlock"]&&!A["before:highlightElement"]&&(A["before:highlightElement"]=I=>{A["before:highlightBlock"](Object.assign({block:I.el},I))}),A["after:highlightBlock"]&&!A["after:highlightElement"]&&(A["after:highlightElement"]=I=>{A["after:highlightBlock"](Object.assign({block:I.el},I))})}function ar(A){cr(A),B.push(A)}function lr(A){const I=B.indexOf(A);I!==-1&&B.splice(I,1)}function ou(A,I){const Z=A;B.forEach(function(K){K[Z]&&K[Z](I)})}function fr(A){return ze("10.7.0","highlightBlock will be removed entirely in v12.0"),ze("10.7.0","Please use highlightElement now."),wu(A)}Object.assign(b,{highlight:ee,highlightAuto:Au,highlightAll:su,highlightElement:wu,highlightBlock:fr,configure:tr,initHighlighting:nr,initHighlightingOnLoad:rr,registerLanguage:ir,unregisterLanguage:sr,listLanguages:or,getLanguage:Fe,registerAliases:ct,autoDetection:at,inherit:rt,addPlugin:ar,removePlugin:lr}),b.debugMode=function(){J=!1},b.safeMode=function(){J=!0},b.versionString=Jn,b.regex={concat:g,lookahead:f,either:E,optional:d,anyNumberOfTimes:h};for(const A in ru)typeof ru[A]=="object"&&e(ru[A]);return Object.assign(b,ru),b},Ue=st({});return Ue.newInstance=()=>st({}),Tu=Ue,Ue.HighlightJS=Ue,Ue.default=Ue,Tu}var Er=yr();const $e=_r(Er);function $u({from:e=0,to:u=1,mass:t=1,stiffness:n=120,damping:r=14,velocity:i=0,delay:o=0,tolerance:s=.001,resumeOnTarget:c=!0}={}){function l(){return me(x)}function p(M){if(D)return l();if(F>0){const H=Math.min(M,F);if(F-=H,(M-=H)<=0)return l()}if(te(x)&&te(v)&&te(y)){let H=!0;for(let q=0;q<x.length;q+=1){y[q]+=(-f*(x[q]-v[q])-h*y[q])/a*M,x[q]+=y[q]*M;const V=x[q]-v[q];(Math.abs(y[q])>=g||Math.abs(V)>=g)&&(H=!1)}if(H){for(let q=0;q<x.length;q+=1)x[q]=v[q],y[q]=0;D=!0}return E.value=x,E.velocity=y,me(x)}if(ne(x)&&ne(v)&&ne(y)){const H=E.objectKeys??Object.keys(x);let q=!0;for(const V of H){y[V]+=(-f*(x[V]-v[V])-h*y[V])/a*M,x[V]+=y[V]*M;const we=x[V]-v[V];(Math.abs(y[V])>=g||Math.abs(we)>=g)&&(q=!1)}if(q){for(const V of H)x[V]=v[V],y[V]=0;D=!0}return E.value=x,E.velocity=y,me(x)}const O=v;let z=y;z+=(-f*(x-O)-h*z)/a*M,x+=z*M,y=z,E.value=x,E.velocity=y;const U=x-O;return Math.abs(z)<g&&Math.abs(U)<g&&(x=O,y=0,E.value=x,E.velocity=y,D=!0),x}let a=t,f=n,h=r,d=o,g=s,m=c;const E=Zt({from:e,to:u,velocity:i,label:"Spring"}),_=E.normalizeInput;let x=E.value,y=E.velocity??i,v=E.target,C=null,D=!1,F=d;const $=new Set;return{setTarget:function(M){const O=_(M),z=!hu(O,v);if(v=O,E.target=O,x=E.value,m&&D&&z){D=!1,C=null,F=d;for(const U of $)U(v)}},getTarget:function(){return me(v)},setOptions:function(M){if(M.mass!=null&&(a=M.mass),M.stiffness!=null&&(f=M.stiffness),M.damping!=null&&(h=M.damping),M.delay!=null&&(d=M.delay),M.tolerance!=null&&(g=M.tolerance),M.resumeOnTarget!=null&&(m=M.resumeOnTarget),M.velocity!=null){const O=_(M.velocity);y=O,E.velocity=O}},setValue:function(M,O={}){const{resetVelocity:z=!0,resetTime:U=!0,setTarget:H=!1,markDone:q=!1}=O;x=_(M),E.value=x,H&&(v=me(x),E.target=v);const V=D||!hu(x,v);if(z&&(y=E.arrayLength!=null?Ke(0,E.arrayLength):E.objectKeys!=null?Ye(0,E.objectKeys):0,E.velocity=y),U&&(C=null),q&&(D=!0),V&&!q){D=!1,C=null,F=d;for(const we of $)we(v)}},getValue:l,isDone:function(){return D},onResume:function(M){return $.add(M),()=>{$.delete(M)}},step:p,next:function(M=performance.now()){if(C==null)return C=M,l();const O=(M-C)/1e3;C=M;const z=1/30;let U=O,H=l();for(;U>0&&!D;){const q=Math.min(U,z);H=p(q),U-=q}return H}}}function gt(e,u){if(!u||typeof u!="object"||u.type==null)return e??u;const{type:t,default:n}=u;if(e==null)return n;try{switch(t){case String:return String(e);case Number:{const r=Number(e);return Number.isNaN(r)?n:r}case Boolean:return e===""||e==="true"||e!=="false"&&e!=="0"&&e!=null;case Object:case Array:try{return typeof e=="string"?JSON.parse(e):e}catch{return t===Array?Array.isArray(n)?n:[]:n}default:return e}}catch{return n}}function kr(e){if(!e)return;const u=e.default;return typeof u=="function"?u():u}function mt(e,u,t,n){if(!n||typeof n!="object"||!n.reflect)return;let r=null;const i=n.type;if(i!==Boolean){if(i===Object||i===Array)try{r=t==null?null:JSON.stringify(t)}catch{r=null}else r=t==null?null:String(t);r==null?e.removeAttribute(u):e.setAttribute(u,r)}else t?e.setAttribute(u,""):e.removeAttribute(u)}function ve(e,u={},t){const{props:n={},shadow:r=!1,styles:i,plugins:o}=u,s=o??[],c=(p,a)=>{console.warn(`[${e}] ${p}: ${a}`)};class l extends HTMLElement{constructor(){super(),this.version=Hu,this.t={};for(const a of Object.keys(n)){const f=n[a];this.t[a]=f&&typeof f=="object"&&("type"in f||"default"in f)?f:{type:void 0,default:f,reflect:!1}}this.props={},this.state={},this.actions={},this.refs={},this.emit=this.emit.bind(this),this.listen=this.listen.bind(this),this.setState=this.setState.bind(this),this.updateState=this.updateState.bind(this),this.setProps=this.setProps.bind(this),this.scheduleUpdate=this.scheduleUpdate.bind(this),this.update=this.update.bind(this),this.forceRender=this.forceRender.bind(this),this.destroy=this.destroy.bind(this),this.$=this.$.bind(this),this.i=null,this.o=null,this.h=!1,this.l=!1,this.u=r,this.m=r?this.attachShadow({mode:"open"}):this,this.p=null,this.O=[],this.R=[],this.S=[],this._=[],this.M=[],this.j=[],this.T=[],this.A=[],this.D=null,this.N="mount",this.P=void 0,this.C=new Map,this.U=!1,this.k=!1,this.F={},this.I=e,this.L=!1,this.H=new Set,this.V=!1,this.q=new Map,this.B=0,this.W=!1}G(a){const f=this.u?this.m.host:this;let h=a.parentElement;for(;h;){if(h===f)return!1;if(h.tagName.includes("-"))return!0;h=h.parentElement}return!1}static get observedAttributes(){return Object.keys(n)}attributeChangedCallback(a,f,h){if(f===h)return;const d=this.F[a],g=gt(h,this.t[a]);if(this.props[a]=g,this.U&&d!==g)for(const m of this.A)try{m(a,d,g)}catch(E){c("ON_PROPS_CHANGED_ERROR",String(E?.message||E))}this.F[a]=g,this.H.has(a)?this.H.delete(a):this.i&&this.isConnected?this.V?this.L=!0:(this.N="props",this.P=[a],this.update(!0)):this.L=!0}connectedCallback(){for(const f in this.t){if(!this.t.hasOwnProperty(f))continue;const h=gt(this.getAttribute(f),this.t[f]);this.props[f]=h,this.F[f]=h}r||this.p||(this.p=this.J());let a=null;try{if(t){const f={props:this.props,state:this.state,actions:this.actions,refs:this.refs,emit:this.emit,listen:this.listen,updateState:this.updateState.bind(this),$:this.$,host:this,onMount:h=>this.S.push(h),onDestroy:h=>this._.push(h),onUpdate:h=>this.M.push(h),onBeforeUpdate:h=>this.j.push(h),onFirstUpdate:h=>this.T.push(h),onPropsChanged:h=>this.A.push(h),shouldRender:h=>{this.D=h},link:(h,d)=>{const g=d||h;this.state[g]=this.props[h],this.A.push((m,E,_)=>{m===h&&(Object.is(this.state[g],_)||(this.state[g]=_))}),this.O.push({fn:()=>{const m=this.state[g];if(Object.is(this.props[h],m))return;this.props[h]=m,this.F[h]=m;const E=this.t[h],_=E&&{...E,reflect:!0},x=this.getAttribute(h);this.H.add(h),mt(this,h,m,_),x===this.getAttribute(h)&&this.H.delete(h)},deps:()=>[this.state[g]]})},computed:(h,d)=>{let g;if(d!==void 0)try{const _=typeof d=="function"?d():d;Array.isArray(_)&&(g=_)}catch(_){c("COMPUTED_DEPS_ERROR",String(_?.message||_))}const m={getter:h,deps:d,value:d!==void 0?h(g):h()};this.R.push(m);const E=()=>m.value;return E.K=m,this.Y(E),E},effect:(h,d)=>{const g={fn:h,deps:d};return this.O.push(g),()=>this.Z(g)},delegate:(h,d,g)=>(this.X(h,d,g),()=>this.tt(h,d,g)),escapeHtml:_t};for(const h of s)if(h)try{const d=h.extend(f,this);d&&typeof d=="object"&&Object.assign(f,d)}catch(d){c("PLUGIN_ERROR",String(d?.message||d))}a=t(f)}}catch(f){throw c("SETUP_ERROR",String(f?.message||f)),f}typeof a!="function"?(c("BAD_RENDER","setup() must return a function that returns a string template."),this.i=()=>""):this.i=a,this.V=!0,this.N="mount",this.P=void 0,this.update(!0),this.V=!1,this.L&&(this.L=!1,this.N="props",this.P=void 0,this.update(!0))}disconnectedCallback(){this.destroy()}remove(){super.remove()}$(a){const f=this.m.querySelectorAll(a);return f.length===0?null:f.length===1?f[0]:Array.from(f)}destroy(){for(const a of this._)try{a()}catch(f){c("ON_DESTROY_ERROR",String(f?.message||f))}for(const a of this.O)if(a.cleanup){try{a.cleanup()}catch(f){c("EFFECT_CLEANUP_ERROR",String(f?.message||f))}a.cleanup=void 0}for(const[,a]of this.C)try{this.m.removeEventListener(a.eventType,a.listener)}catch{}this.C.clear(),this.U=!1}emit(a,f){this.dispatchEvent(new CustomEvent(a,{detail:f,bubbles:!0,composed:!0}))}listen(a,f,h,d){const g=h;a.addEventListener(f,g,d);const m=()=>{try{a.removeEventListener(f,g,d)}catch{}};return this._.push(m),m}setState(a){const f=[],h=a,d=this.state;for(const g in h){if(!Object.prototype.hasOwnProperty.call(h,g))continue;const m=h[g];Object.is(d[g],m)||(d[g]=m,f.push(g))}if(f.length!==0)if(this.V||!this.U)this.N="state",this.P=f,this.update(!0);else{if(!this.i||!this.isConnected||this.h)return;this.h=!0;const g=[...f];requestAnimationFrame(()=>{this.h=!1,this.i&&this.isConnected&&(this.N="state",this.P=g,this.update(!0))})}}updateState(a){Object.assign(this.state,a),this.i&&this.isConnected&&this.et()}setProps(a){const f=Object.keys(a);if(f.length===0)return;const h=[],d={};for(const g of f){const m=a[g],E=this.F[g];this.props[g]=m,this.U&&E!==m&&(h.push(g),d[g]=E);const _=this.t[g];_&&_.reflect&&mt(this,g,m,_),this.U&&E===m||(this.F[g]=m)}if(this.U&&h.length>0)for(const g of h){const m=d[g],E=a[g];for(const _ of this.A)try{_(g,m,E)}catch(x){c("ON_PROPS_CHANGED_ERROR",String(x?.message||x))}}this.i&&this.isConnected?(this.N="props",this.P=h,this.update(!0)):this.L=!0}scheduleUpdate(){this.i&&this.isConnected&&this.et()}et(){this.l||this.h||(this.l=!0,(typeof queueMicrotask=="function"?queueMicrotask:a=>Promise.resolve().then(a))(()=>{this.l=!1,this.i&&this.isConnected&&(this.h||this.update(!1))}))}update(a){if(this.i){if(a&&this.U)for(const f of this.j)try{f()}catch(h){c("ON_BEFORE_UPDATE_ERROR",String(h?.message||h))}if(a)if(this.D===null||this.D({reason:this.N,changedKeys:this.P})){this.nt();let f="";try{f=this.i()}catch(g){c("RENDER_ERROR",String(g?.message||g)),f=""}typeof f!="string"&&(f=f==null?"":String(f)),f=((g,m,E)=>{const _=Object.prototype.hasOwnProperty;return g.replace(Fr,(x,y,v)=>{if(y==="text"||y==="html")return x;const C=v.trim();if(!C)return x;const D=_.call(m,C),F=_.call(E,C);if(!D&&!F)return x;const $=D?m[C]:E[C];return Sr.has(y)?$?`${y}="" ${x}`:x:$==null?x:`${y}="${_t(String($))}" ${x}`})})(f,this.state,this.props),this.u||(f=f.replace(/<slot(?![^>]*data-scope-owner)(\s|>)/g,`<slot data-scope-owner="${this.I}"$1`)),this.W=!1;const h=this.o!==null&&Object.is(this.o,f);let d=!1;h&&this.U||(this.m.innerHTML=f,this.o=f,d=!0),this.V?(typeof requestAnimationFrame=="function"?requestAnimationFrame:g=>setTimeout(g,0))(()=>{if(this.i&&this.isConnected){if(d&&!r&&this.projectSlots(),d&&this.it(),!this.U){this.U=!0;for(const g of this.S)try{g()}catch(m){c("ON_MOUNT_ERROR",String(m?.message||m))}for(const g in this.t){if(!this.t.hasOwnProperty(g))continue;const m=this.props[g],E=kr(this.t[g]);if(m!==E)for(const _ of this.A)try{_(g,E,m)}catch(x){c("ON_PROPS_CHANGED_ERROR",String(x?.message||x))}}}this.st(),this.ot()}}):(d&&!r&&this.projectSlots(),d&&this.it(),this.st(),this.ot())}else this.st(),this.U&&this.ot();else this.W&&this.nt(),this.st(),this.U&&this.ot()}}forceRender(){this.o=null,this.i&&this.isConnected?this.V?this.L=!0:(this.N="force",this.P=void 0,this.update(!0)):this.L=!0}ot(){if(!this.k){this.k=!0;for(const a of this.T)try{a()}catch(f){c("ON_FIRST_UPDATE_ERROR",String(f?.message||f))}}for(const a of this.M)try{a()}catch(f){c("ON_UPDATE_ERROR",String(f?.message||f))}this.rt()}rt(){const a=(this.u?this.m:this).querySelectorAll("*"),f=Object.prototype.hasOwnProperty,h=this.state,d=this.props;for(let g=0;g<a.length;g++){const m=a[g];if(this.G(m)||m.attributes.length===0)continue;const E=m.attributes;for(let _=E.length-1;_>=0;_--){const x=E[_];if(!x.name.startsWith(Dr))continue;const y=x.name.slice(5),v=x.value,C=v?v.trim():"";let D,F=!1;if(C){const O=this.q.get(C);if(O){O.K&&(this.W=!0);try{D=O()}catch{}F=!0}}if(!F){const O=C||y,z=f.call(h,O),U=!z&&f.call(d,O);z?D=h[O]:U&&(D=d[O])}if(y==="text"){const O=D==null?"":String(D);m.textContent!==O&&(m.textContent=O)}else if(y==="html"){const O=D==null?"":String(D);m.innerHTML!==O&&(m.innerHTML=O)}else if(y in m){if(!Object.is(m[y],D))try{m[y]=D}catch{}if(y==="value")try{D==null?m.removeAttribute("value"):m.setAttribute("value",String(D))}catch{}}else if(D!=null)try{m.setAttribute(y,String(D))}catch{}const $=`__scopeBind_${y}`,M=m[$];if(M){const O=M.ct;O&&m.removeEventListener(O,M),delete m[$]}}}}ht(a,f){if(!a||!f||a.length!==f.length)return!0;for(let h=0;h<f.length;h++)if(!Object.is(a[h],f[h]))return!0;return!1}nt(){for(const a of this.R){let f,h=!0;if(a.deps!==void 0)try{const d=typeof a.deps=="function"?a.deps():a.deps;Array.isArray(d)&&(f=d,h=this.ht(a.prevDeps,f))}catch(d){c("COMPUTED_DEPS_ERROR",String(d?.message||d)),h=!0,f=void 0}if(h){try{a.value=a.deps!==void 0?a.getter(f):a.getter()}catch(d){c("COMPUTED_ERROR",String(d?.message||d))}f&&(a.prevDeps=f.slice())}}}st(){for(const a of this.O){let f,h=!0;if(a.deps!==void 0)try{const d=typeof a.deps=="function"?a.deps():a.deps;Array.isArray(d)&&(f=d,h=this.ht(a.prevDeps,f))}catch(d){c("EFFECT_DEPS_ERROR",String(d?.message||d)),h=!0,f=void 0}if(h){if(a.cleanup){try{a.cleanup()}catch{}a.cleanup=void 0}try{const d=a.deps!==void 0?a.fn(f):a.fn();typeof d=="function"&&(a.cleanup=d)}catch{}f&&(a.prevDeps=f.slice())}}}Z(a){const f=this.O.indexOf(a);if(f!==-1){if(a.cleanup)try{a.cleanup()}catch{}this.O.splice(f,1)}}Y(a){const f=a.ft;if(f&&typeof f=="string")return this.q.set(f,a),f;const h=`__scope_bind_${++this.B}__`;this.q.set(h,a);try{a.ft=h,a.toString=()=>h}catch{}return h}it(){const a=(this.u?this.m:this).querySelectorAll("*"),f=this.refs;for(const h in f)f.hasOwnProperty(h)&&delete f[h];for(let h=0;h<a.length;h++){const d=a[h];if(this.G(d))continue;const g=d.getAttribute("ref");if(g&&(f[g]?Array.isArray(f[g])?f[g].push(d):f[g]=[f[g],d]:f[g]=d),d.attributes.length>0){const m=d.attributes;for(let E=m.length-1;E>=0;E--){const _=m[E];if(!_.name.startsWith("on:"))continue;const x=_.name.slice(3),y=_.value,v=`__tinyHandler_${x}`,C=d[v];C&&d.removeEventListener(x,C),d.removeAttribute(_.name);const D=this.actions[y];if(D&&typeof D=="function"){const F=$=>{D.call(this.actions,$)};d[v]=F,d.addEventListener(x,F)}}}}}J(){const a=new Map,f=this.childNodes,h=[];for(let d=0;d<f.length;d++)h.push(f[d]);for(let d=0;d<h.length;d++){const g=h[d];let m="";g.nodeType===1&&g.getAttribute&&(m=g.getAttribute("slot")||""),a.has(m)||a.set(m,[]),a.get(m).push(g)}for(let d=0;d<h.length;d++){const g=h[d];g.parentNode&&g.parentNode.removeChild(g)}return a}projectSlots(){const a=this.p||new Map,f=(this.u?this.m:this).querySelectorAll(`slot[data-scope-owner="${this.I}"]`);if(f.length!==0)for(let h=0;h<f.length;h++){const d=f[h],g=d.getAttribute("name")||"",m=a.get(g)||[];if(m.length){const E=document.createDocumentFragment();for(let _=0;_<m.length;_++){const x=m[_];let y;if(x.nodeType===1&&x.tagName.includes("-")&&x.p instanceof Map){const v=x,C=document.createElement(v.tagName.toLowerCase());for(let D=0;D<v.attributes.length;D++){const F=v.attributes[D];C.setAttribute(F.name,F.value)}for(const D of v.p.values())for(let F=0;F<D.length;F++)C.appendChild(D[F].cloneNode(!0));y=C}else y=x.cloneNode(!0);E.appendChild(y)}d.replaceWith(E)}else{const E=d.childNodes,_=[];for(let x=0;x<E.length;x++)_.push(E[x]);if(_.length>0){const x=document.createDocumentFragment();for(let y=0;y<_.length;y++)x.appendChild(_[y]);d.replaceWith(x)}}}}X(a,f,h){const d=`${a}::${f}`;let g=this.C.get(d);if(!g){const m=E=>{const _=E.target&&E.target.closest?E.target.closest(f):null;if(_)for(const x of g.handlers)try{x(E,_)}catch{}};g={eventType:a,selector:f,listener:m,handlers:new Set},this.C.set(d,g),this.m.addEventListener(a,m)}g.handlers.add(h)}tt(a,f,h){const d=`${a}::${f}`,g=this.C.get(d);if(g&&(g.handlers.delete(h),g.handlers.size===0)){try{this.m.removeEventListener(a,g.listener)}catch{}this.C.delete(d)}}}if(!customElements.get(e)){if(i&&typeof document<"u"){const p=`scope-${e}-styles`;if(!document.getElementById(p)){const a=document.createElement("style");a.id=p,a.textContent=i,document.head.appendChild(a)}}try{customElements.define(e,l)}catch(p){c("DEFINE_ERROR",String(p?.message||p))}}return l}const Ht=()=>({name:"window",extend:e=>{const u=new Set,t=new Set,n=new Set,r=(i,o={})=>{if(typeof window>"u")return()=>{};const{immediate:s=!0}=o,c=l=>{i(window.innerWidth,window.innerHeight,l)};return window.addEventListener("resize",c),u.add(c),s&&c(new UIEvent("resize")),()=>{window.removeEventListener("resize",c),u.delete(c)}};return e.onDestroy(()=>{if(typeof window<"u"){for(const i of u)window.removeEventListener("resize",i);u.clear();for(const i of n)i.disconnect();n.clear();for(const i of t)window.removeEventListener("scroll",i);t.clear()}}),{onViewportResize:r,onWindowResize:(i,o={})=>{if(typeof window>"u")return()=>{};if(typeof ResizeObserver>"u")return r((p,a,f)=>i(p,a,f),o);const{immediate:s=!0}=o,c=document.documentElement,l=new ResizeObserver(p=>{const a=p[0];if(!a)return;const{width:f,height:h}=a.contentRect;i(f,h,a)});if(l.observe(c),n.add(l),s){const p=c.getBoundingClientRect();i(p.width,p.height,new UIEvent("resize"))}return()=>{l.disconnect(),n.delete(l)}},onWindowScroll:(i,o={})=>{if(typeof window>"u")return()=>{};const{immediate:s=!0}=o,c=l=>{i(window.scrollX,window.scrollY,l)};return window.addEventListener("scroll",c,{passive:!0}),t.add(c),s&&c(new Event("scroll")),()=>{window.removeEventListener("scroll",c),t.delete(c)}}}}}),xu=()=>({name:"timer",extend:e=>{const u=new Set,t=new Set,n=new Set,r={setTimeout:(i,o,...s)=>{let c;return c=setTimeout((...l)=>{u.delete(c),i(...l)},o,...s),u.add(c),c},setInterval:(i,o,...s)=>{const c=setInterval(i,o,...s);return t.add(c),c},raf:(i,o)=>{let s=0,c=!0,l=0;const p=typeof o=="number"&&o>0?1e3/o:0,a=f=>{if(n.delete(s),c){if(p){if(f-l>=p){const h=l?f-l:p;l=f,i(f,h)}}else{const h=l?f-l:0;l=f,i(f,h)}s=requestAnimationFrame(a),n.add(s)}};return s=requestAnimationFrame(a),n.add(s),()=>{c&&(c=!1,n.delete(s),cancelAnimationFrame(s))}}};return e.onDestroy(()=>{for(const i of u)clearTimeout(i);u.clear();for(const i of t)clearInterval(i);t.clear();for(const i of n)cancelAnimationFrame(i);n.clear()}),{timer:r}}}),vr=()=>({name:"mouse",extend:e=>{const u=new Map,t=(n,r)=>{if(typeof window>"u")return()=>{};const i=s=>{r(s.clientX,s.clientY,s)};window.addEventListener(n,i);let o=u.get(n);return o||(o=new Set,u.set(n,o)),o.add(i),()=>{window.removeEventListener(n,i),o?.delete(i)}};return e.onDestroy(()=>{if(typeof window<"u"){for(const[n,r]of u){for(const i of r)window.removeEventListener(n,i);r.clear()}u.clear()}}),{onMouseMove:n=>t("mousemove",n),onMouseDown:n=>t("mousedown",n),onMouseUp:n=>t("mouseup",n),onMouseWheel:n=>(r=>{if(typeof window>"u")return()=>{};const i=s=>{r(s.clientX,s.clientY,s.deltaY,s)};window.addEventListener("wheel",i);let o=u.get("wheel");return o||(o=new Set,u.set("wheel",o)),o.add(i),()=>{window.removeEventListener("wheel",i),o?.delete(i)}})(n)}}}),te=e=>Array.isArray(e),ne=e=>e!=null&&typeof e=="object"&&!Array.isArray(e),me=e=>te(e)?e.slice():ne(e)?{...e}:e,hu=(e,u)=>{if(te(e)&&te(u)){if(e.length!==u.length)return!1;for(let t=0;t<e.length;t+=1)if(!Object.is(e[t],u[t]))return!1;return!0}if(ne(e)&&ne(u)){const t=Object.keys(e),n=Object.keys(u);if(t.length!==n.length)return!1;for(const r of t)if(!(r in u)||!Object.is(e[r],u[r]))return!1;return!0}return!(te(e)||te(u)||ne(e)||ne(u))&&Object.is(e,u)},Ke=(e,u)=>Array.from({length:u},()=>e),Ye=(e,u)=>u.reduce((t,n)=>(t[n]=e,t),{}),Zt=({from:e,to:u,velocity:t,label:n})=>{const r={value:e,target:u,velocity:t,arrayLength:null,objectKeys:null,normalizeInput:p=>p},i=p=>{if(r.arrayLength==null){if(r.objectKeys!=null)throw new Error(`${n} value shape mismatch (array vs object).`);r.arrayLength=p,te(r.value)||(r.value=Ke(r.value,p)),te(r.target)||(r.target=Ke(r.target,p)),r.velocity===void 0||te(r.velocity)||(r.velocity=Ke(r.velocity,p))}},o=p=>{if(r.objectKeys==null){if(r.arrayLength!=null)throw new Error(`${n} value shape mismatch (object vs array).`);r.objectKeys=p,ne(r.value)||(r.value=Ye(r.value,p)),ne(r.target)||(r.target=Ye(r.target,p)),r.velocity===void 0||ne(r.velocity)||(r.velocity=Ye(r.velocity,p))}},s=p=>{if(te(p)){if(r.objectKeys!=null)throw new Error(`${n} value shape mismatch (array vs object).`);if(r.arrayLength==null&&i(p.length),p.length!==r.arrayLength)throw new Error(`${n} value length mismatch (expected ${r.arrayLength}, got ${p.length}).`);return p.slice()}if(ne(p)){if(r.arrayLength!=null)throw new Error(`${n} value shape mismatch (object vs array).`);const a=Object.keys(p);if(r.objectKeys==null&&o(a),r.objectKeys&&a.length!==r.objectKeys.length)throw new Error(`${n} value keys mismatch (expected ${r.objectKeys.length}, got ${a.length}).`);if(r.objectKeys){for(const f of r.objectKeys)if(!(f in p))throw new Error(`${n} value keys mismatch (missing key "${f}").`)}return{...p}}return r.arrayLength!=null?Ke(p,r.arrayLength):r.objectKeys!=null?Ye(p,r.objectKeys):p};r.normalizeInput=s;const c=te(e)||te(u)||t!==void 0&&te(t),l=ne(e)||ne(u)||t!==void 0&&ne(t);if(c&&l)throw new Error(`${n} value shape mismatch (array vs object).`);if(c){const p=te(e)?e.length:te(u)?u.length:t.length;i(p),r.value=s(e),r.target=s(u),r.velocity!==void 0&&(r.velocity=s(r.velocity))}else if(l){const p=ne(e)?Object.keys(e):ne(u)?Object.keys(u):Object.keys(t);o(p),r.value=s(e),r.target=s(u),r.velocity!==void 0&&(r.velocity=s(r.velocity))}return r};let Me={x:-1,y:-1};const xt={stiffness:300,damping:30,mass:1},Gt=()=>({name:"pointer",extend:e=>{const{onMouseMove:u}=vr().extend(e,e.host),{timer:t}=xu().extend(e,e.host);Me.x=window.innerWidth/2,Me.y=window.innerHeight/2;const n={x:$u({from:Me.x,to:Me.x,...xt}),y:$u({from:Me.y,to:Me.y,...xt})};return u((r,i)=>{n.x.setTarget(r),n.y.setTarget(i)}),{onPointerMove:r=>{let i=Me.x,o=Me.y;t.raf(s=>{const c=n.x.next(s),l=n.y.next(s);var p,a;i===c&&o===l||(r({x:c,y:l,v:(p={x:c,y:l},a={x:i,y:o},{x:p.x-a.x,y:p.y-a.y,magnitude:Math.sqrt((p.x-a.x)*(p.x-a.x)+(p.y-a.y)*(p.y-a.y))}).magnitude}),i=c,o=l)})},onMouseMove:u}}}),Cr=()=>({name:"lerp",extend:e=>{const{timer:u}=xu().extend(e,e.host),t=new Set;return e.onDestroy(()=>{for(const n of t)n();t.clear()}),{createLerp:n=>(function({from:r=0,to:i=1,lerp:o=.1,tolerance:s=.001,delay:c=0,resumeOnTarget:l=!0}={}){function p(){return me(_)}function a(F){if(v)return p();if(C>0){const z=Math.min(F,C);if(C-=z,(F-=z)<=0)return p()}const $=(z=>z<0?0:z>1?1:z)(f);if($===0)return p();if($===1)return _=me(x),m.value=_,v=!0,p();const M=F>0?1-Math.pow(1-$,60*F):0;if(te(_)&&te(x)){let z=!0;for(let U=0;U<_.length;U+=1)_[U]+=(x[U]-_[U])*M,Math.abs(x[U]-_[U])>=h&&(z=!1);if(z){for(let U=0;U<_.length;U+=1)_[U]=x[U];v=!0}return m.value=_,me(_)}if(ne(_)&&ne(x)){const z=m.objectKeys??Object.keys(_);let U=!0;for(const H of z)_[H]+=(x[H]-_[H])*M,Math.abs(x[H]-_[H])>=h&&(U=!1);if(U){for(const H of z)_[H]=x[H];v=!0}return m.value=_,me(_)}const O=x;return _+=(O-_)*M,m.value=_,Math.abs(O-_)<h&&(_=O,m.value=_,v=!0),_}let f=o,h=s,d=c,g=l;const m=Zt({from:r,to:i,label:"Lerp"}),E=m.normalizeInput;let _=m.value,x=m.target,y=null,v=!1,C=c;const D=new Set;return{setTarget:function(F){const $=E(F),M=!hu($,x);if(x=$,m.target=$,_=m.value,g&&v&&M){v=!1,y=null,C=d;for(const O of D)O(x)}},getTarget:function(){return me(x)},setOptions:function(F){F.lerp!=null&&(f=F.lerp),F.tolerance!=null&&(h=F.tolerance),F.delay!=null&&(d=F.delay),F.resumeOnTarget!=null&&(g=F.resumeOnTarget)},setValue:function(F,$={}){const{resetTime:M=!0,setTarget:O=!1,markDone:z=!1}=$;_=E(F),m.value=_,O&&(x=me(_),m.target=x);const U=v||!hu(_,x);if(M&&(y=null),z&&(v=!0),U&&!z){v=!1,y=null,C=d;for(const H of D)H(x)}},getValue:p,isDone:function(){return v},onResume:function(F){return D.add(F),()=>{D.delete(F)}},step:a,next:function(F=performance.now()){if(y==null)return y=F,p();const $=(F-y)/1e3;y=F;const M=1/30;let O=$,z=p();for(;O>0&&!v;){const U=Math.min(O,M);z=a(U),O-=U}return z}}})(n),runLerp:(n,r,i={})=>{const{fps:o,immediate:s=!0,stopWhenDone:c=!0}=i;let l=!1,p=null;s&&r(n.getValue(),n);const a=()=>{p||(p=u.raf(g=>{if(l)return;const m=n.next(g);r(m,n),c&&n.isDone()&&f()},o))},f=()=>{p&&(p(),p=null)};a();const h=n.onResume(()=>{!l&&c&&(s&&r(n.getValue(),n),a())}),d=()=>{l||(l=!0,h(),f(),t.delete(d))};return t.add(d),d}}}}),ju=()=>({name:"spring",extend:e=>{const{timer:u}=xu().extend(e,e.host),t=new Set;return e.onDestroy(()=>{for(const n of t)n();t.clear()}),{createSpring:n=>$u(n),runSpring:(n,r,i={})=>{const{fps:o,immediate:s=!0,stopWhenDone:c=!0}=i;let l=!1,p=null;s&&r(n.getValue(),n);const a=()=>{p||(p=u.raf(g=>{if(l)return;const m=n.next(g);r(m,n),c&&n.isDone()&&f()},o))},f=()=>{p&&(p(),p=null)};a();const h=n.onResume(()=>{!l&&c&&(s&&r(n.getValue(),n),a())}),d=()=>{l||(l=!0,h(),f(),t.delete(d))};return t.add(d),d}}}}),Hu="0.0.8-beta.26",Ar=()=>{console.info("The website is using @petit-kit/scoped v"+Hu,`
https://github.com/petit-kit/scoped`)},wr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},_t=e=>e==null||e===""?"":String(e).replace(/[&<>"']/g,u=>wr[u]),Dr="bind:",Sr=new Set(["checked","disabled","readonly","required","selected","autofocus","multiple","hidden"]),Fr=/bind:([a-zA-Z_$][\w$]*)="([^"]*)"/g,He=(e,u,t)=>Math.max(e,Math.min(u,t)),Tr=(e,u)=>{let t;return(...n)=>{clearTimeout(t),t=setTimeout(()=>e(...n),u)}};ve("c-slider",{props:{value:{type:Number,default:0},min:{type:Number,default:0},max:{type:Number,default:360},step:{type:Number,default:1}}},({actions:e,host:u,props:t,link:n})=>(n("value","value"),e.handleChange=r=>u.updateState({value:r.target.valueAsNumber}),e.handleKnobChange=r=>u.updateState({value:Math.round(He(t.min,r.detail.value,t.max))}),()=>`
      <div class="flex flex-col items-center gap-10 w-[300px]">
        <div class="flex items-center gap-5">
          <c-knob bind:value="value" on:change="handleKnobChange"></c-knob>
          <c-rolling-number bind:value="value"></c-rolling-number>
        </div>
        <input
          id="example-input"
          type="range" min="${t.min}" max="${t.max}" step="${t.step}"
          bind:value="value" on:input="handleChange"
        />
        <c-tooltip bind:value="value" min="${t.min}" max="${t.max}"></c-tooltip>
      </div>
    `));ve("c-rolling-number",{props:{value:{type:Number,default:0},min:{type:Number,default:0},max:{type:Number,default:360},step:{type:Number,default:5}},plugins:[ju()]},({computed:e,props:u,onPropsChanged:t,refs:n,createSpring:r,runSpring:i,host:o})=>{const s=r({from:u.max-u.value,to:u.max-u.value,stiffness:300,damping:30,mass:.5});t(()=>s.setTarget(u.max-u.value));const c=e(()=>Array.from({length:u.max-u.min+1},(l,p)=>u.min+p));return i(s,l=>{const p=n.container;p&&(p.style.transform=`translate3d(0, ${-l*36}px, 0)`);const a=o.$('[ref="number"]');if(a){a.forEach(h=>h.style.opacity="0.5");const f=He(0,Math.round(l),1/0);a[f]&&(a[f].style.opacity="1")}}),()=>`
      <div class="overflow-hidden h-[80px] pt-[20px] roll-mask">
        <div ref="container">
          ${c().reverse().map(l=>`
                <div
                  ref="number"
                  class=" 
                    text-[40px] font-bold! w-[4ch] text-center h-[36px] leading-[36px]
                    roll-mask-item transition-opacity duration-50
                  "
                >
                  ${l}
                </div>
              `).join("")}
        </div>
      </div>
    `});ve("c-knob",{props:{value:{type:Number,default:0}},plugins:[ju()]},({props:e,state:u,onPropsChanged:t,createSpring:n,runSpring:r,host:i,effect:o,actions:s,emit:c})=>{u.active=!1,u.style=`transform: rotate(${e.value}deg)`;const l=n({from:e.value,to:e.value,stiffness:200});r(l,f=>i.updateState({style:`transform: rotate(${180+f}deg)`})),t(()=>l.setTarget(e.value));let p=0;o(()=>{const f=h=>{if(h.preventDefault(),h.stopPropagation(),!u.active)return;const d=i.getBoundingClientRect(),g=(h.y-(d.top+d.height/2))/d.height;c("change",{value:e.value+(g-p)/2*360}),p=g};return window.addEventListener("pointermove",f),()=>window.removeEventListener("pointermove",f)},[u.active]);const a=(f,h)=>{document.body.style.cursor=f,document.body.style.userSelect=h};return s.handlePointerDown=f=>{f.preventDefault(),f.stopPropagation(),i.updateState({active:!0}),a("grabbing","none");const h=()=>{p=0,i.updateState({active:!1}),a("default","auto")};return window.addEventListener("pointerup",h),()=>window.removeEventListener("pointerup",h)},()=>`
      <div
        class="w-20 h-20 bg-[#0048f2] rounded-full flex items-center justify-center"
        bind:style="style"
        on:pointerdown="handlePointerDown"
      >
        <div
          class="w-[3px] h-[25px] bg-white rounded-full mt-[-40px] shadow-md"
        ></div>
      </div>
    `});ve("c-tooltip",{props:{value:{type:Number,default:0},min:{type:Number,default:0},max:{type:Number,default:360}},plugins:[ju()]},({props:e,state:u,onPropsChanged:t,refs:n,host:r,createSpring:i,runSpring:o})=>{u.value=e.value,r.style.position="relative",r.style.width="100%";const s=i({from:e.value,to:e.value,stiffness:300,damping:30,mass:.5}),c=i({from:0,to:0,stiffness:500,damping:20,mass:10});let l=0,p=e.value;const a=Tr(()=>{c.setTarget(0)},50),f=h=>{const d=(h-e.min)/(e.max-e.min),g=n.tooltip;g&&(g.style.left=`${d*100}%`)};return t(()=>{f(e.value),s.setTarget(e.value);const h=e.value-p;l=He(-300,h,300),c.setTarget(l),p=e.value,a()}),o(c,h=>{const d=n.tooltip;d&&(d.style.transform=`rotate(${h}deg)`)}),o(s,h=>{r.updateState({value:Math.round(He(e.min,h,e.max))})}),()=>`
      <div class="relative w-[calc(100%-20px)] ml-[10px] h-4 -mt-[25px]">
        <div
          ref="tooltip"
          class="absolute top-0 left-0 text-center bg-[#0048f2] translate-x-[-50%] w-[50px] px-6 py-1 flex items-center justify-center rounded-md shadow-md"
          style="transform-origin: center -26px;"
        >
          <div
            class="absolute w-[15px] h-[10px] left-1/2 top-0 -translate-x-1/2 [aspect-ratio:1/cos(30deg)] [clip-path:polygon(50%_0,100%_100%,0_100%)] bg-[#0048f2] -translate-y-[calc(100%-1px)] "
          ></div>
          <span class="font-bold text-white" bind:text="value"></span>
        </div>
      </div>
    `});const Mu="h-[500px] md:h-[800px]";ve("c-tabs",{props:{tabs:{type:Array,default:[]}}},({props:e,state:u,actions:t,host:n})=>(u.activeTab=0,t.handleTabClick=r=>{const i=r.target.dataset.index;n.setState({activeTab:parseInt(i||"0")})},()=>`
      <div class="w-full overflow-hidden block">
        <div class="flex relative z-10 border-b border-black/10">
          ${e.tabs.map((r,i)=>{const s=u.activeTab===i?"bg-[blue] text-white":"!bg-black/10 hover:!bg-black/20 transition-all duration-300 !text-blue";return`
                <button
                  data-index="${i}"
                  class="cursor-pointer  px-4 py-2 ${s}"
                  style="background-color: ${u.activeTab===i?"var(--color-blue)":"transparent"}"
                  on:click="handleTabClick"
                >
                  ${r.title}
                </button>
              `}).join("")}
        </div>
        <div class="text-left -mt-[15px]">
          ${e.tabs[u.activeTab].type==="output"?`
            <div class="w-full mb-0! ${Mu} flex items-center justify-center">
              ${e.tabs[u.activeTab].content}
            </div>
          `:`
            <pre class="w-full mb-0! ${Mu} rounded-t-none!">
              <code class="hljs language-${e.tabs[u.activeTab].language||"typescript"} ${Mu} ml-0!">
${$e.highlight(e.tabs[u.activeTab].content,{language:e.tabs[u.activeTab].language||"typescript"}).value}
              </code>
            </pre>
          `}
        </div>
      </div>
    `));const Mr=`import { define, springPlugin } from '@petit-kit/scoped';
import { clamp, debounce } from '../../../lib/utils';

define(
  'c-slider',
  {
    props: {
      value: { type: Number, default: 0 },
      min: { type: Number, default: 0 },
      max: { type: Number, default: 360 },
      step: { type: Number, default: 1 },
    },
  },
  ({ actions, host, props, link }) => {
    link('value', 'value');

    actions.handleChange = (e: any) =>
      host.updateState({ value: e.target.valueAsNumber });

    actions.handleKnobChange = (e: any) =>
      host.updateState({
        value: Math.round(clamp(props.min, e.detail.value, props.max)),
      });

    return () => \`
      <div class="flex flex-col items-center gap-10 w-[300px]">
        <div class="flex items-center gap-5">
          <c-knob bind:value="value" on:change="handleKnobChange"></c-knob>
          <c-rolling-number bind:value="value"></c-rolling-number>
        </div>
        <input
          id="example-input"
          type="range" min="\${props.min}" max="\${props.max}" step="\${props.step}"
          bind:value="value" on:input="handleChange"
        />
        <c-tooltip bind:value="value" min="\${props.min}" max="\${props.max}"></c-tooltip>
      </div>
    \`;
  }
);

define(
  'c-rolling-number',
  {
    props: {
      value: { type: Number, default: 0 },
      min: { type: Number, default: 0 },
      max: { type: Number, default: 360 },
      step: { type: Number, default: 5 },
    },
    plugins: [springPlugin()],
  },
  ({
    computed,
    props,
    onPropsChanged,
    refs,
    createSpring,
    runSpring,
    host,
  }) => {
    const spring: any = createSpring({
      from: props.max - props.value,
      to: props.max - props.value,
      stiffness: 300,
      damping: 30,
      mass: 0.5,
    });

    onPropsChanged(() => spring.setTarget(props.max - props.value));

    const numbers = computed(() =>
      Array.from({ length: props.max - props.min + 1 }, (_, i) => props.min + i)
    );

    runSpring(spring, (index: number) => {
      const c = refs.container as HTMLElement;

      if (c) c.style.transform = \`translate3d(0, \${-index * 36}px, 0)\`;
      const els = host.$('[ref="number"]') as HTMLElement[];

      if (els) {
        els.forEach((el) => (el.style.opacity = '0.5'));
        const ri = clamp(0, Math.round(index), Infinity);
        if (els[ri]) els[ri].style.opacity = '1';
      }
    });

    return () => \`
      <div class="overflow-hidden h-[80px] pt-[20px] roll-mask">
        <div ref="container">
          \${numbers()
            .reverse()
            .map(
              (n: number) => \`
                <div
                  ref="number"
                  class=" 
                    text-[40px] font-bold! w-[4ch] text-center h-[36px] leading-[36px]
                    roll-mask-item transition-opacity duration-50
                  "
                >
                  \${n}
                </div>
              \`
            )
            .join('')}
        </div>
      </div>
    \`;
  }
);

define(
  'c-knob',
  { props: { value: { type: Number, default: 0 } }, plugins: [springPlugin()] },
  ({
    props,
    state,
    onPropsChanged,
    createSpring,
    runSpring,
    host,
    effect,
    actions,
    emit,
  }) => {
    state.active = false;
    state.style = \`transform: rotate(\${props.value}deg)\`;

    const spring = createSpring({
      from: props.value,
      to: props.value,
      stiffness: 200,
    });
    runSpring(spring, (v: number) =>
      host.updateState({ style: \`transform: rotate(\${180 + v}deg)\` })
    );

    onPropsChanged(() => spring.setTarget(props.value));

    let last = 0;
    effect(() => {
      const onMove = (e: PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!state.active) return;
        const r = host.getBoundingClientRect();
        const p = (e.y - (r.top + r.height / 2)) / r.height;
        emit('change', { value: props.value + ((p - last) / 2) * 360 });
        last = p;
      };
      window.addEventListener('pointermove', onMove);
      return () => window.removeEventListener('pointermove', onMove);
    }, [state.active]);

    const setBody = (cursor: string, userSelect: string) => {
      document.body.style.cursor = cursor;
      document.body.style.userSelect = userSelect;
    };

    actions.handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      host.updateState({ active: true });
      setBody('grabbing', 'none');

      const stop = () => {
        last = 0;
        host.updateState({ active: false });
        setBody('default', 'auto');
      };

      window.addEventListener('pointerup', stop);
      return () => window.removeEventListener('pointerup', stop);
    };

    return () => \`
      <div
        class="w-20 h-20 bg-[#0048f2] rounded-full flex items-center justify-center"
        bind:style="style"
        on:pointerdown="handlePointerDown"
      >
        <div
          class="w-[3px] h-[25px] bg-white rounded-full mt-[-40px] shadow-md"
        ></div>
      </div>
    \`;
  }
);

define(
  'c-tooltip',
  {
    props: {
      value: { type: Number, default: 0 },
      min: { type: Number, default: 0 },
      max: { type: Number, default: 360 },
    },
    plugins: [springPlugin()],
  },
  ({ props, state, onPropsChanged, refs, host, createSpring, runSpring }) => {
    state.value = props.value;

    host.style.position = 'relative';
    host.style.width = '100%';

    const value: any = createSpring({
      from: props.value,
      to: props.value,
      stiffness: 300,
      damping: 30,
      mass: 0.5,
    });

    const rotation: any = createSpring({
      from: 0,
      to: 0,
      stiffness: 500,
      damping: 20,
      mass: 10,
    });

    let targetRotation: number = 0;
    let lastValue = props.value;

    const debouncedStop = debounce(() => {
      rotation.setTarget(0);
    }, 50);

    const move = (value: number) => {
      const percent = (value - props.min) / (props.max - props.min);
      const tooltip = refs.tooltip as HTMLElement;
      if (tooltip) tooltip.style.left = \`\${percent * 100}%\`;
    };

    onPropsChanged(() => {
      move(props.value);
      value.setTarget(props.value);

      const diff: number = props.value - lastValue;
      targetRotation = clamp(-300, diff, 300);
      rotation.setTarget(targetRotation);
      lastValue = props.value;

      debouncedStop();
    });

    runSpring(rotation, (value: number) => {
      const tooltip = refs.tooltip as HTMLElement;
      if (tooltip) tooltip.style.transform = \`rotate(\${value}deg)\`;
    });

    runSpring(value, (value: number) => {
      host.updateState({
        value: Math.round(clamp(props.min, value, props.max)),
      });
    });

    return () => \`
      <div class="relative w-[calc(100%-20px)] ml-[10px] h-4 -mt-[25px]">
        <div
          ref="tooltip"
          class="absolute top-0 left-0 text-center bg-[#0048f2] translate-x-[-50%] w-[50px] px-6 py-1 flex items-center justify-center rounded-md shadow-md"
          style="transform-origin: center -26px;"
        >
          <div
            class="absolute w-[15px] h-[10px] left-1/2 top-0 -translate-x-1/2 [aspect-ratio:1/cos(30deg)] [clip-path:polygon(50%_0,100%_100%,0_100%)] bg-[#0048f2] -translate-y-[calc(100%-1px)] "
          ></div>
          <span class="font-bold text-white" bind:text="value"></span>
        </div>
      </div>
    \`;
  }
);
`;ve("c-example-slider",{},({onMount:e,refs:u})=>(e(()=>{u.tabs.setProps({tabs:[{title:"Output",type:"output",content:`
            <c-slider
              class="flex flex-col items-center gap-5"
              value="90"
            ></c-slider>
          `.trim()},{title:"TypeScript",language:"typescript",content:Mr},{title:"DOM",language:"xml",content:`
            <c-slider
  class="flex flex-col items-center gap-5"
  value="90"
></c-slider>
          `.trim()}]})}),()=>`
    <div ref="container">
      <c-tabs ref="tabs"></c-tabs>
    </div>
  `));const Rr=`**Scoped** is a lightweight library designed to simplify the creation of web components.

Its main idea is to provide a minimal, framework-agnostic layer over the Custom Elements API, letting you build encapsulated, reusable UI components using a concise template syntax, reactive state, and straightforward binding mechanisms. With built-in lifecycle hooks and an extensible plugin system, Scoped empowers developers to efficiently build modern, reactive interfaces.

It encourages expressiveness and rapid prototyping, giving you fine-grained control and flexibility over your components without the overhead and complexity of traditional frameworks. Scoped lets you stay close to the platform while benefiting from reactivity, simple data flow, and composable patterns for creative and productive development.
`,Nr=`# Installation

To install **Scoped**, you can use your favorite package manager.

\`\`\`bash
npm install @petit-kit/scoped
# or
yarn add @petit-kit/scoped
# or
pnpm install @petit-kit/scoped
\`\`\`
`,Or=`# Getting started

To get started with **Scoped**, you can create a new component using the \`define\` function.

\`\`\`javascript
import { define } from '@petit-kit/scoped';

define(
  'c-slider',
  {
    props: { value: { type: Number, default: 0 } },
  },
  ({ link, emit, actions, host }) => {
    link('value', 'value');

    actions.handleChange = (event) => {
      host.updateState({ value: event.target.valueAsNumber });
      emit('on-change', { value: event.target.valueAsNumber });
    };

    return () => \`
      <div>
        <input
          type="range" min="0" max="360" step="1"
          bind:value="value"
          on:input="handleChange"
        />
        <c-number ref="number" bind:value="value"></c-number>
      </div>
    \`;
  }
);
\`\`\`

And you just have to call the component in the DOM like so:

\`\`\`xml
<c-slider value="5"></c-slider>
\`\`\`

The \`define()\` function is used to declare a new component.

\`\`\`typescript
function define(
  tagName: string,
  options: ComponentOptions,
  setup: SetupFunction
);
\`\`\`

It takes a \`tagName\` for naming the used tag, I recommend to prefix it with \`c-\` before.
`,Ir=`## Component options

For the \`ComponentOptions\` here the way to setup the component:

\`\`\`javascript
{
  props: {
    attributeName: {
      type: Number|String|Boolean,
      default: 0 // default value
    }
  },
  styles: \`c-slider { color: red; }\`
  plugins: [timerPlugin()], // an array of plugins
  shadow: false // activate shadow DOM
}
\`\`\`
`,Lr=`## Setup function

The \`SetupFunction\` is run only once on mount and should return a function that return a template string.

\`\`\`typescript
({ host, props, state, actions, refs, link }) => {
  link('name', 'name)
  host.setState('date', new Date())

  actions.onMouseEnter = () => {
    console.log('mouseEnter')
  }

  return () => \`
    <div
      ref='container'
      on:mouseEnter='onMouseEnter'
    >
      Hi \${props.name}, it's actually \${state.date}
    </div>
  \`
}
\`\`\`

\`host\` is the component itself, it got those methods:

| Method                        | Description                                |
| ----------------------------- | ------------------------------------------ |
| **host.setState(partial)**    | Update state + full re-render              |
| **host.updateState(partial)** | Update state, effects only (no re-render)  |
| **host.setProps(partial)**    | Update props programmatically              |
| **host.scheduleUpdate()**     | Schedule effects on next RAF               |
| **host.update(fullRender)**   | Force update (full or partial)             |
| **host.forceRender()**        | Force re-render even if template unchanged |
| **host.destroy()**            | Clean up and run destroy callbacks         |
`,Br=`## Templating

Inside your setup function, you can return a function that uses template literals for HTML generation.

### Basic Example

\`\`\`typescript
() => {
  return () => \`
    <div>
      <h2>Hello, \${props.name}!</h2>
    </div>
  \`;
};
\`\`\`

### Dynamic Content

Interpolation with \`\${...}\` gives you access to state, props, or anything in closure:

\`\`\`typescript
() => {
  return () => \`
    <ul>
      \${state.items
        .map(
          (item) => \`
        <li>\${item.title}</li>
      \`
        )
        .join('')}
    </ul>
  \`;
};
\`\`\`

### XSS

When interpolating **user-provided** or untrusted content, use \`escapeHtml\` to prevent XSS. It escapes \`&\`, \`<\`, \`>\`, \`"\`, and \`'\` so the content is safe in HTML context.

\`\`\`typescript
({ escapeHtml }) => {
  return () => \`<span>\${escapeHtml(userInput)}</span>\`;
};
\`\`\`

\`escapeHtml\` accepts any value (falsy values return empty string) and returns a string safe for HTML. Do **not** use it with content you control and intend as markup — for that, use \`bind:html\` instead.

### Event Handlers

Use \`on:eventName="handler"\` to bind events, where **handler** is a function from your **actions** object or setup context:

\`\`\`typescript
({ actions }) => {
  actions.addThing = () => console.log('addThing');
  return () => \`
    <button on:click="addThing">Add thing</button>
  \`;
};
\`\`\`

Arrow functions or direct expressions are not supported, you must use named action references.

### Referencing DOM Elements

Use the \`ref\` attribute to assign references:

\`\`\`typescript
({ onMount, refs }) => {
  onMount(() => console.log(refs.inputElement));
  return () => \`
    <input ref="inputElement" type="text"></input>
  \`;
};
\`\`\`

You can then access the element as \`refs.inputEl\` in your setup code or methods.

### Bindings

Bindings let you connect the value of a DOM property or attribute to your component's state or props, making the element update reactively when the state changes, and optionally syncing changes back to your state.

#### Supported Bindings

- \`bind:text="stateKey"\` - Binds textContent
- \`bind:html="stateKey"\` - Binds innerHTML
- \`bind:value="stateKey"\` — Binds the value property
- \`bind:checked="isChecked"\` — Binds the checked property of checkbox/radio
- \`bind:prop="key"\` — Generic property binding (any property, e.g. \`bind:min\`, \`bind:max\`)

<br />

\`\`\`typescript
({ state }) => {
  state.textValue = 'Hello, world!';
  state.htmlValue = \`<strong>Hello, world!</strong>\`;
  state.isChecked = true;
  state.styleValue = \`background-color: red;\`;

  return () => \`
    <p bind:text="textValue"></p>
    <p bind:html="htmlValue"></p>
    <input type="checkbox" bind:checked="isChecked">
    <div bind:style="styleValue"></div>
  \`;
};
\`\`\`
`,Pr=`## State & props

### State

State is a plain object that belongs to your component instance. It is fully reactive and any time you update the state, your component can re-render or trigger effects.

You can update state in two main ways:

- \`host.setState(partial)\` - Merges the partial state and triggers a full re-render.
- \`host.updateState(partial)\` - Merges the partial state and only schedules effects/computed, but does **NOT** re-render the template.

\`\`\`typescript
// Initialize state in setup (no re-render)
state.count = 0;
state.status = 'idle';

// Initialize state in setup (optional)
host.setState({ count: 0, status: 'idle' });

// Update state & trigger re-render
actions.increment = () => {
  host.setState({ count: state.count + 1 });
};

// Only update state silently without re-render
host.updateState({ status: 'busy' });
\`\`\`

State is always available via the \`state\` object you get in your setup function:

\`\`\`typescript
({ state, host }) => {
  // Access current state values
  const current = state.count;
  // Set state
  host.setState({ count: current + 1 });
  // ...
};
\`\`\`

### Props

Props are values passed into your custom element as attributes or via programmatic updates. You define prop types/defaults in \`props\` on the component options.

Props are available as the \`props\` object in the setup function:

\`\`\`javascript
define(
  'c-my-component',
  {
    props: {
      value: { type: Number, default: 10 },
      label: { type: String, default: 'Untitled' },
    },
  },
  ({ props }) => {
    return () => \`
      <p>Value: \${props.value}</p>
      \${props.label}
    \`;
  }
);
\`\`\`

Props are always kept up to date with attribute changes, and updating props from the outside (or via \`host.setProps(...)\`) will trigger updates in your component.

**Two-way Binding:**

Scoped allows **props** ↔️ **state** syncing using the \`link\` helper:

\`\`\`typescript
({ link }) => {
  link('value', 'value'); // Binds prop 'value' with state 'value'
};
\`\`\`

This makes sure that when \`props.value\` changes from outside, your state updates, and when you change \`state.value\`, the prop and attribute reflect if configured.

**Programmatic prop updates:**

You can also change props from inside the component:

\`\`\`typescript
host.setProps({ value: 42 });
\`\`\`

This updates the prop, reflects it as an attribute if needed, and triggers all update lifecycle hooks.

Props are also automatically parsed from their attribute string values into the appropriate type, based on your definition (Number, Boolean, etc.), so you always work with type-safe values in your setup and template logic.

**Setting large objects/arrays as props:**

You can set large objects/arrays as props by using the \`host.setProps(...)\` method:

\`\`\`typescript
const component = document.querySelector('c-my-component');
component.setProps({ data: largeArray, config: complexObject });
\`\`\`
`,$r=`## Effects

Effects are functions that run in response to reactive changes and can be used for side effects, subscriptions, or manual cleanup logic within your components.

\`\`\`typescript
({ effect }) => {
  // Run on every render
  effect(() => console.log('Rendered'));

  // Run once (empty deps)
  effect(() => {
    const sub = api.subscribe();
    return () => sub.unsubscribe();
  }, []);

  // Run when deps change
  effect(
    (deps) => console.log('Count:', deps[0]),
    () => [state.count]
  );

  // Manual cleanup
  const cleanup = effect(() => {
    /* ... */
  });
  cleanup();
};
\`\`\`
`,zr="## Computed\n\nComputed values are memoized values used to derive data from state or props and automatically update when their dependencies change.\n\n```typescript\n({ computed }) => {\n  const fullName = computed(\n    () => `${state.firstName} ${state.lastName}`, // getter\n    () => [state.firstName, state.lastName] // dependencies\n  );\n  return () => `<p>Name: ${fullName()}</p>`;\n};\n```\n",Ur=`## Custom events

Custom events are a way to communicate between components.

### Emit

To emit a custom event from your component, use \`emit(name, detail?)\`:

\`\`\`typescript
({ emit }) => {
  emit('my-event', { message: 'Hello from the component!' });
};
\`\`\`

Listening to custom events in parent:

\`\`\`javascript
const component = document.querySelector('c-my-component');
component.addEventListener('my-event', (e) => {
  console.log('Received:', e.detail.message);
});
\`\`\`

### Listen

You can use \`listen\` to subscribe to events on any EventTarget (automatically cleaned up on destroy):

\`\`\`typescript
({ listen }) => {
  listen(window, 'my-event', (e) => {
    console.log('Received:', e.detail.message);
  });
};
\`\`\`
`,qr=`## Event Delegation

\`delegate\` lets you efficiently handle events on descendants matching a selector:

\`\`\`typescript
({ onMount, delegate }) => {
  onMount(() => {
    delegate('click', '.item', (e, target) => {
      console.log('Clicked item:', target.textContent);
      target.classList.toggle('active');
    });
  });

  return () => \`
    <ul>
      <li class="item">Apple</li>
      <li class="item">Banana</li>
      <li class="item">Cherry</li>
    </ul>
  \`;
};
\`\`\`
`,jr=`## Slots

Slots allow you to render children inside your custom element, making it easy to compose interfaces or pass in dynamic content.

By default, any child content placed inside your component tag will be rendered in the default slot:

\`\`\`html
<c-my-component>
  <h2 slot="title">Title goes here</h2>
  <p slot="description">Some description or content.</p>
</c-my-component>
\`\`\`

In your component template, use:

\`\`\`typescript
define('my-card', {}, () => {
  return () => \`
    <aside><slot name="title"></slot></aside>
    <main><slot name="description"></slot></main>
    <slot></slot>
  \`;
});
\`\`\`
`,Hr=`## Lifecycle

Lifecycle hooks let you run code at specific moments in the component's life, such as mount, update, or destruction.

| Method                   | Description               |
| ------------------------ | ------------------------- |
| **\`onMount(cb)\`**        | After mount               |
| **\`onDestroy(cb)\`**      | On destroy                |
| **\`onUpdate(cb)\`**       | After each update         |
| **\`onBeforeUpdate(cb)\`** | Before each update        |
| **\`onFirstUpdate(cb)\`**  | Once, after first render  |
| **\`onPropsChanged(cb)\`** | When props change         |
| **\`shouldRender(cb)\`**   | Conditionally skip render |

<br/>

### shouldRender

Register a predicate to conditionally skip full renders. When the callback returns \`false\`, the template is not executed and the DOM is not updated. Effects and \`onUpdate\` hooks still run.

The callback receives a context object:

| Property          | Type        | Description                                      |
| ----------------- | ----------- | ------------------------------------------------ |
| **\`reason\`**      | \`string\`    | \`'mount'\` \\| \`'props'\` \\| \`'state'\` \\| \`'force'\` |
| **\`changedKeys\`** | \`string[]?\` | For props/state: which keys changed              |

<br />

\`\`\`typescript
define('c-lazy-list', {}, ({ shouldRender, state, props }) => {
  state.paused = false;

  shouldRender((ctx) => {
    // Always render on props change
    if (ctx.reason === 'props') return true;
    // Skip state updates when tab is hidden (e.g. scroll position)
    if (ctx.reason === 'state' && document.visibilityState === 'hidden')
      return false;
    // Skip specific state keys
    if (ctx.reason === 'state' && ctx.changedKeys?.includes('scrollY'))
      return false;

    return state.paused;
  });

  return () => \`<ul>\${props.items.map((i) => \`<li>\${i}</li>\`).join('')}</ul>\`;
});
\`\`\`
`,Zr=`## Select

The \`$\` method lets you query elements inside your component's shadow or light DOM, returning either a single element or an array (if multiple elements match).

\`\`\`typescript
define('c-my-component', {}, ({ $, host }) => {
  onMount(() => {
    const btn = $('button.primary'); // single element or null
    const items = $('.list-item'); // array when multiple match

    // From outside via host element:
    const el = document.querySelector('c-my-component'); // self
    const inner = el.$('.list-item'); // same API on host
  });

  return () => \`
    <div>
      <button class="primary">OK</button>
      <span class="list-item">
        A
      </span>
      <span class="list-item">
        B
      </span>
    </div>
  \`;
});
\`\`\`
`,Gr=`# Plugins

Scoped includes a set of optional plugins to extend or enhance component behavior. You can import any of these plugins and register them via the \`plugins\` option.

⏲ Plugins documentation is working in progress

**Available Plugins:**

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/lerp/README.md" target="_blank">lerpPlugin</a> & <a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/spring/README.md" target="_blank">springPlugin</a>**  
  Adds a reactive spring physics engine for animating values with natural, spring-like motion. Powered by <a href="https://github.com/petit-kit/animate" target="_blank">@petit-kit/animate</a>. Integrates seamlessly with the timer plugin for requestAnimationFrame-based updates.

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/morph/README.md" target="_blank">morphPlugin</a>**  
  Provides idiomorph-based DOM morphing for efficient, non-destructive updates.

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/device/README.md" target="_blank">devicePlugin</a>**  
  Detects and reacts to device and input type changes (e.g., pointer type, hover support).

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/lenis/README.md" target="_blank">lenisPlugin</a>**  
  Integrates the <a href="https://github.com/studio-freight/lenis" target="_blank">Lenis</a> smooth scrolling library.

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/timer/README.md" target="_blank">timerPlugin</a>**  
  Adds easy interval, timeout, and requestAnimationFrame timers to your component logic.

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/window/README.md" target="_blank">windowPlugin</a>**  
  Supplies window-level utilities such as window resize and scroll event listeners.

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/inview/README.md" target="_blank">inViewPlugin</a>**  
  Detects when an element is within the viewport and triggers handlers (uses IntersectionObserver).

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/mouse/README.md" target="_blank">mousePlugin</a>**  
  Tracks mouse position, mouse events, and allows you to listen to wheel/pointer activity.

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/pointer/README.md" target="_blank">pointerPlugin</a>**  
  Lerp mouse position

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/localstorage/README.md" target="_blank">localStoragePlugin</a>**  
  Scoped localStorage API with optional key prefix and JSON serialization.

**Usage Example:**

\`\`\`javascript
import { define, inViewPlugin, timerPlugin } from '@petit-kit/scoped';

define(
  'my-component',
  {
    plugins: [inViewPlugin(), timerPlugin()],
  },
  ({ inView, timer }) => {
    // Use provided plugin APIs in your setup function
    // ...
  }
);
\`\`\`

All plugins are tree-shakeable—import only what you need.

See each plugin's README (linked above) for API docs, options, and usage examples.
`,Wr=`# Happy

The \`happy\` method logs a friendly version and repo message to your console—call it in your app to show appreciation and support for Scoped!

\`\`\`javascript
import { happy } from '@petit-kit/scoped';

happy(); // 🙂🙃🙂🙃🙂🙃🙂
\`\`\`
`,Wt=[{title:"Introduction",slug:"introduction",content:`# Introduction

${Rr}`},{title:"Installation",slug:"installation",content:Nr},{title:"Getting started",slug:"getting-started",content:Or,examples:"<c-example-slider></c-example-slider>",children:[{title:"Component options",slug:"component-options",content:Ir},{title:"Setup function",slug:"setup-function",content:Lr},{title:"Templating",slug:"templating",content:Br},{title:"State & Props",slug:"state-and-props",content:Pr},{title:"Effects",slug:"effects",content:$r},{title:"Computed",slug:"computed",content:zr},{title:"Custom events",slug:"custom-events",content:Ur},{title:"Event delegation",slug:"event-delegation",content:qr},{title:"Slots",slug:"slots",content:jr},{title:"Lifecycle",slug:"lifecycle",content:Hr},{title:"Select",slug:"select",content:Zr}]},{title:"Plugins",slug:"plugins",content:Gr},{title:"Happy",slug:"happy",content:Wr},{title:"",slug:"license",content:`
      
      <div class="text-center">
        build with 💖 by <a class="font-bold" href="https://github.com/petitssoldats" target="_blank">petitssoldats</a> with <a class="font-bold" href="https://github.com/petit-kit/scoped" target="_blank">@petit-kit/scoped@${Hu}</a>
      </div>
      <br />
      <br />
      <br />
    `}];ve("c-table-content",{plugins:[Ht()]},({onWindowScroll:e})=>(e(()=>{try{const u=document.querySelectorAll("div.content");if(!u.length)return;const t=Array.from(u).reduce((o,s)=>{const c=s.getBoundingClientRect();return c.top<=window.innerHeight*.3&&c.bottom>=0?s:o},Array.from(u)[0]);document.querySelectorAll("a.link").forEach(o=>{o.classList.remove("nav-active")});const r=`a[id="${t.id+"-link"}"`;document.querySelector(r)?.classList.add("nav-active")}catch(u){console.log(u)}}),()=>`
    <div class="flex flex-col gap-2 w-[180px] mt-5">
      ${Wt.map(u=>`
        <div>
          <a href="#${u.slug}" id="${u.slug+"-link"}" class="link hover:font-bold inline-block w-full">
            ${u.title}
          </a>
          ${u.children?u.children.map(t=>`
            <div class="ml-5 mt-2">
              <a href="#${t.slug}" id="${t.slug+"-link"}" class="link hover:font-bold inline-block w-full">
                ${t.title}
              </a>
            </div>
          `).join(""):""}
        </div>
      `).join("")}
        <a class="opacity-50 hover:opacity-100 transition-all duration-300 hover:font-bold" href="https://github.com/petit-kit/scoped" target="_blank">
          Github
        </a>
        <a class="opacity-50 hover:opacity-100 transition-all duration-300 hover:font-bold" href="https://www.npmjs.com/package/@petit-kit/scoped" target="_blank">
          NPM
        </a>
      
      </div>
    `));const yt={};function Vr(e){let u=yt[e];if(u)return u;u=yt[e]=[];for(let t=0;t<128;t++){const n=String.fromCharCode(t);u.push(n)}for(let t=0;t<e.length;t++){const n=e.charCodeAt(t);u[n]="%"+("0"+n.toString(16).toUpperCase()).slice(-2)}return u}function Ze(e,u){typeof u!="string"&&(u=Ze.defaultChars);const t=Vr(u);return e.replace(/(%[a-f0-9]{2})+/gi,function(n){let r="";for(let i=0,o=n.length;i<o;i+=3){const s=parseInt(n.slice(i+1,i+3),16);if(s<128){r+=t[s];continue}if((s&224)===192&&i+3<o){const c=parseInt(n.slice(i+4,i+6),16);if((c&192)===128){const l=s<<6&1984|c&63;l<128?r+="��":r+=String.fromCharCode(l),i+=3;continue}}if((s&240)===224&&i+6<o){const c=parseInt(n.slice(i+4,i+6),16),l=parseInt(n.slice(i+7,i+9),16);if((c&192)===128&&(l&192)===128){const p=s<<12&61440|c<<6&4032|l&63;p<2048||p>=55296&&p<=57343?r+="���":r+=String.fromCharCode(p),i+=6;continue}}if((s&248)===240&&i+9<o){const c=parseInt(n.slice(i+4,i+6),16),l=parseInt(n.slice(i+7,i+9),16),p=parseInt(n.slice(i+10,i+12),16);if((c&192)===128&&(l&192)===128&&(p&192)===128){let a=s<<18&1835008|c<<12&258048|l<<6&4032|p&63;a<65536||a>1114111?r+="����":(a-=65536,r+=String.fromCharCode(55296+(a>>10),56320+(a&1023))),i+=9;continue}}r+="�"}return r})}Ze.defaultChars=";/?:@&=+$,#";Ze.componentChars="";const Et={};function Kr(e){let u=Et[e];if(u)return u;u=Et[e]=[];for(let t=0;t<128;t++){const n=String.fromCharCode(t);/^[0-9a-z]$/i.test(n)?u.push(n):u.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<e.length;t++)u[e.charCodeAt(t)]=e[t];return u}function uu(e,u,t){typeof u!="string"&&(t=u,u=uu.defaultChars),typeof t>"u"&&(t=!0);const n=Kr(u);let r="";for(let i=0,o=e.length;i<o;i++){const s=e.charCodeAt(i);if(t&&s===37&&i+2<o&&/^[0-9a-f]{2}$/i.test(e.slice(i+1,i+3))){r+=e.slice(i,i+3),i+=2;continue}if(s<128){r+=n[s];continue}if(s>=55296&&s<=57343){if(s>=55296&&s<=56319&&i+1<o){const c=e.charCodeAt(i+1);if(c>=56320&&c<=57343){r+=encodeURIComponent(e[i]+e[i+1]),i++;continue}}r+="%EF%BF%BD";continue}r+=encodeURIComponent(e[i])}return r}uu.defaultChars=";/?:@&=+$,-_.!~*'()#";uu.componentChars="-_.!~*'()";function Zu(e){let u="";return u+=e.protocol||"",u+=e.slashes?"//":"",u+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?u+="["+e.hostname+"]":u+=e.hostname||"",u+=e.port?":"+e.port:"",u+=e.pathname||"",u+=e.search||"",u+=e.hash||"",u}function pu(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const Yr=/^([a-z0-9.+-]+:)/i,Xr=/:[0-9]*$/,Jr=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,Qr=["<",">",'"',"`"," ","\r",`
`,"	"],e0=["{","}","|","\\","^","`"].concat(Qr),u0=["'"].concat(e0),kt=["%","/","?",";","#"].concat(u0),vt=["/","?","#"],t0=255,Ct=/^[+a-z0-9A-Z_-]{0,63}$/,n0=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,At={javascript:!0,"javascript:":!0},wt={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Gu(e,u){if(e&&e instanceof pu)return e;const t=new pu;return t.parse(e,u),t}pu.prototype.parse=function(e,u){let t,n,r,i=e;if(i=i.trim(),!u&&e.split("#").length===1){const l=Jr.exec(i);if(l)return this.pathname=l[1],l[2]&&(this.search=l[2]),this}let o=Yr.exec(i);if(o&&(o=o[0],t=o.toLowerCase(),this.protocol=o,i=i.substr(o.length)),(u||o||i.match(/^\/\/[^@\/]+@[^@\/]+/))&&(r=i.substr(0,2)==="//",r&&!(o&&At[o])&&(i=i.substr(2),this.slashes=!0)),!At[o]&&(r||o&&!wt[o])){let l=-1;for(let d=0;d<vt.length;d++)n=i.indexOf(vt[d]),n!==-1&&(l===-1||n<l)&&(l=n);let p,a;l===-1?a=i.lastIndexOf("@"):a=i.lastIndexOf("@",l),a!==-1&&(p=i.slice(0,a),i=i.slice(a+1),this.auth=p),l=-1;for(let d=0;d<kt.length;d++)n=i.indexOf(kt[d]),n!==-1&&(l===-1||n<l)&&(l=n);l===-1&&(l=i.length),i[l-1]===":"&&l--;const f=i.slice(0,l);i=i.slice(l),this.parseHost(f),this.hostname=this.hostname||"";const h=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!h){const d=this.hostname.split(/\./);for(let g=0,m=d.length;g<m;g++){const E=d[g];if(E&&!E.match(Ct)){let _="";for(let x=0,y=E.length;x<y;x++)E.charCodeAt(x)>127?_+="x":_+=E[x];if(!_.match(Ct)){const x=d.slice(0,g),y=d.slice(g+1),v=E.match(n0);v&&(x.push(v[1]),y.unshift(v[2])),y.length&&(i=y.join(".")+i),this.hostname=x.join(".");break}}}}this.hostname.length>t0&&(this.hostname=""),h&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const s=i.indexOf("#");s!==-1&&(this.hash=i.substr(s),i=i.slice(0,s));const c=i.indexOf("?");return c!==-1&&(this.search=i.substr(c),i=i.slice(0,c)),i&&(this.pathname=i),wt[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this};pu.prototype.parseHost=function(e){let u=Xr.exec(e);u&&(u=u[0],u!==":"&&(this.port=u.substr(1)),e=e.substr(0,e.length-u.length)),e&&(this.hostname=e)};const r0=Object.freeze(Object.defineProperty({__proto__:null,decode:Ze,encode:uu,format:Zu,parse:Gu},Symbol.toStringTag,{value:"Module"})),Vt=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Kt=/[\0-\x1F\x7F-\x9F]/,i0=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Wu=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,Yt=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Xt=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,s0=Object.freeze(Object.defineProperty({__proto__:null,Any:Vt,Cc:Kt,Cf:i0,P:Wu,S:Yt,Z:Xt},Symbol.toStringTag,{value:"Module"})),o0=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),c0=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var Ru;const a0=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),l0=(Ru=String.fromCodePoint)!==null&&Ru!==void 0?Ru:function(e){let u="";return e>65535&&(e-=65536,u+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),u+=String.fromCharCode(e),u};function f0(e){var u;return e>=55296&&e<=57343||e>1114111?65533:(u=a0.get(e))!==null&&u!==void 0?u:e}var se;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(se||(se={}));const d0=32;var Oe;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(Oe||(Oe={}));function zu(e){return e>=se.ZERO&&e<=se.NINE}function h0(e){return e>=se.UPPER_A&&e<=se.UPPER_F||e>=se.LOWER_A&&e<=se.LOWER_F}function p0(e){return e>=se.UPPER_A&&e<=se.UPPER_Z||e>=se.LOWER_A&&e<=se.LOWER_Z||zu(e)}function b0(e){return e===se.EQUALS||p0(e)}var ie;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(ie||(ie={}));var Ne;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(Ne||(Ne={}));class g0{constructor(u,t,n){this.decodeTree=u,this.emitCodePoint=t,this.errors=n,this.state=ie.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=Ne.Strict}startEntity(u){this.decodeMode=u,this.state=ie.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(u,t){switch(this.state){case ie.EntityStart:return u.charCodeAt(t)===se.NUM?(this.state=ie.NumericStart,this.consumed+=1,this.stateNumericStart(u,t+1)):(this.state=ie.NamedEntity,this.stateNamedEntity(u,t));case ie.NumericStart:return this.stateNumericStart(u,t);case ie.NumericDecimal:return this.stateNumericDecimal(u,t);case ie.NumericHex:return this.stateNumericHex(u,t);case ie.NamedEntity:return this.stateNamedEntity(u,t)}}stateNumericStart(u,t){return t>=u.length?-1:(u.charCodeAt(t)|d0)===se.LOWER_X?(this.state=ie.NumericHex,this.consumed+=1,this.stateNumericHex(u,t+1)):(this.state=ie.NumericDecimal,this.stateNumericDecimal(u,t))}addToNumericResult(u,t,n,r){if(t!==n){const i=n-t;this.result=this.result*Math.pow(r,i)+parseInt(u.substr(t,i),r),this.consumed+=i}}stateNumericHex(u,t){const n=t;for(;t<u.length;){const r=u.charCodeAt(t);if(zu(r)||h0(r))t+=1;else return this.addToNumericResult(u,n,t,16),this.emitNumericEntity(r,3)}return this.addToNumericResult(u,n,t,16),-1}stateNumericDecimal(u,t){const n=t;for(;t<u.length;){const r=u.charCodeAt(t);if(zu(r))t+=1;else return this.addToNumericResult(u,n,t,10),this.emitNumericEntity(r,2)}return this.addToNumericResult(u,n,t,10),-1}emitNumericEntity(u,t){var n;if(this.consumed<=t)return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(u===se.SEMI)this.consumed+=1;else if(this.decodeMode===Ne.Strict)return 0;return this.emitCodePoint(f0(this.result),this.consumed),this.errors&&(u!==se.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(u,t){const{decodeTree:n}=this;let r=n[this.treeIndex],i=(r&Oe.VALUE_LENGTH)>>14;for(;t<u.length;t++,this.excess++){const o=u.charCodeAt(t);if(this.treeIndex=m0(n,r,this.treeIndex+Math.max(1,i),o),this.treeIndex<0)return this.result===0||this.decodeMode===Ne.Attribute&&(i===0||b0(o))?0:this.emitNotTerminatedNamedEntity();if(r=n[this.treeIndex],i=(r&Oe.VALUE_LENGTH)>>14,i!==0){if(o===se.SEMI)return this.emitNamedEntityData(this.treeIndex,i,this.consumed+this.excess);this.decodeMode!==Ne.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var u;const{result:t,decodeTree:n}=this,r=(n[t]&Oe.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,r,this.consumed),(u=this.errors)===null||u===void 0||u.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(u,t,n){const{decodeTree:r}=this;return this.emitCodePoint(t===1?r[u]&~Oe.VALUE_LENGTH:r[u+1],n),t===3&&this.emitCodePoint(r[u+2],n),n}end(){var u;switch(this.state){case ie.NamedEntity:return this.result!==0&&(this.decodeMode!==Ne.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case ie.NumericDecimal:return this.emitNumericEntity(0,2);case ie.NumericHex:return this.emitNumericEntity(0,3);case ie.NumericStart:return(u=this.errors)===null||u===void 0||u.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case ie.EntityStart:return 0}}}function Jt(e){let u="";const t=new g0(e,n=>u+=l0(n));return function(r,i){let o=0,s=0;for(;(s=r.indexOf("&",s))>=0;){u+=r.slice(o,s),t.startEntity(i);const l=t.write(r,s+1);if(l<0){o=s+t.end();break}o=s+l,s=l===0?o+1:o}const c=u+r.slice(o);return u="",c}}function m0(e,u,t,n){const r=(u&Oe.BRANCH_LENGTH)>>7,i=u&Oe.JUMP_TABLE;if(r===0)return i!==0&&n===i?t:-1;if(i){const c=n-i;return c<0||c>=r?-1:e[t+c]-1}let o=t,s=o+r-1;for(;o<=s;){const c=o+s>>>1,l=e[c];if(l<n)o=c+1;else if(l>n)s=c-1;else return e[c+r]}return-1}const x0=Jt(o0);Jt(c0);function Qt(e,u=Ne.Legacy){return x0(e,u)}function _0(e){return Object.prototype.toString.call(e)}function Vu(e){return _0(e)==="[object String]"}const y0=Object.prototype.hasOwnProperty;function E0(e,u){return y0.call(e,u)}function _u(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if(typeof t!="object")throw new TypeError(t+"must be object");Object.keys(t).forEach(function(n){e[n]=t[n]})}}),e}function en(e,u,t){return[].concat(e.slice(0,u),t,e.slice(u+1))}function Ku(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function bu(e){if(e>65535){e-=65536;const u=55296+(e>>10),t=56320+(e&1023);return String.fromCharCode(u,t)}return String.fromCharCode(e)}const un=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,k0=/&([a-z#][a-z0-9]{1,31});/gi,v0=new RegExp(un.source+"|"+k0.source,"gi"),C0=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function A0(e,u){if(u.charCodeAt(0)===35&&C0.test(u)){const n=u[1].toLowerCase()==="x"?parseInt(u.slice(2),16):parseInt(u.slice(1),10);return Ku(n)?bu(n):e}const t=Qt(e);return t!==e?t:e}function w0(e){return e.indexOf("\\")<0?e:e.replace(un,"$1")}function Ge(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(v0,function(u,t,n){return t||A0(u,n)})}const D0=/[&<>"]/,S0=/[&<>"]/g,F0={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function T0(e){return F0[e]}function Ie(e){return D0.test(e)?e.replace(S0,T0):e}const M0=/[.?*+^$[\]\\(){}|-]/g;function R0(e){return e.replace(M0,"\\$&")}function X(e){switch(e){case 9:case 32:return!0}return!1}function Xe(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Je(e){return Wu.test(e)||Yt.test(e)}function Qe(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function yu(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}const N0={mdurl:r0,ucmicro:s0},O0=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:en,assign:_u,escapeHtml:Ie,escapeRE:R0,fromCodePoint:bu,has:E0,isMdAsciiPunct:Qe,isPunctChar:Je,isSpace:X,isString:Vu,isValidEntityCode:Ku,isWhiteSpace:Xe,lib:N0,normalizeReference:yu,unescapeAll:Ge,unescapeMd:w0},Symbol.toStringTag,{value:"Module"}));function I0(e,u,t){let n,r,i,o;const s=e.posMax,c=e.pos;for(e.pos=u+1,n=1;e.pos<s;){if(i=e.src.charCodeAt(e.pos),i===93&&(n--,n===0)){r=!0;break}if(o=e.pos,e.md.inline.skipToken(e),i===91){if(o===e.pos-1)n++;else if(t)return e.pos=c,-1}}let l=-1;return r&&(l=e.pos),e.pos=c,l}function L0(e,u,t){let n,r=u;const i={ok:!1,pos:0,str:""};if(e.charCodeAt(r)===60){for(r++;r<t;){if(n=e.charCodeAt(r),n===10||n===60)return i;if(n===62)return i.pos=r+1,i.str=Ge(e.slice(u+1,r)),i.ok=!0,i;if(n===92&&r+1<t){r+=2;continue}r++}return i}let o=0;for(;r<t&&(n=e.charCodeAt(r),!(n===32||n<32||n===127));){if(n===92&&r+1<t){if(e.charCodeAt(r+1)===32)break;r+=2;continue}if(n===40&&(o++,o>32))return i;if(n===41){if(o===0)break;o--}r++}return u===r||o!==0||(i.str=Ge(e.slice(u,r)),i.pos=r,i.ok=!0),i}function B0(e,u,t,n){let r,i=u;const o={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(n)o.str=n.str,o.marker=n.marker;else{if(i>=t)return o;let s=e.charCodeAt(i);if(s!==34&&s!==39&&s!==40)return o;u++,i++,s===40&&(s=41),o.marker=s}for(;i<t;){if(r=e.charCodeAt(i),r===o.marker)return o.pos=i+1,o.str+=Ge(e.slice(u,i)),o.ok=!0,o;if(r===40&&o.marker===41)return o;r===92&&i+1<t&&i++,i++}return o.can_continue=!0,o.str+=Ge(e.slice(u,i)),o}const P0=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:L0,parseLinkLabel:I0,parseLinkTitle:B0},Symbol.toStringTag,{value:"Module"})),Ce={};Ce.code_inline=function(e,u,t,n,r){const i=e[u];return"<code"+r.renderAttrs(i)+">"+Ie(i.content)+"</code>"};Ce.code_block=function(e,u,t,n,r){const i=e[u];return"<pre"+r.renderAttrs(i)+"><code>"+Ie(e[u].content)+`</code></pre>
`};Ce.fence=function(e,u,t,n,r){const i=e[u],o=i.info?Ge(i.info).trim():"";let s="",c="";if(o){const p=o.split(/(\s+)/g);s=p[0],c=p.slice(2).join("")}let l;if(t.highlight?l=t.highlight(i.content,s,c)||Ie(i.content):l=Ie(i.content),l.indexOf("<pre")===0)return l+`
`;if(o){const p=i.attrIndex("class"),a=i.attrs?i.attrs.slice():[];p<0?a.push(["class",t.langPrefix+s]):(a[p]=a[p].slice(),a[p][1]+=" "+t.langPrefix+s);const f={attrs:a};return`<pre><code${r.renderAttrs(f)}>${l}</code></pre>
`}return`<pre><code${r.renderAttrs(i)}>${l}</code></pre>
`};Ce.image=function(e,u,t,n,r){const i=e[u];return i.attrs[i.attrIndex("alt")][1]=r.renderInlineAsText(i.children,t,n),r.renderToken(e,u,t)};Ce.hardbreak=function(e,u,t){return t.xhtmlOut?`<br />
`:`<br>
`};Ce.softbreak=function(e,u,t){return t.breaks?t.xhtmlOut?`<br />
`:`<br>
`:`
`};Ce.text=function(e,u){return Ie(e[u].content)};Ce.html_block=function(e,u){return e[u].content};Ce.html_inline=function(e,u){return e[u].content};function We(){this.rules=_u({},Ce)}We.prototype.renderAttrs=function(u){let t,n,r;if(!u.attrs)return"";for(r="",t=0,n=u.attrs.length;t<n;t++)r+=" "+Ie(u.attrs[t][0])+'="'+Ie(u.attrs[t][1])+'"';return r};We.prototype.renderToken=function(u,t,n){const r=u[t];let i="";if(r.hidden)return"";r.block&&r.nesting!==-1&&t&&u[t-1].hidden&&(i+=`
`),i+=(r.nesting===-1?"</":"<")+r.tag,i+=this.renderAttrs(r),r.nesting===0&&n.xhtmlOut&&(i+=" /");let o=!1;if(r.block&&(o=!0,r.nesting===1&&t+1<u.length)){const s=u[t+1];(s.type==="inline"||s.hidden||s.nesting===-1&&s.tag===r.tag)&&(o=!1)}return i+=o?`>
`:">",i};We.prototype.renderInline=function(e,u,t){let n="";const r=this.rules;for(let i=0,o=e.length;i<o;i++){const s=e[i].type;typeof r[s]<"u"?n+=r[s](e,i,u,t,this):n+=this.renderToken(e,i,u)}return n};We.prototype.renderInlineAsText=function(e,u,t){let n="";for(let r=0,i=e.length;r<i;r++)switch(e[r].type){case"text":n+=e[r].content;break;case"image":n+=this.renderInlineAsText(e[r].children,u,t);break;case"html_inline":case"html_block":n+=e[r].content;break;case"softbreak":case"hardbreak":n+=`
`;break}return n};We.prototype.render=function(e,u,t){let n="";const r=this.rules;for(let i=0,o=e.length;i<o;i++){const s=e[i].type;s==="inline"?n+=this.renderInline(e[i].children,u,t):typeof r[s]<"u"?n+=r[s](e,i,u,t,this):n+=this.renderToken(e,i,u,t)}return n};function le(){this.__rules__=[],this.__cache__=null}le.prototype.__find__=function(e){for(let u=0;u<this.__rules__.length;u++)if(this.__rules__[u].name===e)return u;return-1};le.prototype.__compile__=function(){const e=this,u=[""];e.__rules__.forEach(function(t){t.enabled&&t.alt.forEach(function(n){u.indexOf(n)<0&&u.push(n)})}),e.__cache__={},u.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(n){n.enabled&&(t&&n.alt.indexOf(t)<0||e.__cache__[t].push(n.fn))})})};le.prototype.at=function(e,u,t){const n=this.__find__(e),r=t||{};if(n===-1)throw new Error("Parser rule not found: "+e);this.__rules__[n].fn=u,this.__rules__[n].alt=r.alt||[],this.__cache__=null};le.prototype.before=function(e,u,t,n){const r=this.__find__(e),i=n||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r,0,{name:u,enabled:!0,fn:t,alt:i.alt||[]}),this.__cache__=null};le.prototype.after=function(e,u,t,n){const r=this.__find__(e),i=n||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r+1,0,{name:u,enabled:!0,fn:t,alt:i.alt||[]}),this.__cache__=null};le.prototype.push=function(e,u,t){const n=t||{};this.__rules__.push({name:e,enabled:!0,fn:u,alt:n.alt||[]}),this.__cache__=null};le.prototype.enable=function(e,u){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(n){const r=this.__find__(n);if(r<0){if(u)return;throw new Error("Rules manager: invalid rule name "+n)}this.__rules__[r].enabled=!0,t.push(n)},this),this.__cache__=null,t};le.prototype.enableOnly=function(e,u){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(t){t.enabled=!1}),this.enable(e,u)};le.prototype.disable=function(e,u){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(n){const r=this.__find__(n);if(r<0){if(u)return;throw new Error("Rules manager: invalid rule name "+n)}this.__rules__[r].enabled=!1,t.push(n)},this),this.__cache__=null,t};le.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function xe(e,u,t){this.type=e,this.tag=u,this.attrs=null,this.map=null,this.nesting=t,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}xe.prototype.attrIndex=function(u){if(!this.attrs)return-1;const t=this.attrs;for(let n=0,r=t.length;n<r;n++)if(t[n][0]===u)return n;return-1};xe.prototype.attrPush=function(u){this.attrs?this.attrs.push(u):this.attrs=[u]};xe.prototype.attrSet=function(u,t){const n=this.attrIndex(u),r=[u,t];n<0?this.attrPush(r):this.attrs[n]=r};xe.prototype.attrGet=function(u){const t=this.attrIndex(u);let n=null;return t>=0&&(n=this.attrs[t][1]),n};xe.prototype.attrJoin=function(u,t){const n=this.attrIndex(u);n<0?this.attrPush([u,t]):this.attrs[n][1]=this.attrs[n][1]+" "+t};function tn(e,u,t){this.src=e,this.env=t,this.tokens=[],this.inlineMode=!1,this.md=u}tn.prototype.Token=xe;const $0=/\r\n?|\n/g,z0=/\0/g;function U0(e){let u;u=e.src.replace($0,`
`),u=u.replace(z0,"�"),e.src=u}function q0(e){let u;e.inlineMode?(u=new e.Token("inline","",0),u.content=e.src,u.map=[0,1],u.children=[],e.tokens.push(u)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function j0(e){const u=e.tokens;for(let t=0,n=u.length;t<n;t++){const r=u[t];r.type==="inline"&&e.md.inline.parse(r.content,e.md,e.env,r.children)}}function H0(e){return/^<a[>\s]/i.test(e)}function Z0(e){return/^<\/a\s*>/i.test(e)}function G0(e){const u=e.tokens;if(e.md.options.linkify)for(let t=0,n=u.length;t<n;t++){if(u[t].type!=="inline"||!e.md.linkify.pretest(u[t].content))continue;let r=u[t].children,i=0;for(let o=r.length-1;o>=0;o--){const s=r[o];if(s.type==="link_close"){for(o--;r[o].level!==s.level&&r[o].type!=="link_open";)o--;continue}if(s.type==="html_inline"&&(H0(s.content)&&i>0&&i--,Z0(s.content)&&i++),!(i>0)&&s.type==="text"&&e.md.linkify.test(s.content)){const c=s.content;let l=e.md.linkify.match(c);const p=[];let a=s.level,f=0;l.length>0&&l[0].index===0&&o>0&&r[o-1].type==="text_special"&&(l=l.slice(1));for(let h=0;h<l.length;h++){const d=l[h].url,g=e.md.normalizeLink(d);if(!e.md.validateLink(g))continue;let m=l[h].text;l[h].schema?l[h].schema==="mailto:"&&!/^mailto:/i.test(m)?m=e.md.normalizeLinkText("mailto:"+m).replace(/^mailto:/,""):m=e.md.normalizeLinkText(m):m=e.md.normalizeLinkText("http://"+m).replace(/^http:\/\//,"");const E=l[h].index;if(E>f){const v=new e.Token("text","",0);v.content=c.slice(f,E),v.level=a,p.push(v)}const _=new e.Token("link_open","a",1);_.attrs=[["href",g]],_.level=a++,_.markup="linkify",_.info="auto",p.push(_);const x=new e.Token("text","",0);x.content=m,x.level=a,p.push(x);const y=new e.Token("link_close","a",-1);y.level=--a,y.markup="linkify",y.info="auto",p.push(y),f=l[h].lastIndex}if(f<c.length){const h=new e.Token("text","",0);h.content=c.slice(f),h.level=a,p.push(h)}u[t].children=r=en(r,o,p)}}}}const nn=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,W0=/\((c|tm|r)\)/i,V0=/\((c|tm|r)\)/ig,K0={c:"©",r:"®",tm:"™"};function Y0(e,u){return K0[u.toLowerCase()]}function X0(e){let u=0;for(let t=e.length-1;t>=0;t--){const n=e[t];n.type==="text"&&!u&&(n.content=n.content.replace(V0,Y0)),n.type==="link_open"&&n.info==="auto"&&u--,n.type==="link_close"&&n.info==="auto"&&u++}}function J0(e){let u=0;for(let t=e.length-1;t>=0;t--){const n=e[t];n.type==="text"&&!u&&nn.test(n.content)&&(n.content=n.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),n.type==="link_open"&&n.info==="auto"&&u--,n.type==="link_close"&&n.info==="auto"&&u++}}function Q0(e){let u;if(e.md.options.typographer)for(u=e.tokens.length-1;u>=0;u--)e.tokens[u].type==="inline"&&(W0.test(e.tokens[u].content)&&X0(e.tokens[u].children),nn.test(e.tokens[u].content)&&J0(e.tokens[u].children))}const ei=/['"]/,Dt=/['"]/g,St="’";function fu(e,u,t){return e.slice(0,u)+t+e.slice(u+1)}function ui(e,u){let t;const n=[];for(let r=0;r<e.length;r++){const i=e[r],o=e[r].level;for(t=n.length-1;t>=0&&!(n[t].level<=o);t--);if(n.length=t+1,i.type!=="text")continue;let s=i.content,c=0,l=s.length;e:for(;c<l;){Dt.lastIndex=c;const p=Dt.exec(s);if(!p)break;let a=!0,f=!0;c=p.index+1;const h=p[0]==="'";let d=32;if(p.index-1>=0)d=s.charCodeAt(p.index-1);else for(t=r-1;t>=0&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t--)if(e[t].content){d=e[t].content.charCodeAt(e[t].content.length-1);break}let g=32;if(c<l)g=s.charCodeAt(c);else for(t=r+1;t<e.length&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t++)if(e[t].content){g=e[t].content.charCodeAt(0);break}const m=Qe(d)||Je(String.fromCharCode(d)),E=Qe(g)||Je(String.fromCharCode(g)),_=Xe(d),x=Xe(g);if(x?a=!1:E&&(_||m||(a=!1)),_?f=!1:m&&(x||E||(f=!1)),g===34&&p[0]==='"'&&d>=48&&d<=57&&(f=a=!1),a&&f&&(a=m,f=E),!a&&!f){h&&(i.content=fu(i.content,p.index,St));continue}if(f)for(t=n.length-1;t>=0;t--){let y=n[t];if(n[t].level<o)break;if(y.single===h&&n[t].level===o){y=n[t];let v,C;h?(v=u.md.options.quotes[2],C=u.md.options.quotes[3]):(v=u.md.options.quotes[0],C=u.md.options.quotes[1]),i.content=fu(i.content,p.index,C),e[y.token].content=fu(e[y.token].content,y.pos,v),c+=C.length-1,y.token===r&&(c+=v.length-1),s=i.content,l=s.length,n.length=t;continue e}}a?n.push({token:r,pos:p.index,single:h,level:o}):f&&h&&(i.content=fu(i.content,p.index,St))}}}function ti(e){if(e.md.options.typographer)for(let u=e.tokens.length-1;u>=0;u--)e.tokens[u].type!=="inline"||!ei.test(e.tokens[u].content)||ui(e.tokens[u].children,e)}function ni(e){let u,t;const n=e.tokens,r=n.length;for(let i=0;i<r;i++){if(n[i].type!=="inline")continue;const o=n[i].children,s=o.length;for(u=0;u<s;u++)o[u].type==="text_special"&&(o[u].type="text");for(u=t=0;u<s;u++)o[u].type==="text"&&u+1<s&&o[u+1].type==="text"?o[u+1].content=o[u].content+o[u+1].content:(u!==t&&(o[t]=o[u]),t++);u!==t&&(o.length=t)}}const Nu=[["normalize",U0],["block",q0],["inline",j0],["linkify",G0],["replacements",Q0],["smartquotes",ti],["text_join",ni]];function Yu(){this.ruler=new le;for(let e=0;e<Nu.length;e++)this.ruler.push(Nu[e][0],Nu[e][1])}Yu.prototype.process=function(e){const u=this.ruler.getRules("");for(let t=0,n=u.length;t<n;t++)u[t](e)};Yu.prototype.State=tn;function Ae(e,u,t,n){this.src=e,this.md=u,this.env=t,this.tokens=n,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const r=this.src;for(let i=0,o=0,s=0,c=0,l=r.length,p=!1;o<l;o++){const a=r.charCodeAt(o);if(!p)if(X(a)){s++,a===9?c+=4-c%4:c++;continue}else p=!0;(a===10||o===l-1)&&(a!==10&&o++,this.bMarks.push(i),this.eMarks.push(o),this.tShift.push(s),this.sCount.push(c),this.bsCount.push(0),p=!1,s=0,c=0,i=o+1)}this.bMarks.push(r.length),this.eMarks.push(r.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}Ae.prototype.push=function(e,u,t){const n=new xe(e,u,t);return n.block=!0,t<0&&this.level--,n.level=this.level,t>0&&this.level++,this.tokens.push(n),n};Ae.prototype.isEmpty=function(u){return this.bMarks[u]+this.tShift[u]>=this.eMarks[u]};Ae.prototype.skipEmptyLines=function(u){for(let t=this.lineMax;u<t&&!(this.bMarks[u]+this.tShift[u]<this.eMarks[u]);u++);return u};Ae.prototype.skipSpaces=function(u){for(let t=this.src.length;u<t;u++){const n=this.src.charCodeAt(u);if(!X(n))break}return u};Ae.prototype.skipSpacesBack=function(u,t){if(u<=t)return u;for(;u>t;)if(!X(this.src.charCodeAt(--u)))return u+1;return u};Ae.prototype.skipChars=function(u,t){for(let n=this.src.length;u<n&&this.src.charCodeAt(u)===t;u++);return u};Ae.prototype.skipCharsBack=function(u,t,n){if(u<=n)return u;for(;u>n;)if(t!==this.src.charCodeAt(--u))return u+1;return u};Ae.prototype.getLines=function(u,t,n,r){if(u>=t)return"";const i=new Array(t-u);for(let o=0,s=u;s<t;s++,o++){let c=0;const l=this.bMarks[s];let p=l,a;for(s+1<t||r?a=this.eMarks[s]+1:a=this.eMarks[s];p<a&&c<n;){const f=this.src.charCodeAt(p);if(X(f))f===9?c+=4-(c+this.bsCount[s])%4:c++;else if(p-l<this.tShift[s])c++;else break;p++}c>n?i[o]=new Array(c-n+1).join(" ")+this.src.slice(p,a):i[o]=this.src.slice(p,a)}return i.join("")};Ae.prototype.Token=xe;const ri=65536;function Ou(e,u){const t=e.bMarks[u]+e.tShift[u],n=e.eMarks[u];return e.src.slice(t,n)}function Ft(e){const u=[],t=e.length;let n=0,r=e.charCodeAt(n),i=!1,o=0,s="";for(;n<t;)r===124&&(i?(s+=e.substring(o,n-1),o=n):(u.push(s+e.substring(o,n)),s="",o=n+1)),i=r===92,n++,r=e.charCodeAt(n);return u.push(s+e.substring(o)),u}function ii(e,u,t,n){if(u+2>t)return!1;let r=u+1;if(e.sCount[r]<e.blkIndent||e.sCount[r]-e.blkIndent>=4)return!1;let i=e.bMarks[r]+e.tShift[r];if(i>=e.eMarks[r])return!1;const o=e.src.charCodeAt(i++);if(o!==124&&o!==45&&o!==58||i>=e.eMarks[r])return!1;const s=e.src.charCodeAt(i++);if(s!==124&&s!==45&&s!==58&&!X(s)||o===45&&X(s))return!1;for(;i<e.eMarks[r];){const y=e.src.charCodeAt(i);if(y!==124&&y!==45&&y!==58&&!X(y))return!1;i++}let c=Ou(e,u+1),l=c.split("|");const p=[];for(let y=0;y<l.length;y++){const v=l[y].trim();if(!v){if(y===0||y===l.length-1)continue;return!1}if(!/^:?-+:?$/.test(v))return!1;v.charCodeAt(v.length-1)===58?p.push(v.charCodeAt(0)===58?"center":"right"):v.charCodeAt(0)===58?p.push("left"):p.push("")}if(c=Ou(e,u).trim(),c.indexOf("|")===-1||e.sCount[u]-e.blkIndent>=4)return!1;l=Ft(c),l.length&&l[0]===""&&l.shift(),l.length&&l[l.length-1]===""&&l.pop();const a=l.length;if(a===0||a!==p.length)return!1;if(n)return!0;const f=e.parentType;e.parentType="table";const h=e.md.block.ruler.getRules("blockquote"),d=e.push("table_open","table",1),g=[u,0];d.map=g;const m=e.push("thead_open","thead",1);m.map=[u,u+1];const E=e.push("tr_open","tr",1);E.map=[u,u+1];for(let y=0;y<l.length;y++){const v=e.push("th_open","th",1);p[y]&&(v.attrs=[["style","text-align:"+p[y]]]);const C=e.push("inline","",0);C.content=l[y].trim(),C.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let _,x=0;for(r=u+2;r<t&&!(e.sCount[r]<e.blkIndent);r++){let y=!1;for(let C=0,D=h.length;C<D;C++)if(h[C](e,r,t,!0)){y=!0;break}if(y||(c=Ou(e,r).trim(),!c)||e.sCount[r]-e.blkIndent>=4||(l=Ft(c),l.length&&l[0]===""&&l.shift(),l.length&&l[l.length-1]===""&&l.pop(),x+=a-l.length,x>ri))break;if(r===u+2){const C=e.push("tbody_open","tbody",1);C.map=_=[u+2,0]}const v=e.push("tr_open","tr",1);v.map=[r,r+1];for(let C=0;C<a;C++){const D=e.push("td_open","td",1);p[C]&&(D.attrs=[["style","text-align:"+p[C]]]);const F=e.push("inline","",0);F.content=l[C]?l[C].trim():"",F.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return _&&(e.push("tbody_close","tbody",-1),_[1]=r),e.push("table_close","table",-1),g[1]=r,e.parentType=f,e.line=r,!0}function si(e,u,t){if(e.sCount[u]-e.blkIndent<4)return!1;let n=u+1,r=n;for(;n<t;){if(e.isEmpty(n)){n++;continue}if(e.sCount[n]-e.blkIndent>=4){n++,r=n;continue}break}e.line=r;const i=e.push("code_block","code",0);return i.content=e.getLines(u,r,4+e.blkIndent,!1)+`
`,i.map=[u,e.line],!0}function oi(e,u,t,n){let r=e.bMarks[u]+e.tShift[u],i=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4||r+3>i)return!1;const o=e.src.charCodeAt(r);if(o!==126&&o!==96)return!1;let s=r;r=e.skipChars(r,o);let c=r-s;if(c<3)return!1;const l=e.src.slice(s,r),p=e.src.slice(r,i);if(o===96&&p.indexOf(String.fromCharCode(o))>=0)return!1;if(n)return!0;let a=u,f=!1;for(;a++,!(a>=t||(r=s=e.bMarks[a]+e.tShift[a],i=e.eMarks[a],r<i&&e.sCount[a]<e.blkIndent));)if(e.src.charCodeAt(r)===o&&!(e.sCount[a]-e.blkIndent>=4)&&(r=e.skipChars(r,o),!(r-s<c)&&(r=e.skipSpaces(r),!(r<i)))){f=!0;break}c=e.sCount[u],e.line=a+(f?1:0);const h=e.push("fence","code",0);return h.info=p,h.content=e.getLines(u+1,a,c,!0),h.markup=l,h.map=[u,e.line],!0}function ci(e,u,t,n){let r=e.bMarks[u]+e.tShift[u],i=e.eMarks[u];const o=e.lineMax;if(e.sCount[u]-e.blkIndent>=4||e.src.charCodeAt(r)!==62)return!1;if(n)return!0;const s=[],c=[],l=[],p=[],a=e.md.block.ruler.getRules("blockquote"),f=e.parentType;e.parentType="blockquote";let h=!1,d;for(d=u;d<t;d++){const x=e.sCount[d]<e.blkIndent;if(r=e.bMarks[d]+e.tShift[d],i=e.eMarks[d],r>=i)break;if(e.src.charCodeAt(r++)===62&&!x){let v=e.sCount[d]+1,C,D;e.src.charCodeAt(r)===32?(r++,v++,D=!1,C=!0):e.src.charCodeAt(r)===9?(C=!0,(e.bsCount[d]+v)%4===3?(r++,v++,D=!1):D=!0):C=!1;let F=v;for(s.push(e.bMarks[d]),e.bMarks[d]=r;r<i;){const $=e.src.charCodeAt(r);if(X($))$===9?F+=4-(F+e.bsCount[d]+(D?1:0))%4:F++;else break;r++}h=r>=i,c.push(e.bsCount[d]),e.bsCount[d]=e.sCount[d]+1+(C?1:0),l.push(e.sCount[d]),e.sCount[d]=F-v,p.push(e.tShift[d]),e.tShift[d]=r-e.bMarks[d];continue}if(h)break;let y=!1;for(let v=0,C=a.length;v<C;v++)if(a[v](e,d,t,!0)){y=!0;break}if(y){e.lineMax=d,e.blkIndent!==0&&(s.push(e.bMarks[d]),c.push(e.bsCount[d]),p.push(e.tShift[d]),l.push(e.sCount[d]),e.sCount[d]-=e.blkIndent);break}s.push(e.bMarks[d]),c.push(e.bsCount[d]),p.push(e.tShift[d]),l.push(e.sCount[d]),e.sCount[d]=-1}const g=e.blkIndent;e.blkIndent=0;const m=e.push("blockquote_open","blockquote",1);m.markup=">";const E=[u,0];m.map=E,e.md.block.tokenize(e,u,d);const _=e.push("blockquote_close","blockquote",-1);_.markup=">",e.lineMax=o,e.parentType=f,E[1]=e.line;for(let x=0;x<p.length;x++)e.bMarks[x+u]=s[x],e.tShift[x+u]=p[x],e.sCount[x+u]=l[x],e.bsCount[x+u]=c[x];return e.blkIndent=g,!0}function ai(e,u,t,n){const r=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4)return!1;let i=e.bMarks[u]+e.tShift[u];const o=e.src.charCodeAt(i++);if(o!==42&&o!==45&&o!==95)return!1;let s=1;for(;i<r;){const l=e.src.charCodeAt(i++);if(l!==o&&!X(l))return!1;l===o&&s++}if(s<3)return!1;if(n)return!0;e.line=u+1;const c=e.push("hr","hr",0);return c.map=[u,e.line],c.markup=Array(s+1).join(String.fromCharCode(o)),!0}function Tt(e,u){const t=e.eMarks[u];let n=e.bMarks[u]+e.tShift[u];const r=e.src.charCodeAt(n++);if(r!==42&&r!==45&&r!==43)return-1;if(n<t){const i=e.src.charCodeAt(n);if(!X(i))return-1}return n}function Mt(e,u){const t=e.bMarks[u]+e.tShift[u],n=e.eMarks[u];let r=t;if(r+1>=n)return-1;let i=e.src.charCodeAt(r++);if(i<48||i>57)return-1;for(;;){if(r>=n)return-1;if(i=e.src.charCodeAt(r++),i>=48&&i<=57){if(r-t>=10)return-1;continue}if(i===41||i===46)break;return-1}return r<n&&(i=e.src.charCodeAt(r),!X(i))?-1:r}function li(e,u){const t=e.level+2;for(let n=u+2,r=e.tokens.length-2;n<r;n++)e.tokens[n].level===t&&e.tokens[n].type==="paragraph_open"&&(e.tokens[n+2].hidden=!0,e.tokens[n].hidden=!0,n+=2)}function fi(e,u,t,n){let r,i,o,s,c=u,l=!0;if(e.sCount[c]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[c]-e.listIndent>=4&&e.sCount[c]<e.blkIndent)return!1;let p=!1;n&&e.parentType==="paragraph"&&e.sCount[c]>=e.blkIndent&&(p=!0);let a,f,h;if((h=Mt(e,c))>=0){if(a=!0,o=e.bMarks[c]+e.tShift[c],f=Number(e.src.slice(o,h-1)),p&&f!==1)return!1}else if((h=Tt(e,c))>=0)a=!1;else return!1;if(p&&e.skipSpaces(h)>=e.eMarks[c])return!1;if(n)return!0;const d=e.src.charCodeAt(h-1),g=e.tokens.length;a?(s=e.push("ordered_list_open","ol",1),f!==1&&(s.attrs=[["start",f]])):s=e.push("bullet_list_open","ul",1);const m=[c,0];s.map=m,s.markup=String.fromCharCode(d);let E=!1;const _=e.md.block.ruler.getRules("list"),x=e.parentType;for(e.parentType="list";c<t;){i=h,r=e.eMarks[c];const y=e.sCount[c]+h-(e.bMarks[c]+e.tShift[c]);let v=y;for(;i<r;){const q=e.src.charCodeAt(i);if(q===9)v+=4-(v+e.bsCount[c])%4;else if(q===32)v++;else break;i++}const C=i;let D;C>=r?D=1:D=v-y,D>4&&(D=1);const F=y+D;s=e.push("list_item_open","li",1),s.markup=String.fromCharCode(d);const $=[c,0];s.map=$,a&&(s.info=e.src.slice(o,h-1));const M=e.tight,O=e.tShift[c],z=e.sCount[c],U=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=F,e.tight=!0,e.tShift[c]=C-e.bMarks[c],e.sCount[c]=v,C>=r&&e.isEmpty(c+1)?e.line=Math.min(e.line+2,t):e.md.block.tokenize(e,c,t,!0),(!e.tight||E)&&(l=!1),E=e.line-c>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=U,e.tShift[c]=O,e.sCount[c]=z,e.tight=M,s=e.push("list_item_close","li",-1),s.markup=String.fromCharCode(d),c=e.line,$[1]=c,c>=t||e.sCount[c]<e.blkIndent||e.sCount[c]-e.blkIndent>=4)break;let H=!1;for(let q=0,V=_.length;q<V;q++)if(_[q](e,c,t,!0)){H=!0;break}if(H)break;if(a){if(h=Mt(e,c),h<0)break;o=e.bMarks[c]+e.tShift[c]}else if(h=Tt(e,c),h<0)break;if(d!==e.src.charCodeAt(h-1))break}return a?s=e.push("ordered_list_close","ol",-1):s=e.push("bullet_list_close","ul",-1),s.markup=String.fromCharCode(d),m[1]=c,e.line=c,e.parentType=x,l&&li(e,g),!0}function di(e,u,t,n){let r=e.bMarks[u]+e.tShift[u],i=e.eMarks[u],o=u+1;if(e.sCount[u]-e.blkIndent>=4||e.src.charCodeAt(r)!==91)return!1;function s(_){const x=e.lineMax;if(_>=x||e.isEmpty(_))return null;let y=!1;if(e.sCount[_]-e.blkIndent>3&&(y=!0),e.sCount[_]<0&&(y=!0),!y){const D=e.md.block.ruler.getRules("reference"),F=e.parentType;e.parentType="reference";let $=!1;for(let M=0,O=D.length;M<O;M++)if(D[M](e,_,x,!0)){$=!0;break}if(e.parentType=F,$)return null}const v=e.bMarks[_]+e.tShift[_],C=e.eMarks[_];return e.src.slice(v,C+1)}let c=e.src.slice(r,i+1);i=c.length;let l=-1;for(r=1;r<i;r++){const _=c.charCodeAt(r);if(_===91)return!1;if(_===93){l=r;break}else if(_===10){const x=s(o);x!==null&&(c+=x,i=c.length,o++)}else if(_===92&&(r++,r<i&&c.charCodeAt(r)===10)){const x=s(o);x!==null&&(c+=x,i=c.length,o++)}}if(l<0||c.charCodeAt(l+1)!==58)return!1;for(r=l+2;r<i;r++){const _=c.charCodeAt(r);if(_===10){const x=s(o);x!==null&&(c+=x,i=c.length,o++)}else if(!X(_))break}const p=e.md.helpers.parseLinkDestination(c,r,i);if(!p.ok)return!1;const a=e.md.normalizeLink(p.str);if(!e.md.validateLink(a))return!1;r=p.pos;const f=r,h=o,d=r;for(;r<i;r++){const _=c.charCodeAt(r);if(_===10){const x=s(o);x!==null&&(c+=x,i=c.length,o++)}else if(!X(_))break}let g=e.md.helpers.parseLinkTitle(c,r,i);for(;g.can_continue;){const _=s(o);if(_===null)break;c+=_,r=i,i=c.length,o++,g=e.md.helpers.parseLinkTitle(c,r,i,g)}let m;for(r<i&&d!==r&&g.ok?(m=g.str,r=g.pos):(m="",r=f,o=h);r<i;){const _=c.charCodeAt(r);if(!X(_))break;r++}if(r<i&&c.charCodeAt(r)!==10&&m)for(m="",r=f,o=h;r<i;){const _=c.charCodeAt(r);if(!X(_))break;r++}if(r<i&&c.charCodeAt(r)!==10)return!1;const E=yu(c.slice(1,l));return E?(n||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[E]>"u"&&(e.env.references[E]={title:m,href:a}),e.line=o),!0):!1}const hi=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],pi="[a-zA-Z_:][a-zA-Z0-9:._-]*",bi="[^\"'=<>`\\x00-\\x20]+",gi="'[^']*'",mi='"[^"]*"',xi="(?:"+bi+"|"+gi+"|"+mi+")",_i="(?:\\s+"+pi+"(?:\\s*=\\s*"+xi+")?)",rn="<[A-Za-z][A-Za-z0-9\\-]*"+_i+"*\\s*\\/?>",sn="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",yi="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Ei="<[?][\\s\\S]*?[?]>",ki="<![A-Za-z][^>]*>",vi="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",Ci=new RegExp("^(?:"+rn+"|"+sn+"|"+yi+"|"+Ei+"|"+ki+"|"+vi+")"),Ai=new RegExp("^(?:"+rn+"|"+sn+")"),qe=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+hi.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(Ai.source+"\\s*$"),/^$/,!1]];function wi(e,u,t,n){let r=e.bMarks[u]+e.tShift[u],i=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(r)!==60)return!1;let o=e.src.slice(r,i),s=0;for(;s<qe.length&&!qe[s][0].test(o);s++);if(s===qe.length)return!1;if(n)return qe[s][2];let c=u+1;if(!qe[s][1].test(o)){for(;c<t&&!(e.sCount[c]<e.blkIndent);c++)if(r=e.bMarks[c]+e.tShift[c],i=e.eMarks[c],o=e.src.slice(r,i),qe[s][1].test(o)){o.length!==0&&c++;break}}e.line=c;const l=e.push("html_block","",0);return l.map=[u,c],l.content=e.getLines(u,c,e.blkIndent,!0),!0}function Di(e,u,t,n){let r=e.bMarks[u]+e.tShift[u],i=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4)return!1;let o=e.src.charCodeAt(r);if(o!==35||r>=i)return!1;let s=1;for(o=e.src.charCodeAt(++r);o===35&&r<i&&s<=6;)s++,o=e.src.charCodeAt(++r);if(s>6||r<i&&!X(o))return!1;if(n)return!0;i=e.skipSpacesBack(i,r);const c=e.skipCharsBack(i,35,r);c>r&&X(e.src.charCodeAt(c-1))&&(i=c),e.line=u+1;const l=e.push("heading_open","h"+String(s),1);l.markup="########".slice(0,s),l.map=[u,e.line];const p=e.push("inline","",0);p.content=e.src.slice(r,i).trim(),p.map=[u,e.line],p.children=[];const a=e.push("heading_close","h"+String(s),-1);return a.markup="########".slice(0,s),!0}function Si(e,u,t){const n=e.md.block.ruler.getRules("paragraph");if(e.sCount[u]-e.blkIndent>=4)return!1;const r=e.parentType;e.parentType="paragraph";let i=0,o,s=u+1;for(;s<t&&!e.isEmpty(s);s++){if(e.sCount[s]-e.blkIndent>3)continue;if(e.sCount[s]>=e.blkIndent){let h=e.bMarks[s]+e.tShift[s];const d=e.eMarks[s];if(h<d&&(o=e.src.charCodeAt(h),(o===45||o===61)&&(h=e.skipChars(h,o),h=e.skipSpaces(h),h>=d))){i=o===61?1:2;break}}if(e.sCount[s]<0)continue;let f=!1;for(let h=0,d=n.length;h<d;h++)if(n[h](e,s,t,!0)){f=!0;break}if(f)break}if(!i)return!1;const c=e.getLines(u,s,e.blkIndent,!1).trim();e.line=s+1;const l=e.push("heading_open","h"+String(i),1);l.markup=String.fromCharCode(o),l.map=[u,e.line];const p=e.push("inline","",0);p.content=c,p.map=[u,e.line-1],p.children=[];const a=e.push("heading_close","h"+String(i),-1);return a.markup=String.fromCharCode(o),e.parentType=r,!0}function Fi(e,u,t){const n=e.md.block.ruler.getRules("paragraph"),r=e.parentType;let i=u+1;for(e.parentType="paragraph";i<t&&!e.isEmpty(i);i++){if(e.sCount[i]-e.blkIndent>3||e.sCount[i]<0)continue;let l=!1;for(let p=0,a=n.length;p<a;p++)if(n[p](e,i,t,!0)){l=!0;break}if(l)break}const o=e.getLines(u,i,e.blkIndent,!1).trim();e.line=i;const s=e.push("paragraph_open","p",1);s.map=[u,e.line];const c=e.push("inline","",0);return c.content=o,c.map=[u,e.line],c.children=[],e.push("paragraph_close","p",-1),e.parentType=r,!0}const du=[["table",ii,["paragraph","reference"]],["code",si],["fence",oi,["paragraph","reference","blockquote","list"]],["blockquote",ci,["paragraph","reference","blockquote","list"]],["hr",ai,["paragraph","reference","blockquote","list"]],["list",fi,["paragraph","reference","blockquote"]],["reference",di],["html_block",wi,["paragraph","reference","blockquote"]],["heading",Di,["paragraph","reference","blockquote"]],["lheading",Si],["paragraph",Fi]];function Eu(){this.ruler=new le;for(let e=0;e<du.length;e++)this.ruler.push(du[e][0],du[e][1],{alt:(du[e][2]||[]).slice()})}Eu.prototype.tokenize=function(e,u,t){const n=this.ruler.getRules(""),r=n.length,i=e.md.options.maxNesting;let o=u,s=!1;for(;o<t&&(e.line=o=e.skipEmptyLines(o),!(o>=t||e.sCount[o]<e.blkIndent));){if(e.level>=i){e.line=t;break}const c=e.line;let l=!1;for(let p=0;p<r;p++)if(l=n[p](e,o,t,!1),l){if(c>=e.line)throw new Error("block rule didn't increment state.line");break}if(!l)throw new Error("none of the block rules matched");e.tight=!s,e.isEmpty(e.line-1)&&(s=!0),o=e.line,o<t&&e.isEmpty(o)&&(s=!0,o++,e.line=o)}};Eu.prototype.parse=function(e,u,t,n){if(!e)return;const r=new this.State(e,u,t,n);this.tokenize(r,r.line,r.lineMax)};Eu.prototype.State=Ae;function tu(e,u,t,n){this.src=e,this.env=t,this.md=u,this.tokens=n,this.tokens_meta=Array(n.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}tu.prototype.pushPending=function(){const e=new xe("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};tu.prototype.push=function(e,u,t){this.pending&&this.pushPending();const n=new xe(e,u,t);let r=null;return t<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),n.level=this.level,t>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],r={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(n),this.tokens_meta.push(r),n};tu.prototype.scanDelims=function(e,u){const t=this.posMax,n=this.src.charCodeAt(e),r=e>0?this.src.charCodeAt(e-1):32;let i=e;for(;i<t&&this.src.charCodeAt(i)===n;)i++;const o=i-e,s=i<t?this.src.charCodeAt(i):32,c=Qe(r)||Je(String.fromCharCode(r)),l=Qe(s)||Je(String.fromCharCode(s)),p=Xe(r),a=Xe(s),f=!a&&(!l||p||c),h=!p&&(!c||a||l);return{can_open:f&&(u||!h||c),can_close:h&&(u||!f||l),length:o}};tu.prototype.Token=xe;function Ti(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function Mi(e,u){let t=e.pos;for(;t<e.posMax&&!Ti(e.src.charCodeAt(t));)t++;return t===e.pos?!1:(u||(e.pending+=e.src.slice(e.pos,t)),e.pos=t,!0)}const Ri=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function Ni(e,u){if(!e.md.options.linkify||e.linkLevel>0)return!1;const t=e.pos,n=e.posMax;if(t+3>n||e.src.charCodeAt(t)!==58||e.src.charCodeAt(t+1)!==47||e.src.charCodeAt(t+2)!==47)return!1;const r=e.pending.match(Ri);if(!r)return!1;const i=r[1],o=e.md.linkify.matchAtStart(e.src.slice(t-i.length));if(!o)return!1;let s=o.url;if(s.length<=i.length)return!1;let c=s.length;for(;c>0&&s.charCodeAt(c-1)===42;)c--;c!==s.length&&(s=s.slice(0,c));const l=e.md.normalizeLink(s);if(!e.md.validateLink(l))return!1;if(!u){e.pending=e.pending.slice(0,-i.length);const p=e.push("link_open","a",1);p.attrs=[["href",l]],p.markup="linkify",p.info="auto";const a=e.push("text","",0);a.content=e.md.normalizeLinkText(s);const f=e.push("link_close","a",-1);f.markup="linkify",f.info="auto"}return e.pos+=s.length-i.length,!0}function Oi(e,u){let t=e.pos;if(e.src.charCodeAt(t)!==10)return!1;const n=e.pending.length-1,r=e.posMax;if(!u)if(n>=0&&e.pending.charCodeAt(n)===32)if(n>=1&&e.pending.charCodeAt(n-1)===32){let i=n-1;for(;i>=1&&e.pending.charCodeAt(i-1)===32;)i--;e.pending=e.pending.slice(0,i),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(t++;t<r&&X(e.src.charCodeAt(t));)t++;return e.pos=t,!0}const Xu=[];for(let e=0;e<256;e++)Xu.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){Xu[e.charCodeAt(0)]=1});function Ii(e,u){let t=e.pos;const n=e.posMax;if(e.src.charCodeAt(t)!==92||(t++,t>=n))return!1;let r=e.src.charCodeAt(t);if(r===10){for(u||e.push("hardbreak","br",0),t++;t<n&&(r=e.src.charCodeAt(t),!!X(r));)t++;return e.pos=t,!0}let i=e.src[t];if(r>=55296&&r<=56319&&t+1<n){const s=e.src.charCodeAt(t+1);s>=56320&&s<=57343&&(i+=e.src[t+1],t++)}const o="\\"+i;if(!u){const s=e.push("text_special","",0);r<256&&Xu[r]!==0?s.content=i:s.content=o,s.markup=o,s.info="escape"}return e.pos=t+1,!0}function Li(e,u){let t=e.pos;if(e.src.charCodeAt(t)!==96)return!1;const r=t;t++;const i=e.posMax;for(;t<i&&e.src.charCodeAt(t)===96;)t++;const o=e.src.slice(r,t),s=o.length;if(e.backticksScanned&&(e.backticks[s]||0)<=r)return u||(e.pending+=o),e.pos+=s,!0;let c=t,l;for(;(l=e.src.indexOf("`",c))!==-1;){for(c=l+1;c<i&&e.src.charCodeAt(c)===96;)c++;const p=c-l;if(p===s){if(!u){const a=e.push("code_inline","code",0);a.markup=o,a.content=e.src.slice(t,l).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=c,!0}e.backticks[p]=l}return e.backticksScanned=!0,u||(e.pending+=o),e.pos+=s,!0}function Bi(e,u){const t=e.pos,n=e.src.charCodeAt(t);if(u||n!==126)return!1;const r=e.scanDelims(e.pos,!0);let i=r.length;const o=String.fromCharCode(n);if(i<2)return!1;let s;i%2&&(s=e.push("text","",0),s.content=o,i--);for(let c=0;c<i;c+=2)s=e.push("text","",0),s.content=o+o,e.delimiters.push({marker:n,length:0,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close});return e.pos+=r.length,!0}function Rt(e,u){let t;const n=[],r=u.length;for(let i=0;i<r;i++){const o=u[i];if(o.marker!==126||o.end===-1)continue;const s=u[o.end];t=e.tokens[o.token],t.type="s_open",t.tag="s",t.nesting=1,t.markup="~~",t.content="",t=e.tokens[s.token],t.type="s_close",t.tag="s",t.nesting=-1,t.markup="~~",t.content="",e.tokens[s.token-1].type==="text"&&e.tokens[s.token-1].content==="~"&&n.push(s.token-1)}for(;n.length;){const i=n.pop();let o=i+1;for(;o<e.tokens.length&&e.tokens[o].type==="s_close";)o++;o--,i!==o&&(t=e.tokens[o],e.tokens[o]=e.tokens[i],e.tokens[i]=t)}}function Pi(e){const u=e.tokens_meta,t=e.tokens_meta.length;Rt(e,e.delimiters);for(let n=0;n<t;n++)u[n]&&u[n].delimiters&&Rt(e,u[n].delimiters)}const on={tokenize:Bi,postProcess:Pi};function $i(e,u){const t=e.pos,n=e.src.charCodeAt(t);if(u||n!==95&&n!==42)return!1;const r=e.scanDelims(e.pos,n===42);for(let i=0;i<r.length;i++){const o=e.push("text","",0);o.content=String.fromCharCode(n),e.delimiters.push({marker:n,length:r.length,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close})}return e.pos+=r.length,!0}function Nt(e,u){const t=u.length;for(let n=t-1;n>=0;n--){const r=u[n];if(r.marker!==95&&r.marker!==42||r.end===-1)continue;const i=u[r.end],o=n>0&&u[n-1].end===r.end+1&&u[n-1].marker===r.marker&&u[n-1].token===r.token-1&&u[r.end+1].token===i.token+1,s=String.fromCharCode(r.marker),c=e.tokens[r.token];c.type=o?"strong_open":"em_open",c.tag=o?"strong":"em",c.nesting=1,c.markup=o?s+s:s,c.content="";const l=e.tokens[i.token];l.type=o?"strong_close":"em_close",l.tag=o?"strong":"em",l.nesting=-1,l.markup=o?s+s:s,l.content="",o&&(e.tokens[u[n-1].token].content="",e.tokens[u[r.end+1].token].content="",n--)}}function zi(e){const u=e.tokens_meta,t=e.tokens_meta.length;Nt(e,e.delimiters);for(let n=0;n<t;n++)u[n]&&u[n].delimiters&&Nt(e,u[n].delimiters)}const cn={tokenize:$i,postProcess:zi};function Ui(e,u){let t,n,r,i,o="",s="",c=e.pos,l=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const p=e.pos,a=e.posMax,f=e.pos+1,h=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(h<0)return!1;let d=h+1;if(d<a&&e.src.charCodeAt(d)===40){for(l=!1,d++;d<a&&(t=e.src.charCodeAt(d),!(!X(t)&&t!==10));d++);if(d>=a)return!1;if(c=d,r=e.md.helpers.parseLinkDestination(e.src,d,e.posMax),r.ok){for(o=e.md.normalizeLink(r.str),e.md.validateLink(o)?d=r.pos:o="",c=d;d<a&&(t=e.src.charCodeAt(d),!(!X(t)&&t!==10));d++);if(r=e.md.helpers.parseLinkTitle(e.src,d,e.posMax),d<a&&c!==d&&r.ok)for(s=r.str,d=r.pos;d<a&&(t=e.src.charCodeAt(d),!(!X(t)&&t!==10));d++);}(d>=a||e.src.charCodeAt(d)!==41)&&(l=!0),d++}if(l){if(typeof e.env.references>"u")return!1;if(d<a&&e.src.charCodeAt(d)===91?(c=d+1,d=e.md.helpers.parseLinkLabel(e,d),d>=0?n=e.src.slice(c,d++):d=h+1):d=h+1,n||(n=e.src.slice(f,h)),i=e.env.references[yu(n)],!i)return e.pos=p,!1;o=i.href,s=i.title}if(!u){e.pos=f,e.posMax=h;const g=e.push("link_open","a",1),m=[["href",o]];g.attrs=m,s&&m.push(["title",s]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=d,e.posMax=a,!0}function qi(e,u){let t,n,r,i,o,s,c,l,p="";const a=e.pos,f=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const h=e.pos+2,d=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(d<0)return!1;if(i=d+1,i<f&&e.src.charCodeAt(i)===40){for(i++;i<f&&(t=e.src.charCodeAt(i),!(!X(t)&&t!==10));i++);if(i>=f)return!1;for(l=i,s=e.md.helpers.parseLinkDestination(e.src,i,e.posMax),s.ok&&(p=e.md.normalizeLink(s.str),e.md.validateLink(p)?i=s.pos:p=""),l=i;i<f&&(t=e.src.charCodeAt(i),!(!X(t)&&t!==10));i++);if(s=e.md.helpers.parseLinkTitle(e.src,i,e.posMax),i<f&&l!==i&&s.ok)for(c=s.str,i=s.pos;i<f&&(t=e.src.charCodeAt(i),!(!X(t)&&t!==10));i++);else c="";if(i>=f||e.src.charCodeAt(i)!==41)return e.pos=a,!1;i++}else{if(typeof e.env.references>"u")return!1;if(i<f&&e.src.charCodeAt(i)===91?(l=i+1,i=e.md.helpers.parseLinkLabel(e,i),i>=0?r=e.src.slice(l,i++):i=d+1):i=d+1,r||(r=e.src.slice(h,d)),o=e.env.references[yu(r)],!o)return e.pos=a,!1;p=o.href,c=o.title}if(!u){n=e.src.slice(h,d);const g=[];e.md.inline.parse(n,e.md,e.env,g);const m=e.push("image","img",0),E=[["src",p],["alt",""]];m.attrs=E,m.children=g,m.content=n,c&&E.push(["title",c])}return e.pos=i,e.posMax=f,!0}const ji=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Hi=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function Zi(e,u){let t=e.pos;if(e.src.charCodeAt(t)!==60)return!1;const n=e.pos,r=e.posMax;for(;;){if(++t>=r)return!1;const o=e.src.charCodeAt(t);if(o===60)return!1;if(o===62)break}const i=e.src.slice(n+1,t);if(Hi.test(i)){const o=e.md.normalizeLink(i);if(!e.md.validateLink(o))return!1;if(!u){const s=e.push("link_open","a",1);s.attrs=[["href",o]],s.markup="autolink",s.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(i);const l=e.push("link_close","a",-1);l.markup="autolink",l.info="auto"}return e.pos+=i.length+2,!0}if(ji.test(i)){const o=e.md.normalizeLink("mailto:"+i);if(!e.md.validateLink(o))return!1;if(!u){const s=e.push("link_open","a",1);s.attrs=[["href",o]],s.markup="autolink",s.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(i);const l=e.push("link_close","a",-1);l.markup="autolink",l.info="auto"}return e.pos+=i.length+2,!0}return!1}function Gi(e){return/^<a[>\s]/i.test(e)}function Wi(e){return/^<\/a\s*>/i.test(e)}function Vi(e){const u=e|32;return u>=97&&u<=122}function Ki(e,u){if(!e.md.options.html)return!1;const t=e.posMax,n=e.pos;if(e.src.charCodeAt(n)!==60||n+2>=t)return!1;const r=e.src.charCodeAt(n+1);if(r!==33&&r!==63&&r!==47&&!Vi(r))return!1;const i=e.src.slice(n).match(Ci);if(!i)return!1;if(!u){const o=e.push("html_inline","",0);o.content=i[0],Gi(o.content)&&e.linkLevel++,Wi(o.content)&&e.linkLevel--}return e.pos+=i[0].length,!0}const Yi=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Xi=/^&([a-z][a-z0-9]{1,31});/i;function Ji(e,u){const t=e.pos,n=e.posMax;if(e.src.charCodeAt(t)!==38||t+1>=n)return!1;if(e.src.charCodeAt(t+1)===35){const i=e.src.slice(t).match(Yi);if(i){if(!u){const o=i[1][0].toLowerCase()==="x"?parseInt(i[1].slice(1),16):parseInt(i[1],10),s=e.push("text_special","",0);s.content=Ku(o)?bu(o):bu(65533),s.markup=i[0],s.info="entity"}return e.pos+=i[0].length,!0}}else{const i=e.src.slice(t).match(Xi);if(i){const o=Qt(i[0]);if(o!==i[0]){if(!u){const s=e.push("text_special","",0);s.content=o,s.markup=i[0],s.info="entity"}return e.pos+=i[0].length,!0}}}return!1}function Ot(e){const u={},t=e.length;if(!t)return;let n=0,r=-2;const i=[];for(let o=0;o<t;o++){const s=e[o];if(i.push(0),(e[n].marker!==s.marker||r!==s.token-1)&&(n=o),r=s.token,s.length=s.length||0,!s.close)continue;u.hasOwnProperty(s.marker)||(u[s.marker]=[-1,-1,-1,-1,-1,-1]);const c=u[s.marker][(s.open?3:0)+s.length%3];let l=n-i[n]-1,p=l;for(;l>c;l-=i[l]+1){const a=e[l];if(a.marker===s.marker&&a.open&&a.end<0){let f=!1;if((a.close||s.open)&&(a.length+s.length)%3===0&&(a.length%3!==0||s.length%3!==0)&&(f=!0),!f){const h=l>0&&!e[l-1].open?i[l-1]+1:0;i[o]=o-l+h,i[l]=h,s.open=!1,a.end=o,a.close=!1,p=-1,r=-2;break}}}p!==-1&&(u[s.marker][(s.open?3:0)+(s.length||0)%3]=p)}}function Qi(e){const u=e.tokens_meta,t=e.tokens_meta.length;Ot(e.delimiters);for(let n=0;n<t;n++)u[n]&&u[n].delimiters&&Ot(u[n].delimiters)}function es(e){let u,t,n=0;const r=e.tokens,i=e.tokens.length;for(u=t=0;u<i;u++)r[u].nesting<0&&n--,r[u].level=n,r[u].nesting>0&&n++,r[u].type==="text"&&u+1<i&&r[u+1].type==="text"?r[u+1].content=r[u].content+r[u+1].content:(u!==t&&(r[t]=r[u]),t++);u!==t&&(r.length=t)}const Iu=[["text",Mi],["linkify",Ni],["newline",Oi],["escape",Ii],["backticks",Li],["strikethrough",on.tokenize],["emphasis",cn.tokenize],["link",Ui],["image",qi],["autolink",Zi],["html_inline",Ki],["entity",Ji]],Lu=[["balance_pairs",Qi],["strikethrough",on.postProcess],["emphasis",cn.postProcess],["fragments_join",es]];function nu(){this.ruler=new le;for(let e=0;e<Iu.length;e++)this.ruler.push(Iu[e][0],Iu[e][1]);this.ruler2=new le;for(let e=0;e<Lu.length;e++)this.ruler2.push(Lu[e][0],Lu[e][1])}nu.prototype.skipToken=function(e){const u=e.pos,t=this.ruler.getRules(""),n=t.length,r=e.md.options.maxNesting,i=e.cache;if(typeof i[u]<"u"){e.pos=i[u];return}let o=!1;if(e.level<r){for(let s=0;s<n;s++)if(e.level++,o=t[s](e,!0),e.level--,o){if(u>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;o||e.pos++,i[u]=e.pos};nu.prototype.tokenize=function(e){const u=this.ruler.getRules(""),t=u.length,n=e.posMax,r=e.md.options.maxNesting;for(;e.pos<n;){const i=e.pos;let o=!1;if(e.level<r){for(let s=0;s<t;s++)if(o=u[s](e,!1),o){if(i>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(o){if(e.pos>=n)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};nu.prototype.parse=function(e,u,t,n){const r=new this.State(e,u,t,n);this.tokenize(r);const i=this.ruler2.getRules(""),o=i.length;for(let s=0;s<o;s++)i[s](r)};nu.prototype.State=tu;function us(e){const u={};e=e||{},u.src_Any=Vt.source,u.src_Cc=Kt.source,u.src_Z=Xt.source,u.src_P=Wu.source,u.src_ZPCc=[u.src_Z,u.src_P,u.src_Cc].join("|"),u.src_ZCc=[u.src_Z,u.src_Cc].join("|");const t="[><｜]";return u.src_pseudo_letter="(?:(?!"+t+"|"+u.src_ZPCc+")"+u.src_Any+")",u.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",u.src_auth="(?:(?:(?!"+u.src_ZCc+"|[@/\\[\\]()]).)+@)?",u.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",u.src_host_terminator="(?=$|"+t+"|"+u.src_ZPCc+")(?!"+(e["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+u.src_ZPCc+"))",u.src_path="(?:[/?#](?:(?!"+u.src_ZCc+"|"+t+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+u.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+u.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+u.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+u.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+u.src_ZCc+"|[']).)+\\'|\\'(?="+u.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+u.src_ZCc+"|[.]|$)|"+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+u.src_ZCc+"|$)|;(?!"+u.src_ZCc+"|$)|\\!+(?!"+u.src_ZCc+"|[!]|$)|\\?(?!"+u.src_ZCc+"|[?]|$))+|\\/)?",u.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',u.src_xn="xn--[a-z0-9\\-]{1,59}",u.src_domain_root="(?:"+u.src_xn+"|"+u.src_pseudo_letter+"{1,63})",u.src_domain="(?:"+u.src_xn+"|(?:"+u.src_pseudo_letter+")|(?:"+u.src_pseudo_letter+"(?:-|"+u.src_pseudo_letter+"){0,61}"+u.src_pseudo_letter+"))",u.src_host="(?:(?:(?:(?:"+u.src_domain+")\\.)*"+u.src_domain+"))",u.tpl_host_fuzzy="(?:"+u.src_ip4+"|(?:(?:(?:"+u.src_domain+")\\.)+(?:%TLDS%)))",u.tpl_host_no_ip_fuzzy="(?:(?:(?:"+u.src_domain+")\\.)+(?:%TLDS%))",u.src_host_strict=u.src_host+u.src_host_terminator,u.tpl_host_fuzzy_strict=u.tpl_host_fuzzy+u.src_host_terminator,u.src_host_port_strict=u.src_host+u.src_port+u.src_host_terminator,u.tpl_host_port_fuzzy_strict=u.tpl_host_fuzzy+u.src_port+u.src_host_terminator,u.tpl_host_port_no_ip_fuzzy_strict=u.tpl_host_no_ip_fuzzy+u.src_port+u.src_host_terminator,u.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+u.src_ZPCc+"|>|$))",u.tpl_email_fuzzy="(^|"+t+'|"|\\(|'+u.src_ZCc+")("+u.src_email_name+"@"+u.tpl_host_fuzzy_strict+")",u.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+u.src_ZPCc+"))((?![$+<=>^`|｜])"+u.tpl_host_port_fuzzy_strict+u.src_path+")",u.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+u.src_ZPCc+"))((?![$+<=>^`|｜])"+u.tpl_host_port_no_ip_fuzzy_strict+u.src_path+")",u}function Uu(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(n){e[n]=t[n]})}),e}function ku(e){return Object.prototype.toString.call(e)}function ts(e){return ku(e)==="[object String]"}function ns(e){return ku(e)==="[object Object]"}function rs(e){return ku(e)==="[object RegExp]"}function It(e){return ku(e)==="[object Function]"}function is(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const an={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function ss(e){return Object.keys(e||{}).reduce(function(u,t){return u||an.hasOwnProperty(t)},!1)}const os={"http:":{validate:function(e,u,t){const n=e.slice(u);return t.re.http||(t.re.http=new RegExp("^\\/\\/"+t.re.src_auth+t.re.src_host_port_strict+t.re.src_path,"i")),t.re.http.test(n)?n.match(t.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,u,t){const n=e.slice(u);return t.re.no_http||(t.re.no_http=new RegExp("^"+t.re.src_auth+"(?:localhost|(?:(?:"+t.re.src_domain+")\\.)+"+t.re.src_domain_root+")"+t.re.src_port+t.re.src_host_terminator+t.re.src_path,"i")),t.re.no_http.test(n)?u>=3&&e[u-3]===":"||u>=3&&e[u-3]==="/"?0:n.match(t.re.no_http)[0].length:0}},"mailto:":{validate:function(e,u,t){const n=e.slice(u);return t.re.mailto||(t.re.mailto=new RegExp("^"+t.re.src_email_name+"@"+t.re.src_host_strict,"i")),t.re.mailto.test(n)?n.match(t.re.mailto)[0].length:0}}},cs="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",as="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function ls(e){e.__index__=-1,e.__text_cache__=""}function fs(e){return function(u,t){const n=u.slice(t);return e.test(n)?n.match(e)[0].length:0}}function Lt(){return function(e,u){u.normalize(e)}}function gu(e){const u=e.re=us(e.__opts__),t=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||t.push(cs),t.push(u.src_xn),u.src_tlds=t.join("|");function n(s){return s.replace("%TLDS%",u.src_tlds)}u.email_fuzzy=RegExp(n(u.tpl_email_fuzzy),"i"),u.link_fuzzy=RegExp(n(u.tpl_link_fuzzy),"i"),u.link_no_ip_fuzzy=RegExp(n(u.tpl_link_no_ip_fuzzy),"i"),u.host_fuzzy_test=RegExp(n(u.tpl_host_fuzzy_test),"i");const r=[];e.__compiled__={};function i(s,c){throw new Error('(LinkifyIt) Invalid schema "'+s+'": '+c)}Object.keys(e.__schemas__).forEach(function(s){const c=e.__schemas__[s];if(c===null)return;const l={validate:null,link:null};if(e.__compiled__[s]=l,ns(c)){rs(c.validate)?l.validate=fs(c.validate):It(c.validate)?l.validate=c.validate:i(s,c),It(c.normalize)?l.normalize=c.normalize:c.normalize?i(s,c):l.normalize=Lt();return}if(ts(c)){r.push(s);return}i(s,c)}),r.forEach(function(s){e.__compiled__[e.__schemas__[s]]&&(e.__compiled__[s].validate=e.__compiled__[e.__schemas__[s]].validate,e.__compiled__[s].normalize=e.__compiled__[e.__schemas__[s]].normalize)}),e.__compiled__[""]={validate:null,normalize:Lt()};const o=Object.keys(e.__compiled__).filter(function(s){return s.length>0&&e.__compiled__[s]}).map(is).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+u.src_ZPCc+"))("+o+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+u.src_ZPCc+"))("+o+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i"),ls(e)}function ds(e,u){const t=e.__index__,n=e.__last_index__,r=e.__text_cache__.slice(t,n);this.schema=e.__schema__.toLowerCase(),this.index=t+u,this.lastIndex=n+u,this.raw=r,this.text=r,this.url=r}function qu(e,u){const t=new ds(e,u);return e.__compiled__[t.schema].normalize(t,e),t}function he(e,u){if(!(this instanceof he))return new he(e,u);u||ss(e)&&(u=e,e={}),this.__opts__=Uu({},an,u),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=Uu({},os,e),this.__compiled__={},this.__tlds__=as,this.__tlds_replaced__=!1,this.re={},gu(this)}he.prototype.add=function(u,t){return this.__schemas__[u]=t,gu(this),this};he.prototype.set=function(u){return this.__opts__=Uu(this.__opts__,u),this};he.prototype.test=function(u){if(this.__text_cache__=u,this.__index__=-1,!u.length)return!1;let t,n,r,i,o,s,c,l,p;if(this.re.schema_test.test(u)){for(c=this.re.schema_search,c.lastIndex=0;(t=c.exec(u))!==null;)if(i=this.testSchemaAt(u,t[2],c.lastIndex),i){this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+i;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(l=u.search(this.re.host_fuzzy_test),l>=0&&(this.__index__<0||l<this.__index__)&&(n=u.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(o=n.index+n[1].length,(this.__index__<0||o<this.__index__)&&(this.__schema__="",this.__index__=o,this.__last_index__=n.index+n[0].length))),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&(p=u.indexOf("@"),p>=0&&(r=u.match(this.re.email_fuzzy))!==null&&(o=r.index+r[1].length,s=r.index+r[0].length,(this.__index__<0||o<this.__index__||o===this.__index__&&s>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=o,this.__last_index__=s))),this.__index__>=0};he.prototype.pretest=function(u){return this.re.pretest.test(u)};he.prototype.testSchemaAt=function(u,t,n){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(u,n,this):0};he.prototype.match=function(u){const t=[];let n=0;this.__index__>=0&&this.__text_cache__===u&&(t.push(qu(this,n)),n=this.__last_index__);let r=n?u.slice(n):u;for(;this.test(r);)t.push(qu(this,n)),r=r.slice(this.__last_index__),n+=this.__last_index__;return t.length?t:null};he.prototype.matchAtStart=function(u){if(this.__text_cache__=u,this.__index__=-1,!u.length)return null;const t=this.re.schema_at_start.exec(u);if(!t)return null;const n=this.testSchemaAt(u,t[2],t[0].length);return n?(this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+n,qu(this,0)):null};he.prototype.tlds=function(u,t){return u=Array.isArray(u)?u:[u],t?(this.__tlds__=this.__tlds__.concat(u).sort().filter(function(n,r,i){return n!==i[r-1]}).reverse(),gu(this),this):(this.__tlds__=u.slice(),this.__tlds_replaced__=!0,gu(this),this)};he.prototype.normalize=function(u){u.schema||(u.url="http://"+u.url),u.schema==="mailto:"&&!/^mailto:/i.test(u.url)&&(u.url="mailto:"+u.url)};he.prototype.onCompile=function(){};const je=2147483647,Ee=36,Ju=1,eu=26,hs=38,ps=700,ln=72,fn=128,dn="-",bs=/^xn--/,gs=/[^\0-\x7F]/,ms=/[\x2E\u3002\uFF0E\uFF61]/g,xs={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Bu=Ee-Ju,ke=Math.floor,Pu=String.fromCharCode;function Re(e){throw new RangeError(xs[e])}function _s(e,u){const t=[];let n=e.length;for(;n--;)t[n]=u(e[n]);return t}function hn(e,u){const t=e.split("@");let n="";t.length>1&&(n=t[0]+"@",e=t[1]),e=e.replace(ms,".");const r=e.split("."),i=_s(r,u).join(".");return n+i}function pn(e){const u=[];let t=0;const n=e.length;for(;t<n;){const r=e.charCodeAt(t++);if(r>=55296&&r<=56319&&t<n){const i=e.charCodeAt(t++);(i&64512)==56320?u.push(((r&1023)<<10)+(i&1023)+65536):(u.push(r),t--)}else u.push(r)}return u}const ys=e=>String.fromCodePoint(...e),Es=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:Ee},Bt=function(e,u){return e+22+75*(e<26)-((u!=0)<<5)},bn=function(e,u,t){let n=0;for(e=t?ke(e/ps):e>>1,e+=ke(e/u);e>Bu*eu>>1;n+=Ee)e=ke(e/Bu);return ke(n+(Bu+1)*e/(e+hs))},gn=function(e){const u=[],t=e.length;let n=0,r=fn,i=ln,o=e.lastIndexOf(dn);o<0&&(o=0);for(let s=0;s<o;++s)e.charCodeAt(s)>=128&&Re("not-basic"),u.push(e.charCodeAt(s));for(let s=o>0?o+1:0;s<t;){const c=n;for(let p=1,a=Ee;;a+=Ee){s>=t&&Re("invalid-input");const f=Es(e.charCodeAt(s++));f>=Ee&&Re("invalid-input"),f>ke((je-n)/p)&&Re("overflow"),n+=f*p;const h=a<=i?Ju:a>=i+eu?eu:a-i;if(f<h)break;const d=Ee-h;p>ke(je/d)&&Re("overflow"),p*=d}const l=u.length+1;i=bn(n-c,l,c==0),ke(n/l)>je-r&&Re("overflow"),r+=ke(n/l),n%=l,u.splice(n++,0,r)}return String.fromCodePoint(...u)},mn=function(e){const u=[];e=pn(e);const t=e.length;let n=fn,r=0,i=ln;for(const c of e)c<128&&u.push(Pu(c));const o=u.length;let s=o;for(o&&u.push(dn);s<t;){let c=je;for(const p of e)p>=n&&p<c&&(c=p);const l=s+1;c-n>ke((je-r)/l)&&Re("overflow"),r+=(c-n)*l,n=c;for(const p of e)if(p<n&&++r>je&&Re("overflow"),p===n){let a=r;for(let f=Ee;;f+=Ee){const h=f<=i?Ju:f>=i+eu?eu:f-i;if(a<h)break;const d=a-h,g=Ee-h;u.push(Pu(Bt(h+d%g,0))),a=ke(d/g)}u.push(Pu(Bt(a,0))),i=bn(r,l,s===o),r=0,++s}++r,++n}return u.join("")},ks=function(e){return hn(e,function(u){return bs.test(u)?gn(u.slice(4).toLowerCase()):u})},vs=function(e){return hn(e,function(u){return gs.test(u)?"xn--"+mn(u):u})},xn={version:"2.3.1",ucs2:{decode:pn,encode:ys},decode:gn,encode:mn,toASCII:vs,toUnicode:ks},Cs={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},As={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},ws={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},Ds={default:Cs,zero:As,commonmark:ws},Ss=/^(vbscript|javascript|file|data):/,Fs=/^data:image\/(gif|png|jpeg|webp);/;function Ts(e){const u=e.trim().toLowerCase();return Ss.test(u)?Fs.test(u):!0}const _n=["http:","https:","mailto:"];function Ms(e){const u=Gu(e,!0);if(u.hostname&&(!u.protocol||_n.indexOf(u.protocol)>=0))try{u.hostname=xn.toASCII(u.hostname)}catch{}return uu(Zu(u))}function Rs(e){const u=Gu(e,!0);if(u.hostname&&(!u.protocol||_n.indexOf(u.protocol)>=0))try{u.hostname=xn.toUnicode(u.hostname)}catch{}return Ze(Zu(u),Ze.defaultChars+"%")}function pe(e,u){if(!(this instanceof pe))return new pe(e,u);u||Vu(e)||(u=e||{},e="default"),this.inline=new nu,this.block=new Eu,this.core=new Yu,this.renderer=new We,this.linkify=new he,this.validateLink=Ts,this.normalizeLink=Ms,this.normalizeLinkText=Rs,this.utils=O0,this.helpers=_u({},P0),this.options={},this.configure(e),u&&this.set(u)}pe.prototype.set=function(e){return _u(this.options,e),this};pe.prototype.configure=function(e){const u=this;if(Vu(e)){const t=e;if(e=Ds[t],!e)throw new Error('Wrong `markdown-it` preset "'+t+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&u.set(e.options),e.components&&Object.keys(e.components).forEach(function(t){e.components[t].rules&&u[t].ruler.enableOnly(e.components[t].rules),e.components[t].rules2&&u[t].ruler2.enableOnly(e.components[t].rules2)}),this};pe.prototype.enable=function(e,u){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){t=t.concat(this[r].ruler.enable(e,!0))},this),t=t.concat(this.inline.ruler2.enable(e,!0));const n=e.filter(function(r){return t.indexOf(r)<0});if(n.length&&!u)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+n);return this};pe.prototype.disable=function(e,u){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){t=t.concat(this[r].ruler.disable(e,!0))},this),t=t.concat(this.inline.ruler2.disable(e,!0));const n=e.filter(function(r){return t.indexOf(r)<0});if(n.length&&!u)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+n);return this};pe.prototype.use=function(e){const u=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,u),this};pe.prototype.parse=function(e,u){if(typeof e!="string")throw new Error("Input data should be a String");const t=new this.core.State(e,this,u);return this.core.process(t),t.tokens};pe.prototype.render=function(e,u){return u=u||{},this.renderer.render(this.parse(e,u),this.options,u)};pe.prototype.parseInline=function(e,u){const t=new this.core.State(e,this,u);return t.inlineMode=!0,this.core.process(t),t.tokens};pe.prototype.renderInline=function(e,u){return u=u||{},this.renderer.render(this.parseInline(e,u),this.options,u)};ve("c-content",{},()=>{const e=pe({html:!0,linkify:!0,typographer:!0}),u=Wt.reduce((t,n)=>(t.push(n),n.children&&t.push(...n.children),t),[]);return()=>`
    <div class="max-w-[calc(100vw-20px)]">
      ${u.map(t=>`
            <div class="content" id="${t.slug}">
              ${e.render(t.content.trim())}
            </div>
            ${t.examples?`<div class="examples max-w-[880px]">${t.examples}</div>`:""}
          `).join("<br />")}
    </div>
  `});ve("c-pointer",{plugins:[Gt()]},({state:e,onPointerMove:u,host:t,computed:n})=>{e.position={x:0,y:0},u(({x:s,y:c})=>{t.updateState({position:{x:s,y:c}})});const r=n(()=>`transform: translateX(${e.position.x}px);`),i=n(()=>`transform: translateY(${e.position.y}px);`),o=n(()=>`transform: translate(${e.position.x}px, ${e.position.y}px);`);return()=>`
    <div class="fixed w-screen h-screen pointer-events-none">
      <div
        class="absolute w-px h-screen bg-black rounded-full opacity-5" bind:style="${r}"></div>
      <div
        class="absolute w-screen h-px bg-black rounded-full opacity-5" bind:style="${i}"></div>
      <div
        class="absolute w-2 h-2 -ml-1 -mt-1 bg-[#BF5735] rounded-full" bind:style="${o}"></div>
    </div>
  `});const Pt=[{x:260,y:420},{x:310,y:420},{x:355,y:420},{x:400,y:420},{x:450,y:420},{x:489,y:420},{x:489,y:420},{x:450,y:420},{x:400,y:420},{x:355,y:420},{x:310,y:420},{x:260,y:420},{x:260,y:420}],$t=[{x:260,y:420},{x:310,y:420},{x:355,y:420},{x:400,y:420},{x:450,y:420},{x:489,y:420},{x:489,y:550},{x:450,y:580},{x:400,y:600},{x:355,y:600},{x:310,y:580},{x:260,y:550},{x:260,y:550}];ve("c-header",{plugins:[Gt(),Ht(),Cr(),xu()]},({refs:e,onPointerMove:u,onWindowScroll:t,actions:n,createLerp:r,runLerp:i,onMount:o,timer:s,onWindowResize:c})=>{let l={x:window.innerWidth*.5,y:window.innerHeight*.5};const p=()=>{if(e.left){const m=e.left,E=m.getBoundingClientRect(),_=Math.atan2(l.y-E.top,l.x-E.left),x=l.x-E.left,y=l.y-E.top;let C=Math.sqrt(x*x+y*y)/10;C=He(0,C,90);const D=Math.cos(_)*C,F=Math.sin(_)*C;m.style.transform=`translate(${D}px, ${F}px)`}if(e.right){const m=e.right,E=m.getBoundingClientRect(),_=Math.atan2(l.y-E.top,l.x-E.left),x=l.x-E.left,y=l.y-E.top;let C=Math.sqrt(x*x+y*y)/10;C=He(0,C,90);const D=Math.cos(_)*C,F=Math.sin(_)*C;m.style.transform=`translate(${D}px, ${F}px)`}};u(({x:m,y:E})=>{l={x:m,y:E},p()}),t(()=>p());const a=r({from:0,to:0,lerp:.4}),f=Pt.map(m=>({...m,x:m.x+355,y:m.y-20})),h=$t.map(m=>({...m,x:m.x+355,y:m.y-20}));i(a,m=>{const E=e["eyelip-left"],_=e["eyelip-right"];if(E&&_){const x=Ut(Pt,$t,m);E.setAttribute("d",zt(x));const y=Ut(f,h,m);_.setAttribute("d",zt(y))}});let d=!1;o(()=>{window.addEventListener("pointerdown",n.close),window.addEventListener("pointerup",()=>{d||n.open()}),s.setTimeout(()=>{n.close(),s.setTimeout(()=>{n.open()},250)},750),g()});const g=()=>{const m=Math.random()*500+5500;s.setTimeout(()=>{n.close(),s.setTimeout(()=>{n.open(),g()},250)},m)};return c(()=>{d=window.innerWidth<768,e["left-path"]&&e["left-path"].setAttribute("d",qt([{x:50,y:833},{x:-5e3,y:3300},{x:-5e3,y:4300},{x:187,y:938},{x:140,y:820}])),e["right-path"]&&e["right-path"].setAttribute("d",qt([{x:1083,y:769},{x:6e3,y:2500},{x:6e3,y:3500},{x:953,y:886},{x:1030,y:770}]))}),n.close=()=>{a.setTarget(1),d&&s.setTimeout(()=>{n.open()},250)},n.open=()=>{a.setTarget(0)},()=>`
      <svg
        width="1142" height="966"
        viewBox="0 0 1142 966" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="
          overflow-visible
          relative left-[50vw] -translate-x-1/2 
          -translate-y-[20%]
          scale-25 -translate-y-[30%]
          sm:scale-25 sm:-translate-y-[30%]
          md:scale-30 md:-translate-y-[32%]
          lg:scale-40 lg:-translate-y-[30%]
          2xl:scale-55 2xl:-translate-y-[23%]
          3xl:scale-65 3xl:-translate-y-[18%]
        "
      >
        <defs>
          <clipPath id="clip-left">
            <path d="M299.447 569.92C290.805 564.327 274.135 550.114 276.583 538.004C279.642 522.866 290.731 502.862 310.628 481.327C359 428.973 316.5 436.473 421.417 477.566C450.312 484.252 469.759 481.912 489.67 478.543C491.309 478.231 492.991 477.941 494.717 477.675C493.027 477.968 491.347 478.259 489.67 478.543C430.347 489.852 426.628 530.768 427.213 538.61C417.557 543.167 410.116 562.035 395.795 572.206C381.475 582.377 359.5 579.973 352.068 589.793C338.46 586.329 308.885 577.505 299.447 569.92Z"/>
          </clipPath>
          <clipPath id="clip-right">
            <path d="M798.779 541.4C806.412 534.666 820.651 518.288 816.539 506.641C811.4 492.082 796.319 475.457 775.26 455.263C731.655 413.45 746.499 417.649 666.65 466.898C639.832 477.358 626.964 479.19 613.592 478.69C612.239 478.547 610.876 478.473 609.503 478.473C610.881 478.565 612.239 478.639 613.592 478.69C644.247 481.927 669.148 520.402 669.685 528.122C679.753 531.294 689.698 548.937 705.115 557.018C720.533 565.1 737.503 557.018 750.275 568.364C763.057 563.05 790.651 550.216 798.779 541.4Z"/>
          </clipPath>
        </defs>

        <path d="M275.661 70.7904C288.809 83.7198 309.523 110.654 284.749 143.777C270.67 162.601 254.47 178.415 249.736 178.415C243.635 199.86 226.03 242.996 210.677 259.351C195.324 275.706 193.228 298.347 194.1 307.623C193.327 339.297 190.478 390.116 183.47 421.795C189.731 403.048 198.369 383.743 206.929 353.358C222.021 299.791 253.495 267.403 285.268 258.49C310.686 251.359 387.651 210.224 424.958 188.333C428.63 200.805 430.896 220.207 412.479 240.65C405.514 248.381 383.97 259.352 379.4 258.809C372.267 271.023 359.01 285.333 335.537 299.396C312.063 313.459 284.622 314.14 284.176 322.029C276.049 355.061 278.457 395.652 247.97 444.295C274.47 413.599 305.438 392.96 324.371 386.403C348.036 378.206 389.183 399.297 406.697 413.598C424.211 427.899 492.88 447.105 508.808 448.349C524.407 449.567 520.287 469.267 506.093 474.013C522.147 475.677 531.957 485.743 523.746 486.83C515.334 487.944 500.545 516.429 489.113 532.445C489.274 546.595 479.877 583.095 433.184 626.937C386.49 670.778 375.608 677.511 361.158 678.449C352.295 757.492 227.438 911.871 188.878 935.124C157.964 953.766 100.671 849.913 47.2835 835.463L47.7169 835.186C71.2154 820.127 156.63 765.389 123.538 665C91.9123 569.06 41.6735 369.598 34.8032 341.406C27.765 312.524 62.4183 205.311 61.9757 124.657C71.0597 125.171 86.7242 124.381 93.064 159.469C103.856 219.197 95.8479 210.381 92.1925 218.33C92.4458 237.128 94.7615 279.758 84.2204 315.72L84.2712 315.825C90.9907 329.822 111.983 373.552 110.47 391.796C108.575 414.655 126.277 247.373 187.852 177.992C235.79 123.978 270.028 85.3516 275.661 70.7904ZM421.417 477.566C316.501 436.473 359 428.973 310.628 481.327C290.731 502.862 279.642 522.866 276.583 538.004C274.136 550.114 290.806 564.327 299.447 569.919C308.886 577.505 338.461 586.329 352.068 589.793C359.501 579.973 381.476 582.377 395.796 572.206C410.116 562.034 417.557 543.167 427.213 538.61C426.628 530.767 430.347 489.852 489.67 478.543C469.76 481.912 450.313 484.251 421.417 477.566Z" fill="#222730" stroke="#222730" stroke-width="2" />
        <path d="M750.932 44.0808C739.947 58.7005 723.574 88.2312 752.456 117.581C768.87 134.26 780.503 142.473 791.542 147.011C800.546 167.391 823.861 207.646 841.166 221.705C858.471 235.764 863.738 257.882 864.208 267.184C869.47 298.427 881.076 357.041 892.422 387.425C883.645 369.738 870.879 343.117 858.203 314.23C835.855 263.302 800.542 235.61 768.278 231.192C742.467 227.657 661.533 197.612 622.023 181.117C620.217 193.971 620.768 213.489 641.643 231.169C649.538 237.855 675.438 248.946 676.497 244.558C685.194 255.658 700.163 267.983 725.064 278.648C749.965 289.313 776.83 286.183 778.389 293.93C791.019 325.497 797.517 374.961 834.181 418.88C806.417 396.099 767.744 367.084 748.342 363.218C724.089 358.385 686.953 384.965 671.903 401.548C656.854 418.13 592.601 446.658 577.24 450.097C566.602 452.479 564.35 467.09 570.769 473.457C561.921 475.77 565.233 487.971 571.503 491.973C595.003 506.973 594.992 516.336 608.423 530.604C610.281 544.631 627.771 575.384 676.433 616.375C727.003 658.973 740.003 667.973 757.003 670.973C776.9 747.979 917.698 869.872 958.624 887.542C991.434 901.708 1032.54 790.975 1082.56 769.272L1082.1 769.057C1057.04 757.41 965.921 715.073 983.912 611.123C1001.11 511.78 1021.72 307.395 1024.41 278.539C1027.17 248.976 978.101 147.664 967.052 67.7737C958.263 69.5418 941.679 70.9015 941.679 106.54C941.679 151.973 946.211 157.316 950.909 164.678C953.337 183.318 957.146 225.834 972.548 259.966C968.023 274.631 960.2 310.863 964.283 328.755C969.386 351.12 921.793 198.15 851.85 138.014C797.398 91.1979 758.5 57.7121 750.932 44.0808ZM666.649 466.899C746.498 417.649 731.655 413.451 775.259 455.264C796.319 475.458 811.4 492.083 816.539 506.642C820.651 518.289 806.412 534.667 798.779 541.401C790.651 550.217 763.057 563.051 750.276 568.366C737.503 557.02 720.533 565.101 705.115 557.019C689.698 548.937 679.753 531.294 669.684 528.123C669.147 520.402 644.247 481.928 613.592 478.691C612.239 478.64 610.881 478.565 609.503 478.474C610.876 478.474 612.24 478.548 613.592 478.691C626.964 479.191 639.832 477.359 666.649 466.899Z" fill="#222730" stroke="#222730" stroke-width="2" />

        <g clip-path="url(#clip-left)" style="transform: translate(0%, 0%)">
          <g ref="right">
            <ellipse cx="48.982" cy="64.5623" rx="49" ry="42.5" transform="rotate(3.23944 48.982 64.5623) translate(330, 410)" fill="#222730"/>
            <ellipse cx="${330+48.982}" cy="${410+64.5623}" rx="5" ry="7" fill="white"/>
          </g>
        </g>
        <g clip-path="url(#clip-right)" style="transform: translate(0%, 0%)">
          <g ref="left">
            <ellipse cx="48.982" cy="64.5623" rx="49" ry="42.5" transform="rotate(3.23944 48.982 64.5623) translate(685, 375)" fill="#222730"/>
            <ellipse cx="${685+48.982}" cy="${375+84.5623}" rx="5" ry="7" fill="white"/>
          </g>
        </g>

        <path ref="eyelip-left" clip-path="url(#clip-left)" d="" fill="#2C333F" />
        <path ref="eyelip-right" clip-path="url(#clip-right)" d="" fill="#2C333F" />

        <path ref="left-path" fill="#222730" />
        <path ref="right-path" fill="#222730" />

      </svg>
    `});function Ns(e){if(!e.length)return"";let u=`M ${e[0].x} ${e[0].y}`;for(let t=1;t<e.length;t++)u+=` L ${e[t].x} ${e[t].y}`;return u}function zt(e,u=!1){if(!e.length)return"";if(e.length===1)return`M ${e[0].x} ${e[0].y}`;let t=e,n="";if(u&&t.length>2)t=[e[e.length-2],...e,e[1]];else if(t.length<4){n=`M ${t[0].x} ${t[0].y}`;for(let r=1;r<t.length;r++)n+=` L ${t[r].x} ${t[r].y}`;return n}n=`M ${t[0].x} ${t[0].y}`;for(let r=0;r<t.length-3;r++){const i=t[r],o=t[r+1],s=t[r+2],c=t[r+3],l=o.x+(s.x-i.x)/6,p=o.y+(s.y-i.y)/6,a=s.x-(c.x-o.x)/6,f=s.y-(c.y-o.y)/6;n+=` C ${l} ${p}, ${a} ${f}, ${s.x} ${s.y}`}return u&&(n+=" Z"),n}function Ut(e,u,t){if(e.length!==u.length||e.length===0||u.length===0)throw new Error("Coordinate arrays must be non-empty and of the same length");return e.map((n,r)=>{const i=u[r];return{x:n.x+(i.x-n.x)*t,y:n.y+(i.y-n.y)*t}})}function qt(e){const u=Math.atan2(e[1].y-e[0].y,e[1].x-e[0].x),t=Math.atan2(e[2].y-e[3].y,e[2].x-e[3].x),n={x:e[0].x+Math.cos(u)*window.innerWidth*2,y:e[0].y+Math.sin(u)*window.innerWidth*2},r={x:e[2].x+Math.cos(t)*window.innerWidth*2,y:e[2].y+Math.sin(t)*window.innerWidth*2};return Ns([e[0],n,r,e[3],e[4]])}const mu="[A-Za-z$_][0-9A-Za-z$_]*",yn=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],En=["true","false","null","undefined","NaN","Infinity"],kn=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],vn=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Cn=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],An=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],wn=[].concat(Cn,kn,vn);function Os(e){const u=e.regex,t=(G,{after:ae})=>{const fe="</"+G[0].slice(1);return G.input.indexOf(fe,ae)!==-1},n=mu,r={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,o={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(G,ae)=>{const fe=G[0].length+G.index,be=G.input[fe];if(be==="<"||be===","){ae.ignoreMatch();return}be===">"&&(t(G,{after:fe})||ae.ignoreMatch());let De;const Le=G.input.substring(fe);if(De=Le.match(/^\s*=/)){ae.ignoreMatch();return}if((De=Le.match(/^\s+extends\s+/))&&De.index===0){ae.ignoreMatch();return}}},s={$pattern:mu,keyword:yn,literal:En,built_in:wn,"variable.language":An},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",a={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},h={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},d={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},g={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},m={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},_={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:n+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},x=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,d,g,m,{match:/\$\d+/},a];f.contains=x.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(x)});const y=[].concat(_,f.contains),v=y.concat([{begin:/(\s*)\(/,end:/\)/,keywords:s,contains:["self"].concat(y)}]),C={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:v},D={variants:[{match:[/class/,/\s+/,n,/\s+/,/extends/,/\s+/,u.concat(n,"(",u.concat(/\./,n),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,n],scope:{1:"keyword",3:"title.class"}}]},F={relevance:0,match:u.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...kn,...vn]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},M={variants:[{match:[/function/,/\s+/,n,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[C],illegal:/%/},O={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function z(G){return u.concat("(?!",G.join("|"),")")}const U={match:u.concat(/\b/,z([...Cn,"super","import"].map(G=>`${G}\\s*\\(`)),n,u.lookahead(/\s*\(/)),className:"title.function",relevance:0},H={begin:u.concat(/\./,u.lookahead(u.concat(n,/(?![0-9A-Za-z$_(])/))),end:n,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},q={match:[/get|set/,/\s+/,n,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},C]},V="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",we={match:[/const|var|let/,/\s+/,n,/\s*/,/=\s*/,/(async\s*)?/,u.lookahead(V)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[C]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:v,CLASS_REFERENCE:F},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,d,g,m,_,{match:/\$\d+/},a,F,{scope:"attr",match:n+u.lookahead(":"),relevance:0},we,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[_,e.REGEXP_MODE,{className:"function",begin:V,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:v}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:r.begin,end:r.end},{match:i},{begin:o.begin,"on:begin":o.isTrulyOpeningTag,end:o.end}],subLanguage:"xml",contains:[{begin:o.begin,end:o.end,skip:!0,contains:["self"]}]}]},M,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[C,e.inherit(e.TITLE_MODE,{begin:n,className:"title.function"})]},{match:/\.\.\./,relevance:0},H,{match:"\\$"+n,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[C]},U,O,D,q,{match:/\$[(.]/}]}}function Is(e){const u=e.regex,t=Os(e),n=mu,r=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],i={begin:[/namespace/,/\s+/,e.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},o={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:r},contains:[t.exports.CLASS_REFERENCE]},s={className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/},c=["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"],l={$pattern:mu,keyword:yn.concat(c),literal:En,built_in:wn.concat(r),"variable.language":An},p={className:"meta",begin:"@"+n},a=(g,m,E)=>{const _=g.contains.findIndex(x=>x.label===m);if(_===-1)throw new Error("can not find mode to replace");g.contains.splice(_,1,E)};Object.assign(t.keywords,l),t.exports.PARAMS_CONTAINS.push(p);const f=t.contains.find(g=>g.scope==="attr"),h=Object.assign({},f,{match:u.concat(n,u.lookahead(/\s*\?:/))});t.exports.PARAMS_CONTAINS.push([t.exports.CLASS_REFERENCE,f,h]),t.contains=t.contains.concat([p,i,o,h]),a(t,"shebang",e.SHEBANG()),a(t,"use_strict",s);const d=t.contains.find(g=>g.label==="func.def");return d.relevance=0,Object.assign(t,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),t}function Ls(e){const u=e.regex,t={},n={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[t]}]};Object.assign(t,{className:"variable",variants:[{begin:u.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},n]});const r={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},i=e.inherit(e.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),o={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},s={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,t,r]};r.contains.push(s);const c={match:/\\"/},l={className:"string",begin:/'/,end:/'/},p={match:/\\'/},a={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,t]},f=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],h=e.SHEBANG({binary:`(${f.join("|")})`,relevance:10}),d={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},g=["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],m=["true","false"],E={match:/(\/[a-z._-]+)+/},_=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],x=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias"],y=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],v=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:g,literal:m,built_in:[..._,...x,"set","shopt",...y,...v]},contains:[h,e.SHEBANG(),d,a,i,o,E,s,c,l,p,t]}}const jt="[A-Za-z$_][0-9A-Za-z$_]*",Bs=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],Ps=["true","false","null","undefined","NaN","Infinity"],Dn=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Sn=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Fn=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],$s=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],zs=[].concat(Fn,Dn,Sn);function Us(e){const u=e.regex,t=(G,{after:ae})=>{const fe="</"+G[0].slice(1);return G.input.indexOf(fe,ae)!==-1},n=jt,r={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,o={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(G,ae)=>{const fe=G[0].length+G.index,be=G.input[fe];if(be==="<"||be===","){ae.ignoreMatch();return}be===">"&&(t(G,{after:fe})||ae.ignoreMatch());let De;const Le=G.input.substring(fe);if(De=Le.match(/^\s*=/)){ae.ignoreMatch();return}if((De=Le.match(/^\s+extends\s+/))&&De.index===0){ae.ignoreMatch();return}}},s={$pattern:jt,keyword:Bs,literal:Ps,built_in:zs,"variable.language":$s},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",a={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},h={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},d={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},g={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},m={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},_={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:n+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},x=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,d,g,m,{match:/\$\d+/},a];f.contains=x.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(x)});const y=[].concat(_,f.contains),v=y.concat([{begin:/(\s*)\(/,end:/\)/,keywords:s,contains:["self"].concat(y)}]),C={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:v},D={variants:[{match:[/class/,/\s+/,n,/\s+/,/extends/,/\s+/,u.concat(n,"(",u.concat(/\./,n),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,n],scope:{1:"keyword",3:"title.class"}}]},F={relevance:0,match:u.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Dn,...Sn]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},M={variants:[{match:[/function/,/\s+/,n,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[C],illegal:/%/},O={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function z(G){return u.concat("(?!",G.join("|"),")")}const U={match:u.concat(/\b/,z([...Fn,"super","import"].map(G=>`${G}\\s*\\(`)),n,u.lookahead(/\s*\(/)),className:"title.function",relevance:0},H={begin:u.concat(/\./,u.lookahead(u.concat(n,/(?![0-9A-Za-z$_(])/))),end:n,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},q={match:[/get|set/,/\s+/,n,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},C]},V="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",we={match:[/const|var|let/,/\s+/,n,/\s*/,/=\s*/,/(async\s*)?/,u.lookahead(V)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[C]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:v,CLASS_REFERENCE:F},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,d,g,m,_,{match:/\$\d+/},a,F,{scope:"attr",match:n+u.lookahead(":"),relevance:0},we,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[_,e.REGEXP_MODE,{className:"function",begin:V,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:v}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:r.begin,end:r.end},{match:i},{begin:o.begin,"on:begin":o.isTrulyOpeningTag,end:o.end}],subLanguage:"xml",contains:[{begin:o.begin,end:o.end,skip:!0,contains:["self"]}]}]},M,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[C,e.inherit(e.TITLE_MODE,{begin:n,className:"title.function"})]},{match:/\.\.\./,relevance:0},H,{match:"\\$"+n,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[C]},U,O,D,q,{match:/\$[(.]/}]}}function qs(e){const u=e.regex,t=u.concat(/[\p{L}_]/u,u.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),n=/[\p{L}0-9._:-]+/u,r={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},i={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},o=e.inherit(i,{begin:/\(/,end:/\)/}),s=e.inherit(e.APOS_STRING_MODE,{className:"string"}),c=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),l={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:n,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[r]},{begin:/'/,end:/'/,contains:[r]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[i,c,s,o,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[i,o,c,s]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},r,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[c]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[l],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[l],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:u.concat(/</,u.lookahead(u.concat(t,u.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:t,relevance:0,starts:l}]},{className:"tag",begin:u.concat(/<\//,u.lookahead(u.concat(t,/>/))),contains:[{className:"name",begin:t,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}$e.registerLanguage("typescript",Is);$e.registerLanguage("javascript",Us);$e.registerLanguage("bash",Ls);$e.registerLanguage("xml",qs);$e.configure({languages:["typescript","ts","javascript","js","bash","sh"],ignoreUnescapedHTML:!0,cssSelector:"pre code"});$e.highlightAll();Ar();
