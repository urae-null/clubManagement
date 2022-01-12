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