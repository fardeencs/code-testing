import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import * as _ from 'lodash';
import { HelperUtil, ADJECTIVES, NOUNS } from './helper';



@Component({
  selector: 'app-html-tree-view',
  templateUrl: './html-tree-view.component.html',
  styleUrls: ['./html-tree-view.component.scss']
})
export class HtmlTreeViewComponent implements OnInit, AfterViewInit {
  // @ViewChild('handleSpan') handleSpan: ElementRef;
  spanClick: any;
  treeViewData: Array<any>;
  constructor(private _host: ElementRef) { }

  ngOnInit() {
    // this.toggleTr();
    this.setTreeViewData();
    // const el = document.getElementsByClassName('handleSpan');
    // console.log('el', el);
    // this.spanClick = fromEvent(el, 'click');
  }

  private getRandomText(): string {
    return HelperUtil.randomEl(ADJECTIVES) + ' ' + HelperUtil.randomEl(NOUNS);
    // return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  }


  private setTreeViewData(): void {
    const treeViewData: Array<any> = new Array<any>();
    for (let index = 0; index < 3; index++) {
      // const element = array[index];
      const parentData: any = { id1: this.getRandomText(), id2: this.getRandomText(), id3: this.getRandomText() };
      const subElement1 = []; const subElement2 = []; const subElement3 = [];
      for (let index1 = 0; index1 < 3; index1++) {
        subElement1.push({ id1: this.getRandomText(), id2: this.getRandomText(), id3: this.getRandomText() });
      }
      for (let index2 = 0; index2 < 3; index2++) {
        subElement2.push({ id1: this.getRandomText(), id2: this.getRandomText(), id3: this.getRandomText() });
      }
      for (let index3 = 0; index3 < 3; index3++) {
        subElement3.push({ id1: this.getRandomText(), id2: this.getRandomText(), id3: this.getRandomText() });
      }
      parentData.subElement1 = subElement1;
      parentData.subElement2 = subElement2;
      parentData.subElement3 = subElement3;
      treeViewData.push(parentData);
    }
    console.log('treeViewData', treeViewData);
    this.treeViewData = treeViewData;
  }


  toggleRow1(event): void {
    // const element = this.handleSpan.nativeElement;
    console.log('event', event);
    const spanInnerEl = event.target;
    const spanEl = event.currentTarget;
    const parentTr = event.target.parentNode.parentNode.parentNode;
    console.log(parentTr, spanEl, spanInnerEl);
    if (spanInnerEl.classList.contains('down')) {
      event.target.classList.remove('down'); // To Remove
      parentTr.classList.remove('tr-selected');
      parentTr.nextElementSibling.lastElementChild.firstElementChild.style.display = 'block';
      // const detailEl: HTMLElement = document.getElementById(parentTr.nextElementSibling.attributes.id.value);
      // console.log('detailEl', detailEl);
      // detailEl.style.display = 'block';

      return;
    }
    spanInnerEl.classList.add('down', 'slide');
    parentTr.classList.add('slide');
    if (parentTr.classList && parentTr.classList.conatin && !parentTr.classList.conatin('tr-detail')) { return; }
    parentTr.classList.add('tr-selected');
    parentTr.nextElementSibling.lastElementChild.firstElementChild.style.display = 'none';
    // const trDetailId =  parentTr.nextElementSibling.attributes.id;
    // const detailEl: HTMLElement = document.getElementById(parentTr.nextElementSibling.attributes.id.value);
    // console.log('detailEl', detailEl);
    // detailEl.style.display = 'none';
    // .remove('hidden')
    // const detailEl: HTMLElement = parentTr.getElementById('tr-detail');
    // console.log('detailEl', detailEl);

  }

  toggleRow(event): void {
    console.log('event', event);
    const spanInnerEl = event.target;
    const spanEl = event.currentTarget;
    const parentTr = event.currentTarget.parentNode;
    console.log(parentTr, spanEl, spanInnerEl);
    if (spanInnerEl.classList.contains('close')) {
      spanInnerEl.classList.remove('close'); // To Remove
      parentTr.classList.remove('tr-selected');
      parentTr.nextElementSibling.lastElementChild.firstElementChild.style.display = 'block';
      return;
    }
    spanInnerEl.classList.add('close', 'slide');
    parentTr.classList.add('slide');
    if (parentTr.classList && parentTr.classList.conatin && !parentTr.classList.conatin('tr-detail')) { return; }
    parentTr.classList.add('tr-selected');
    parentTr.nextElementSibling.lastElementChild.firstElementChild.style.display = 'none';
  }

  iClick(event: MouseEvent){
    event.preventDefault();
  }

  ngAfterViewInit(): void {
    /**
    const element = this.handleSpan.nativeElement;
    console.log('handleSpan', this.handleSpan);
    // this.handleSpan
    const subscription = this.spanClick.subscribe((event: MouseEvent) => {
      console.log('evt', event);
      const spanInnerEl = event.target;
      const spanEl = event.currentTarget;
      const parentTr = event.currentTarget.parentElement.parentElement;
      // event.currentTarget.classList.add('fa-rotate-90'); // To ADD
      if (event.target.classList.contains('down')) {
        event.target.classList.remove('down'); // To Remove
        return;
      }
      event.target.classList.add('down'); // To ADD
      if (parentTr.classList && parentTr.classList.conatin && !parentTr.classList.conatin('tr-detail')) { return; }
      parentTr.classList.add('tr-selected');
      let detailEl: HTMLElement = document.getElementById('tr-detail');
      // detailEl
      //   .remove('hidden')
      //   // .next()
      //   .insertAdjacentElement('afterend', parentTr);
      // .insertAfter(parentTr)
      // .children('td');

      // //add
      // evt.path
      // $span.addClass("fa-rotate-90");
      // if ($parentTr.next().hasClass("tr-detail")) return;
      // $parentTr.addClass("tr-selected");
      // // 	.eq(1)
      // // 	.addClass("active");
      // $("#tr-detail")
      //   .clone()
      //   .removeClass("hidden")
      //   .insertAfter($parentTr)
      //   .children("td")
      //   .animate()
      //   .wrapInner("<div style='display:none'/>")
      //   .children()
      //   .slideDown();
    });
 */
  }



  /**
   (function() {
	$("span.fa").on("click", function() {
		var $span = $(this),
			$parentTr = $span.closest("tr");

		//remove
		if ($span.hasClass("fa-rotate-90")) {
			$span.removeClass("fa-rotate-90");
			$parentTr
				.next()
				.children("td")
				.animate({ padding: 0 })
				.wrapInner("<div />")
				.children()
				.slideUp(function() {
					var $tr = $(this).closest("tr");

					// $tr
					// 	.prev("tr")
					// 	.find(".active")
					// 	.removeClass("active");
					$tr.remove();
				$parentTr.removeClass("tr-selected");
				});

			return;
		}

		//add
		$span.addClass("fa-rotate-90");
		if ($parentTr.next().hasClass("tr-detail")) return;
		$parentTr.addClass("tr-selected");
		// 	.eq(1)
		// 	.addClass("active");
		$("#tr-detail")
			.clone()
			.removeClass("hidden")
			.insertAfter($parentTr)
			.children("td")
			.animate()
			.wrapInner("<div style='display:none'/>")
			.children()
			.slideDown();
	});
// 	$("i.fa").on("click", function() {
// 		$(this).closest("tr").next().removeClass("hidden").find("div.collapse").collapse("toggle");
// 	});
// 	$("div.collapse").on("hidden.bs.collapse", function(){
// 		$(this).closest("tr").children("td").css("padding","0")
// 								$(this).closest("tr").addClass("hidden")
// 								});
})();

   */

}
