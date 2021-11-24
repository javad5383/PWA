(function () {
    "use strict";
    const filesToCache = [
        'PWA',
        'PWA/index.html',
        'PWA/about.html',
        'PWA/contact.html',
        'PWA/shop-single.html',
        'PWA/shop.html',
        'PWA/assets/css/bootstrap.min.css',
        'PWA/assets/css/custom.css',
        'PWA/assets/css/fontawesome.css',
        'PWA/assets/css/fontawesome.min.css',
        'PWA/assets/css/slick-theme.css',
        'PWA/assets/css/slick-theme.min.css',
        'PWA/assets/css/slick.min.css',
        'PWA/assets/css/templatemo.css',
        'PWA/assets/css/templatemo.min.css',
        'PWA/assets/img/icons/Icon_safety48.png',
        'PWA/assets/img/icons/Icon_safety57.png',
        'PWA/assets/img/icons/Icon_safety72.png',
        'PWA/assets/img/icons/Icon_safety76.png',
        'PWA/assets/img/icons/Icon_safety96.png',
        'PWA/assets/img/icons/Icon_safety114.png',
        'PWA/assets/img/icons/Icon_safety144.png',
        'PWA/assets/img/icons/Icon_safety152.png',
        'PWA/assets/img/icons/Icon_safety167.png',
        'PWA/assets/img/icons/Icon_safety180.png',
        'PWA/assets/img/icons/Icon_safety192.png',
        'PWA/assets/img/icons/Icon_safety256.png',
        'PWA/assets/img/icons/Icon_safety384.png',
        'PWA/assets/img/icons/Icon_safety512.png',
        'PWA/assets/img/about-hero.svg',
        'PWA/assets/img/ajax-loader.gif',
        'PWA/assets/img/apple-icon.png',
        'PWA/assets/img/banner_img_01.jpg',
        'PWA/assets/img/banner_img_02.jpg',
        'PWA/assets/img/banner_img_03.jpg',
        'PWA/assets/img/brand_01.png',
        'PWA/assets/img/brand_02.png',
        'PWA/assets/img/brand_03.png',
        'PWA/assets/img/brand_04.png',
        'PWA/assets/img/category_img_01.jpg',
        'PWA/assets/img/category_img_02.jpg',
        'PWA/assets/img/category_img_03.jpg',
        'PWA/assets/img/favicon.ico',
        'PWA/assets/img/feature_prod_01.jpg',
        'PWA/assets/img/feature_prod_02.jpg',
        'PWA/assets/img/feature_prod_03.jpg',
        'PWA/assets/img/product_single_01.jpg',
        'PWA/assets/img/product_single_02.jpg',
        'PWA/assets/img/product_single_03.jpg',
        'PWA/assets/img/product_single_04.jpg',
        'PWA/assets/img/product_single_05.jpg',
        'PWA/assets/img/product_single_06.jpg',
        'PWA/assets/img/product_single_07.jpg',
        'PWA/assets/img/product_single_08.jpg',
        'PWA/assets/img/product_single_09.jpg',
        'PWA/assets/img/product_single_10.jpg',
        'PWA/assets/img/shop_01.jpg',
        'PWA/assets/img/shop_02.jpg',
        'PWA/assets/img/shop_03.jpg',
        'PWA/assets/img/shop_04.jpg',
        'PWA/assets/img/shop_05.jpg',
        'PWA/assets/img/shop_06.jpg',
        'PWA/assets/img/shop_07.jpg',
        'PWA/assets/img/shop_08.jpg',
        'PWA/assets/img/shop_09.jpg',
        'PWA/assets/img/shop_10.jpg',
        'PWA/assets/img/shop_11.jpg',
        'PWA/assets/js/bootstrap.bundle.min.js',
        'PWA/assets/js/custom.js',
        'PWA/assets/js/jquery-1.11.0.min.js',
        'PWA/assets/js/jquery-migrate-1.2.1.min.js',
        'PWA/assets/js/slick.min.js',
        'PWA/assets/js/templatemo.js',
        'PWA/assets/js/templatemo.min.js',
        'PWA/assets/webfonts/fa-brands-400.eot',
        'PWA/assets/webfonts/fa-brands-400.svg',
        'PWA/assets/webfonts/fa-brands-400.ttf',
        'PWA/assets/webfonts/fa-brands-400.woff',
        'PWA/assets/webfonts/fa-brands-400.woff2',
        'PWA/assets/webfonts/fa-regular-400.eot',
        'PWA/assets/webfonts/fa-regular-400.svg',
        'PWA/assets/webfonts/fa-regular-400.ttf',
        'PWA/assets/webfonts/fa-regular-400.woff',
        'PWA/assets/webfonts/fa-regular-400.woff2',
        'PWA/assets/webfonts/fa-solid-900.eot',
        'PWA/assets/webfonts/fa-solid-900.svg',
        'PWA/assets/webfonts/fa-solid-900.ttf',
        'PWA/assets/webfonts/fa-solid-900.woff',
        'PWA/assets/webfonts/fa-solid-900.woff2',
        'PWA/assets/webfonts/slick.eot',
        'PWA/assets/webfonts/slick.svg',
        'PWA/assets/webfonts/slick.ttf',
        'PWA/assets/webfonts/slick.woff'

    ];
    const staticCacheName = 'pages-cache-v1';

    self.addEventListener('install', event => {
        console.log('install');
        self.skipWaiting();
        event.waitUntil(
            caches.open(staticCacheName)
                .then( cache => {
                    console.log('cache');
                    return  cache.addAll(filesToCache);
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
        //  console.log('Fetch event for ', event.request.url);
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
