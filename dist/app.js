(()=>{"use strict";class e{constructor(e,t,n,r){this.templateElement=document.getElementById(e),this.hostElement=document.getElementById(t);const s=document.importNode(this.templateElement.content,!0);this.element=s.firstElementChild,r&&(this.element.id=r),this.attach(n)}attach(e){this.hostElement.insertAdjacentElement(e?"afterbegin":"beforeend",this.element)}}function t(e){let t=!0;return e.required&&(t=t&&0!==e.value.toString().trim().length),null!=e.minLength&&"string"==typeof e.value&&t&&(e.value.length,e.minLength),null!=e.maxLength&&"string"==typeof e.value&&t&&(e.value.length,e.maxLength),null!=e.min&&"number"==typeof e.value&&t&&(e.value,e.min),null!=e.max&&"number"==typeof e.value&&t&&(e.value,e.max),t}function n(e,t,n){const r=n.value;return{configurable:!0,get(){return r.bind(this)}}}var r;!function(e){e[e.Active=0]="Active",e[e.Finished=1]="Finished"}(r||(r={}));class s{constructor(e,t,n,r,s){this.id=e,this.title=t,this.description=n,this.manday=r,this.status=s}}class i extends class{constructor(){this.listeners=[]}addListener(e){this.listeners.push(e)}}{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new i),this.instance}addProject(e,t,n){const i=new s(Math.random().toString(),e,t,n,r.Active);this.projects.push(i),this.updateListener()}moveProject(e,t){const n=this.projects.find((t=>t.id===e));n&&n.status!==t&&(n.status=t,this.updateListener())}updateListener(){for(const e of this.listeners)e(this.projects.slice())}}const a=i.getInstance();class l extends e{constructor(){super("project-input","app",!0,"user-input"),this.titleInputElement=this.element.querySelector("#title"),this.descriptionInputElement=this.element.querySelector("#description"),this.mandayElement=this.element.querySelector("#manday"),this.configure()}configure(){this.element.addEventListener("submit",this.submitHandler)}renderContent(){}gatherUserinput(){const e=this.titleInputElement.value,n=this.descriptionInputElement.value,r=this.mandayElement.value,s={value:n,required:!0,minLength:5},i={value:+r,required:!0,min:1,max:1e3};return t({value:e,required:!0})&&t(s)&&t(i)?[e,n,+r]:void alert("入力が正しくありません。")}clearInput(){this.titleInputElement.value="",this.descriptionInputElement.value="",this.mandayElement.value=""}submitHandler(e){e.preventDefault();const t=this.gatherUserinput();if(Array.isArray(t)){const[e,n,r]=t;a.addProject(e,n,r),this.clearInput()}}}!function(e,t,n,r){var s,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(a=(i<3?s(a):i>3?s(t,n,a):s(t,n))||a);i>3&&a&&Object.defineProperty(t,n,a)}([n],l.prototype,"submitHandler",null);class o extends e{constructor(e,t){super("single-project",e,!1,t.id),this.project=t,this.configure(),this.renderContent()}get manday(){return this.project.manday<20?this.project.manday.toString()+"人日":(this.project.manday/20).toString()+"人月"}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){console.log("drag終了")}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragend",this.dragEndHandler)}renderContent(){this.element.querySelector("h2").textContent=this.project.title,this.element.querySelector("h3").textContent=this.manday,this.element.querySelector("p").textContent=this.project.description}}!function(e,t,n,r){var s,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(a=(i<3?s(a):i>3?s(t,n,a):s(t,n))||a);i>3&&a&&Object.defineProperty(t,n,a)}([n],o.prototype,"dragStartHandler",null);var c=function(e,t,n,r){var s,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(a=(i<3?s(a):i>3?s(t,n,a):s(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a};class d extends e{constructor(e){super("project-list","app",!1,e+"-projects"),this.type=e,this.assignedProject=[],this.configure(),this.renderContent()}dragOverHandler(e){e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]&&(e.preventDefault(),this.element.querySelector("ul").classList.add("droppable"))}dropHandler(e){const t=e.dataTransfer.getData("text/plain");a.moveProject(t,"active"===this.type?r.Active:r.Finished)}dragLeaveHandler(e){this.element.querySelector("ul").classList.remove("droppable")}configure(){this.element.addEventListener("dragover",this.dragOverHandler),this.element.addEventListener("drop",this.dropHandler),this.element.addEventListener("dragleave",this.dragLeaveHandler),a.addListener((e=>{const t=e.filter((e=>"active"===this.type?e.status===r.Active:e.status===r.Finished));this.assignedProject=t,this.renderProjects()}))}renderContent(){const e=this.type+"-projects-list";this.element.querySelector("ul").id=e,this.element.querySelector("h2").textContent="active"===this.type?"実行中プロジェクト":"完了したプロジェクト"}renderProjects(){const e=document.getElementById(this.type+"-projects-list");e.innerHTML="";for(const t of this.assignedProject)new o(e.id,t)}}c([n],d.prototype,"dragOverHandler",null),c([n],d.prototype,"dropHandler",null),c([n],d.prototype,"dragLeaveHandler",null),new l,new d("active"),new d("finished")})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90eXBlcy1maXJzdC1hcHAvLi9zcmMvY29tcG9uZW50cy9iYXNlLnRzIiwid2VicGFjazovL3R5cGVzLWZpcnN0LWFwcC8uL3NyYy91dGlsL3ZhbGlkYXRlLnRzIiwid2VicGFjazovL3R5cGVzLWZpcnN0LWFwcC8uL3NyYy9kZWNvcmF0b3JzL2F1dG9iaW5kLnRzIiwid2VicGFjazovL3R5cGVzLWZpcnN0LWFwcC8uL3NyYy9tb2RlbHMvcHJvamVjdC50cyIsIndlYnBhY2s6Ly90eXBlcy1maXJzdC1hcHAvLi9zcmMvc3RhdGUvcHJvamVjdC1zdGF0ZS50cyIsIndlYnBhY2s6Ly90eXBlcy1maXJzdC1hcHAvLi9zcmMvY29tcG9uZW50cy9pbnB1dC50cyIsIndlYnBhY2s6Ly90eXBlcy1maXJzdC1hcHAvLi9zcmMvY29tcG9uZW50cy9pdGVtLnRzIiwid2VicGFjazovL3R5cGVzLWZpcnN0LWFwcC8uL3NyYy9jb21wb25lbnRzL2xpc3QudHMiLCJ3ZWJwYWNrOi8vdHlwZXMtZmlyc3QtYXBwLy4vc3JjL2FwcC50cyJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJ0ZW1wbGF0ZUlkIiwiaG9zdEVsZW1lbnRJZCIsImluc2VydEF0U3RhcnQiLCJuZXdFbGVtZW50SWQiLCJ0aGlzIiwidGVtcGxhdGVFbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImhvc3RFbGVtZW50IiwiaW1wb3J0ZWROb2RlIiwiaW1wb3J0Tm9kZSIsImNvbnRlbnQiLCJlbGVtZW50IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJpZCIsImF0dGFjaCIsImluc2VydEF0QmlnaW5uaW5nIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwidmFsaWRhdGUiLCJ2YWxpZGF0YWJsZUlucHV0IiwiaXNWYWxpZCIsInJlcXVpcmVkIiwidmFsdWUiLCJ0b1N0cmluZyIsInRyaW0iLCJsZW5ndGgiLCJtaW5MZW5ndGgiLCJtYXhMZW5ndGgiLCJtaW4iLCJtYXgiLCJhdXRvYmluZCIsInRhcmdldCIsIm1ldGhvZE5hbWUiLCJkZXNjcmlwdGVyIiwib3JpZ2luYWxNZXRob2RzIiwiY29uZmlndXJhYmxlIiwiYmluZCIsIlByb2plY3RTdGF0dXMiLCJQcm9qZWN0IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsIm1hbmRheSIsInN0YXR1cyIsIlByb2plY3RTdGF0ZSIsImxpc3RlbmVycyIsImxpc3RlbmVyRm4iLCJwdXNoIiwic3VwZXIiLCJwcm9qZWN0cyIsImluc3RhbmNlIiwibmV3UHJvamVjdCIsIk1hdGgiLCJyYW5kb20iLCJBY3RpdmUiLCJ1cGRhdGVMaXN0ZW5lciIsInByb2plY3RJZCIsIm5ld1N0YXR1cyIsInByb2plY3QiLCJmaW5kIiwicHJqIiwic2xpY2UiLCJwcm9qZWN0U3RhdGUiLCJnZXRJbnN0YW5jZSIsIlByb2plY3RJbnB1dCIsInRpdGxlSW5wdXRFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImRlc2NyaXB0aW9uSW5wdXRFbGVtZW50IiwibWFuZGF5RWxlbWVudCIsImNvbmZpZ3VyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWJtaXRIYW5kbGVyIiwiZW50ZXJlZFRpdGxlIiwiZW50ZXJlZERlc2NyaXB0aW9uIiwiZW50ZXJlZE1hbmRheSIsImRlc2NyaXB0aW9uVmFsaWRhdGFibGUiLCJtYW5kYXlWYWxpZGF0YWJsZSIsImFsZXJ0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInVzZXJpbnB1dCIsImdhdGhlclVzZXJpbnB1dCIsIkFycmF5IiwiaXNBcnJheSIsImFkZFByb2plY3QiLCJjbGVhcklucHV0IiwiUHJvamVjdEl0ZW0iLCJob3N0SWQiLCJyZW5kZXJDb250ZW50IiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImVmZmVjdEFsbG93ZWQiLCJfZXZlbnQiLCJjb25zb2xlIiwibG9nIiwiZHJhZ1N0YXJ0SGFuZGxlciIsImRyYWdFbmRIYW5kbGVyIiwidGV4dENvbnRlbnQiLCJQcm9qZWN0TGlzdCIsInR5cGUiLCJhc3NpZ25lZFByb2plY3QiLCJ0eXBlcyIsImNsYXNzTGlzdCIsImFkZCIsInByaklkIiwiZ2V0RGF0YSIsIm1vdmVQcm9qZWN0IiwiRmluaXNoZWQiLCJyZW1vdmUiLCJkcmFnT3ZlckhhbmRsZXIiLCJkcm9wSGFuZGxlciIsImRyYWdMZWF2ZUhhbmRsZXIiLCJhZGRMaXN0ZW5lciIsInJlbGV2YW50UHJvamVjdHMiLCJmaWx0ZXIiLCJyZW5kZXJQcm9qZWN0cyIsImxpc3RJZCIsImxpc3RFbCIsImlubmVySFRNTCIsInByakl0ZW0iXSwibWFwcGluZ3MiOiJtQkFFTyxNQUFlQSxFQUtwQixZQUFZQyxFQUFvQkMsRUFBc0JDLEVBQXdCQyxHQUM1RUMsS0FBS0MsZ0JBQWtCQyxTQUFTQyxlQUFlUCxHQUMvQ0ksS0FBS0ksWUFBY0YsU0FBU0MsZUFBZU4sR0FFM0MsTUFBTVEsRUFBZUgsU0FBU0ksV0FBV04sS0FBS0MsZ0JBQWdCTSxTQUFTLEdBQ3ZFUCxLQUFLUSxRQUFVSCxFQUFhSSxrQkFDeEJWLElBQ0ZDLEtBQUtRLFFBQVFFLEdBQUtYLEdBRXBCQyxLQUFLVyxPQUFPYixHQUtOLE9BQU9jLEdBQ2JaLEtBQUtJLFlBQVlTLHNCQUFzQkQsRUFBb0IsYUFBZSxZQUFhWixLQUFLUSxVQ1h6RixTQUFTTSxFQUFTQyxHQUN2QixJQUFJQyxHQUFVLEVBZ0JkLE9BZklELEVBQWlCRSxXQUNuQkQsRUFBVUEsR0FBK0QsSUFBcERELEVBQWlCRyxNQUFNQyxXQUFXQyxPQUFPQyxRQUU5QixNQUE5Qk4sRUFBaUJPLFdBQXVELGlCQUEzQlAsRUFBaUJHLE9BQ2hFRixJQUFXRCxFQUFpQkcsTUFBTUcsT0FBVU4sRUFBaUJPLFdBRTdCLE1BQTlCUCxFQUFpQlEsV0FBdUQsaUJBQTNCUixFQUFpQkcsT0FDaEVGLElBQVdELEVBQWlCRyxNQUFNRyxPQUFVTixFQUFpQlEsV0FFbkMsTUFBeEJSLEVBQWlCUyxLQUFpRCxpQkFBM0JULEVBQWlCRyxPQUMxREYsSUFBV0QsRUFBaUJHLE1BQVNILEVBQWlCUyxLQUU1QixNQUF4QlQsRUFBaUJVLEtBQWlELGlC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cUUsVUFLL0YsaUJBQWlCZixHQUNBdkYsS0FBS1EsUUFBUXFELGNBQWMsTUFDbkNvQyxVQUFVTSxPQUFPLGFBRzFCLFlBQ0V2RyxLQUFLUSxRQUFReUQsaUJBQWlCLFdBQVlqRSxLQUFLd0csaUJBQy9DeEcsS0FBS1EsUUFBUXlELGlCQUFpQixPQUFRakUsS0FBS3lHLGFBQzNDekcsS0FBS1EsUUFBUXlELGlCQUFpQixZQUFZakUsS0FBSzBHLGtCQUUvQ2pELEVBQWFrRCxhQUFhL0QsSUFDeEIsTUFBTWdFLEVBQW1CaEUsRUFBU2lFLFFBQU90RCxHQUNyQixXQUFkdkQsS0FBSzhGLEtBQ0F2QyxFQUFJakIsU0FBV0wsRUFBY2dCLE9BRS9CTSxFQUFJakIsU0FBV0wsRUFBY3FFLFdBRXRDdEcsS0FBSytGLGdCQUFrQmEsRUFDdkI1RyxLQUFLOEcsb0JBSVQsZ0JBQ0UsTUFBTUMsRUFBWS9HLEtBQUs4RixLQUFSLGlCQUNmOUYsS0FBS1EsUUFBUXFELGNBQWMsTUFBT25ELEdBQUtxRyxFQUN2Qy9HLEtBQUtRLFFBQVFxRCxjQUFjLE1BQU8rQixZQUE0QixXQUFkNUYsS0FBSzhGLEtBQW9CLFlBQWMsYUFHakYsaUJBQ04sTUFBTWtCLEVBQVM5RyxTQUFTQyxlQUFrQkgsS0FBSzhGLEtBQVIsa0JBQ3ZDa0IsRUFBT0MsVUFBWSxHQUNuQixJQUFLLE1BQU1DLEtBQVdsSCxLQUFLK0YsZ0JBQ3pCLElBQUlkLEVBQVkrQixFQUFPdEcsR0FBSXdHLElBakQvQixHQURDeEYsRyxvQ0FXRCxHQURDQSxHLGdDQVFELEdBRENBLEcscUNDaENILElBQUlpQyxFQUNKLElBQUlrQyxFQUFZLFVBQ2hCLElBQUlBLEVBQVksYSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vQ29tcG9uZW50IGNsYXNzXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50PFQgZXh0ZW5kcyBIVE1MRWxlbWVudCxVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcbiAgdGVtcGxhdGVFbGVtZW50OiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICBob3N0RWxlbWVudDogVDtcbiAgZWxlbWVudDogVTtcblxuICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZUlkOiBzdHJpbmcsIGhvc3RFbGVtZW50SWQ6IHN0cmluZyxpbnNlcnRBdFN0YXJ0OiBib29sZWFuLCBuZXdFbGVtZW50SWQ/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnRlbXBsYXRlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRlbXBsYXRlSWQpISBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKSEgYXMgVDtcblxuICAgIGNvbnN0IGltcG9ydGVkTm9kZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy50ZW1wbGF0ZUVsZW1lbnQuY29udGVudCwgdHJ1ZSlcbiAgICB0aGlzLmVsZW1lbnQgPSBpbXBvcnRlZE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQgYXMgVTtcbiAgICBpZiAobmV3RWxlbWVudElkKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuaWQgPSBuZXdFbGVtZW50SWRcbiAgICB9XG4gICAgdGhpcy5hdHRhY2goaW5zZXJ0QXRTdGFydClcbiAgfVxuICBhYnN0cmFjdCBjb25maWd1cmUoKTogdm9pZFxuICBhYnN0cmFjdCByZW5kZXJDb250ZW50KCk6IHZvaWRcblxuICBwcml2YXRlIGF0dGFjaChpbnNlcnRBdEJpZ2lubmluZzogYm9vbGVhbikge1xuICAgIHRoaXMuaG9zdEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KGluc2VydEF0QmlnaW5uaW5nID8gJ2FmdGVyYmVnaW4nIDogJ2JlZm9yZWVuZCcsIHRoaXMuZWxlbWVudClcbiAgfVxufVxuXG4iLCJcbi8vdmFsaWRhdGlvblxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0YWJsZSB7XG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXJcbiAgcmVxdWlyZWQ/OiBib29sZWFuXG4gIG1pbkxlbmd0aD86IG51bWJlclxuICBtYXhMZW5ndGg/OiBudW1iZXJcbiAgbWluPzogbnVtYmVyXG4gIG1heD86IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGUodmFsaWRhdGFibGVJbnB1dDogVmFsaWRhdGFibGUpIHtcbiAgbGV0IGlzVmFsaWQgPSB0cnVlXG4gIGlmICh2YWxpZGF0YWJsZUlucHV0LnJlcXVpcmVkKSB7XG4gICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggIT09IDBcbiAgfVxuICBpZiAodmFsaWRhdGFibGVJbnB1dC5taW5MZW5ndGggIT0gbnVsbCAmJiB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoID49IHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoXG4gIH1cbiAgaWYgKHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoICE9IG51bGwgJiYgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA8PSB2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aFxuICB9XG4gIGlmICh2YWxpZGF0YWJsZUlucHV0Lm1pbiAhPSBudWxsICYmIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA+PSB2YWxpZGF0YWJsZUlucHV0Lm1pblxuICB9XG4gIGlmICh2YWxpZGF0YWJsZUlucHV0Lm1heCAhPSBudWxsICYmIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA8PSB2YWxpZGF0YWJsZUlucHV0Lm1heFxuICB9XG4gIHJldHVybiBpc1ZhbGlkXG59XG5cbiIsIlxuLy9hdXRvYmluZCBkZWNvcmV0b3JcbmV4cG9ydCBmdW5jdGlvbiBhdXRvYmluZCh0YXJnZXQ6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBkZXNjcmlwdGVyOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgY29uc3Qgb3JpZ2luYWxNZXRob2RzID0gZGVzY3JpcHRlci52YWx1ZVxuICBjb25zdCBhYmpEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldCgpIHtcbiAgICAgIGNvbnN0IGJvdW5kRm4gPSBvcmlnaW5hbE1ldGhvZHMuYmluZCh0aGlzKVxuICAgICAgcmV0dXJuIGJvdW5kRm47XG4gICAgfVxuICB9XG4gIHJldHVybiBhYmpEZXNjcmlwdG9yXG59XG5cbiIsIlxuLy9wcm9qZWN0IHR5cGVcbmV4cG9ydCBlbnVtIFByb2plY3RTdGF0dXMge1xuICBBY3RpdmUsRmluaXNoZWRcbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIHRpdGxlOiBzdHJpbmcsIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLCBwdWJsaWMgbWFuZGF5OiBudW1iZXIsIHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXMpIHtcblxuICB9XG59XG5cbiIsImltcG9ydCB7UHJvamVjdCwgUHJvamVjdFN0YXR1c30gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QnXG4vL1Byb2plY3QgU3RhdGUgTWFuYWdlbWVudFxudHlwZSBMaXN0ZW5lcjxUPiA9IChpdGVtczogVFtdKSA9PiB2b2lkXG5cbmNsYXNzIFN0YXRlPFQ+IHtcbiAgcHJvdGVjdGVkIGxpc3RlbmVyczogTGlzdGVuZXI8VD5bXSA9IFtdXG4gIGFkZExpc3RlbmVyKGxpc3RlbmVyRm46IExpc3RlbmVyPFQ+KSB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lckZuKVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0PiB7XG4gIFxuICBwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0W10gPSBbXVxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlXG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gIH1cblxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXG4gICAgfVxuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUHJvamVjdFN0YXRlKClcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxuICB9XG5cbiAgXG5cbiAgYWRkUHJvamVjdCh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBtYW5kYXk6IG51bWJlcikge1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChcbiAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBtYW5kYXksXG4gICAgICBQcm9qZWN0U3RhdHVzLkFjdGl2ZVxuICAgIClcbiAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdClcbiAgICB0aGlzLnVwZGF0ZUxpc3RlbmVyKClcbiAgfVxuICBtb3ZlUHJvamVjdChwcm9qZWN0SWQ6IHN0cmluZywgbmV3U3RhdHVzOiBQcm9qZWN0U3RhdHVzKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZChwcmogPT4gcHJqLmlkID09PSBwcm9qZWN0SWQpXG4gICAgaWYgKHByb2plY3QgJiYgcHJvamVjdC5zdGF0dXMgIT09IG5ld1N0YXR1cykge1xuICAgICAgcHJvamVjdC5zdGF0dXMgPSBuZXdTdGF0dXNcbiAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXIoKVxuICAgIH1cbiAgfVxuICBwcml2YXRlIHVwZGF0ZUxpc3RlbmVyKCkge1xuICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgbGlzdGVuZXJGbih0aGlzLnByb2plY3RzLnNsaWNlKCkpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBwcm9qZWN0U3RhdGUgPSBQcm9qZWN0U3RhdGUuZ2V0SW5zdGFuY2UoKVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IFZhbGlkYXRhYmxlLCB2YWxpZGF0ZSB9IGZyb20gJy4uL3V0aWwvdmFsaWRhdGUnXG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQnXG5pbXBvcnQge3Byb2plY3RTdGF0ZX0gZnJvbSAnLi4vc3RhdGUvcHJvamVjdC1zdGF0ZSdcbi8vIFByb2plY3RJbnB1dCBjbGFzc1xuZXhwb3J0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCxIVE1MRm9ybUVsZW1lbnQ+e1xuICB0aXRsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcbiAgZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIG1hbmRheUVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFwicHJvamVjdC1pbnB1dFwiLFwiYXBwXCIsdHJ1ZSxcInVzZXItaW5wdXRcIilcbiAgICBcbiAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIikgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLm1hbmRheUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYW5kYXlcIikgYXMgSFRNTElucHV0RWxlbWVudFxuXG4gICAgdGhpcy5jb25maWd1cmUoKTtcbiAgfVxuXG4gIGNvbmZpZ3VyZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRIYW5kbGVyKVxuICB9XG5cbiAgcmVuZGVyQ29udGVudCgpIHt9XG5cbiAgcHJpdmF0ZSBnYXRoZXJVc2VyaW5wdXQoKSA6W3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHwgdm9pZCB7XG4gICAgY29uc3QgZW50ZXJlZFRpdGxlID0gdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZVxuICAgIGNvbnN0IGVudGVyZWREZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWVcbiAgICBjb25zdCBlbnRlcmVkTWFuZGF5ID0gdGhpcy5tYW5kYXlFbGVtZW50LnZhbHVlXG5cbiAgICBjb25zdCB0aXRsZVZhbGlkYXRhYmxlOiBWYWxpZGF0YWJsZSA9IHtcbiAgICAgIHZhbHVlOiBlbnRlcmVkVGl0bGUsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9XG4gICAgY29uc3QgZGVzY3JpcHRpb25WYWxpZGF0YWJsZTogVmFsaWRhdGFibGUgPSB7XG4gICAgICB2YWx1ZTogZW50ZXJlZERlc2NyaXB0aW9uLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBtaW5MZW5ndGg6IDVcbiAgICB9XG4gICAgY29uc3QgbWFuZGF5VmFsaWRhdGFibGU6IFZhbGlkYXRhYmxlID0ge1xuICAgICAgdmFsdWU6ICtlbnRlcmVkTWFuZGF5LFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBtaW46IDEsXG4gICAgICBtYXg6IDEwMDBcbiAgICB9XG4gICAgaWYgKCF2YWxpZGF0ZSh0aXRsZVZhbGlkYXRhYmxlKSB8fCAhdmFsaWRhdGUoZGVzY3JpcHRpb25WYWxpZGF0YWJsZSkgfHwgIXZhbGlkYXRlKG1hbmRheVZhbGlkYXRhYmxlKSkge1xuICAgICAgYWxlcnQoJ+WFpeWKm+OBjOato+OBl+OBj+OBguOCiuOBvuOBm+OCk+OAgicpXG4gICAgICByZXR1cm5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtlbnRlcmVkVGl0bGUsIGVudGVyZWREZXNjcmlwdGlvbiwgK2VudGVyZWRNYW5kYXldXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhcklucHV0KCkge1xuICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiO1xuICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiXG4gICAgdGhpcy5tYW5kYXlFbGVtZW50LnZhbHVlID0gXCJcIlxuICB9XG5cbiAgQGF1dG9iaW5kXG4gIHByaXZhdGUgc3VibWl0SGFuZGxlcihldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHVzZXJpbnB1dCA9IHRoaXMuZ2F0aGVyVXNlcmlucHV0KClcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh1c2VyaW5wdXQpKSB7XG4gICAgICBjb25zdCBbdGl0bGUsIGRlc2NyaXB0aW9uLCBtYW5kYXldID0gdXNlcmlucHV0XG4gICAgICBwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSxkZXNjcmlwdGlvbixtYW5kYXkpXG4gICAgICB0aGlzLmNsZWFySW5wdXQoKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gJy4uL21vZGVscy9kcmFnLWRyb3AnXG5pbXBvcnQge1Byb2plY3R9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0J1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJ1xuXG4vL3Byb2plY3QgaXRlbVxuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxVTGlzdEVsZW1lbnQsIEhUTUxMSUVsZW1lbnQ+IGltcGxlbWVudHMgRHJhZ2dhYmxle1xuICBwcml2YXRlIHByb2plY3Q6IFByb2plY3RcbiAgZ2V0IG1hbmRheSgpIHtcbiAgICBpZiAodGhpcy5wcm9qZWN0Lm1hbmRheSA8IDIwKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9qZWN0Lm1hbmRheS50b1N0cmluZygpICsgJ+S6uuaXpSdcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICh0aGlzLnByb2plY3QubWFuZGF5IC8gMjApLnRvU3RyaW5nKCkgKyAn5Lq65pyIJ1xuICAgIH1cbiAgfVxuICBjb25zdHJ1Y3Rvcihob3N0SWQ6IHN0cmluZywgcHJvamVjdDogUHJvamVjdCkge1xuICAgIHN1cGVyKFwic2luZ2xlLXByb2plY3RcIiwgaG9zdElkLCBmYWxzZSwgcHJvamVjdC5pZClcbiAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0XG5cbiAgICB0aGlzLmNvbmZpZ3VyZSgpXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KClcbiAgfVxuICBAYXV0b2JpbmRcbiAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5wcm9qZWN0LmlkKVxuICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJ1xuICB9XG4gIGRyYWdFbmRIYW5kbGVyKF9ldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ2RyYWfntYLkuoYnKTtcbiAgICBcbiAgfVxuICBjb25maWd1cmUoKSB7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcilcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZEhhbmRsZXIpXG4gIH1cbiAgcmVuZGVyQ29udGVudCgpIHtcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDInKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QudGl0bGVcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDMnKSEudGV4dENvbnRlbnQgPSB0aGlzLm1hbmRheVxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdwJykhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LmRlc2NyaXB0aW9uXG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IERyYWdUYXJnZXQgfSBmcm9tICcuLi9tb2RlbHMvZHJhZy1kcm9wJ1xuaW1wb3J0IHtQcm9qZWN0LCBQcm9qZWN0U3RhdHVzfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdCdcbmltcG9ydCB7IGF1dG9iaW5kIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZCdcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gJy4uL3N0YXRlL3Byb2plY3Qtc3RhdGUnXG5pbXBvcnQgeyBQcm9qZWN0SXRlbX1mcm9tICcuL2l0ZW0nXG5cbi8vUHJvamVjdGxpc3QgY2xhc3NcbmV4cG9ydCBjbGFzcyBQcm9qZWN0TGlzdCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCxIVE1MRWxlbWVudD4gaW1wbGVtZW50cyBEcmFnVGFyZ2V0e1xuICBhc3NpZ25lZFByb2plY3Q6IFByb2plY3RbXVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6ICdhY3RpdmUnIHwgJ2ZpbmlzaGVkJykge1xuICAgIHN1cGVyKFwicHJvamVjdC1saXN0XCIsXCJhcHBcIixmYWxzZSxgJHt0eXBlfS1wcm9qZWN0c2ApXG4gICAgdGhpcy5hc3NpZ25lZFByb2plY3QgPSBbXVxuXG4gICAgdGhpcy5jb25maWd1cmUoKVxuICAgIHRoaXMucmVuZGVyQ29udGVudCgpXG4gIH1cblxuICBAYXV0b2JpbmRcbiAgZHJhZ092ZXJIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHsgXG4gICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF0gPT09ICd0ZXh0L3BsYWluJykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhXG4gICAgICBsaXN0RWwuY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJylcbiAgICB9XG4gICAgXG4gIH1cblxuICBAYXV0b2JpbmRcbiAgZHJvcEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCkgeyBcbiAgICBjb25zdCBwcmpJZCA9IGV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xuICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChwcmpJZCx0aGlzLnR5cGUgPT09ICdhY3RpdmUnID8gUHJvamVjdFN0YXR1cy5BY3RpdmUgOiBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkKVxuICAgIFxuICB9XG5cbiAgQGF1dG9iaW5kXG4gIGRyYWdMZWF2ZUhhbmRsZXIoX2V2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSFcbiAgICBsaXN0RWwuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcHBhYmxlJylcbiAgfVxuXG4gIGNvbmZpZ3VyZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVySGFuZGxlcilcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuZHJvcEhhbmRsZXIpXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsdGhpcy5kcmFnTGVhdmVIYW5kbGVyKVxuXG4gICAgcHJvamVjdFN0YXRlLmFkZExpc3RlbmVyKChwcm9qZWN0czogUHJvamVjdFtdKSA9PiB7XG4gICAgICBjb25zdCByZWxldmFudFByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKHByaiA9PiB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdhY3RpdmUnKSB7XG4gICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQWN0aXZlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuRmluaXNoZWRcbiAgICAgIH0pXG4gICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdCA9IHJlbGV2YW50UHJvamVjdHNcbiAgICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKVxuICAgIH0pXG4gIH1cblxuICByZW5kZXJDb250ZW50KCkge1xuICAgIGNvbnN0IGxpc3RJZCA9IGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGBcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSEuaWQgPSBsaXN0SWRcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDInKSEudGV4dENvbnRlbnQgPSB0aGlzLnR5cGUgPT09ICdhY3RpdmUnID8gJ+Wun+ihjOS4reODl+ODreOCuOOCp+OCr+ODiCcgOiAn5a6M5LqG44GX44Gf44OX44Ot44K444Kn44Kv44OIJ1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJQcm9qZWN0cygpIHtcbiAgICBjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgKSEgYXMgSFRNTFVMaXN0RWxlbWVudFxuICAgIGxpc3RFbC5pbm5lckhUTUwgPSAnJztcbiAgICBmb3IgKGNvbnN0IHByakl0ZW0gb2YgdGhpcy5hc3NpZ25lZFByb2plY3QpIHtcbiAgICAgIG5ldyBQcm9qZWN0SXRlbShsaXN0RWwuaWQsIHByakl0ZW0pXG4gICAgfVxuICB9XG59XG5cbiIsImltcG9ydCB7UHJvamVjdElucHV0IH0gZnJvbSAnLi9jb21wb25lbnRzL2lucHV0J1xuaW1wb3J0IHtQcm9qZWN0TGlzdH0gZnJvbSAnLi9jb21wb25lbnRzL2xpc3QnXG5cbm5ldyBQcm9qZWN0SW5wdXQoKVxubmV3IFByb2plY3RMaXN0KCdhY3RpdmUnKVxubmV3IFByb2plY3RMaXN0KCdmaW5pc2hlZCcpXG4iXSwic291cmNlUm9vdCI6IiJ9