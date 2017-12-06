$('.message a').click(function () {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow", "swing");
});

function myMap() {
    var curlocation = { lat: 35.905851, lng: -78.91636 };
    var locationA = { lat: 35.901353, lng: -78.9594240 };
    var locationB = { lat: 35.934329, lng: -78.9080430 };
    var locationC = { lat: 35.964874, lng: -78.9544870 };
    var locationD = { lat: 35.956300, lng: -78.9563120 }; 
    var curimage = 'https://www.manchesterdigital.com/sites/default/files/icon-rectangle-with-spacing.png';
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 12,
        center: curlocation
    });
    var markercur = new google.maps.Marker({
        position: curlocation,
        map: map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7
          }
    });
    var marker1 = new google.maps.Marker({
        position: locationA,
        map: map
    });
    var marker2 = new google.maps.Marker({
        position: locationB,
        map: map
    });
    var marker3 = new google.maps.Marker({
        position: locationC,
        map: map
    });
    var marker4 = new google.maps.Marker({
        position: locationD,
        map: map
    });
    
    var curString = 'MY LOCATION';
    var AString = 'LOCATION A';
    var BString = 'LOCATION B';
    var CString = 'LOCATION C';
    var DString = 'LOCATION D';
    var curwindow = new google.maps.InfoWindow({
        content: curString
    });
    
    var awindow = new google.maps.InfoWindow({
        content: AString
    });
    var bwindow = new google.maps.InfoWindow({
        content: BString
    });
    var cwindow = new google.maps.InfoWindow({
        content: CString
    });
    var dwindow = new google.maps.InfoWindow({
        content: DString
    });
    markercur.addListener('click', function () {
        curwindow.open(map, markercur);
    });
    marker1.addListener('click', function () {
        awindow.open(map, marker1);
    });
    marker2.addListener('click', function () {
        bwindow.open(map, marker2);
    });
    marker3.addListener('click', function () {
        cwindow.open(map, marker3);
    });
    marker4.addListener('click', function () {
        dwindow.open(map, marker4);
    });
    curwindow.open(map, markercur);
}

$(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

    ResCarouselSize();




    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

});