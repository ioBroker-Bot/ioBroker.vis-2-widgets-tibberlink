const fs = require('fs');
const path = require('path');
const { expect } = require('chai');

const srcDir = path.join(__dirname, '..', 'src-widgets', 'src');
const i18nDir = path.join(srcDir, 'i18n');

// The eleven languages ioBroker requires
const LANGS = ['en', 'de', 'ru', 'pt', 'nl', 'fr', 'it', 'es', 'pl', 'uk', 'zh-cn'];

// Keys whose value may legitimately equal the English one: international abbreviations, words that
// are spelled the same in those languages, and the pure placeholder of at_time (English shows the
// bare time, only German and Dutch append a word).
const IDENTICAL_OK = new Set(['level_normal', 'stat_min', 'stat_max', 'start', 'at_time', 'title_live']);

const load = lang => JSON.parse(fs.readFileSync(path.join(i18nDir, `${lang}.json`), 'utf8'));

describe('Widget translations', () => {
    let en;

    before(() => {
        en = load('en');
    });

    it('ships a file for every required language', () => {
        LANGS.forEach(
            lang =>
                expect(fs.existsSync(path.join(i18nDir, `${lang}.json`)), `i18n/${lang}.json is missing`).to.be.true,
        );
    });

    it('uses the same key set in every language', () => {
        const expected = Object.keys(en).sort();
        LANGS.forEach(lang => {
            const keys = Object.keys(load(lang)).sort();
            expect(keys, `i18n/${lang}.json key set differs from en.json`).to.deep.equal(expected);
        });
    });

    it('has no empty value', () => {
        LANGS.forEach(lang => {
            const data = load(lang);
            Object.keys(data).forEach(key =>
                expect(String(data[key]).trim(), `i18n/${lang}.json: ${key} is empty`).to.not.equal(''),
            );
        });
    });

    // The official language checks reject a non-English value that is a verbatim copy of the English
    // one — a present key is not the same as a translated one.
    it('has no untranslated copy of the English text', () => {
        LANGS.filter(lang => lang !== 'en').forEach(lang => {
            const data = load(lang);
            Object.keys(data).forEach(key => {
                if (IDENTICAL_OK.has(key)) {
                    return;
                }
                expect(data[key], `i18n/${lang}.json: ${key} is still the English text`).to.not.equal(en[key]);
            });
        });
    });

    // A translation that loses a %s silently drops a value out of the rendered text
    it('keeps the placeholder count of every key', () => {
        const count = text => (String(text).match(/%s/g) || []).length;
        LANGS.filter(lang => lang !== 'en').forEach(lang => {
            const data = load(lang);
            Object.keys(data).forEach(key =>
                expect(count(data[key]), `i18n/${lang}.json: ${key} has a different %s count`).to.equal(count(en[key])),
            );
        });
    });

    // vis-2 registers the keys under "<adapter name>_" because translations.js sets prefix: true,
    // and VisRxWidget.t() prepends whatever getI18nPrefix() returns. If the two drift apart, every
    // key misses at runtime and the widgets render bare key names.
    it('uses the adapter name as the i18n prefix', () => {
        const ioPackage = require(path.join(__dirname, '..', 'io-package.json'));
        const base = fs.readFileSync(path.join(srcDir, 'TibberWidgetBase.js'), 'utf8');
        const prefix = base.match(/getI18nPrefix\(\)\s*\{\s*return\s*'([^']+)'/);

        expect(prefix, 'TibberWidgetBase.getI18nPrefix() not found').to.not.be.null;
        expect(prefix[1]).to.equal(`${ioPackage.common.name}_`);

        const translations = fs.readFileSync(path.join(srcDir, 'translations.js'), 'utf8');
        expect(translations, 'translations.js must set prefix: true').to.match(/prefix:\s*true/);
    });

    it('defines every key the widgets ask for, and no unused ones', () => {
        const sources = fs
            .readdirSync(srcDir)
            .filter(f => f.endsWith('.jsx') || f.endsWith('.js'))
            .map(f => fs.readFileSync(path.join(srcDir, f), 'utf8'))
            .join('\n');

        // this.tr('key') and the level keys returned by utils.levelKey()
        const used = new Set();
        for (const m of sources.matchAll(/\btr\(\s*'([a-z0-9_]+)'/g)) {
            used.add(m[1]);
        }
        for (const m of sources.matchAll(/return '(level_[a-z_]+)'/g)) {
            used.add(m[1]);
        }

        [...used].forEach(key => expect(en, `i18n/en.json has no key "${key}"`).to.have.property(key));
        Object.keys(en).forEach(key => expect(used.has(key), `i18n key "${key}" is not used by any widget`).to.be.true);
    });
});
