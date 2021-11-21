(function () {
    "use strict";
    const filesToCache = [
        '/',
        'index.html',
        'about.html',
        'contact.html',
        'shop-single.html',
        'shop.html',
        'assets/css/bootstrap.min.css',
        'assets/css/custom.css',
        'assets/css/fontawesome.css',
        'assets/css/fontawesome.min.css',
        'assets/css/slick-theme.css',
        'assets/css/slick-theme.min.css',
        'assets/css/slick.min.css',
        'assets/css/templatemo.css',
        'assets/css/templatemo.min.css',
        'assets/img/icons/Icon_safety48.png',
        'assets/img/icons/Icon_safety57.png',
        'assets/img/icons/Icon_safety72.png',
        'assets/img/icons/Icon_safety76.png',
        'assets/img/icons/Icon_safety96.png',
        'assets/img/icons/Icon_safety114.png',
        'assets/img/icons/Icon_safety144.png',
        'assets/img/icons/Icon_safety152.png',
        'assets/img/icons/Icon_safety167.png',
        'assets/img/icons/Icon_safety180.png',
        'assets/img/icons/Icon_safety192.png',
        'assets/img/icons/Icon_safety256.png',
        'assets/img/icons/Icon_safety384.png',
        'assets/img/icons/Icon_safety512.png',
        'assets/img/about-hero.svg',
        'assets/img/ajax-loader.gif',
        'assets/img/apple-icon.png',
        'assets/img/banner_img_01.jpg',
        'assets/img/banner_img_02.jpg',
        'assets/img/banner_img_03.jpg',
        'assets/img/brand_01.png',
        'assets/img/brand_02.png',
        'assets/img/brand_03.png',
        'assets/img/brand_04.png',
        'assets/img/category_img_01.jpg',
        'assets/img/category_img_02.jpg',
        'assets/img/category_img_03.jpg',
        'assets/img/favicon.ico',
        'assets/img/feature_prod_01.jpg',
        'assets/img/feature_prod_02.jpg',
        'assets/img/feature_prod_03.jpg',
        'assets/img/product_single_01.jpg',
        'assets/img/product_single_02.jpg',
        'assets/img/product_single_03.jpg',
        'assets/img/product_single_04.jpg',
        'assets/img/product_single_05.jpg',
        'assets/img/product_single_06.jpg',
        'assets/img/product_single_07.jpg',
        'assets/img/product_single_08.jpg',
        'assets/img/product_single_09.jpg',
        'assets/img/product_single_10.jpg',
        'assets/img/shop_01.jpg',
        'assets/img/shop_02.jpg',
        'assets/img/shop_03.jpg',
        'assets/img/shop_04.jpg',
        'assets/img/shop_05.jpg',
        'assets/img/shop_06.jpg',
        'assets/img/shop_07.jpg',
        'assets/img/shop_08.jpg',
        'assets/img/shop_09.jpg',
        'assets/img/shop_10.jpg',
        'assets/img/shop_11.jpg',
        'assets/js/bootstrap.bundle.min.js',
        'assets/js/custom.js',
        'assets/js/jquery-1.11.0.min.js',
        'assets/js/jquery-migrate-1.2.1.min.js',
        'assets/js/slick.min.js',
        'assets/js/templatemo.js',
        'assets/js/templatemo.min.js',
        'assets/webfonts/fa-brands-400.eot',
        'assets/webfonts/fa-brands-400.svg',
        'assets/webfonts/fa-brands-400.ttf',
        'assets/webfonts/fa-brands-400.woff',
        'assets/webfonts/fa-brands-400.woff2',
        'assets/webfonts/fa-regular-400.eot',
        'assets/webfonts/fa-regular-400.svg',
        'assets/webfonts/fa-regular-400.ttf',
        'assets/webfonts/fa-regular-400.woff',
        'assets/webfonts/fa-regular-400.woff2',
        'assets/webfonts/fa-solid-900.eot',
        'assets/webfonts/fa-solid-900.svg',
        'assets/webfonts/fa-solid-900.ttf',
        'assets/webfonts/fa-solid-900.woff',
        'assets/webfonts/fa-solid-900.woff2',
        'assets/webfonts/slick.eot',
        'assets/webfonts/slick.svg',
        'assets/webfonts/slick.ttf',
        'assets/webfonts/slick.woff'

    ];
    const staticCacheName = 'pages-cache-v1';

    self.addEventListener('install', event => {
        console.log('install');
        self.skipWaiting();
        event.waitUntil(
            caches.open(staticCacheName)
                .then(cache => {
                    console.log('cache');
                    return cache.addAll(filesToCache);
                })
        );

    });

    self.addEventListener('activate', event => {
        console.log('Activating new service worker...');

        const cacheAllowlist = [staticCacheName];
        event.waitUntil(
            caches.keys()
                .then(cacheNames => {
                    return Promise.all(
                        cacheNames.map(cacheName => {
                            if (cacheAllowlist.indexOf(cacheName) === -1) {
                                return caches.delete(cacheName);
                            }
                        })
                    );
                })
        );
    });


    self.addEventListener('fetch', event => {
        console.log('Fetch event for ', event.request.url);
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        console.log('Found ', event.request.url, ' in cache');
                        return response;
                    }
                    console.log('Network request for ', event.request.url);
                    return fetch(event.request)

                    // TODO 4 - Add fetched files to the cache

                }).catch(error => {

                    // TODO 6 - Respond with custom offline page

                })
        );
    });


})();
