/**

@function
@name useExist
@description a custom hook to observe the existence of an element in the DOM
@param {string} selector - a string selector to search the element in the DOM
@returns {Promise} a Promise that resolves to the found element when it appears in the DOM
*/
function useExist(selector) {
 return new Promise((resolve) => {
   let el = document.querySelector(selector);
   if (el) {
     resolve(el); 
     return
   }
   new MutationObserver((mutationRecords, observer) => {
     // Query for elements matching the specified selector
     Array.from(document.querySelectorAll(selector)).forEach((element) => {
       resolve(element);
       //Once we have resolved we don't need the observer anymore.
       observer.disconnect();
     });
   })
     .observe(document.documentElement, {
       childList: true,
       subtree: true
     });
 });
}

export default useExist