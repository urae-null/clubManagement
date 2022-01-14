var data;
var url;
var clubNumber = 1;

function loadClubList(){
    url = 'https://script.google.com/macros/s/AKfycbz48SfrCNoyzAC2Y4cassb96sI35bHVK6wXZ12gB4x9yr6JPzBeerH7Tj_DONO6js4ziQ/exec'
    fetch(url)
        .then(response => response.json())
        .then(json => {
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
            console.log(data)
        }).catch(() => {
            console.log('error')
    });
}

function clubContainer(data) {
    var container = `
    <div id="${data.name}" style="display:flex;">
    <div class="clubPoster">
        <img id="posterC${data.name}" style="height:540px; margin: auto;" src="${data.poster}.png" referrerpolicy="no-referrer">
    </div>
    <div style="height: 540px; width: 50%;">
        <div style="height: calc(87.5px * 3 / 2);">
            <img id="logoC${data.name}" style="width: calc(31px * 3 / 2); height: calc(31px * 3 / 2); text-align: left;" src="${data.logo}.png" referrerpolicy="no-referrer">
            <p class="clubName" id="nameC${data.name}">${data.name}</p>
        </div>
        <div class="clubType" id="groupC${data.name}">제${data.group}동아리</div>
        <div class="clubSubject" id="subjectC${data.name}">${data.subject}</div>
        <div class="clubIntroTitle">소개</div>
        <div class="clubIntro" id="introC${data.name}">
            ${data.intro}
        </div>
        <footer style="margin-top: auto; margin-bottom: calc(8.5px * 3 / 2);">
            <div style="text-align: center; margin: calc(14px * 3 / 2); display: flex; align-items: center; justify-content: center;">
                <div class="clubInterview">면접<br><div id="interviewC${data.name}">${data.interview}</div></div>
                <div class="clubMyself">자소서<br><div id="myselfC${data.name}">${data.myself}</div></div>
            </div>
            <div class="clubInterviewDate">면접 일시- <div id="dateC${data.name}"> ${data.date}</div></div>
            </div>
        </footer>
    </div>
    </div>`;
    return container;
}

function moveY(cnt) {
    var clubExplain = document.getElementById("clubExplain");
    clubExplain.style.transform = `translateY(-${cnt*540}px)`;
    insertSign(cnt);
}

function insertSign(cnt) {
    var appliForm = document.getElementById("application");
    clubNumber = cnt;
    appliForm.name.value = data[cnt].name;
    appliForm.group.value = data[cnt].group;
    appliForm.subject.value = data[cnt].subject;
    appliForm.intro.value = data[cnt].intro;
    appliForm.interview.value = data[cnt].interview;
    appliForm.date.value = data[cnt].date;
    appliForm.myself.value = data[cnt].myself;
    appliForm.poster.value = data[cnt].poster;
    appliForm.logo.value = data[cnt].logo;
    appliForm.link.value = data[cnt].link;
}

document.getElementById('application').addEventListener('change', function(event){
    var elem = event.target;
    console.log(event);
    console.log(elem.tagName);
    console.log(elem.type);
    console.log(elem.value);  
    if (elem.name != 'group' || elem.name != 'link' || elem.name != 'name') {
        if(elem.name == 'poster' || elem.name =='logo') {
            document.getElementById(elem.name+'C'+data[clubNumber].name).src = elem.value + ".jpg";
        } else {
            document.getElementById(elem.name+'C'+data[clubNumber].name).innerHTML = elem.value;
        }
    }
});

async function sign(){
    var appliForm = document.getElementById("application");
    appliForm.action = 'https://script.google.com/macros/s/AKfycbzyGNCbUKuxvzDoR7oP3L3bxc51zJTCqqmf7aud-SEfHAAhu5bsStunQ-88-YNm804PmA/exec';
    await appliForm.submit();
    M.toast({html: '수정되었습니다.',inDuration: 200, outDuration:200});
    appliForm.preventDefault();
    return
    
}