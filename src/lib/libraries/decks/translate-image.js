/**
 * @fileoverview
 * Utility functions for handling tutorial images in multiple languages
 */

import {enImages as defaultImages} from './en-steps.js';

let savedImages = {};
let savedLocale = '';

const loadSpanish = () =>
    import(/* webpackChunkName: "es-steps" */ './es-steps.js')
        .then(({esImages: imageData}) => imageData);

const loadSimplifiedChinese = () =>
    import(/* webpackChunkName: "zh_CN-steps" */ './zh_CN-steps.js')
        .then(({zh_CNImages: imageData}) => imageData);

const loadTurkish = () =>
    import(/* webpackChunkName: "tr-steps" */ './tr-steps.js')
        .then(({trImages: imageData}) => imageData);

const loadFrench = () =>
    import(/* webpackChunkName: "fr-steps" */ './fr-steps.js')
        .then(({frImages: imageData}) => imageData);

const loadJapanese = () =>
    import(/* webpackChunkName: "ja-steps" */ './ja-steps.js')
        .then(({jaImages: imageData}) => imageData);

const translations = {
    'es': () => loadSpanish(),
    'es-419': () => loadSpanish(),
    'zh-cn': () => loadSimplifiedChinese(),
    'tr': () => loadTurkish(),
    'fr': () => loadFrench(),
    'ja': () => loadJapanese(),
    'ja-Hira': () => loadJapanese()
};

const loadImageData = locale => {
    console.log(locale);
    if (translations.hasOwnProperty(locale)) {
        translations[locale]()
            .then(newImages => {
                savedImages = newImages;
                savedLocale = locale;
            });
    }
};

/**
 * Return image data for tutorials based on locale (default: en)
 * @param {string} imageId key in the images object, or id string.
 * @param {string} locale requested locale
 * @return {string} image
 */
const translateImage = (imageId, locale) => {
    if (locale !== savedLocale || !savedImages.hasOwnProperty(imageId)) {
        return defaultImages[imageId];
    }
    return savedImages[imageId];
};

export {
    loadImageData,
    translateImage
};
