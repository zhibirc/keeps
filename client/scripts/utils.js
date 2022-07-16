export function show ( $element ) {
    $element.classList.remove('hidden');
}

export function hide ( $element ) {
    $element.classList.add('hidden');
}

export function pick ( selector, target = document ) {
    return target.querySelector(selector);
}
