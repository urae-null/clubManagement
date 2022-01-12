function loadClubList(){
    let url = 'https://script.google.com/macros/s/AKfycbz48SfrCNoyzAC2Y4cassb96sI35bHVK6wXZ12gB4x9yr6JPzBeerH7Tj_DONO6js4ziQ/exec'
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            data = json.list
            var clubExplain = document.getElementById('clubExplain')
            var firstList = document.getElementById('firstList')
            var secondList = document.getElementById('secondList')
            clubExplain.innerHTML = ''
            for (let i in data) {
                if (data[i].group == 1) {
                    firstList.innerHTML += `<div class="${i}" onclick="moveY(${i})">${data[i].name}</div>`
                } else if (data[i].group == 2) {
                    secondList.innerHTML += `<div class="${i}" onclick="moveY(${i})">${data[i].name}</div>`
                }
                clubExplain.innerHTML += clubContainer(data[i])
            }
        }).catch(() => {
            console.log('error')
    });
}

function clubContainer(data) {
    var container = `
    <div id="${data.name}" style="display:flex;">
    <div class="clubPoster">
        <img style="width: 80%; margin: auto;">
    </div>
    <div style="height: 360px; width: 50%;">
        <div style="height: 87.5px;">
            <img style="width: 31px; height: 31px; text-align: left;">
            <p class="clubName">${data.name}</p>
        </div>
        <div class="clubType">제${data.group}동아리</div>
        <div class="clubSubject">${data.subject}</div>
        <div class="clubIntroTitle">소개</div>
        <div class="clubIntro">
            ${data.intro}
        </div>
        <footer style="margin-top: auto; margin-bottom: 8.5px;">
            <div style="text-align: center; margin: 14px; display: flex; align-items: center; justify-content: center;">
                <div class="clubInterview">면접<br>${data.interview}</div>
                <div class="clubMyself">자소서<br>${data.myself}</div>
            </div>
            <div class="clubInterviewDate">면접 일시 - ${data.date}</div>
            </div>
        </footer>
    </div>
    </div>`;
    return container;
}

function moveY(cnt) {
    var clubExplain = document.getElementById("clubExplain");
    clubExplain.style.transform = `translateY(-${cnt*360}px)`
}

function sign(){
    var appliForm = document.getElementById("application");
    var schoolNumber = appliForm.schoolNumber.value;
    var name = appliForm.name.value;
    var firstClub1 = appliForm.firstClub1.value;
    var firstClub2 = appliForm.firstClub2.value;
    var secondClub1 = appliForm.secondClub1.value;
    var secondClub2 = appliForm.secondClub2.value;
    console.log(appliForm,schoolNumber,firstClub1, M.toast({html: '학번이 올바르지 않아요.',inDuration: 200, outDuration:200}));
    return
    
}