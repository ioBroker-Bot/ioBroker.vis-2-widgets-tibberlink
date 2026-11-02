/**
 * Shared base class of the Tibberlink widgets.
 *
 * It exists for the translations: vis-2 registers the keys of translations.js under the prefix
 * "<adapter name>_", and VisRxWidget.t() prepends whatever getI18nPrefix() returns before asking
 * I18n. Without the override the prefix is empty and every key would miss.
 */
class TibberWidgetBase extends window.visRxWidget {
    static getI18nPrefix() {
        return 'vis-2-widgets-tibberlink_';
    }

    /**
     * Translate a key from i18n/*.json.
     *
     * @param {string} key key as written in the i18n files, without the prefix
     * @param {...string} args values for the %s placeholders, in order
     * @returns {string} the translated text
     */
    tr(key, ...args) {
        return this.constructor.t(key, ...args);
    }
}

export { TibberWidgetBase };
export default TibberWidgetBase;
