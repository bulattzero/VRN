


const {src, dest, watch, parallel, series, } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const scss = require ('gulp-sass') (require('sass'));
const concat = require ('gulp-concat')
const uglify = require ('gulp-uglify-es').default;
const browserSync = require ('browser-sync').create(); 
const autoprefixer = require('gulp-autoprefixer');
const clean = require ('gulp-clean');
const replace = require('gulp-replace');
const versionNumber = require ('gulp-version-number');
const webpHtmlNosvg = require ('gulp-webp-html-nosvg');
const remToPx = require('gulp-rem-to-px');
const pictureHtml= require ('gulp-webp-avif-html-nosvg-nogif-lazyload')

const fileinclude = require('gulp-file-include');
const plumber = require ('gulp-plumber');
const notify = require ('gulp-notify')
const gulp = require('gulp');
const webp = require('gulp-webp');
const imagemin = require ('gulp-imagemin');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const { default: dist } = require('-');
const fs = require('fs');
const nodePath = require ('path');
const buildfolder = './dist';
const srcFolder = './app';
const rootFolder= nodePath.basename(nodePath.resolve());
const font = series(otfToTtf, ttfToWoFF , fontsStyle );// три задачи в одной (для шрифтов) выполняются одна за одной -последовательно
const stylesall=parallel(styles, stylesfirstpage, ); // 
const htmlall=series(html, htmlfirstpage, );// 
const repair=series(copyjs,copyimg,); //copyfonts
const image=series(images,imageshtml);
const pxToRem = require('gulp-px2rem-converter');
const { reload } = require('browser-sync');
const server =parallel(browsersync, watching);
const construct=parallel(stylesall,htmlall);


// Нужно для работы:конвертации и записывании шрифтов в файл fonts.scss-и только для этой опции
const path ={
	build:{
		files: `${buildfolder}/files/`,
		fonts: `${buildfolder}/fonts`,
	},
	src:{
		files: `${srcFolder}/files/**/*.*`,
	},
	
	// clean: buildfolder,
	buildfolder: buildfolder,
	srcFolder : srcFolder,
	rootFolder: rootFolder,
	ftp: ``

}
// app.path.build.fonts
global.app ={
	path:path,
}

 function fontsStyle (){
	let fontsFile ='app/scss_shab/fonts.scss'

	fs.readdir(('app/src/fonts/'), async function (err, fontsFiles) {
		if (fontsFiles) {
		  if (!fs.existsSync(fontsFile)) {
			 fs.writeFile(fontsFile, '', cb)
			 let newFileOnly
			 for (var i = 0; i < fontsFiles.length; i++) {
				let fontFileName = fontsFiles[i].split('.')[0]
				if (newFileOnly !== fontFileName) {
				  let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName
				  let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName
				  if (fontWeight.toLowerCase() === 'thin') {
					 fontWeight = 100
				  } else if (fontWeight.toLowerCase() === 'extralight') {
					 fontWeight = 200
				  } else if (fontWeight.toLowerCase() === 'light') {
					 fontWeight = 300
				  } else if (fontWeight.toLowerCase() === 'medium') {
					 fontWeight = 500
				  } else if (fontWeight.toLowerCase() === 'semibold') {
					 fontWeight = 600
				  } else if (fontWeight.toLowerCase() === 'bold') {
					 fontWeight = 700
				  } else if (
					 fontWeight.toLowerCase() === 'extrabold' ||
					 fontWeight.toLowerCase() === 'heavy'
				  ) {
					 fontWeight = 800
				  } else if (fontWeight.toLowerCase() === 'black') {
					 fontWeight = 900
				  } else {
					 fontWeight = 400
				  }
				  fs.appendFile(
					 fontsFile,
					 `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
					 cb
				  )
				  newFileOnly = fontFileName
				}
			 }
		  } else {
			 console.log('Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!')
		  }
		}
	 })
  
	 return src('app/src/fonts')
	 async function cb() {}
  }

 function otfToTtf (){
	return src('app/fonts/*.otf', {})
	.pipe(plumber(
		notify.onError({
			title: "FONTS",
			message: "Error: <%=error.message%"
		})
	))
	.pipe(fonter({
		formats:['ttf']
	}))
	.pipe(dest('app/fonts/'))
}

 function ttfToWoFF(){
	return src('app/fonts/*ttf' ,{})
	.pipe(plumber(
		notify.onError({
			title: "FONTS",
			message: "Error: <%= error.message %"
		}
		)
	))
	.pipe(fonter({
		formats:['woof']
	}))
	.pipe(dest('app/src/fonts'))
	.pipe(src('app/fonts/*ttf'))
	.pipe(ttf2woff2())
	.pipe(dest('app/src/fonts'))
}


async function copyjs(){
	return src(
		'app/js/**.js'
	)
	.pipe(dest('app/src/js/'))
}

async function copyimg(done){
	return src(
		['app/img/**/*.*',
		'app/img/*.ico',
	]
	)
	.pipe(dest('app/src/img/'))
	done();
}




//ПОСТРОЕНИЕ СТИЛЕЙ ГЛАВНОЙ
// ПРИМЕЧАНИЕ- главная идея в том-что для каждой отдельной страницы в папке проекта создается 
// своя папка и в нее же записываються файлы стилей под разные расширения экрана.
// соответсвенно сколко папок будет создаваться-нужно столько же повторить этот код с 
// разными названиями самой функции и путями внутри функции соответсвенно!
// НЕ ЗАБУДЬ ПРО ЕКСПОРТ КАЖДОЙ НОВОЙ ФУНКЦИИ ВНИЗУ СТРАНИЦЫ!
 async function styles () {
	return src ([
		'app/homepage/style.scss',
		'app/homepage/media769.scss',
		'app/homepage/media993.scss',
		'app/homepage/media1201.scss',
		'app/homepage/media1401.scss',
		'app/homepage/media1402.scss',
	])
	.pipe(sourcemaps.init())
	//.pipe(pxToRem())
	.pipe(autoprefixer({overrideBrowserlist: ['last 10 version']}))
	.pipe(scss({outputStyle: 'expanded'})) // expanded -обычный,  compressed-сжатый css
	.pipe(sourcemaps.write())
	.pipe(dest('app/src'))
	// .pipe (browserSync.stream()) // отключено за ненадобностью 
	

}
// ПОСТРОЕНИЕ СТИЛЕЙ КАТАЛОГА
 async function stylesfirstpage () {
	return src ([
		'app/firstpage/style.scss',
		'app/firstpage/media769.scss',
		'app/firstpage/media993.scss',
		'app/firstpage/media1201.scss',
		'app/firstpage/media1401.scss',
		'app/firstpage/media1402.scss',
	])
	.pipe(sourcemaps.init())
	//.pipe(pxToRem())
	.pipe(autoprefixer({overrideBrowserlist: ['last 10 version']}))
	.pipe(scss({outputStyle: 'expanded'}))
	.pipe(sourcemaps.write())
	.pipe(dest('app/src/firstpage/'))
	// .pipe (browserSync.stream()) // отключено за ненадобностью
}
 

// Функция слежения за изменнениями в проекте+какие действия(функции) должны выполнятся
// если что-то изменияться в папке исходников.
async function watching(){
	watch ([
	
		'app/scss_shab/**/*.scss',
		'app/homepage/*.scss',
		'app/firstpage/*.scss',

		
		'app/html/*.html',
		'app/homepage/*.html',
		'app/firstpage/*.html',
		
	], 	series ( construct,copyimg, copyjs,) ) ;//backupfonts //,transfercleanDist,
	// watch (['app/js/*.js'], series (backupfonts,cleanDist,image, scripts, construct, repair),watch) .on('change',browserSync.reload) ;
	watch (['app/img/*.*','app/img_html/*.*'], series (image,construct,copyimg,copyjs,)) ; //backupfonts,transfer
	// watch (['], series (cleanDist,construct,transfer,copyimg, copyjs,)) ;
	// watch (['dist/**/*.html','dist/*.html','dist/**/**/*.html','dist/**/**/**/*.html','dist/**/**/**/**/*.html','dist/**/**/**/**/**/*.html','dist/**/**/**/**/**/**/*.html'] ).on('change',browserSync.reload);
	// watch (['app/**/html/*.html'], series (cleanDist, construct, copyjs,transfer)) ;//backupfonts
	// watch (['app/src/*.html','app/src/**/*.html']) .on('change', browserSync.reload);
}

// Функция очистки папки назначения
function cleanDist(){
	return src('dist')
	.pipe(clean())
}




// ПОСТРОЕНИЕ КАРТИНОК
// ДАНАЯ ПРИБЛУДА НАХОДИТ КАРТИНКИ В ПАПКЕ 'ap/img/' конвертирует в формат webp и ужимает.
// Степень сжатия регулируется в строчке 'optimizationLevel'.
// Важно в папку назначания 'dist/img/' также переноситься файл оригинала-эсли он не нужен можно просто удалить в конечной папке.
 function images () {
	return src([
		// 'app/img/**/*.{jpg,jpeg,png,gif,webp}',
		'app/img/*.{jpg,jpeg,png,gif,webp}',
		'app/img/*.svg',
		// 'app/img/**/*.svg',
		
	])
	.pipe(plumber(
		notify.onError({
			title:"IMAGES",
			message: "Error: <%=error.massage %"
		})
	))
	.pipe(newer('app/src/img'))
	.pipe(webp())
	.pipe(dest('app/src/img'))
	.pipe(src([
		// 'app/img/**/*.{jpg,jpeg,png,gif,webp}',
		'app/img/*.{jpg,jpeg,png,gif,webp}',
		
	])
	.pipe(imagemin({
		progressive:true,
		svgoPlugins:[{removeViewBox:false}],
		interplaced: true,
		optimizationLevel: 3 // 0 to 7
	}))
	.pipe(dest('app/src/img'))) }

	 function imageshtml () {
		return src([
		'app/img_html/**/*.{jpg,jpeg,png,gif,webp}',
		// 'app/img_html/*.{jpg,jpeg,png,gif,webp}',
		// 'app/img_html/*.svg',
		'app/img_html/**/*.svg',
		])
		.pipe(plumber(
			notify.onError({
				title:"IMAGES",
				message: "Error: <%=error.massage %"
			})
		))
		.pipe(newer('app/src/img_html'))
		.pipe(webp())
		.pipe(dest('app/src/img_html'))
		.pipe(src([
			// 'app/img_html/*.{jpg,jpeg,png,gif,webp}',
			'app/img_html/**/*.{jpg,jpeg,png,gif,webp}',
			
		])
		.pipe(imagemin({
			progressive:true,
			svgoPlugins:[{removeViewBox:false}],
			interplaced: true,
			optimizationLevel: 3 // 0 to 7
		}))
		.pipe(dest('app/src/img_html'))) }


//ПОСТРОЕНИЕ Главной страницы
 function html(){
	return src([
		// 'app/homepage/css/*.css',
		// 'app/homepage/*.*',
		'app/homepage/*.html',
	])
	.pipe(plumber( // ОТЛАВЛИВАЕТ ОШИБКИ И ВЫВОДИТ В ВИНДУ ОШИБКУ В УВЕДОМЛЕНИЯ
	notify.onError({
		title:"HTML",
		message: "Error: <%= error.message%>"
	})
))
	.pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
	 .pipe(replace(/@img\//g,'img/')) // заменяет в html @img на img/
	 .pipe(replace(/@img_html\//g,'img_html/')) // заменяет в html @img на img_html/
	 .pipe(webpHtmlNosvg())
	 .pipe(
		versionNumber({
			'value': '%DT%',
			'append': {
				'key': '_v',
				'cover': 0,
				'to':[
					'css',
					'js',
				]
		},
		'output': {
			'file':'gulp/version.json'
		}
		})
	 )
	.pipe(dest('app/src'))
}



//ПОСТРОЕНИЕ Каталога
 function htmlfirstpage(){
	return src([
		// 'app/firstpage/css/*.css',
		// 'app/firstpage/*.*',
		'app/firstpage/*.html',
	])
	 .pipe(plumber( // ОТЛАВЛИВАЕТ ОШИБКИ И ВЫВОДИТ В ВИНДУ ОШИБКУ В УВЕДОМЛЕНИЯ
		notify.onError({
			title:"HTML",
			message: "Error: <%= error.message%>"
		})
	))
	.pipe(fileinclude({ // СКЛЕЙКА ФАЙЛОВ HTML
      prefix: '@@',
      basepath: '@file'
    }))
	 .pipe(replace(/@@img\//g,'../img/')) // заменяет в html @img на img/
	 .pipe(replace(/@@img_html\//g,'../img_html/')) // заменяет в html @img на img_html/
	 .pipe(webpHtmlNosvg())
	 .pipe(
		versionNumber({
			'value': '%DT%',
			'append': {
				'key': '_v',
				'cover': 0,
				'to':[
					'css',
					'js',
				]
			
		},
		'output': {
			'file':'gulp/version.json'
		}
		})
	 )
	 .pipe(dest('app/src/firstpage'))
}


// ОБРАБОТКА СТРАНИЦ И ПАПОК


 function browsersync (){
	browserSync.init({
		server:{
			baseDir:"app/src/"
		}
	})

}
 function transfer(){
	return src(
		[
		'app/src/**/*.{jpg,jpeg,png,gif,webp,js,ico,woff2,html,css}', //'app/src/**/**/*.*',
		'app/src/**/**/*.svg',

		]
	)
	.pipe(dest('dist'))
}


exports.transfer=transfer;
exports.browsersync=browsersync;
exports.copyimg = copyimg;
exports.copyjs = copyjs;
exports.styles = styles;
exports.stylesfirstpage = stylesfirstpage;
exports.stylesall = stylesall;
exports.watching = watching;
exports.html = html;
exports.htmlfirstpage = htmlfirstpage;
exports.htmlall =htmlall;
exports.images = images;
exports.imageshtml=imageshtml;
exports.image=image;
exports.otfToTtf=otfToTtf;
exports.ttfToWoFF=ttfToWoFF;
exports.fontsStyle=fontsStyle;
exports.font = font;
exports.cleanDist=cleanDist;
exports.construct=construct;
exports.repair=repair;
exports.server=server;





exports.default = series (
	image, construct,copyjs,copyimg,transfer,server
	);

















	// СЦЕНАРИЙ ДЛЯ ПОСТРОЙКИ СТИЛЕЙ ДЛЯ ЗАГРУЗКИ НА САЙТ! СЖАТЫ css,полностю зборка сайта для загрузки!!!!!!


async function stylesup () {
	return src ([
		'app/homepage/style.scss',
		'app/homepage/media769.scss',
		'app/homepage/media993.scss',
		'app/homepage/media1201.scss',
		'app/homepage/media1401.scss',
		'app/homepage/media1402.scss',
	])
	// .pipe(sourcemaps.init())
	//.pipe(pxToRem())
	.pipe(autoprefixer({overrideBrowserlist: ['last 10 version']}))
	.pipe(scss({outputStyle: 'compressed'})) // expanded -обычный,  compressed-сжатый css
	// .pipe(sourcemaps.write())
	.pipe(dest('app/src2'))
	// .pipe (browserSync.stream()) // отключено за ненадобностью 
	

}
// ПОСТРОЕНИЕ СТИЛЕЙ КАТАЛОГА
async function stylesfirstpageup () {
	return src ([
		'app/firstpage/style.scss',
		'app/firstpage/media769.scss',
		'app/firstpage/media993.scss',
		'app/firstpage/media1201.scss',
		'app/firstpage/media1401.scss',
		'app/firstpage/media1402.scss',
	])
	// .pipe(sourcemaps.init())
	//.pipe(pxToRem())
	.pipe(autoprefixer({overrideBrowserlist: ['last 10 version']}))
	.pipe(scss({outputStyle: 'compressed'}))
	// .pipe(sourcemaps.write())
	.pipe(dest('app/src2/firstpage/'))
	// .pipe (browserSync.stream()) // отключено за ненадобностью
}














async function transferup(){
	return src(
		[
		'app/src/**/*.{jpg,jpeg,png,gif,webp,js,ico,woff2,html,}', //'app/src/**/**/*.*',
		'app/src/**/**/*.svg',
		// 'app/src2/**/*.{css}'

		]
	)
	.pipe(dest('dist2'))
}


async function transferup2(){
	return src(
		[
		// 'app/src/**/*.{jpg,jpeg,png,gif,webp,js,ico,woff2,html,}', //'app/src/**/**/*.*',
		// 'app/src/**/**/*.svg',
		'app/src2/**/*.css'

		]
	)
	.pipe(dest('dist2'))
}






const up=series(stylesup,stylesfirstpageup,transferup,transferup2)




exports.stylesup=stylesup;
exports.stylesfirstpageup=stylesfirstpageup;
exports.transferup=transferup;
exports.transferup2=transferup2;
exports.up=up;