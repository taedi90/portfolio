'use strict';

(function(){
    const slides = document.querySelectorAll(".slide"); //전체 슬라이드
    const navContainer = document.querySelector("#nav_container");
    const topButton = document.querySelector("#top_button_holder");
    const slideCount = slides.length; //슬라이드 수
    let curIndex = 0; //현재 슬라이드 번호

    //네비 리스트 생성하기
    for(let i = 0; i < slideCount; ++i) {
        let title = slides[i].dataset.title;
        if(title === undefined || title === ""){
            title = "slide" + (i + 1);
        }
        
        const list = document.createElement("li");
        list.textContent = title;

        list.addEventListener('click', (e)=>{
            e.preventDefault();
            changeSlide(i);
        }, {passive:false});

        navContainer.appendChild(list);
    }

    const navLists = navContainer.childNodes;

    //휠 동작에 따라 페이지 전환
    document.addEventListener('wheel', (e)=>{
        e.preventDefault();

        console.log(e.deltaY); // 음수는 위로 양수는 아래로

        if(e.deltaY > 0) {//내려가기
            nextSlide();
        } else {//위로가기
            prevSlide();
        }

    }, {passive:false});

    window.addEventListener('resize', ()=>{
        checkSlide();
    });


    document.addEventListener('mouseup', (e)=>{
        checkSlide();
    });

    //최상위 이동 버튼
    topButton.addEventListener('click', ()=>{
        changeSlide(0);
    });

    //방향키 반응
    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        console.log(e);

        const key = e.keyCode;

        //위로 || 왼쪽
        if(key === 38 || key === 37){
            console.log("위로");
            prevSlide();
        }
        //아래로 || 오른쪽
        if(key === 40 || key === 39){
            console.log("아래로");
            nextSlide();
        }
        //엔터
        if(key === 13){
            console.log("엔터");
        }
        //백스페이스 || ESC
        if(key === 8 || key === 27){
            console.log("엔터");
            changeSlide(0);
        }

    }, {passive:false})



    //페이지 이동하기
    function changeSlide(index){
        if(index < 0 || index >> slideCount){
            return;
        }

        slides[curIndex].classList.remove("focused");
        navLists[curIndex].classList.remove("focused");

        curIndex = index;
        slides[index].classList.add("focused");
        navLists[index].classList.add("focused");

        const height = window.innerHeight;
        window.scrollTo({top: index * height, behavior: 'smooth'});
        console.log(index * height);

        toggleNav();
    }

    function prevSlide(){
        if (curIndex > 0) {
            changeSlide(curIndex - 1);
        } 
    }

    function nextSlide(){
        if (curIndex + 1 < slideCount) {
            changeSlide(curIndex + 1);
        } 
    }

    function checkSlide(){

        const curY = window.scrollY;

        const height = window.innerHeight;

        let min;
        let closeIdx = 0;

        for(let i = 0; i < slideCount; ++i){
            const abs = Math.abs((height * i) - curY);
            if(min > abs || min === undefined){
                min = abs;
                closeIdx = i;
            }
        }

        changeSlide(closeIdx);

    }



    //2페이지 이후부터 네비게이션 보여주기
    function toggleNav(){
        if(curIndex === 0){
            navContainer.classList.add('hidden');
            topButton.classList.add('hidden');
        }else{
            navContainer.classList.remove('hidden')
            topButton.classList.remove('hidden');
        }
    }

})();