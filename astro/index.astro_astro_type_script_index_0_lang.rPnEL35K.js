function _r(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Tu,bt;function yr(){if(bt)return Tu;bt=1;function e(b){return b instanceof Map?b.clear=b.delete=b.set=function(){throw new Error("map is read-only")}:b instanceof Set&&(b.add=b.clear=b.delete=function(){throw new Error("set is read-only")}),Object.freeze(b),Object.getOwnPropertyNames(b).forEach(E=>{const D=b[E],I=typeof D;(I==="object"||I==="function")&&!Object.isFrozen(D)&&e(D)}),b}class u{constructor(E){E.data===void 0&&(E.data={}),this.data=E.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function t(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function n(b,...E){const D=Object.create(null);for(const I in b)D[I]=b[I];return E.forEach(function(I){for(const W in I)D[W]=I[W]}),D}const r="</span>",i=b=>!!b.scope,o=(b,{prefix:E})=>{if(b.startsWith("language:"))return b.replace("language:","language-");if(b.includes(".")){const D=b.split(".");return[`${E}${D.shift()}`,...D.map((I,W)=>`${I}${"_".repeat(W+1)}`)].join(" ")}return`${E}${b}`};class s{constructor(E,D){this.buffer="",this.classPrefix=D.classPrefix,E.walk(this)}addText(E){this.buffer+=t(E)}openNode(E){if(!i(E))return;const D=o(E.scope,{prefix:this.classPrefix});this.span(D)}closeNode(E){i(E)&&(this.buffer+=r)}value(){return this.buffer}span(E){this.buffer+=`<span class="${E}">`}}const c=(b={})=>{const E={children:[]};return Object.assign(E,b),E};class f{constructor(){this.rootNode=c(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(E){this.top.children.push(E)}openNode(E){const D=c({scope:E});this.add(D),this.stack.push(D)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(E){return this.constructor._walk(E,this.rootNode)}static _walk(E,D){return typeof D=="string"?E.addText(D):D.children&&(E.openNode(D),D.children.forEach(I=>this._walk(E,I)),E.closeNode(D)),E}static _collapse(E){typeof E!="string"&&E.children&&(E.children.every(D=>typeof D=="string")?E.children=[E.children.join("")]:E.children.forEach(D=>{f._collapse(D)}))}}class p extends f{constructor(E){super(),this.options=E}addText(E){E!==""&&this.add(E)}startScope(E){this.openNode(E)}endScope(){this.closeNode()}__addSublanguage(E,D){const I=E.root;D&&(I.scope=`language:${D}`),this.add(I)}toHTML(){return new s(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function a(b){return b?typeof b=="string"?b:b.source:null}function d(b){return g("(?=",b,")")}function l(b){return g("(?:",b,")*")}function h(b){return g("(?:",b,")?")}function g(...b){return b.map(D=>a(D)).join("")}function m(b){const E=b[b.length-1];return typeof E=="object"&&E.constructor===Object?(b.splice(b.length-1,1),E):{}}function k(...b){return"("+(m(b).capture?"":"?:")+b.map(I=>a(I)).join("|")+")"}function x(b){return new RegExp(b.toString()+"|").exec("").length-1}function _(b,E){const D=b&&b.exec(E);return D&&D.index===0}const y=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function C(b,{joinWith:E}){let D=0;return b.map(I=>{D+=1;const W=D;let V=a(I),M="";for(;V.length>0;){const T=y.exec(V);if(!T){M+=V;break}M+=V.substring(0,T.index),V=V.substring(T.index+T[0].length),T[0][0]==="\\"&&T[1]?M+="\\"+String(Number(T[1])+W):(M+=T[0],T[0]==="("&&D++)}return M}).map(I=>`(${I})`).join(E)}const A=/\b\B/,v="[a-zA-Z]\\w*",F="[a-zA-Z_]\\w*",U="\\b\\d+(\\.\\d+)?",G="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",$="\\b(0b[01]+)",be="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ve=(b={})=>{const E=/^#![ ]*\//;return b.binary&&(b.begin=g(E,/.*\b/,b.binary,/\b.*/)),n({scope:"meta",begin:E,end:/$/,relevance:0,"on:begin":(D,I)=>{D.index!==0&&I.ignoreMatch()}},b)},ae={begin:"\\\\[\\s\\S]",relevance:0},le={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[ae]},Ce={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[ae]},Ge={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},z=function(b,E,D={}){const I=n({scope:"comment",begin:b,end:E,contains:[]},D);I.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const W=k("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return I.contains.push({begin:g(/[ ]+/,"(",W,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),I},re=z("//","$"),se=z("/\\*","\\*/"),de=z("#","$"),Ae={scope:"number",begin:U,relevance:0},Ie={scope:"number",begin:G,relevance:0},Tn={scope:"number",begin:$,relevance:0},Mn={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[ae,{begin:/\[/,end:/\]/,relevance:0,contains:[ae]}]},Nn={scope:"title",begin:v,relevance:0},Rn={scope:"title",begin:F,relevance:0},On={begin:"\\.\\s*"+F,relevance:0};var ru=Object.freeze({__proto__:null,APOS_STRING_MODE:le,BACKSLASH_ESCAPE:ae,BINARY_NUMBER_MODE:Tn,BINARY_NUMBER_RE:$,COMMENT:z,C_BLOCK_COMMENT_MODE:se,C_LINE_COMMENT_MODE:re,C_NUMBER_MODE:Ie,C_NUMBER_RE:G,END_SAME_AS_BEGIN:function(b){return Object.assign(b,{"on:begin":(E,D)=>{D.data._beginMatch=E[1]},"on:end":(E,D)=>{D.data._beginMatch!==E[1]&&D.ignoreMatch()}})},HASH_COMMENT_MODE:de,IDENT_RE:v,MATCH_NOTHING_RE:A,METHOD_GUARD:On,NUMBER_MODE:Ae,NUMBER_RE:U,PHRASAL_WORDS_MODE:Ge,QUOTE_STRING_MODE:Ce,REGEXP_MODE:Mn,RE_STARTERS_RE:be,SHEBANG:ve,TITLE_MODE:Nn,UNDERSCORE_IDENT_RE:F,UNDERSCORE_TITLE_MODE:Rn});function In(b,E){b.input[b.index-1]==="."&&E.ignoreMatch()}function Ln(b,E){b.className!==void 0&&(b.scope=b.className,delete b.className)}function Bn(b,E){E&&b.beginKeywords&&(b.begin="\\b("+b.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",b.__beforeBegin=In,b.keywords=b.keywords||b.beginKeywords,delete b.beginKeywords,b.relevance===void 0&&(b.relevance=0))}function Pn(b,E){Array.isArray(b.illegal)&&(b.illegal=k(...b.illegal))}function $n(b,E){if(b.match){if(b.begin||b.end)throw new Error("begin & end are not supported with match");b.begin=b.match,delete b.match}}function zn(b,E){b.relevance===void 0&&(b.relevance=1)}const qn=(b,E)=>{if(!b.beforeMatch)return;if(b.starts)throw new Error("beforeMatch cannot be used with starts");const D=Object.assign({},b);Object.keys(b).forEach(I=>{delete b[I]}),b.keywords=D.keywords,b.begin=g(D.beforeMatch,d(D.begin)),b.starts={relevance:0,contains:[Object.assign(D,{endsParent:!0})]},b.relevance=0,delete D.beforeMatch},Un=["of","and","for","in","not","or","if","then","parent","list","value"],jn="keyword";function Qu(b,E,D=jn){const I=Object.create(null);return typeof b=="string"?W(D,b.split(" ")):Array.isArray(b)?W(D,b):Object.keys(b).forEach(function(V){Object.assign(I,Qu(b[V],E,V))}),I;function W(V,M){E&&(M=M.map(T=>T.toLowerCase())),M.forEach(function(T){const O=T.split("|");I[O[0]]=[V,Hn(O[0],O[1])]})}}function Hn(b,E){return E?Number(E):Zn(b)?0:1}function Zn(b){return Un.includes(b.toLowerCase())}const et={},Le=b=>{console.error(b)},ut=(b,...E)=>{console.log(`WARN: ${b}`,...E)},$e=(b,E)=>{et[`${b}/${E}`]||(console.log(`Deprecated as of ${b}. ${E}`),et[`${b}/${E}`]=!0)},iu=new Error;function tt(b,E,{key:D}){let I=0;const W=b[D],V={},M={};for(let T=1;T<=E.length;T++)M[T+I]=W[T],V[T+I]=!0,I+=x(E[T-1]);b[D]=M,b[D]._emit=V,b[D]._multi=!0}function Gn(b){if(Array.isArray(b.begin)){if(b.skip||b.excludeBegin||b.returnBegin)throw Le("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),iu;if(typeof b.beginScope!="object"||b.beginScope===null)throw Le("beginScope must be object"),iu;tt(b,b.begin,{key:"beginScope"}),b.begin=C(b.begin,{joinWith:""})}}function Wn(b){if(Array.isArray(b.end)){if(b.skip||b.excludeEnd||b.returnEnd)throw Le("skip, excludeEnd, returnEnd not compatible with endScope: {}"),iu;if(typeof b.endScope!="object"||b.endScope===null)throw Le("endScope must be object"),iu;tt(b,b.end,{key:"endScope"}),b.end=C(b.end,{joinWith:""})}}function Vn(b){b.scope&&typeof b.scope=="object"&&b.scope!==null&&(b.beginScope=b.scope,delete b.scope)}function Kn(b){Vn(b),typeof b.beginScope=="string"&&(b.beginScope={_wrap:b.beginScope}),typeof b.endScope=="string"&&(b.endScope={_wrap:b.endScope}),Gn(b),Wn(b)}function Yn(b){function E(M,T){return new RegExp(a(M),"m"+(b.case_insensitive?"i":"")+(b.unicodeRegex?"u":"")+(T?"g":""))}class D{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(T,O){O.position=this.position++,this.matchIndexes[this.matchAt]=O,this.regexes.push([O,T]),this.matchAt+=x(T)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const T=this.regexes.map(O=>O[1]);this.matcherRe=E(C(T,{joinWith:"|"}),!0),this.lastIndex=0}exec(T){this.matcherRe.lastIndex=this.lastIndex;const O=this.matcherRe.exec(T);if(!O)return null;const Q=O.findIndex((We,Cu)=>Cu>0&&We!==void 0),K=this.matchIndexes[Q];return O.splice(0,Q),Object.assign(O,K)}}class I{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(T){if(this.multiRegexes[T])return this.multiRegexes[T];const O=new D;return this.rules.slice(T).forEach(([Q,K])=>O.addRule(Q,K)),O.compile(),this.multiRegexes[T]=O,O}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(T,O){this.rules.push([T,O]),O.type==="begin"&&this.count++}exec(T){const O=this.getMatcher(this.regexIndex);O.lastIndex=this.lastIndex;let Q=O.exec(T);if(this.resumingScanAtSamePosition()&&!(Q&&Q.index===this.lastIndex)){const K=this.getMatcher(0);K.lastIndex=this.lastIndex+1,Q=K.exec(T)}return Q&&(this.regexIndex+=Q.position+1,this.regexIndex===this.count&&this.considerAll()),Q}}function W(M){const T=new I;return M.contains.forEach(O=>T.addRule(O.begin,{rule:O,type:"begin"})),M.terminatorEnd&&T.addRule(M.terminatorEnd,{type:"end"}),M.illegal&&T.addRule(M.illegal,{type:"illegal"}),T}function V(M,T){const O=M;if(M.isCompiled)return O;[Ln,$n,Kn,qn].forEach(K=>K(M,T)),b.compilerExtensions.forEach(K=>K(M,T)),M.__beforeBegin=null,[Bn,Pn,zn].forEach(K=>K(M,T)),M.isCompiled=!0;let Q=null;return typeof M.keywords=="object"&&M.keywords.$pattern&&(M.keywords=Object.assign({},M.keywords),Q=M.keywords.$pattern,delete M.keywords.$pattern),Q=Q||/\w+/,M.keywords&&(M.keywords=Qu(M.keywords,b.case_insensitive)),O.keywordPatternRe=E(Q,!0),T&&(M.begin||(M.begin=/\B|\b/),O.beginRe=E(O.begin),!M.end&&!M.endsWithParent&&(M.end=/\B|\b/),M.end&&(O.endRe=E(O.end)),O.terminatorEnd=a(O.end)||"",M.endsWithParent&&T.terminatorEnd&&(O.terminatorEnd+=(M.end?"|":"")+T.terminatorEnd)),M.illegal&&(O.illegalRe=E(M.illegal)),M.contains||(M.contains=[]),M.contains=[].concat(...M.contains.map(function(K){return Xn(K==="self"?M:K)})),M.contains.forEach(function(K){V(K,O)}),M.starts&&V(M.starts,T),O.matcher=W(O),O}if(b.compilerExtensions||(b.compilerExtensions=[]),b.contains&&b.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return b.classNameAliases=n(b.classNameAliases||{}),V(b)}function nt(b){return b?b.endsWithParent||nt(b.starts):!1}function Xn(b){return b.variants&&!b.cachedVariants&&(b.cachedVariants=b.variants.map(function(E){return n(b,{variants:null},E)})),b.cachedVariants?b.cachedVariants:nt(b)?n(b,{starts:b.starts?n(b.starts):null}):Object.isFrozen(b)?n(b):b}var Jn="11.11.1";class Qn extends Error{constructor(E,D){super(E),this.name="HTMLInjectionError",this.html=D}}const vu=t,rt=n,it=Symbol("nomatch"),er=7,st=function(b){const E=Object.create(null),D=Object.create(null),I=[];let W=!0;const V="Could not find the language '{}', did you forget to load/include a language module?",M={disableAutodetect:!0,name:"Plain text",contains:[]};let T={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:p};function O(w){return T.noHighlightRe.test(w)}function Q(w){let R=w.className+" ";R+=w.parentNode?w.parentNode.className:"";const P=T.languageDetectRe.exec(R);if(P){const j=Se(P[1]);return j||(ut(V.replace("{}",P[1])),ut("Falling back to no-highlight mode for this block.",w)),j?P[1]:"no-highlight"}return R.split(/\s+/).find(j=>O(j)||Se(j))}function K(w,R,P){let j="",Y="";typeof R=="object"?(j=w,P=R.ignoreIllegals,Y=R.language):($e("10.7.0","highlight(lang, code, ...args) has been deprecated."),$e("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),Y=w,j=R),P===void 0&&(P=!0);const he={code:j,language:Y};ou("before:highlight",he);const Fe=he.result?he.result:We(he.language,he.code,P);return Fe.code=he.code,ou("after:highlight",Fe),Fe}function We(w,R,P,j){const Y=Object.create(null);function he(S,N){return S.keywords[N]}function Fe(){if(!L.keywords){te.addText(H);return}let S=0;L.keywordPatternRe.lastIndex=0;let N=L.keywordPatternRe.exec(H),B="";for(;N;){B+=H.substring(S,N.index);const q=me.case_insensitive?N[0].toLowerCase():N[0],ne=he(L,q);if(ne){const[we,mr]=ne;if(te.addText(B),B="",Y[q]=(Y[q]||0)+1,Y[q]<=er&&(lu+=mr),we.startsWith("_"))B+=N[0];else{const xr=me.classNameAliases[we]||we;ge(N[0],xr)}}else B+=N[0];S=L.keywordPatternRe.lastIndex,N=L.keywordPatternRe.exec(H)}B+=H.substring(S),te.addText(B)}function cu(){if(H==="")return;let S=null;if(typeof L.subLanguage=="string"){if(!E[L.subLanguage]){te.addText(H);return}S=We(L.subLanguage,H,!0,pt[L.subLanguage]),pt[L.subLanguage]=S._top}else S=Au(H,L.subLanguage.length?L.subLanguage:null);L.relevance>0&&(lu+=S.relevance),te.__addSublanguage(S._emitter,S.language)}function oe(){L.subLanguage!=null?cu():Fe(),H=""}function ge(S,N){S!==""&&(te.startScope(N),te.addText(S),te.endScope())}function lt(S,N){let B=1;const q=N.length-1;for(;B<=q;){if(!S._emit[B]){B++;continue}const ne=me.classNameAliases[S[B]]||S[B],we=N[B];ne?ge(we,ne):(H=we,Fe(),H=""),B++}}function ft(S,N){return S.scope&&typeof S.scope=="string"&&te.openNode(me.classNameAliases[S.scope]||S.scope),S.beginScope&&(S.beginScope._wrap?(ge(H,me.classNameAliases[S.beginScope._wrap]||S.beginScope._wrap),H=""):S.beginScope._multi&&(lt(S.beginScope,N),H="")),L=Object.create(S,{parent:{value:L}}),L}function dt(S,N,B){let q=_(S.endRe,B);if(q){if(S["on:end"]){const ne=new u(S);S["on:end"](N,ne),ne.isMatchIgnored&&(q=!1)}if(q){for(;S.endsParent&&S.parent;)S=S.parent;return S}}if(S.endsWithParent)return dt(S.parent,N,B)}function dr(S){return L.matcher.regexIndex===0?(H+=S[0],1):(Fu=!0,0)}function hr(S){const N=S[0],B=S.rule,q=new u(B),ne=[B.__beforeBegin,B["on:begin"]];for(const we of ne)if(we&&(we(S,q),q.isMatchIgnored))return dr(N);return B.skip?H+=N:(B.excludeBegin&&(H+=N),oe(),!B.returnBegin&&!B.excludeBegin&&(H=N)),ft(B,S),B.returnBegin?0:N.length}function pr(S){const N=S[0],B=R.substring(S.index),q=dt(L,S,B);if(!q)return it;const ne=L;L.endScope&&L.endScope._wrap?(oe(),ge(N,L.endScope._wrap)):L.endScope&&L.endScope._multi?(oe(),lt(L.endScope,S)):ne.skip?H+=N:(ne.returnEnd||ne.excludeEnd||(H+=N),oe(),ne.excludeEnd&&(H=N));do L.scope&&te.closeNode(),!L.skip&&!L.subLanguage&&(lu+=L.relevance),L=L.parent;while(L!==q.parent);return q.starts&&ft(q.starts,S),ne.returnEnd?0:N.length}function br(){const S=[];for(let N=L;N!==me;N=N.parent)N.scope&&S.unshift(N.scope);S.forEach(N=>te.openNode(N))}let au={};function ht(S,N){const B=N&&N[0];if(H+=S,B==null)return oe(),0;if(au.type==="begin"&&N.type==="end"&&au.index===N.index&&B===""){if(H+=R.slice(N.index,N.index+1),!W){const q=new Error(`0 width match regex (${w})`);throw q.languageName=w,q.badRule=au.rule,q}return 1}if(au=N,N.type==="begin")return hr(N);if(N.type==="illegal"&&!P){const q=new Error('Illegal lexeme "'+B+'" for mode "'+(L.scope||"<unnamed>")+'"');throw q.mode=L,q}else if(N.type==="end"){const q=pr(N);if(q!==it)return q}if(N.type==="illegal"&&B==="")return H+=`
`,1;if(Su>1e5&&Su>N.index*3)throw new Error("potential infinite loop, way more iterations than matches");return H+=B,B.length}const me=Se(w);if(!me)throw Le(V.replace("{}",w)),new Error('Unknown language: "'+w+'"');const gr=Yn(me);let Du="",L=j||gr;const pt={},te=new T.__emitter(T);br();let H="",lu=0,Be=0,Su=0,Fu=!1;try{if(me.__emitTokens)me.__emitTokens(R,te);else{for(L.matcher.considerAll();;){Su++,Fu?Fu=!1:L.matcher.considerAll(),L.matcher.lastIndex=Be;const S=L.matcher.exec(R);if(!S)break;const N=R.substring(Be,S.index),B=ht(N,S);Be=S.index+B}ht(R.substring(Be))}return te.finalize(),Du=te.toHTML(),{language:w,value:Du,relevance:lu,illegal:!1,_emitter:te,_top:L}}catch(S){if(S.message&&S.message.includes("Illegal"))return{language:w,value:vu(R),illegal:!0,relevance:0,_illegalBy:{message:S.message,index:Be,context:R.slice(Be-100,Be+100),mode:S.mode,resultSoFar:Du},_emitter:te};if(W)return{language:w,value:vu(R),illegal:!1,relevance:0,errorRaised:S,_emitter:te,_top:L};throw S}}function Cu(w){const R={value:vu(w),illegal:!1,relevance:0,_top:M,_emitter:new T.__emitter(T)};return R._emitter.addText(w),R}function Au(w,R){R=R||T.languages||Object.keys(E);const P=Cu(w),j=R.filter(Se).filter(at).map(oe=>We(oe,w,!1));j.unshift(P);const Y=j.sort((oe,ge)=>{if(oe.relevance!==ge.relevance)return ge.relevance-oe.relevance;if(oe.language&&ge.language){if(Se(oe.language).supersetOf===ge.language)return 1;if(Se(ge.language).supersetOf===oe.language)return-1}return 0}),[he,Fe]=Y,cu=he;return cu.secondBest=Fe,cu}function ur(w,R,P){const j=R&&D[R]||P;w.classList.add("hljs"),w.classList.add(`language-${j}`)}function wu(w){let R=null;const P=Q(w);if(O(P))return;if(ou("before:highlightElement",{el:w,language:P}),w.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",w);return}if(w.children.length>0&&(T.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(w)),T.throwUnescapedHTML))throw new Qn("One of your code blocks includes unescaped HTML.",w.innerHTML);R=w;const j=R.textContent,Y=P?K(j,{language:P,ignoreIllegals:!0}):Au(j);w.innerHTML=Y.value,w.dataset.highlighted="yes",ur(w,P,Y.language),w.result={language:Y.language,re:Y.relevance,relevance:Y.relevance},Y.secondBest&&(w.secondBest={language:Y.secondBest.language,relevance:Y.secondBest.relevance}),ou("after:highlightElement",{el:w,result:Y,text:j})}function tr(w){T=rt(T,w)}const nr=()=>{su(),$e("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function rr(){su(),$e("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let ot=!1;function su(){function w(){su()}if(document.readyState==="loading"){ot||window.addEventListener("DOMContentLoaded",w,!1),ot=!0;return}document.querySelectorAll(T.cssSelector).forEach(wu)}function ir(w,R){let P=null;try{P=R(b)}catch(j){if(Le("Language definition for '{}' could not be registered.".replace("{}",w)),W)Le(j);else throw j;P=M}P.name||(P.name=w),E[w]=P,P.rawDefinition=R.bind(null,b),P.aliases&&ct(P.aliases,{languageName:w})}function sr(w){delete E[w];for(const R of Object.keys(D))D[R]===w&&delete D[R]}function or(){return Object.keys(E)}function Se(w){return w=(w||"").toLowerCase(),E[w]||E[D[w]]}function ct(w,{languageName:R}){typeof w=="string"&&(w=[w]),w.forEach(P=>{D[P.toLowerCase()]=R})}function at(w){const R=Se(w);return R&&!R.disableAutodetect}function cr(w){w["before:highlightBlock"]&&!w["before:highlightElement"]&&(w["before:highlightElement"]=R=>{w["before:highlightBlock"](Object.assign({block:R.el},R))}),w["after:highlightBlock"]&&!w["after:highlightElement"]&&(w["after:highlightElement"]=R=>{w["after:highlightBlock"](Object.assign({block:R.el},R))})}function ar(w){cr(w),I.push(w)}function lr(w){const R=I.indexOf(w);R!==-1&&I.splice(R,1)}function ou(w,R){const P=w;I.forEach(function(j){j[P]&&j[P](R)})}function fr(w){return $e("10.7.0","highlightBlock will be removed entirely in v12.0"),$e("10.7.0","Please use highlightElement now."),wu(w)}Object.assign(b,{highlight:K,highlightAuto:Au,highlightAll:su,highlightElement:wu,highlightBlock:fr,configure:tr,initHighlighting:nr,initHighlightingOnLoad:rr,registerLanguage:ir,unregisterLanguage:sr,listLanguages:or,getLanguage:Se,registerAliases:ct,autoDetection:at,inherit:rt,addPlugin:ar,removePlugin:lr}),b.debugMode=function(){W=!1},b.safeMode=function(){W=!0},b.versionString=Jn,b.regex={concat:g,lookahead:d,either:k,optional:h,anyNumberOfTimes:l};for(const w in ru)typeof ru[w]=="object"&&e(ru[w]);return Object.assign(b,ru),b},ze=st({});return ze.newInstance=()=>st({}),Tu=ze,ze.HighlightJS=ze,ze.default=ze,Tu}var Er=yr();const Pe=_r(Er);function $u({from:e=0,to:u=1,mass:t=1,stiffness:n=120,damping:r=14,velocity:i=0,tolerance:o=.001,resumeOnTarget:s=!0}={}){function c(){return De(d)}function f(x){if(m)return c();if(X(d)&&X(h)&&X(l)){let A=!0;for(let v=0;v<d.length;v+=1){const F=d[v]-h[v],U=(-n*F-r*l[v])/t;l[v]+=U*x,d[v]+=l[v]*x;const G=d[v]-h[v];(Math.abs(l[v])>=o||Math.abs(G)>=o)&&(A=!1)}if(A){for(let v=0;v<d.length;v+=1)d[v]=h[v],l[v]=0;m=!0}return p.value=d,p.velocity=l,De(d)}if(J(d)&&J(h)&&J(l)){const A=p.objectKeys??Object.keys(d);let v=!0;for(const F of A){const U=d[F]-h[F],G=(-n*U-r*l[F])/t;l[F]+=G*x,d[F]+=l[F]*x;const $=d[F]-h[F];(Math.abs(l[F])>=o||Math.abs($)>=o)&&(v=!1)}if(v){for(const F of A)d[F]=h[F],l[F]=0;m=!0}return p.value=d,p.velocity=l,De(d)}const _=h;let y=l;y+=(-n*(d-_)-r*y)/t*x,d+=y*x,l=y,p.value=d,p.velocity=l;const C=d-_;return Math.abs(y)<o&&Math.abs(C)<o&&(d=_,l=0,p.value=d,p.velocity=l,m=!0),d}const p=Zt({from:e,to:u,velocity:i,label:"Spring"}),a=p.normalizeInput;let d=p.value,l=p.velocity??i,h=p.target,g=null,m=!1;const k=new Set;return{setTarget:function(x){const _=a(x),y=!hu(_,h);if(h=_,p.target=_,d=p.value,s&&m&&y){m=!1,g=null;for(const C of k)C(h)}},setValue:function(x,_={}){const{resetVelocity:y=!0,resetTime:C=!0,setTarget:A=!1,markDone:v=!1}=_;d=a(x),p.value=d,A&&(h=De(d),p.target=h);const F=m||!hu(d,h);if(y&&(l=p.arrayLength!=null?Ve(0,p.arrayLength):p.objectKeys!=null?Ke(0,p.objectKeys):0,p.velocity=l),C&&(g=null),v&&(m=!0),F&&!v){m=!1,g=null;for(const U of k)U(h)}},getValue:c,isDone:function(){return m},onResume:function(x){return k.add(x),()=>{k.delete(x)}},step:f,next:function(x=performance.now()){if(g==null)return g=x,c();const _=(x-g)/1e3;g=x;const y=1/30;let C=_,A=c();for(;C>0&&!m;){const v=Math.min(C,y);A=f(v),C-=v}return A}}}function gt(e,u){if(!u||typeof u!="object"||u.type==null)return e??u;const{type:t,default:n}=u;if(e==null)return n;try{switch(t){case String:return String(e);case Number:{const r=Number(e);return Number.isNaN(r)?n:r}case Boolean:return e===""||e==="true"||e!=="false"&&e!=="0"&&e!=null;case Object:case Array:try{return typeof e=="string"?JSON.parse(e):e}catch{return t===Array?Array.isArray(n)?n:[]:n}default:return e}}catch{return n}}function kr(e){if(!e)return;const u=e.default;return typeof u=="function"?u():u}function mt(e,u,t,n){if(!n||typeof n!="object"||!n.reflect)return;let r=null;const i=n.type;if(i!==Boolean){if(i===Object||i===Array)try{r=t==null?null:JSON.stringify(t)}catch{r=null}else r=t==null?null:String(t);r==null?e.removeAttribute(u):e.setAttribute(u,r)}else t?e.setAttribute(u,""):e.removeAttribute(u)}function ye(e,u={},t){const{props:n={},shadow:r=!1,styles:i,plugins:o}=u,s=o??[],c=()=>{};class f extends HTMLElement{constructor(){super(),this.version=Hu,this.t={};for(const a of Object.keys(n)){const d=n[a];this.t[a]=d&&typeof d=="object"&&("type"in d||"default"in d)?d:{type:void 0,default:d,reflect:!1}}this.props={},this.state={},this.actions={},this.refs={},this.emit=this.emit.bind(this),this.listen=this.listen.bind(this),this.setState=this.setState.bind(this),this.updateState=this.updateState.bind(this),this.setProps=this.setProps.bind(this),this.scheduleUpdate=this.scheduleUpdate.bind(this),this.update=this.update.bind(this),this.forceRender=this.forceRender.bind(this),this.destroy=this.destroy.bind(this),this.$=this.$.bind(this),this.i=null,this.o=null,this.h=!1,this.u=!1,this.l=r,this.m=r?this.attachShadow({mode:"open"}):this,this.p=null,this.S=[],this.j=[],this.M=[],this.O=[],this._=[],this.A=[],this.T=[],this.k=[],this.L=null,this.C="mount",this.F=void 0,this.I=new Map,this.R=!1,this.V=!1,this.q={},this.D=e,this.H=!1,this.N=new Set,this.U=!1,this.B=new Map,this.W=0,this.J=!1}P(a){const d=this.l?this.m.host:this;let l=a.parentElement;for(;l;){if(l===d)return!1;if(l.tagName.includes("-"))return!0;l=l.parentElement}return!1}static get observedAttributes(){return Object.keys(n)}attributeChangedCallback(a,d,l){if(d===l)return;const h=this.t[a],g=this.q[a],m=gt(l,h);if(this.props[a]=m,this.R&&g!==m)for(const k of this.k)try{k(a,g,m)}catch(x){c(String(x?.message||x))}this.q[a]=m,this.N.has(a)?this.N.delete(a):this.i&&this.isConnected?this.U?this.H=!0:(this.C="props",this.F=[a],this.update(!0)):this.H=!0}connectedCallback(){for(const d in this.t){if(!this.t.hasOwnProperty(d))continue;const l=gt(this.getAttribute(d),this.t[d]);this.props[d]=l,this.q[d]=l}r||this.p||(this.p=this.K());let a=null;try{if(t){const d={props:this.props,state:this.state,actions:this.actions,refs:this.refs,emit:this.emit,listen:this.listen,updateState:this.updateState.bind(this),$:this.$,host:this,onMount:l=>this.M.push(l),onDestroy:l=>this.O.push(l),onUpdate:l=>this._.push(l),onBeforeUpdate:l=>this.A.push(l),onFirstUpdate:l=>this.T.push(l),onPropsChanged:l=>this.k.push(l),shouldRender:l=>{this.L=l},link:(l,h)=>{const g=h||l;this.state[g]=this.props[l],this.k.push((k,x,_)=>{k===l&&(Object.is(this.state[g],_)||(this.state[g]=_))});const m={fn:()=>{const k=this.state[g];if(Object.is(this.props[l],k))return;this.props[l]=k,this.q[l]=k;const x=this.t[l],_=x&&{...x,reflect:!0},y=this.getAttribute(l);this.N.add(l),mt(this,l,k,_),y===this.getAttribute(l)&&this.N.delete(l)},deps:()=>[this.state[g]]};this.S.push(m)},computed:(l,h)=>{let g;if(h!==void 0)try{const x=typeof h=="function"?h():h;Array.isArray(x)&&(g=x)}catch(x){String(x?.message||x)}const m={getter:l,deps:h,value:h!==void 0?l(g):l()};this.j.push(m);const k=()=>m.value;return k.Z=m,this.G(k),k},effect:(l,h)=>{const g={fn:l,deps:h};return this.S.push(g),()=>this.X(g)},delegate:(l,h,g)=>(this.Y(l,h,g),()=>this.tt(l,h,g)),escapeHtml:_t};for(const l of s)if(l)try{const h=l.extend(d,this);h&&typeof h=="object"&&Object.assign(d,h)}catch(h){c(String(h?.message||h))}a=t(d)}}catch(d){throw String(d?.message||d),d}this.i=typeof a!="function"?()=>"":a,this.U=!0,this.C="mount",this.F=void 0,this.update(!0),this.U=!1,this.H&&(this.H=!1,this.C="props",this.F=void 0,this.update(!0))}disconnectedCallback(){this.destroy()}remove(){super.remove()}$(a){const d=this.m.querySelectorAll(a);return d.length===0?null:d.length===1?d[0]:Array.from(d)}destroy(){for(const a of this.O)try{a()}catch(d){c(String(d?.message||d))}for(const a of this.S)if(a.cleanup){try{a.cleanup()}catch(d){c(String(d?.message||d))}a.cleanup=void 0}for(const[,a]of this.I)try{this.m.removeEventListener(a.eventType,a.listener)}catch{}this.I.clear(),this.R=!1}emit(a,d){this.dispatchEvent(new CustomEvent(a,{detail:d,bubbles:!0,composed:!0}))}listen(a,d,l,h){const g=l;a.addEventListener(d,g,h);const m=()=>{try{a.removeEventListener(d,g,h)}catch{}};return this.O.push(m),m}setState(a){const d=[],l=a,h=this.state;for(const g in l){if(!Object.prototype.hasOwnProperty.call(l,g))continue;const m=l[g];Object.is(h[g],m)||(h[g]=m,d.push(g))}if(d.length!==0)if(this.U||!this.R)this.C="state",this.F=d,this.update(!0);else{if(!this.i||!this.isConnected||this.h)return;this.h=!0;const g=[...d];requestAnimationFrame(()=>{this.h=!1,this.i&&this.isConnected&&(this.C="state",this.F=g,this.update(!0))})}}updateState(a){Object.assign(this.state,a),this.i&&this.isConnected&&this.et()}setProps(a){const d=Object.keys(a);if(d.length===0)return;const l=[],h={};for(const g of d){const m=a[g],k=this.q[g];this.props[g]=m,this.R&&k!==m&&(l.push(g),h[g]=k);const x=this.t[g];x&&x.reflect&&mt(this,g,m,x),this.R&&k===m||(this.q[g]=m)}if(this.R&&l.length>0)for(const g of l){const m=h[g],k=a[g];for(const x of this.k)try{x(g,m,k)}catch(_){c(String(_?.message||_))}}this.i&&this.isConnected?(this.C="props",this.F=l,this.update(!0)):this.H=!0}scheduleUpdate(){this.i&&this.isConnected&&this.et()}et(){this.u||this.h||(this.u=!0,(typeof queueMicrotask=="function"?queueMicrotask:a=>Promise.resolve().then(a))(()=>{this.u=!1,this.i&&this.isConnected&&(this.h||this.update(!1))}))}update(a){if(this.i){if(a&&this.R)for(const d of this.A)try{d()}catch(l){c(String(l?.message||l))}if(a){const d={reason:this.C,changedKeys:this.F};if(this.L===null||this.L(d)){this.nt();let l="";try{l=this.i()}catch(m){String(m?.message||m),l=""}if(typeof l!="string"&&(l=l==null?"":String(l)),l=((m,k,x)=>{const _=Object.prototype.hasOwnProperty;return m.replace(Fr,(y,C,A)=>{if(C==="text"||C==="html")return y;const v=A.trim();if(!v)return y;const F=_.call(k,v),U=_.call(x,v);if(!F&&!U)return y;const G=F?k[v]:x[v];return Sr.has(C)?G?`${C}="" ${y}`:y:G==null?y:`${C}="${_t(String(G))}" ${y}`})})(l,this.state,this.props),!this.l){const m=`data-scope-owner="${this.D}"`;l=l.replace(/<slot(?![^>]*data-scope-owner)(\s|>)/g,`<slot ${m}$1`)}this.J=!1;const h=this.o!==null&&Object.is(this.o,l);let g=!1;h&&this.R||(this.m.innerHTML=l,this.o=l,g=!0),this.U?(typeof requestAnimationFrame=="function"?requestAnimationFrame:m=>setTimeout(m,0))(()=>{if(this.i&&this.isConnected){if(g&&!r&&this.projectSlots(),g&&this.st(),!this.R){this.R=!0;for(const m of this.M)try{m()}catch(k){c(String(k?.message||k))}for(const m in this.t){if(!this.t.hasOwnProperty(m))continue;const k=this.t[m],x=this.props[m],_=kr(k);if(x!==_)for(const y of this.k)try{y(m,_,x)}catch(C){c(String(C?.message||C))}}}this.it(),this.ot()}}):(g&&!r&&this.projectSlots(),g&&this.st(),this.it(),this.ot())}else this.it(),this.R&&this.ot()}else this.J&&this.nt(),this.it(),this.R&&this.ot()}}forceRender(){this.o=null,this.i&&this.isConnected?this.U?this.H=!0:(this.C="force",this.F=void 0,this.update(!0)):this.H=!0}ot(){if(!this.V){this.V=!0;for(const a of this.T)try{a()}catch(d){c(String(d?.message||d))}}for(const a of this._)try{a()}catch(d){c(String(d?.message||d))}this.rt()}rt(){const a=(this.l?this.m:this).querySelectorAll("*"),d=Object.prototype.hasOwnProperty,l=this.state,h=this.props;this.actions;for(let g=0;g<a.length;g++){const m=a[g];if(this.P(m)||m.attributes.length===0)continue;const k=m.attributes;for(let x=k.length-1;x>=0;x--){const _=k[x];if(!_.name.startsWith(Dr))continue;const y=_.name.slice(5),C=_.value,A=C?C.trim():"";let v,F=!1;if(A){const $=this.B.get(A);if($){$.Z&&(this.J=!0);try{v=$()}catch{}F=!0}}if(!F){const $=A||y,be=d.call(l,$),ve=!be&&d.call(h,$);be?v=l[$]:ve&&(v=h[$])}if(y==="text"){const $=v==null?"":String(v);m.textContent!==$&&(m.textContent=$)}else if(y==="html"){const $=v==null?"":String(v);m.innerHTML!==$&&(m.innerHTML=$)}else if(y in m){if(!Object.is(m[y],v))try{m[y]=v}catch{}if(y==="value")try{v==null?m.removeAttribute("value"):m.setAttribute("value",String(v))}catch{}}else if(v!=null)try{m.setAttribute(y,String(v))}catch{}const U=`__scopeBind_${y}`,G=m[U];if(G){const $=G.ct;$&&m.removeEventListener($,G),delete m[U]}}}}ht(a,d){if(!a||!d||a.length!==d.length)return!0;for(let l=0;l<d.length;l++)if(!Object.is(a[l],d[l]))return!0;return!1}nt(){for(const a of this.j){let d,l=!0;if(a.deps!==void 0)try{const h=typeof a.deps=="function"?a.deps():a.deps;Array.isArray(h)&&(d=h,l=this.ht(a.prevDeps,d))}catch(h){c(String(h?.message||h)),l=!0,d=void 0}if(l){try{a.value=a.deps!==void 0?a.getter(d):a.getter()}catch(h){c(String(h?.message||h))}d&&(a.prevDeps=d.slice())}}}it(){for(const a of this.S){let d,l=!0;if(a.deps!==void 0)try{const h=typeof a.deps=="function"?a.deps():a.deps;Array.isArray(h)&&(d=h,l=this.ht(a.prevDeps,d))}catch(h){c(String(h?.message||h)),l=!0,d=void 0}if(l){if(a.cleanup){try{a.cleanup()}catch{}a.cleanup=void 0}try{const h=a.deps!==void 0?a.fn(d):a.fn();typeof h=="function"&&(a.cleanup=h)}catch{}d&&(a.prevDeps=d.slice())}}}X(a){const d=this.S.indexOf(a);if(d!==-1){if(a.cleanup)try{a.cleanup()}catch{}this.S.splice(d,1)}}G(a){const d=a.ft;if(d&&typeof d=="string")return this.B.set(d,a),d;const l=`__scope_bind_${++this.W}__`;this.B.set(l,a);try{a.ft=l,a.toString=()=>l}catch{}return l}st(){const a=(this.l?this.m:this).querySelectorAll("*"),d=this.refs;for(const l in d)d.hasOwnProperty(l)&&delete d[l];for(let l=0;l<a.length;l++){const h=a[l];if(this.P(h))continue;const g=h.getAttribute("ref");if(g&&(d[g]?Array.isArray(d[g])?d[g].push(h):d[g]=[d[g],h]:d[g]=h),h.attributes.length>0){const m=h.attributes;for(let k=m.length-1;k>=0;k--){const x=m[k];if(!x.name.startsWith("on:"))continue;const _=x.name.slice(3),y=x.value,C=`__tinyHandler_${_}`,A=h[C];A&&h.removeEventListener(_,A),h.removeAttribute(x.name);const v=this.actions[y];if(v&&typeof v=="function"){const F=U=>{v.call(this.actions,U)};h[C]=F,h.addEventListener(_,F)}}}}}K(){const a=new Map,d=this.childNodes,l=[];for(let h=0;h<d.length;h++)l.push(d[h]);for(let h=0;h<l.length;h++){const g=l[h];let m="";g.nodeType===1&&g.getAttribute&&(m=g.getAttribute("slot")||""),a.has(m)||a.set(m,[]),a.get(m).push(g)}for(let h=0;h<l.length;h++){const g=l[h];g.parentNode&&g.parentNode.removeChild(g)}return a}projectSlots(){const a=this.p||new Map,d=(this.l?this.m:this).querySelectorAll(`slot[data-scope-owner="${this.D}"]`);if(d.length!==0)for(let l=0;l<d.length;l++){const h=d[l],g=h.getAttribute("name")||"",m=a.get(g)||[];if(m.length){const k=document.createDocumentFragment();for(let x=0;x<m.length;x++){const _=m[x];let y;if(_.nodeType===1&&_.tagName.includes("-")&&_.p instanceof Map){const C=_,A=document.createElement(C.tagName.toLowerCase());for(let v=0;v<C.attributes.length;v++){const F=C.attributes[v];A.setAttribute(F.name,F.value)}for(const v of C.p.values())for(let F=0;F<v.length;F++)A.appendChild(v[F].cloneNode(!0));y=A}else y=_.cloneNode(!0);k.appendChild(y)}h.replaceWith(k)}else{const k=h.childNodes,x=[];for(let _=0;_<k.length;_++)x.push(k[_]);if(x.length>0){const _=document.createDocumentFragment();for(let y=0;y<x.length;y++)_.appendChild(x[y]);h.replaceWith(_)}}}}Y(a,d,l){const h=`${a}::${d}`;let g=this.I.get(h);if(!g){const m=k=>{const x=k.target&&k.target.closest?k.target.closest(d):null;if(x)for(const _ of g.handlers)try{_(k,x)}catch{}};g={eventType:a,selector:d,listener:m,handlers:new Set},this.I.set(h,g),this.m.addEventListener(a,m)}g.handlers.add(l)}tt(a,d,l){const h=`${a}::${d}`,g=this.I.get(h);if(g&&(g.handlers.delete(l),g.handlers.size===0)){try{this.m.removeEventListener(a,g.listener)}catch{}this.I.delete(h)}}}if(!customElements.get(e)){if(i&&typeof document<"u"){const p=`scope-${e}-styles`;if(!document.getElementById(p)){const a=document.createElement("style");a.id=p,a.textContent=i,document.head.appendChild(a)}}try{customElements.define(e,f)}catch(p){String(p?.message||p)}}return f}const Ht=()=>({name:"window",extend:e=>{const u=new Set,t=new Set,n=new Set,r=(i,o={})=>{if(typeof window>"u")return()=>{};const{immediate:s=!0}=o,c=f=>{i(window.innerWidth,window.innerHeight,f)};return window.addEventListener("resize",c),u.add(c),s&&c(new UIEvent("resize")),()=>{window.removeEventListener("resize",c),u.delete(c)}};return e.onDestroy(()=>{if(typeof window<"u"){for(const i of u)window.removeEventListener("resize",i);u.clear();for(const i of n)i.disconnect();n.clear();for(const i of t)window.removeEventListener("scroll",i);t.clear()}}),{onViewportResize:r,onWindowResize:(i,o={})=>{if(typeof window>"u")return()=>{};if(typeof ResizeObserver>"u")return r((p,a,d)=>i(p,a,d),o);const{immediate:s=!0}=o,c=document.documentElement,f=new ResizeObserver(p=>{const a=p[0];if(!a)return;const{width:d,height:l}=a.contentRect;i(d,l,a)});if(f.observe(c),n.add(f),s){const p=c.getBoundingClientRect();i(p.width,p.height,new UIEvent("resize"))}return()=>{f.disconnect(),n.delete(f)}},onWindowScroll:(i,o={})=>{if(typeof window>"u")return()=>{};const{immediate:s=!0}=o,c=f=>{i(window.scrollX,window.scrollY,f)};return window.addEventListener("scroll",c,{passive:!0}),t.add(c),s&&c(new Event("scroll")),()=>{window.removeEventListener("scroll",c),t.delete(c)}}}}}),xu=()=>({name:"timer",extend:e=>{const u=new Set,t=new Set,n=new Set,r={setTimeout:(i,o,...s)=>{let c;return c=setTimeout((...f)=>{u.delete(c),i(...f)},o,...s),u.add(c),c},setInterval:(i,o,...s)=>{const c=setInterval(i,o,...s);return t.add(c),c},raf:(i,o)=>{let s=0,c=!0,f=0;const p=typeof o=="number"&&o>0?1e3/o:0,a=d=>{if(n.delete(s),c){if(p){if(d-f>=p){const l=f?d-f:p;f=d,i(d,l)}}else{const l=f?d-f:0;f=d,i(d,l)}s=requestAnimationFrame(a),n.add(s)}};return s=requestAnimationFrame(a),n.add(s),()=>{c&&(c=!1,n.delete(s),cancelAnimationFrame(s))}}};return e.onDestroy(()=>{for(const i of u)clearTimeout(i);u.clear();for(const i of t)clearInterval(i);t.clear();for(const i of n)cancelAnimationFrame(i);n.clear()}),{timer:r}}}),vr=()=>({name:"mouse",extend:e=>{const u=new Map,t=(n,r)=>{if(typeof window>"u")return()=>{};const i=s=>{const c=s;r(c.clientX,c.clientY,c)};window.addEventListener(n,i);let o=u.get(n);return o||(o=new Set,u.set(n,o)),o.add(i),()=>{window.removeEventListener(n,i),o?.delete(i)}};return e.onDestroy(()=>{if(typeof window<"u"){for(const[n,r]of u){for(const i of r)window.removeEventListener(n,i);r.clear()}u.clear()}}),{onMouseMove:n=>t("mousemove",n),onMouseDown:n=>t("mousedown",n),onMouseUp:n=>t("mouseup",n),onMouseWheel:n=>(r=>{if(typeof window>"u")return()=>{};const i=s=>{const c=s;r(c.clientX,c.clientY,c.deltaY,c)};window.addEventListener("wheel",i);let o=u.get("wheel");return o||(o=new Set,u.set("wheel",o)),o.add(i),()=>{window.removeEventListener("wheel",i),o?.delete(i)}})(n)}}}),X=e=>Array.isArray(e),J=e=>e!=null&&typeof e=="object"&&!Array.isArray(e),De=e=>X(e)?e.slice():J(e)?{...e}:e,hu=(e,u)=>{if(X(e)&&X(u)){if(e.length!==u.length)return!1;for(let t=0;t<e.length;t+=1)if(!Object.is(e[t],u[t]))return!1;return!0}if(J(e)&&J(u)){const t=Object.keys(e),n=Object.keys(u);if(t.length!==n.length)return!1;for(const r of t)if(!(r in u)||!Object.is(e[r],u[r]))return!1;return!0}return!(X(e)||X(u)||J(e)||J(u))&&Object.is(e,u)},Ve=(e,u)=>Array.from({length:u},()=>e),Ke=(e,u)=>u.reduce((t,n)=>(t[n]=e,t),{}),Zt=({from:e,to:u,velocity:t,label:n})=>{const r={value:e,target:u,velocity:t,arrayLength:null,objectKeys:null,normalizeInput:p=>p},i=p=>{if(r.arrayLength==null){if(r.objectKeys!=null)throw new Error(`${n} value shape mismatch (array vs object).`);r.arrayLength=p,X(r.value)||(r.value=Ve(r.value,p)),X(r.target)||(r.target=Ve(r.target,p)),r.velocity===void 0||X(r.velocity)||(r.velocity=Ve(r.velocity,p))}},o=p=>{if(r.objectKeys==null){if(r.arrayLength!=null)throw new Error(`${n} value shape mismatch (object vs array).`);r.objectKeys=p,J(r.value)||(r.value=Ke(r.value,p)),J(r.target)||(r.target=Ke(r.target,p)),r.velocity===void 0||J(r.velocity)||(r.velocity=Ke(r.velocity,p))}},s=p=>{if(X(p)){if(r.objectKeys!=null)throw new Error(`${n} value shape mismatch (array vs object).`);if(r.arrayLength==null&&i(p.length),p.length!==r.arrayLength)throw new Error(`${n} value length mismatch (expected ${r.arrayLength}, got ${p.length}).`);return p.slice()}if(J(p)){if(r.arrayLength!=null)throw new Error(`${n} value shape mismatch (object vs array).`);const a=Object.keys(p);if(r.objectKeys==null&&o(a),r.objectKeys&&a.length!==r.objectKeys.length)throw new Error(`${n} value keys mismatch (expected ${r.objectKeys.length}, got ${a.length}).`);if(r.objectKeys){for(const d of r.objectKeys)if(!(d in p))throw new Error(`${n} value keys mismatch (missing key "${d}").`)}return{...p}}return r.arrayLength!=null?Ve(p,r.arrayLength):r.objectKeys!=null?Ke(p,r.objectKeys):p};r.normalizeInput=s;const c=X(e)||X(u)||t!==void 0&&X(t),f=J(e)||J(u)||t!==void 0&&J(t);if(c&&f)throw new Error(`${n} value shape mismatch (array vs object).`);if(c){const p=X(e)?e.length:X(u)?u.length:t.length;i(p),r.value=s(e),r.target=s(u),r.velocity!==void 0&&(r.velocity=s(r.velocity))}else if(f){const p=J(e)?Object.keys(e):J(u)?Object.keys(u):Object.keys(t);o(p),r.value=s(e),r.target=s(u),r.velocity!==void 0&&(r.velocity=s(r.velocity))}return r};let Te={x:-1,y:-1};const xt={stiffness:300,damping:30,mass:1},Gt=()=>({name:"pointer",extend:e=>{const{onMouseMove:u}=vr().extend(e,e.host),{timer:t}=xu().extend(e,e.host);Te.x=window.innerWidth/2,Te.y=window.innerHeight/2;const n={x:$u({from:Te.x,to:Te.x,...xt}),y:$u({from:Te.y,to:Te.y,...xt})};return u((r,i)=>{n.x.setTarget(r),n.y.setTarget(i)}),{onPointerMove:r=>{let i=Te.x,o=Te.y;t.raf(s=>{const c=n.x.next(s),f=n.y.next(s);var p,a;i===c&&o===f||(r({x:c,y:f,v:(p={x:c,y:f},a={x:i,y:o},{x:p.x-a.x,y:p.y-a.y,magnitude:Math.sqrt((p.x-a.x)*(p.x-a.x)+(p.y-a.y)*(p.y-a.y))}).magnitude}),i=c,o=f)})},onMouseMove:u}}}),Cr=()=>({name:"lerp",extend:e=>{const{timer:u}=xu().extend(e,e.host),t=new Set;return e.onDestroy(()=>{for(const n of t)n();t.clear()}),{createLerp:n=>(function({from:r=0,to:i=1,lerp:o=.1,tolerance:s=.001,resumeOnTarget:c=!0}={}){function f(){return De(l)}function p(x){if(m)return f();const _=(A=>A<0?0:A>1?1:A)(o);if(_===0)return f();if(_===1)return l=De(h),a.value=l,m=!0,f();const y=x>0?1-Math.pow(1-_,60*x):0;if(X(l)&&X(h)){let A=!0;for(let v=0;v<l.length;v+=1)l[v]+=(h[v]-l[v])*y,Math.abs(h[v]-l[v])>=s&&(A=!1);if(A){for(let v=0;v<l.length;v+=1)l[v]=h[v];m=!0}return a.value=l,De(l)}if(J(l)&&J(h)){const A=a.objectKeys??Object.keys(l);let v=!0;for(const F of A)l[F]+=(h[F]-l[F])*y,Math.abs(h[F]-l[F])>=s&&(v=!1);if(v){for(const F of A)l[F]=h[F];m=!0}return a.value=l,De(l)}const C=h;return l+=(C-l)*y,a.value=l,Math.abs(C-l)<s&&(l=C,a.value=l,m=!0),l}const a=Zt({from:r,to:i,label:"Lerp"}),d=a.normalizeInput;let l=a.value,h=a.target,g=null,m=!1;const k=new Set;return{setTarget:function(x){const _=d(x),y=!hu(_,h);if(h=_,a.target=_,l=a.value,c&&m&&y){m=!1,g=null;for(const C of k)C(h)}},setValue:function(x,_={}){const{resetTime:y=!0,setTarget:C=!1,markDone:A=!1}=_;l=d(x),a.value=l,C&&(h=De(l),a.target=h);const v=m||!hu(l,h);if(y&&(g=null),A&&(m=!0),v&&!A){m=!1,g=null;for(const F of k)F(h)}},getValue:f,isDone:function(){return m},onResume:function(x){return k.add(x),()=>{k.delete(x)}},step:p,next:function(x=performance.now()){if(g==null)return g=x,f();const _=(x-g)/1e3;g=x;const y=1/30;let C=_,A=f();for(;C>0&&!m;){const v=Math.min(C,y);A=p(v),C-=v}return A}}})(n),runLerp:(n,r,i={})=>{const{fps:o,immediate:s=!0,stopWhenDone:c=!0}=i;let f=!1,p=null;s&&r(n.getValue(),n);const a=()=>{p||(p=u.raf(g=>{if(f)return;const m=n.next(g);r(m,n),c&&n.isDone()&&d()},o))},d=()=>{p&&(p(),p=null)};a();const l=n.onResume(()=>{!f&&c&&(s&&r(n.getValue(),n),a())}),h=()=>{f||(f=!0,l(),d(),t.delete(h))};return t.add(h),h}}}}),ju=()=>({name:"spring",extend:e=>{const{timer:u}=xu().extend(e,e.host),t=new Set;return e.onDestroy(()=>{for(const n of t)n();t.clear()}),{createSpring:n=>$u(n),runSpring:(n,r,i={})=>{const{fps:o,immediate:s=!0,stopWhenDone:c=!0}=i;let f=!1,p=null;s&&r(n.getValue(),n);const a=()=>{p||(p=u.raf(g=>{if(f)return;const m=n.next(g);r(m,n),c&&n.isDone()&&d()},o))},d=()=>{p&&(p(),p=null)};a();const l=n.onResume(()=>{!f&&c&&(s&&r(n.getValue(),n),a())}),h=()=>{f||(f=!0,l(),d(),t.delete(h))};return t.add(h),h}}}}),Hu="0.0.8-beta.22",Ar=()=>{console.info("The website is using @petit-kit/scoped v"+Hu,`
https://github.com/petit-kit/scoped`)},wr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},_t=e=>e==null||e===""?"":String(e).replace(/[&<>"']/g,u=>wr[u]),Dr="bind:",Sr=new Set(["checked","disabled","readonly","required","selected","autofocus","multiple","hidden"]),Fr=/bind:([a-zA-Z_$][\w$]*)="([^"]*)"/g,Ye=(e,u,t)=>Math.max(e,Math.min(u,t)),Tr=(e,u)=>{let t;return(...n)=>{clearTimeout(t),t=setTimeout(()=>e(...n),u)}};ye("c-slider",{props:{value:{type:Number,default:0},min:{type:Number,default:0},max:{type:Number,default:360},step:{type:Number,default:1}}},({actions:e,host:u,props:t,link:n})=>(n("value","value"),e.handleChange=r=>u.updateState({value:r.target.valueAsNumber}),e.handleKnobChange=r=>u.updateState({value:Math.round(Ye(t.min,r.detail.value,t.max))}),()=>`
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
    `));ye("c-rolling-number",{props:{value:{type:Number,default:0},min:{type:Number,default:0},max:{type:Number,default:360},step:{type:Number,default:5}},plugins:[ju()]},({computed:e,props:u,onPropsChanged:t,refs:n,createSpring:r,runSpring:i,host:o})=>{const s=r({from:u.max-u.value,to:u.max-u.value,stiffness:300,damping:30,mass:.5});t(()=>s.setTarget(u.max-u.value));const c=e(()=>Array.from({length:u.max-u.min+1},(f,p)=>u.min+p));return i(s,f=>{const p=n.container;p&&(p.style.transform=`translate3d(0, ${-f*36}px, 0)`);const a=o.$('[ref="number"]');if(a){a.forEach(l=>l.style.opacity="0.5");const d=Ye(0,Math.round(f),1/0);a[d]&&(a[d].style.opacity="1")}}),()=>`
      <div class="overflow-hidden h-[80px] pt-[20px] roll-mask">
        <div ref="container">
          ${c().reverse().map(f=>`
                <div
                  ref="number"
                  class=" 
                    text-[40px] font-bold! w-[4ch] text-center h-[36px] leading-[36px]
                    roll-mask-item transition-opacity duration-50
                  "
                >
                  ${f}
                </div>
              `).join("")}
        </div>
      </div>
    `});ye("c-knob",{props:{value:{type:Number,default:0}},plugins:[ju()]},({props:e,state:u,onPropsChanged:t,createSpring:n,runSpring:r,host:i,effect:o,actions:s,emit:c})=>{u.active=!1,u.style=`transform: rotate(${e.value}deg)`;const f=n({from:e.value,to:e.value,stiffness:200});r(f,d=>i.updateState({style:`transform: rotate(${180+d}deg)`})),t(()=>f.setTarget(e.value));let p=0;o(()=>{const d=l=>{if(l.preventDefault(),l.stopPropagation(),!u.active)return;const h=i.getBoundingClientRect(),g=(l.y-(h.top+h.height/2))/h.height;c("change",{value:e.value+(g-p)/2*360}),p=g};return window.addEventListener("pointermove",d),()=>window.removeEventListener("pointermove",d)},[u.active]);const a=(d,l)=>{document.body.style.cursor=d,document.body.style.userSelect=l};return s.handlePointerDown=d=>{d.preventDefault(),d.stopPropagation(),i.updateState({active:!0}),a("grabbing","none");const l=()=>{p=0,i.updateState({active:!1}),a("default","auto")};return window.addEventListener("pointerup",l),()=>window.removeEventListener("pointerup",l)},()=>`
      <div
        class="w-20 h-20 bg-[#0048f2] rounded-full flex items-center justify-center"
        bind:style="style"
        on:pointerdown="handlePointerDown"
      >
        <div
          class="w-[3px] h-[25px] bg-white rounded-full mt-[-40px] shadow-md"
        ></div>
      </div>
    `});ye("c-tooltip",{props:{value:{type:Number,default:0},min:{type:Number,default:0},max:{type:Number,default:360}},plugins:[ju()]},({props:e,state:u,onPropsChanged:t,refs:n,host:r,createSpring:i,runSpring:o})=>{u.value=e.value,r.style.position="relative",r.style.width="100%";const s=i({from:e.value,to:e.value,stiffness:300,damping:30,mass:.5}),c=i({from:0,to:0,stiffness:500,damping:20,mass:10});let f=0,p=e.value;const a=Tr(()=>{c.setTarget(0)},50),d=l=>{const h=(e.value-e.min)/(e.max-e.min),g=n.tooltip;g&&(g.style.left=`${h*100}%`)};return t(()=>{d(e.value),s.setTarget(e.value),f=e.value-p,c.setTarget(f),p=e.value,a()}),o(c,l=>{const h=n.tooltip;h&&(h.style.transform=`rotate(${l}deg)`)}),o(s,l=>{r.updateState({value:Math.round(Ye(e.min,l,e.max))})}),()=>`
      <div class="relative w-[calc(100%-20px)] ml-[10px] h-4 -mt-[25px]">
        <div
          ref="tooltip"
          class="absolute top-0 left-0 text-center bg-[#0048f2] translate-x-[-50%] w-[50px] px-6 py-1 flex items-center justify-center rounded-md shadow-md"
          style="transform-origin: center -26px;"
        >
          <div
            class="absolute w-[15px] h-[10px] left-1/2 top-0 -translate-x-1/2 [aspect-ratio:1/cos(30deg)] [clip-path:polygon(50%_0,100%_100%,0_100%)] bg-[#0048f2] -translate-y-full "
          ></div>
          <span class="font-bold text-white" bind:text="value"></span>
        </div>
      </div>
    `});const Mu="h-[800px]";ye("c-tabs",{props:{tabs:{type:Array,default:[]}}},({props:e,state:u,actions:t,host:n})=>(u.activeTab=0,t.handleTabClick=r=>{const i=r.target.dataset.index;n.setState({activeTab:parseInt(i||"0")})},()=>`
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
${Pe.highlight(e.tabs[u.activeTab].content,{language:e.tabs[u.activeTab].language||"typescript"}).value}
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
      const percent = (props.value - props.min) / (props.max - props.min);
      const tooltip = refs.tooltip as HTMLElement;
      if (tooltip) tooltip.style.left = \`\${percent * 100}%\`;
    };

    onPropsChanged(() => {
      move(props.value);
      value.setTarget(props.value);

      const diff: number = props.value - lastValue;
      targetRotation = diff;
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
            class="absolute w-[15px] h-[10px] left-1/2 top-0 -translate-x-1/2 [aspect-ratio:1/cos(30deg)] [clip-path:polygon(50%_0,100%_100%,0_100%)] bg-[#0048f2] -translate-y-full "
          ></div>
          <span class="font-bold text-white" bind:text="value"></span>
        </div>
      </div>
    \`;
  }
);
`;ye("c-example-slider",{},({onMount:e,refs:u})=>(e(()=>{u.tabs.setProps({tabs:[{title:"Output",type:"output",content:`
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
  `));const Nr=`**Scoped** is a lightweight library designed to simplify the creation of web components.

Its main idea is to provide a minimal, framework-agnostic layer over the Custom Elements API, letting you build encapsulated, reusable UI components using a concise template syntax, reactive state, and straightforward binding mechanisms. With built-in lifecycle hooks and an extensible plugin system, Scoped empowers developers to efficiently build modern, reactive interfaces.

It encourages expressiveness and rapid prototyping, giving you fine-grained control and flexibility over your components without the overhead and complexity of traditional frameworks. Scoped lets you stay close to the platform while benefiting from reactivity, simple data flow, and composable patterns for creative and productive development.
`,Rr=`# Installation

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
`,zr="## Computed\n\nComputed values are memoized values used to derive data from state or props and automatically update when their dependencies change.\n\n```typescript\n({ computed }) => {\n  const fullName = computed(\n    () => `${state.firstName} ${state.lastName}`, // getter\n    () => [state.firstName, state.lastName] // dependencies\n  );\n  return () => `<p>Name: ${fullName()}</p>`;\n};\n```\n",qr=`## Custom events

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
`,Ur=`## Event Delegation

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

${Nr}`},{title:"Installation",slug:"installation",content:Rr},{title:"Getting started",slug:"getting-started",content:Or,examples:"<c-example-slider></c-example-slider>",children:[{title:"Component options",slug:"component-options",content:Ir},{title:"Setup function",slug:"setup-function",content:Lr},{title:"Templating",slug:"templating",content:Br},{title:"State & Props",slug:"state-and-props",content:Pr},{title:"Effects",slug:"effects",content:$r},{title:"Computed",slug:"computed",content:zr},{title:"Custom events",slug:"custom-events",content:qr},{title:"Event delegation",slug:"event-delegation",content:Ur},{title:"Slots",slug:"slots",content:jr},{title:"Lifecycle",slug:"lifecycle",content:Hr},{title:"Select",slug:"select",content:Zr}]},{title:"Plugins",slug:"plugins",content:Gr},{title:"Happy",slug:"happy",content:Wr},{title:"",slug:"license",content:`
      
      <div class="text-center">
        build with 💖 by <a class="font-bold" href="https://github.com/petitssoldats" target="_blank">petitssoldats</a> with <a class="font-bold" href="https://github.com/petit-kit/scoped" target="_blank">@petit-kit/scoped@${Hu}</a>
      </div>
      <br />
      <br />
      <br />
    `}];ye("c-table-content",{plugins:[Ht()]},({onWindowScroll:e})=>(e(()=>{try{const u=document.querySelectorAll("div.content");if(!u.length)return;const t=Array.from(u).reduce((o,s)=>{const c=s.getBoundingClientRect();return c.top<=window.innerHeight*.3&&c.bottom>=0?s:o},Array.from(u)[0]);document.querySelectorAll("a.link").forEach(o=>{o.classList.remove("nav-active")});const r=`a[id="${t.id+"-link"}"`;document.querySelector(r)?.classList.add("nav-active")}catch(u){console.log(u)}}),()=>`
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
    `));const yt={};function Vr(e){let u=yt[e];if(u)return u;u=yt[e]=[];for(let t=0;t<128;t++){const n=String.fromCharCode(t);u.push(n)}for(let t=0;t<e.length;t++){const n=e.charCodeAt(t);u[n]="%"+("0"+n.toString(16).toUpperCase()).slice(-2)}return u}function je(e,u){typeof u!="string"&&(u=je.defaultChars);const t=Vr(u);return e.replace(/(%[a-f0-9]{2})+/gi,function(n){let r="";for(let i=0,o=n.length;i<o;i+=3){const s=parseInt(n.slice(i+1,i+3),16);if(s<128){r+=t[s];continue}if((s&224)===192&&i+3<o){const c=parseInt(n.slice(i+4,i+6),16);if((c&192)===128){const f=s<<6&1984|c&63;f<128?r+="��":r+=String.fromCharCode(f),i+=3;continue}}if((s&240)===224&&i+6<o){const c=parseInt(n.slice(i+4,i+6),16),f=parseInt(n.slice(i+7,i+9),16);if((c&192)===128&&(f&192)===128){const p=s<<12&61440|c<<6&4032|f&63;p<2048||p>=55296&&p<=57343?r+="���":r+=String.fromCharCode(p),i+=6;continue}}if((s&248)===240&&i+9<o){const c=parseInt(n.slice(i+4,i+6),16),f=parseInt(n.slice(i+7,i+9),16),p=parseInt(n.slice(i+10,i+12),16);if((c&192)===128&&(f&192)===128&&(p&192)===128){let a=s<<18&1835008|c<<12&258048|f<<6&4032|p&63;a<65536||a>1114111?r+="����":(a-=65536,r+=String.fromCharCode(55296+(a>>10),56320+(a&1023))),i+=9;continue}}r+="�"}return r})}je.defaultChars=";/?:@&=+$,#";je.componentChars="";const Et={};function Kr(e){let u=Et[e];if(u)return u;u=Et[e]=[];for(let t=0;t<128;t++){const n=String.fromCharCode(t);/^[0-9a-z]$/i.test(n)?u.push(n):u.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<e.length;t++)u[e.charCodeAt(t)]=e[t];return u}function uu(e,u,t){typeof u!="string"&&(t=u,u=uu.defaultChars),typeof t>"u"&&(t=!0);const n=Kr(u);let r="";for(let i=0,o=e.length;i<o;i++){const s=e.charCodeAt(i);if(t&&s===37&&i+2<o&&/^[0-9a-f]{2}$/i.test(e.slice(i+1,i+3))){r+=e.slice(i,i+3),i+=2;continue}if(s<128){r+=n[s];continue}if(s>=55296&&s<=57343){if(s>=55296&&s<=56319&&i+1<o){const c=e.charCodeAt(i+1);if(c>=56320&&c<=57343){r+=encodeURIComponent(e[i]+e[i+1]),i++;continue}}r+="%EF%BF%BD";continue}r+=encodeURIComponent(e[i])}return r}uu.defaultChars=";/?:@&=+$,-_.!~*'()#";uu.componentChars="-_.!~*'()";function Zu(e){let u="";return u+=e.protocol||"",u+=e.slashes?"//":"",u+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?u+="["+e.hostname+"]":u+=e.hostname||"",u+=e.port?":"+e.port:"",u+=e.pathname||"",u+=e.search||"",u+=e.hash||"",u}function pu(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const Yr=/^([a-z0-9.+-]+:)/i,Xr=/:[0-9]*$/,Jr=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,Qr=["<",">",'"',"`"," ","\r",`
`,"	"],e0=["{","}","|","\\","^","`"].concat(Qr),u0=["'"].concat(e0),kt=["%","/","?",";","#"].concat(u0),vt=["/","?","#"],t0=255,Ct=/^[+a-z0-9A-Z_-]{0,63}$/,n0=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,At={javascript:!0,"javascript:":!0},wt={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Gu(e,u){if(e&&e instanceof pu)return e;const t=new pu;return t.parse(e,u),t}pu.prototype.parse=function(e,u){let t,n,r,i=e;if(i=i.trim(),!u&&e.split("#").length===1){const f=Jr.exec(i);if(f)return this.pathname=f[1],f[2]&&(this.search=f[2]),this}let o=Yr.exec(i);if(o&&(o=o[0],t=o.toLowerCase(),this.protocol=o,i=i.substr(o.length)),(u||o||i.match(/^\/\/[^@\/]+@[^@\/]+/))&&(r=i.substr(0,2)==="//",r&&!(o&&At[o])&&(i=i.substr(2),this.slashes=!0)),!At[o]&&(r||o&&!wt[o])){let f=-1;for(let h=0;h<vt.length;h++)n=i.indexOf(vt[h]),n!==-1&&(f===-1||n<f)&&(f=n);let p,a;f===-1?a=i.lastIndexOf("@"):a=i.lastIndexOf("@",f),a!==-1&&(p=i.slice(0,a),i=i.slice(a+1),this.auth=p),f=-1;for(let h=0;h<kt.length;h++)n=i.indexOf(kt[h]),n!==-1&&(f===-1||n<f)&&(f=n);f===-1&&(f=i.length),i[f-1]===":"&&f--;const d=i.slice(0,f);i=i.slice(f),this.parseHost(d),this.hostname=this.hostname||"";const l=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!l){const h=this.hostname.split(/\./);for(let g=0,m=h.length;g<m;g++){const k=h[g];if(k&&!k.match(Ct)){let x="";for(let _=0,y=k.length;_<y;_++)k.charCodeAt(_)>127?x+="x":x+=k[_];if(!x.match(Ct)){const _=h.slice(0,g),y=h.slice(g+1),C=k.match(n0);C&&(_.push(C[1]),y.unshift(C[2])),y.length&&(i=y.join(".")+i),this.hostname=_.join(".");break}}}}this.hostname.length>t0&&(this.hostname=""),l&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const s=i.indexOf("#");s!==-1&&(this.hash=i.substr(s),i=i.slice(0,s));const c=i.indexOf("?");return c!==-1&&(this.search=i.substr(c),i=i.slice(0,c)),i&&(this.pathname=i),wt[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this};pu.prototype.parseHost=function(e){let u=Xr.exec(e);u&&(u=u[0],u!==":"&&(this.port=u.substr(1)),e=e.substr(0,e.length-u.length)),e&&(this.hostname=e)};const r0=Object.freeze(Object.defineProperty({__proto__:null,decode:je,encode:uu,format:Zu,parse:Gu},Symbol.toStringTag,{value:"Module"})),Vt=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Kt=/[\0-\x1F\x7F-\x9F]/,i0=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Wu=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,Yt=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Xt=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,s0=Object.freeze(Object.defineProperty({__proto__:null,Any:Vt,Cc:Kt,Cf:i0,P:Wu,S:Yt,Z:Xt},Symbol.toStringTag,{value:"Module"})),o0=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),c0=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var Nu;const a0=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),l0=(Nu=String.fromCodePoint)!==null&&Nu!==void 0?Nu:function(e){let u="";return e>65535&&(e-=65536,u+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),u+=String.fromCharCode(e),u};function f0(e){var u;return e>=55296&&e<=57343||e>1114111?65533:(u=a0.get(e))!==null&&u!==void 0?u:e}var ue;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(ue||(ue={}));const d0=32;var Re;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(Re||(Re={}));function zu(e){return e>=ue.ZERO&&e<=ue.NINE}function h0(e){return e>=ue.UPPER_A&&e<=ue.UPPER_F||e>=ue.LOWER_A&&e<=ue.LOWER_F}function p0(e){return e>=ue.UPPER_A&&e<=ue.UPPER_Z||e>=ue.LOWER_A&&e<=ue.LOWER_Z||zu(e)}function b0(e){return e===ue.EQUALS||p0(e)}var ee;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(ee||(ee={}));var Ne;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(Ne||(Ne={}));class g0{constructor(u,t,n){this.decodeTree=u,this.emitCodePoint=t,this.errors=n,this.state=ee.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=Ne.Strict}startEntity(u){this.decodeMode=u,this.state=ee.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(u,t){switch(this.state){case ee.EntityStart:return u.charCodeAt(t)===ue.NUM?(this.state=ee.NumericStart,this.consumed+=1,this.stateNumericStart(u,t+1)):(this.state=ee.NamedEntity,this.stateNamedEntity(u,t));case ee.NumericStart:return this.stateNumericStart(u,t);case ee.NumericDecimal:return this.stateNumericDecimal(u,t);case ee.NumericHex:return this.stateNumericHex(u,t);case ee.NamedEntity:return this.stateNamedEntity(u,t)}}stateNumericStart(u,t){return t>=u.length?-1:(u.charCodeAt(t)|d0)===ue.LOWER_X?(this.state=ee.NumericHex,this.consumed+=1,this.stateNumericHex(u,t+1)):(this.state=ee.NumericDecimal,this.stateNumericDecimal(u,t))}addToNumericResult(u,t,n,r){if(t!==n){const i=n-t;this.result=this.result*Math.pow(r,i)+parseInt(u.substr(t,i),r),this.consumed+=i}}stateNumericHex(u,t){const n=t;for(;t<u.length;){const r=u.charCodeAt(t);if(zu(r)||h0(r))t+=1;else return this.addToNumericResult(u,n,t,16),this.emitNumericEntity(r,3)}return this.addToNumericResult(u,n,t,16),-1}stateNumericDecimal(u,t){const n=t;for(;t<u.length;){const r=u.charCodeAt(t);if(zu(r))t+=1;else return this.addToNumericResult(u,n,t,10),this.emitNumericEntity(r,2)}return this.addToNumericResult(u,n,t,10),-1}emitNumericEntity(u,t){var n;if(this.consumed<=t)return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(u===ue.SEMI)this.consumed+=1;else if(this.decodeMode===Ne.Strict)return 0;return this.emitCodePoint(f0(this.result),this.consumed),this.errors&&(u!==ue.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(u,t){const{decodeTree:n}=this;let r=n[this.treeIndex],i=(r&Re.VALUE_LENGTH)>>14;for(;t<u.length;t++,this.excess++){const o=u.charCodeAt(t);if(this.treeIndex=m0(n,r,this.treeIndex+Math.max(1,i),o),this.treeIndex<0)return this.result===0||this.decodeMode===Ne.Attribute&&(i===0||b0(o))?0:this.emitNotTerminatedNamedEntity();if(r=n[this.treeIndex],i=(r&Re.VALUE_LENGTH)>>14,i!==0){if(o===ue.SEMI)return this.emitNamedEntityData(this.treeIndex,i,this.consumed+this.excess);this.decodeMode!==Ne.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var u;const{result:t,decodeTree:n}=this,r=(n[t]&Re.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,r,this.consumed),(u=this.errors)===null||u===void 0||u.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(u,t,n){const{decodeTree:r}=this;return this.emitCodePoint(t===1?r[u]&~Re.VALUE_LENGTH:r[u+1],n),t===3&&this.emitCodePoint(r[u+2],n),n}end(){var u;switch(this.state){case ee.NamedEntity:return this.result!==0&&(this.decodeMode!==Ne.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case ee.NumericDecimal:return this.emitNumericEntity(0,2);case ee.NumericHex:return this.emitNumericEntity(0,3);case ee.NumericStart:return(u=this.errors)===null||u===void 0||u.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case ee.EntityStart:return 0}}}function Jt(e){let u="";const t=new g0(e,n=>u+=l0(n));return function(r,i){let o=0,s=0;for(;(s=r.indexOf("&",s))>=0;){u+=r.slice(o,s),t.startEntity(i);const f=t.write(r,s+1);if(f<0){o=s+t.end();break}o=s+f,s=f===0?o+1:o}const c=u+r.slice(o);return u="",c}}function m0(e,u,t,n){const r=(u&Re.BRANCH_LENGTH)>>7,i=u&Re.JUMP_TABLE;if(r===0)return i!==0&&n===i?t:-1;if(i){const c=n-i;return c<0||c>=r?-1:e[t+c]-1}let o=t,s=o+r-1;for(;o<=s;){const c=o+s>>>1,f=e[c];if(f<n)o=c+1;else if(f>n)s=c-1;else return e[c+r]}return-1}const x0=Jt(o0);Jt(c0);function Qt(e,u=Ne.Legacy){return x0(e,u)}function _0(e){return Object.prototype.toString.call(e)}function Vu(e){return _0(e)==="[object String]"}const y0=Object.prototype.hasOwnProperty;function E0(e,u){return y0.call(e,u)}function _u(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if(typeof t!="object")throw new TypeError(t+"must be object");Object.keys(t).forEach(function(n){e[n]=t[n]})}}),e}function en(e,u,t){return[].concat(e.slice(0,u),t,e.slice(u+1))}function Ku(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function bu(e){if(e>65535){e-=65536;const u=55296+(e>>10),t=56320+(e&1023);return String.fromCharCode(u,t)}return String.fromCharCode(e)}const un=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,k0=/&([a-z#][a-z0-9]{1,31});/gi,v0=new RegExp(un.source+"|"+k0.source,"gi"),C0=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function A0(e,u){if(u.charCodeAt(0)===35&&C0.test(u)){const n=u[1].toLowerCase()==="x"?parseInt(u.slice(2),16):parseInt(u.slice(1),10);return Ku(n)?bu(n):e}const t=Qt(e);return t!==e?t:e}function w0(e){return e.indexOf("\\")<0?e:e.replace(un,"$1")}function He(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(v0,function(u,t,n){return t||A0(u,n)})}const D0=/[&<>"]/,S0=/[&<>"]/g,F0={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function T0(e){return F0[e]}function Oe(e){return D0.test(e)?e.replace(S0,T0):e}const M0=/[.?*+^$[\]\\(){}|-]/g;function N0(e){return e.replace(M0,"\\$&")}function Z(e){switch(e){case 9:case 32:return!0}return!1}function Xe(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function Je(e){return Wu.test(e)||Yt.test(e)}function Qe(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function yu(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}const R0={mdurl:r0,ucmicro:s0},O0=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:en,assign:_u,escapeHtml:Oe,escapeRE:N0,fromCodePoint:bu,has:E0,isMdAsciiPunct:Qe,isPunctChar:Je,isSpace:Z,isString:Vu,isValidEntityCode:Ku,isWhiteSpace:Xe,lib:R0,normalizeReference:yu,unescapeAll:He,unescapeMd:w0},Symbol.toStringTag,{value:"Module"}));function I0(e,u,t){let n,r,i,o;const s=e.posMax,c=e.pos;for(e.pos=u+1,n=1;e.pos<s;){if(i=e.src.charCodeAt(e.pos),i===93&&(n--,n===0)){r=!0;break}if(o=e.pos,e.md.inline.skipToken(e),i===91){if(o===e.pos-1)n++;else if(t)return e.pos=c,-1}}let f=-1;return r&&(f=e.pos),e.pos=c,f}function L0(e,u,t){let n,r=u;const i={ok:!1,pos:0,str:""};if(e.charCodeAt(r)===60){for(r++;r<t;){if(n=e.charCodeAt(r),n===10||n===60)return i;if(n===62)return i.pos=r+1,i.str=He(e.slice(u+1,r)),i.ok=!0,i;if(n===92&&r+1<t){r+=2;continue}r++}return i}let o=0;for(;r<t&&(n=e.charCodeAt(r),!(n===32||n<32||n===127));){if(n===92&&r+1<t){if(e.charCodeAt(r+1)===32)break;r+=2;continue}if(n===40&&(o++,o>32))return i;if(n===41){if(o===0)break;o--}r++}return u===r||o!==0||(i.str=He(e.slice(u,r)),i.pos=r,i.ok=!0),i}function B0(e,u,t,n){let r,i=u;const o={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(n)o.str=n.str,o.marker=n.marker;else{if(i>=t)return o;let s=e.charCodeAt(i);if(s!==34&&s!==39&&s!==40)return o;u++,i++,s===40&&(s=41),o.marker=s}for(;i<t;){if(r=e.charCodeAt(i),r===o.marker)return o.pos=i+1,o.str+=He(e.slice(u,i)),o.ok=!0,o;if(r===40&&o.marker===41)return o;r===92&&i+1<t&&i++,i++}return o.can_continue=!0,o.str+=He(e.slice(u,i)),o}const P0=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:L0,parseLinkLabel:I0,parseLinkTitle:B0},Symbol.toStringTag,{value:"Module"})),Ee={};Ee.code_inline=function(e,u,t,n,r){const i=e[u];return"<code"+r.renderAttrs(i)+">"+Oe(i.content)+"</code>"};Ee.code_block=function(e,u,t,n,r){const i=e[u];return"<pre"+r.renderAttrs(i)+"><code>"+Oe(e[u].content)+`</code></pre>
`};Ee.fence=function(e,u,t,n,r){const i=e[u],o=i.info?He(i.info).trim():"";let s="",c="";if(o){const p=o.split(/(\s+)/g);s=p[0],c=p.slice(2).join("")}let f;if(t.highlight?f=t.highlight(i.content,s,c)||Oe(i.content):f=Oe(i.content),f.indexOf("<pre")===0)return f+`
`;if(o){const p=i.attrIndex("class"),a=i.attrs?i.attrs.slice():[];p<0?a.push(["class",t.langPrefix+s]):(a[p]=a[p].slice(),a[p][1]+=" "+t.langPrefix+s);const d={attrs:a};return`<pre><code${r.renderAttrs(d)}>${f}</code></pre>
`}return`<pre><code${r.renderAttrs(i)}>${f}</code></pre>
`};Ee.image=function(e,u,t,n,r){const i=e[u];return i.attrs[i.attrIndex("alt")][1]=r.renderInlineAsText(i.children,t,n),r.renderToken(e,u,t)};Ee.hardbreak=function(e,u,t){return t.xhtmlOut?`<br />
`:`<br>
`};Ee.softbreak=function(e,u,t){return t.breaks?t.xhtmlOut?`<br />
`:`<br>
`:`
`};Ee.text=function(e,u){return Oe(e[u].content)};Ee.html_block=function(e,u){return e[u].content};Ee.html_inline=function(e,u){return e[u].content};function Ze(){this.rules=_u({},Ee)}Ze.prototype.renderAttrs=function(u){let t,n,r;if(!u.attrs)return"";for(r="",t=0,n=u.attrs.length;t<n;t++)r+=" "+Oe(u.attrs[t][0])+'="'+Oe(u.attrs[t][1])+'"';return r};Ze.prototype.renderToken=function(u,t,n){const r=u[t];let i="";if(r.hidden)return"";r.block&&r.nesting!==-1&&t&&u[t-1].hidden&&(i+=`
`),i+=(r.nesting===-1?"</":"<")+r.tag,i+=this.renderAttrs(r),r.nesting===0&&n.xhtmlOut&&(i+=" /");let o=!1;if(r.block&&(o=!0,r.nesting===1&&t+1<u.length)){const s=u[t+1];(s.type==="inline"||s.hidden||s.nesting===-1&&s.tag===r.tag)&&(o=!1)}return i+=o?`>
`:">",i};Ze.prototype.renderInline=function(e,u,t){let n="";const r=this.rules;for(let i=0,o=e.length;i<o;i++){const s=e[i].type;typeof r[s]<"u"?n+=r[s](e,i,u,t,this):n+=this.renderToken(e,i,u)}return n};Ze.prototype.renderInlineAsText=function(e,u,t){let n="";for(let r=0,i=e.length;r<i;r++)switch(e[r].type){case"text":n+=e[r].content;break;case"image":n+=this.renderInlineAsText(e[r].children,u,t);break;case"html_inline":case"html_block":n+=e[r].content;break;case"softbreak":case"hardbreak":n+=`
`;break}return n};Ze.prototype.render=function(e,u,t){let n="";const r=this.rules;for(let i=0,o=e.length;i<o;i++){const s=e[i].type;s==="inline"?n+=this.renderInline(e[i].children,u,t):typeof r[s]<"u"?n+=r[s](e,i,u,t,this):n+=this.renderToken(e,i,u,t)}return n};function ie(){this.__rules__=[],this.__cache__=null}ie.prototype.__find__=function(e){for(let u=0;u<this.__rules__.length;u++)if(this.__rules__[u].name===e)return u;return-1};ie.prototype.__compile__=function(){const e=this,u=[""];e.__rules__.forEach(function(t){t.enabled&&t.alt.forEach(function(n){u.indexOf(n)<0&&u.push(n)})}),e.__cache__={},u.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(n){n.enabled&&(t&&n.alt.indexOf(t)<0||e.__cache__[t].push(n.fn))})})};ie.prototype.at=function(e,u,t){const n=this.__find__(e),r=t||{};if(n===-1)throw new Error("Parser rule not found: "+e);this.__rules__[n].fn=u,this.__rules__[n].alt=r.alt||[],this.__cache__=null};ie.prototype.before=function(e,u,t,n){const r=this.__find__(e),i=n||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r,0,{name:u,enabled:!0,fn:t,alt:i.alt||[]}),this.__cache__=null};ie.prototype.after=function(e,u,t,n){const r=this.__find__(e),i=n||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r+1,0,{name:u,enabled:!0,fn:t,alt:i.alt||[]}),this.__cache__=null};ie.prototype.push=function(e,u,t){const n=t||{};this.__rules__.push({name:e,enabled:!0,fn:u,alt:n.alt||[]}),this.__cache__=null};ie.prototype.enable=function(e,u){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(n){const r=this.__find__(n);if(r<0){if(u)return;throw new Error("Rules manager: invalid rule name "+n)}this.__rules__[r].enabled=!0,t.push(n)},this),this.__cache__=null,t};ie.prototype.enableOnly=function(e,u){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(t){t.enabled=!1}),this.enable(e,u)};ie.prototype.disable=function(e,u){Array.isArray(e)||(e=[e]);const t=[];return e.forEach(function(n){const r=this.__find__(n);if(r<0){if(u)return;throw new Error("Rules manager: invalid rule name "+n)}this.__rules__[r].enabled=!1,t.push(n)},this),this.__cache__=null,t};ie.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function pe(e,u,t){this.type=e,this.tag=u,this.attrs=null,this.map=null,this.nesting=t,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}pe.prototype.attrIndex=function(u){if(!this.attrs)return-1;const t=this.attrs;for(let n=0,r=t.length;n<r;n++)if(t[n][0]===u)return n;return-1};pe.prototype.attrPush=function(u){this.attrs?this.attrs.push(u):this.attrs=[u]};pe.prototype.attrSet=function(u,t){const n=this.attrIndex(u),r=[u,t];n<0?this.attrPush(r):this.attrs[n]=r};pe.prototype.attrGet=function(u){const t=this.attrIndex(u);let n=null;return t>=0&&(n=this.attrs[t][1]),n};pe.prototype.attrJoin=function(u,t){const n=this.attrIndex(u);n<0?this.attrPush([u,t]):this.attrs[n][1]=this.attrs[n][1]+" "+t};function tn(e,u,t){this.src=e,this.env=t,this.tokens=[],this.inlineMode=!1,this.md=u}tn.prototype.Token=pe;const $0=/\r\n?|\n/g,z0=/\0/g;function q0(e){let u;u=e.src.replace($0,`
`),u=u.replace(z0,"�"),e.src=u}function U0(e){let u;e.inlineMode?(u=new e.Token("inline","",0),u.content=e.src,u.map=[0,1],u.children=[],e.tokens.push(u)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function j0(e){const u=e.tokens;for(let t=0,n=u.length;t<n;t++){const r=u[t];r.type==="inline"&&e.md.inline.parse(r.content,e.md,e.env,r.children)}}function H0(e){return/^<a[>\s]/i.test(e)}function Z0(e){return/^<\/a\s*>/i.test(e)}function G0(e){const u=e.tokens;if(e.md.options.linkify)for(let t=0,n=u.length;t<n;t++){if(u[t].type!=="inline"||!e.md.linkify.pretest(u[t].content))continue;let r=u[t].children,i=0;for(let o=r.length-1;o>=0;o--){const s=r[o];if(s.type==="link_close"){for(o--;r[o].level!==s.level&&r[o].type!=="link_open";)o--;continue}if(s.type==="html_inline"&&(H0(s.content)&&i>0&&i--,Z0(s.content)&&i++),!(i>0)&&s.type==="text"&&e.md.linkify.test(s.content)){const c=s.content;let f=e.md.linkify.match(c);const p=[];let a=s.level,d=0;f.length>0&&f[0].index===0&&o>0&&r[o-1].type==="text_special"&&(f=f.slice(1));for(let l=0;l<f.length;l++){const h=f[l].url,g=e.md.normalizeLink(h);if(!e.md.validateLink(g))continue;let m=f[l].text;f[l].schema?f[l].schema==="mailto:"&&!/^mailto:/i.test(m)?m=e.md.normalizeLinkText("mailto:"+m).replace(/^mailto:/,""):m=e.md.normalizeLinkText(m):m=e.md.normalizeLinkText("http://"+m).replace(/^http:\/\//,"");const k=f[l].index;if(k>d){const C=new e.Token("text","",0);C.content=c.slice(d,k),C.level=a,p.push(C)}const x=new e.Token("link_open","a",1);x.attrs=[["href",g]],x.level=a++,x.markup="linkify",x.info="auto",p.push(x);const _=new e.Token("text","",0);_.content=m,_.level=a,p.push(_);const y=new e.Token("link_close","a",-1);y.level=--a,y.markup="linkify",y.info="auto",p.push(y),d=f[l].lastIndex}if(d<c.length){const l=new e.Token("text","",0);l.content=c.slice(d),l.level=a,p.push(l)}u[t].children=r=en(r,o,p)}}}}const nn=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,W0=/\((c|tm|r)\)/i,V0=/\((c|tm|r)\)/ig,K0={c:"©",r:"®",tm:"™"};function Y0(e,u){return K0[u.toLowerCase()]}function X0(e){let u=0;for(let t=e.length-1;t>=0;t--){const n=e[t];n.type==="text"&&!u&&(n.content=n.content.replace(V0,Y0)),n.type==="link_open"&&n.info==="auto"&&u--,n.type==="link_close"&&n.info==="auto"&&u++}}function J0(e){let u=0;for(let t=e.length-1;t>=0;t--){const n=e[t];n.type==="text"&&!u&&nn.test(n.content)&&(n.content=n.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),n.type==="link_open"&&n.info==="auto"&&u--,n.type==="link_close"&&n.info==="auto"&&u++}}function Q0(e){let u;if(e.md.options.typographer)for(u=e.tokens.length-1;u>=0;u--)e.tokens[u].type==="inline"&&(W0.test(e.tokens[u].content)&&X0(e.tokens[u].children),nn.test(e.tokens[u].content)&&J0(e.tokens[u].children))}const ei=/['"]/,Dt=/['"]/g,St="’";function fu(e,u,t){return e.slice(0,u)+t+e.slice(u+1)}function ui(e,u){let t;const n=[];for(let r=0;r<e.length;r++){const i=e[r],o=e[r].level;for(t=n.length-1;t>=0&&!(n[t].level<=o);t--);if(n.length=t+1,i.type!=="text")continue;let s=i.content,c=0,f=s.length;e:for(;c<f;){Dt.lastIndex=c;const p=Dt.exec(s);if(!p)break;let a=!0,d=!0;c=p.index+1;const l=p[0]==="'";let h=32;if(p.index-1>=0)h=s.charCodeAt(p.index-1);else for(t=r-1;t>=0&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t--)if(e[t].content){h=e[t].content.charCodeAt(e[t].content.length-1);break}let g=32;if(c<f)g=s.charCodeAt(c);else for(t=r+1;t<e.length&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t++)if(e[t].content){g=e[t].content.charCodeAt(0);break}const m=Qe(h)||Je(String.fromCharCode(h)),k=Qe(g)||Je(String.fromCharCode(g)),x=Xe(h),_=Xe(g);if(_?a=!1:k&&(x||m||(a=!1)),x?d=!1:m&&(_||k||(d=!1)),g===34&&p[0]==='"'&&h>=48&&h<=57&&(d=a=!1),a&&d&&(a=m,d=k),!a&&!d){l&&(i.content=fu(i.content,p.index,St));continue}if(d)for(t=n.length-1;t>=0;t--){let y=n[t];if(n[t].level<o)break;if(y.single===l&&n[t].level===o){y=n[t];let C,A;l?(C=u.md.options.quotes[2],A=u.md.options.quotes[3]):(C=u.md.options.quotes[0],A=u.md.options.quotes[1]),i.content=fu(i.content,p.index,A),e[y.token].content=fu(e[y.token].content,y.pos,C),c+=A.length-1,y.token===r&&(c+=C.length-1),s=i.content,f=s.length,n.length=t;continue e}}a?n.push({token:r,pos:p.index,single:l,level:o}):d&&l&&(i.content=fu(i.content,p.index,St))}}}function ti(e){if(e.md.options.typographer)for(let u=e.tokens.length-1;u>=0;u--)e.tokens[u].type!=="inline"||!ei.test(e.tokens[u].content)||ui(e.tokens[u].children,e)}function ni(e){let u,t;const n=e.tokens,r=n.length;for(let i=0;i<r;i++){if(n[i].type!=="inline")continue;const o=n[i].children,s=o.length;for(u=0;u<s;u++)o[u].type==="text_special"&&(o[u].type="text");for(u=t=0;u<s;u++)o[u].type==="text"&&u+1<s&&o[u+1].type==="text"?o[u+1].content=o[u].content+o[u+1].content:(u!==t&&(o[t]=o[u]),t++);u!==t&&(o.length=t)}}const Ru=[["normalize",q0],["block",U0],["inline",j0],["linkify",G0],["replacements",Q0],["smartquotes",ti],["text_join",ni]];function Yu(){this.ruler=new ie;for(let e=0;e<Ru.length;e++)this.ruler.push(Ru[e][0],Ru[e][1])}Yu.prototype.process=function(e){const u=this.ruler.getRules("");for(let t=0,n=u.length;t<n;t++)u[t](e)};Yu.prototype.State=tn;function ke(e,u,t,n){this.src=e,this.md=u,this.env=t,this.tokens=n,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const r=this.src;for(let i=0,o=0,s=0,c=0,f=r.length,p=!1;o<f;o++){const a=r.charCodeAt(o);if(!p)if(Z(a)){s++,a===9?c+=4-c%4:c++;continue}else p=!0;(a===10||o===f-1)&&(a!==10&&o++,this.bMarks.push(i),this.eMarks.push(o),this.tShift.push(s),this.sCount.push(c),this.bsCount.push(0),p=!1,s=0,c=0,i=o+1)}this.bMarks.push(r.length),this.eMarks.push(r.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}ke.prototype.push=function(e,u,t){const n=new pe(e,u,t);return n.block=!0,t<0&&this.level--,n.level=this.level,t>0&&this.level++,this.tokens.push(n),n};ke.prototype.isEmpty=function(u){return this.bMarks[u]+this.tShift[u]>=this.eMarks[u]};ke.prototype.skipEmptyLines=function(u){for(let t=this.lineMax;u<t&&!(this.bMarks[u]+this.tShift[u]<this.eMarks[u]);u++);return u};ke.prototype.skipSpaces=function(u){for(let t=this.src.length;u<t;u++){const n=this.src.charCodeAt(u);if(!Z(n))break}return u};ke.prototype.skipSpacesBack=function(u,t){if(u<=t)return u;for(;u>t;)if(!Z(this.src.charCodeAt(--u)))return u+1;return u};ke.prototype.skipChars=function(u,t){for(let n=this.src.length;u<n&&this.src.charCodeAt(u)===t;u++);return u};ke.prototype.skipCharsBack=function(u,t,n){if(u<=n)return u;for(;u>n;)if(t!==this.src.charCodeAt(--u))return u+1;return u};ke.prototype.getLines=function(u,t,n,r){if(u>=t)return"";const i=new Array(t-u);for(let o=0,s=u;s<t;s++,o++){let c=0;const f=this.bMarks[s];let p=f,a;for(s+1<t||r?a=this.eMarks[s]+1:a=this.eMarks[s];p<a&&c<n;){const d=this.src.charCodeAt(p);if(Z(d))d===9?c+=4-(c+this.bsCount[s])%4:c++;else if(p-f<this.tShift[s])c++;else break;p++}c>n?i[o]=new Array(c-n+1).join(" ")+this.src.slice(p,a):i[o]=this.src.slice(p,a)}return i.join("")};ke.prototype.Token=pe;const ri=65536;function Ou(e,u){const t=e.bMarks[u]+e.tShift[u],n=e.eMarks[u];return e.src.slice(t,n)}function Ft(e){const u=[],t=e.length;let n=0,r=e.charCodeAt(n),i=!1,o=0,s="";for(;n<t;)r===124&&(i?(s+=e.substring(o,n-1),o=n):(u.push(s+e.substring(o,n)),s="",o=n+1)),i=r===92,n++,r=e.charCodeAt(n);return u.push(s+e.substring(o)),u}function ii(e,u,t,n){if(u+2>t)return!1;let r=u+1;if(e.sCount[r]<e.blkIndent||e.sCount[r]-e.blkIndent>=4)return!1;let i=e.bMarks[r]+e.tShift[r];if(i>=e.eMarks[r])return!1;const o=e.src.charCodeAt(i++);if(o!==124&&o!==45&&o!==58||i>=e.eMarks[r])return!1;const s=e.src.charCodeAt(i++);if(s!==124&&s!==45&&s!==58&&!Z(s)||o===45&&Z(s))return!1;for(;i<e.eMarks[r];){const y=e.src.charCodeAt(i);if(y!==124&&y!==45&&y!==58&&!Z(y))return!1;i++}let c=Ou(e,u+1),f=c.split("|");const p=[];for(let y=0;y<f.length;y++){const C=f[y].trim();if(!C){if(y===0||y===f.length-1)continue;return!1}if(!/^:?-+:?$/.test(C))return!1;C.charCodeAt(C.length-1)===58?p.push(C.charCodeAt(0)===58?"center":"right"):C.charCodeAt(0)===58?p.push("left"):p.push("")}if(c=Ou(e,u).trim(),c.indexOf("|")===-1||e.sCount[u]-e.blkIndent>=4)return!1;f=Ft(c),f.length&&f[0]===""&&f.shift(),f.length&&f[f.length-1]===""&&f.pop();const a=f.length;if(a===0||a!==p.length)return!1;if(n)return!0;const d=e.parentType;e.parentType="table";const l=e.md.block.ruler.getRules("blockquote"),h=e.push("table_open","table",1),g=[u,0];h.map=g;const m=e.push("thead_open","thead",1);m.map=[u,u+1];const k=e.push("tr_open","tr",1);k.map=[u,u+1];for(let y=0;y<f.length;y++){const C=e.push("th_open","th",1);p[y]&&(C.attrs=[["style","text-align:"+p[y]]]);const A=e.push("inline","",0);A.content=f[y].trim(),A.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let x,_=0;for(r=u+2;r<t&&!(e.sCount[r]<e.blkIndent);r++){let y=!1;for(let A=0,v=l.length;A<v;A++)if(l[A](e,r,t,!0)){y=!0;break}if(y||(c=Ou(e,r).trim(),!c)||e.sCount[r]-e.blkIndent>=4||(f=Ft(c),f.length&&f[0]===""&&f.shift(),f.length&&f[f.length-1]===""&&f.pop(),_+=a-f.length,_>ri))break;if(r===u+2){const A=e.push("tbody_open","tbody",1);A.map=x=[u+2,0]}const C=e.push("tr_open","tr",1);C.map=[r,r+1];for(let A=0;A<a;A++){const v=e.push("td_open","td",1);p[A]&&(v.attrs=[["style","text-align:"+p[A]]]);const F=e.push("inline","",0);F.content=f[A]?f[A].trim():"",F.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return x&&(e.push("tbody_close","tbody",-1),x[1]=r),e.push("table_close","table",-1),g[1]=r,e.parentType=d,e.line=r,!0}function si(e,u,t){if(e.sCount[u]-e.blkIndent<4)return!1;let n=u+1,r=n;for(;n<t;){if(e.isEmpty(n)){n++;continue}if(e.sCount[n]-e.blkIndent>=4){n++,r=n;continue}break}e.line=r;const i=e.push("code_block","code",0);return i.content=e.getLines(u,r,4+e.blkIndent,!1)+`
`,i.map=[u,e.line],!0}function oi(e,u,t,n){let r=e.bMarks[u]+e.tShift[u],i=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4||r+3>i)return!1;const o=e.src.charCodeAt(r);if(o!==126&&o!==96)return!1;let s=r;r=e.skipChars(r,o);let c=r-s;if(c<3)return!1;const f=e.src.slice(s,r),p=e.src.slice(r,i);if(o===96&&p.indexOf(String.fromCharCode(o))>=0)return!1;if(n)return!0;let a=u,d=!1;for(;a++,!(a>=t||(r=s=e.bMarks[a]+e.tShift[a],i=e.eMarks[a],r<i&&e.sCount[a]<e.blkIndent));)if(e.src.charCodeAt(r)===o&&!(e.sCount[a]-e.blkIndent>=4)&&(r=e.skipChars(r,o),!(r-s<c)&&(r=e.skipSpaces(r),!(r<i)))){d=!0;break}c=e.sCount[u],e.line=a+(d?1:0);const l=e.push("fence","code",0);return l.info=p,l.content=e.getLines(u+1,a,c,!0),l.markup=f,l.map=[u,e.line],!0}function ci(e,u,t,n){let r=e.bMarks[u]+e.tShift[u],i=e.eMarks[u];const o=e.lineMax;if(e.sCount[u]-e.blkIndent>=4||e.src.charCodeAt(r)!==62)return!1;if(n)return!0;const s=[],c=[],f=[],p=[],a=e.md.block.ruler.getRules("blockquote"),d=e.parentType;e.parentType="blockquote";let l=!1,h;for(h=u;h<t;h++){const _=e.sCount[h]<e.blkIndent;if(r=e.bMarks[h]+e.tShift[h],i=e.eMarks[h],r>=i)break;if(e.src.charCodeAt(r++)===62&&!_){let C=e.sCount[h]+1,A,v;e.src.charCodeAt(r)===32?(r++,C++,v=!1,A=!0):e.src.charCodeAt(r)===9?(A=!0,(e.bsCount[h]+C)%4===3?(r++,C++,v=!1):v=!0):A=!1;let F=C;for(s.push(e.bMarks[h]),e.bMarks[h]=r;r<i;){const U=e.src.charCodeAt(r);if(Z(U))U===9?F+=4-(F+e.bsCount[h]+(v?1:0))%4:F++;else break;r++}l=r>=i,c.push(e.bsCount[h]),e.bsCount[h]=e.sCount[h]+1+(A?1:0),f.push(e.sCount[h]),e.sCount[h]=F-C,p.push(e.tShift[h]),e.tShift[h]=r-e.bMarks[h];continue}if(l)break;let y=!1;for(let C=0,A=a.length;C<A;C++)if(a[C](e,h,t,!0)){y=!0;break}if(y){e.lineMax=h,e.blkIndent!==0&&(s.push(e.bMarks[h]),c.push(e.bsCount[h]),p.push(e.tShift[h]),f.push(e.sCount[h]),e.sCount[h]-=e.blkIndent);break}s.push(e.bMarks[h]),c.push(e.bsCount[h]),p.push(e.tShift[h]),f.push(e.sCount[h]),e.sCount[h]=-1}const g=e.blkIndent;e.blkIndent=0;const m=e.push("blockquote_open","blockquote",1);m.markup=">";const k=[u,0];m.map=k,e.md.block.tokenize(e,u,h);const x=e.push("blockquote_close","blockquote",-1);x.markup=">",e.lineMax=o,e.parentType=d,k[1]=e.line;for(let _=0;_<p.length;_++)e.bMarks[_+u]=s[_],e.tShift[_+u]=p[_],e.sCount[_+u]=f[_],e.bsCount[_+u]=c[_];return e.blkIndent=g,!0}function ai(e,u,t,n){const r=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4)return!1;let i=e.bMarks[u]+e.tShift[u];const o=e.src.charCodeAt(i++);if(o!==42&&o!==45&&o!==95)return!1;let s=1;for(;i<r;){const f=e.src.charCodeAt(i++);if(f!==o&&!Z(f))return!1;f===o&&s++}if(s<3)return!1;if(n)return!0;e.line=u+1;const c=e.push("hr","hr",0);return c.map=[u,e.line],c.markup=Array(s+1).join(String.fromCharCode(o)),!0}function Tt(e,u){const t=e.eMarks[u];let n=e.bMarks[u]+e.tShift[u];const r=e.src.charCodeAt(n++);if(r!==42&&r!==45&&r!==43)return-1;if(n<t){const i=e.src.charCodeAt(n);if(!Z(i))return-1}return n}function Mt(e,u){const t=e.bMarks[u]+e.tShift[u],n=e.eMarks[u];let r=t;if(r+1>=n)return-1;let i=e.src.charCodeAt(r++);if(i<48||i>57)return-1;for(;;){if(r>=n)return-1;if(i=e.src.charCodeAt(r++),i>=48&&i<=57){if(r-t>=10)return-1;continue}if(i===41||i===46)break;return-1}return r<n&&(i=e.src.charCodeAt(r),!Z(i))?-1:r}function li(e,u){const t=e.level+2;for(let n=u+2,r=e.tokens.length-2;n<r;n++)e.tokens[n].level===t&&e.tokens[n].type==="paragraph_open"&&(e.tokens[n+2].hidden=!0,e.tokens[n].hidden=!0,n+=2)}function fi(e,u,t,n){let r,i,o,s,c=u,f=!0;if(e.sCount[c]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[c]-e.listIndent>=4&&e.sCount[c]<e.blkIndent)return!1;let p=!1;n&&e.parentType==="paragraph"&&e.sCount[c]>=e.blkIndent&&(p=!0);let a,d,l;if((l=Mt(e,c))>=0){if(a=!0,o=e.bMarks[c]+e.tShift[c],d=Number(e.src.slice(o,l-1)),p&&d!==1)return!1}else if((l=Tt(e,c))>=0)a=!1;else return!1;if(p&&e.skipSpaces(l)>=e.eMarks[c])return!1;if(n)return!0;const h=e.src.charCodeAt(l-1),g=e.tokens.length;a?(s=e.push("ordered_list_open","ol",1),d!==1&&(s.attrs=[["start",d]])):s=e.push("bullet_list_open","ul",1);const m=[c,0];s.map=m,s.markup=String.fromCharCode(h);let k=!1;const x=e.md.block.ruler.getRules("list"),_=e.parentType;for(e.parentType="list";c<t;){i=l,r=e.eMarks[c];const y=e.sCount[c]+l-(e.bMarks[c]+e.tShift[c]);let C=y;for(;i<r;){const le=e.src.charCodeAt(i);if(le===9)C+=4-(C+e.bsCount[c])%4;else if(le===32)C++;else break;i++}const A=i;let v;A>=r?v=1:v=C-y,v>4&&(v=1);const F=y+v;s=e.push("list_item_open","li",1),s.markup=String.fromCharCode(h);const U=[c,0];s.map=U,a&&(s.info=e.src.slice(o,l-1));const G=e.tight,$=e.tShift[c],be=e.sCount[c],ve=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=F,e.tight=!0,e.tShift[c]=A-e.bMarks[c],e.sCount[c]=C,A>=r&&e.isEmpty(c+1)?e.line=Math.min(e.line+2,t):e.md.block.tokenize(e,c,t,!0),(!e.tight||k)&&(f=!1),k=e.line-c>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=ve,e.tShift[c]=$,e.sCount[c]=be,e.tight=G,s=e.push("list_item_close","li",-1),s.markup=String.fromCharCode(h),c=e.line,U[1]=c,c>=t||e.sCount[c]<e.blkIndent||e.sCount[c]-e.blkIndent>=4)break;let ae=!1;for(let le=0,Ce=x.length;le<Ce;le++)if(x[le](e,c,t,!0)){ae=!0;break}if(ae)break;if(a){if(l=Mt(e,c),l<0)break;o=e.bMarks[c]+e.tShift[c]}else if(l=Tt(e,c),l<0)break;if(h!==e.src.charCodeAt(l-1))break}return a?s=e.push("ordered_list_close","ol",-1):s=e.push("bullet_list_close","ul",-1),s.markup=String.fromCharCode(h),m[1]=c,e.line=c,e.parentType=_,f&&li(e,g),!0}function di(e,u,t,n){let r=e.bMarks[u]+e.tShift[u],i=e.eMarks[u],o=u+1;if(e.sCount[u]-e.blkIndent>=4||e.src.charCodeAt(r)!==91)return!1;function s(x){const _=e.lineMax;if(x>=_||e.isEmpty(x))return null;let y=!1;if(e.sCount[x]-e.blkIndent>3&&(y=!0),e.sCount[x]<0&&(y=!0),!y){const v=e.md.block.ruler.getRules("reference"),F=e.parentType;e.parentType="reference";let U=!1;for(let G=0,$=v.length;G<$;G++)if(v[G](e,x,_,!0)){U=!0;break}if(e.parentType=F,U)return null}const C=e.bMarks[x]+e.tShift[x],A=e.eMarks[x];return e.src.slice(C,A+1)}let c=e.src.slice(r,i+1);i=c.length;let f=-1;for(r=1;r<i;r++){const x=c.charCodeAt(r);if(x===91)return!1;if(x===93){f=r;break}else if(x===10){const _=s(o);_!==null&&(c+=_,i=c.length,o++)}else if(x===92&&(r++,r<i&&c.charCodeAt(r)===10)){const _=s(o);_!==null&&(c+=_,i=c.length,o++)}}if(f<0||c.charCodeAt(f+1)!==58)return!1;for(r=f+2;r<i;r++){const x=c.charCodeAt(r);if(x===10){const _=s(o);_!==null&&(c+=_,i=c.length,o++)}else if(!Z(x))break}const p=e.md.helpers.parseLinkDestination(c,r,i);if(!p.ok)return!1;const a=e.md.normalizeLink(p.str);if(!e.md.validateLink(a))return!1;r=p.pos;const d=r,l=o,h=r;for(;r<i;r++){const x=c.charCodeAt(r);if(x===10){const _=s(o);_!==null&&(c+=_,i=c.length,o++)}else if(!Z(x))break}let g=e.md.helpers.parseLinkTitle(c,r,i);for(;g.can_continue;){const x=s(o);if(x===null)break;c+=x,r=i,i=c.length,o++,g=e.md.helpers.parseLinkTitle(c,r,i,g)}let m;for(r<i&&h!==r&&g.ok?(m=g.str,r=g.pos):(m="",r=d,o=l);r<i;){const x=c.charCodeAt(r);if(!Z(x))break;r++}if(r<i&&c.charCodeAt(r)!==10&&m)for(m="",r=d,o=l;r<i;){const x=c.charCodeAt(r);if(!Z(x))break;r++}if(r<i&&c.charCodeAt(r)!==10)return!1;const k=yu(c.slice(1,f));return k?(n||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[k]>"u"&&(e.env.references[k]={title:m,href:a}),e.line=o),!0):!1}const hi=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],pi="[a-zA-Z_:][a-zA-Z0-9:._-]*",bi="[^\"'=<>`\\x00-\\x20]+",gi="'[^']*'",mi='"[^"]*"',xi="(?:"+bi+"|"+gi+"|"+mi+")",_i="(?:\\s+"+pi+"(?:\\s*=\\s*"+xi+")?)",rn="<[A-Za-z][A-Za-z0-9\\-]*"+_i+"*\\s*\\/?>",sn="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",yi="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Ei="<[?][\\s\\S]*?[?]>",ki="<![A-Za-z][^>]*>",vi="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",Ci=new RegExp("^(?:"+rn+"|"+sn+"|"+yi+"|"+Ei+"|"+ki+"|"+vi+")"),Ai=new RegExp("^(?:"+rn+"|"+sn+")"),qe=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+hi.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(Ai.source+"\\s*$"),/^$/,!1]];function wi(e,u,t,n){let r=e.bMarks[u]+e.tShift[u],i=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(r)!==60)return!1;let o=e.src.slice(r,i),s=0;for(;s<qe.length&&!qe[s][0].test(o);s++);if(s===qe.length)return!1;if(n)return qe[s][2];let c=u+1;if(!qe[s][1].test(o)){for(;c<t&&!(e.sCount[c]<e.blkIndent);c++)if(r=e.bMarks[c]+e.tShift[c],i=e.eMarks[c],o=e.src.slice(r,i),qe[s][1].test(o)){o.length!==0&&c++;break}}e.line=c;const f=e.push("html_block","",0);return f.map=[u,c],f.content=e.getLines(u,c,e.blkIndent,!0),!0}function Di(e,u,t,n){let r=e.bMarks[u]+e.tShift[u],i=e.eMarks[u];if(e.sCount[u]-e.blkIndent>=4)return!1;let o=e.src.charCodeAt(r);if(o!==35||r>=i)return!1;let s=1;for(o=e.src.charCodeAt(++r);o===35&&r<i&&s<=6;)s++,o=e.src.charCodeAt(++r);if(s>6||r<i&&!Z(o))return!1;if(n)return!0;i=e.skipSpacesBack(i,r);const c=e.skipCharsBack(i,35,r);c>r&&Z(e.src.charCodeAt(c-1))&&(i=c),e.line=u+1;const f=e.push("heading_open","h"+String(s),1);f.markup="########".slice(0,s),f.map=[u,e.line];const p=e.push("inline","",0);p.content=e.src.slice(r,i).trim(),p.map=[u,e.line],p.children=[];const a=e.push("heading_close","h"+String(s),-1);return a.markup="########".slice(0,s),!0}function Si(e,u,t){const n=e.md.block.ruler.getRules("paragraph");if(e.sCount[u]-e.blkIndent>=4)return!1;const r=e.parentType;e.parentType="paragraph";let i=0,o,s=u+1;for(;s<t&&!e.isEmpty(s);s++){if(e.sCount[s]-e.blkIndent>3)continue;if(e.sCount[s]>=e.blkIndent){let l=e.bMarks[s]+e.tShift[s];const h=e.eMarks[s];if(l<h&&(o=e.src.charCodeAt(l),(o===45||o===61)&&(l=e.skipChars(l,o),l=e.skipSpaces(l),l>=h))){i=o===61?1:2;break}}if(e.sCount[s]<0)continue;let d=!1;for(let l=0,h=n.length;l<h;l++)if(n[l](e,s,t,!0)){d=!0;break}if(d)break}if(!i)return!1;const c=e.getLines(u,s,e.blkIndent,!1).trim();e.line=s+1;const f=e.push("heading_open","h"+String(i),1);f.markup=String.fromCharCode(o),f.map=[u,e.line];const p=e.push("inline","",0);p.content=c,p.map=[u,e.line-1],p.children=[];const a=e.push("heading_close","h"+String(i),-1);return a.markup=String.fromCharCode(o),e.parentType=r,!0}function Fi(e,u,t){const n=e.md.block.ruler.getRules("paragraph"),r=e.parentType;let i=u+1;for(e.parentType="paragraph";i<t&&!e.isEmpty(i);i++){if(e.sCount[i]-e.blkIndent>3||e.sCount[i]<0)continue;let f=!1;for(let p=0,a=n.length;p<a;p++)if(n[p](e,i,t,!0)){f=!0;break}if(f)break}const o=e.getLines(u,i,e.blkIndent,!1).trim();e.line=i;const s=e.push("paragraph_open","p",1);s.map=[u,e.line];const c=e.push("inline","",0);return c.content=o,c.map=[u,e.line],c.children=[],e.push("paragraph_close","p",-1),e.parentType=r,!0}const du=[["table",ii,["paragraph","reference"]],["code",si],["fence",oi,["paragraph","reference","blockquote","list"]],["blockquote",ci,["paragraph","reference","blockquote","list"]],["hr",ai,["paragraph","reference","blockquote","list"]],["list",fi,["paragraph","reference","blockquote"]],["reference",di],["html_block",wi,["paragraph","reference","blockquote"]],["heading",Di,["paragraph","reference","blockquote"]],["lheading",Si],["paragraph",Fi]];function Eu(){this.ruler=new ie;for(let e=0;e<du.length;e++)this.ruler.push(du[e][0],du[e][1],{alt:(du[e][2]||[]).slice()})}Eu.prototype.tokenize=function(e,u,t){const n=this.ruler.getRules(""),r=n.length,i=e.md.options.maxNesting;let o=u,s=!1;for(;o<t&&(e.line=o=e.skipEmptyLines(o),!(o>=t||e.sCount[o]<e.blkIndent));){if(e.level>=i){e.line=t;break}const c=e.line;let f=!1;for(let p=0;p<r;p++)if(f=n[p](e,o,t,!1),f){if(c>=e.line)throw new Error("block rule didn't increment state.line");break}if(!f)throw new Error("none of the block rules matched");e.tight=!s,e.isEmpty(e.line-1)&&(s=!0),o=e.line,o<t&&e.isEmpty(o)&&(s=!0,o++,e.line=o)}};Eu.prototype.parse=function(e,u,t,n){if(!e)return;const r=new this.State(e,u,t,n);this.tokenize(r,r.line,r.lineMax)};Eu.prototype.State=ke;function tu(e,u,t,n){this.src=e,this.env=t,this.md=u,this.tokens=n,this.tokens_meta=Array(n.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}tu.prototype.pushPending=function(){const e=new pe("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};tu.prototype.push=function(e,u,t){this.pending&&this.pushPending();const n=new pe(e,u,t);let r=null;return t<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),n.level=this.level,t>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],r={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(n),this.tokens_meta.push(r),n};tu.prototype.scanDelims=function(e,u){const t=this.posMax,n=this.src.charCodeAt(e),r=e>0?this.src.charCodeAt(e-1):32;let i=e;for(;i<t&&this.src.charCodeAt(i)===n;)i++;const o=i-e,s=i<t?this.src.charCodeAt(i):32,c=Qe(r)||Je(String.fromCharCode(r)),f=Qe(s)||Je(String.fromCharCode(s)),p=Xe(r),a=Xe(s),d=!a&&(!f||p||c),l=!p&&(!c||a||f);return{can_open:d&&(u||!l||c),can_close:l&&(u||!d||f),length:o}};tu.prototype.Token=pe;function Ti(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function Mi(e,u){let t=e.pos;for(;t<e.posMax&&!Ti(e.src.charCodeAt(t));)t++;return t===e.pos?!1:(u||(e.pending+=e.src.slice(e.pos,t)),e.pos=t,!0)}const Ni=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function Ri(e,u){if(!e.md.options.linkify||e.linkLevel>0)return!1;const t=e.pos,n=e.posMax;if(t+3>n||e.src.charCodeAt(t)!==58||e.src.charCodeAt(t+1)!==47||e.src.charCodeAt(t+2)!==47)return!1;const r=e.pending.match(Ni);if(!r)return!1;const i=r[1],o=e.md.linkify.matchAtStart(e.src.slice(t-i.length));if(!o)return!1;let s=o.url;if(s.length<=i.length)return!1;let c=s.length;for(;c>0&&s.charCodeAt(c-1)===42;)c--;c!==s.length&&(s=s.slice(0,c));const f=e.md.normalizeLink(s);if(!e.md.validateLink(f))return!1;if(!u){e.pending=e.pending.slice(0,-i.length);const p=e.push("link_open","a",1);p.attrs=[["href",f]],p.markup="linkify",p.info="auto";const a=e.push("text","",0);a.content=e.md.normalizeLinkText(s);const d=e.push("link_close","a",-1);d.markup="linkify",d.info="auto"}return e.pos+=s.length-i.length,!0}function Oi(e,u){let t=e.pos;if(e.src.charCodeAt(t)!==10)return!1;const n=e.pending.length-1,r=e.posMax;if(!u)if(n>=0&&e.pending.charCodeAt(n)===32)if(n>=1&&e.pending.charCodeAt(n-1)===32){let i=n-1;for(;i>=1&&e.pending.charCodeAt(i-1)===32;)i--;e.pending=e.pending.slice(0,i),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(t++;t<r&&Z(e.src.charCodeAt(t));)t++;return e.pos=t,!0}const Xu=[];for(let e=0;e<256;e++)Xu.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){Xu[e.charCodeAt(0)]=1});function Ii(e,u){let t=e.pos;const n=e.posMax;if(e.src.charCodeAt(t)!==92||(t++,t>=n))return!1;let r=e.src.charCodeAt(t);if(r===10){for(u||e.push("hardbreak","br",0),t++;t<n&&(r=e.src.charCodeAt(t),!!Z(r));)t++;return e.pos=t,!0}let i=e.src[t];if(r>=55296&&r<=56319&&t+1<n){const s=e.src.charCodeAt(t+1);s>=56320&&s<=57343&&(i+=e.src[t+1],t++)}const o="\\"+i;if(!u){const s=e.push("text_special","",0);r<256&&Xu[r]!==0?s.content=i:s.content=o,s.markup=o,s.info="escape"}return e.pos=t+1,!0}function Li(e,u){let t=e.pos;if(e.src.charCodeAt(t)!==96)return!1;const r=t;t++;const i=e.posMax;for(;t<i&&e.src.charCodeAt(t)===96;)t++;const o=e.src.slice(r,t),s=o.length;if(e.backticksScanned&&(e.backticks[s]||0)<=r)return u||(e.pending+=o),e.pos+=s,!0;let c=t,f;for(;(f=e.src.indexOf("`",c))!==-1;){for(c=f+1;c<i&&e.src.charCodeAt(c)===96;)c++;const p=c-f;if(p===s){if(!u){const a=e.push("code_inline","code",0);a.markup=o,a.content=e.src.slice(t,f).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=c,!0}e.backticks[p]=f}return e.backticksScanned=!0,u||(e.pending+=o),e.pos+=s,!0}function Bi(e,u){const t=e.pos,n=e.src.charCodeAt(t);if(u||n!==126)return!1;const r=e.scanDelims(e.pos,!0);let i=r.length;const o=String.fromCharCode(n);if(i<2)return!1;let s;i%2&&(s=e.push("text","",0),s.content=o,i--);for(let c=0;c<i;c+=2)s=e.push("text","",0),s.content=o+o,e.delimiters.push({marker:n,length:0,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close});return e.pos+=r.length,!0}function Nt(e,u){let t;const n=[],r=u.length;for(let i=0;i<r;i++){const o=u[i];if(o.marker!==126||o.end===-1)continue;const s=u[o.end];t=e.tokens[o.token],t.type="s_open",t.tag="s",t.nesting=1,t.markup="~~",t.content="",t=e.tokens[s.token],t.type="s_close",t.tag="s",t.nesting=-1,t.markup="~~",t.content="",e.tokens[s.token-1].type==="text"&&e.tokens[s.token-1].content==="~"&&n.push(s.token-1)}for(;n.length;){const i=n.pop();let o=i+1;for(;o<e.tokens.length&&e.tokens[o].type==="s_close";)o++;o--,i!==o&&(t=e.tokens[o],e.tokens[o]=e.tokens[i],e.tokens[i]=t)}}function Pi(e){const u=e.tokens_meta,t=e.tokens_meta.length;Nt(e,e.delimiters);for(let n=0;n<t;n++)u[n]&&u[n].delimiters&&Nt(e,u[n].delimiters)}const on={tokenize:Bi,postProcess:Pi};function $i(e,u){const t=e.pos,n=e.src.charCodeAt(t);if(u||n!==95&&n!==42)return!1;const r=e.scanDelims(e.pos,n===42);for(let i=0;i<r.length;i++){const o=e.push("text","",0);o.content=String.fromCharCode(n),e.delimiters.push({marker:n,length:r.length,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close})}return e.pos+=r.length,!0}function Rt(e,u){const t=u.length;for(let n=t-1;n>=0;n--){const r=u[n];if(r.marker!==95&&r.marker!==42||r.end===-1)continue;const i=u[r.end],o=n>0&&u[n-1].end===r.end+1&&u[n-1].marker===r.marker&&u[n-1].token===r.token-1&&u[r.end+1].token===i.token+1,s=String.fromCharCode(r.marker),c=e.tokens[r.token];c.type=o?"strong_open":"em_open",c.tag=o?"strong":"em",c.nesting=1,c.markup=o?s+s:s,c.content="";const f=e.tokens[i.token];f.type=o?"strong_close":"em_close",f.tag=o?"strong":"em",f.nesting=-1,f.markup=o?s+s:s,f.content="",o&&(e.tokens[u[n-1].token].content="",e.tokens[u[r.end+1].token].content="",n--)}}function zi(e){const u=e.tokens_meta,t=e.tokens_meta.length;Rt(e,e.delimiters);for(let n=0;n<t;n++)u[n]&&u[n].delimiters&&Rt(e,u[n].delimiters)}const cn={tokenize:$i,postProcess:zi};function qi(e,u){let t,n,r,i,o="",s="",c=e.pos,f=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const p=e.pos,a=e.posMax,d=e.pos+1,l=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(l<0)return!1;let h=l+1;if(h<a&&e.src.charCodeAt(h)===40){for(f=!1,h++;h<a&&(t=e.src.charCodeAt(h),!(!Z(t)&&t!==10));h++);if(h>=a)return!1;if(c=h,r=e.md.helpers.parseLinkDestination(e.src,h,e.posMax),r.ok){for(o=e.md.normalizeLink(r.str),e.md.validateLink(o)?h=r.pos:o="",c=h;h<a&&(t=e.src.charCodeAt(h),!(!Z(t)&&t!==10));h++);if(r=e.md.helpers.parseLinkTitle(e.src,h,e.posMax),h<a&&c!==h&&r.ok)for(s=r.str,h=r.pos;h<a&&(t=e.src.charCodeAt(h),!(!Z(t)&&t!==10));h++);}(h>=a||e.src.charCodeAt(h)!==41)&&(f=!0),h++}if(f){if(typeof e.env.references>"u")return!1;if(h<a&&e.src.charCodeAt(h)===91?(c=h+1,h=e.md.helpers.parseLinkLabel(e,h),h>=0?n=e.src.slice(c,h++):h=l+1):h=l+1,n||(n=e.src.slice(d,l)),i=e.env.references[yu(n)],!i)return e.pos=p,!1;o=i.href,s=i.title}if(!u){e.pos=d,e.posMax=l;const g=e.push("link_open","a",1),m=[["href",o]];g.attrs=m,s&&m.push(["title",s]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=h,e.posMax=a,!0}function Ui(e,u){let t,n,r,i,o,s,c,f,p="";const a=e.pos,d=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const l=e.pos+2,h=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(h<0)return!1;if(i=h+1,i<d&&e.src.charCodeAt(i)===40){for(i++;i<d&&(t=e.src.charCodeAt(i),!(!Z(t)&&t!==10));i++);if(i>=d)return!1;for(f=i,s=e.md.helpers.parseLinkDestination(e.src,i,e.posMax),s.ok&&(p=e.md.normalizeLink(s.str),e.md.validateLink(p)?i=s.pos:p=""),f=i;i<d&&(t=e.src.charCodeAt(i),!(!Z(t)&&t!==10));i++);if(s=e.md.helpers.parseLinkTitle(e.src,i,e.posMax),i<d&&f!==i&&s.ok)for(c=s.str,i=s.pos;i<d&&(t=e.src.charCodeAt(i),!(!Z(t)&&t!==10));i++);else c="";if(i>=d||e.src.charCodeAt(i)!==41)return e.pos=a,!1;i++}else{if(typeof e.env.references>"u")return!1;if(i<d&&e.src.charCodeAt(i)===91?(f=i+1,i=e.md.helpers.parseLinkLabel(e,i),i>=0?r=e.src.slice(f,i++):i=h+1):i=h+1,r||(r=e.src.slice(l,h)),o=e.env.references[yu(r)],!o)return e.pos=a,!1;p=o.href,c=o.title}if(!u){n=e.src.slice(l,h);const g=[];e.md.inline.parse(n,e.md,e.env,g);const m=e.push("image","img",0),k=[["src",p],["alt",""]];m.attrs=k,m.children=g,m.content=n,c&&k.push(["title",c])}return e.pos=i,e.posMax=d,!0}const ji=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Hi=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function Zi(e,u){let t=e.pos;if(e.src.charCodeAt(t)!==60)return!1;const n=e.pos,r=e.posMax;for(;;){if(++t>=r)return!1;const o=e.src.charCodeAt(t);if(o===60)return!1;if(o===62)break}const i=e.src.slice(n+1,t);if(Hi.test(i)){const o=e.md.normalizeLink(i);if(!e.md.validateLink(o))return!1;if(!u){const s=e.push("link_open","a",1);s.attrs=[["href",o]],s.markup="autolink",s.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(i);const f=e.push("link_close","a",-1);f.markup="autolink",f.info="auto"}return e.pos+=i.length+2,!0}if(ji.test(i)){const o=e.md.normalizeLink("mailto:"+i);if(!e.md.validateLink(o))return!1;if(!u){const s=e.push("link_open","a",1);s.attrs=[["href",o]],s.markup="autolink",s.info="auto";const c=e.push("text","",0);c.content=e.md.normalizeLinkText(i);const f=e.push("link_close","a",-1);f.markup="autolink",f.info="auto"}return e.pos+=i.length+2,!0}return!1}function Gi(e){return/^<a[>\s]/i.test(e)}function Wi(e){return/^<\/a\s*>/i.test(e)}function Vi(e){const u=e|32;return u>=97&&u<=122}function Ki(e,u){if(!e.md.options.html)return!1;const t=e.posMax,n=e.pos;if(e.src.charCodeAt(n)!==60||n+2>=t)return!1;const r=e.src.charCodeAt(n+1);if(r!==33&&r!==63&&r!==47&&!Vi(r))return!1;const i=e.src.slice(n).match(Ci);if(!i)return!1;if(!u){const o=e.push("html_inline","",0);o.content=i[0],Gi(o.content)&&e.linkLevel++,Wi(o.content)&&e.linkLevel--}return e.pos+=i[0].length,!0}const Yi=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,Xi=/^&([a-z][a-z0-9]{1,31});/i;function Ji(e,u){const t=e.pos,n=e.posMax;if(e.src.charCodeAt(t)!==38||t+1>=n)return!1;if(e.src.charCodeAt(t+1)===35){const i=e.src.slice(t).match(Yi);if(i){if(!u){const o=i[1][0].toLowerCase()==="x"?parseInt(i[1].slice(1),16):parseInt(i[1],10),s=e.push("text_special","",0);s.content=Ku(o)?bu(o):bu(65533),s.markup=i[0],s.info="entity"}return e.pos+=i[0].length,!0}}else{const i=e.src.slice(t).match(Xi);if(i){const o=Qt(i[0]);if(o!==i[0]){if(!u){const s=e.push("text_special","",0);s.content=o,s.markup=i[0],s.info="entity"}return e.pos+=i[0].length,!0}}}return!1}function Ot(e){const u={},t=e.length;if(!t)return;let n=0,r=-2;const i=[];for(let o=0;o<t;o++){const s=e[o];if(i.push(0),(e[n].marker!==s.marker||r!==s.token-1)&&(n=o),r=s.token,s.length=s.length||0,!s.close)continue;u.hasOwnProperty(s.marker)||(u[s.marker]=[-1,-1,-1,-1,-1,-1]);const c=u[s.marker][(s.open?3:0)+s.length%3];let f=n-i[n]-1,p=f;for(;f>c;f-=i[f]+1){const a=e[f];if(a.marker===s.marker&&a.open&&a.end<0){let d=!1;if((a.close||s.open)&&(a.length+s.length)%3===0&&(a.length%3!==0||s.length%3!==0)&&(d=!0),!d){const l=f>0&&!e[f-1].open?i[f-1]+1:0;i[o]=o-f+l,i[f]=l,s.open=!1,a.end=o,a.close=!1,p=-1,r=-2;break}}}p!==-1&&(u[s.marker][(s.open?3:0)+(s.length||0)%3]=p)}}function Qi(e){const u=e.tokens_meta,t=e.tokens_meta.length;Ot(e.delimiters);for(let n=0;n<t;n++)u[n]&&u[n].delimiters&&Ot(u[n].delimiters)}function es(e){let u,t,n=0;const r=e.tokens,i=e.tokens.length;for(u=t=0;u<i;u++)r[u].nesting<0&&n--,r[u].level=n,r[u].nesting>0&&n++,r[u].type==="text"&&u+1<i&&r[u+1].type==="text"?r[u+1].content=r[u].content+r[u+1].content:(u!==t&&(r[t]=r[u]),t++);u!==t&&(r.length=t)}const Iu=[["text",Mi],["linkify",Ri],["newline",Oi],["escape",Ii],["backticks",Li],["strikethrough",on.tokenize],["emphasis",cn.tokenize],["link",qi],["image",Ui],["autolink",Zi],["html_inline",Ki],["entity",Ji]],Lu=[["balance_pairs",Qi],["strikethrough",on.postProcess],["emphasis",cn.postProcess],["fragments_join",es]];function nu(){this.ruler=new ie;for(let e=0;e<Iu.length;e++)this.ruler.push(Iu[e][0],Iu[e][1]);this.ruler2=new ie;for(let e=0;e<Lu.length;e++)this.ruler2.push(Lu[e][0],Lu[e][1])}nu.prototype.skipToken=function(e){const u=e.pos,t=this.ruler.getRules(""),n=t.length,r=e.md.options.maxNesting,i=e.cache;if(typeof i[u]<"u"){e.pos=i[u];return}let o=!1;if(e.level<r){for(let s=0;s<n;s++)if(e.level++,o=t[s](e,!0),e.level--,o){if(u>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;o||e.pos++,i[u]=e.pos};nu.prototype.tokenize=function(e){const u=this.ruler.getRules(""),t=u.length,n=e.posMax,r=e.md.options.maxNesting;for(;e.pos<n;){const i=e.pos;let o=!1;if(e.level<r){for(let s=0;s<t;s++)if(o=u[s](e,!1),o){if(i>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(o){if(e.pos>=n)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};nu.prototype.parse=function(e,u,t,n){const r=new this.State(e,u,t,n);this.tokenize(r);const i=this.ruler2.getRules(""),o=i.length;for(let s=0;s<o;s++)i[s](r)};nu.prototype.State=tu;function us(e){const u={};e=e||{},u.src_Any=Vt.source,u.src_Cc=Kt.source,u.src_Z=Xt.source,u.src_P=Wu.source,u.src_ZPCc=[u.src_Z,u.src_P,u.src_Cc].join("|"),u.src_ZCc=[u.src_Z,u.src_Cc].join("|");const t="[><｜]";return u.src_pseudo_letter="(?:(?!"+t+"|"+u.src_ZPCc+")"+u.src_Any+")",u.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",u.src_auth="(?:(?:(?!"+u.src_ZCc+"|[@/\\[\\]()]).)+@)?",u.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",u.src_host_terminator="(?=$|"+t+"|"+u.src_ZPCc+")(?!"+(e["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+u.src_ZPCc+"))",u.src_path="(?:[/?#](?:(?!"+u.src_ZCc+"|"+t+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+u.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+u.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+u.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+u.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+u.src_ZCc+"|[']).)+\\'|\\'(?="+u.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+u.src_ZCc+"|[.]|$)|"+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+u.src_ZCc+"|$)|;(?!"+u.src_ZCc+"|$)|\\!+(?!"+u.src_ZCc+"|[!]|$)|\\?(?!"+u.src_ZCc+"|[?]|$))+|\\/)?",u.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',u.src_xn="xn--[a-z0-9\\-]{1,59}",u.src_domain_root="(?:"+u.src_xn+"|"+u.src_pseudo_letter+"{1,63})",u.src_domain="(?:"+u.src_xn+"|(?:"+u.src_pseudo_letter+")|(?:"+u.src_pseudo_letter+"(?:-|"+u.src_pseudo_letter+"){0,61}"+u.src_pseudo_letter+"))",u.src_host="(?:(?:(?:(?:"+u.src_domain+")\\.)*"+u.src_domain+"))",u.tpl_host_fuzzy="(?:"+u.src_ip4+"|(?:(?:(?:"+u.src_domain+")\\.)+(?:%TLDS%)))",u.tpl_host_no_ip_fuzzy="(?:(?:(?:"+u.src_domain+")\\.)+(?:%TLDS%))",u.src_host_strict=u.src_host+u.src_host_terminator,u.tpl_host_fuzzy_strict=u.tpl_host_fuzzy+u.src_host_terminator,u.src_host_port_strict=u.src_host+u.src_port+u.src_host_terminator,u.tpl_host_port_fuzzy_strict=u.tpl_host_fuzzy+u.src_port+u.src_host_terminator,u.tpl_host_port_no_ip_fuzzy_strict=u.tpl_host_no_ip_fuzzy+u.src_port+u.src_host_terminator,u.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+u.src_ZPCc+"|>|$))",u.tpl_email_fuzzy="(^|"+t+'|"|\\(|'+u.src_ZCc+")("+u.src_email_name+"@"+u.tpl_host_fuzzy_strict+")",u.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+u.src_ZPCc+"))((?![$+<=>^`|｜])"+u.tpl_host_port_fuzzy_strict+u.src_path+")",u.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+u.src_ZPCc+"))((?![$+<=>^`|｜])"+u.tpl_host_port_no_ip_fuzzy_strict+u.src_path+")",u}function qu(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(n){e[n]=t[n]})}),e}function ku(e){return Object.prototype.toString.call(e)}function ts(e){return ku(e)==="[object String]"}function ns(e){return ku(e)==="[object Object]"}function rs(e){return ku(e)==="[object RegExp]"}function It(e){return ku(e)==="[object Function]"}function is(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const an={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function ss(e){return Object.keys(e||{}).reduce(function(u,t){return u||an.hasOwnProperty(t)},!1)}const os={"http:":{validate:function(e,u,t){const n=e.slice(u);return t.re.http||(t.re.http=new RegExp("^\\/\\/"+t.re.src_auth+t.re.src_host_port_strict+t.re.src_path,"i")),t.re.http.test(n)?n.match(t.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,u,t){const n=e.slice(u);return t.re.no_http||(t.re.no_http=new RegExp("^"+t.re.src_auth+"(?:localhost|(?:(?:"+t.re.src_domain+")\\.)+"+t.re.src_domain_root+")"+t.re.src_port+t.re.src_host_terminator+t.re.src_path,"i")),t.re.no_http.test(n)?u>=3&&e[u-3]===":"||u>=3&&e[u-3]==="/"?0:n.match(t.re.no_http)[0].length:0}},"mailto:":{validate:function(e,u,t){const n=e.slice(u);return t.re.mailto||(t.re.mailto=new RegExp("^"+t.re.src_email_name+"@"+t.re.src_host_strict,"i")),t.re.mailto.test(n)?n.match(t.re.mailto)[0].length:0}}},cs="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",as="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function ls(e){e.__index__=-1,e.__text_cache__=""}function fs(e){return function(u,t){const n=u.slice(t);return e.test(n)?n.match(e)[0].length:0}}function Lt(){return function(e,u){u.normalize(e)}}function gu(e){const u=e.re=us(e.__opts__),t=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||t.push(cs),t.push(u.src_xn),u.src_tlds=t.join("|");function n(s){return s.replace("%TLDS%",u.src_tlds)}u.email_fuzzy=RegExp(n(u.tpl_email_fuzzy),"i"),u.link_fuzzy=RegExp(n(u.tpl_link_fuzzy),"i"),u.link_no_ip_fuzzy=RegExp(n(u.tpl_link_no_ip_fuzzy),"i"),u.host_fuzzy_test=RegExp(n(u.tpl_host_fuzzy_test),"i");const r=[];e.__compiled__={};function i(s,c){throw new Error('(LinkifyIt) Invalid schema "'+s+'": '+c)}Object.keys(e.__schemas__).forEach(function(s){const c=e.__schemas__[s];if(c===null)return;const f={validate:null,link:null};if(e.__compiled__[s]=f,ns(c)){rs(c.validate)?f.validate=fs(c.validate):It(c.validate)?f.validate=c.validate:i(s,c),It(c.normalize)?f.normalize=c.normalize:c.normalize?i(s,c):f.normalize=Lt();return}if(ts(c)){r.push(s);return}i(s,c)}),r.forEach(function(s){e.__compiled__[e.__schemas__[s]]&&(e.__compiled__[s].validate=e.__compiled__[e.__schemas__[s]].validate,e.__compiled__[s].normalize=e.__compiled__[e.__schemas__[s]].normalize)}),e.__compiled__[""]={validate:null,normalize:Lt()};const o=Object.keys(e.__compiled__).filter(function(s){return s.length>0&&e.__compiled__[s]}).map(is).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+u.src_ZPCc+"))("+o+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+u.src_ZPCc+"))("+o+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i"),ls(e)}function ds(e,u){const t=e.__index__,n=e.__last_index__,r=e.__text_cache__.slice(t,n);this.schema=e.__schema__.toLowerCase(),this.index=t+u,this.lastIndex=n+u,this.raw=r,this.text=r,this.url=r}function Uu(e,u){const t=new ds(e,u);return e.__compiled__[t.schema].normalize(t,e),t}function ce(e,u){if(!(this instanceof ce))return new ce(e,u);u||ss(e)&&(u=e,e={}),this.__opts__=qu({},an,u),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=qu({},os,e),this.__compiled__={},this.__tlds__=as,this.__tlds_replaced__=!1,this.re={},gu(this)}ce.prototype.add=function(u,t){return this.__schemas__[u]=t,gu(this),this};ce.prototype.set=function(u){return this.__opts__=qu(this.__opts__,u),this};ce.prototype.test=function(u){if(this.__text_cache__=u,this.__index__=-1,!u.length)return!1;let t,n,r,i,o,s,c,f,p;if(this.re.schema_test.test(u)){for(c=this.re.schema_search,c.lastIndex=0;(t=c.exec(u))!==null;)if(i=this.testSchemaAt(u,t[2],c.lastIndex),i){this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+i;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(f=u.search(this.re.host_fuzzy_test),f>=0&&(this.__index__<0||f<this.__index__)&&(n=u.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(o=n.index+n[1].length,(this.__index__<0||o<this.__index__)&&(this.__schema__="",this.__index__=o,this.__last_index__=n.index+n[0].length))),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&(p=u.indexOf("@"),p>=0&&(r=u.match(this.re.email_fuzzy))!==null&&(o=r.index+r[1].length,s=r.index+r[0].length,(this.__index__<0||o<this.__index__||o===this.__index__&&s>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=o,this.__last_index__=s))),this.__index__>=0};ce.prototype.pretest=function(u){return this.re.pretest.test(u)};ce.prototype.testSchemaAt=function(u,t,n){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(u,n,this):0};ce.prototype.match=function(u){const t=[];let n=0;this.__index__>=0&&this.__text_cache__===u&&(t.push(Uu(this,n)),n=this.__last_index__);let r=n?u.slice(n):u;for(;this.test(r);)t.push(Uu(this,n)),r=r.slice(this.__last_index__),n+=this.__last_index__;return t.length?t:null};ce.prototype.matchAtStart=function(u){if(this.__text_cache__=u,this.__index__=-1,!u.length)return null;const t=this.re.schema_at_start.exec(u);if(!t)return null;const n=this.testSchemaAt(u,t[2],t[0].length);return n?(this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+n,Uu(this,0)):null};ce.prototype.tlds=function(u,t){return u=Array.isArray(u)?u:[u],t?(this.__tlds__=this.__tlds__.concat(u).sort().filter(function(n,r,i){return n!==i[r-1]}).reverse(),gu(this),this):(this.__tlds__=u.slice(),this.__tlds_replaced__=!0,gu(this),this)};ce.prototype.normalize=function(u){u.schema||(u.url="http://"+u.url),u.schema==="mailto:"&&!/^mailto:/i.test(u.url)&&(u.url="mailto:"+u.url)};ce.prototype.onCompile=function(){};const Ue=2147483647,xe=36,Ju=1,eu=26,hs=38,ps=700,ln=72,fn=128,dn="-",bs=/^xn--/,gs=/[^\0-\x7F]/,ms=/[\x2E\u3002\uFF0E\uFF61]/g,xs={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Bu=xe-Ju,_e=Math.floor,Pu=String.fromCharCode;function Me(e){throw new RangeError(xs[e])}function _s(e,u){const t=[];let n=e.length;for(;n--;)t[n]=u(e[n]);return t}function hn(e,u){const t=e.split("@");let n="";t.length>1&&(n=t[0]+"@",e=t[1]),e=e.replace(ms,".");const r=e.split("."),i=_s(r,u).join(".");return n+i}function pn(e){const u=[];let t=0;const n=e.length;for(;t<n;){const r=e.charCodeAt(t++);if(r>=55296&&r<=56319&&t<n){const i=e.charCodeAt(t++);(i&64512)==56320?u.push(((r&1023)<<10)+(i&1023)+65536):(u.push(r),t--)}else u.push(r)}return u}const ys=e=>String.fromCodePoint(...e),Es=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:xe},Bt=function(e,u){return e+22+75*(e<26)-((u!=0)<<5)},bn=function(e,u,t){let n=0;for(e=t?_e(e/ps):e>>1,e+=_e(e/u);e>Bu*eu>>1;n+=xe)e=_e(e/Bu);return _e(n+(Bu+1)*e/(e+hs))},gn=function(e){const u=[],t=e.length;let n=0,r=fn,i=ln,o=e.lastIndexOf(dn);o<0&&(o=0);for(let s=0;s<o;++s)e.charCodeAt(s)>=128&&Me("not-basic"),u.push(e.charCodeAt(s));for(let s=o>0?o+1:0;s<t;){const c=n;for(let p=1,a=xe;;a+=xe){s>=t&&Me("invalid-input");const d=Es(e.charCodeAt(s++));d>=xe&&Me("invalid-input"),d>_e((Ue-n)/p)&&Me("overflow"),n+=d*p;const l=a<=i?Ju:a>=i+eu?eu:a-i;if(d<l)break;const h=xe-l;p>_e(Ue/h)&&Me("overflow"),p*=h}const f=u.length+1;i=bn(n-c,f,c==0),_e(n/f)>Ue-r&&Me("overflow"),r+=_e(n/f),n%=f,u.splice(n++,0,r)}return String.fromCodePoint(...u)},mn=function(e){const u=[];e=pn(e);const t=e.length;let n=fn,r=0,i=ln;for(const c of e)c<128&&u.push(Pu(c));const o=u.length;let s=o;for(o&&u.push(dn);s<t;){let c=Ue;for(const p of e)p>=n&&p<c&&(c=p);const f=s+1;c-n>_e((Ue-r)/f)&&Me("overflow"),r+=(c-n)*f,n=c;for(const p of e)if(p<n&&++r>Ue&&Me("overflow"),p===n){let a=r;for(let d=xe;;d+=xe){const l=d<=i?Ju:d>=i+eu?eu:d-i;if(a<l)break;const h=a-l,g=xe-l;u.push(Pu(Bt(l+h%g,0))),a=_e(h/g)}u.push(Pu(Bt(a,0))),i=bn(r,f,s===o),r=0,++s}++r,++n}return u.join("")},ks=function(e){return hn(e,function(u){return bs.test(u)?gn(u.slice(4).toLowerCase()):u})},vs=function(e){return hn(e,function(u){return gs.test(u)?"xn--"+mn(u):u})},xn={version:"2.3.1",ucs2:{decode:pn,encode:ys},decode:gn,encode:mn,toASCII:vs,toUnicode:ks},Cs={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},As={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},ws={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},Ds={default:Cs,zero:As,commonmark:ws},Ss=/^(vbscript|javascript|file|data):/,Fs=/^data:image\/(gif|png|jpeg|webp);/;function Ts(e){const u=e.trim().toLowerCase();return Ss.test(u)?Fs.test(u):!0}const _n=["http:","https:","mailto:"];function Ms(e){const u=Gu(e,!0);if(u.hostname&&(!u.protocol||_n.indexOf(u.protocol)>=0))try{u.hostname=xn.toASCII(u.hostname)}catch{}return uu(Zu(u))}function Ns(e){const u=Gu(e,!0);if(u.hostname&&(!u.protocol||_n.indexOf(u.protocol)>=0))try{u.hostname=xn.toUnicode(u.hostname)}catch{}return je(Zu(u),je.defaultChars+"%")}function fe(e,u){if(!(this instanceof fe))return new fe(e,u);u||Vu(e)||(u=e||{},e="default"),this.inline=new nu,this.block=new Eu,this.core=new Yu,this.renderer=new Ze,this.linkify=new ce,this.validateLink=Ts,this.normalizeLink=Ms,this.normalizeLinkText=Ns,this.utils=O0,this.helpers=_u({},P0),this.options={},this.configure(e),u&&this.set(u)}fe.prototype.set=function(e){return _u(this.options,e),this};fe.prototype.configure=function(e){const u=this;if(Vu(e)){const t=e;if(e=Ds[t],!e)throw new Error('Wrong `markdown-it` preset "'+t+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&u.set(e.options),e.components&&Object.keys(e.components).forEach(function(t){e.components[t].rules&&u[t].ruler.enableOnly(e.components[t].rules),e.components[t].rules2&&u[t].ruler2.enableOnly(e.components[t].rules2)}),this};fe.prototype.enable=function(e,u){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){t=t.concat(this[r].ruler.enable(e,!0))},this),t=t.concat(this.inline.ruler2.enable(e,!0));const n=e.filter(function(r){return t.indexOf(r)<0});if(n.length&&!u)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+n);return this};fe.prototype.disable=function(e,u){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){t=t.concat(this[r].ruler.disable(e,!0))},this),t=t.concat(this.inline.ruler2.disable(e,!0));const n=e.filter(function(r){return t.indexOf(r)<0});if(n.length&&!u)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+n);return this};fe.prototype.use=function(e){const u=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,u),this};fe.prototype.parse=function(e,u){if(typeof e!="string")throw new Error("Input data should be a String");const t=new this.core.State(e,this,u);return this.core.process(t),t.tokens};fe.prototype.render=function(e,u){return u=u||{},this.renderer.render(this.parse(e,u),this.options,u)};fe.prototype.parseInline=function(e,u){const t=new this.core.State(e,this,u);return t.inlineMode=!0,this.core.process(t),t.tokens};fe.prototype.renderInline=function(e,u){return u=u||{},this.renderer.render(this.parseInline(e,u),this.options,u)};ye("c-content",{},()=>{const e=fe({html:!0,linkify:!0,typographer:!0}),u=Wt.reduce((t,n)=>(t.push(n),n.children&&t.push(...n.children),t),[]);return()=>`
    <div class="max-w-[calc(100vw-20px)]">
      ${u.map(t=>`
            <div class="content" id="${t.slug}">
              ${e.render(t.content.trim())}
            </div>
            ${t.examples?`<div class="examples max-w-[880px]">${t.examples}</div>`:""}
          `).join("<br />")}
    </div>
  `});ye("c-pointer",{plugins:[Gt()]},({state:e,onPointerMove:u,host:t,computed:n})=>{e.position={x:0,y:0},u(({x:s,y:c})=>{t.updateState({position:{x:s,y:c}})});const r=n(()=>`transform: translateX(${e.position.x}px);`),i=n(()=>`transform: translateY(${e.position.y}px);`),o=n(()=>`transform: translate(${e.position.x}px, ${e.position.y}px);`);return()=>`
    <div class="fixed w-screen h-screen pointer-events-none">
      <div
        class="absolute w-px h-screen bg-black rounded-full opacity-5" bind:style="${r}"></div>
      <div
        class="absolute w-screen h-px bg-black rounded-full opacity-5" bind:style="${i}"></div>
      <div
        class="absolute w-2 h-2 -ml-1 -mt-1 bg-[#BF5735] rounded-full" bind:style="${o}"></div>
    </div>
  `});const Pt=[{x:260,y:420},{x:310,y:420},{x:355,y:420},{x:400,y:420},{x:450,y:420},{x:489,y:420},{x:489,y:420},{x:450,y:420},{x:400,y:420},{x:355,y:420},{x:310,y:420},{x:260,y:420},{x:260,y:420}],$t=[{x:260,y:420},{x:310,y:420},{x:355,y:420},{x:400,y:420},{x:450,y:420},{x:489,y:420},{x:489,y:550},{x:450,y:580},{x:400,y:600},{x:355,y:600},{x:310,y:580},{x:260,y:550},{x:260,y:550}];ye("c-header",{plugins:[Gt(),Ht(),Cr(),xu()]},({refs:e,onPointerMove:u,onWindowScroll:t,actions:n,createLerp:r,runLerp:i,onMount:o,timer:s,onWindowResize:c})=>{let f={x:window.innerWidth*.5,y:window.innerHeight*.5};const p=()=>{if(e.left){const m=e.left,k=m.getBoundingClientRect(),x=Math.atan2(f.y-k.top,f.x-k.left),_=f.x-k.left,y=f.y-k.top;let A=Math.sqrt(_*_+y*y)/10;A=Ye(0,A,90);const v=Math.cos(x)*A,F=Math.sin(x)*A;m.style.transform=`translate(${v}px, ${F}px)`}if(e.right){const m=e.right,k=m.getBoundingClientRect(),x=Math.atan2(f.y-k.top,f.x-k.left),_=f.x-k.left,y=f.y-k.top;let A=Math.sqrt(_*_+y*y)/10;A=Ye(0,A,90);const v=Math.cos(x)*A,F=Math.sin(x)*A;m.style.transform=`translate(${v}px, ${F}px)`}};u(({x:m,y:k})=>{f={x:m,y:k},p()}),t(()=>p());const a=r({from:0,to:0,lerp:.4}),d=Pt.map(m=>({...m,x:m.x+355,y:m.y-20})),l=$t.map(m=>({...m,x:m.x+355,y:m.y-20}));i(a,m=>{const k=e["eyelip-left"],x=e["eyelip-right"];if(k&&x){const _=qt(Pt,$t,m);k.setAttribute("d",zt(_));const y=qt(d,l,m);x.setAttribute("d",zt(y))}});let h=!1;o(()=>{window.addEventListener("pointerdown",n.close),window.addEventListener("pointerup",()=>{h||n.open()}),s.setTimeout(()=>{n.close(),s.setTimeout(()=>{n.open()},250)},750),g()});const g=()=>{const m=Math.random()*500+5500;s.setTimeout(()=>{n.close(),s.setTimeout(()=>{n.open(),g()},250)},m)};return c(()=>{h=window.innerWidth<768,e["left-path"]&&e["left-path"].setAttribute("d",Ut([{x:50,y:833},{x:-5e3,y:3300},{x:-5e3,y:4300},{x:187,y:938},{x:140,y:820}])),e["right-path"]&&e["right-path"].setAttribute("d",Ut([{x:1083,y:769},{x:6e3,y:2500},{x:6e3,y:3500},{x:953,y:886},{x:1030,y:770}]))}),n.close=()=>{a.setTarget(1),h&&s.setTimeout(()=>{n.open()},250)},n.open=()=>{a.setTarget(0)},()=>`
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
    `});function Rs(e){if(!e.length)return"";let u=`M ${e[0].x} ${e[0].y}`;for(let t=1;t<e.length;t++)u+=` L ${e[t].x} ${e[t].y}`;return u}function zt(e,u=!1){if(!e.length)return"";if(e.length===1)return`M ${e[0].x} ${e[0].y}`;let t=e,n="";if(u&&t.length>2)t=[e[e.length-2],...e,e[1]];else if(t.length<4){n=`M ${t[0].x} ${t[0].y}`;for(let r=1;r<t.length;r++)n+=` L ${t[r].x} ${t[r].y}`;return n}n=`M ${t[0].x} ${t[0].y}`;for(let r=0;r<t.length-3;r++){const i=t[r],o=t[r+1],s=t[r+2],c=t[r+3],f=o.x+(s.x-i.x)/6,p=o.y+(s.y-i.y)/6,a=s.x-(c.x-o.x)/6,d=s.y-(c.y-o.y)/6;n+=` C ${f} ${p}, ${a} ${d}, ${s.x} ${s.y}`}return u&&(n+=" Z"),n}function qt(e,u,t){if(e.length!==u.length||e.length===0||u.length===0)throw new Error("Coordinate arrays must be non-empty and of the same length");return e.map((n,r)=>{const i=u[r];return{x:n.x+(i.x-n.x)*t,y:n.y+(i.y-n.y)*t}})}function Ut(e){const u=Math.atan2(e[1].y-e[0].y,e[1].x-e[0].x),t=Math.atan2(e[2].y-e[3].y,e[2].x-e[3].x),n={x:e[0].x+Math.cos(u)*window.innerWidth*2,y:e[0].y+Math.sin(u)*window.innerWidth*2},r={x:e[2].x+Math.cos(t)*window.innerWidth*2,y:e[2].y+Math.sin(t)*window.innerWidth*2};return Rs([e[0],n,r,e[3],e[4]])}const mu="[A-Za-z$_][0-9A-Za-z$_]*",yn=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],En=["true","false","null","undefined","NaN","Infinity"],kn=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],vn=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Cn=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],An=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],wn=[].concat(Cn,kn,vn);function Os(e){const u=e.regex,t=(z,{after:re})=>{const se="</"+z[0].slice(1);return z.input.indexOf(se,re)!==-1},n=mu,r={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,o={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(z,re)=>{const se=z[0].length+z.index,de=z.input[se];if(de==="<"||de===","){re.ignoreMatch();return}de===">"&&(t(z,{after:se})||re.ignoreMatch());let Ae;const Ie=z.input.substring(se);if(Ae=Ie.match(/^\s*=/)){re.ignoreMatch();return}if((Ae=Ie.match(/^\s+extends\s+/))&&Ae.index===0){re.ignoreMatch();return}}},s={$pattern:mu,keyword:yn,literal:En,built_in:wn,"variable.language":An},c="[0-9](_?[0-9])*",f=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",a={className:"number",variants:[{begin:`(\\b(${p})((${f})|\\.)?|(${f}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${f})\\b|\\.)?|(${f})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},l={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},h={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"css"}},g={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},m={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,d]},x={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:n+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},_=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,l,h,g,m,{match:/\$\d+/},a];d.contains=_.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(_)});const y=[].concat(x,d.contains),C=y.concat([{begin:/(\s*)\(/,end:/\)/,keywords:s,contains:["self"].concat(y)}]),A={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:C},v={variants:[{match:[/class/,/\s+/,n,/\s+/,/extends/,/\s+/,u.concat(n,"(",u.concat(/\./,n),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,n],scope:{1:"keyword",3:"title.class"}}]},F={relevance:0,match:u.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...kn,...vn]}},U={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},G={variants:[{match:[/function/,/\s+/,n,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[A],illegal:/%/},$={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function be(z){return u.concat("(?!",z.join("|"),")")}const ve={match:u.concat(/\b/,be([...Cn,"super","import"].map(z=>`${z}\\s*\\(`)),n,u.lookahead(/\s*\(/)),className:"title.function",relevance:0},ae={begin:u.concat(/\./,u.lookahead(u.concat(n,/(?![0-9A-Za-z$_(])/))),end:n,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},le={match:[/get|set/,/\s+/,n,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},A]},Ce="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",Ge={match:[/const|var|let/,/\s+/,n,/\s*/,/=\s*/,/(async\s*)?/,u.lookahead(Ce)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[A]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:C,CLASS_REFERENCE:F},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),U,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,l,h,g,m,x,{match:/\$\d+/},a,F,{scope:"attr",match:n+u.lookahead(":"),relevance:0},Ge,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[x,e.REGEXP_MODE,{className:"function",begin:Ce,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:C}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:r.begin,end:r.end},{match:i},{begin:o.begin,"on:begin":o.isTrulyOpeningTag,end:o.end}],subLanguage:"xml",contains:[{begin:o.begin,end:o.end,skip:!0,contains:["self"]}]}]},G,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[A,e.inherit(e.TITLE_MODE,{begin:n,className:"title.function"})]},{match:/\.\.\./,relevance:0},ae,{match:"\\$"+n,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[A]},ve,$,v,le,{match:/\$[(.]/}]}}function Is(e){const u=e.regex,t=Os(e),n=mu,r=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],i={begin:[/namespace/,/\s+/,e.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},o={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:r},contains:[t.exports.CLASS_REFERENCE]},s={className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/},c=["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"],f={$pattern:mu,keyword:yn.concat(c),literal:En,built_in:wn.concat(r),"variable.language":An},p={className:"meta",begin:"@"+n},a=(g,m,k)=>{const x=g.contains.findIndex(_=>_.label===m);if(x===-1)throw new Error("can not find mode to replace");g.contains.splice(x,1,k)};Object.assign(t.keywords,f),t.exports.PARAMS_CONTAINS.push(p);const d=t.contains.find(g=>g.scope==="attr"),l=Object.assign({},d,{match:u.concat(n,u.lookahead(/\s*\?:/))});t.exports.PARAMS_CONTAINS.push([t.exports.CLASS_REFERENCE,d,l]),t.contains=t.contains.concat([p,i,o,l]),a(t,"shebang",e.SHEBANG()),a(t,"use_strict",s);const h=t.contains.find(g=>g.label==="func.def");return h.relevance=0,Object.assign(t,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),t}function Ls(e){const u=e.regex,t={},n={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[t]}]};Object.assign(t,{className:"variable",variants:[{begin:u.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},n]});const r={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},i=e.inherit(e.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),o={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},s={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,t,r]};r.contains.push(s);const c={match:/\\"/},f={className:"string",begin:/'/,end:/'/},p={match:/\\'/},a={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,t]},d=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],l=e.SHEBANG({binary:`(${d.join("|")})`,relevance:10}),h={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},g=["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],m=["true","false"],k={match:/(\/[a-z._-]+)+/},x=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],_=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias"],y=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],C=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:g,literal:m,built_in:[...x,..._,"set","shopt",...y,...C]},contains:[l,e.SHEBANG(),h,a,i,o,k,s,c,f,p,t]}}const jt="[A-Za-z$_][0-9A-Za-z$_]*",Bs=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],Ps=["true","false","null","undefined","NaN","Infinity"],Dn=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Sn=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Fn=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],$s=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],zs=[].concat(Fn,Dn,Sn);function qs(e){const u=e.regex,t=(z,{after:re})=>{const se="</"+z[0].slice(1);return z.input.indexOf(se,re)!==-1},n=jt,r={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,o={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(z,re)=>{const se=z[0].length+z.index,de=z.input[se];if(de==="<"||de===","){re.ignoreMatch();return}de===">"&&(t(z,{after:se})||re.ignoreMatch());let Ae;const Ie=z.input.substring(se);if(Ae=Ie.match(/^\s*=/)){re.ignoreMatch();return}if((Ae=Ie.match(/^\s+extends\s+/))&&Ae.index===0){re.ignoreMatch();return}}},s={$pattern:jt,keyword:Bs,literal:Ps,built_in:zs,"variable.language":$s},c="[0-9](_?[0-9])*",f=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",a={className:"number",variants:[{begin:`(\\b(${p})((${f})|\\.)?|(${f}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${f})\\b|\\.)?|(${f})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},l={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},h={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"css"}},g={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},m={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,d]},x={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:n+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},_=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,l,h,g,m,{match:/\$\d+/},a];d.contains=_.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(_)});const y=[].concat(x,d.contains),C=y.concat([{begin:/(\s*)\(/,end:/\)/,keywords:s,contains:["self"].concat(y)}]),A={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:C},v={variants:[{match:[/class/,/\s+/,n,/\s+/,/extends/,/\s+/,u.concat(n,"(",u.concat(/\./,n),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,n],scope:{1:"keyword",3:"title.class"}}]},F={relevance:0,match:u.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Dn,...Sn]}},U={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},G={variants:[{match:[/function/,/\s+/,n,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[A],illegal:/%/},$={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function be(z){return u.concat("(?!",z.join("|"),")")}const ve={match:u.concat(/\b/,be([...Fn,"super","import"].map(z=>`${z}\\s*\\(`)),n,u.lookahead(/\s*\(/)),className:"title.function",relevance:0},ae={begin:u.concat(/\./,u.lookahead(u.concat(n,/(?![0-9A-Za-z$_(])/))),end:n,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},le={match:[/get|set/,/\s+/,n,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},A]},Ce="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",Ge={match:[/const|var|let/,/\s+/,n,/\s*/,/=\s*/,/(async\s*)?/,u.lookahead(Ce)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[A]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:C,CLASS_REFERENCE:F},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),U,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,l,h,g,m,x,{match:/\$\d+/},a,F,{scope:"attr",match:n+u.lookahead(":"),relevance:0},Ge,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[x,e.REGEXP_MODE,{className:"function",begin:Ce,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:C}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:r.begin,end:r.end},{match:i},{begin:o.begin,"on:begin":o.isTrulyOpeningTag,end:o.end}],subLanguage:"xml",contains:[{begin:o.begin,end:o.end,skip:!0,contains:["self"]}]}]},G,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[A,e.inherit(e.TITLE_MODE,{begin:n,className:"title.function"})]},{match:/\.\.\./,relevance:0},ae,{match:"\\$"+n,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[A]},ve,$,v,le,{match:/\$[(.]/}]}}function Us(e){const u=e.regex,t=u.concat(/[\p{L}_]/u,u.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),n=/[\p{L}0-9._:-]+/u,r={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},i={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},o=e.inherit(i,{begin:/\(/,end:/\)/}),s=e.inherit(e.APOS_STRING_MODE,{className:"string"}),c=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),f={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:n,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[r]},{begin:/'/,end:/'/,contains:[r]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[i,c,s,o,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[i,o,c,s]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},r,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[c]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[f],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[f],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:u.concat(/</,u.lookahead(u.concat(t,u.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:t,relevance:0,starts:f}]},{className:"tag",begin:u.concat(/<\//,u.lookahead(u.concat(t,/>/))),contains:[{className:"name",begin:t,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}Pe.registerLanguage("typescript",Is);Pe.registerLanguage("javascript",qs);Pe.registerLanguage("bash",Ls);Pe.registerLanguage("xml",Us);Pe.configure({languages:["typescript","ts","javascript","js","bash","sh"],ignoreUnescapedHTML:!0,cssSelector:"pre code"});Pe.highlightAll();Ar();
