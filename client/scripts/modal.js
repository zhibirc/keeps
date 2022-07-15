/**
 * Modal UI component.
 */

'use strict';

/**
 *
 * @param {Array} data
 */
function parseFields ( data ) {

}

export class Modal {
    #active;
    #fields;

    constructor ( fields ) {
        this.#active = false;
        this.#fields = parseFields(fields);
    }

    show () {
        this.#active = true;
    }

    hide () {
        this.#active = false;
    }

    /**
     * Get data from modal fields in according to fields schema.
     * If `onChange` callback is passed in, it will be invoked on every content change in modal's fields.
     * If `onChange` callback is omitted, method behaves synchronously and returns collected fields data on each call.
     *
     * @param {Function} [onChange] - callback for subscription on changes
     */
    getData ( onChange ) {}

    /**
     * Imperatively set data to modal fields in according to fields schema.
     *
     * @param {Array} data - data to set
     */
    setData ( data ) {}
}
