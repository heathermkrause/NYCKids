require('./Tooltip.less');

export class Tooltip {
    node:HTMLElement;

    offsetWidth = () => this.node.offsetWidth;

    _hideTimer:number;

    constructor(context:HTMLElement) {
        context = context || document.body;
        var node = this.node = <HTMLElement>context.appendChild(document.createElement('div'));

        node.id = 'datassist_tooltip_' + (new Date().valueOf());
        node.className = 'datassist-tooltip';

        var pos = context.style.position;
        if (pos != 'absolute' && pos != 'fixed') {
            context.style.position = 'relative';
        }
    }

    show(text:string, top:string, left:string) {
        var node = this.node,
            st = node.style;

        if (this._hideTimer) {
            clearTimeout(this._hideTimer);
        }

        node.innerHTML = text;

        st.top = top;
        st.left = left;
    }

    hide() {
        this._hideTimer = setTimeout(() => {
            this.node.style.top = '-10000px';
            this._hideTimer = null;
        }, 200);
    }
}