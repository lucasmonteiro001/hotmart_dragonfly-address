/**
 * Created by lucas on 7/15/16.
 */
const optionsDefault = {
    id: "",
    class: "",
    text: "",
    value: ""
};

export default class DOMElements {

    static new (type, options) {

        let o = $.extend(optionsDefault);
        let element;

        if(typeof options === "string") {
            o.text = options;
        }
        else {
            o = $.extend(options);
        }

        switch (type) {

            case 'tr':
                element = $('<tr>');
                break;
            case 'th':
                element = $('<th>');
                break;
            case 'td':
                element = $('<td>');
                break;
            case 'select':
                element = $("<select/>");
                break;
            case 'span':
                element = $("<span>");
                break;
            case 'checkbox':
                element = $('<input type="checkbox"/>');
                break;
            case 'option':
                element = $('<option>');
                break;
            case 'button':
                element = $('<button type="button">');
                break;
            case 'p':
                element = $('<p>');
                break;
            default:
                throw `Element type [${type}] not supported!!!`;

        }

        if(o.class){
            element.addClass(o.class);
        }

        if(o.id) {
            element.attr("id", o.id);
        }

        if(o.text) {
            element.text(o.text);
        }

        if(o.value) {
            element.val(o.value);
        }

        return element;
    }
}