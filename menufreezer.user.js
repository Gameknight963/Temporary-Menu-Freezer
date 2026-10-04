// ==UserScript==
// @name         Temporary Menu Freezer
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @version      1.0.0
// @author       Gameknight963
// @description  f8 => take away the websites 5 senses
// ==/UserScript==

(function () {
    'use strict';
    let frozen = false;

    const events = [
        'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'mousemove',
        'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove',
        'pointerdown', 'mousedown', 'click',
        'focusin', 'focusout', 'blur', 'focus',
        'keydown', 'keyup', 'keypress',
        'visibilitychange', 'scroll', 'wheel',
        'touchstart', 'touchmove', 'touchend',
    ];

    function sink(e) {
        if (!frozen) return;
        if (e.type === 'keydown' && e.code === 'F8') return;
        if (e.ctrlKey) return; // Bypass with Ctrl. Remove if unwanted
        e.stopImmediatePropagation();
        if (e.cancelable) e.preventDefault();
    }

    events.forEach(ev => window.addEventListener(ev, sink, { capture: true, passive: false }));

    const indicator = document.createElement('div');
    Object.assign(indicator.style, {
        position: 'fixed', top: '8px', right: '8px',
        width: '10px', height: '10px', borderRadius: '50%',
        background: '#f00', opacity: '0',
        zIndex: '2147483647', pointerEvents: 'none',
    });
    document.documentElement.appendChild(indicator);

    window.addEventListener('keydown', e => {
        if (e.code === 'F8') {
            frozen = !frozen;
            indicator.style.opacity = frozen ? '1' : '0';
        }
    }, { capture: true });
})();
