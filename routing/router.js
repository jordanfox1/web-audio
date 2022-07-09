const urlPageTitle = ''

document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("nav a")) {
        return;
    }
    e.preventDefault();
    route();
})

const urlRoutes = {
    404: {
        template: "routing/pages/404.html",
        title: '',
        description: '',
    },
    "/studio": {
        template: "routing/pages/studio.html",
        title: '',
        javascript: '../../main.js',
        description: ''
    },
    "/keyboard": {
        template: "routing/pages/keyboard.html",
        title: '',
        javascript: '../tools/keyboard/keyboard.js',
        description: ''
    },
    "/drums": {
        template: "routing/pages/drums.html",
        title: '',
        javascript: '../tools/drums/drums.js',
        description: ''
    },

}

const route = (event) => {
    event = event || window.event
    event.preventDefault()
    window.history.pushState({}, '', event.target.href)
    urlLocationHandler()
}

const urlLocationHandler = async () => {
    const location = window.location.pathname;
    if (location.length == 0) {
        location = '/'
    }

    const targetRoute = urlRoutes[location] || urlRoutes[404]
    // fetching our html
    const html = await fetch(targetRoute.template)
    const response = await html.text()
    document.getElementById("content").innerHTML = response

    // check for old script, if there place new script after it and delete
    // const oldScript = document.querySelector('script')
    // console.log(oldScript, '!!!!!!!!')
    // if (oldScript) {
    //     console.log(oldScript, '!!!!!!!!')
    //     const newScript = document.createElement('script')
    //     const scriptSrc = targetRoute.javascript

    //     newScript.setAttribute('src', scriptSrc);
    //     oldScript.parentNode.insertBefore(newScript, oldScript.nextSibling)
    //     oldScript.parentNode.removeChild(oldScript)
    // }
}

window.onpopstate = urlLocationHandler
window.route = route