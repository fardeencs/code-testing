import { Injectable, Type, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(@Inject(DOCUMENT) private document: Document) {

  }

  private instances: { [key: string]: Type<any> } = {};

  public registerInstance(name: string, instance: Type<any>) {
    this.instances[name] = instance;
  }

  public removeInstance(name: string, instance: Type<any>) {
    if (this.instances[name] === instance) {
      delete this.instances[name];
    }
  }

  // public hide(name: string) {
  //   this.instances[name].hide();
  // }

  // public show(name: string) {
  //   this.instances[name].show();
  // }

  // loadingServiceShow(zindex, id, flag) {
  //   try {
  //     // const _id = $("[data-loader=" + id + "]");
  //     const _id: HTMLElement = this.document.getElementById('[data-loader=' + id + ']');
  //     console.log('id', _id);
  //     // _id.CenterLoader(zindex, _id, flag);
  //   } catch (error) {
  //     this.loadingServiceHide(id);
  //   }
  // }

  // loadingServiceHide(id) {

  // }

  // CenterLoader(zindex, id: HTMLElement, flag) {
  //   const height = id.outerHeight() + "px";
  //   const width = id.outerWidth() + "px";
  //   const top = id.offset.top;
  //   const left = id.offset().left;
  //   const loadingContainer = "body";
  //   if (flag == true) {
  //     top = 0;
  //     left = 0;
  //     loadingContainer = this;
  //   }
  //   const centerTop = Math.max(0, (($(this).outerHeight() / 2) - 7)) + "px";
  //   const centerLeft = Math.max(0, (($(this).outerWidth() / 2) - 7)) + "px";

  //   const loadingContain;
  //   if (id === "" || id === null || id === undefined) {
  //     id = "loader-image";
  //   } else {
  //     const _loadIdAppend = id
  //     id = id + "_Loader";
  //   }
  //   loadingContain = "<div style='position:absolute;height:" + height + ";width:" + width + ";background:#ccc;z-index:" + zindex + ";top:" + top + "px;left:" + left + "px;opacity:0.7' id='" + id + "' class='loader-image'><div style='position:absolute;top:" + centerTop + ";left:" + centerLeft + ";color:white;height: 28px;width: 28px;background: transparent url(assets/image/loader.gif) no-repeat scroll 0 0;' class='loader-style'></div></div>";
  //   if (flag == true) {
  //     loadingContain = "<div style='position:fixed;height:100%;width:100%;background:#ccc;z-index:" + zindex + ";top:0;left:0;opacity:0.7;'id='" + id + "' class='loader-image'><div style='position:absolute;top:49%;left:49%;color:white;height: 28px;width: 28px;background: transparent url(assets/image/loader.gif) no-repeat scroll 0 0;'class='loader-style'></div></div>"
  //   }
  //   $("body").append(loadingContain);
  // }


}


// function loadingServiceShow(zindex, id, flag) {
//   try {
//       const _id = $("[data-loader=" + id + "]");
//       _id.CenterLoader(zindex, id, flag);
//   } catch (error) {
//       loadingServiceHide(id);
//   }
// }
// $.fn.CenterLoader = function (zindex, id, flag) {
//   const height = $(this).outerHeight() + "px";
//   const width = $(this).outerWidth() + "px";
//   const top = $(this).offset().top;
//   const left = $(this).offset().left;
//   const loadingContainer = "body";
//   if (flag == true) {
//       top = 0;
//       left = 0;
//       loadingContainer = this;
//   }
//   const centerTop = Math.max(0, (($(this).outerHeight() / 2) - 7)) + "px";
//   const centerLeft = Math.max(0, (($(this).outerWidth() / 2) - 7)) + "px";

//   const loadingContain;
//   if (id === "" || id === null || id === undefined) {
//       id = "loader-image";
//   } else {
//       const _loadIdAppend = id
//       id = id + "_Loader";
//   }
//   loadingContain = "<div style='position:absolute;height:" + height + ";width:" + width + ";background:#ccc;z-index:" + zindex + ";top:" + top + "px;left:" + left + "px;opacity:0.7' id='" + id + "' class='loader-image'><div style='position:absolute;top:" + centerTop + ";left:" + centerLeft + ";color:white;height: 28px;width: 28px;background: transparent url(assets/image/loader.gif) no-repeat scroll 0 0;' class='loader-style'></div></div>";
//   if (flag == true) {
//       loadingContain = "<div style='position:fixed;height:100%;width:100%;background:#ccc;z-index:" + zindex + ";top:0;left:0;opacity:0.7;'id='" + id + "' class='loader-image'><div style='position:absolute;top:49%;left:49%;color:white;height: 28px;width: 28px;background: transparent url(assets/image/loader.gif) no-repeat scroll 0 0;'class='loader-style'></div></div>"
//   }
//   $("body").append(loadingContain);
// }
// function loadingServiceHide(id) {
//   if (id === "" || id === null || id === undefined) {
//       $(".loader-image").remove();
//   } else {
//       $("#" + id + "_Loader").remove();
//   }
// }