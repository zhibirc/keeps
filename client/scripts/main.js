/**
 * Main application script file.
 */

'use strict';

import { Auth } from './auth.js';
import { Modal } from './modal.js';

const currentYear = new Date().getFullYear();
const $stdout = document.getElementById('stdout');
const phraseList = [
    'Hello, <username>!',
    'How are you today?',
    'As you probably know, I\'m here to help you with your secrets.',
    'I do my best to keep your sensitive data protected on a highest level.',
    'And I\'m really good at this.',
    'You can safely store your login/password pairs, security tokens, credit cards data, access codes, etc.',
    'You just put your data in the safe place and get them when you need, that\'s pretty simple.',
    'No ads, no statistics collection, no special terms, no unknown third-party services, no tricky interfaces... no bullshit.',
    'In case you find any issue, inconvenience or have suggestions how to improve Keeps service, don\'t hesitate to report it to <zhibirc.echo@gmail.com>',
    'Thank you 👍'
];
const ROW_DELAY_MS = 2000;
const CHAR_DELAY_MS = 50;
const PS1 = '>  ';
const CARET = '\u258C';
const createRow = (() => {
    const $row = document.createElement('div');
    const $txt = document.createTextNode(PS1);

    return () => {
        const $newRow = $row.cloneNode();
        const $newTxt = $txt.cloneNode();
        $newRow.appendChild($newTxt);

        return [$newRow, $newTxt];
    };
})();

const [$row, $txt] = createRow();
$stdout.appendChild($row);
print([...phraseList], phraseList[0], $txt);
document.getElementById('footer-year').textContent = currentYear;

function print ( phraseList, line, $txt ) {
    if ( line.length ) {
        setTimeout(() => {
            $txt.nodeValue = `${$txt.nodeValue.slice(0, -1)}${line[0]}${CARET}`;
            print(phraseList, line.slice(1), $txt);
        }, CHAR_DELAY_MS);
    } else if ( phraseList.length ) {
        setTimeout(() => {
            $txt.nodeValue = $txt.nodeValue.slice(0, -1);
            const [$row, $txtNode = $txt] = createRow();
            $stdout.appendChild($row);
            phraseList.splice(0, 1);
            print(phraseList, phraseList[0], $txtNode);
        }, ROW_DELAY_MS);
    }
}
