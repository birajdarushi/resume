document.getElementById('menu-btn').addEventListener('click', function(event) {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.left = '0';
    event.stopPropagation(); // Prevent the click from propagating to the document
});

document.addEventListener('click', function(event) {
    var sidebar = document.getElementById('sidebar');
    var menuBtn = document.getElementById('menu-btn');
    var isClickInsideSidebar = sidebar.contains(event.target);
    var isClickInsideMenuBtn = menuBtn.contains(event.target);

    if (!isClickInsideSidebar && !isClickInsideMenuBtn) {
        sidebar.style.left = '-250px';
    }
});
window.addEventListener('scroll', function() {
    var hero = document.getElementById('hero');
    var container = document.getElementById('container');
    var scrollPosition = window.scrollY;
    var opacity = 1 - (scrollPosition / 500); // Adjust 500 to change scroll sensitivity

    if (opacity < 0) {
        opacity = 0; // Ensure opacity doesn't go below 0
    }

    hero.style.opacity = opacity;
    container.style.opacity = 1 - opacity;
});
