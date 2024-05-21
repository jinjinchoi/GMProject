

// 댓글 달기
document.querySelector("#bottomDiv-replyDiv-form").addEventListener('submit', (e) => {
    e.preventDefault(e);
    if (document.querySelector("#bottomDiv-replyDiv-area").value.trim() === "")
        {
            alert("내용을 입력해주세요");
            return;
        }
    let replyIndex = replyStore.getThisArray();
    const replyContent = new ReplyManager(new GetConetent().getPosterConetent("#bottomDiv-replyDiv-area"), userInfor.userNickname, userInfor.userId, replyIndex.length);
    replyStore.setContentArray(replyContent, postingNumber);
    location.reload();
})


// 댓글 그리기
function renderReply() {
    for(let i = 0; i < replyObj.length; i++) {
        if(replyObj[i] === null) {
            continue;
        }

        const replyTag = document.createElement('div'); // 댓글 전체 박스
        replyTag.classList.add("bottomDiv-replyDiv-contentDiv-replyBox");

        const profileDivTag = document.createElement('div'); // 프사 영역
        profileDivTag.classList.add("contentDiv-profile");

        const profileImg = document.createElement('img'); // 프사 이미지태그
        profileImg.classList.add('topDiv-profileDiv-img');

        const contentDivTag = document.createElement('div'); // 닉네임 댓글 내용 담는 박스
        contentDivTag.classList.add("contentDiv-reple");
        contentDivTag.id = (`contentDiv-reple-index${i}`);

        const nickPTag = document.createElement('p'); // 닉네임
        nickPTag.id = `nickNamePtag-${i}`;
        nickPTag.classList.add('contentDiv-reple-nickName');

        const contentPTag = document.createElement('p'); // 댓글 내용
        contentPTag.id = `contentPtag-${i}`;
        contentPTag.classList.add('contentDiv-reple-p');

        // 삭제된 댓글이면 색 변경
        if(!replyObj[i].being) {
            contentPTag.style.color = "lightgray";
        }

        document.querySelector("#bottomDiv-replyDiv-contentDiv").append(replyTag);
        replyTag.append(profileDivTag, contentDivTag);
        profileDivTag.append(profileImg);
        contentDivTag.append(nickPTag, contentPTag);

        profileImg.src = userProfileImg.getProfileData(replyObj[i].userId);
        nickPTag.innerHTML = replyObj[i].nickName
        contentPTag.innerHTML = replyObj[i].content;

        // 프사 클릭시 정보창으로
        profileDivTag.addEventListener('click', () => {
            window.location.href = `../userInfor/userInformation.html?user=${replyObj[i].userId}`
        })

        // 아이디가 댓글 작성자랑 같으면 수정/삭제 버튼 생성
        if(replyObj[i].userId === userInfor.userId && replyObj[i].being) {
            const bottomContentDiv = document.createElement('div');
            bottomContentDiv.classList.add('bottomContentDiv');

            const updateP = document.createElement('p');
            updateP.classList.add('updateP');
            updateP.id = `identfyUpdateP-${i}`

            const deleteP = document.createElement('p');
            deleteP.classList.add('deleteP');
            deleteP.id = `identfyDeleteP-${i}`

            contentDivTag.append(bottomContentDiv);
            bottomContentDiv.append(updateP, deleteP);
            updateP.innerHTML = "수정";
            deleteP.innerHTML = "삭제";

            document.querySelector(`#identfyUpdateP-${i}`).addEventListener('click', () => {
                createUpdateBtn(i);
            })

            deleteP.addEventListener('click', () => {
                if(confirm("정말로 댓글을 삭제하시겠습니까?")) {
                    deleteAction(i); 
            }})


        }
    }
}


// 댓글 수정 기능
function createUpdateBtn(i) {

    const complitebutton = document.createElement("button"); // 완료버튼
    complitebutton.classList.add('updateCCBtn');
    complitebutton.id = (`updateBtnid${i}`);
    complitebutton.innerHTML = "작성";

    
    const canclebutton = document.createElement("button"); // 취소버튼
    canclebutton.classList.add('updateCCBtn');
    canclebutton.id = (`cancelBtnid${i}`);
    canclebutton.innerHTML = "취소";

    const content = document.querySelector(`#contentPtag-${i}`);
    const updateBtn = document.querySelector(`#identfyUpdateP-${i}`);
    const deleteBtn = document.querySelector(`#identfyDeleteP-${i}`);

    content.style.display ="none" // 기존 댓글 내용 안보이게
    updateBtn.style.display ="none" // 수정버튼 안보이게
    deleteBtn.style.display ="none" // 삭제버튼 안보이게

    const area = document.createElement('textarea');
    area.classList.add("updateTextArea");

    if(area.style.display == "none") { 
        area.style.display = "flex"; // 텍스트에리어 안보이는 거 방지
    }
    area.value = replyObj[i].content;

    document.querySelector(`#contentDiv-reple-index${i}`).append(area, complitebutton, canclebutton);

    // 댓글 수정
    complitebutton.addEventListener('click', () => {
        replyObj[i].content = area.value;
        localStorage.setItem(postingNumber, JSON.stringify(replyObj));
        location.reload();
    })

    // 수정 취소
    canclebutton.addEventListener('click', () => {
        area.style.display = "none"; // 에리아 안보이게
        complitebutton.style.display = "none"; // 작성버튼 안보이게
        canclebutton.style.display = "none"; // 취소버튼 안보이게

        content.style.display = "flex" // 기존 댓글 내용 보이게
        updateBtn.style.display = "flex" // 수정버튼 보이게
        deleteBtn.style.display = "flex" // 삭제버튼 보이게


    })
}

// 댓글 삭제
function deleteAction(i) {
    replyObj[i].content = "삭제된 댓글입니다.";
    replyObj[i].being = false;
    localStorage.setItem(postingNumber, JSON.stringify(replyObj));
    location.reload();
}