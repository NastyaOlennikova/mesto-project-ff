(()=>{"use strict";var t="https://nomoreparties.co/v1/wff-cohort-36",e="5648edd2-97cd-4c73-bb98-6063d9d54aba",n="application/json",r=function(){var n=document.querySelector(".profile__title"),r=document.querySelector(".profile__description"),o=document.querySelector(".profile__image");return fetch("".concat(t,"/users/me"),{headers:{authorization:e}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){return n.textContent=t.name,r.textContent=t.about,o.style.backgroundImage="url(".concat(t.avatar,")"),t}))},o=function(r){return fetch("".concat(t,"/cards/likes/").concat(r),{method:"PUT",headers:{authorization:e,"Content-Type":n}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))},c=function(r){return fetch("".concat(t,"cards/likes/").concat(r),{method:"DELETE",headers:{authorization:e,"Content-Type":n}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))};function i(r,o){(function(r){return fetch("".concat(t,"/cards/").concat(r),{method:"DELETE",headers:{authorization:e,"Content-Type":n}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))})(r).then((function(){o.remove()})).catch((function(t){console.error("Ошибка при удалении карточки:",t)}))}function u(t,e){var n=t.target,r=n.closest(".card").querySelector(".card__like-counter");(n.classList.contains("card__like-button_is-active")?c:o)(e).then((function(t){n.classList.toggle("card__like-button_is-active"),r.textContent=t.likes.length})).catch((function(t){console.error("Ошибка при обработке лайка:",t)}))}function a(t,e,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__image"),u=c.querySelector(".card__like-button"),a=c.querySelector(".card__like-counter"),l=c.querySelector(".card__delete-button");return c.querySelector(".card__title").textContent=t.name,i.src=t.link,i.alt=t.name,t.owner._id===o?l.addEventListener("click",(function(){return r(t.id,c)})):l.remove(),t.likes&&(a.textContent=t.likes.length),i.addEventListener("click",(function(){return n(t)})),u.addEventListener("click",(function(){return e(event,t.id)})),c}var l=function(t,e,n,r){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(n),o.textContent="",o.classList.remove(r)},s=function(t,e,n,r){var o=t.querySelector(n);o&&(function(t){return t.some((function(t){return!t.validity.valid}))}(e)?(o.disabled=!0,o.classList.add(r)):(o.disabled=!1,o.classList.remove(r)))},p="popup_is-opened";function f(t){var e,n,r,o;t.classList.add(p),e=t,n={formSelector:".popup__form",inputSelector:".popup__input",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled"},r=Array.from(e.querySelectorAll(n.inputSelector)),o=Array.from(e.querySelectorAll(".".concat(n.inputErrorClass))),r.forEach((function(t){l(e,t,n.inputErrorClass,n.errorClass)})),s(e,r,n.submitButtonSelector,n.inactiveButtonClass),o.forEach((function(t){t.textContent="",t.classList.remove(n.errorClass)})),document.addEventListener("keydown",m)}function d(t){t.classList.remove(p),document.removeEventListener("keydown",m)}function m(t){if("Escape"===t.key){var e=document.querySelector(".".concat(p));e&&d(e)}}function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function _(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function h(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?_(Object(n),!0).forEach((function(e){b(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function b(t,e,n){return(e=function(t){var e=function(t){if("object"!=y(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,"string");if("object"!=y(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==y(e)?e:e+""}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var S,k,C,g,E,q,j,L,w=document.querySelector(".places__list"),O=document.querySelector(".profile__edit-button"),P=document.querySelector(".profile__add-button"),A=document.querySelector(".popup_type_edit"),x=document.querySelector(".popup_type_new-card"),T=document.querySelector(".popup_type_image"),D=document.querySelector(".popup_type_avatar"),z=T.querySelector(".popup__image"),B=T.querySelector(".popup__caption"),I=document.querySelector(".profile__title"),N=document.querySelector(".profile__description"),M=document.querySelector(".profile__image"),J=document.forms.formAvatar,V=J.elements.avatarLink,H=document.querySelector(".profile__avatar-button"),U=document.forms.formEdit,$=U.elements.name,F=U.elements.description,G=document.forms.formImage,K=G.elements.placeName,Q=G.elements.link;function R(t){z.src=t.link,z.alt=t.name,B&&(B.textContent=t.name),f(T)}function W(t,e){e.textContent=t?"Сохранение...":"Сохранить"}document.querySelectorAll(".popup").forEach((function(t){t.classList.add("popup_is-animated"),function(t){t.querySelector(".popup__close").addEventListener("click",(function(){return d(t)})),t.addEventListener("mousedown",(function(e){e.target.classList.contains("popup")&&d(t)}))}(t)})),C=(k={formSelector:".popup__form",inputSelector:".popup__input",inputErrorClass:".popup__input_type_error",errorClass:"popup__input-error_active",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled"}).formSelector,g=k.inputSelector,E=k.inputErrorClass,q=k.errorClass,j=k.submitButtonSelector,L=k.inactiveButtonClass,Array.from(document.querySelectorAll(C)).forEach((function(t){t.addEventListener("submit",(function(t){t.preventDefault()})),function(t,e,n,r,o,c){var i=Array.from(t.querySelectorAll(e));s(t,i,o,c),i.forEach((function(e){e.addEventListener("input",(function(){!function(t,e,n,r){e.setCustomValidity(""),e.validity.valueMissing?e.setCustomValidity("Вы пропустили это поле"):e.validity.patternMismatch&&e.setCustomValidity(e.dataset.errorMessage),e.validity.valid?l(t,e,n,r):function(t,e,n,r,o){var c=t.querySelector(".".concat(e.id,"-error"));e.classList.add(r),c.textContent=n,c.classList.add(o)}(t,e,e.validationMessage,n,r)}(t,e,n,r),s(t,i,o,c)}))}))}(t,g,E,q,j,L)})),O.addEventListener("click",(function(){$.value=I.textContent,F.value=N.textContent,f(A)})),H.addEventListener("click",(function(){J.reset(),f(D)})),P.addEventListener("click",(function(){G.reset(),f(x)})),U.addEventListener("submit",(function(r){r.preventDefault();var o,c=U.querySelector(".popup__button");W(!0,c),(o={name:$.value,about:F.value},fetch("".concat(t,"/users/me"),{method:"PATCH",headers:{authorization:e,"Content-Type":n},body:JSON.stringify({name:o.name,about:o.about})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){I.textContent=t.name,N.textContent=t.about})).catch((function(t){console.error("Ошибка при обновлении профиля:",t)})).finally((function(){W(!1,c)})),d(A)})),G.addEventListener("submit",(function(o){o.preventDefault();var c,l=G.querySelector(".popup__button");W(!0,l),(c={name:K.value,link:Q.value},fetch("".concat(t,"/cards"),{method:"POST",headers:{authorization:e,"Content-Type":n},body:JSON.stringify({name:c.name,link:c.link})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){return r().then((function(){var e=a(h(h({},t),{},{id:t._id,ownerId:t.owner._id}),u,R,i,S);w.prepend(e)}))})).catch((function(t){console.error("Ошибка при добавлении карточки:",t)})).finally((function(){W(!1,l)})),d(x),G.reset()})),J.addEventListener("submit",(function(r){r.preventDefault();var o,c=J.querySelector(".popup__button");W(!0,c),(o=V.value,fetch("".concat(t,"/users/me/avatar"),{method:"PATCH",headers:{authorization:e,"Content-Type":n},body:JSON.stringify({avatar:o})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){M.style.backgroundImage="url(".concat(t.avatar,")")})).catch((function(t){console.error("Ошибка при обновлении аватара:",t)})).finally((function(){W(!1,c)})),d(D),J.reset()})),Promise.all([r(),fetch("".concat(t,"/cards"),{headers:{authorization:e}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){return t.map((function(t){return{name:t.name,link:t.link,likes:t.likes,owner:t.owner,id:t._id,ownerId:t.owner._id,ownerName:t.owner.name}}))}))]).then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c,i,u=[],a=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(u.push(r.value),u.length!==e);a=!0);}catch(t){l=!0,o=t}finally{try{if(!a&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw o}}return u}}(e,n)||function(t,e){if(t){if("string"==typeof t)return v(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];S=o._id,c.forEach((function(t){var e=a(t,u,R,i,S);w.appendChild(e)}))})).catch((function(t){console.error("Ошибка при загрузке данных:",t)}))})();