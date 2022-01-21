var clubChecked = document.getElementById("select")
var firstList = document.getElementById("firstList")
var secondList = document.getElementById("secondList")

clubChecked.addEventListener('click', function() {
    console.log(clubChecked)
    if (clubChecked.checked) {
        firstList.style.transform = 'translateY(-150px)'
        secondList.style.transform = 'translateY(-48px)'
    }
    else {
        firstList.style.transform = 'translateY(0px)'
        secondList.style.transform = 'translateY(-150px)'
    }
});

var menuChecked = document.getElementById("select-menu")
var backgroundBox = document.getElementById("background-box")
var firstMenu = document.getElementById("menu-first")
var secondMenu = document.getElementById("menu-second")
var semipage = document.getElementById("semipage")

menuChecked.addEventListener('click', function() {
    console.log(menuChecked)
    if (menuChecked.checked) {
        backgroundBox.style.right = '-160px'
        firstMenu.style.color = 'var(--main-color)'
        secondMenu.style.color = 'var(--semi-color)'
        semipage.style.transform = 'translateY(calc(-100vh + 104px))'
    }
    else {
        backgroundBox.style.right = '-75px'
        firstMenu.style.color = 'var(--semi-color)'
        secondMenu.style.color = 'var(--main-color)'
        semipage.style.transform = 'translateY(0px)'
    }
});