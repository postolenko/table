function getSidebarPosition() {
  if( $(".table_header").length > 0) {
    var sidebarWrappTopCoord, sidebarWidth, sidebarWrappBottomCoord, windowtopCoord, windowBottomCoord;
    $(".table_header").each(function() {
      var wrapp = $(this).closest(".table_wrapp");
      sidebarLeftCoord = wrapp.offset().left;
      sidebarWrappTopCoord = wrapp.offset().top;
      sidebarWrappBottomCoord = wrapp.find(".bottom_coord").offset().top;
      windowTopCoord = $(document).scrollTop();
      windowBottomCoord = windowTopCoord + $(window).height();
      sidebarWidth = wrapp.find(".widthVal").width();
      $(this).css({
        "width" : sidebarWidth + "px"
      });
      if( windowTopCoord > sidebarWrappTopCoord ) {
        $(this).addClass("fixed");
        $(this).removeClass("absolute");
        $(this).css({
          "left" : sidebarLeftCoord + "px"
        });
        if($(this).offset().top + $(this).outerHeight() >= sidebarWrappBottomCoord) {
          $(this).removeClass("fixed");
          $(this).addClass("absolute");
          $(this).css({
            "left" : 0
          });
        }
      } else {
        $(this).removeClass("fixed");
        $(this).removeClass("absolute");
        $(this).css({
          "left" : 0
        });
      }
    });    
  }
}

$(window).load(function() {
  $(".users_scrollbar").mCustomScrollbar();
});

$(window).resize(function() {
  getSidebarPosition();
});

$(document).scroll(function() {
  getSidebarPosition();
});

$(document).ready(function() {

  getSidebarPosition();

  var parentBlock, dropdownBox;

  $(".checkbox input").each(function() {
    parentBlock = $(this).closest(".checkbox");
    if($(this).is(":checked")) {
      parentBlock.addClass("active");
    } else {
      parentBlock.removeClass("active");
    }
  });

  $(".checkbox input").on("change", function() {
    parentBlock = $(this).closest(".checkbox");
    if($(this).is(":checked")) {
      parentBlock.addClass("active");
    } else {
      parentBlock.removeClass("active");
    }
  });

  $(".dropdown_wrapp").each(function() {
    dropdownBox = $(this).find(".dropdown_box");
    if($(this).hasClass("active")) {
      dropdownBox.css({
        "display" : "block"
      });
    } else {
      dropdownBox.css({
        "display" : "none"
      });
    }
  });

  $(".table_row_title").on("click", function(e) {
    e.preventDefault();
    parentBlock = $(this).closest(".dropdown_wrapp");
    dropdownBox = parentBlock.find(".dropdown_box");
    if(dropdownBox.is(":hidden")) {
      parentBlock.addClass("active");
      dropdownBox.slideDown(300);
    } else {
      parentBlock.removeClass("active");
      dropdownBox.slideUp(300);
    }
  });

});