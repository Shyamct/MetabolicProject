var currentLanguage = "en-us";
var gCacheNamePrefix='med_'
var UtilsCache = {
    // Get a value from the cache.
    get: function (key) {
        key = gCacheNamePrefix + key;
        var cache = JSON.parse(localStorage.getItem(key));
        if (cache !== null && (!cache.expire || (cache.expire > new Date().getTime())) && (currentLanguage == null || cache.lang == currentLanguage)) {
            return cache.value;
        }

        return null;
    },

    // Set a value to the cache.
    set: function (key, value, timetolive) {
        key = gCacheNamePrefix + key;
        var now = new Date().getTime();
        localStorage.setItem(key, JSON.stringify({ 'value': value, 'created': now, 'expire': (timetolive ? (now + timetolive) : timetolive), 'lang': currentLanguage }));

        return true;
    },

    // remove a unique key
    remove: function (key) {
        key = gCacheNamePrefix + key;
        localStorage.removeItem(key);
    },

    // Clear all local storage keys.
    clear: function () {
        localStorage.clear();
    },

    search: function (id, all) {
        // Search the access object in the general cache.   
        id = gCacheNamePrefix + id;
        for (var i = 0; i < all.length; i++) {
            if (all[i].id == id) {
                return all[i];
                break;
            }
        }
        return null;
    },

    getSession: function (key) {
        key = gCacheNamePrefix + key;
        var cache = JSON.parse(sessionStorage.getItem(key));
        if (cache !== null && (!cache.expire || (cache.expire > new Date().getTime())) && (currentLanguage == null || cache.lang == currentLanguage)) {
            return cache.value;
        }

        return null;
    },

    // Set a value to the cache.
    setSession: function (key, value, timetolive) {
        key = gCacheNamePrefix + key;
        var now = new Date().getTime();
        sessionStorage.setItem(key, JSON.stringify({ 'value': value, 'created': now, 'expire': (timetolive ? (now + timetolive) : timetolive), 'lang': currentLanguage }));

        return true;
    },

    // remove a unique key
    removeSession: function (key) {
        key = gCacheNamePrefix + key;
        sessionStorage.removeItem(key);
    },

    // Clear all local storage keys.
    clearSession: function () {
        sessionStorage.clear();
    },

};