var cache = cacheData()
getData()
function getData(page) {
    var page = page || 1
    $.ajax({
        url: 'http://test.wulv5.com/api/v1_0/movie?',
        data: { page: page, limit: 5 },
        success: function (doc) {
            cache.set(page,doc)
            renderData(doc)
        }
    })
}
var oUl = document.querySelector('.flex_row')
function  cacheData() {
    var cache = {}
    return {
        set: function (page,doc) {
            cache[page] = doc
        },
        get: function (page) {
            if (page in cache) {
                renderData(cache[page])
            } else {
                getData(page)
            }
        }
    }
}
var oContent = document.querySelector('.content')
oUl.addEventListener('click',function (e) {
    if (e.target.tagName.toLowerCase()==='li') {
        var page = e.target.innerText
        cache.get(page)
    }
})
function renderData(data) {
    var str = ''
    data.forEach(function (element) {
        str += `
                        <a href="${element.url}" class="items flex_row">
					        <div class="img">
					            <img src="${element.cover}" alt="">
					        </div>
					        <div class="bd">
					        	 <p class="label">${element.title}</p>
					        </div>
					        <div class="ft">&GT;</div>
				        </a>
                      `
        oContent.innerHTML = str
    })
}
