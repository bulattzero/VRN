$(document).ready(function () {
  $(".vi-popular-box__inner").slick({
    arrows: false,
    dots: true,
    slidesToShow: 1,
    autoplay: true,
    
    
  });
  $(".vi-secondslider").slick({
    arrows: true,
    dots: true,
    slidesToShow: 1,
    autoplay: false,
    
    adaptiveHeight: true,
  });
  $(".vi-brandslider").slick({
	arrows: false,
	dots: true,
	slidesToShow: 1,
	autoplay: false,
	
	adaptiveHeight: true,
 });
 $(".vi-stuffslider").slick({
	arrows: false,
	dots: true,
	slidesToShow: 1,
	autoplay: false,
	
	adaptiveHeight: true,
 });
 $(".vi-goodslider").slick({
	arrows: false,
	dots: true,
	slidesToShow: 1,
	autoplay: false,
	
	adaptiveHeight: true,
 });
 $(".vi-recommandslider").slick({
	arrows: false,
	dots: false,
	slidesToShow: 4,
	autoplay: false,
	
	adaptiveHeight: true,
	responsive:[
		{
			breakpoint: 1175,
			settings: {
				slidesToShow:3
			}
		},
		{
			breakpoint: 880,
			settings: {
				slidesToShow:2
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow:1
			}
		}
	]
 });
 $(".vi-tiggo4slider").slick({
	arrows: false,
	dots: true,
	slidesToShow: 1,
	autoplay: false,
	
	adaptiveHeight: true,
	vertical:true,
	verticalSwiping:true,
 });
 const myLazyLoad = new LazyLoad({
	elements_selector: 
	[".lazy",
	 ".vi-graphics__backgroundimg",
	 ".vi-backgroundpicture", 
	 ".vi-elipse__six",
	  ".vi-animation__pic",
	  ".vi-elipse__pic",
	  ".vi-benefits__li",
	  ".vi-elipse__first",
	  ".vi-elipse__second",
	  ".vi-elipse__third",
	  ".vi-elipse__fourth",
	  ".vi-elipse__fifth",
	  ".vi-popular-box__item",
	  ".vi-wrapper__bg",
	  ".vi-ourteam-card",
	  
	  

	]
});
// $('input:checkbox').change(function() {
// 	if ($(this).is(":checked")) {
// 	  $('body').addClass("overflow");
// 	} else {
// 	  $('body').removeClass("overflow");
// 	}
//  });
$('#forcheck').click(function(){
	$('#menu__toggle30:checkbox').trigger('click'); 
	return true;
});
$('#forcheck2').click(function(){
	$('#menu__toggle00:checkbox').trigger('click'); 
	return true;
});
$('#second').click(function() {
	$('#fisrt').removeClass('vi-border');
	$('#second').addClass('vi-border');
 });

 $('#fisrt').click(function() {
	$('#second').removeClass('vi-border');
	$('#fisrt').addClass('vi-border');
});

$("#menu__toggle3,#menu__toggle2,#menu__toggle,#menu__toggle30,#menu__toggle00").change(function(){
	if(this.checked){
		$('body').addClass("overflow");
	}
	else {
			  $('body').removeClass("overflow");
			}
});
// $('#button1').click(function() {
// 	$('#button1').removeClass('active');
// 	$('#button2').addClass('active');
//  });

//  $('#button2').click(function() {
// 	$('#button2').removeClass('active');
// 	$('#button1').addClass('active');
//  });


 $('#second').click(function() {
	$('#third').removeClass('vi-active');
	$('#fourth').addClass('vi-active');
 });

 $('#fisrt').click(function() {
	$('#fourth').removeClass('vi-active');
	$('#third').addClass('vi-active');
});



// $('.vi-closebutton').onclick(function(){
// 	$('#menu__toggle3').prop("cheсked",true).change()
// })
// $('#menu__toggle3').onclick(function(){
// 	$("#menu__toggle3").prop("checked", true).change();
// 	$("#menu__toggle4").prop("checked", false);
//  })
 
//  $('#menu__toggle4').onclick(function(){
// 	$("#menu__toggle4").prop("checked", true);
// 	$("#menu__toggle3").prop("checked", false);
//  })
// $('#menu__toggle4').click(function(){
// 	if ($this).is(':checked')){
// 		$('#menu__toggle3:checkbox').prop('checked, true');
// 		else {
// 			$('#menu__toggle3:checkbox').prop('checked, false')
// 		}
// 	}
// }
// $('#menu__toggle4').click(function(){
// 	if ($(this).is(':checked')){
// 		$('#menu__toggle3:checkbox').prop('checked', true);
// 	} else {
// 		$('#menu__toggle3:checkbox').prop('checked', false);
// 	}
// });
// $('.vi-animation__item').on('mouseenter', function() {
// 	$(this).css('animation-play-state', 'paused');
   
//   });

//   $('.vi-animation__item').on('mouseleave', function() {
// 	$(this).css('animation-play-state', 'running');
	
//   });

//   $('.vi-animation__item').on('click', function() {
// 	$(this).css('animation-play-state', 'paused');
   
//   });
// $('.vi-animation__item--first-pair, .vi-animation__item--second-pair, .vi-animation__item--third-pair, .vi-animation__item--fourth-pair, .vi-animation__item--fifth-pair, .vi-animation__item--sixth-pair').on('mouseenter', function() {
// 	const $this = $(this);
//   const $commonPair = $this.siblings('.vi-animation__item');

//   // Додати клас vi-animation__item--active для обох блоків
//   $this.addClass('vi-animation__item--active').css('animation-play-state', 'paused');
//   $commonPair.addClass('vi-animation__item--active').css('animation-play-state', 'paused');
   
// });

// $('.vi-animation__item--first-pair, .vi-animation__item--second-pair, .vi-animation__item--third-pair, .vi-animation__item--fourth-pair, .vi-animation__item--fifth-pair, .vi-animation__item--sixth-pair').on('mouseleave', function() {
// 	const $this = $(this);
//   const $commonPair = $this.siblings('.vi-animation__item');

//   // Відновити анімацію для обох блоків, якщо вона була зупинена
//   if ($this.hasClass('vi-animation__item--active')) {
//     $this.css('animation-play-state', 'running');
//   }
//   if ($commonPair.hasClass('vi-animation__item--active')) {
//     $commonPair.css('animation-play-state', 'running');
//   }

//   // Забрати клас vi-animation__item--active для обох блоків
//   $this.removeClass('vi-animation__item--active');
//   $commonPair.removeClass('vi-animation__item--active');
// });

$('.vi-animation__item').on('mouseenter', function() {
  const $this = $(this);
  const pairClass = $this.attr('class').split(' ').find(cls => cls.startsWith('vi-animation__item--'));

  // Знайти всі блоки vi-animation__item з парою, використовуючи парний клас
  const $pairBlocks = $(`.vi-animation__item.${pairClass}`);

  // Додати клас vi-animation__item--active тільки для блоків з поточної пари
  $pairBlocks.addClass('vi-animation__item--active').css('animation-play-state', 'paused');
});

$('.vi-animation__item').on('mouseleave', function() {
  const $this = $(this);
  const pairClass = $this.attr('class').split(' ').find(cls => cls.startsWith('vi-animation__item--'));

  // Знайти всі блоки vi-animation__item з парою, використовуючи парний клас
  const $pairBlocks = $(`.vi-animation__item.${pairClass}`);

  // Відновити анімацію тільки для блоків з поточної пари, якщо вона була зупинена
  if ($pairBlocks.hasClass('vi-animation__item--active')) {
    $pairBlocks.css('animation-play-state', 'running');
  }

  // Зняти клас vi-animation__item--active тільки для блоків з поточної пари
  $pairBlocks.removeClass('vi-animation__item--active');
});
const initialDisplayValues = {};

// // Обробка події при наведенні курсора
// $('.vi-animation__item--first-pair, .vi-animation__item--second-pair, .vi-animation__item--third-pair, .vi-animation__item--fourth-pair, .vi-animation__item--fifth-pair, .vi-animation__item--sixth-pair').on('mouseenter', function() {
//     const commonClass = $(this).attr('class').split(' ')[1];
//     const elements = $('.' + commonClass);

//     // Зберігаємо початкове значення параметра display для кожного елементу з обраного класу
//     elements.each(function() {
//         const element = $(this);
//         initialDisplayValues[element] = element.css('display');
//         element.css({
//             'animation-play-state': 'paused',
//             'display': 'block'
//         });
//     });
// });

// // Обробка події при відведенні курсора
// $('.vi-animation__item--first-pair, .vi-animation__item--second-pair, .vi-animation__item--third-pair, .vi-animation__item--fourth-pair, .vi-animation__item--fifth-pair, .vi-animation__item--sixth-pair').on('mouseleave', function() {
//     const commonClass = $(this).attr('class').split(' ')[1];
//     const elements = $('.' + commonClass);

//     // Відновлюємо початкові значення параметра display для кожного елементу з обраного класу
//     elements.each(function() {
//         const element = $(this);
//         element.css({
//             'animation-play-state': 'running',
//             'display': initialDisplayValues[element]
//         });
//     });
// });
// Об'єкт для збереження початкових значень параметра display
// Об'єкт для збереження початкових значень параметра display
// const initialDisplayValues = {};

// // Обробка події при наведенні курсора
// $('.vi-animation__item--first-pair, .vi-animation__item--second-pair, .vi-animation__item--third-pair, .vi-animation__item--fourth-pair, .vi-animation__item--fifth-pair, .vi-animation__item--sixth-pair').on('mouseenter', function() {
//     const commonClass = $(this).attr('class').split(' ')[1];
//     const elements = $('.' + commonClass);

//     // Зберігаємо початкове значення параметра display для кожного елементу з обраного класу
//     elements.each(function() {
//         const element = $(this);
//         initialDisplayValues[element] = element.css('display');
//         element.css('display', 'block');
//     });
// });

// // Обробка події при відведенні курсора
// $('.vi-animation__item--first-pair, .vi-animation__item--second-pair, .vi-animation__item--third-pair, .vi-animation__item--fourth-pair, .vi-animation__item--fifth-pair, .vi-animation__item--sixth-pair').on('mouseleave', function() {
//     const commonClass = $(this).attr('class').split(' ')[1];
//     const elements = $('.' + commonClass);

//     // Відновлюємо початкове значення параметра display для кожного елементу з обраного класу
//     elements.each(function() {
//         const element = $(this);
//         element.css('display', initialDisplayValues[element]);
//     });
// });



$('.vi-asset__item').on('click', function () {
	
	$('.vi-asset__item').removeClass('vi-asset__item--active');

	
	$(this).addClass('vi-asset__item--active');
});


// $('.vi-faq__item').on('click', function () {
	
// 	$('.vi-faq__item').removeClass('vi-faq__item--active');

	
// 	$(this).addClass('vi-faq__item--active');
// });


// $('.vi-faq__item').on('click', function () {
// 	// Перевіряємо, чи має обраний елемент клас 'vi-faq__item--active'
// 	if ($(this).hasClass('vi-faq__item--active')) {
// 	  // Якщо має, то видаляємо цей клас
// 	  $(this).removeClass('vi-faq__item--active');
// 	} else {
// 	  // Якщо не має, то додаємо цей клас і видаляємо його з інших елементів
// 	  $('.vi-faq__item').removeClass('vi-faq__item--active');
// 	  $(this).addClass('vi-faq__item--active');
// 	}
// 	});

$('.vi-faq__item').on('click', function () {
	// Перевіряємо, чи має обраний елемент клас 'vi-faq__item--active'
	if ($(this).hasClass('vi-faq__item--active')) {
	  // Якщо має, то видаляємо цей клас
	  $(this).removeClass('vi-faq__item--active');
	} else {
	  // Якщо не має, то додаємо цей клас до обраного елемента
	  $(this).addClass('vi-faq__item--active');
	}
  
	// Тут можна додати код для запуску анімації
  });

});


