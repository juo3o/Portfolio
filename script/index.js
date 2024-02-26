$(document).ready(function(){

    //uiux 디자인 목록 자동 롤 순위
        let Roll = ()=> {
                $('.boxIn li:first').appendTo($('.boxIn')).show(300);
                $('.boxIn li:nth-child(3)').siblings().find('.uiux01').css('display', 'none');
                $('.boxIn li:nth-child(3)').find('.uiux01').css('display', 'block');               
        }
        // 초기 호출
        Roll();
        // 호버 시 롤링 멈춤
        $('.uiux01').hover(
            function() {
                clearInterval(interval);
            },
            function() {
                interval = setInterval(function() {
                    $('.boxIn li:first').hide(200, Roll);
                }, 3000);
            }
        );
        // 이미지에 호버 시 카드 뒤집히는 애니메이션 추가
        $('.uiux01 img').mouseenter(function() {
            var $card = $(this).siblings('.card');
            if (!$card.hasClass('flipped')) {
                $card.addClass('flipped');
                $(this).addClass('flipped2');
                $card.one('mouseenter', function() {// .card 영역에서의 mouseenter 이벤트를 한 번만 실행하도록 설정
                    return false; // 이벤트를 막음
                });
            }
        });
        // 영역 안에 있을 때 뒤집기 멈춤
        $('.uiux01').mouseleave(function() {
            $('.card').removeClass('flipped');
            $('.uiux01 img').removeClass('flipped2');
        });

    // //아코디언메뉴 함수
        $('.list_tag').click(function(){
            var $parentList = $(this).parent(); // 클릭된 .list의 부모 요소인 .list_wrap
            var currentLeft = $parentList.css('left');
            if (currentLeft === '0px') {
                $parentList.animate({ left: '-1190px' }, 300); // 왼쪽으로 이동
            } else { 
                $parentList.animate({ left: '0px' }, 300); // 원래 위치로 이동
            }
            // 클릭한 .list_tag 요소에만 .on_tag 클래스 추가
            $(this).addClass('on_tag').parent().siblings().find('.list_tag').removeClass('on_tag');
            // 현재 클릭된 .list를 제외한 다른 .list 요소의 .on_tag 클래스 제거
            $parentList.siblings().find('.list_tag').removeClass('on_tag');
            // 현재 클릭된 .list를 제외한 다른 .liste 닫기
            $parentList.siblings().animate({ left: '0px' }, 300);
            // 클릭한 .list 요소를 기준으로 이전 .list 요소를 toggle
            var $clickedIndex = $parentList.index();
            $parentList.prevAll('.list').each(function(index) {
                if (index < $clickedIndex) {
                    $(this).animate({ left: '-1190px' }, -100); // 왼쪽이동
                } else {
                    return false; 
                }
            });
            // 클릭한 .list 요소를 기준으로 이후 .list 요소를 toggle
            $parentList.nextAll('.list').each(function(index) {
                if (index <= $clickedIndex) {
                    return false; 
                } else {
                    $(this).animate({ left: '0px' }, 300); // 원래 위치
                }
            });
        });

    //스크롤시 메뉴 색상 변경...
        $(window).scroll(function () { 
            var scrollValue = $(document).scrollTop(); 
            console.log(scrollValue); 
            if (scrollValue==0) {
                $('header').css('opacity','0'); /*로고*/
            } else {
                $('header').css('opacity','1');
            }
            if (scrollValue >= 890 && scrollValue < 1500) {
                $('.intro nav ul li:first-child .menu').addClass('show');
                $('#name').addClass('active'); /*형광펜*/
            } else {
                $('.intro nav ul li:first-child .menu').removeClass('show');
                $('#name').removeClass('active');/*형광펜*/
            }
            if (scrollValue >= 1780 && scrollValue < 2500) {
                $('.intro nav ul li:nth-child(2) .menu').addClass('show');
            } else {
                $('.intro nav ul li:nth-child(2) .menu').removeClass('show');
            }
            if (scrollValue >= 2670 && scrollValue < 3000) {
                $('.intro nav ul li:last-child .menu').addClass('show');
            } else {
                $('.intro nav ul li:last-child .menu').removeClass('show');
            }
        });

    //푸터 sns hover
        $('.sns_wrap li').hover(
            function() {
                var index = $(this).index();
                $('.sns_txt li').eq(index).fadeIn(200);
            },
            function() {
                var index = $(this).index();
                $('.sns_txt li').eq(index).fadeOut(200);
            }
        );
    });

    //원페이지스크롤이벤트
    window.addEventListener("wheel", function(e){
        e.preventDefault();
    },{passive : false});
    var $html = $("html");
    var page = 1;
    var lastPage = $("section").length;
    //스크롤애니메이션 시간
    var timeScrollAnimation = 100;
    $html.animate({scrollTop:0},10);
    $(window).on("wheel", function(e){
        if($html.is(":animated")) return;
        if(e.originalEvent.deltaY > 0){
            if(page== lastPage) return;
            page++;
        }else if(e.originalEvent.deltaY < 0){
            if(page == 1) return;
            page--;
        }
        var posTop = (page-1) * ($(window).height());
        $html.animate({scrollTop : posTop}, timeScrollAnimation);
    });