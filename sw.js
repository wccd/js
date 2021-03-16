async function cleanCaches() {
    let cacheName = 'test';
    let cache = await caches.open(cacheName)
    let requests = await cache.keys()
    await requests.forEach(res => cache.delete(res))
}

async function cacheResources() {
    let urls = [];
    let cacheItem = [
        'ThemeXml.tar', 
        'ClipPath.tar', 
        'ExpXml4Office.tar', 
        'markData.tar', 
        'mmThemes.tar', 
        'texture.tar', 
        'shapeStringXML.tar',
        'OrgFields_en.xml'
    ]
    await fetch(new Request('url')).then(e => {
        e.clone().text().then(res => {
            res = JSON.parse(res);
            let base = res.msg;
            let data = res.data;
            data.forEach(v => {
                if(cacheItem.includes(v.name)) {
                    urls.push(`${base}/${v.url}?v=${v.version}`)
                }
            })
        });
    })
    let cacheName = 'test';
    let cache = await caches.open(cacheName)
    let requests = await cache.keys()
    let cachedURLs = requests.map(request => request.url)
    console.log('cache urls', cachedURLs)
    let updateURLs = urls.filter(url => !cachedURLs.includes(url))

    await cache.addAll(updateURLs)
}
async function getCache(event) {
    let cacheName = 'test';
    let cache = await caches.open(cacheName)
    return cache.match(event.request.url)
}

self.addEventListener('install', (event) => {
    // 安装回调的逻辑处理
    self.skipWaiting()
    event.waitUntil(
        cleanCaches().then(() => {
            cacheResources()
        })
    )
})

self.addEventListener('activate', () => {
    // 激活回调的逻辑处理
    console.log('service worker 激活成功')
})

self.addEventListener('fetch', event => {
    if(event.request.url.indexOf('/maxx/config') > 0) {
        event.respondWith(new Promise(resolve => {
            getCache(event).then(res => {
                console.log(res, 'cache111111111111')
                !res && (res = fetch(event.request.clone()))
                resolve(res)
            })
        }))
    }
})

