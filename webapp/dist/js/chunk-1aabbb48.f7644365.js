(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1aabbb48"],{"557f":function(e,t,n){"use strict";n("ebbf")},"889f":function(e,t,n){e.exports=n.p+"img/557px-Barbieri_-_ViaSophia25668.ce76875b.jpg"},ad68:function(e,t,n){"use strict";n.r(t);var a=n("7a23"),r=n("889f"),u=n.n(r),l={class:"maina"},c={style:{"margin-top":"50px","min-width":"1000px"}},i=Object(a["g"])("img",{style:{display:"inline-block",width:"550px"},src:u.a},null,-1),o={style:{height:"50px","min-width":"400px",float:"right"}},b=Object(a["g"])("h2",null,"Reserve a table",-1),s=Object(a["g"])("br",null,null,-1),g=Object(a["g"])("label",{for:"guestNum"},"Guests:",-1),p=Object(a["f"])(),d=Object(a["g"])("br",null,null,-1),j=Object(a["g"])("br",null,null,-1),O=Object(a["g"])("br",null,null,-1),m=Object(a["g"])("label",{for:"date"},"Day:",-1),f=Object(a["f"])(),h=Object(a["g"])("br",null,null,-1),y=Object(a["g"])("br",null,null,-1),k=Object(a["g"])("br",null,null,-1),v=Object(a["g"])("label",{for:"time"},"Time:",-1),x=Object(a["f"])(),w=Object(a["g"])("br",null,null,-1),D=Object(a["g"])("br",null,null,-1),S=Object(a["g"])("br",null,null,-1),R=Object(a["g"])("br",null,null,-1),$=Object(a["g"])("input",{style:{padding:"5px 10px 5px 10px",width:"240px"},type:"submit",value:"Book now"},null,-1),z=Object(a["g"])("br",null,null,-1),P=Object(a["g"])("br",null,null,-1),V=Object(a["g"])("h1",null,"Menu",-1),B=Object(a["g"])("br",null,null,-1),T=Object(a["g"])("br",null,null,-1);function U(e,t,n,r,u,U){return Object(a["p"])(),Object(a["d"])("div",l,[Object(a["g"])("h1",null,"Restaurant "+Object(a["x"])(e.currentRestaurant.message),1),(Object(a["p"])(),Object(a["d"])(a["a"],null,Object(a["u"])(5,(function(t){return Object(a["g"])("span",{class:["fa fa-star",{checked:t<=(e.currentRestaurant.stars?e.currentRestaurant.stars:3)}],style:{"font-size":"20px"},key:t},null,2)})),64)),Object(a["g"])("h4",null,Object(a["x"])(e.currentRestaurant.address?e.currentRestaurant.address:"Via Pietro Cavallini 25, 00193 Rome Italy"),1),Object(a["g"])("div",c,[i,Object(a["g"])("div",o,[b,s,Object(a["g"])("form",{onSubmit:t[4]||(t[4]=Object(a["E"])((function(){return e.onSubmit&&e.onSubmit.apply(e,arguments)}),["prevent"]))},[g,p,d,Object(a["D"])(Object(a["g"])("input",{id:"guestNum",type:"number",min:"1",style:{width:"220px"},"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.bookingData.guests=t}),required:""},null,512),[[a["z"],e.bookingData.guests]]),j,O,m,f,h,Object(a["D"])(Object(a["g"])("input",{type:"date",id:"date","onUpdate:modelValue":t[2]||(t[2]=function(t){return e.bookingData.date=t}),min:e.bookingData.date,style:{width:"220px"}},null,8,["min"]),[[a["z"],e.bookingData.date]]),y,k,v,x,w,Object(a["D"])(Object(a["g"])("input",{type:"time",id:"time","onUpdate:modelValue":t[3]||(t[3]=function(t){return e.bookingData.time=t}),min:e.currentHour,style:{width:"220px"},required:""},null,8,["min"]),[[a["z"],e.bookingData.time]]),D,S,R,$],32)])]),z,P,Object(a["g"])("div",null,[V,B,(Object(a["p"])(!0),Object(a["d"])(a["a"],null,Object(a["u"])(e.exampleMenu,(function(e,t){return Object(a["p"])(),Object(a["d"])("div",{key:t},[Object(a["g"])("h2",null,Object(a["x"])(e["category"]),1),(Object(a["p"])(!0),Object(a["d"])(a["a"],null,Object(a["u"])(e.meals,(function(e,t){return Object(a["p"])(),Object(a["d"])("div",{class:"column",key:t},Object(a["x"])(e.item)+" - "+Object(a["x"])(e.price),1)})),128)),T])})),128))])])}var _=n("d4ec"),q=n("bee2"),E=n("262e"),H=n("2caf"),M=(n("fb6a"),n("ac1f"),n("5319"),n("b64b"),n("9ab4")),N=n("ce1f"),I=n("afbc"),J=n("7dda"),Y=function(e){Object(E["a"])(n,e);var t=Object(H["a"])(n);function n(){var e;return Object(_["a"])(this,n),e=t.apply(this,arguments),e.bookingData={guests:1,date:(new Date).toISOString().slice(0,10),time:e.currentHour},e.exampleMenu=[{category:"Antipasti",meals:[{item:"prosciutto",price:"5.5$"},{item:"suppli",price:"1.5$"}]},{category:"Primi",meals:[{item:"pasta al sugo",price:"2.5$"},{item:"pizza",price:"9.5$"}]},{category:"Secondi",meals:[{item:"carne",price:"15.5$"},{item:"pesce",price:"11.5$"}]}],e}return Object(q["a"])(n,[{key:"created",value:function(){this.restaurantProvided||(alert("No restaurant provided!"),I["a"].replace("/"))}},{key:"currentHour",get:function(){return(new Date).toLocaleTimeString().slice(0,5)}},{key:"onSubmit",value:function(){console.log(this.bookingData),void 0!==localStorage.authEmail&&void 0!==localStorage.authToken||console.log("You are not authenticated!"),J["a"].loginUser(localStorage.authEmail,localStorage.authToken,(function(e){void 0===e.error?console.log("Booking request sent!"):console.log("You are not authenticated!")}))}},{key:"currentRestaurant",get:function(){return this.$route.params}},{key:"restaurantProvided",get:function(){return Object.keys(this.currentRestaurant).length>0}},{key:"restaurantPic",get:function(){return this.restaurantProvided?this.currentRestaurant.picture:"../assets/557px-Barbieri_-_ViaSophia25668.jpg"}}]),n}(N["b"]);Y=Object(M["a"])([Object(N["a"])({components:{}})],Y);var A=Y;n("557f");A.render=U;t["default"]=A},b64b:function(e,t,n){var a=n("23e7"),r=n("7b0b"),u=n("df75"),l=n("d039"),c=l((function(){u(1)}));a({target:"Object",stat:!0,forced:c},{keys:function(e){return u(r(e))}})},ebbf:function(e,t,n){}}]);
//# sourceMappingURL=chunk-1aabbb48.f7644365.js.map