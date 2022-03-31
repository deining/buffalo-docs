document.addEventListener('DOMContentLoaded', () =>{
    loadMobileNav();
    addHeaderLinks();
    loadBlogContent();
});

function loadMobileNav() {
    let mobileMenu = document.querySelector("#mobile-menu")
    document.querySelector("#mobile-menu-control").addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    })

    document.querySelectorAll("#mobile-menu #close, .search-button").forEach(el => {
        el.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        })  
    })

    document.addEventListener('keydown', e => {
        if (e.keyCode === 27) {
            mobileMenu.classList.add("hidden");
        }
    })
}

function addHeaderLinks() {
    document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(h => {
        if (h.id == ""){
            return
        }

        let link = document.createElement("a");
        link.href = "#" + h.id;
        link.innerHTML = "#";
        link.classList.add("ml-2", "inline-block", "no-underline");

        h.innerHTML += link.outerHTML;
    })
}

function loadBlogContent() {
    let container = document.querySelector("#blog-content");
    if (container == null) {
        return
    }

    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://blog.gobuffalo.io/feed").then(response => {
        response.json().then(data => {
            let items = data.items.slice(0, 3);
            items.forEach(item => {
                
    
                let desc = item.description.replace(/<img[^>]*>/g, "");
                desc = desc.replace(/<\/?[^>]+(>|$)/g, "");
                desc = desc.replace(/&nbsp;/g, "");
                desc = desc.replace(/&#8217;/g, "'");
                desc = desc.slice(0, 200) + "...";

                container.innerHTML += `
                <div class="mb-7">
                    <h4 class="text-2xl font-bold text-ellipsis overflow-hidden">
                        ${item.title}
                    </h4>
                    <p class="text-xs mb-3">${item.categories.join(", ")}</p>
                    <p class="text-center md:text-left">
                        ${desc} 
                        <a class="underline" href="${item.link}">
                            ${container.dataset.readMore}
                        </a>
                    </p>
                </div>
                `
            })


        })
    })
}