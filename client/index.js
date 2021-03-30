let scrollLock = false;

function getPosts(offset) {
    if (!offset) {
        offset = 0;
    }

    fetch('http://localhost:3000/list?' + 'offset=' + offset)
        .then(res => res.json())
        .then(data => loadPostsIntoSection(data));
}

function loadPostsIntoSection(postsArray) {
    let html = "";
    postsArray.forEach((post) => {
        html += `<div class="post-card">`;
        html += `<header class="post-header">`;
        html += `<h3>${post.id}.${post.title}</h3>`;
        html += `</header>`;
        html += `<p class="post-body">${post.body}</p>`;
        html += `</div>`;
    });

    createLoadingText();
    setTimeout(() => {
        document.querySelector('.post-container').insertAdjacentHTML('beforeend', html);
        destroyLoadingElement();
        scrollLock = false;
    }, 1000);
}
window.onscroll = function () {
    if (scrollLock) return;
    if (this.innerHeight + this.pageYOffset >= document.body.scrollHeight) {
        scrollLock = true;
        let postLength = document.querySelectorAll('.post-card').length
        getPosts(postLength);
    }
}

function createLoadingText() { 
    let p = document.createElement('p');
    p.innerText = 'Loading...';
    p.classList.add('loading-element')
    document.querySelector('.post-container').insertAdjacentElement('beforeend',p);
 }

function destroyLoadingElement(){
    document.querySelector('.loading-element').remove();
}

getPosts();