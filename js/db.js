var data;
var url;
var clubNumber = 1;
var studentList;


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
    fetch('https://script.google.com/macros/s/AKfycbyoVFjOc0iMdrnCL2leJvQ3lwWMcIUm9CeJyVCC35_WKyDIdpFI7gOWoHoGPchd9ReBeQ/exec')
        .then(response => response.json())
        .then(json => {
            studentList = json.list
            console.log(studentList)
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

var applicationCnt = 0;
var passCnt = 0;
var tmpStudentList = [];

async function moveY(cnt) {
    var clubExplain = document.getElementById("clubExplain");
    clubExplain.style.transform = `translateY(-${cnt*540}px)`;
    insertSign(cnt);

    await studentSort(cnt);
    numberCount()
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

var applicationList = document.getElementById("list-application");
var passList = document.getElementById("list-pass");

function studentSort(cnt) {
    applicationCnt = 0
    passCnt = 0
    tmpStudentList = []
    applicationList.innerHTML = ''
    passList.innerHTML = ''
    for (let i in studentList) {
        var tmpStudentData = []
        if(studentList[i].firstClub.includes(cnt)) {
            var index = studentList[i].firstClub.indexOf(cnt);
            if (studentList[i].passOrNotFirstClub[index] == "합격") {
                passList.innerHTML += tableContainer(studentList[i],1)
                passCnt += 1
            } else {
                applicationList.innerHTML += tableContainer(studentList[i],1)
                applicationCnt += 1
            }
            tmpStudentData = [studentList[i].number, studentList[i].passOrNotFirstClub[index]]
        } else if(studentList[i].secondClub.includes(cnt)) {
            if (studentList[i].passOrNotSecondClub[studentList[i].secondClub.indexOf(cnt)] == "합격") {
                passList.innerHTML += tableContainer(studentList[i],2)
                passCnt += 1
            } else {
                applicationList.innerHTML += tableContainer(studentList[i],2)
                applicationCnt += 1
            }
            tmpStudentData = [studentList[i].number, studentList[i].passOrNotSecondClub[index]]
        }
        tmpStudentList.push(tmpStudentData)
    }
}


function numberCount() {
    var applicationStudentNumber = document.getElementById("countApplicationStudent");
    var passStudentNumber = document.getElementById("countPassStudent");
    applicationStudentNumber.innerHTML = `(${applicationCnt}명)`
    passStudentNumber.innerHTML = `(${passCnt}명)`
}

function tableContainer(student,cnt) {
    var passOrNot
    if (cnt == 1) {
        passOrNot = [...student.passOrNotFirstClub]
    } else if (cnt == 2) {
        passOrNot = [...student.passOrNotSecondClub]
    }
    for (let i = 0 ; i <= 1 ; i++) {
        if (passOrNot[i] == "합격") {
            passOrNot[i] = 'green'
        } else if (passOrNot[i] == "불합격") {
            passOrNot[i] = 'red'
        } else if (passOrNot[i] == "검토중") {
            passOrNot[i] = 'yellow'
        }
    }
    var container = 
    `<tr id = "${student.number}">
        <td>${student.number}</td>
        <td>${student.name}</td>
        <td><div>${cnt == 1 ? data[student.firstClub[0]].name : data[student.secondClub[0]].name}<div class="${cnt == 1 ? student.firstClub[0] : student.secondClub[0]}" style="width:10px;height:10px;border-radius:100%;background-color:var(--${passOrNot[0]}-color);margin:0 0 0 5px;"></div></div></td>
        <td><div>${cnt == 1 ? data[student.firstClub[1]].name : data[student.secondClub[1]].name}<div class="${cnt == 1 ? student.firstClub[1] : student.secondClub[1]}" style="width:10px;height:10px;border-radius:100%;background-color:var(--${passOrNot[1]}-color);margin:0 0 0 5px;"></div></div></td>
        <td><a href="javascript:void(0);" onclick="transStudentPassOrFail(${student.number});"><img src="./img/baseline_swap_horiz_black_24dp.png" width="30px"></a></td>
    </tr>`
    return container
}

function transStudentPassOrFail(studentNumber) {
    var studentElement = document.getElementById(studentNumber)
    var studentPassOrFail = document.querySelector('[id="' + studentNumber + '"] [class="' + clubNumber + '"]')
    const tmpStudentArrayIndex = tmpStudentList.findIndex(student => {
        if (student[0] == studentNumber) { return true }
    })
    if (tmpStudentList[tmpStudentArrayIndex][1] == "합격") {
        studentPassOrFail.style.backgroundColor = 'var(--red-color)'
        tmpStudentList[tmpStudentArrayIndex][1] = "불합격"
        applicationList.appendChild(studentElement)
        applicationCnt += 1
        passCnt -= 1
    } else {
        studentPassOrFail.style.backgroundColor = 'var(--green-color)'
        tmpStudentList[tmpStudentArrayIndex][1] = "합격"
        passList.appendChild(studentElement)
        applicationCnt -= 1
        passCnt += 1
    }
    numberCount()
}

function modifyStudentPassOrFail() {
    let url = 'https://script.google.com/macros/s/AKfycbyjuTlI1BZ4NXpH9-IVF2SE9yq6KVTqmuNp1pnJCtEGN3PyrRmqxqCWyBIuownUwgY4Fg/exec'
    fetch(url,{
        method: "POST",
        contentType: "application/json",
        body: JSON.stringify({
            club : clubNumber,
            studentData : tmpStudentList
        }),
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.result == "success") {
                M.toast({html: '수정되었습니다.',inDuration: 200, outDuration:200})
                setTimeout(()=>{
                    location.reload();
                },2000)
            } else if (json.result == "duple") {
                M.toast({html: '1지망을 합격한 학생이 포함되었습니다',inDuration: 200, outDuration:200})
                setTimeout(()=>{
                    location.reload();
                },2000)
            } else {
                M.toast({html: '다시 시도해 주세요.',inDuration: 200, outDuration:200})
            }
        }).catch(() => {
            M.toast({html: '다시 시도해 주세요.',inDuration: 200, outDuration:200})
            console.log('error')
    });
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