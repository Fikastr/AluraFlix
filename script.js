document.addEventListener('DOMContentLoaded', function() {
    loadVideos();
});

function showSection(sectionId) {
    var sections = document.querySelectorAll('.team-details');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });

    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

function addVideo(listId, fileId, titleId, descriptionId) {
    var videoFile = document.getElementById(fileId).files[0];
    var videoTitle = document.getElementById(titleId).value;
    var videoDescription = document.getElementById(descriptionId).value;

    if (videoFile && videoTitle && videoDescription) {
        var videoURL = URL.createObjectURL(videoFile);
        
        var videoList = document.getElementById(listId);
        var li = document.createElement('li');
        li.innerHTML = `<video src="${videoURL}" controls width="300"></video>
                        <p>${videoTitle}</p>
                        <p>${videoDescription}</p>
                        <button onclick="removeVideo('${listId}', this)">Eliminar</button>`;
        videoList.appendChild(li);

        var videoData = {
            url: videoURL,
            title: videoTitle,
            description: videoDescription
        };
        var videos = JSON.parse(localStorage.getItem(listId)) || [];
        videos.push(videoData);
        localStorage.setItem(listId, JSON.stringify(videos));

        document.getElementById(titleId).value = '';
        document.getElementById(descriptionId).value = '';
    } else {
        alert('Por favor, completa todos los campos para agregar el video.');
    }
}

function removeVideo(listId, button) {
    var videoItem = button.parentElement;
    var videoTitle = videoItem.querySelector('p').textContent;

    var videos = JSON.parse(localStorage.getItem(listId)) || [];
    videos = videos.filter(video => video.title !== videoTitle);
    localStorage.setItem(listId, JSON.stringify(videos));

    videoItem.remove();
}

function loadVideos() {
    var sections = document.querySelectorAll('.team-details');
    sections.forEach(function(section) {
        var listId = section.querySelector('ul').id;
        var videos = JSON.parse(localStorage.getItem(listId)) || [];
        var videoList = section.querySelector('ul');
        videoList.innerHTML = '';
        videos.forEach(function(video) {
            var li = document.createElement('li');
            li.innerHTML = `<video src="${video.url}" controls width="300"></video>
                            <p>${video.title}</p>
                            <p>${video.description}</p>
                            <button onclick="removeVideo('${listId}', this)">Eliminar</button>`;
            videoList.appendChild(li);
        });
    });
}
