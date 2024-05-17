/* 유저 로그인 유무를 가져오는 클래스 */
class UserLoginStatus {
    // 로그인 유무 로컬 저장
    setUserStatus(binary) {
        localStorage.setItem('lLoginStatus', binary);
    }

    // 세션에서 로그인 유무 불러오기
    getUserStatus() {
        return localStorage.getItem('lLoginStatus');
    }

    // 로그아웃시 로컬 삭제
    removeUserStatus() {
        localStorage.removeItem('lLoginStatus');
    }
}


/* 유저 정보 (아이디, 닉네임, 프로필사진 로컬에 저장) */
class UserLoginManager {
    userInforBox = {}; // 

    // 유저 정보 로컬스토리지에 저장
    setUserInforBox(obj) {
        this.userInforBox = obj;
        localStorage.setItem("lUserInfor", JSON.stringify(this.userInforBox));
    }

    // 로컬 스토리지에서 유저 정보 가져오기
    getUserInforBox() {
        return JSON.parse(localStorage.getItem("lUserInfor"));
    }
    
    // 로그아웃시 유저 정보 삭제
    removeUserInforBox() {
        localStorage.removeItem('lUserInfor');
    }
}


/* 작성한 글을 객체로 만드는 클래스*/
class MateBoardManager {
    constructor(_title, _content, _nickname, _userID) {
        this.postTitle = _title; // 제목
        this.postContent = _content; // 내용 (본문)
        this.userNicknameInfor = _nickname; // 닉네임
        this.userId = _userID; // 아이디
        this.postView = 0; // 조회수
        this.postDate = new Date().getFullYear() + "-"+ (new Date().getMonth() + 1) +"-"+ new Date().getDate() // 날짜 (yyyy-mm-dd)
    }
}

/* 작성한 글을 배열에 넣고 로컬저장소에 넣거나 가져오는 클래스 */
class StoreBoard {
    contentArray = []; // 작성글을 임시로 넣을 배열
    
    constructor (kategorieName){
        if (this.getContentArray(kategorieName) == null) {
            this.contentArray = [];
        }else{
            this.contentArray = this.getContentArray(kategorieName);
        }
    }

    // 작성글을 로컬스토리지에 저장하는 함수
    setContentArray(contentObj, kategorieName) {
        this.contentArray.push(contentObj); 
        localStorage.setItem(kategorieName, JSON.stringify(this.contentArray));
    }

    // 로컬스토리지에서 작성글을 불러오는 함수
    getContentArray(kategorieName) {
        return JSON.parse(localStorage.getItem(kategorieName)); // 스토리지에 있는 글을 가져옴
    }
}

/* 카테고리명 세션에 저장하는 클래스 */
class MemorizeKategorie {
    setSession(globalGameName) {
        sessionStorage.setItem('sGameName', globalGameName);
    }
    getSession() {
        return sessionStorage.getItem('sGameName');
    }
}

/* HTML 문서 내 컨텐츠 가져오는 클래스 */
class GetConetent {
    getTitleContent(HTMLid) {
        return document.querySelector(HTMLid).value;
    }
    getPosterConetent(HTMLid) {
        return document.querySelector(HTMLid).value;
    }
}


/* 프로필 사진 관리 클래스 */
class UserProfileImg {
    imgBox = [];

    setProfileImg(id, imgSrc) {
        userImege = {[id]: imgSrc};
        this.imgBox.push(userImege);
        localStorage.setItem("lUserProfile", JSON.stringify(imgBox));
    }

    getProfileImg(id) {
        const profileImgObj = JSON.parse(localStorage.getItem("lUserProfile"));
        return profileImgObj[id]; // 이미지 주소를 가져옴
    }
}