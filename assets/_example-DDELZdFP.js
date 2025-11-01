import{j as e,c as $,R as ze,a as Me,b as ft,r as i,d as Oe,i as Lt,e as le,f as Vt,g as ht,I as A,h as ie,B as P,k as Bt,l as Et,P as gt,C as J,m as Ge,n as Ue,U as _t,o as At,D as Ae,S as st,p as Ht,q as zt,s as ct,t as ut,v as Gt,F as f,T as Fe,w as Ie,x as dt,y as Ut,O as Kt,M as He,z as Xt,A as Te,E as we,L as O}from"./index-3zfdHyOq.js";import{u as qt}from"./index-BTVJ9fpZ.js";function mt(r){const{type:o="horizontal",...l}=r;return e.jsx("div",{...l,className:$("ui-divider",{[`ui-divider-${o}`]:o},r.className)})}function Jt(r){const{size:o=100,strokeWidth:l=8,value:u=0,color:y="#000000",text:m}=r,h=o/2,C=h-l/2,x=2*Math.PI*C;return e.jsxs("svg",{...r,className:$("ui-progress",r.className),width:o,height:o,viewBox:`0 0 ${o} ${o}`,children:[e.jsx("circle",{fill:"transparent",stroke:"#e5e7eb",strokeWidth:l,cx:h,cy:h,r:C}),e.jsx("circle",{fill:"transparent",stroke:y,strokeWidth:l,cx:h,cy:h,r:C,strokeDasharray:x,strokeDashoffset:x-u/100*x,style:{transition:"stroke-dashoffset 0.3s ease",transform:"rotate(-90deg)",transformOrigin:"50% 50%"}}),e.jsx("text",{x:"50%",y:"50%",textAnchor:"middle",dominantBaseline:"middle",style:{fill:y,fontSize:o/5},children:m??`${u}%`})]})}function Yt(r){const{open:o,onOpenChange:l,render:u,...y}=r,m=ze.Children.only(r.children),[h,C]=Me(m.props.ref),[x,d]=Me(r.ref),[g,k]=ft(x,o,l),[R,se]=i.useState([0,0]),H=Oe(x,()=>V());i.useLayoutEffect(()=>{!g.close&&!g.remove&&(V(),H.observe())},[g.close,g.remove,R]);const V=()=>{if(g.close||g.remove)return;if(!h.current||!x.current||!Lt(h.current)){k.close();return}const[N,ue]=R,{height:Y,width:j}=x.current.getBoundingClientRect(),b={top:ue,left:N};b.top+Y>window.innerHeight&&(b.top-=Y),b.top<0&&(b.top=0),b.left+j>window.innerWidth&&(b.left-=j),b.left<0&&(b.left=0),x.current.style.top=`${b.top}px`,x.current.style.left=`${b.left}px`},ce=N=>{N.preventDefault(),k.open(),se([N.clientX,N.clientY])};return le("resize",k.close,!0),le("scroll",k.close,!0),Oe(h,k.close),Vt("click",k.close,x),e.jsxs(e.Fragment,{children:[ze.cloneElement(m,{ref:C,onContextMenu:N=>{m.props.onContextMenu?.(N),ce(N)}}),!g.remove&&ht.createPortal(e.jsx("div",{...y,ref:d,className:$("ui-context-menu",{"ui-context-menu-close":g.close},r.className),children:u}),document.body)]})}function Qt(r){const{open:o,onClose:l,position:u="top",type:y,duration:m=3e3,...h}=r,[C,x]=Me(r.ref),[d,g]=ft(C,o,k=>!k&&l?.());return i.useEffect(()=>{if(!d.remove&&m){const k=setTimeout(g.close,m);return()=>clearTimeout(k)}},[d.remove]),!d.remove&&ht.createPortal(e.jsxs("div",{...h,ref:x,className:$("ui-message",{[`ui-message-${u}`]:u,[`ui-message-${y}`]:y,"ui-message-close":d.close},r.className),children:[y&&e.jsx(A,{className:"ui-message-icon",children:{info:"info",success:"check_circle",error:"cancel",warning:"error",loading:"progress_activity"}[y]}),e.jsx("span",{children:r.children})]}),document.body)}function pt(r){const[o,l]=i.useState(!1),[u,y]=i.useState(0),[m,h]=i.useState();return[i.useMemo(()=>({open:(x,d,g)=>{l(!0),y(k=>k+1),h({type:x,content:d,duration:g})},close:()=>l(!1)}),[]),e.jsx(ze.Fragment,{children:m&&e.jsx(Qt,{open:o,onClose:()=>l(!1),position:r?.position,type:m.type,duration:m.duration,children:m.content})},u)]}function yt(r){const{total:o=10,page:l,onPageChange:u,...y}=r,[m,h]=ie(l,u,1),C=i.useMemo(()=>{const d=[];let g=m??1;const k=g<1||g>o?1:g;for(let R=k-4;R<=o;R++){if(d.length===5){if(k<R-2)break;d.shift()}R>0&&d.push(R)}return d[0]!==1&&d.unshift(1),d[d.length-1]!==o&&o>0&&d.push(o),d.length<=5||(d[0]+1!==d[1]&&d.splice(1,0,"prev"),d[d.length-1]-1!==d[d.length-2]&&d.splice(d.length-1,0,"next")),d},[o,m]);i.useEffect(()=>{(!m||m<1||m>o)&&h(1)},[m,o]);const x=d=>{let g=(m??1)+d;g<1?g=1:g>o&&(g=o),h(g)};return e.jsxs("div",{...y,className:$("ui-pagination",r.className),translate:"no",children:[e.jsx(P,{variant:"text",onClick:()=>x(-1),disabled:m===1,children:e.jsx(A,{children:"keyboard_arrow_left"})}),e.jsx("div",{className:"ui-pagination-group",children:C.map((d,g)=>typeof d=="string"?e.jsx(P,{variant:"text",onClick:()=>h(d==="prev"?C[g+1]-1:C[g-1]+1),children:e.jsx(A,{children:"more_horiz"})},d):e.jsx(P,{variant:d===m?"outlined":"text",onClick:()=>h(d),children:d},d))}),e.jsx(P,{variant:"text",onClick:()=>x(1),disabled:m===o,children:e.jsx(A,{children:"keyboard_arrow_right"})})]})}function xt(r){return e.jsx("table",{...r,className:$("ui-table",r.className),children:r.children})}function bt(r){const{rowLength:o=1,colLength:l=1,rowHeight:u,colWidth:y,children:m,overscan:h=0,...C}=r,[x,d]=Me(r.ref),[g,k]=i.useState({height:0,width:0}),[R,se]=i.useState({top:0,left:0}),[H,V,ce,N]=i.useMemo(()=>{const j=Array.from({length:o}).map((D,F)=>u?.(F)),b=Array.from({length:l}).map((D,F)=>y?.(F)),T=j.reduce((D,F)=>D+(F??0),0),L=b.reduce((D,F)=>D+(F??0),0);return[j,b,T,L]},[o,l,u,y]),[ue,Y]=i.useMemo(()=>{let j=[],b=0,T=-1,L=-1;for(let S=0;S<H.length;S++){const K=b+(H[S]??1/0);j.push({rowIndex:S,top:b,height:H[S]}),R.top+g.height>b&&R.top<K&&(T===-1&&(T=Math.max(S-h,0)),L=Math.min(S+h+1,H.length)),b=K}j=j.slice(T,L);let D=[],F=0;T=-1,L=-1;for(let S=0;S<V.length;S++){const K=F+(V[S]??1/0);D.push({colIndex:S,left:F,width:V[S]}),R.left+g.width>F&&R.left<K&&(T===-1&&(T=Math.max(S-h,0)),L=Math.min(S+h+1,V.length)),F=K}return D=D.slice(T,L),[j,D]},[g.height,g.width,R.top,R.left,H,V,h]);return Oe(x,()=>{x.current&&k({height:x.current.clientHeight,width:x.current.clientWidth})}),e.jsx("div",{...C,ref:d,className:$("ui-virtual-scroll",r.className),onScroll:j=>{const b=j.target;se({top:b.scrollTop,left:b.scrollLeft}),r.onScroll?.(j)},children:e.jsx("div",{style:{height:ce||void 0,width:N||void 0},children:ue.map(({rowIndex:j,top:b,height:T})=>Y.map(({colIndex:L,left:D,width:F})=>e.jsx("div",{style:{top:b,left:D,height:T,width:F||"100%"},children:m?.(j,L)},`${j}-${L}`)))})})}const Z=r=>typeof r=="string"?r:JSON.stringify(r)??"";function De(r){const{fields:o,data:l,idKey:u="id",gridlines:y=!0,pageSize:m,page:h,onPageChange:C,virtualScroll:x=!1,overscan:d=0,fieldHeight:g=32,fieldWidth:k,itemHeight:R,selection:se,onSelection:H,onHover:V,defaultSort:ce,sort:N,onSort:ue,defaultFilter:Y,filter:j,onFilter:b,filterMode:T="and",onResize:L,onDragField:D,fieldRender:F,cellRender:S,footer:K,...kt}=r,v=i.useRef(null),B=i.useRef({}),We=i.useRef(null),ke=i.useRef(null),de=i.useRef(0),z=i.useRef(null),X=i.useRef(null),[ee,Ke]=i.useState(!0),[G,vt]=i.useState({height:0,width:0}),[Ct,Rt]=i.useState({height:0,width:0}),[te,jt]=i.useState({top:0,left:0}),[oe,St]=i.useState({}),[me,Pt]=i.useState({}),[Xe,qe]=i.useState(),[$e,Ft]=i.useState({}),[pe,Je]=ie(h,C,1),[M,Ye]=ie(se,H),[fe,he]=ie(void 0,V),[E,Qe]=ie(N,ue,ce),[q,Ne]=ie(j,b,Y),[It,ve]=i.useState(""),[Le,Tt]=i.useState(""),[Ve,Ce]=i.useState([]),[Ze,re]=i.useState(),[Be,et]=i.useState(),[wt,tt]=i.useState(!1),[Dt,ot]=i.useState(!1),Re=i.useMemo(()=>Le?Ve.filter(a=>Z(a.value).toUpperCase().includes(Le.toUpperCase())):Ve,[Ve,Le]),ge=i.useMemo(()=>{if(!l)return[];let a=[...l];if(o&&q&&Object.values(q).find(c=>c.length)){const c=new Map(o.map(t=>[t.key,t]));a=a.filter(t=>{let s=!0;for(const[n,p]of Object.entries(q)){const W=c.get(n);if(W&&p.length){s=!1;const _=new Map(W.filterOptions?.map(w=>[w.value,w.rule]));for(const w of p){const Q=_.get(w);if(s=Q?Q(t):Z(w)===Z(t[n]),s)break}if(T==="and"&&!s||T==="or"&&s)break}}return s})}return E?.key&&E?.order&&a.sort((c,t)=>{let s=c[E.key],n=t[E.key],p;return typeof s=="string"&&typeof n=="string"?p=s.localeCompare(n):(Number.isFinite(s)&&(Number.isFinite(n)||typeof n=="string")||Number.isFinite(n)&&(Number.isFinite(s)||typeof n=="string")||typeof s=="boolean"&&typeof n=="boolean")&&(p=s-n),p!==void 0?E.order==="desc"?p*-1:p:(s=Z(s),n=Z(n),+(!s||s==="null")-+(!n||n==="null"))}),a},[o,l,q,T,E]),ye=i.useMemo(()=>{let a=ge;if(m&&m>0&&pe&&pe>0){const c=(pe-1)*m;a=a.slice(c,c+m)}return a},[ge,m,pe]),rt=i.useMemo(()=>{if(!o)return{};const a={};for(const c of o)a[c.key]=k?.(c);return a},[o,k]),[xe,Mt]=i.useMemo(()=>{const a=ye.map(t=>Math.max(R?.(t)??32,24)),c=a.reduce((t,s)=>t+s,0);return[a,c]},[ye,R]),je=i.useMemo(()=>Math.max(g,24),[g]),ae=i.useMemo(()=>{if(!o)return{};const a={};for(const c of o){const t=c.key;a[t]=Math.max(rt[t]??$e[t]??Xe?.[t]??oe[t]??0,me[t]??0)}return a},[o,rt,oe,me,Xe,$e]),[Ee,_e,ne]=i.useMemo(()=>{if(!o)return[[],[],[]];let a=[],c=[],t=[];for(const s of o){const n=ae[s.key];s.fixed==="left"?a.push({field:s,width:n}):s.fixed==="right"?t.push({field:s,width:n}):c.push({field:s,width:n})}return[a,c,t]},[o,ae]),at=i.useMemo(()=>{let a=[],c=je,t=-1,s=-1;for(let n=0;n<xe.length;n++){const p=c+xe[n];a.push({item:ye[n],top:c-je,height:xe[n]}),x&&(ee?n<10+d:te.top+G.height>c&&te.top<p)&&(t===-1&&(t=Math.max(n-d,0)),s=Math.min(n+d+1,xe.length)),c=p}return x&&(a=a.slice(t,s)),a},[ye,G.height,te.top,je,xe,d,ee]);i.useEffect(()=>{it()},[o]),i.useEffect(()=>{ve("")},[o,l]),i.useEffect(()=>{const a=Object.keys(oe),c=a.reduce((s,n)=>s+oe[n],0),t={};if(c<G.width){let s=G.width;for(let n=0;n<a.length;n++)t[a[n]]=Math.floor(oe[a[n]]*G.width/c),s-=t[a[n]],n===a.length-1&&(t[a[n]]+=s);qe(t)}else qe(void 0)},[G.width,oe,ee]),i.useEffect(()=>{Je(1)},[ge]),i.useEffect(()=>{v.current?.scrollTo({top:0})},[ye]);const nt=()=>{if(!v.current)return;const{clientHeight:a,clientWidth:c,scrollWidth:t,scrollHeight:s}=v.current;a&&c&&(vt({height:a,width:c}),Rt({height:s,width:t}))},it=()=>{v.current?.clientWidth&&(Ke(!0),setTimeout(()=>{const a={},c={};for(const[t,s]of Object.entries(B.current))s&&(a[t]=s.offsetWidth,c[t]=s.firstElementChild.offsetWidth);St(a),Pt(c),Ke(!1)}))},Ot=a=>{if(!l){Ce([]);return}setTimeout(()=>{if(a.filterOptions)Ce(a.filterOptions);else{const c=[],t=[];for(const s of l){const n=s[a.key],p=Z(s[a.key]);p&&!t.includes(p)&&(c.push(n),t.push(p))}Ce(c.map((s,n)=>({value:s,label:t[n]})))}},100)},Wt=(a,c)=>{const t={[a]:[],...q},s=t[a];t[a]=s.includes(c)?s.filter(n=>n!==c):[...s,c],Ne(t)},Se=a=>{if(de.current)return;function c(){v.current&&(v.current.scrollLeft+=a,de.current=requestAnimationFrame(c))}de.current=requestAnimationFrame(c)},Pe=()=>{cancelAnimationFrame(de.current),de.current=0};return Oe(v,nt),Bt(v,nt,{childList:!0}),Et(v,([a])=>a.isIntersecting&&ee&&it()),le("mousemove",a=>{if(!z.current||!v.current)return;const c=a,{field:t,startX:s,scrollLeft:n}=z.current,p=v.current.scrollLeft-n,W=c.clientX-(s-p),_=t.fixed!=="right"?1:-1;if(z.current.width=Math.max(ae[t.key]+W*_,me[t.key]),We.current){const Q=Math[_>0?"max":"min"](W,(me[t.key]-ae[t.key])*_);We.current.style.translate=`${Q-p}px`}const w=v.current.getBoundingClientRect();z.current.width>me[t.key]&&(c.clientX>w.right?Se(5):c.clientX<w.left?Se(-5):Pe())},!0),le("mouseup",()=>{if(!z.current)return;const{field:a,width:c}=z.current;c!==ae[a.key]&&(Ft({...$e,[a.key]:c}),L?.(a,c)),Pe(),re(void 0),tt(!1),z.current=null},!0),le("mousemove",a=>{if(!X.current||!v.current||!o)return;const c=a,{field:t,startX:s}=X.current,n=c.clientX-s,p=v.current.getBoundingClientRect(),W=B.current[t.key];if(!Be&&W){const _=W.getBoundingClientRect();et({left:_.left-p.left,width:ae[t.key]})}if(ke.current){ke.current.style.translate=`${n}px`;const _=ke.current.getBoundingClientRect(),w=o.filter(I=>I.fixed===t.fixed),Q=w.indexOf(t);let be=-1;if(n<0)for(let I=0;I<Q;I++){const U=B.current[w[I].key]?.getBoundingClientRect();if(U&&U.left>=_.left){be=I;break}}else for(let I=w.length-1;I>Q;I--){const U=B.current[w[I].key]?.getBoundingClientRect();if(U&&U.right<=_.right){be=I;break}}if(be!==-1){const I=w[be],U=B.current[I.key]?.getBoundingClientRect();if(U){let $t=v.current.clientTop,lt=n<0?U.left-p.left:U.right-p.left,Nt=I.fixed?10:9;I.fixed!=="left"&&be===w.length-1&&(lt-=2),re({top:$t,left:lt,zIndex:Nt}),X.current.targetIndex=o.indexOf(I)}}else re(void 0),X.current.targetIndex=-1}c.clientX>p.right?Se(5):c.clientX<p.left?Se(-5):Pe()},!0),le("mouseup",()=>{if(!X.current||!o)return;const{field:a,targetIndex:c}=X.current;if(c!==-1){const t=o.indexOf(a),s=[...o];s.splice(t,1),s.splice(c,0,a),D?.({sourceField:a,sourceIndex:t,targetIndex:c,newFields:s})}Pe(),re(void 0),et(void 0),ot(!1),X.current=null},!0),e.jsxs("div",{...kt,className:$("ui-data-table",{"ui-data-table-gridlines":y,"ui-data-table-rendering":ee,"ui-data-table-resizing":wt,"ui-data-table-dragging":Dt},r.className),children:[e.jsx("div",{ref:v,className:"ui-data-table-group",onScroll:a=>{const c=a.target;jt({top:c.scrollTop,left:c.scrollLeft}),ve(""),r.onScroll?.(a)},children:[Ee,_e,ne].map((a,c)=>!!a.length&&e.jsx("div",{className:$({"ui-data-table-left":a===Ee,"ui-data-table-right":a===ne,"ui-data-table-main":a===_e,"ui-data-table-shadow":a===Ee&&te.left>=1||a===ne&&te.left+G.width<=Ct.width-1}),children:e.jsxs(xt,{children:[e.jsx("thead",{children:e.jsx("tr",{children:a.map(({field:t,width:s})=>e.jsxs("th",{ref:n=>{B.current[t.key]=n},align:t.align,className:$({"ui-data-table-hover":fe&&fe.key===t.key&&fe.id===void 0,"ui-data-table-selected":M&&M.key===t.key&&M.id===void 0}),style:{cursor:t.draggable&&t.key===M?.key&&M.id===void 0?"grab":""},children:[e.jsxs("div",{className:"ui-data-table-field",style:{height:je,width:s},onClick:()=>Ye({key:t.key}),onMouseMove:n=>{const p=n.target;B.current[t.key]?.contains(p)?he({key:t.key}):he({})},onMouseLeave:()=>he({}),onMouseDown:n=>{const p=B.current[t.key];!t.draggable||!p||!(t.key===M?.key&&M.id===void 0)||(X.current={field:t,startX:n.clientX,targetIndex:-1},ot(!0))},children:[e.jsx("div",{children:F?F(t):t.name}),(t.sortable||t.sortable===void 0)&&e.jsxs("button",{className:"ui-data-table-sort","data-sort":t.key===E?.key?E?.order:void 0,onClick:n=>{if(n.stopPropagation(),t.key===E?.key){const p=[void 0,"asc","desc"];Qe({key:t.key,order:p[p.indexOf(E.order)+1]})}else Qe({key:t.key,order:"asc"})},children:[e.jsx(A,{children:"arrow_drop_up"}),e.jsx(A,{children:"arrow_drop_down"})]}),(t.filterable||t.filterable===void 0)&&e.jsx(gt,{trigger:"click",position:"bottom",className:"ui-data-table-popover",onClick:n=>n.stopPropagation(),open:t.key===It,onOpenChange:n=>{ve(n?t.key:""),n?Ot(t):Ce([])},render:e.jsxs(J,{children:[e.jsx(J.Title,{children:e.jsx(Ge,{onValueChange:Tt,placeholder:"Search"})}),e.jsx(J.Content,{children:e.jsx(bt,{style:{height:140},rowLength:Re.length,rowHeight:()=>28,overscan:10,children:n=>e.jsx(Ue,{value:q?.[t.key]?.includes(Re[n].value),onValueChange:()=>Wt(t.key,Re[n].value),children:Re[n].label})})}),e.jsxs(J.Footer,{children:[e.jsx(P,{variant:"text",color:"info",onClick:()=>{Ne({...q,[t.key]:Y?.[t.key]??[]})},children:"Reset"}),e.jsx(P,{variant:"text",color:"info",onClick:()=>{Ne({...q}),ve("")},children:"OK"})]})]}),children:e.jsx("button",{className:"ui-data-table-filter",onClick:n=>n.stopPropagation(),children:e.jsx(A,{size:16,children:"filter_alt"})})})]}),t.resizable&&e.jsx("button",{className:"ui-data-table-resize",style:{[a===ne?"left":"right"]:-7,width:15},onMouseEnter:()=>{const n=B.current[t.key];if(!v.current||!n)return;const p=v.current.getBoundingClientRect(),W=n.getBoundingClientRect();re({top:v.current.clientTop,left:a!==ne?W.right-p.left-2:W.left-p.left,zIndex:a!==_e?10:9})},onMouseLeave:()=>!z.current&&re(void 0),onMouseDown:()=>{const n=B.current[t.key];if(!n)return;const p=n.getBoundingClientRect();z.current={field:t,startX:a!==ne?p.right-1:p.left+1,scrollLeft:te.left,width:s},tt(!0)}})]},t.key))})}),!!at.length&&e.jsx("tbody",{style:{height:ee?void 0:Mt},translate:"no",children:at.map(({item:t,top:s,height:n})=>e.jsx("tr",{className:$({"ui-data-table-hover":fe&&fe.id===t[u],"ui-data-table-selected":M&&M.id===t[u]}),style:{top:s},children:a.map(({field:p,width:W})=>e.jsx("td",{align:p.align,className:$({"ui-data-table-selected":M&&M.key===p.key&&M.id===void 0}),onClick:()=>Ye({key:p.key,id:t[u]}),onMouseEnter:()=>he({key:p.key,id:t[u]}),onMouseLeave:()=>he({}),children:e.jsx("div",{className:"ui-data-table-cell",style:{height:n,width:W},children:S?S(p,t):Z(t[p.key])})},p.key))},t[u]))}),K&&e.jsx("tfoot",{children:e.jsx("tr",{children:a.map(({field:t,width:s})=>e.jsx("td",{align:t.align,className:$({"ui-data-table-selected":t.key===M?.key&&M.id===void 0}),children:e.jsx("div",{style:{width:s},children:K(t)})},t.key))})})]})},["left","main","right"][c]))}),Ze&&e.jsx("div",{ref:We,className:"ui-data-table-split-line",style:{height:G.height,width:2,...Ze}}),Be&&e.jsx("div",{ref:ke,className:"ui-data-table-drag-block",style:{height:G.height,...Be}}),m&&e.jsx(yt,{total:ge.length&&m?Math.ceil(ge.length/m):1,page:pe,onPageChange:Je})]})}const to={Button:{examples:[{name:"Outlined",Component:()=>e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx(P,{variant:"outlined",children:"Button"}),e.jsx(P,{variant:"filled",children:"Button"}),e.jsx(P,{variant:"text",children:"Button"}),e.jsx(P,{variant:"icon",children:e.jsx(A,{children:"home"})})]}),code:`
import { Button, Icon } from '@cakeui/react'

export default () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button variant='outlined'>Button</Button>
      <Button variant='filled'>Button</Button>
      <Button variant='text'>Button</Button>
      <Button variant='icon'><Icon>home</Icon></Button>
    </div>
  )
}
        `}],props:`
type ButtonProps = React.ComponentPropsWithRef<'button'> & {
  variant?: 'outlined' | 'filled' | 'text' | 'icon'            // default: outlined
  color?: 'default' | 'info' | 'success' | 'warning' | 'error' // default: 'default'
}
    `},Divider:{examples:[{name:"Horizontal",Component:()=>e.jsxs("div",{style:{width:"100%"},children:[e.jsx("div",{children:"Item 1"}),e.jsx(mt,{}),e.jsx("div",{children:"Item 2"})]}),code:`
import { Divider } from '@cakeui/react'

export default () => {
  return (
    <>
      <div>Item 1</div>
      <Divider />
      <div>Item 2</div>
    </>
  )
}
        `},{name:"Vertical",Component:()=>e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Item 1"}),e.jsx(mt,{type:"vertical"}),e.jsx("span",{children:"Item 2"})]}),code:`
import { Divider } from '@cakeui/react'

export default () => {
  return (
    <>
      <div>Item 1</div>
      <Divider type='vertical' />
      <div>Item 2</div>
    </>
  )
}
        `}],props:`
type DividerProps = React.ComponentPropsWithRef<'div'> & {
  type?: 'horizontal' | 'vertical' // default: 'horizontal'
}
    `},Icon:{examples:[{name:"Example",Component:()=>e.jsx(A,{children:"home"}),code:`
import { Icon } from '@cakeui/react'

export default () => {
  return (
    <Icon>home</Icon>
  )
}
        `}],props:`
// https://fonts.google.com/icons
type IconProps = React.ComponentPropsWithRef<'span'> & {
  family?: string  // default: 'Material Symbols Rounded'
  size?: number    // default: 20
}
    `},Layout:{examples:[{name:"Example 1",Component:()=>e.jsxs(O,{style:{height:300,border:"1px solid lightgray"},children:[e.jsx(O.Header,{children:"Header"}),e.jsxs(O,{children:[e.jsx(O.Sider,{children:"Sider"}),e.jsx(O.Main,{children:"Main"}),e.jsx(O.Sider,{children:"Sider"})]}),e.jsx(O.Footer,{children:"Footer"})]}),code:`
import { Layout } from '@cakeui/react'

export default () => {
  return (
    <Layout>
      <Layout.Header>Header</Layout.Header>
      <Layout>
        <Layout.Sider>Sider</Layout.Sider>
        <Layout.Main>Main</Layout.Main>
        <Layout.Sider>Sider</Layout.Sider>
      </Layout>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  )
}
        `},{name:"Example 2",Component:()=>e.jsxs(O,{style:{height:300,border:"1px solid lightgray"},children:[e.jsx(O.Sider,{children:"Sider"}),e.jsxs(O,{children:[e.jsx(O.Header,{children:"Header"}),e.jsx(O.Main,{children:"Main"}),e.jsx(O.Footer,{children:"Footer"})]}),e.jsx(O.Sider,{children:"Sider"})]}),code:`
import { Layout } from '@cakeui/react'

export default () => {
  return (
    <Layout>
      <Layout.Sider>Sider</Layout.Sider>
      <Layout>
        <Layout.Header>Header</Layout.Header>
        <Layout.Main>Main</Layout.Main>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
      <Layout.Sider>Sider</Layout.Sider>
    </Layout>
  )
}
        `}],props:`
type LayoutProps = React.ComponentPropsWithRef<'div'>
type LayoutHeaderProps = React.ComponentPropsWithRef<'header'>
type LayoutMainProps = React.ComponentPropsWithRef<'main'>
type LayoutFooterProps = React.ComponentPropsWithRef<'footer'>
type LayoutSiderProps = React.ComponentPropsWithRef<'aside'>
    `},ThemeToggle:{examples:[{name:"Example",Component:()=>{const[r,o]=qt();return e.jsx(P,{variant:"icon",onClick:o,children:e.jsx(A,{children:r==="light"?"dark_mode":"light_mode"})})},code:`
import { Icon, useThemeToggle } from '@cakeui/react'

export default () => {
  const [theme, toggle] = useThemeToggle()

  return (
    <Button variant='icon' onClick={toggle}>
      <Icon>{theme === 'light' ? 'dark_mode' : 'light_mode'}</Icon>
    </Button>
  )
}
        `}],props:`
function useThemeToggle(
  localStorageKey?: string // default: 'theme'
): [ThemeToggleState, ThemeToggleFunction]

type ThemeToggleState = 'light' | 'dark'
type ThemeToggleFunction = () => void
    `},Progress:{examples:[{name:"Example",Component:()=>e.jsx(Jt,{value:30}),code:`
import { Progress } from '@cakeui/react'

export default () => {
  return (
    <Progress value={30} />
  )
}
        `}],props:`
type ProgressProps = React.ComponentPropsWithRef<'svg'> & {
  size?: number        // default: 100
  strokeWidth?: number // default: 8
  value?: number       // default: 0
  color?: string       // default: '#000000'
  text?: string
}
    `},ContextMenu:{examples:[{name:"Example",Component:()=>e.jsx(Yt,{render:"Content",children:e.jsx(P,{children:"Right click me"})}),code:`
import { Button, ContextMenu } from '@cakeui/react'

export default () => {
  return (
    <ContextMenu render='Content'>
      <Button>Right click me</Button>
    </ContextMenu>
  )
}
        `}],props:`
type ContextMenuProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean,
  onOpenChange?: (open: boolean) => void
  render?: React.ReactNode
}
    `},Dialog:{examples:[{name:"Example",Component:()=>{const[r,o]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(P,{onClick:()=>o(!0),children:"Open Dialog"}),e.jsxs(we,{open:r,onClose:()=>o(!1),children:[e.jsx(we.Title,{children:"Title"}),e.jsx(we.Content,{children:"Content"}),e.jsx(we.Footer,{children:"Footer"})]})]})},code:`
import { useState } from 'react'
import { Button, Dialog } from '@cakeui/react'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Dialog.Title>Title</Dialog.Title>
        <Dialog.Content>Content</Dialog.Content>
        <Dialog.Footer>Footer</Dialog.Footer>
      </Dialog>
    </>
  )
}
        `}],props:`
type DialogProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean
  onClose?: () => void
  overlay?: boolean         // default: true
  outsideClosable?: boolean // default: true
}
type DialogTitleProps = React.ComponentPropsWithRef<'div'>
type DialogContentProps = React.ComponentPropsWithRef<'div'>
type DialogFooterProps = React.ComponentPropsWithRef<'div'>
    `},Drawer:{examples:[{name:"Example",Component:()=>{const[r,o]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(P,{onClick:()=>o(!0),children:"Open Drawer"}),e.jsxs(Te,{open:r,onClose:()=>o(!1),children:[e.jsx(Te.Title,{children:"Title"}),e.jsx(Te.Content,{children:"Content"}),e.jsx(Te.Footer,{children:"Footer"})]})]})},code:`
import { useState } from 'react'
import { Button, Drawer } from '@cakeui/react'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Title>Title</Drawer.Title>
        <Drawer.Content>Content</Drawer.Content>
        <Drawer.Footer>Footer</Drawer.Footer>
      </Drawer>
    </>
  )
}
        `}],props:`
type DrawerProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean
  onClose?: () => void
  position?: 'left' | 'right' | 'top' | 'bottom' // default: 'right'
  overlay?: boolean                              // default: true
  outsideClosable?: boolean                      // default: true
}
type DrawerTitleProps = React.ComponentPropsWithRef<'div'>
type DrawerContentProps = React.ComponentPropsWithRef<'div'>
type DrawerFooterProps = React.ComponentPropsWithRef<'div'>
    `},Dropdown:{examples:[{name:"Example",Component:()=>e.jsx(Xt,{render:"Content",children:e.jsx(P,{children:"Hover me"})}),code:`
import { Dropdown } from '@cakeui/react'

export default () => {
  return (
    <Dropdown render='Content'>
      <Button>Hover me</Button>
    </Dropdown>
  )
}
        `}],props:`
type DropdownProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  render?: React.ReactNode
  trigger?: 'hover' | 'click'            // default: 'hover'
  position?: 'left' | 'right' | 'center' // default: 'left'
  offset?: number                        // default: 4
}
    `},Menu:{examples:[{name:"Horizontal",Component:()=>{const r=[{key:"1",name:"Item 1"},{key:"2",name:"Item 2"},{key:"3",name:"Group 3",subMenus:[{key:"3-1",name:"Item 3-1"},{key:"3-2",name:"Item 3-2"},{key:"3-3",name:"Item 3-3"}]}];return e.jsx(He,{style:{border:"1px solid lightgray"},menus:r})},code:`
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      subMenus: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu
      style={{ border: '1px solid lightgray' }}
      menus={menus}
    />
  )
}
        `},{name:"Vertical",Component:()=>{const r=[{key:"1",name:"Item 1"},{key:"2",name:"Item 2"},{key:"3",name:"Group 3",subMenus:[{key:"3-1",name:"Item 3-1"},{key:"3-2",name:"Item 3-2"},{key:"3-3",name:"Item 3-3"}]}];return e.jsx(He,{style:{border:"1px solid lightgray"},menus:r,type:"vertical"})},code:`
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      subMenus: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu
      style={{ border: '1px solid lightgray' }}
      menus={menus}
      type='vertical'
    />
  )
}
        `},{name:"Inline",Component:()=>{const r=[{key:"1",name:"Item 1"},{key:"2",name:"Item 2"},{key:"3",name:"Group 3",subMenus:[{key:"3-1",name:"Item 3-1"},{key:"3-2",name:"Item 3-2"},{key:"3-3",name:"Item 3-3"}]}];return e.jsx(He,{style:{border:"1px solid lightgray"},menus:r,type:"vertical",inline:!0})},code:`
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      subMenus: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu
      style={{ border: '1px solid lightgray' }}
      menus={menus}
      type='vertical'
      inline
    />
  )
}
        `}],props:`
export type MenuProps = React.ComponentPropsWithRef<'div'> & {
  menus?: MenuItem[]
  openKeys?: string[]
  onOpenKeysChange?: (keys: string[]) => void
  type?: 'horizontal' | 'vertical' // default: 'horizontal'
  inline?: boolean                 // default: false
}
export type MenuItem<T extends React.ElementType = any> = React.ComponentPropsWithRef<T> & {
  key: string
  name?: React.ReactNode
  subMenus?: MenuItem[]
  as?: React.ElementType           // default: 'button'
}
    `},Message:{examples:[{name:"Example",Component:()=>{const[r,o]=pt();return e.jsxs(e.Fragment,{children:[o,e.jsx(P,{onClick:()=>r.open("info","Message"),children:"Show Message"})]})},code:`
import { Button, useMessage } from '@cakeui/react'

export default () => {
  const [message, element] = useMessage()

  return (
    <>
      {element}
      <Button onClick={() => message.open('info', 'Message')}>
        Show Message
      </Button>
    </>
  )
}
        `}],props:`
function useMessage(options?: MessageOptions): [MessageApi, React.ReactNode]

type MessageOptions = {
  position?: MessagePosition  // default: 'top
}
type MessageApi = {
  open: (
    type: MessageType,
    message: React.ReactNode,
    duration?: number         // default: 3000
  ) => void
  close: () => void
}
type MessagePosition = 'top' | 'bottom'
type MessageType = '' | 'info' | 'success' | 'error' | 'warning' | 'loading'
    `},Overlay:{examples:[{name:"Example",Component:()=>{const[r,o]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(P,{onClick:()=>o(!0),children:"Open Overlay"}),e.jsx(Kt,{open:r,onClick:()=>o(!1)})]})},code:`
import { useState } from 'react'
import { Button, Overlay } from '@cakeui/react'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Overlay</Button>
      <Overlay open={open} onClick={() => setOpen(false)} />
    </>
  )
}
        `}],props:`
type OverlayProps = React.ComponentPropsWithRef<'div'> & {
  open?: boolean
}
    `},Popover:{examples:[{name:"Example",Component:()=>e.jsx(gt,{render:"Content",children:e.jsx(P,{children:"Hover me"})}),code:`
import { Button, Popover } from '@cakeui/react'

export default () => {
  return (
    <Popover render='Content'>
      <Button>Hover me</Button>
    </Popover>
  )
}
        `}],props:`
type PopoverProps =React.ComponentPropsWithRef<'div'> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  render?: React.ReactNode
  trigger?: 'hover' | 'click'                   // default: 'hover'
  position?:                                    // default: 'top'
    'top' | 'top-left' | 'top-right' |
    'bottom' | 'bottom-left' | 'bottom-right' |
    'left' | 'left-top' | 'left-bottom' |
    'right' | 'right-top' | 'right-bottom'
  offset?: number                               // default: 4
}
    `},Calendar:{examples:[{name:"Example",Component:()=>e.jsx(Ut,{}),code:`
import { Calendar } from '@cakeui/react'

export default () => {
  return (
    <Calendar />
  )
}
        `}],props:`
type CalendarProps = React.ComponentPropsWithRef<'div'> & {
  month?: dayjs.ConfigType
  onMonthChange?: (month: dayjs.Dayjs) => void
  min?: dayjs.ConfigType // default: null
  max?: dayjs.ConfigType // default: null
  header?: React.ReactNode
  weekRender?: (week: number) => React.ReactNode
  dateRender?: (date: dayjs.Dayjs) => React.ReactNode
}
    `},Card:{examples:[{name:"Example",Component:()=>e.jsxs(J,{children:[e.jsx(J.Title,{children:"Title"}),e.jsx(J.Content,{children:"Content"}),e.jsx(J.Footer,{children:"Footer"})]}),code:`
import { Card } from '@cakeui/react'

export default () => {
  return (
    <Card>
      <Card.Title>Title</Card.Title>
      <Card.Content>Content</Card.Content>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  )
}
        `}],props:`
type CardProps = React.ComponentPropsWithRef<'div'>
type CardTitleProps = React.ComponentPropsWithRef<'div'>
type CardContentProps = React.ComponentPropsWithRef<'div'>
type CardFooterProps = React.ComponentPropsWithRef<'div'>
    `},Carousel:{examples:[{name:"Example",Component:()=>{const[r]=i.useState(()=>Array.from({length:5}).map((o,l)=>({key:l+1,content:`item ${l+1}`})));return e.jsx(dt,{style:{height:200},infinite:!0,arrows:!0,draggable:!0,children:r.map(o=>e.jsx(dt.Item,{style:{width:"50%",border:"1px solid lightgray",margin:6,padding:8},children:o.content},o.key))})},code:`
import { useState } from 'react'
import { Carousel } from '@cakeui/react'

export default () => {
  const [items] = useState(() => (
    Array.from(({ length: 5 })).map((_, i) => ({
      key: \`\${i + 1}\`,
      content: \`item \${i + 1}\`
    }))
  ))

  return (
    <Carousel style={{ height: 200 }} infinite arrows draggable>
      {items.map((item) => (
        <Carousel.Item
          key={item.key}
          style={{
            width: '50%',
            border: '1px solid lightgray',
            margin: 6,
            padding: 8
          }}
        >
          {item.content}
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
        `}],props:`
type CarouselProps = React.ComponentPropsWithRef<'div'> & {
  activeKey?: string
  onActiveKeyChange?: (key: string) => void
  infinite?: boolean     // default: false
  arrows?: boolean       // default: false
  dots?: boolean         // default: true
  draggable?: boolean    // default: false
  autoplay?: boolean     // default: false
  autoplayDelay?: number // default: 3000
}
type CarouselItemProps = React.ComponentPropsWithRef<'div'>
    `},Collapse:{examples:[{name:"Example",Component:()=>{const[r]=i.useState(()=>Array.from({length:3}).map((o,l)=>({key:`${l+1}`,trigger:`Trigger ${l+1}`,content:`Content ${l+1}`})));return e.jsx(Ie,{children:r.map(o=>e.jsxs(Ie.Item,{children:[e.jsx(Ie.Trigger,{children:o.trigger}),e.jsx(Ie.Content,{children:o.content})]},o.key))})},code:`
import { useState } from 'react'
import { Collapse } from '@cakeui/react'

export default () => {
  const [items] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      key: \`\${i + 1}\`,
      trigger: \`Trigger \${i + 1}\`,
      content: \`Content \${i + 1}\`
    }))
  ))

  return (
    <Collapse>
      {items.map((item) => (
        <Collapse.Item key={item.key}>
          <Collapse.Trigger>{item.trigger}</Collapse.Trigger>
          <Collapse.Content>{item.content}</Collapse.Content>
        </Collapse.Item>
      ))}
    </Collapse>
  )
}
        `}],props:`
type CollapseProps = React.ComponentPropsWithRef<'div'> & {
  openKeys?: string[]
  onOpenKeysChange?: (keys: string[]) => void
}
type CollapseItemProps = React.ComponentPropsWithRef<'div'>
type CollapseTriggerProps = React.ComponentPropsWithRef<'button'>
type CollapseContentProps = React.ComponentPropsWithRef<'div'>
    `},Pagination:{examples:[{name:"Example",Component:()=>e.jsx(yt,{}),code:`
import { Pagination } from '@cakeui/react'

export default () => {
  return (
    <Pagination />
  )
}
        `}],props:`
type PaginationProps = React.ComponentPropsWithRef<'div'> & {
  total?: number // default: 10
  page?: number
  onPageChange?: (page: number) => void
}
    `},Table:{examples:[{name:"Example",Component:()=>{const[r]=i.useState(()=>Array.from({length:3}).map((l,u)=>({key:`key${u+1}`,name:`col ${u+1}`}))),[o]=i.useState(()=>Array.from({length:3}).map((l,u)=>({id:u,...r.reduce((y,m,h)=>({...y,[m.key]:`data ${u+1}-${h+1}`}),{})})));return e.jsxs(xt,{children:[e.jsx("thead",{children:e.jsx("tr",{children:r.map(l=>e.jsx("th",{children:l.name},l.key))})}),e.jsx("tbody",{children:o.map(l=>e.jsx("tr",{children:r.map(u=>e.jsx("td",{children:l[u.key]},u.key))},l.id))}),e.jsx("tfoot",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:3,align:"center",children:"footer"})})})]})},code:`
import { useState } from 'react'
import { Table } from '@cakeui/react'

export default () => {
  const [cols] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`
    }))
  ))
  const [data] = useState<{ [k: string]: any }[]>(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      ...cols.reduce((prev, curr, j) => ({
        ...prev,
        [curr.key]: \`data \${i + 1}-\${j + 1}\`
      }), {})
    }))
  ))

  return (
    <Table>
      <thead>
        <tr>
          {cols.map((col) => (
            <th key={col.key}>{col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {cols.map((col) => (
              <td key={col.key}>{item[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} align='center'>footer</td>
        </tr>
      </tfoot>
    </Table>
  )
}
        `}],props:`
type TableProps = React.ComponentPropsWithRef<'table'>
    `},Tabs:{examples:[{name:"Example",Component:()=>{const[r]=i.useState(()=>Array.from({length:3}).map((o,l)=>({key:`${l+1}`,trigger:`Tab ${l+1}`,content:`Content ${l+1}`})));return e.jsxs(Fe,{children:[e.jsx(Fe.List,{children:r.map(o=>e.jsx(Fe.Trigger,{children:o.trigger},o.key))}),r.map(o=>e.jsx(Fe.Content,{children:o.content},o.key))]})},code:`
import { useState } from 'react'
import { Tabs } from '@cakeui/react'

export default () => {
  const [items] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      key: \`\${i + 1}\`,
      trigger: \`Tab \${i + 1}\`,
      content: \`Content \${i + 1}\`
    }))
  ))

  return (
    <Tabs>
      <Tabs.List>
        {items.map((item) => (
          <Tabs.Trigger key={item.key}>{item.trigger}</Tabs.Trigger>
        ))}
      </Tabs.List>
      {items.map((item) => (
        <Tabs.Content key={item.key}>{item.content}</Tabs.Content>
      ))}
    </Tabs>
  )
}
        `}],props:`
type TabsProps = React.ComponentPropsWithRef<'div'> & {
  activeKey?: string
  onActiveKeyChange?: (key: string) => void
  destroyInactive?: boolean // default: false
}
type TabsListProps = React.ComponentPropsWithRef<'div'>
type TabsTriggerProps<T extends React.ElementType = any> = React.ComponentPropsWithRef<T> & {
  as?: React.ElementType    // defaut: 'button'
}
type TabsContentProps = React.ComponentPropsWithRef<'div'>
    `},VirtualScroll:{examples:[{name:"Example",Component:()=>{const r=i.useCallback(()=>60,[]),o=i.useCallback(()=>60,[]);return e.jsx(bt,{style:{height:300,width:300,border:"1px solid lightgray"},rowLength:100,colLength:100,rowHeight:r,colWidth:o,children:(l,u)=>`${l}-${u}`})},code:`
import { useCallback } from 'react'
import { VirtualScroll } from '@cakeui/react'

export default () => {
  const rowHeight = useCallback(() => 60, [])
  const colWidth = useCallback(() => 60, [])

  return (
    <VirtualScroll
      style={{
        height: 300,
        width: 300,
        border: '1px solid lightgray'
      }}
      rowLength={100}
      colLength={100}
      rowHeight={rowHeight}
      colWidth={colWidth}
    >
      {(rowIndex, colIndex) => \`\${rowIndex}-\${colIndex}\`}
    </VirtualScroll>
  )
}
        `}],props:`
type VirtualScrollProps = Omit<
  React.ComponentPropsWithRef<'div'>, 'children'
> & {
  rowLength?: number
  colLength?: number
  rowHeight?: (index: number) => number
  colWidth?: (index: number) => number
  children?: (rowIndex: number, colIndex: number) => React.ReactNode
  overscan?: number
}
    `},DataTable:{examples:[{name:"Example",Component:()=>{const[r]=i.useState(()=>[{key:"id",name:"id",fixed:"left"},...Array.from({length:10}).map((l,u)=>({key:`key${u+1}`,name:`col ${u+1}`,resizable:!0}))]),[o]=i.useState(()=>Array.from({length:10}).map((l,u)=>({...r.reduce((y,m,h)=>({...y,[m.key]:`data ${u+1}-${h}`}),{}),id:u+1})));return e.jsx(De,{style:{height:364},fields:r,data:o})},code:`
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields] = useState<DataTableField[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 10 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      resizable: true
    }))
  ])
  const [data] = useState<DataTableItem[]>(() => (
    Array.from({ length: 10 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i + 1}-\${j}\`
      }), {}),
      id: i + 1
    }))
  ))

  return (
    <DataTable
      style={{ height: 364 }}
      fields={fields}
      data={data}
    />
  )
}
        `},{name:"Pagination",Component:()=>{const[r]=i.useState(()=>[{key:"id",name:"id",fixed:"left"},...Array.from({length:10}).map((l,u)=>({key:`key${u+1}`,name:`col ${u+1}`,resizable:!0}))]),[o]=i.useState(()=>Array.from({length:100}).map((l,u)=>({...r.reduce((y,m,h)=>({...y,[m.key]:`data ${u+1}-${h}`}),{}),id:u+1})));return e.jsx(De,{style:{height:404},fields:r,data:o,pageSize:10})},code:`
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields] = useState<DataTableField[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 10 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      resizable: true
    }))
  ])
  const [data] = useState<DataTableItem[]>(() => (
    Array.from({ length: 100 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i + 1}-\${j}\`
      }), {}),
      id: i + 1
    }))
  ))

  return (
    <DataTable
      style={{ height: 404 }}
      fields={fields}
      data={data}
      pageSize={10}
    />
  )
}
        `},{name:"VirtualScroll",Component:()=>{const[r]=i.useState(()=>[{key:"id",name:"id",fixed:"left"},...Array.from({length:10}).map((l,u)=>({key:`key${u+1}`,name:`col ${u+1}`,resizable:!0}))]),[o]=i.useState(()=>Array.from({length:1e3}).map((l,u)=>({...r.reduce((y,m,h)=>({...y,[m.key]:`data ${u+1}-${h}`}),{}),id:u+1})));return e.jsx(De,{style:{height:364},fields:r,data:o,virtualScroll:!0})},code:`
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields] = useState<DataTableField[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 10 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      resizable: true
    }))
  ])
  const [data] = useState<DataTableItem[]>(() => (
    Array.from({ length: 1000 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i + 1}-\${j}\`
      }), {}),
      id: i + 1
    }))
  ))

  return (
    <DataTable
      style={{ height: 364 }}
      fields={fields}
      data={data}
      virtualScroll
    />
  )
}
        `},{name:"Draggable",Component:()=>{const[r,o]=i.useState(()=>[{key:"id",name:"id",fixed:"left"},...Array.from({length:10}).map((u,y)=>({key:`key${y+1}`,name:`col ${y+1}`,draggable:!0}))]),[l]=i.useState(()=>Array.from({length:10}).map((u,y)=>({...r.reduce((m,h,C)=>({...m,[h.key]:`data ${y+1}-${C}`}),{}),id:y+1})));return e.jsx(De,{style:{height:364},fields:r,data:l,onDragField:u=>o(u.newFields)})},code:`
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields, setFields] = useState<DataTableField[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 10 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      draggable: true
    }))
  ])
  const [data] = useState<DataTableItem[]>(() => (
    Array.from({ length: 10 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i + 1}-\${j}\`
      }), {}),
      id: i + 1
    }))
  ))

  return (
    <DataTable
      style={{ height: 364 }}
      fields={fields}
      data={data}
      onDragField={(result) => setFields(result.newFields)}
    />
  )
}
        `}],props:`
type DataTableProps = React.ComponentPropsWithRef<'div'> & {
  fields?: DataTableField[]
  data?: DataTableItem[]
  idKey?: string                      // default: 'id'
  gridlines?: boolean                 // default: true
  pageSize?: number
  page?: number
  onPageChange?: (page: number) => void
  virtualScroll?: boolean             // default: false
  overscan?: number                   // default: 0
  fieldHeight?: number                // default: 32
  fieldWidth?: (field: DataTableField) => number
  itemHeight?: (item: DataTableItem) => number
  selection?: DataTableTarget
  onSelection?: (selection: DataTableTarget) => void
  onHover?: (hover: DataTableTarget) => void
  defaultSort?: DataTableSort
  sort?: DataTableSort
  onSort?: (sort: DataTableSort) => void
  defaultFilter?: DataTableFilter
  filter?: DataTableFilter
  onFilter?: (filter: DataTableFilter) => void
  filterMode?: 'and' | 'or'           // default: 'and'
  onResize?: (field: DataTableField, width: number) => void
  onDragField?: (result: DataTableDragResult) => void
  fieldRender?: (field: DataTableField) => React.ReactNode
  cellRender?: (field: DataTableField, item: DataTableItem) => React.ReactNode
  footer?: (field: DataTableField) => React.ReactNode
}
type DataTableField = {
  key: string
  name: string
  fixed?: 'left' | 'right'
  align?: 'left' | 'right' | 'center' // default: 'left'
  sortable?: boolean                  // default: true
  filterable?: boolean                // default: true
  filterOptions?: DataTableFilterOption[]
  resizable?: boolean                 // default: false
  draggable?: boolean                 // default: false
}
type DataTableItem = {
  [k: string]: any
}
type DataTableTarget = {
  key?: string
  id?: any
}
type DataTableSort = {
  key?: string
  order?: 'asc' | 'desc'
}
type DataTableFilter = {
  [k: string]: any[]
}
type DataTableFilterOption = {
  value: any,
  label: React.ReactNode
  rule?: (item: DataTableItem) => boolean
}
type DataTableDragResult = {
  newFields: DataTableField[]
  sourceField: DataTableField
  sourceIndex: number
  targetIndex: number
}
    `},Form:{examples:[{name:"All Fields",Component:()=>e.jsxs(f,{cols:2,children:[e.jsx(f.Item,{title:"Text",children:e.jsx(f.Input,{name:"text"})}),e.jsx(f.Item,{title:"Password",children:e.jsx(f.Password,{name:"password"})}),e.jsx(f.Item,{title:"Number",children:e.jsx(f.InputNumber,{name:"number"})}),e.jsx(f.Item,{title:"Textarea",children:e.jsx(f.Textarea,{name:"textarea",autoRows:!0})}),e.jsx(f.Item,{title:"Radio",children:e.jsx(f.Radio,{name:"radio",children:"Radio"})}),e.jsx(f.Item,{title:"Radio Group",children:e.jsx(f.RadioGroup,{name:"radioGroup",options:[{value:"1",label:"radio 1"},{value:"2",label:"radio 2"},{value:"3",label:"radio 3"}]})}),e.jsx(f.Item,{title:"Checkbox",children:e.jsx(f.Checkbox,{name:"checkbox",children:"checkbox"})}),e.jsx(f.Item,{title:"Checkbox Group",children:e.jsx(f.CheckboxGroup,{name:"checkboxGroup",options:[{value:"1",label:"checkbox 1"},{value:"2",label:"checkbox 2"},{value:"3",label:"checkbox 3"}]})}),e.jsx(f.Item,{title:"Switch",children:e.jsx(f.Switch,{name:"switch"})}),e.jsx(f.Item,{title:"Slider",children:e.jsx(f.Slider,{name:"slider"})}),e.jsx(f.Item,{title:"Select",children:e.jsx(f.Select,{name:"select",options:[{value:"1",label:"option 1"},{value:"2",label:"option 2"},{value:"3",label:"option 3"}]})}),e.jsx(f.Item,{title:"Select Multiple",children:e.jsx(f.Select,{name:"selectMultiple",options:[{value:"1",label:"option 1"},{value:"2",label:"option 2"},{value:"3",label:"option 3"}],multiple:!0})}),e.jsx(f.Item,{title:"Date",children:e.jsx(f.DatePicker,{name:"date"})}),e.jsx(f.Item,{title:"Datetime",children:e.jsx(f.DatePicker,{name:"datetime",type:"datetime"})}),e.jsx(f.Item,{title:"Time",children:e.jsx(f.DatePicker,{name:"time",type:"time"})}),e.jsx(f.Item,{title:"Color",children:e.jsx(f.ColorPicker,{name:"color"})}),e.jsx(f.Item,{title:"Upload",children:e.jsx(f.Upload,{name:"upload"})}),e.jsx(f.Item,{colSpan:2,children:e.jsx(f.Button,{children:"Submit"})})]}),code:`
import { Form } from '@cakeui/react'

export default () => {
  return (
    <Form cols={2}>
      <Form.Item title='Text'>
        <Form.Input name='text' />
      </Form.Item>
      <Form.Item title='Password'>
        <Form.Password name='password' />
      </Form.Item>
      <Form.Item title='Number'>
        <Form.InputNumber name='number' />
      </Form.Item>
      <Form.Item title='Textarea'>
        <Form.Textarea name='textarea' autoRows />
      </Form.Item>
      <Form.Item title='Radio'>
        <Form.Radio name='radio' />
      </Form.Item>
      <Form.Item title='Radio Group'>
        <Form.RadioGroup
          name='radioGroup'
          options={[
            { value: '1', label: 'radio 1' },
            { value: '2', label: 'radio 2' },
            { value: '3', label: 'radio 3' }
          ]}
        />
      </Form.Item>
      <Form.Item title='Checkbox'>
        <Form.Checkbox name='checkbox'>checkbox</Form.Checkbox>
      </Form.Item>
      <Form.Item title='Checkbox Group'>
        <Form.CheckboxGroup
          name='checkboxGroup'
          options={[
            { value: '1', label: 'checkbox 1' },
            { value: '2', label: 'checkbox 2' },
            { value: '3', label: 'checkbox 3' }
          ]}
        />
      </Form.Item>
      <Form.Item title='Switch'>
        <Form.Switch name='switch' />
      </Form.Item>
      <Form.Item title='Slider'>
        <Form.Slider name='slider' />
      </Form.Item>
      <Form.Item title='Select'>
        <Form.Select
          name='select'
          options={[
            { value: '1', label: 'option 1' },
            { value: '2', label: 'option 2' },
            { value: '3', label: 'option 3' }
          ]}
        />
      </Form.Item>
      <Form.Item title='Select Multiple'>
        <Form.Select
          name='selectMultiple'
          options={[
            { value: '1', label: 'option 1' },
            { value: '2', label: 'option 2' },
            { value: '3', label: 'option 3' }
          ]}
          multiple
        />
      </Form.Item>
      <Form.Item title='Date'>
        <Form.DatePicker name='date' />
      </Form.Item>
      <Form.Item title='Datetime'>
        <Form.DatePicker name='datetime' type='datetime' />
      </Form.Item>
      <Form.Item title='Time'>
        <Form.DatePicker name='time' type='time' />
      </Form.Item>
      <Form.Item title='Color'>
        <Form.ColorPicker name='color' />
      </Form.Item>
      <Form.Item title='Upload'>
        <Form.Upload name='upload' />
      </Form.Item>
      <Form.Item colSpan={2}>
        <Form.Button>Submit</Form.Button>
      </Form.Item>
    </Form>
  )
}
        `},{name:"Validation",Component:()=>{const[r,o]=pt();return e.jsxs(e.Fragment,{children:[o,e.jsxs(f,{onSubmit:()=>r.open("success","Form submitted!"),onValidate:(l,u)=>{if(l==="username"&&!u)return"Username is required.";if(l==="password")if(u){if(u.length<8)return"Password must be at least 8 characters."}else return"Password is required."},children:[e.jsx(f.Item,{title:"Username",children:e.jsx(f.Input,{name:"username"})}),e.jsx(f.Item,{title:"Password",children:e.jsx(f.Password,{name:"password"})}),e.jsx(f.Item,{colSpan:2,children:e.jsx(f.Button,{children:"Submit"})})]})]})},code:`
import { Form, useMessage } from '@cakeui/react'

export default () => {
  const [message, element] = useMessage()

  return (
    <>
      {element}
      <Form
        onSubmit={() => message.open('success', 'Form submitted!')}
        onValidate={(key, value) => {
          if (key === 'username') {
            if (!value) {
              return 'Username is required.'
            }
          }
          if (key === 'password') {
            if (!value) {
              return 'Password is required.'
            } else if (value.length < 8) {
              return 'Password must be at least 8 characters.'
            }
          }
        }}
      >
        <Form.Item title='Username'>
          <Form.Input name='username' />
        </Form.Item>
        <Form.Item title='Password'>
          <Form.Password name='password' />
        </Form.Item>
        <Form.Item colSpan={2}>
          <Form.Button>Submit</Form.Button>
        </Form.Item>
      </Form>
    </>
  )
}
        `}],props:`
type FormProps = Omit<
  React.ComponentPropsWithRef<'form'>, 'onSubmit'
> & {
  defaultValues?: FormValues
  values?: FormValues
  onValuesChange?: (values: FormValues) => void
  onValidate?: (key: string, value: any) => (string | void) | Promise<string | void>
  onSubmit?: (event: React.FormEvent<HTMLFormElement>, values: any) => void
  cols?: number        // default: 1
  rowGap?: number      // default: 0
  colGap?: number      // default: 16
  colMinWidth?: number // default: 200
}
type FormItemProps = Omit<
  React.ComponentPropsWithRef<'div'>, 'title'
> & {
  title?: React.ReactNode
  info?: React.ReactNode
  rowSpan?: number     // default: 1
  colSpan?: number     // default: 1
}
type FormValues = {
  [k: string]: any
}
    `},Input:{examples:[{name:"Text",Component:()=>e.jsx(Ge,{}),code:`
import { Input } from '@cakeui/react'

export default () => {
  return (
    <Input />
  )
}
        `},{name:"Password",Component:()=>e.jsx(Ge.Password,{}),code:`
import { Input } from '@cakeui/react'

export default () => {
  return (
    <Input.Password />
  )
}
        `}],props:`
type InputProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  before?: React.ReactNode
  after?: React.ReactNode
}
type InputPasswordProps = InputProps & {
  visibilityToggle?: boolean // default: true
}
    `},InputNumber:{examples:[{name:"Example",Component:()=>e.jsx(Gt,{}),code:`
import { InputNumber } from '@cakeui/react'

export default () => {
  return (
    <InputNumber />
  )
}
        `}],props:`
type InputNumberProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: number
  value?: number
  onValueChange?: (value: number | null) => void
  controls?: boolean // default: true
  before?: React.ReactNode
  after?: React.ReactNode
}
    `},Textarea:{examples:[{name:"Example",Component:()=>e.jsx(ut,{}),code:`
import { Textarea } from '@cakeui/react'

export default () => {
  return (
    <Textarea autoRows />
  )
}
        `},{name:"Auto Rows",Component:()=>e.jsx(ut,{autoRows:!0}),code:`
import { Textarea } from '@cakeui/react'

export default () => {
  return (
    <Textarea />
  )
}
        `}],props:`
type TextareaProps = Omit<
  React.ComponentPropsWithRef<'textarea'>, 'defaultValue' | 'value'
> &  {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  autoRows?: boolean // default: false
}
    `},Radio:{examples:[{name:"Example",Component:()=>e.jsx(ct,{children:"radio"}),code:`
import { Radio } from '@cakeui/react'

export default () => {
  return (
    <Radio>radio</Radio>
  )
}
        `},{name:"Group",Component:()=>{const[r]=i.useState(()=>Array.from({length:3}).map((o,l)=>({value:`${l+1}`,label:`radio ${l+1}`})));return e.jsx(ct.Group,{options:r})},code:`
import { useState } from 'react'
import { Radio } from '@cakeui/react'

export default () => {
  const [options] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      value: \`\${i + 1}\`,
      label: \`radio \${i + 1}\`
    }))
  ))

  return (
    <Radio.Group options={options} />
  )
}
        `}],props:`
type RadioProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}
type RadioGroupProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  options?: RadioOption[]
}
type RadioOption = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

    `},Checkbox:{examples:[{name:"Example",Component:()=>e.jsx(Ue,{children:"checkbox"}),code:`
import { Checkbox } from '@cakeui/react'

export default () => {
  return (
    <Checkbox>checkbox</Checkbox>
  )
}
        `},{name:"Group",Component:()=>{const[r]=i.useState(()=>Array.from({length:3}).map((o,l)=>({value:`${l+1}`,label:`checkbox ${l+1}`})));return e.jsx(Ue.Group,{options:r})},code:`
import { useState } from 'react'
import { Checkbox } from '@cakeui/react'

export default () => {
  const [options] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      value: \`\${i + 1}\`,
      label: \`checkbox \${i + 1}\`
    }))
  ))

  return (
    <Checkbox.Group options={options} />
  )
}
        `}],props:`
type CheckboxProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: boolean
  value?: boolean
  onValueChange?: (value: boolean) => void
  indeterminate?: boolean // default: false
}
type CheckboxGroupProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  options?: CheckboxOption[]
}
type CheckboxOption = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}
    `},Switch:{examples:[{name:"Example",Component:()=>e.jsx(zt,{}),code:`
import { Switch } from '@cakeui/react'

export default () => {
  return (
    <Switch />
  )
}
        `}],props:`
type SwitchProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: boolean
  value?: boolean
  onValueChange?: (value: boolean) => void
}
    `},Slider:{examples:[{name:"Example",Component:()=>e.jsx(Ht,{}),code:`
import { Slider } from '@cakeui/react'

export default () => {
  return (
    <Slider />
  )
}
        `}],props:`
type SliderProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: number
  value?: number
  onValueChange?: (value: number | null) => void
}
    `},Select:{examples:[{name:"Single",Component:()=>{const[r]=i.useState(()=>Array.from({length:5}).map((o,l)=>({value:`${l+1}`,label:`Option ${l+1}`})));return e.jsx(st,{options:r})},code:`
import { useState } from 'react'
import { Select } from '@cakeui/react'

export default () => {
  const [options] = useState(() => (
    Array.from({ length: 5 }).map((_, i) => ({
      value: \`\${i + 1}\`,
      label: \`Option \${i + 1}\`
    }))
  ))

  return (
    <Select options={options} />
  )
}
        `},{name:"Multiple",Component:()=>{const[r]=i.useState(()=>Array.from({length:5}).map((o,l)=>({value:`${l+1}`,label:`Option ${l+1}`})));return e.jsx(st,{options:r,multiple:!0})},code:`
import { useState } from 'react'
import { Select } from '@cakeui/react'

export default () => {
  const [options] = useState(() => (
    Array.from({ length: 5 }).map((_, i) => ({
      value: \`\${i + 1}\`,
      label: \`Option \${i + 1}\`
    }))
  ))

  return (
    <Select options={options} multiple />
  )
}
        `}],props:`
type SelectProps = SelectCommonProps & (SelectSingleProps | SelectMultipleProps)
type SelectCommonProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  options?: SelectOption[]
  clearable?: boolean  // default: true
  before?: React.ReactNode
  after?: React.ReactNode
  optionRender?: (option: SelectOption) => React.ReactNode
  tagRender?: (option: SelectOption) => React.ReactNode
}
type SelectSingleProps = {
  multiple?: false
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}
type SelectMultipleProps = {
  multiple: true
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
}
type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}
    `},DatePicker:{examples:[{name:"Date",Component:()=>e.jsx(Ae,{}),code:`
import { DatePicker } from '@cakeui/react'

export default () => {
  return (
    <DatePicker />
  )
}
        `},{name:"Datetime",Component:()=>e.jsx(Ae,{type:"datetime"}),code:`
import { DatePicker } from '@cakeui/react'

export default () => {
  return (
    <DatePicker type='datetime' />
  )
}
        `},{name:"Time",Component:()=>e.jsx(Ae,{type:"time"}),code:`
import { DatePicker } from '@cakeui/react'

export default () => {
  return (
    <DatePicker type='time' />
  )
}
        `}],props:`
type DatePickerProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: dayjs.ConfigType
  value?: dayjs.ConfigType
  onValueChange?: (value: dayjs.Dayjs | null) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  type?: 'date' | 'datetime' | 'time' // default: 'date'
  format?: string
  showSeconds?: boolean               // default: false
  use12Hour?: boolean                 // default: true
  minDate?: dayjs.ConfigType
  maxDate?: dayjs.ConfigType
  disabledDate?: (date: dayjs.Dayjs) => boolean
  disabledHours?: () => number[]
  disabledMinutes?: (hour?: number) => number[]
  disabledSeconds?: (hour?: number, minute?: number) => number[]
  hideDisabled?: boolean              // default: false
  clearable?: boolean                 // default: true
  before?: React.ReactNode
  after?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  weekRender?: (week: number) => React.ReactNode
  dateRender?: (date: dayjs.Dayjs) => React.ReactNode
  timeRender?: (type: 'hour' | 'minute' | 'second', n: number) => React.ReactNode
}
    `},ColorPicker:{examples:[{name:"Example",Component:()=>e.jsx(At,{}),code:`
import { ColorPicker } from '@cakeui/react'

export default () => {
  return (
    <ColorPicker />
  )
}
        `}],props:`
type ColorPickerProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}
    `},Upload:{examples:[{name:"Example",Component:()=>e.jsx(_t,{}),code:`
import { Upload } from '@cakeui/react'

export default () => {
  return (
    <Upload />
  )
}
        `}],props:`
type UploadProps = Omit<
  React.ComponentPropsWithRef<'input'>, 'defaultValue' | 'value'
> & {
  defaultValue?: File[]
  value?: File[]
  onValueChange?: (value: File[]) => void
  trigger?: React.ReactNode
  fileRender?: (file: File) => React.ReactNode
}
    `}};export{to as default};
