import { NgModule, Directive, ElementRef, HostBinding, HostListener, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from './dom/domhandler';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export const KEYFILTER_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => KeyFilter),
    multi: true
};

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[keyFilter]',
    providers: [DomHandler, KEYFILTER_VALIDATOR]
})
// tslint:disable-next-line:directive-class-suffix
export class KeyFilter implements Validator {

    static DEFAULT_MASKS = {
        pint: /[\d]/,
        'int': /[\d\-]/,
        pnum: /[\d\.]/,
        money: /[\d\.\s,]/,
        num: /[\d\-\.]/,
        hex: /[0-9a-f]/i,
        email: /[a-z0-9_\.\-@]/i,
        alpha: /[a-z_]/i,
        alphanum: /[a-z0-9_]/i,
        money7: /^[0-9]{1,7}(\.\d{1,2})?$/
    };

    static KEYS = {
        TAB: 9,
        RETURN: 13,
        ESC: 27,
        BACKSPACE: 8,
        DELETE: 46
    };

    static SAFARI_KEYS = {
        63234: 37, // left
        63235: 39, // right
        63232: 38, // up
        63233: 40, // down
        63276: 33, // page up
        63277: 34, // page down
        63272: 46, // delete
        63273: 36, // home
        63275: 35  // end
    };

    @Input() pValidateOnly: boolean;
    @Input() regExpValidate = false;

    regex: RegExp;

    _pattern: any;

    constructor(public el: ElementRef, public domHandler: DomHandler) { }

    get pattern(): any {
        return this._pattern;
    }

    @Input('keyFilter') set pattern(_pattern: any) {
        this._pattern = _pattern;
        this.regex = KeyFilter.DEFAULT_MASKS[this._pattern] || this._pattern;
    }

    isNavKeyPress(e: KeyboardEvent) {
        let k = e.keyCode;
        k = this.domHandler.getBrowser().safari ? (KeyFilter.SAFARI_KEYS[k] || k) : k;

        return (k >= 33 && k <= 40) || k === KeyFilter.KEYS.RETURN || k === KeyFilter.KEYS.TAB || k === KeyFilter.KEYS.ESC;
    }

    isSpecialKey(e: KeyboardEvent) {
        const k = e.keyCode;
        const c = e.charCode;

        return k === 9 || k === 13 || k === 27 || k === 16 || k === 17 || (k >= 18 && k <= 20) ||
            // tslint:disable-next-line:max-line-length
            (this.domHandler.getBrowser().opera && !e.shiftKey && (k === 8 || (k >= 33 && k <= 35) || (k >= 36 && k <= 39) || (k >= 44 && k <= 45)));
    }


    getKey(e: KeyboardEvent) {
        const k = e.keyCode || e.charCode;
        return this.domHandler.getBrowser().safari ? (KeyFilter.SAFARI_KEYS[k] || k) : k;
    }

    getCharCode(e: KeyboardEvent) {
        return e.charCode || e.keyCode || e.which;
    }


    private vaidateRegExp(e: KeyboardEvent) {
        // const browser = this.domHandler.getBrowser();

        // if (e.ctrlKey || e.altKey) {
        //     return;
        // }
        // const k = this.getKey(e);
        // if (browser.mozilla && (this.isNavKeyPress(e) || k === KeyFilter.KEYS.BACKSPACE || (k === KeyFilter.KEYS.DELETE && e.charCode === 0))) {
        //     return;
        // }

        // const c = this.getCharCode(e);
        // const cc = String.fromCharCode(c);
        // let ok = true;

        // if (browser.mozilla && (this.isSpecialKey(e) || !cc)) {
        //     return;
        // }
        // console.log('this.el', this.el);
        
        const value = this.el.nativeElement.value;
        // ok = (value && !this.regex.test(value));
        // ok = this.regex.test(value);
        if (!(value && this.regex.test(value))) {
            e.preventDefault();
        }
    }

    @HostListener('input', ['$event'])
    onEvent($event) {
        console.log($event);
        let upper = this.el.nativeElement.value;
        console.log('input', upper);
        // this.control.valueAccessor.writeValue(upper);
      }


    @HostListener('keypress', ['$event'])
    onKeyPress(e: KeyboardEvent) {
        console.log('input', e.target, this.el.nativeElement);
        if (this.pValidateOnly) {
            return;
        }
        if (this.regExpValidate) {
            this.vaidateRegExp(e);
            return;
        }

        const browser = this.domHandler.getBrowser();

        if (e.ctrlKey || e.altKey) {
            return;
        }

        const k = this.getKey(e);
        // tslint:disable-next-line:max-line-length
        if (browser.mozilla && (this.isNavKeyPress(e) || k === KeyFilter.KEYS.BACKSPACE || (k === KeyFilter.KEYS.DELETE && e.charCode === 0))) {
            return;
        }

        const c = this.getCharCode(e);
        const cc = String.fromCharCode(c);

        let ok = true;

        if (browser.mozilla && (this.isSpecialKey(e) || !cc)) {
            return;
        }

        ok = this.regex.test(cc);

        if (!ok) {
            e.preventDefault();
        }
    }

    validate(c: AbstractControl): { [key: string]: any } {
        if (this.pValidateOnly) {
            const value = this.el.nativeElement.value;
            // if (value && !this.regex.test(value)) {
            //     console.log('false');
            //     return false;
            // }else{
            //     console.log('true');
            //     return true;
            // }
            if (value && !this.regex.test(value)) {
                return {
                    validatePattern: false
                };
            }
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [KeyFilter],
    declarations: [KeyFilter]
})
export class KeyFilterModule { }
