import{j as e,c as j,a as Lt,r as i,b as ie,d as ze,e as Xt,f as Jt,g as At,h as _t}from"./index-BhGwPoyH.js";import{u as Ge,a as ft,r as ht,i as Bt,I as U,b as oe,P as gt,c as He,C as We,B as G,U as Vt,d as Ht,D as _e,S as st,e as Wt,f as zt,R as ct,g as ut,h as Gt,F as p,T as Ce,j as Se,k as dt,l as Ie,m as Ut,n as Kt,O as qt,M as Be,o as Ve,p as je,q as Re,s as Yt,L as M}from"./index-CT6_Zxvy.js";function mt(o){const{type:r="horizontal",...l}=o;return e.jsx("div",{...l,className:j("ui-divider",{[`ui-divider-${r}`]:r},l.className)})}function Qt(o){const{onChangeOpen:r,...l}=o,u=Lt(),h=i.useRef(null),[d,g]=Ge(l.ref),[x,R]=i.useState([0,0]),m=()=>{if(!h.current||!d.current||!Bt(h.current)){v.close();return}const[b,_]=x,{height:L,width:X}=d.current.getBoundingClientRect(),D={top:_,left:b};D.top+L>window.innerHeight&&(D.top-=L),D.top<0&&(D.top=0),D.left+X>window.innerWidth&&(D.left-=X),D.left<0&&(D.left=0),d.current.style.top=`${D.top}px`,d.current.style.left=`${D.left}px`},[y,v]=ft(d,void 0,r,m);return i.useEffect(()=>{if(h.current=d.current?.parentElement??null,!h.current)return;const b=_=>{_.preventDefault(),v.open(),R([_.clientX,_.clientY])};return h.current.addEventListener("contextmenu",b),()=>h.current?.removeEventListener("contextmenu",b)},[]),i.useEffect(()=>{!u&&d.current&&m()},[x]),ie("resize",v.close),ie("scroll",v.close,void 0,!0),ze(h,v.close),Xt(d,v.close),u?e.jsx("div",{ref:d,hidden:!0}):!y.remove&&ht.createPortal(e.jsx("div",{...l,className:j("ui-context-menu",{"ui-context-menu-close":y.close},l.className),ref:g,children:l.children}),document.body)}function Zt(o){const{open:r,onClose:l,position:u="top",type:h,duration:d=3e3,...g}=o,[x,R]=Ge(g.ref),[m,y]=ft(x,r,v=>!v&&l?.(),()=>x.current?.getBoundingClientRect());return i.useEffect(()=>{if(m.open&&d){const v=setTimeout(y.close,d);return()=>clearTimeout(v)}},[m.open]),!m.remove&&ht.createPortal(e.jsxs("div",{...g,className:j("ui-message",{[`ui-message-${u}`]:u,[`ui-message-${h}`]:h,"ui-message-close":m.close},g.className),ref:R,children:[h&&e.jsx(U,{className:"ui-message-icon",children:{info:"info",success:"check_circle",error:"cancel",warning:"error",loading:"progress_activity"}[h]}),e.jsx("span",{children:g.children})]}),document.body)}function pt(o){const[r,l]=i.useState(!1),[u,h]=i.useState();return[i.useMemo(()=>({open:(g,x,R)=>{l(!0),h(void 0),requestAnimationFrame(()=>{requestAnimationFrame(()=>h({type:g,content:x,duration:R}))})},close:()=>l(!1)}),[]),u&&e.jsx(Zt,{open:r,onClose:()=>l(!1),position:o?.position,type:u.type,duration:u.duration,children:u.content})]}function yt(o){const{total:r=10,page:l,onChangePage:u,...h}=o,[d,g]=oe(l,u,1),x=i.useMemo(()=>{const m=[];let y=d??1;const v=y<1||y>r?1:y;for(let b=v-4;b<=r;b++){if(m.length===5){if(v<b-2)break;m.shift()}b>0&&m.push(b)}return m[0]!==1&&m.unshift(1),m[m.length-1]!==r&&r>0&&m.push(r),m.length<=5||(m[0]+1!==m[1]&&m.splice(1,0,"prev"),m[m.length-1]-1!==m[m.length-2]&&m.splice(m.length-1,0,"next")),m},[r,d]);i.useEffect(()=>{(!d||d<1||d>r)&&g(1)},[d,r]);const R=m=>{let y=(d??1)+m;y<1?y=1:y>r&&(y=r),g(y)};return e.jsxs("div",{...h,className:j("ui-pagination",h.className),children:[e.jsx(U,{className:j("ui-pagination-icon .ui-pagination-ellipsis",{"ui-disabled":d===1}),onClick:()=>R(-1),children:"keyboard_arrow_left"}),e.jsx("span",{className:"ui-pagination-group",children:x.map((m,y)=>typeof m=="string"?e.jsx(U,{className:"ui-pagination-icon",onClick:()=>g(m==="prev"?x[y+1]-1:x[y-1]+1),children:"more_horiz"},m):e.jsx("span",{className:j("ui-pagination-item",{"ui-pagination-active":m===d}),onClick:()=>g(m),children:m},m))}),e.jsx(U,{className:j("ui-pagination-icon",{"ui-disabled":d===r}),onClick:()=>R(1),children:"keyboard_arrow_right"})]})}function xt(o){return e.jsx("table",{...o,className:j("ui-table",o.className),children:o.children})}function bt(o){const{rowLength:r=1,colLength:l=1,rowHeight:u,colWidth:h,children:d,overscan:g=0,...x}=o,[R,m]=Ge(x.ref),[y,v]=i.useState({height:0,width:0}),[b,_]=i.useState({top:0,left:0}),[L,X,D,Te]=i.useMemo(()=>{const F=Array.from({length:r}).map((E,S)=>u?.(S)),P=Array.from({length:l}).map((E,S)=>h?.(S)),T=F.reduce((E,S)=>E+(S??0),0),N=P.reduce((E,S)=>E+(S??0),0);return[F,P,T,N]},[r,l,u,h]),[we,fe]=i.useMemo(()=>{let F=[],P=0,T=-1,N=-1;for(let C=0;C<L.length;C++){const K=P+(L[C]??1/0);F.push({rowIndex:C,top:P,height:L[C]}),b.top+y.height>P&&b.top<K&&(T===-1&&(T=Math.max(C-g,0)),N=Math.min(C+g+1,L.length)),P=K}F=F.slice(T,N);let E=[],S=0;T=-1,N=-1;for(let C=0;C<X.length;C++){const K=S+(X[C]??1/0);E.push({colIndex:C,left:S,width:X[C]}),b.left+y.width>S&&b.left<K&&(T===-1&&(T=Math.max(C-g,0)),N=Math.min(C+g+1,X.length)),S=K}return E=E.slice(T,N),[F,E]},[y.height,y.width,b.top,b.left,L,X,g]);return ze(R,()=>{R.current&&v({height:R.current.clientHeight,width:R.current.clientWidth})}),e.jsx("div",{...x,className:j("ui-virtual-scroll",x.className),ref:m,onScroll:F=>{const P=F.target;_({top:P.scrollTop,left:P.scrollLeft}),x.onScroll?.(F)},children:e.jsx("div",{style:{height:D||void 0,width:Te||void 0},children:we.map(({rowIndex:F,top:P,height:T})=>fe.map(({colIndex:N,left:E,width:S})=>e.jsx("div",{style:{top:P,left:E,height:T,width:S||"100%"},children:d?.(F,N)},`${F}-${N}`)))})})}const Z=o=>typeof o=="string"?o:JSON.stringify(o)??"";function Fe(o){const{fields:r,data:l,idKey:u="id",gridlines:h=!0,pageSize:d,page:g,onChangePage:x,virtualScroll:R=!1,overscan:m=0,fieldHeight:y=32,fieldWidth:v,itemHeight:b,selection:_,onSelect:L,onHover:X,defaultSort:D,sort:Te,onSort:we,defaultFilter:fe,filter:F,onFilter:P,filterMode:T="and",onResize:N,onDragField:E,fieldRender:S,cellRender:C,footer:K,...De}=o,k=i.useRef(null),B=i.useRef({}),Pe=i.useRef(null),he=i.useRef(null),le=i.useRef(0),V=i.useRef(null),q=i.useRef(null),[ee,Ue]=i.useState(!0),[H,kt]=i.useState({height:0,width:0}),[vt,Ct]=i.useState({height:0,width:0}),[te,St]=i.useState({top:0,left:0}),[re,It]=i.useState({}),[se,jt]=i.useState({}),[Ke,qe]=i.useState(),[Ee,Rt]=i.useState({}),[ce,Ye]=oe(g,x,1),[$,Qe]=oe(_,L),[Me,ge]=oe(void 0,X),[J,Ze]=oe(Te,we,D),[W,Oe]=oe(F,P,fe),[Ft,Ne]=i.useState(""),[$e,Tt]=i.useState(""),[Le,ye]=i.useState([]),[et,ae]=i.useState(),[Xe,tt]=i.useState(),[wt,rt]=i.useState(!1),[Dt,at]=i.useState(!1),xe=i.useMemo(()=>$e?Le.filter(a=>Z(a.value).toUpperCase().includes($e.toUpperCase())):Le,[Le,$e]),ue=i.useMemo(()=>{if(!l)return[];let a=[...l];if(r&&W&&Object.values(W).find(c=>c.length)){const c=new Map(r.map(t=>[t.key,t]));a=a.filter(t=>{let s=!0;for(const[n,f]of Object.entries(W)){const O=c.get(n);if(O&&f.length){s=!1;const A=new Map(O.filterOptions?.map(w=>[w.value,w.rule]));for(const w of f){const Q=A.get(w);if(s=Q?Q(t):Z(w)===Z(t[n]),s)break}if(T==="and"&&!s||T==="or"&&s)break}}return s})}return J?.key&&J?.order&&a.sort((c,t)=>{let s=c[J.key],n=t[J.key],f;return typeof s=="string"&&typeof n=="string"?f=s.localeCompare(n):(Number.isFinite(s)&&(Number.isFinite(n)||typeof n=="string")||Number.isFinite(n)&&(Number.isFinite(s)||typeof n=="string")||typeof s=="boolean"&&typeof n=="boolean")&&(f=s-n),f!==void 0?J.order==="desc"?f*-1:f:(s=Z(s),n=Z(n),+(!s||s==="null")-+(!n||n==="null"))}),a},[r,l,W,T,J]),de=i.useMemo(()=>{let a=ue;if(d&&d>0&&ce&&ce>0){const c=(ce-1)*d;a=a.slice(c,c+d)}return a},[ue,d,ce]),nt=i.useMemo(()=>{if(!r)return{};const a={};for(const c of r)a[c.key]=v?.(c);return a},[r,v]),[me,Pt]=i.useMemo(()=>{const a=de.map(t=>Math.max(b?.(t)??32,24)),c=a.reduce((t,s)=>t+s,0);return[a,c]},[de,b]),be=i.useMemo(()=>Math.max(y,24),[y]),ne=i.useMemo(()=>{if(!r)return{};const a={};for(const c of r){const t=c.key;a[t]=Math.max(nt[t]??Ee[t]??Ke?.[t]??re[t]??0,se[t]??0)}return a},[r,nt,re,se,Ke,Ee]),[Je,Ae,Y]=i.useMemo(()=>{if(!r)return[[],[],[]];let a=[],c=[],t=[];for(const s of r){const n=ne[s.key];s.fixed==="left"?a.push({field:s,width:n}):s.fixed==="right"?t.push({field:s,width:n}):c.push({field:s,width:n})}return[a,c,t]},[r,ne]),Et=i.useMemo(()=>{let a=[],c=be,t=-1,s=-1;for(let n=0;n<me.length;n++){const f=c+me[n];a.push({item:de[n],top:c-be,height:me[n]}),(!R||(ee?n<10+m:te.top+H.height>c&&te.top<f))&&(t===-1&&(t=Math.max(n-m,0)),s=Math.min(n+m+1,me.length)),c=f}return a.slice(t,s)},[de,H.height,te.top,be,me,m,ee]);i.useEffect(()=>{it()},[r]),i.useEffect(()=>{Ne("")},[r,l]),i.useEffect(()=>{const a=Object.keys(re),c=a.reduce((s,n)=>s+re[n],0),t={};if(c<H.width){let s=H.width;for(let n=0;n<a.length;n++)t[a[n]]=Math.floor(re[a[n]]*H.width/c),s-=t[a[n]],n===a.length-1&&(t[a[n]]+=s);qe(t)}else qe(void 0)},[H.width,re,ee]),i.useEffect(()=>{Ye(1)},[ue]),i.useEffect(()=>{k.current?.scrollTo({top:0})},[de]);const ot=()=>{if(!k.current)return;const{clientHeight:a,clientWidth:c,scrollWidth:t,scrollHeight:s}=k.current;a&&c&&(kt({height:a,width:c}),Ct({height:s,width:t}))},it=()=>{k.current?.clientWidth&&(Ue(!0),setTimeout(()=>{const a={},c={};for(const[t,s]of Object.entries(B.current))s&&(a[t]=s.offsetWidth,c[t]=s.firstElementChild.offsetWidth);It(a),jt(c),Ue(!1)}))},Mt=a=>{if(!l){ye([]);return}_t(100).then(()=>{if(a.filterOptions)ye(a.filterOptions);else{const c=[],t=[];for(const s of l){const n=s[a.key],f=Z(s[a.key]);f&&!t.includes(f)&&(c.push(n),t.push(f))}ye(c.map((s,n)=>({value:s,label:t[n]})))}})},Ot=(a,c)=>{const t={[a]:[],...W},s=t[a];t[a]=s.includes(c)?s.filter(n=>n!==c):[...s,c],Oe(t)},ke=a=>{if(le.current)return;function c(){k.current&&(k.current.scrollLeft+=a,le.current=requestAnimationFrame(c))}le.current=requestAnimationFrame(c)},ve=()=>{cancelAnimationFrame(le.current),le.current=0};return ze(k,ot),Jt(k,ot,{childList:!0}),At(k,([a])=>a.isIntersecting&&ee&&it()),ie("mousemove",a=>{if(!V.current||!k.current)return;const c=a,{field:t,startX:s,scrollLeft:n}=V.current,f=k.current.scrollLeft-n,O=c.clientX-(s-f),A=t.fixed!=="right"?1:-1;if(V.current.width=Math.max(ne[t.key]+O*A,se[t.key]),Pe.current){const Q=Math[A>0?"max":"min"](O,(se[t.key]-ne[t.key])*A);Pe.current.style.translate=`${Q-f}px`}const w=k.current.getBoundingClientRect();V.current.width>se[t.key]&&(c.clientX>w.right?ke(5):c.clientX<w.left?ke(-5):ve())},void 0,!0),ie("mouseup",()=>{if(!V.current)return;const{field:a,width:c}=V.current;c!==ne[a.key]&&(Rt({...Ee,[a.key]:c}),N?.(a,c)),ve(),ae(void 0),rt(!1),V.current=null},void 0,!0),ie("mousemove",a=>{if(!q.current||!k.current||!r)return;const c=a,{field:t,startX:s}=q.current,n=c.clientX-s,f=k.current.getBoundingClientRect(),O=B.current[t.key];if(!Xe&&O){const A=O.getBoundingClientRect();tt({left:A.left-f.left,width:ne[t.key]})}if(he.current){he.current.style.translate=`${n}px`;const A=he.current.getBoundingClientRect(),w=r.filter(I=>I.fixed===t.fixed),Q=w.indexOf(t);let pe=-1;if(n<0)for(let I=0;I<Q;I++){const z=B.current[w[I].key]?.getBoundingClientRect();if(z&&z.left>=A.left){pe=I;break}}else for(let I=w.length-1;I>Q;I--){const z=B.current[w[I].key]?.getBoundingClientRect();if(z&&z.right<=A.right){pe=I;break}}if(pe!==-1){const I=w[pe],z=B.current[I.key]?.getBoundingClientRect();if(z){let Nt=k.current.clientTop,lt=n<0?z.left-f.left:z.right-f.left,$t=I.fixed?10:9;I.fixed!=="left"&&pe===w.length-1&&(lt-=2),ae({top:Nt,left:lt,zIndex:$t}),q.current.targetIndex=r.indexOf(I)}}else ae(void 0),q.current.targetIndex=-1}c.clientX>f.right?ke(5):c.clientX<f.left?ke(-5):ve()},void 0,!0),ie("mouseup",()=>{if(!q.current||!r)return;const{field:a,targetIndex:c}=q.current;if(c!==-1){const t=r.indexOf(a),s=[...r];s.splice(t,1),s.splice(c,0,a),E?.({sourceField:a,sourceIndex:t,targetIndex:c,newFields:s})}ve(),ae(void 0),tt(void 0),at(!1),q.current=null},void 0,!0),e.jsxs("div",{...De,className:j("ui-data-table",{"ui-data-table-gridlines":h,"ui-data-table-rendering":ee,"ui-data-table-resizing":wt,"ui-data-table-dragging":Dt},De.className),children:[e.jsx("div",{ref:k,className:"ui-data-table-group",onScroll:a=>{const c=a.target;St({top:c.scrollTop,left:c.scrollLeft}),De.onScroll?.(a)},children:[Je,Ae,Y].map((a,c)=>!!a.length&&e.jsx("div",{className:j({"ui-data-table-left":a===Je,"ui-data-table-right":a===Y,"ui-data-table-main":a===Ae,"ui-data-table-shadow":a===Je&&te.left>=1||a===Y&&te.left+H.width<=vt.width-1}),children:e.jsxs(xt,{children:[e.jsx("thead",{children:e.jsx("tr",{children:a.map(({field:t,width:s})=>e.jsxs("th",{ref:n=>{B.current[t.key]=n},align:t.align,className:j({"ui-data-table-hover":t.key===Me?.key&&Me.id===void 0,"ui-data-table-selected":t.key===$?.key&&$.id===void 0}),style:{cursor:t.draggable&&t.key===$?.key&&$.id===void 0?"grab":""},children:[e.jsxs("div",{className:"ui-data-table-field",style:{height:be,width:s},onClick:()=>Qe({key:t.key}),onMouseEnter:()=>ge({key:t.key}),onMouseLeave:()=>ge({}),onMouseDown:n=>{const f=B.current[t.key];!t.draggable||!f||!(t.key===$?.key&&$.id===void 0)||(q.current={field:t,startX:n.clientX,targetIndex:-1},at(!0))},children:[e.jsx("div",{children:S?S(t):t.name}),(t.sortable===void 0||t.sortable)&&e.jsxs("div",{className:"ui-data-table-sort","data-sort":t.key===J?.key?J?.order:void 0,onMouseDown:n=>n.stopPropagation(),onClick:n=>{if(n.stopPropagation(),t.key===J?.key){const f=[void 0,"asc","desc"];Ze({key:t.key,order:f[f.indexOf(J.order)+1]})}else Ze({key:t.key,order:"asc"})},children:[e.jsx(U,{children:"arrow_drop_up"}),e.jsx(U,{children:"arrow_drop_down"})]}),(t.filterable===void 0||t.filterable)&&e.jsxs("div",{className:j("ui-data-table-filter",{"ui-data-table-filter-active":W?.[t.key]?.length}),onMouseDown:n=>n.stopPropagation(),onClick:n=>n.stopPropagation(),children:[e.jsx(U,{size:16,children:"filter_alt"}),e.jsxs(gt,{className:"ui-data-table-filter-popover",open:t.key===Ft,onChangeOpen:n=>{Ne(n?t.key:""),n?Mt(t):ye([])},trigger:"click",position:"bottom",children:[e.jsxs("div",{className:"ui-data-table-filter-body",children:[e.jsx(He,{onChange:n=>Tt(n.detail.value),placeholder:"Search"}),e.jsx(bt,{style:{height:140},rowLength:xe.length,rowHeight:()=>28,overscan:10,children:n=>e.jsx(We,{checked:W?.[t.key]?.includes(xe[n].value),onChange:()=>Ot(t.key,xe[n].value),children:xe[n].label})})]}),e.jsxs("div",{className:"ui-data-table-filter-action",children:[e.jsx(G,{onClick:()=>{Oe({...W,[t.key]:fe?.[t.key]??[]})},children:"Reset"}),e.jsx(G,{onClick:()=>{Oe({...W}),Ne("")},children:"OK"})]})]})]})]}),t.resizable&&e.jsx("div",{className:"ui-data-table-resize",style:{left:a===Y?-7:void 0,right:a!==Y?-7:void 0,width:15},onMouseEnter:()=>{const n=B.current[t.key];if(!k.current||!n)return;const f=k.current.getBoundingClientRect(),O=n.getBoundingClientRect();ae({top:k.current.clientTop,left:a!==Y?O.right-f.left-2:O.left-f.left,zIndex:a!==Ae?10:9})},onMouseLeave:()=>!V.current&&ae(void 0),onMouseDown:()=>{const n=B.current[t.key];if(!n)return;const f=n.getBoundingClientRect();V.current={field:t,startX:a!==Y?f.right-1:f.left+1,scrollLeft:te.left,width:s},rt(!0)}})]},t.key))})}),e.jsx("tbody",{style:ee?void 0:{height:Pt},children:Et.map(({item:t,top:s,height:n})=>e.jsx("tr",{className:j({"ui-data-table-hover":t[u]===Me?.id,"ui-data-table-selected":t[u]===$?.id}),style:{top:s},children:a.map(({field:f,width:O})=>e.jsx("td",{align:f.align,className:j({"ui-data-table-selected":f.key===$?.key&&$.id===void 0}),onClick:()=>Qe({key:f.key,id:t[u]}),onMouseEnter:()=>ge({key:f.key,id:t[u]}),onMouseLeave:()=>ge({}),children:e.jsx("div",{className:"ui-data-table-cell",style:{height:n,width:O},children:C?C(f,t):Z(t[f.key])})},f.key))},t[u]))}),K&&e.jsx("tfoot",{children:e.jsx("tr",{children:a.map(({field:t,width:s})=>e.jsx("td",{align:t.align,className:j({"ui-data-table-selected":t.key===$?.key&&$.id===void 0}),children:e.jsx("div",{style:{width:s},children:K(t)})},t.key))})})]})},["left","main","right"][c]))}),et&&e.jsx("div",{ref:Pe,className:"ui-data-table-split-line",style:{height:H.height,width:2,...et}}),Xe&&e.jsx("div",{ref:he,className:"ui-data-table-drag-block",style:{height:H.height,...Xe}}),d&&e.jsx(yt,{total:ue.length&&d?Math.ceil(ue.length/d):1,page:ce,onChangePage:Ye})]})}const rr={Button:{examples:[{name:"Example",Component:()=>e.jsx(G,{children:"Button"}),code:`
import { Button } from '@cakeui/react'

export default () => {
  return (
    <Button>Button</Button>
  )
}
        `}],props:`
type ButtonProps = React.JSX.IntrinsicElements['button']
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
type DividerProps = React.JSX.IntrinsicElements['div'] & {
  type?: 'horizontal' | 'vertical' // default: 'horizontal'
}
    `},Icon:{examples:[{name:"Example",Component:()=>e.jsx(U,{children:"home"}),code:`
import { Icon } from '@cakeui/react'

export default () => {
  return (
    <Icon>home</Icon>
  )
}
        `}],props:`
// https://fonts.google.com/icons
type IconProps = React.JSX.IntrinsicElements['span'] & {
  family?: string // default: 'Material Symbols Rounded'
  size?: number   // default: 20
}
    `},Layout:{examples:[{name:"Example 1",Component:()=>e.jsxs(M,{style:{height:300,border:"1px solid lightgray"},children:[e.jsx(M.Header,{children:"Header"}),e.jsxs(M,{children:[e.jsx(M.Sider,{children:"Sider"}),e.jsx(M.Main,{children:"Main"}),e.jsx(M.Sider,{children:"Sider"})]}),e.jsx(M.Footer,{children:"Footer"})]}),code:`
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
        `},{name:"Example 2",Component:()=>e.jsxs(M,{style:{height:300,border:"1px solid lightgray"},children:[e.jsx(M.Sider,{children:"Sider"}),e.jsxs(M,{children:[e.jsx(M.Header,{children:"Header"}),e.jsx(M.Main,{children:"Main"}),e.jsx(M.Footer,{children:"Footer"})]}),e.jsx(M.Sider,{children:"Sider"})]}),code:`
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
type LayoutProps = React.JSX.IntrinsicElements['div']
type LayoutHeaderProps = React.JSX.IntrinsicElements['header']
type LayoutMainProps = React.JSX.IntrinsicElements['main']
type LayoutFooterProps = React.JSX.IntrinsicElements['header']
type LayoutSiderProps = React.JSX.IntrinsicElements['div']
    `},ThemeToggle:{examples:[{name:"Example",Component:()=>{const[o,r]=Yt();return e.jsx(U,{style:{cursor:"pointer"},onClick:r,children:o==="light"?"light_mode":"dark_mode"})},code:`
import { Icon, useThemeToggle } from '@cakeui/react'

export default () => {
  const [theme, toggle] = useThemeToggle()

  return (
    <Icon style={{ cursor: 'pointer' }} onClick={toggle}>
      {theme === 'light' ? 'light_mode' : 'dark_mode'}
    </Icon>
  )
}
        `}],props:`
function useThemeToggle(
  localStorageKey?: string // default: 'theme'
): [ThemeToggleValue, ThemeToggleFunction]

type ThemeToggleValue = 'light' | 'dark'
type ThemeToggleFunction = () => void
    `},ContextMenu:{examples:[{name:"Example",Component:()=>{const o={height:200,width:300,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid lightgray"};return e.jsxs("div",{style:o,children:["Right click me",e.jsx(Qt,{children:"Content"})]})},code:`
import { ContextMenu } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    height: 200,
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
    border: '1px solid lightgray'
  }

  return (
    <div style={style}>
      Right click me
      <ContextMenu>Content</ContextMenu>
    </div>
  )
}
        `}],props:`
type ContextMenuProps = React.JSX.IntrinsicElements['div'] & {
  onChangeOpen?: (open: boolean) => any
}
    `},Dialog:{examples:[{name:"Example",Component:()=>{const[o,r]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(G,{onClick:()=>r(!0),children:"Open Dialog"}),e.jsxs(Re,{open:o,onClose:()=>r(!1),children:[e.jsx(Re.Title,{children:"Title"}),e.jsx(Re.Content,{children:"Content"}),e.jsx(Re.Footer,{children:"Footer"})]})]})},code:`
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
type DialogProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onClose?: () => any
  overlay?: boolean         // default: true
  outsideClosable?: boolean // default: true
}
type DialogTitleProps = React.JSX.IntrinsicElements['div']
type DialogContentProps = React.JSX.IntrinsicElements['div']
type DialogFooterProps = React.JSX.IntrinsicElements['div']
    `},Drawer:{examples:[{name:"Example",Component:()=>{const[o,r]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(G,{onClick:()=>r(!0),children:"Open Drawer"}),e.jsxs(je,{open:o,onClose:()=>r(!1),children:[e.jsx(je.Title,{children:"Title"}),e.jsx(je.Content,{children:"Content"}),e.jsx(je.Footer,{children:"Footer"})]})]})},code:`
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
type DrawerProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onClose?: () => any
  position?: 'left' | 'right' | 'top' | 'bottom' // default: 'right'
  overlay?: boolean                              // default: true
  outsideClosable?: boolean                      // default: true
}
type DrawerTitleProps = React.JSX.IntrinsicElements['div']
type DrawerContentProps = React.JSX.IntrinsicElements['div']
type DrawerFooterProps = React.JSX.IntrinsicElements['div']
    `},Dropdown:{examples:[{name:"Example",Component:()=>e.jsxs(Ve,{children:[e.jsx(Ve.Trigger,{children:"Hover me"}),e.jsx(Ve.Content,{children:"Content"})]}),code:`
import { Dropdown } from '@cakeui/react'

export default () => {
  return (
    <Dropdown>
      <Dropdown.Trigger>Hover me</Dropdown.Trigger>
      <Dropdown.Content>Content</Dropdown.Content>
    </Dropdown>
  )
}
        `}],props:`
type DropdownProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onChangeOpen?: (open: boolean) => any
  trigger?: 'hover' | 'click'            // default: 'hover'
  position?: 'left' | 'right' | 'center' // default: 'left'
  offset?: number                        // default: 4
}
type DropdownTriggerProps = React.JSX.IntrinsicElements['div']
type DropdownContentProps = React.JSX.IntrinsicElements['div']
    `},Menu:{examples:[{name:"Horizontal",Component:()=>{const o={border:"1px solid lightgray"},r=[{key:"1",name:"Item 1"},{key:"2",name:"Item 2"},{key:"3",name:"Group 3",children:[{key:"3-1",name:"Item 3-1"},{key:"3-2",name:"Item 3-2"},{key:"3-3",name:"Item 3-3"}]}];return e.jsx(Be,{style:o,menus:r})},code:`
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    border: '1px solid lightgray'
  }
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      children: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu style={style} menus={menus} />
  )
}
        `},{name:"Vertical",Component:()=>{const o={border:"1px solid lightgray"},r=[{key:"1",name:"Item 1"},{key:"2",name:"Item 2"},{key:"3",name:"Group 3",children:[{key:"3-1",name:"Item 3-1"},{key:"3-2",name:"Item 3-2"},{key:"3-3",name:"Item 3-3"}]}];return e.jsx(Be,{style:o,menus:r,type:"vertical"})},code:`
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    border: '1px solid lightgray'
  }
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      children: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu style={style} menus={menus} type='vertical' />
  )
}
        `},{name:"Inline",Component:()=>{const o={border:"1px solid lightgray"},r=[{key:"1",name:"Item 1"},{key:"2",name:"Item 2"},{key:"3",name:"Group 3",children:[{key:"3-1",name:"Item 3-1"},{key:"3-2",name:"Item 3-2"},{key:"3-3",name:"Item 3-3"}]}];return e.jsx(Be,{style:o,menus:r,type:"vertical",inline:!0})},code:`
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    border: '1px solid lightgray'
  }
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      children: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu style={style} menus={menus} type='vertical' inline />
  )
}
        `}],props:`
type MenuProps = React.JSX.IntrinsicElements['div'] & {
  menus?: MenuItem[]
  openKeys?: string[]
  onChangeOpenKeys?: (keys: string[]) => any
  activeKey?: string
  onChangeActiveKey?: (key: string) => any
  type?: 'horizontal' | 'vertical' // default: 'horizontal'
  inline?: boolean                 // default: false
  indent?: number                  // default: 16
}
type MenuItem = {
  key: string
  name: React.ReactNode
  children?: MenuItem[]
  disabled?: boolean
}
    `},Message:{examples:[{name:"Example",Component:()=>{const[o,r]=pt();return e.jsxs(e.Fragment,{children:[r,e.jsx(G,{onClick:()=>o.open("info","Message"),children:"Show Message"})]})},code:`
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
function useMessage(options?: MessageOptions): [MessageAPI, React.ReactNode]

type MessageOptions = {
  position?: MessagePosition  // default: 'top
}
type MessageAPI = {
  open: (
    type: MessageType,        // default: ''
    message: React.ReactNode,
    duration?: number         // default: 3000
  ) => void
  close: () => void
}
type MessagePosition = 'top' | 'bottom'
type MessageType = '' | 'info' | 'success' | 'error' | 'warning' | 'loading'
    `},Overlay:{examples:[{name:"Example",Component:()=>{const[o,r]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(G,{onClick:()=>r(!0),children:"Open Overlay"}),e.jsx(qt,{open:o,onClick:()=>r(!1)})]})},code:`
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
type OverlayProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
}
    `},Popover:{examples:[{name:"Example",Component:()=>e.jsxs(G,{children:["Hover me",e.jsx(gt,{children:"Content"})]}),code:`
import { Button, Popover } from '@cakeui/react'

export default () => {
  return (
    <Button>
      Hover me
      <Popover>Content</Popover>
    </Button>
  )
}
        `}],props:`
type PopoverProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onChangeOpen?: (open: boolean) => any
  trigger?: 'hover' | 'click'                   // default: 'hover'
  position?:                                    // default: 'top'
    'top' | 'top-left' | 'top-right' |
    'bottom' | 'bottom-left' | 'bottom-right' |
    'left' | 'left-top' | 'left-bottom' |
    'right' | 'right-top' | 'right-bottom'
  offset?: number                               // default: 4
}
    `},Toast:{examples:[{name:"Example",Component:()=>{const[o,r]=Kt();return e.jsxs(e.Fragment,{children:[r,e.jsx(G,{onClick:()=>o.open("info",{title:"Toast",description:"Description"}),children:"Show Toast"})]})},code:`
import { Button, useToast } from '@cakeui/react'

export default () => {
  const [toast, element] = useToast()

  return (
    <>
      {element}
      <Button onClick={() => toast.open('info', {
        title: 'Toast',
        description: 'Description'
      })}>
        Show Toast
      </Button>
    </>
  )
}
        `}],props:`
function useToast(options?: ToastOptions): [ToastAPI, React.ReactNode]

type ToastOptions = {
  position?: ToastPosition // default: 'top-right'
}
type ToastAPI = {
  open: (
    type: ToastType,       // default: ''
    body: ToastBody,
    duration?: number      // default: 5000
  ) => number
  close: (id: number) => void,
  clear: () => void
}
type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type ToastType = '' | 'info' | 'success' | 'error' | 'warning' | 'loading'
type ToastBody = {
  title?: React.ReactNode
  description?: React.ReactNode
}
    `},Calendar:{examples:[{name:"Example",Component:()=>e.jsx(Ut,{}),code:`
import { Calendar } from '@cakeui/react'

export default () => {
  return (
    <Calendar />
  )
}
        `}],props:`
type CalendarProps = React.JSX.IntrinsicElements['div'] & {
  date?: dayjs.ConfigType
  onChangeDate?: (date: dayjs.Dayjs) => any
  arrows?: boolean // default: true
  minDate?: dayjs.ConfigType
  maxDate?: dayjs.ConfigType
  disabledDate?: (date: dayjs.Dayjs) => boolean
  monthRender?: (year: number, month: number) => React.ReactNode
  weekRender?: (week: number) => React.ReactNode
  dateRender?: (date: dayjs.Dayjs) => React.ReactNode
}
    `},Card:{examples:[{name:"Example",Component:()=>e.jsxs(Ie,{children:[e.jsx(Ie.Title,{children:"Title"}),e.jsx(Ie.Content,{children:"Content"}),e.jsx(Ie.Footer,{children:"Footer"})]}),code:`
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
type CardProps = React.JSX.IntrinsicElements['div']
type CardTitleProps = React.JSX.IntrinsicElements['div']
type CardContentProps = React.JSX.IntrinsicElements['div']
type CardFooterProps = React.JSX.IntrinsicElements['div']
    `},Carousel:{examples:[{name:"Example",Component:()=>{const[o]=i.useState(()=>Array.from({length:5}).map((r,l)=>({key:`${l+1}`,content:`item ${l+1}`})));return e.jsx(dt,{style:{height:200},infinite:!0,arrows:!0,draggable:!0,children:o.map(r=>e.jsx(dt.Item,{style:{width:"50%"},children:r.content},r.key))})},code:`
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
        <Carousel.Item key={item.key} style={{ width: '50%' }}>
          {item.content}
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
        `}],props:`
type CarouselProps = React.JSX.IntrinsicElements['div'] & {
  activeKey?: string
  onChangeActiveKey?: (key: string) => any
  infinite?: boolean     // default: false
  arrows?: boolean       // default: false
  dots?: boolean         // default: true
  draggable?: boolean    // default: false
  autoplay?: boolean     // default: false
  autoplayDelay?: number // default: 3000
}
type CarouselItemProps = React.JSX.IntrinsicElements['div']
    `},Collapse:{examples:[{name:"Example",Component:()=>{const[o]=i.useState(()=>Array.from({length:3}).map((r,l)=>({key:`${l+1}`,trigger:`Trigger ${l+1}`,content:`Content ${l+1}`})));return e.jsx(Se,{children:o.map(r=>e.jsxs(Se.Item,{children:[e.jsx(Se.Trigger,{children:r.trigger}),e.jsx(Se.Content,{children:r.content})]},r.key))})},code:`
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
type CollapseProps = React.JSX.IntrinsicElements['div'] & {
  openKeys?: string[]
  onChangeOpenKeys?: (keys: string[]) => any
}
type CollapseItemProps = React.JSX.IntrinsicElements['div']
type CollapseTriggerProps = React.JSX.IntrinsicElements['div']
type CollapseContentProps = React.JSX.IntrinsicElements['div']
    `},Pagination:{examples:[{name:"Example",Component:()=>e.jsx(yt,{}),code:`
import { Pagination } from '@cakeui/react'

export default () => {
  return (
    <Pagination />
  )
}
        `}],props:`
type PaginationProps = React.JSX.IntrinsicElements['div'] & {
  total?: number // default: 10
  page?: number
  onChangePage?: (page: number) => any
}
    `},Table:{examples:[{name:"Example",Component:()=>{const[o]=i.useState(()=>Array.from({length:3}).map((l,u)=>({key:`key${u+1}`,name:`col ${u+1}`}))),[r]=i.useState(()=>Array.from({length:3}).map((l,u)=>({id:u,...o.reduce((h,d,g)=>({...h,[d.key]:`data ${u+1}-${g+1}`}),{})})));return e.jsxs(xt,{children:[e.jsx("thead",{children:e.jsx("tr",{children:o.map(l=>e.jsx("th",{children:l.name},l.key))})}),e.jsx("tbody",{children:r.map(l=>e.jsx("tr",{children:o.map(u=>e.jsx("td",{children:l[u.key]},u.key))},l.id))}),e.jsx("tfoot",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:3,align:"center",children:"footer"})})})]})},code:`
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
type TableProps = React.JSX.IntrinsicElements['table']
    `},Tabs:{examples:[{name:"Example",Component:()=>{const[o]=i.useState(()=>Array.from({length:3}).map((r,l)=>({key:`${l+1}`,trigger:`Tab ${l+1}`,content:`Content ${l+1}`})));return e.jsxs(Ce,{children:[e.jsx(Ce.List,{children:o.map(r=>e.jsx(Ce.Trigger,{children:r.trigger},r.key))}),o.map(r=>e.jsx(Ce.Content,{children:r.content},r.key))]})},code:`
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
type TabsProps = React.JSX.IntrinsicElements['div'] & {
  activeKey?: string
  onChangeActiveKey?: (key: string) => any
  destroyInactive?: boolean // default: false
}
type TabsListProps = React.JSX.IntrinsicElements['div']
type TabsTriggerProps = React.JSX.IntrinsicElements['div']
type TabsContentProps = React.JSX.IntrinsicElements['div']
    `},VirtualScroll:{examples:[{name:"Example",Component:()=>{const o={height:300,width:300,border:"1px solid lightgray"},r=i.useCallback(()=>60,[]),l=i.useCallback(()=>60,[]);return e.jsx(bt,{style:o,rowLength:100,colLength:100,rowHeight:r,colWidth:l,children:(u,h)=>`${u}-${h}`})},code:`
import { useCallback } from 'react'
import { VirtualScroll } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    height: 300,
    width: 300,
    border: '1px solid lightgray'
  }
  const rowHeight = useCallback(() => 60, [])
  const colWidth = useCallback(() => 60, [])

  return (
    <VirtualScroll
      style={style}
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
  React.JSX.IntrinsicElements['div'], 'children'
> & {
  rowLength?: number
  colLength?: number
  rowHeight?: (index: number) => number
  colWidth?: (index: number) => number
  children?: (rowIndex: number, colIndex: number) => React.ReactNode
  overscan?: number
}
    `},DataTable:{examples:[{name:"Example",Component:()=>{const[o]=i.useState(()=>[{key:"id",name:"id",fixed:"left"},...Array.from({length:10}).map((l,u)=>({key:`key${u+1}`,name:`col ${u+1}`,resizable:!0}))]),[r]=i.useState(()=>Array.from({length:10}).map((l,u)=>({...o.reduce((h,d,g)=>({...h,[d.key]:`data ${u+1}-${g}`}),{}),id:u+1})));return e.jsx(Fe,{style:{height:364},fields:o,data:r})},code:`
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields] = useState<DataTable.Field[]>(() => [
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
  const [data] = useState<DataTable.DataItem[]>(() => (
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
        `},{name:"Pagination",Component:()=>{const[o]=i.useState(()=>[{key:"id",name:"id",fixed:"left"},...Array.from({length:10}).map((l,u)=>({key:`key${u+1}`,name:`col ${u+1}`,resizable:!0}))]),[r]=i.useState(()=>Array.from({length:100}).map((l,u)=>({...o.reduce((h,d,g)=>({...h,[d.key]:`data ${u+1}-${g}`}),{}),id:u+1})));return e.jsx(Fe,{style:{height:404},fields:o,data:r,pageSize:20})},code:`
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields] = useState<DataTable.Field[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 100 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      resizable: true
    }))
  ])
  const [data] = useState<DataTable.DataItem[]>(() => (
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
      style={{ height: 404 }}
      fields={fields}
      data={data}
      pageSize={10}
    />
  )
}
        `},{name:"VirtualScroll",Component:()=>{const[o]=i.useState(()=>[{key:"id",name:"id",fixed:"left"},...Array.from({length:10}).map((l,u)=>({key:`key${u+1}`,name:`col ${u+1}`,resizable:!0}))]),[r]=i.useState(()=>Array.from({length:1e3}).map((l,u)=>({...o.reduce((h,d,g)=>({...h,[d.key]:`data ${u+1}-${g}`}),{}),id:u+1})));return e.jsx(Fe,{style:{height:364},fields:o,data:r,virtualScroll:!0})},code:`
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields] = useState<DataTable.Field[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 1000 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      resizable: true
    }))
  ])
  const [data] = useState<DataTable.DataItem[]>(() => (
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
      virtualScroll
    />
  )
}
        `},{name:"Draggable",Component:()=>{const[o,r]=i.useState(()=>[{key:"id",name:"id",fixed:"left"},...Array.from({length:10}).map((u,h)=>({key:`key${h+1}`,name:`col ${h+1}`,draggable:!0}))]),[l]=i.useState(()=>Array.from({length:10}).map((u,h)=>({...o.reduce((d,g,x)=>({...d,[g.key]:`data ${h}-${x}`}),{}),id:h})));return e.jsx(Fe,{style:{height:364},fields:o,data:l,onDragField:u=>r(u.newFields)})},code:`
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields, setFields] = useState<DataTable.Field[]>(() => [
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
  const [data] = useState<DataTable.DataItem[]>(() => (
    Array.from({ length: 10 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i}-\${j}\`
      }), {}),
      id: i
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
type DataTableProps = React.JSX.IntrinsicElements['div'] & {
  fields?: DataTableField[]
  data?: DataTableItem[]
  idKey?: string                      // default: 'id'
  gridlines?: boolean                 // default: true
  pageSize?: number
  page?: number
  onChangePage?: (page: number) => any
  virtualScroll?: boolean             // default: false
  overscan?: number
  fieldHeight?: number                // default: 32
  fieldWidth?: (field: DataTableField) => number
  itemHeight?: (item: DataTableItem) => number
  selection?: DataTableTarget
  onSelect?: (selection: DataTableTarget) => any
  onHover?: (hover: DataTableTarget) => any
  defaultSort?: DataTableSort
  sort?: DataTableSort
  onSort?: (sort: DataTableSort) => any
  defaultFilter?: DataTableFilter
  filter?: DataTableFilter
  onFilter?: (filter: DataTableFilter) => any
  filterMode?: 'and' | 'or'           // default: 'and'
  onResize?: (field: DataTableField, width: number) => any
  onDragField?: (result: DataTableDragResult) => any
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
    `},Form:{examples:[{name:"All Fields",Component:()=>e.jsxs(p,{cols:2,children:[e.jsx(p.Item,{title:"Text",children:e.jsx(p.Input,{name:"text"})}),e.jsx(p.Item,{title:"Password",children:e.jsx(p.Password,{name:"password"})}),e.jsx(p.Item,{title:"Number",children:e.jsx(p.InputNumber,{name:"number"})}),e.jsx(p.Item,{title:"Textarea",children:e.jsx(p.Textarea,{name:"textarea",autoRows:!0})}),e.jsx(p.Item,{title:"Radio",children:e.jsx(p.Radio,{name:"radio",children:"Radio"})}),e.jsx(p.Item,{title:"Radio Group",children:e.jsx(p.RadioGroup,{name:"radioGroup",options:[{value:"1",label:"radio 1"},{value:"2",label:"radio 2"},{value:"3",label:"radio 3"}]})}),e.jsx(p.Item,{title:"Checkbox",children:e.jsx(p.Checkbox,{name:"checkbox",children:"checkbox"})}),e.jsx(p.Item,{title:"Checkbox Group",children:e.jsx(p.CheckboxGroup,{name:"checkboxGroup",options:[{value:"1",label:"checkbox 1"},{value:"2",label:"checkbox 2"},{value:"3",label:"checkbox 3"}]})}),e.jsx(p.Item,{title:"Switch",children:e.jsx(p.Switch,{name:"switch"})}),e.jsx(p.Item,{title:"Slider",children:e.jsx(p.Slider,{name:"slider"})}),e.jsx(p.Item,{title:"Select",children:e.jsx(p.Select,{name:"select",options:[{value:"1",label:"option 1"},{value:"2",label:"option 2"},{value:"3",label:"option 3"}]})}),e.jsx(p.Item,{title:"Select Multiple",children:e.jsx(p.Select,{name:"selectMultiple",options:[{value:"1",label:"option 1"},{value:"2",label:"option 2"},{value:"3",label:"option 3"}],multiple:!0})}),e.jsx(p.Item,{title:"Date",children:e.jsx(p.DatePicker,{name:"date"})}),e.jsx(p.Item,{title:"Datetime",children:e.jsx(p.DatePicker,{name:"datetime",type:"datetime"})}),e.jsx(p.Item,{title:"Time",children:e.jsx(p.DatePicker,{name:"time",type:"time"})}),e.jsx(p.Item,{title:"Color",children:e.jsx(p.ColorPicker,{name:"color"})}),e.jsx(p.Item,{title:"Upload",children:e.jsx(p.Upload,{name:"upload"})}),e.jsx(p.Item,{colSpan:2,style:{textAlign:"center"},children:e.jsx(p.Button,{children:"Submit"})})]}),code:`
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
      <Form.Item colSpan={2} style={{ textAlign: 'center' }}>
        <Form.Button>Submit</Form.Button>
      </Form.Item>
    </Form>
  )
}
        `},{name:"Validation",Component:()=>{const[o,r]=pt();return e.jsxs(e.Fragment,{children:[r,e.jsxs(p,{onSubmit:()=>o.open("success","Form submitted!"),children:[e.jsx(p.Item,{title:"Username",validate:l=>{if(!l)return"Username is required."},children:e.jsx(p.Input,{name:"username"})}),e.jsx(p.Item,{title:"Password",validate:l=>{if(l){if(l.length<8)return"Password must be at least 8 characters."}else return"Password is required."},children:e.jsx(p.Password,{name:"password"})}),e.jsx(p.Item,{colSpan:2,style:{textAlign:"center"},children:e.jsx(p.Button,{children:"Submit"})})]})]})},code:`
import { Form, useMessage } from '@cakeui/react'

export default () => {
  const [message, element] = useMessage()

  return (
    <>
      {element}
      <Form onSubmit={() => message.open('success', 'Form submitted!')}>
        <Form.Item
          title='Username'
          validate={(v: string) => {
            if (!v) {
              return 'Username is required.'
            }
          }}
        >
          <Form.Input name='username' />
        </Form.Item>
        <Form.Item
          title='Password'
          validate={(v: string) => {
            if (!v) {
              return 'Password is required.'
            } else if (v.length < 8) {
              return 'Password must be at least 8 characters.'
            }
          }}
        >
          <Form.Password name='password' />
        </Form.Item>
        <Form.Item colSpan={2} style={{ textAlign: 'center' }}>
          <Form.Button>Submit</Form.Button>
        </Form.Item>
      </Form>
    </>
  )
}
        `}],props:`
type FormProps = Omit<
  React.JSX.IntrinsicElements['form'], 'onChange' | 'onSubmit'
> & {
  defaultValues?: FormValues
  values?: FormValues
  onChange?: (key: string, value: any) => any
  onSubmit?: (event: React.FormEvent<HTMLFormElement>, values: FormValues) => any
  cols?: number        // default: 1
  rowGap?: number      // default: 0
  colGap?: number      // default: 16
  colMinWidth?: number // default: 160
}
type FormItemProps = Omit<
  React.JSX.IntrinsicElements['div'], 'title'
> & {
  title?: React.ReactNode
  info?: React.ReactNode
  rowSpan?: number     // default: 1
  colSpan?: number     // default: 1
  validate?: ValidateFunction
}
type FormValues<T = { [k: string]: any }> = T
type ValidateFunction = (value: any) => (string | void) | Promise<string | void>
    `},Input:{examples:[{name:"Text",Component:()=>e.jsx(He,{}),code:`
import { Input } from '@cakeui/react'

export default () => {
  return (
    <Input />
  )
}
        `},{name:"Password",Component:()=>e.jsx(He.Password,{}),code:`
import { Input } from '@cakeui/react'

export default () => {
  return (
    <Input.Password />
  )
}
        `}],props:`
type InputProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
  before?: React.ReactNode
  after?: React.ReactNode
}
type InputPasswordProps = Props & {
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: number
  value?: number
  onChange?: (event: CustomEvent<{ value: number }>) => any
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
  React.JSX.IntrinsicElements['textarea'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
  autoRows?: boolean // default: false
}
    `},Radio:{examples:[{name:"Example",Component:()=>e.jsx(ct,{children:"radio"}),code:`
import { Radio } from '@cakeui/react'

export default () => {
  return (
    <Radio>radio</Radio>
  )
}
        `},{name:"Group",Component:()=>{const[o]=i.useState(()=>Array.from({length:3}).map((r,l)=>({value:`${l+1}`,label:`radio ${l+1}`})));return e.jsx(ct.Group,{options:o})},code:`
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
}
type RadioGroupProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
  options?: RadioOption[]
}
type RadioOption = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}
    `},Checkbox:{examples:[{name:"Example",Component:()=>e.jsx(We,{children:"checkbox"}),code:`
import { Checkbox } from '@cakeui/react'

export default () => {
  return (
    <Checkbox>checkbox</Checkbox>
  )
}
        `},{name:"Group",Component:()=>{const[o]=i.useState(()=>Array.from({length:3}).map((r,l)=>({value:`${l+1}`,label:`checkbox ${l+1}`})));return e.jsx(We.Group,{options:o})},code:`
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
  indeterminate?: boolean // default: false
}
type CheckboxGroupProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string[]
  value?: string[]
  onChange?: (event: CustomEvent<{ value: string[] }>) => any
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: boolean
  value?: boolean
  onChange?: (event: CustomEvent<{ value: boolean }>) => any
}
    `},Slider:{examples:[{name:"Example",Component:()=>e.jsx(Wt,{}),code:`
import { Slider } from '@cakeui/react'

export default () => {
  return (
    <Slider />
  )
}
        `}],props:`
type SliderProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: number
  value?: number
  onChange?: (event: CustomEvent<{ value: number }>) => any
}
    `},Select:{examples:[{name:"Single",Component:()=>{const[o]=i.useState(()=>Array.from({length:5}).map((r,l)=>({value:`${l+1}`,label:`Option ${l+1}`})));return e.jsx(st,{options:o})},code:`
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
        `},{name:"Multiple",Component:()=>{const[o]=i.useState(()=>Array.from({length:5}).map((r,l)=>({value:`${l+1}`,label:`Option ${l+1}`})));return e.jsx(st,{options:o,multiple:!0})},code:`
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
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  open?: boolean
  onChangeOpen?: (open: boolean) => any
  options?: SelectOption[]
  optionsMaxHeight?: number
  searchable?: boolean // default: true
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
  onChange?: (event: CustomEvent<{ value: string }>) => any
}
type SelectMultipleProps = {
  multiple: true
  defaultValue?: string[]
  value?: string[]
  onChange?: (event: CustomEvent<{ value: string[] }>) => any
}
type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}
    `},DatePicker:{examples:[{name:"Date",Component:()=>e.jsx(_e,{}),code:`
import { DatePicker } from '@cakeui/react'

export default () => {
  return (
    <DatePicker />
  )
}
        `},{name:"Datetime",Component:()=>e.jsx(_e,{type:"datetime"}),code:`
import { DatePicker } from '@cakeui/react'

export default () => {
  return (
    <DatePicker type='datetime' />
  )
}
        `},{name:"Time",Component:()=>e.jsx(_e,{type:"time"}),code:`
import { DatePicker } from '@cakeui/react'

export default () => {
  return (
    <DatePicker type='time' />
  )
}
        `}],props:`
type DatePickerProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: dayjs.ConfigType
  value?: dayjs.ConfigType
  onChange?: (event: CustomEvent<{ value: dayjs.Dayjs | null }>) => any
  open?: boolean
  onChangeOpen?: (open: boolean) => any
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
  footer?: React.ReactNode
  monthRender?: (year: number, month: number) => React.ReactNode
  weekRender?: (week: number) => React.ReactNode
  dateRender?: (date: dayjs.Dayjs) => React.ReactNode
  timeRender?: (type: 'hour' | 'minute' | 'second', n: number) => React.ReactNode
}
    `},ColorPicker:{examples:[{name:"Example",Component:()=>e.jsx(Ht,{}),code:`
import { ColorPicker } from '@cakeui/react'

export default () => {
  return (
    <ColorPicker />
  )
}
        `}],props:`
type ColorPickerProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
}
    `},Upload:{examples:[{name:"Example",Component:()=>e.jsx(Vt,{}),code:`
import { Upload } from '@cakeui/react'

export default () => {
  return (
    <Upload />
  )
}
        `}],props:`
type UploadProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: File[]
  value?: File[]
  onChange?: (event: CustomEvent<{ value: File[] }>) => any
  max?: number
  trigger?: React.ReactNode
  fileRender?: (file: File) => React.ReactNode
}
    `}};export{rr as default};
