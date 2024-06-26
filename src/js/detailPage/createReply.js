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
        const wholeRepleDiv = elementMaker.getElement_all("div", "wholeRepleDiv", `wholeRepleDiv-id${i}`); // 댓글 영역만 감싸는 div
        const replyTag = elementMaker.getElement_all("div", "bottomDiv-replyDiv-contentDiv-replyBox", `replyBox-${i}`); // 댓글 전체 감싸는 div 
        const profileDivTag = elementMaker.getElement_class('div', 'contentDiv-profile'); // 프사 div
        const profileImg = elementMaker.getElement_class('img', 'topDiv-profileDiv-img'); // 프사 img 태그
        const contentDivTag = elementMaker.getElement_all('div', 'contentDiv-reple' ,`contentDiv-reple-index${i}`); // 닉네임 댓글 담는 div
        const nickPTag = elementMaker.getElement_all('p', 'contentDiv-reple-nickName', `nickNamePtag-${i}`); // 닉네임 p
        const contentPTag = elementMaker.getElement_all('p', 'contentDiv-reple-p', `contentPtag-${i}`); // 댓글 p

        // 삭제된 댓글이면 색 변경
        if(!replyObj[i].being) {
            contentPTag.style.color = "lightgray";
        }
        
        // append 시작
        document.querySelector("#bottomDiv-replyDiv-contentDiv").append(wholeRepleDiv);
        wholeRepleDiv.append(replyTag);
        replyTag.append(profileDivTag, contentDivTag);
        profileDivTag.append(profileImg);
        contentDivTag.append(nickPTag, contentPTag);

        // 댓글 출력
        profileImg.src = userProfileImg.getProfileData(replyObj[i].userId);
        nickPTag.innerHTML = replyObj[i].nickName
        contentPTag.innerHTML = replyObj[i].content;

        // 프사 클릭시 정보창으로
        profileDivTag.addEventListener('click', () => {
            window.location.href = `../userInfor/userInformation.html?user=${replyObj[i].userId}`
        })

        const bottomContentDiv = document.createElement('div'); //답글, 수정, 삭제 영역 Div
        bottomContentDiv.classList.add('bottomContentDiv');
        contentDivTag.append(bottomContentDiv);

        // 아이디가 댓글 작성자랑 같으면 수정/삭제 버튼 생성
        if(replyObj[i].userId === userInfor.userId && replyObj[i].being) {

            const updateP = elementMaker.getElement_all('p', 'updateP', `identfyUpdateP-${i}`); // 수정 버튼
            updateP.innerHTML = "수정";

            const deleteP = elementMaker.getElement_all('p', 'deleteP', `identfyDeleteP-${i}`); // 삭제
            deleteP.innerHTML = "삭제";

            bottomContentDiv.append(updateP, deleteP);

            document.querySelector(`#identfyUpdateP-${i}`).addEventListener('click', () => {
                createUpdateBtn(i); // 수정 버튼 클릭
            })

            deleteP.addEventListener('click', () => {
                if(confirm("정말로 댓글을 삭제하시겠습니까?")) {
                    deleteAction(i); // 삭제버튼 클릭
            }})
        }

        // 게시물이 존재하고 로그인 중이면 답글 버튼 생성
        if(replyObj[i].being && userInfor.userLogOn)
            {
                const commentP = document.createElement("p");
                commentP.classList.add("commentP");
                commentP.id = `commentP-${i}`
                commentP.innerHTML = "답글";
                bottomContentDiv.prepend(commentP);
                commentP.addEventListener('click', () => {
                    implementCommnet(i);
                })
                    
            }
    }
    commentRenderStart();
}


// 댓글 수정 기능
function createUpdateBtn(i) {

    const complitebutton = document.createElement("button"); // 완료버튼
    complitebutton.classList.add('updateCCBtn');
    complitebutton.id = (`updateBtnid${i}`);
    complitebutton.innerHTML = "수정";

    const canclebutton = document.createElement("button"); // 취소버튼
    canclebutton.classList.add('updateCCBtn');
    canclebutton.id = (`cancelBtnid${i}`);
    canclebutton.innerHTML = "취소";

    // 버튼 안보이게
    removeBtnConent(i);

    const area = document.createElement('textarea'); // 텍스트에리어 생성
    area.classList.add("updateTextArea");

    if(area.style.display == "none") { 
        area.style.display = "flex"; // 텍스트에리어 안보이는 거 방지
    }
    area.value = replyObj[i].content; // 수정시 기존 댓글 내용 보이게

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

        // 기존 버튼 보이게
        revealBtnContent(i);
    })
}

// 댓글 삭제
function deleteAction(i) {
    replyObj[i].content = "삭제된 댓글입니다.";
    replyObj[i].being = false;
    localStorage.setItem(postingNumber, JSON.stringify(replyObj));
    location.reload();
}


// 버튼 및 댓글 내용 안보이게 하는 함수
function removeBtnConent(i) {
    document.querySelector(`#contentPtag-${i}`).style.display = "none"; // 기존 댓글 내용 안보이게
    document.querySelector(`#identfyUpdateP-${i}`).style.display = "none"; // 수정버튼 안보이게
    document.querySelector(`#identfyDeleteP-${i}`).style.display = "none"; // 삭제버튼 안보이게
    document.querySelector(`#commentP-${i}`).style.display = "none"; // 답글버튼 안보이게
}

// 버튼 및 댓글 내용 보이게
function revealBtnContent(i) {
    document.querySelector(`#contentPtag-${i}`).style.display = "flex"; // 기존 댓글 내용 보이게
    document.querySelector(`#identfyUpdateP-${i}`).style.display = "flex"; // 수정버튼 보이게
    document.querySelector(`#identfyDeleteP-${i}`).style.display = "flex"; // 삭제버튼 보이게
    document.querySelector(`#commentP-${i}`).style.display = "flex"; // 답글버튼 보이게
}
