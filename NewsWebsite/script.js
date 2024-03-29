const apikey = '1c7aaf27c2fe4777814a1396fd1d5068'

const blogcontainer = document.getElementById("blog-container");

const searchfield = document.getElementById('search-input');

const searchbutton = document.getElementById('search-button');

async function fetchrandomnews(){
    try{
        const apiurl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;

    }
    catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

searchbutton.addEventListener("click", async () => {
    const query = searchfield.value.trim();
    if(query !== ""){
        try{
            const articles = await fetchnewsquery(query);
            displayblogs(articles);
        }
        catch(error){
            console.log("Error fetching news by query", error);
        }
    }
})

async function fetchnewsquery(query){
    try{
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;

    }
    catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayblogs(articles){
    blogcontainer.innerHTML = "";
    articles.forEach((article) => {
       const blogcard = document.createElement("div");
       blogcard.classList.add("blog-card");
       const img = document.createElement("img");
       img.src = article.urlToImage;
       img.alt = article.title;
       const title = document.createElement("h2");
       const truncatedtitle = 
            article.title.length > 30
            ? article.title.slice(0, 30) + "...." 
            :  article.title;
       title.textContent = truncatedtitle;
    //    title.textContent = article.title;
       const description = document.createElement("p");
    //    description.textContent = article.description;
        const truncateddescription = 
            article.description.length > 120
            ? article.description.slice(0, 120) + "...." 
            :  article.description;
       description.textContent = truncateddescription;
       blogcard.appendChild(img);
       blogcard.appendChild(title);
       blogcard.appendChild(description);
       blogcard.addEventListener('click', ()=>{
        window.open(article.url, "_blank");
       });
       blogcontainer.appendChild(blogcard);
    });
}



(async ()=>{
    try{
        const articles = await fetchrandomnews();
        displayblogs(articles);
    }
    catch(error){
        console.error("Error fetching random news", error)
    }
})();