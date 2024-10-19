import{S as c,i as a}from"./assets/vendor-5ObWk2rO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const u="46607456-5552cc86243543e4de6027df0",f="https://pixabay.com/api/",d=document.getElementById("search-form"),l=document.querySelector(".gallery");let m=new c(".gallery a",{captionsData:"alt",captionDelay:250});async function p(e){const t=await fetch(`${f}?key=${u}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true`);if(!t.ok)throw new Error("Error fetching data");return t.json()}function y(){l.innerHTML=""}function g(e){return`
    <li class="gallery-item">
      <a href="${e.largeImageURL}" class="gallery-link">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${e.likes}</p>
        <p><b>Views:</b> ${e.views}</p>
        <p><b>Comments:</b> ${e.comments}</p>
        <p><b>Downloads:</b> ${e.downloads}</p>
      </div>
    </li>
  `}function h(e){y();const t=e.map(g).join("");l.insertAdjacentHTML("beforeend",t),m.refresh()}d.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget.elements.query.value.trim();if(!t){a.error({title:"Error",message:"Please enter a search query!"});return}try{const n=await p(t);n.hits.length===0?a.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"}):h(n.hits)}catch{a.error({title:"Error",message:"Something went wrong! Please try again later."})}});
//# sourceMappingURL=index.js.map
