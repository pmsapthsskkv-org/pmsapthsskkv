const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3_aHv0XHY2TyBbIMw2i6HcEyz0lq_UuPBfpkMn0P0ZYHTZF8tY6SG814HlRqarJXfTojr28ZBgKV3/pub?output=csv';

function normalizeHeader(header) {
    return header.replace(/\s+/g, '').replace(/_/g, '').toLowerCase();
}

function parseCSV(text) {
    const lines = text.trim().split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => normalizeHeader(h));
    return lines.slice(1).map(line => {
        const values = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
        let obj = {};
        headers.forEach((h, i) => {
            obj[h] = values[i] ? values[i].replace(/^"|"$/g, '').trim() : '';
        });
        return obj;
    }).filter(row => row["title"] || row["description"] || row["imageurl"]);
}

function renderPosts(posts) {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.slice().reverse().forEach(post => {
        const title = post['title'] || '';
        const desc = post['description'] || '';
        const image = post['imageurl'] || post['image_url'] || '';
        const timestamp = post['timestamp'] || '';
        if (!title && !desc && !image) return;
        const postDiv = document.createElement('div');
        postDiv.className = 'post-card';
        postDiv.innerHTML = `
            <div class="post-img-area">
                ${image ? `<img class="post-img" src="${image}" alt="${title}">` : `<span style='color:var(--color-noimg);font-size:2em;'>No Image</span>`}
            </div>
            <div class="post-content">
                <div class="post-meta">Posted on ${timestamp ? ` &middot; ${timestamp}` : ''} <br> <b><i class="fa-solid fa-user" style="color: #2c2d30ff;"></i> PMSA</b></div>
                <div class="post-title">${title}</div>
                <div class="post-desc">${desc}</div>
            </div>
        `;
        // Add image zoom modal event
        if (image) {
            postDiv.querySelector('.post-img').addEventListener('click', function(e) {
                e.stopPropagation();
                openModal(image, title);
            });
        }
        postsDiv.appendChild(postDiv);
    });
}

// Modal logic
function openModal(imgSrc, alt) {
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('modalImg');
    modalImg.src = imgSrc;
    modalImg.alt = alt || '';
    modal.classList.add('active');
}
document.getElementById('modalClose').onclick = function() {
    document.getElementById('imgModal').classList.remove('active');
    document.getElementById('modalImg').src = '';
};
document.getElementById('imgModal').onclick = function(e) {
    if (e.target === this) {
        this.classList.remove('active');
        document.getElementById('modalImg').src = '';
    }
};

fetch(csvUrl)
    .then(response => response.text())
    .then(text => {
        const posts = parseCSV(text);
        renderPosts(posts);
    })
    .catch(err => {
        document.getElementById('posts').innerHTML = '<p>Failed to load posts.</p>';
    });
