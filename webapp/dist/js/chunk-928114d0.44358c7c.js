(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-928114d0"],{"1dde":function(e,t,n){var r=n("d039"),a=n("b622"),l=n("2d00"),u=a("species");e.exports=function(e){return l>=51||!r((function(){var t=[],n=t.constructor={};return n[u]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},3834:function(e,t,n){},"4ec5":function(e,t,n){"use strict";n("3834")},8418:function(e,t,n){"use strict";var r=n("c04e"),a=n("9bf2"),l=n("5c6c");e.exports=function(e,t,n){var u=r(t);u in e?a.f(e,u,l(0,n)):e[u]=n}},"889f":function(e,t,n){e.exports=n.p+"img/557px-Barbieri_-_ViaSophia25668.ce76875b.jpg"},ad68:function(e,t,n){"use strict";n.r(t);var r=n("7a23"),a=n("889f"),l=n.n(a),u={class:"maina"},i={style:{"margin-top":"50px","min-width":"1000px"}},c=Object(r["g"])("img",{style:{display:"inline-block",width:"450px"},src:l.a},null,-1),o={style:{height:"50px","min-width":"400px",float:"right"}},b=Object(r["g"])("h2",null,"Reserve a table",-1),s=Object(r["g"])("br",null,null,-1),g=Object(r["g"])("label",{for:"guestNum"},"Guests:",-1),d=Object(r["f"])(),p=Object(r["g"])("br",null,null,-1),O=Object(r["g"])("br",null,null,-1),j=Object(r["g"])("br",null,null,-1),f=Object(r["g"])("label",{for:"date"},"Day:",-1),m=Object(r["f"])(),h=Object(r["g"])("br",null,null,-1),v=Object(r["g"])("br",null,null,-1),y=Object(r["g"])("br",null,null,-1),k=Object(r["f"])("   "),x=Object(r["g"])("label",null," Lunch",-1),D=Object(r["f"])(),S=Object(r["g"])("br",null,null,-1),w=Object(r["f"])("   "),R=Object(r["g"])("label",null," Dinner",-1),A=Object(r["g"])("br",null,null,-1),T=Object(r["g"])("br",null,null,-1),z=Object(r["g"])("label",{for:"time"},"Time:",-1),V=Object(r["f"])(),E=Object(r["g"])("br",null,null,-1),P=Object(r["g"])("br",null,null,-1),$=Object(r["g"])("br",null,null,-1),M=Object(r["g"])("label",null,"Additional notes:",-1),U=Object(r["f"])(),N=Object(r["g"])("br",null,null,-1),q=Object(r["g"])("br",null,null,-1),C=Object(r["g"])("br",null,null,-1),H=Object(r["g"])("br",null,null,-1),J=Object(r["g"])("input",{style:{padding:"5px 10px 5px 10px",width:"240px"},type:"submit",value:"Book now"},null,-1),_=Object(r["g"])("br",null,null,-1),B=Object(r["g"])("br",null,null,-1),L=Object(r["g"])("br",null,null,-1),F=Object(r["g"])("br",null,null,-1),I={style:{"margin-top":"50px","border-top":"2px solid black","padding-top":"30px"}},Y=Object(r["g"])("h1",null,"Menu",-1),G=Object(r["g"])("br",null,null,-1),X=Object(r["g"])("br",null,null,-1);function K(e,t,n,a,l,K){return Object(r["p"])(),Object(r["d"])("div",u,[Object(r["g"])("h1",null,Object(r["x"])(e.currentRestaurant.nome),1),(Object(r["p"])(),Object(r["d"])(r["a"],null,Object(r["u"])(5,(function(t){return Object(r["g"])("span",{class:["fa fa-star",{checked:t<=(e.currentRestaurant.rating?e.currentRestaurant.rating:3)}],style:{"font-size":"20px"},key:t},null,2)})),64)),Object(r["g"])("h4",null,Object(r["x"])(e.currentRestaurant.indirizzo?e.currentRestaurant.indirizzo:"Via Pietro Cavallini 25, 00193 Rome Italy"),1),Object(r["g"])("div",i,[c,Object(r["g"])("div",o,[b,s,Object(r["g"])("form",{onSubmit:t[7]||(t[7]=Object(r["F"])((function(){return e.onSubmit&&e.onSubmit.apply(e,arguments)}),["prevent"]))},[g,d,p,Object(r["E"])(Object(r["g"])("input",{id:"guestNum",type:"number",min:"1",style:{width:"220px"},"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.bookingData.guests=t}),required:""},null,512),[[r["A"],e.bookingData.guests]]),O,j,f,m,h,Object(r["E"])(Object(r["g"])("input",{type:"date",id:"date","onUpdate:modelValue":t[2]||(t[2]=function(t){return e.bookingData.date=t}),min:e.bookingData.date,style:{width:"220px"}},null,8,["min"]),[[r["A"],e.bookingData.date]]),v,y,Object(r["E"])(Object(r["g"])("input",{type:"radio",id:"lunch",value:"lunch","onUpdate:modelValue":t[3]||(t[3]=function(t){return e.bookingData.service=t})},null,512),[[r["z"],e.bookingData.service]]),k,x,D,S,Object(r["E"])(Object(r["g"])("input",{type:"radio",id:"dinner",value:"dinner","onUpdate:modelValue":t[4]||(t[4]=function(t){return e.bookingData.service=t})},null,512),[[r["z"],e.bookingData.service]]),w,R,A,T,z,V,E,Object(r["E"])(Object(r["g"])("input",{type:"time",id:"time","onUpdate:modelValue":t[5]||(t[5]=function(t){return e.bookingData.time=t}),min:e.currentHour,style:{width:"220px"},required:""},null,8,["min"]),[[r["A"],e.bookingData.time]]),P,$,M,U,N,Object(r["E"])(Object(r["g"])("textarea",{"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.bookingData.notes=t}),placeholder:" ... ",style:{width:"220px",padding:"20px"}},null,512),[[r["A"],e.bookingData.notes]]),q,C,H,J],32)])]),_,B,L,F,Object(r["g"])("div",I,[Y,G,(Object(r["p"])(!0),Object(r["d"])(r["a"],null,Object(r["u"])(e.currentMenu,(function(e,t){return Object(r["p"])(),Object(r["d"])("div",{key:t},[Object(r["g"])("h2",null,Object(r["x"])(e["category"]),1),(Object(r["p"])(!0),Object(r["d"])(r["a"],null,Object(r["u"])(e.meals,(function(e,t){return Object(r["p"])(),Object(r["d"])("div",{class:"column",key:t},Object(r["x"])(e.item)+" - "+Object(r["x"])(e.price),1)})),128)),X])})),128))])])}var Q=n("d4ec"),W=n("bee2"),Z=n("262e"),ee=n("2caf"),te=(n("fb6a"),n("ac1f"),n("5319"),n("b64b"),n("ce1f")),ne=n("afbc"),re=function(e){Object(Z["a"])(n,e);var t=Object(ee["a"])(n);function n(){var e;return Object(Q["a"])(this,n),e=t.apply(this,arguments),e.bookingData={guests:1,date:(new Date).toISOString().slice(0,10),time:e.currentHour,service:"lunch",notes:""},e.underscoreCurrentRestaurant={},e.exampleMenu=[{category:"Antipasti",meals:[{item:"prosciutto",price:"5.5$"},{item:"suppli",price:"1.5$"}]},{category:"Primi",meals:[{item:"pasta al sugo",price:"2.5$"},{item:"pizza",price:"9.5$"}]},{category:"Secondi",meals:[{item:"carne",price:"15.5$"},{item:"pesce",price:"11.5$"}]}],e}return Object(W["a"])(n,[{key:"created",value:function(){this.restaurantProvided?this.underscoreCurrentRestaurant=JSON.parse(this.$route.params.nome):(alert("No restaurant provided!"),ne["a"].replace("/"))}},{key:"currentHour",get:function(){return(new Date).toLocaleTimeString().slice(0,5)}},{key:"onSubmit",value:function(){if(console.log("Submitting the following order:"),console.log(this.bookingData),void 0===localStorage.authEmail||void 0===localStorage.authToken)return console.log("You are not authenticated!"),void alert("You are not authenticated!");if("1"!==localStorage.authType){var e={rest_email:this.currentRestaurant.email,date:this.bookingData.date,service:this.bookingData.service,time:this.bookingData.time,seats:this.bookingData.guests,notes:this.bookingData.notes,email:localStorage.authEmail,status:"pending",authToken:localStorage.authToken},t=new XMLHttpRequest;t.open("POST","http://localhost:12004/reserve",!0),t.setRequestHeader("Content-Type","application/json;charset=UTF-8"),t.onreadystatechange=function(){if(4===t.readyState){var e=JSON.parse(t.responseText);console.log(e)}},t.send(JSON.stringify(e)),alert("Request of reservation correctly sent to the restaurant!"),ne["a"].replace("/")}else alert("A restaurant can not reserve a table!")}},{key:"currentRestaurant",get:function(){return this.underscoreCurrentRestaurant}},{key:"restaurantProvided",get:function(){return Object.keys(this.$route.params).length>0}},{key:"currentMenu",get:function(){return this.restaurantProvided?this.currentRestaurant.menu:this.exampleMenu}},{key:"restaurantPic",get:function(){return this.restaurantProvided?this.currentRestaurant.picture:"../assets/557px-Barbieri_-_ViaSophia25668.jpg"}}]),n}(te["b"]);n("4ec5");re.render=K;t["default"]=re},b64b:function(e,t,n){var r=n("23e7"),a=n("7b0b"),l=n("df75"),u=n("d039"),i=u((function(){l(1)}));r({target:"Object",stat:!0,forced:i},{keys:function(e){return l(a(e))}})},fb6a:function(e,t,n){"use strict";var r=n("23e7"),a=n("861d"),l=n("e8b5"),u=n("23cb"),i=n("50c4"),c=n("fc6a"),o=n("8418"),b=n("b622"),s=n("1dde"),g=s("slice"),d=b("species"),p=[].slice,O=Math.max;r({target:"Array",proto:!0,forced:!g},{slice:function(e,t){var n,r,b,s=c(this),g=i(s.length),j=u(e,g),f=u(void 0===t?g:t,g);if(l(s)&&(n=s.constructor,"function"!=typeof n||n!==Array&&!l(n.prototype)?a(n)&&(n=n[d],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return p.call(s,j,f);for(r=new(void 0===n?Array:n)(O(f-j,0)),b=0;j<f;j++,b++)j in s&&o(r,b,s[j]);return r.length=b,r}})}}]);
//# sourceMappingURL=chunk-928114d0.44358c7c.js.map