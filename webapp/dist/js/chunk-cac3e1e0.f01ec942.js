(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cac3e1e0"],{"2a1d":function(e,r,t){"use strict";t("64a3")},"34c3":function(e,r,t){"use strict";t.r(r);t("b0c0");var n=t("7a23"),l={class:"main"},a=Object(n["g"])("h1",null,"Sign up to RESTaurant Reservation",-1),o=Object(n["f"])("Have an account? "),u=Object(n["f"])(" Login here! "),s=Object(n["g"])("label",{for:"user-name"},"Name:",-1),c=Object(n["f"])(),i=Object(n["g"])("br",null,null,-1),b=Object(n["g"])("br",null,null,-1),p=Object(n["g"])("br",null,null,-1),d=Object(n["g"])("label",{for:"user-surname"},"Surname:",-1),O=Object(n["f"])(),j=Object(n["g"])("br",null,null,-1),f=Object(n["g"])("br",null,null,-1),m=Object(n["g"])("br",null,null,-1),g=Object(n["g"])("label",{for:"user-email"},"Email:",-1),h=Object(n["f"])(),w=Object(n["g"])("br",null,null,-1),y=Object(n["g"])("br",null,null,-1),v={key:0,style:{color:"red","font-size":"12px"},for:"user-confirm-password"},S=Object(n["g"])("br",null,null,-1),k=Object(n["g"])("br",null,null,-1),E=Object(n["g"])("label",{for:"user-password"},"Password:",-1),C=Object(n["f"])(),q=Object(n["g"])("br",null,null,-1),x=Object(n["g"])("br",null,null,-1),P=Object(n["g"])("br",null,null,-1),T=Object(n["g"])("label",{for:"user-password"},"Confirm password:",-1),z=Object(n["f"])(),D=Object(n["g"])("br",null,null,-1),U=Object(n["g"])("br",null,null,-1),J={key:1,style:{color:"red","font-size":"12px"},for:"user-confirm-password"},V=Object(n["g"])("br",null,null,-1),R=Object(n["g"])("br",null,null,-1),H=Object(n["g"])("input",{style:{"margin-top":"50px"},type:"submit",value:"Create account"},null,-1);function N(e,r,t,N,F,L){var I=Object(n["v"])("router-link");return Object(n["p"])(),Object(n["d"])("div",l,[a,Object(n["g"])("p",null,[o,Object(n["g"])(I,{to:"/login"},{default:Object(n["C"])((function(){return[u]})),_:1})]),Object(n["g"])("form",{style:{"margin-top":"50px"},onSubmit:r[8]||(r[8]=Object(n["E"])((function(){return e.onSubmit&&e.onSubmit.apply(e,arguments)}),["prevent"]))},[s,c,i,Object(n["D"])(Object(n["g"])("input",{"onUpdate:modelValue":r[1]||(r[1]=function(r){return e.name=r}),type:"text",id:"user-name",placeholder:"John",required:""},null,512),[[n["z"],e.name]]),b,p,d,O,j,Object(n["D"])(Object(n["g"])("input",{"onUpdate:modelValue":r[2]||(r[2]=function(r){return e.surname=r}),type:"text",id:"user-surname",placeholder:"Doe",required:""},null,512),[[n["z"],e.surname]]),f,m,g,h,w,Object(n["D"])(Object(n["g"])("input",{"onUpdate:modelValue":r[3]||(r[3]=function(r){return e.email=r}),type:"email",id:"user-email",placeholder:"johhn.doe@gmail.com",required:""},null,512),[[n["z"],e.email]]),y,e.responseError.length>0?(Object(n["p"])(),Object(n["d"])("label",v,Object(n["x"])(e.responseError),1)):Object(n["e"])("",!0),S,k,E,C,q,Object(n["D"])(Object(n["g"])("input",{"onUpdate:modelValue":r[4]||(r[4]=function(r){return e.password=r}),onChange:r[5]||(r[5]=function(){return e.validatePassword&&e.validatePassword.apply(e,arguments)}),type:"password",id:"user-password",placeholder:"query123@",required:""},null,544),[[n["z"],e.password]]),x,P,T,z,D,Object(n["D"])(Object(n["g"])("input",{"onUpdate:modelValue":r[6]||(r[6]=function(r){return e.passwordConfirm=r}),onChange:r[7]||(r[7]=function(){return e.validatePassword&&e.validatePassword.apply(e,arguments)}),type:"password",id:"user-confirm-password",placeholder:"query123@",required:""},null,544),[[n["z"],e.passwordConfirm]]),U,e.showError?(Object(n["p"])(),Object(n["d"])("label",J,"Password do not match!")):Object(n["e"])("",!0),V,R,H],32)])}var F=t("d4ec"),L=t("bee2"),I=t("262e"),M=t("2caf"),X=(t("ac1f"),t("5319"),t("9ab4")),_=t("ce1f"),A=t("afbc"),B=t("7dda"),G=function(e){Object(I["a"])(t,e);var r=Object(M["a"])(t);function t(){var e;return Object(F["a"])(this,t),e=r.apply(this,arguments),e.responseError="",e.showError=!1,e.name="",e.surname="",e.email="",e.password="",e.passwordConfirm="",e}return Object(L["a"])(t,[{key:"mounted",value:function(){B["a"].signInSilently()}},{key:"validatePassword",value:function(){this.showError=this.password!==this.passwordConfirm}},{key:"onSubmit",value:function(){var e=this,r={name:this.name,surname:this.surname,email:this.email,password:this.password};if(r.password===this.passwordConfirm){var t=new XMLHttpRequest;t.open("POST","http://localhost:12001/register",!0),t.setRequestHeader("Content-Type","application/json;charset=UTF-8"),t.onreadystatechange=function(){if(4===t.readyState){var n=JSON.parse(t.responseText);console.log(n),e.responseError="",void 0!==n.error?e.responseError=n.error:(localStorage.authToken=n.token,localStorage.authEmail=r.email,localStorage.authType=0,console.log("token is"),console.log(localStorage.authToken),A["a"].replace("/explore"))}},t.send(JSON.stringify(r))}}}]),t}(_["b"]);G=Object(X["a"])([Object(_["a"])({components:{}})],G);var K=G;t("2a1d");K.render=N;r["default"]=K},"64a3":function(e,r,t){},b0c0:function(e,r,t){var n=t("83ab"),l=t("9bf2").f,a=Function.prototype,o=a.toString,u=/^\s*function ([^ (]*)/,s="name";n&&!(s in a)&&l(a,s,{configurable:!0,get:function(){try{return o.call(this).match(u)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-cac3e1e0.f01ec942.js.map